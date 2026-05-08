import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Globe, Code2, Palette } from "lucide-react";
import coverWebsites from "@/assets/cover-website-builds.jpg";
import coverApps from "@/assets/cover-apps.jpg";
import coverDesign from "@/assets/cover-design.jpg";

const ICONS = { Website: Globe, Code: Code2, Design: Palette };

const SLOTS = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5 md:row-span-1",
  "md:col-span-5 md:row-span-1",
];

function CategoryTile({ category, slotClass, index, featured, reduced, isCoarse }) {
  const ref = useRef(null);
  const imgRef = useRef(null);
  const [revealed, setRevealed] = useState(reduced);
  const Icon = ICONS[category.type];

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
          imgRef.current.style.transform = `scale(1.1) translate3d(${-px * 16}px, ${-py * 16}px, 0)`;
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

  const delay = `${Math.min(index * 110, 540)}ms`;

  return (
    <article
      ref={ref}
      className={`group relative ${slotClass} ${revealed ? "bento-reveal" : "opacity-0"} min-h-[260px] md:min-h-0`}
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
        to="/projects"
        search={{ filter: category.type }}
        className="relative z-10 block h-full overflow-hidden rounded-2xl border border-white/10 bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            ref={imgRef}
            src={category.cover}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ transformOrigin: "center" }}
          />
        </div>

        <div
          aria-hidden
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(to top, oklch(0.10 0.025 280 / 0.92) 0%, oklch(0.10 0.025 280 / 0.55) 45%, oklch(0.10 0.025 280 / 0.10) 100%)",
          }}
        />

        {Icon && (
          <Icon
            aria-hidden
            className="pointer-events-none absolute -bottom-6 -right-6 h-44 w-44 text-white/10 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:text-white/20"
            strokeWidth={1.25}
          />
        )}

        <div className="absolute right-3 top-3 flex items-center gap-2">
          <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur">
            {category.count} {category.count === 1 ? "project" : "projects"}
          </span>
          <span className="rounded-full bg-white/15 p-1.5 text-white backdrop-blur transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
            {category.eyebrow}
          </p>
          <h3 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
            {category.label}
          </h3>
          <p className="mt-2 max-w-md text-sm text-white/80 sm:text-base">{category.description}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white/90 transition-colors group-hover:text-primary">
            Explore {category.label.toLowerCase()} <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export function FeaturedCategories({ projects }) {
  const [reduced, setReduced] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);

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

  const count = (type) => projects.filter((p) => p.type === type).length;

  const categories = [
    {
      type: "Website",
      eyebrow: "Build",
      label: "Websites",
      description:
        "Hospitality, community, and education sites — from premium pubs to interactive learning tools.",
      cover: coverWebsites,
      count: count("Website"),
    },
    {
      type: "Code",
      eyebrow: "Ship",
      label: "Apps",
      description:
        "Custom SaaS and tools — HR platforms, scheduling apps, and AI-enhanced productivity products.",
      cover: coverApps,
      count: count("Code"),
    },
    {
      type: "Design",
      eyebrow: "Brand",
      label: "Design",
      description:
        "Identity systems and brand marks rooted in geometry, heritage, and considered typography.",
      cover: coverDesign,
      count: count("Design"),
    },
  ];

  return (
    <section className="relative">
      <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:py-20">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Featured work
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Three{" "}
            <span className="bg-gradient-to-r from-primary to-[oklch(0.78_0.20_300)] bg-clip-text text-transparent">
              kinds of work.
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Pick a lane — websites, apps, or design — and dive into the projects.
          </p>
        </div>

        {/* Mobile: stacked sticky deck */}
        <div className="md:hidden">
          {categories.map((category, i) => (
            <div
              key={category.type}
              className="sticky"
              style={{
                top: `${80 + i * 14}px`,
                marginBottom: i === categories.length - 1 ? 0 : "1.25rem",
                zIndex: 10 + i,
              }}
            >
              <Link
                to="/projects"
                search={{ filter: category.type }}
                className="group relative block h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/40"
              >
                <img
                  src={category.cover}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.10 0.025 280 / 0.95) 0%, oklch(0.10 0.025 280 / 0.55) 50%, oklch(0.10 0.025 280 / 0.10) 100%)",
                  }}
                />
                <div className="absolute right-3 top-3 flex items-center gap-2">
                  <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur">
                    {category.count} {category.count === 1 ? "project" : "projects"}
                  </span>
                  <span className="rounded-full bg-white/15 p-1.5 text-white backdrop-blur">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {category.eyebrow}
                  </p>
                  <h3 className="font-display text-3xl font-bold leading-tight text-white">
                    {category.label}
                  </h3>
                  <p className="mt-2 text-sm text-white/80">{category.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Desktop: bento grid */}
        <div className="hidden gap-4 md:grid md:grid-cols-12 md:auto-rows-[200px] lg:auto-rows-[240px]">
          {categories.map((category, i) => (
            <CategoryTile
              key={category.type}
              category={category}
              slotClass={SLOTS[i]}
              index={i}
              featured={i === 0}
              reduced={reduced}
              isCoarse={isCoarse}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
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