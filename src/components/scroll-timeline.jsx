import { useEffect, useRef, useState } from "react";

export function ScrollTimeline({ items }) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [progress, setProgress] = useState(0);
  const [activeSet, setActiveSet] = useState(() => new Set());

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // start filling when top reaches 70% of viewport, finish when bottom reaches 40%
      const start = vh * 0.7;
      const end = vh * 0.4;
      const total = rect.height + (start - end);
      const traveled = start - rect.top;
      const p = Math.max(0, Math.min(1, traveled / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        setActiveSet((prev) => {
          const next = new Set(prev);
          for (const e of entries) {
            const idx = Number(e.target.getAttribute("data-idx"));
            if (e.isIntersecting) next.add(idx);
          }
          return next;
        });
      },
      { rootMargin: "0px 0px -35% 0px", threshold: 0.2 },
    );
    itemRefs.current.forEach((n) => n && io.observe(n));
    return () => io.disconnect();
  }, [items.length]);

  return (
    <div ref={containerRef} className="relative mt-8">
      {/* Track */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-3 top-0 bottom-0 w-px bg-border sm:left-4"
      />
      {/* Animated fill */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-3 top-0 w-[2px] -translate-x-[0.5px] sm:left-4 origin-top"
        style={{
          height: `${progress * 100}%`,
          background:
            "linear-gradient(to bottom, color-mix(in oklab, var(--primary) 0%, transparent), var(--primary) 30%, var(--primary))",
          boxShadow:
            "0 0 18px color-mix(in oklab, var(--primary) 60%, transparent)",
          transition: "height 120ms linear",
        }}
      />

      <ol className="space-y-10 sm:space-y-14">
        {items.map((item, idx) => {
          const active = activeSet.has(idx);
          const fromLeft = idx % 2 === 0;
          return (
            <li
              key={item.role + item.company}
              ref={(n) => (itemRefs.current[idx] = n)}
              data-idx={idx}
              className="relative pl-10 sm:pl-14"
              style={{
                opacity: active ? 1 : 0.35,
                filter: active ? "none" : "saturate(0.4)",
                transform: active
                  ? "translate3d(0,0,0) rotate(0deg)"
                  : `translate3d(${fromLeft ? "-24px" : "24px"},8px,0) rotate(${fromLeft ? "-1deg" : "1deg"})`,
                transition:
                  "opacity 600ms ease, transform 700ms cubic-bezier(0.22,1,0.36,1), filter 600ms ease",
                transitionDelay: `${active ? Math.min(idx * 60, 240) : 0}ms`,
              }}
            >
              {/* Node */}
              <span
                aria-hidden
                className="absolute left-3 top-2 -translate-x-1/2 sm:left-4"
                style={{
                  width: active ? 14 : 10,
                  height: active ? 14 : 10,
                  borderRadius: 999,
                  background: active ? "var(--primary)" : "var(--background)",
                  border: `2px solid var(--primary)`,
                  boxShadow: active
                    ? "0 0 0 6px color-mix(in oklab, var(--primary) 18%, transparent), 0 0 22px color-mix(in oklab, var(--primary) 70%, transparent)"
                    : "0 0 0 0 transparent",
                  transition:
                    "width 300ms ease, height 300ms ease, background 300ms ease, box-shadow 400ms ease",
                }}
              />
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {item.period}
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                {item.role} ·{" "}
                <span className="text-primary">{item.company}</span>
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}