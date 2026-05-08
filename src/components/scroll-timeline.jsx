import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function ScrollTimeline({ items }) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [fillHeight, setFillHeight] = useState(0);
  const [activeSet, setActiveSet] = useState(() => new Set());
  const [openSet, setOpenSet] = useState(() => new Set());

  const toggle = (idx) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  // Recalculate the fill height so the line stops at the deepest active node.
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (activeSet.size === 0) {
      setFillHeight(0);
      return;
    }
    const lastActive = Math.max(...activeSet);
    const node = itemRefs.current[lastActive];
    if (!node) return;
    const cRect = container.getBoundingClientRect();
    const nRect = node.getBoundingClientRect();
    // Stop the fill at the node's center (top: 0.5rem + half node size ≈ 14px in)
    const target = nRect.top - cRect.top + 14;
    setFillHeight(Math.max(0, target));
  }, [activeSet, openSet]);

  // Keep height in sync when layout shifts (resize, font load, etc.).
  useEffect(() => {
    let rafId = 0;
    let ticking = false;
    const recompute = () => {
      ticking = false;
      const container = containerRef.current;
      if (!container || activeSet.size === 0) return;
      const lastActive = Math.max(...activeSet);
      const node = itemRefs.current[lastActive];
      if (!node) return;
      const cRect = container.getBoundingClientRect();
      const nRect = node.getBoundingClientRect();
      setFillHeight(Math.max(0, nRect.top - cRect.top + 14));
    };
    const schedule = () => {
      if (ticking) return;
      ticking = true;
      rafId = window.requestAnimationFrame(recompute);
    };
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(rafId);
    };
  }, [activeSet]);

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
          height: `${fillHeight}px`,
          background:
            "linear-gradient(to bottom, color-mix(in oklab, var(--primary) 0%, transparent), var(--primary) 30%, var(--primary))",
          boxShadow:
            "0 0 18px color-mix(in oklab, var(--primary) 60%, transparent)",
          willChange: "height",
          transition:
            "height 600ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      <ol className="space-y-10 sm:space-y-14">
        {items.map((item, idx) => {
          const active = activeSet.has(idx);
          const open = openSet.has(idx);
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
              {/* Clickable node */}
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`timeline-panel-${idx}`}
                onClick={() => toggle(idx)}
                className="absolute left-3 top-2 -translate-x-1/2 sm:left-4 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                style={{
                  width: open ? 18 : active ? 14 : 10,
                  height: open ? 18 : active ? 14 : 10,
                  background: open || active ? "var(--primary)" : "var(--background)",
                  border: `2px solid var(--primary)`,
                  boxShadow:
                    open
                      ? "0 0 0 8px color-mix(in oklab, var(--primary) 22%, transparent), 0 0 28px color-mix(in oklab, var(--primary) 80%, transparent)"
                      : active
                        ? "0 0 0 6px color-mix(in oklab, var(--primary) 18%, transparent), 0 0 22px color-mix(in oklab, var(--primary) 70%, transparent)"
                        : "0 0 0 0 transparent",
                  cursor: "pointer",
                  transition:
                    "width 250ms ease, height 250ms ease, background 250ms ease, box-shadow 350ms ease",
                }}
              >
                <span className="sr-only">
                  {open ? "Collapse" : "Expand"} {item.role} at {item.company}
                </span>
              </button>

              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={open}
                aria-controls={`timeline-panel-${idx}`}
                className="group block w-full text-left cursor-pointer"
              >
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {item.period}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {item.role} ·{" "}
                  <span className="text-primary">{item.company}</span>
                  <span
                    aria-hidden
                    className="ml-2 inline-block text-xs text-muted-foreground transition-transform"
                    style={{
                      transform: open ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                  >
                    ▸
                  </span>
                </h3>
              </button>
              <div
                id={`timeline-panel-${idx}`}
                role="region"
                className="grid overflow-hidden"
                style={{
                  gridTemplateRows: open ? "1fr" : "0fr",
                  transition:
                    "grid-template-rows 350ms cubic-bezier(0.22,1,0.36,1), opacity 300ms ease",
                  opacity: open ? 1 : 0,
                }}
              >
                <div className="min-h-0">
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}