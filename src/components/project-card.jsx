import { ArrowUpRight, BookOpen, Github } from "lucide-react";
import { Link } from "@tanstack/react-router";

const PASTEL_PALETTE = [
    { bg: "oklch(0.86 0.07 250)", ink: "oklch(0.26 0.08 255)" }, // soft blue
    { bg: "oklch(0.88 0.04 240)", ink: "oklch(0.26 0.06 250)" }, // pale steel
    { bg: "oklch(0.84 0.06 220)", ink: "oklch(0.24 0.07 230)" }, // cool sky
    { bg: "oklch(0.90 0.02 250)", ink: "oklch(0.26 0.05 255)" }, // light grey
    { bg: "oklch(0.85 0.06 270)", ink: "oklch(0.26 0.08 270)" }, // periwinkle
    { bg: "oklch(0.82 0.08 255)", ink: "oklch(0.22 0.09 255)" }, // denim
];

function hashIndex(str, mod) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return h % mod;
}

export function ProjectCard({ project, featured = false, pastel = false }) {
    if (pastel) {
        const swatch = PASTEL_PALETTE[hashIndex(project.slug, PASTEL_PALETTE.length)];
        return (
            <article className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-28px_oklch(0.28_0.06_155/0.25)] ${featured ? "" : ""}`}>
                <Link to="/projects/$projectSlug" params={{ projectSlug: project.slug }} aria-label={`View ${project.title} case study`} className="absolute inset-0 z-0" />
                <div
                    className={`relative flex flex-col justify-between overflow-hidden ${featured ? "aspect-[16/10] p-8" : "aspect-[4/3] p-6"}`}
                    style={{ backgroundColor: swatch.bg, color: swatch.ink }}
                >
                    <div className="flex items-start justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-80">
                            {project.platform || project.type}
                        </span>
                        <div className="relative z-10 flex items-center gap-1">
                            {project.repoUrl && (<a href={project.repoUrl} target="_blank" rel="noreferrer" aria-label={`${project.title} repository`} className="rounded-md p-1.5 opacity-70 transition-opacity hover:opacity-100"><Github className="h-4 w-4" /></a>)}
                            {project.demoUrl && (<a href={project.demoUrl} target="_blank" rel="noreferrer" aria-label={`${project.title} live site`} className="rounded-md p-1.5 opacity-70 transition-opacity hover:opacity-100"><ArrowUpRight className="h-4 w-4" /></a>)}
                        </div>
                    </div>
                    <h3 className={`font-display font-bold tracking-tight ${featured ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}>
                        {project.title}
                    </h3>
                    {project.cover && project.coverMode === "logo" && (
                        <img src={project.cover} alt="" loading="lazy" aria-hidden className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 object-contain opacity-25 transition-transform duration-500 group-hover:scale-110" />
                    )}
                </div>
                <div className={`flex flex-col gap-3 ${featured ? "p-7" : "p-5"}`}>
                    <p className={`text-foreground ${featured ? "text-base" : "text-sm"}`}>{project.summary}</p>
                    <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
                        {project.year && <span>{project.year}</span>}
                        {project.tags?.slice(0, 3).map((tag) => (
                            <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-[11px]">{tag}</span>
                        ))}
                    </div>
                </div>
            </article>
        );
    }
    return (<article className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-[0_20px_50px_-28px_oklch(0.22_0.02_280/0.25)] ${featured ? "p-7" : "p-6"}`}>
      <Link to="/projects/$projectSlug" params={{ projectSlug: project.slug }} aria-label={`View ${project.title} case study`} className="absolute inset-0 z-0"/>
      {project.cover && (
        <div className={`relative z-0 ${featured ? "-mx-7 -mt-7 mb-6 aspect-[16/10]" : "-mx-6 -mt-6 mb-5 aspect-[16/10]"} overflow-hidden border-b border-border`}>
          {project.coverMode === "logo" ? (
            <div className={`flex h-full w-full items-center justify-center p-8 ${project.coverBg === "dark" ? "bg-[oklch(0.14_0.02_280)]" : "bg-[oklch(0.97_0.005_280)]"}`}>
              <img src={project.cover} alt={`${project.title} logo`} loading="lazy" className="max-h-[80%] max-w-[80%] object-contain transition-transform duration-500 group-hover:scale-[1.05]"/>
            </div>
          ) : (
            <img src={project.cover} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"/>
          )}
        </div>
      )}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">{project.type}</span>
        <div className="relative z-10 flex items-center gap-1">
          {project.repoUrl && (<a href={project.repoUrl} target="_blank" rel="noreferrer" aria-label={`${project.title} repository`} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              <Github className="h-4 w-4"/>
            </a>)}
          {project.demoUrl && (<a href={project.demoUrl} target="_blank" rel="noreferrer" aria-label={`${project.title} live site`} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              <ArrowUpRight className="h-4 w-4"/>
            </a>)}
          {project.resourceUrl && (<a href={project.resourceUrl} aria-label={`${project.title} resource`} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              <BookOpen className="h-4 w-4"/>
            </a>)}
        </div>
      </div>
      <h3 className={`font-display font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
        {project.title}
      </h3>
      <p className={`mt-2 text-muted-foreground ${featured ? "text-base" : "text-sm"}`}>{project.summary}</p>
      {!featured && project.description && (<p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground/80">{project.description}</p>)}
      {featured && project.description && (<p className="mt-3 text-sm leading-relaxed text-muted-foreground/80">{project.description}</p>)}
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        {project.platform && <span className="font-medium text-foreground/70">{project.platform}</span>}
        {project.platform && project.year && <span aria-hidden>·</span>}
        {project.year && <span>{project.year}</span>}
      </div>
      <div className="relative z-10 mt-3 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (<span key={tag} className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] text-muted-foreground">
            {tag}
          </span>))}
      </div>
    </article>);
}
