import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Globe, Code2, Palette, BookOpen, Sparkles } from "lucide-react";

// Bento-grid layout slots (desktop). Index maps to project order.
// 12-col grid, mixed col/row spans. Up to 6 tiles.
const SLOTS = [
  "md:col-span-7 md:row-span-2", // 0 — featured large
  "md:col-span-5 md:row-span-1",
  "md:col-span-5 md:row-span-1",
  "md:col-span-4 md:row-span-1",
  "md:col-span-4 md:row-span-1",
  "md:col-span-4 md:row-span-1",
];

const TYPE_ICON = {
  Website: Globe,
  Code: Code2,
  Design: Palette,
  "Learning Resource": BookOpen,
};

function iconFor(type) {
  return TYPE_ICON[type] ?? Sparkles;
}

function BentoTile({ project, slotClass, index, featured, reduced, isCoarse }) {
  const ref = useRef(null);
  const imgRef = useRef(null);
  const [revealed, setRevealed] = useState(reduced);

  // Scroll reveal
  useEffect(() => {
    if (reduced) {
      setRevealed(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  // Magnetic tilt + image parallax (desktop only)
  useEffect(() => {
    if (reduced || isCoarse) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1000px) rotateX(${-py * 4}deg) rotateY(${px * 4}deg) translateZ(0)`;
        if (imgRef.current) {
          imgRef.current.style.transform = `scale(1.08) translate3d(${-px * 12}px, ${-py * 12}px, 0)`;
        }
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
      if (imgRef.current) imgRef.current.style.transform = "";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, isCoarse]);

  const cover = project.cover;
  const TypeIcon = iconFor(project.type);
  const delay = `${Math.min(index * 90, 540)}ms`;

  return (
    <article
      ref={ref}
      className={`group relative ${slotClass} ${revealed ? "bento-reveal" : "opacity-0"} min-h-[220px] md:min-h-0`}
      style={{
        animationDelay: delay,
        transformStyle: "preserve-3d",
        transition: "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {featured && !reduced && (
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl"
          style={{
            background:
              "conic-gradient(from 0deg, oklch(0.55 0.27 280), oklch(0.78 0.20 300), oklch(0.55 0.27 280))",
            animation: "bento-border-spin 6s linear infinite",
            filter: "blur(8px)",
            opacity: 0.55,
            zIndex: 0,
          }}
        />
      )}
      <Link
        to="/projects/$projectSlug"
        params={{ projectSlug: project.slug }}
        className="relative z-10 block h-full overflow-hidden rounded-2xl border border-white/10 bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Background: cover image or gradient */}
        <div className="absolute inset-0 overflow-hidden">
          {cover ? (
            <img
              ref={imgRef}
              src={cover}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ transformOrigin: "center" }}
            />
          ) : (
            <div className="relative h-full w-full bg-card">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 85% 15%, oklch(0.55 0.27 280 / 0.22), transparent 60%), radial-gradient(circle at 15% 90%, oklch(0.50 0.22 265 / 0.16), transparent 55%)",
                }}
              />
              <TypeIcon
                aria-hidden
                className="absolute -bottom-6 -right-6 h-44 w-44 text-primary/15 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:text-primary/25"
                strokeWidth={1.25}
              />
            </div>
          )}
        </div>

        {/* Dark gradient for text legibility */}
        <div
          aria-hidden
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(to top, oklch(0.10 0.025 280 / 0.92) 0%, oklch(0.10 0.025 280 / 0.55) 45%, oklch(0.10 0.025 280 / 0.15) 100%)",
          }}
        />

        {/* Top-right meta */}
        <div className="absolute right-3 top-3 flex items-center gap-2">
          <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur">
            {project.year}
          </span>
          <span className="rounded-full bg-white/15 p-1.5 text-white backdrop-blur transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>

        {/* Bottom info — slides up on hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
            {project.type}
          </p>
          <h3 className="font-display text-lg font-bold leading-tight text-white sm:text-xl md:text-2xl">
            {project.title}
          </h3>
          <div
            className="grid grid-rows-[1fr] transition-all duration-500 ease-out md:grid-rows-[0fr] md:opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100"
          >
            <div className="overflow-hidden">
              <p className="mt-2 line-clamp-2 text-sm text-white/80">{project.summary}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/85 backdrop-blur"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

function MobileStackedDeck({ projects, reduced }) {
  return (
    <div className="md:hidden">
      {projects.map((project, i) => {
        const TypeIcon = iconFor(project.type);
        const cover = project.cover;
        const top = 80 + i * 14;
        return (
          <div
            key={project.slug}
            className="sticky"
            style={{
              top: `${top}px`,
              marginBottom: i === projects.length - 1 ? 0 : "1.25rem",
              zIndex: 10 + i,
            }}
          >
            <Link
              to="/projects/$projectSlug"
              params={{ projectSlug: project.slug }}
              className="group relative block h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={
                reduced
                  ? undefined
                  : { transition: "transform 500ms cubic-bezier(0.22,1,0.36,1)" }
              }
            >
              <div className="absolute inset-0 overflow-hidden">
                {cover ? (
                  <img
                    src={cover}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="relative h-full w-full bg-card">
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at 85% 15%, oklch(0.55 0.27 280 / 0.22), transparent 60%), radial-gradient(circle at 15% 90%, oklch(0.50 0.22 265 / 0.16), transparent 55%)",
                      }}
                    />
                    <TypeIcon
                      aria-hidden
                      className="absolute -bottom-6 -right-6 h-48 w-48 text-primary/15"
                      strokeWidth={1.25}
                    />
                  </div>
                )}
              </div>
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.10 0.025 280 / 0.95) 0%, oklch(0.10 0.025 280 / 0.55) 50%, oklch(0.10 0.025 280 / 0.15) 100%)",
                }}
              />
              <div className="absolute right-3 top-3 flex items-center gap-2">
                <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur">
                  {project.year}
                </span>
                <span className="rounded-full bg-white/15 p-1.5 text-white backdrop-blur">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {project.type}
                </p>
                <h3 className="font-display text-2xl font-bold leading-tight text-white">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-white/80">{project.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/85 backdrop-blur"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export function FloatingProjectsShowcase({
  projects,
  // legacy/no-op — kept for backward compatibility
  variant: _variant,
  eyebrow = "Featured work",
  heading,
  description = "A small, curated selection. Head to the work page for everything.",
  showCta = true,
}) {
  const [reduced, setReduced] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);
  const [filter, setFilter] = useState("All");

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

  const filters = useMemo(() => {
    const types = Array.from(new Set(projects.map((p) => p.type)));
    return ["All", ...types];
  }, [projects]);

  const visible = useMemo(() => {
    const list = filter === "All" ? projects : projects.filter((p) => p.type === filter);
    return list.slice(0, SLOTS.length);
  }, [projects, filter]);

  return (
    <section className="relative overflow-hidden border-y border-border bg-[oklch(0.10_0.025_280)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 22%, oklch(0.55 0.27 280 / 0.18), transparent 55%), radial-gradient(circle at 82% 78%, oklch(0.50 0.22 265 / 0.15), transparent 55%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {eyebrow}
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              {heading ?? (
                <>
                  Selected{" "}
                  <span className="bg-gradient-to-r from-primary to-[oklch(0.78_0.20_300)] bg-clip-text text-transparent">
                    work.
                  </span>
                </>
              )}
            </h2>
            <p className="mt-4 text-muted-foreground">{description}</p>
          </div>

          {filters.length > 2 && projects.length > 4 && (
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => {
                const active = f === filter;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                      active
                        ? "border-primary/60 bg-primary/15 text-foreground"
                        : "border-border bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Mobile: stacked sticky-card deck */}
        <MobileStackedDeck projects={visible} reduced={reduced} />

        {/* Desktop: bento grid */}
        <div className="hidden gap-4 md:grid md:grid-cols-12 md:auto-rows-[200px] lg:auto-rows-[220px]">
          {visible.map((project, i) => (
            <BentoTile
              key={project.slug + filter}
              project={project}
              slotClass={SLOTS[i] ?? "md:col-span-4 md:row-span-1"}
              index={i}
              featured={i === 0}
              reduced={reduced}
              isCoarse={isCoarse}
            />
          ))}
        </div>

        {showCta && (
          <div className="mt-12 flex justify-center">
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