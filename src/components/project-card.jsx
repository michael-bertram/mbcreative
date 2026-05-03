import { ArrowUpRight, BookOpen, Github } from "lucide-react";
import { Link } from "@tanstack/react-router";
export function ProjectCard({ project, featured = false }) {
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
