import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

// Layout presets per variant. `depth` controls scroll parallax intensity.
const LAYOUTS = {
  // A — Subtle tilt: scattered like today, but rotations & motion roughly halved.
  subtle: [
    {
      transform: "rotateX(8deg) rotateY(-10deg) rotateZ(-2deg) translate3d(-4%, -2%, 0)",
      className: "top-[2%] left-[2%] w-[44%] sm:w-[36%]",
      depth: 36,
    },
    {
      transform: "rotateX(7deg) rotateY(9deg) rotateZ(1.5deg) translate3d(3%, -1%, 0)",
      className: "top-[6%] right-[2%] w-[44%] sm:w-[34%]",
      depth: 54,
    },
    {
      transform: "rotateX(9deg) rotateY(-3deg) rotateZ(-1deg)",
      className: "top-[34%] left-1/2 -translate-x-1/2 w-[52%] sm:w-[38%] z-20",
      depth: 84,
    },
    {
      transform: "rotateX(8deg) rotateY(10deg) rotateZ(1deg) translate3d(4%, 3%, 0)",
      className: "bottom-[6%] right-[4%] w-[46%] sm:w-[36%]",
      depth: 45,
    },
    {
      transform: "rotateX(8deg) rotateY(-9deg) rotateZ(-1.5deg) translate3d(-3%, 3%, 0)",
      className: "bottom-[4%] left-[4%] w-[44%] sm:w-[34%]",
      depth: 30,
    },
  ],
  // B — Flat stack: tossed-on-a-desk feel, only faint Z-rotation.
  flat: [
    {
      transform: "rotateZ(-3deg) translate3d(-2%, -1%, 0)",
      className: "top-[2%] left-[3%] w-[42%] sm:w-[34%]",
      depth: 30,
    },
    {
      transform: "rotateZ(2deg) translate3d(2%, -1%, 0)",
      className: "top-[6%] right-[3%] w-[42%] sm:w-[34%]",
      depth: 50,
    },
    {
      transform: "rotateZ(-1deg)",
      className: "top-[36%] left-1/2 -translate-x-1/2 w-[50%] sm:w-[38%] z-20",
      depth: 70,
    },
    {
      transform: "rotateZ(2.5deg) translate3d(3%, 2%, 0)",
      className: "bottom-[5%] right-[5%] w-[44%] sm:w-[34%]",
      depth: 40,
    },
    {
      transform: "rotateZ(-2deg) translate3d(-3%, 2%, 0)",
      className: "bottom-[3%] left-[5%] w-[42%] sm:w-[34%]",
      depth: 25,
    },
  ],
  // C — Fanned deck: overlapping arc across the centre.
  fan: [
    {
      transform: "rotateZ(-10deg) translate3d(0, 18px, 0)",
      className: "bottom-[8%] left-[6%] w-[34%] sm:w-[26%]",
      depth: 20,
    },
    {
      transform: "rotateZ(-5deg) translate3d(0, 6px, 0)",
      className: "bottom-[10%] left-[24%] w-[34%] sm:w-[26%] z-10",
      depth: 30,
    },
    {
      transform: "rotateZ(0deg)",
      className: "bottom-[12%] left-1/2 -translate-x-1/2 w-[36%] sm:w-[28%] z-30",
      depth: 45,
    },
    {
      transform: "rotateZ(5deg) translate3d(0, 6px, 0)",
      className: "bottom-[10%] right-[24%] w-[34%] sm:w-[26%] z-10",
      depth: 30,
    },
    {
      transform: "rotateZ(10deg) translate3d(0, 18px, 0)",
      className: "bottom-[8%] right-[6%] w-[34%] sm:w-[26%]",
      depth: 20,
    },
  ],
  // D — Isometric grid: cards untilted; the stage shares a single iso transform.
  isometric: [
    {
      transform: "translate3d(0, 0, 0)",
      className: "top-[4%] left-[4%] w-[40%] sm:w-[32%]",
      depth: 40,
    },
    {
      transform: "translate3d(0, 0, 0)",
      className: "top-[4%] right-[4%] w-[40%] sm:w-[32%]",
      depth: 40,
    },
    {
      transform: "translate3d(0, 0, 0)",
      className: "top-[38%] left-1/2 -translate-x-1/2 w-[44%] sm:w-[34%] z-20",
      depth: 60,
    },
    {
      transform: "translate3d(0, 0, 0)",
      className: "bottom-[6%] left-[6%] w-[40%] sm:w-[32%]",
      depth: 40,
    },
    {
      transform: "translate3d(0, 0, 0)",
      className: "bottom-[6%] right-[6%] w-[40%] sm:w-[32%]",
      depth: 40,
    },
  ],
};

const VARIANT_CONFIG = {
  subtle: { perspective: "1600px", stageTransform: "", tiltStrength: 6 },
  flat: { perspective: "2400px", stageTransform: "", tiltStrength: 2 },
  fan: { perspective: "1800px", stageTransform: "", tiltStrength: 4, fanHover: true },
  isometric: {
    perspective: "1800px",
    stageTransform: "rotateX(14deg) rotateZ(-10deg)",
    tiltStrength: 0,
    stageTilt: true,
  },
};

