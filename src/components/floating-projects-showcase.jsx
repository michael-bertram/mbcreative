import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

// Each card gets its own perspective transform + parallax depth.
// `depth` controls how much it shifts on scroll (higher = moves more = feels "closer").
const LAYOUT = [
  {
    transform: "rotateX(18deg) rotateY(-22deg) rotateZ(-4deg) translate3d(-6%, -4%, 0)",
    className: "top-[2%] left-[2%] w-[44%] sm:w-[36%]",
    depth: 60,
  },
  {
    transform: "rotateX(14deg) rotateY(18deg) rotateZ(3deg) translate3d(4%, -2%, 0)",
    className: "top-[6%] right-[2%] w-[44%] sm:w-[34%]",
    depth: 90,
  },
  {
    transform: "rotateX(20deg) rotateY(-6deg) rotateZ(-2deg)",
    className: "top-[34%] left-1/2 -translate-x-1/2 w-[52%] sm:w-[38%] z-20",
    depth: 140,
  },
  {
    transform: "rotateX(16deg) rotateY(20deg) rotateZ(2deg) translate3d(6%, 4%, 0)",
    className: "bottom-[6%] right-[4%] w-[46%] sm:w-[36%]",
    depth: 75,
  },
  {
    transform: "rotateX(18deg) rotateY(-18deg) rotateZ(-3deg) translate3d(-4%, 4%, 0)",
    className: "bottom-[4%] left-[4%] w-[44%] sm:w-[34%]",
    depth: 50,
  },
];

export function FloatingProjectsShowcase({ projects }) {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight || 1;
        // Progress from -1 (below viewport) -> 0 (centered) -> +1 (above viewport)
        const center = rect.top + rect.height / 2;
        const progress = (viewportH / 2 - center) / (viewportH / 2 + rect.height / 2);
        setOffset(Math.max(-1, Math.min(1, progress)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const cards = projects.slice(0, LAYOUT.length);

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

      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Featured work
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            A look at recent{" "}
            <span className="bg-gradient-to-r from-primary to-[oklch(0.78_0.20_300)] bg-clip-text text-transparent">
              projects.
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Websites, design work, and code — presented as a floating workspace.
          </p>
        </div>

        {/* Stage */}
        <div
          className="relative mx-auto h-[520px] w-full sm:h-[560px] lg:h-[620px]"
          style={{ perspective: "1400px", perspectiveOrigin: "50% 40%" }}
        >
          {cards.map((project, i) => {
            const layout = LAYOUT[i];
            const driftY = Math.sin((offset + i * 0.3) * Math.PI) * 6;
            return (
              <article
                key={project.slug}
                className={`absolute ${layout.className} transition-transform duration-300 ease-out`}
                style={{
                  transform: `translate3d(0, ${offset * layout.depth + driftY}px, 0) ${layout.transform}`,
                  transformStyle: "preserve-3d",
                  filter: `drop-shadow(0 30px 40px oklch(0 0 0 / 0.55))`,
                }}
              >
                <Link
                  to="/projects/$projectSlug"
                  params={{ projectSlug: project.slug }}
                  className="group block rounded-2xl border border-white/10 bg-gradient-to-br from-white to-[oklch(0.94_0.01_280)] p-4 sm:p-5 text-[oklch(0.20_0.03_280)] shadow-2xl transition-shadow hover:shadow-[0_30px_60px_-20px_oklch(0.55_0.27_280/0.6)]"
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
                  <p className="mt-2 line-clamp-2 text-xs text-[oklch(0.40_0.03_280)] sm:text-[13px]">
                    {project.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
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

        <div className="mt-10 flex justify-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/40 hover:bg-secondary"
          >
            View all work <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