export function FloatingProjectsShowcase({
  projects,
  variant = "subtle",
  eyebrow = "Featured work",
  heading,
  description = "Websites, design work, and code — presented as a floating workspace.",
  showCta = true,
}) {
  const config = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.subtle;
  const layout = LAYOUTS[variant] ?? LAYOUTS.subtle;
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [reduced, setReduced] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);

  // Detect reduced motion + coarse pointer (mobile/touch)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cp = window.matchMedia("(pointer: coarse)");
    const sync = () => {
      setReduced(rm.matches);
      setIsCoarse(cp.matches);
    };
    sync();
    rm.addEventListener?.("change", sync);
    cp.addEventListener?.("change", sync);
    return () => {
      rm.removeEventListener?.("change", sync);
      cp.removeEventListener?.("change", sync);
    };
  }, []);

  // Scroll parallax (skipped if reduced-motion)
  useEffect(() => {
    if (reduced) {
      setOffset(0);
      return;
    }
    let raf = 0;
    let ticking = false;
    const update = () => {
      ticking = false;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;
      const center = rect.top + rect.height / 2;
      const progress = (viewportH / 2 - center) / (viewportH / 2 + rect.height / 2);
      setOffset(Math.max(-1, Math.min(1, progress)));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  // Pointer tilt — desktop / fine pointer only
  useEffect(() => {
    if (reduced || isCoarse) {
      setTilt({ x: 0, y: 0 });
      return;
    }
    const el = stageRef.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setTilt({ x: Math.max(-0.5, Math.min(0.5, px)), y: Math.max(-0.5, Math.min(0.5, py)) }),
      );
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, isCoarse]);

  const cards = projects.slice(0, layout.length);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-border bg-[oklch(0.10_0.025_280)]"
    >
      {/* ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 22%, oklch(0.55 0.27 280 / 0.18), transparent 55%), radial-gradient(circle at 82% 78%, oklch(0.50 0.22 265 / 0.15), transparent 55%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
        <div className="mb-20 max-w-2xl sm:mb-24">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            {heading ?? (
              <>
                A look at recent{" "}
                <span className="bg-gradient-to-r from-primary to-[oklch(0.78_0.20_300)] bg-clip-text text-transparent">
                  projects.
                </span>
              </>
            )}
          </h2>
          <p className="mt-4 text-muted-foreground">{description}</p>
        </div>

        {/* Stage */}
        <div
          className={`relative mx-auto w-full ${variant === "fan" ? "h-[420px] sm:h-[480px] lg:h-[520px]" : "h-[520px] sm:h-[560px] lg:h-[620px]"}`}
          ref={stageRef}
          style={{ perspective: config.perspective, perspectiveOrigin: "50% 40%" }}
        >
          <div
            className={reduced ? "" : "transition-transform duration-300 ease-out will-change-transform"}
            style={{
              transformStyle: "preserve-3d",
              transform: config.stageTilt
                ? `${config.stageTransform} rotateX(${-tilt.y * 4}deg) rotateY(${tilt.x * 4}deg)`
                : config.stageTransform || undefined,
              height: "100%",
              position: "relative",
            }}
          >
          {cards.map((project, i) => {
            const item = layout[i];
            const motionScale = reduced ? 0 : isCoarse ? 0.45 : 1;
            const driftY = Math.sin((offset + i * 0.3) * Math.PI) * 4 * motionScale;
            const parallaxY = offset * item.depth * motionScale;
            // Per-card pointer tilt only when the stage isn't tilting as a whole.
            const perCardStrength = config.stageTilt ? 0 : (item.depth / 90) * config.tiltStrength * motionScale;
            const tiltX = -tilt.y * perCardStrength;
            const tiltY = tilt.x * perCardStrength;
            const fanHoverClass = config.fanHover
              ? "hover:!rotate-0 hover:!translate-y-[-10px]"
              : "";
            return (
              <article
                key={project.slug}
                className={`absolute ${item.className} ${fanHoverClass} ${reduced ? "" : "transition-transform duration-300 ease-out will-change-transform"}`}
                style={{
                  transform: `translate3d(0, ${parallaxY + driftY}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) ${item.transform}`,
                  transformStyle: "preserve-3d",
                  transformOrigin: variant === "fan" ? "50% 100%" : undefined,
                  filter: `drop-shadow(0 30px 40px oklch(0 0 0 / 0.55))`,
                }}
              >
                <Link
                  to="/projects/$projectSlug"
                  params={{ projectSlug: project.slug }}
                  className="group flex aspect-square flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-white to-[oklch(0.94_0.01_280)] p-4 sm:p-5 text-[oklch(0.20_0.03_280)] shadow-2xl transition-shadow hover:shadow-[0_30px_60px_-20px_oklch(0.55_0.27_280/0.6)]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[oklch(0.55_0.27_280)]">
                        {project.type}
                      </p>
                      <h3 className="mt-1 font-display text-base font-bold leading-tight sm:text-lg">
                        {project.title}
                      </h3>
                    </div>
                    <span className="rounded-full bg-[oklch(0.55_0.27_280/0.12)] p-1.5 text-[oklch(0.55_0.27_280)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-3 text-xs text-[oklch(0.40_0.03_280)] sm:text-[13px]">
                    {project.summary}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[oklch(0.95_0.01_280)] px-2 py-0.5 text-[10px] font-medium text-[oklch(0.35_0.04_280)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-[oklch(0.90_0.01_280)] pt-2 text-[10px] text-[oklch(0.50_0.03_280)]">
                    <span>{project.platform}</span>
                    <span>{project.year}</span>
                  </div>
                </Link>
              </article>
            );
          })}
          </div>
        </div>

        {showCta && (
          <div className="mt-10 flex justify-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/40 hover:bg-secondary"
            >
              View all work <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
