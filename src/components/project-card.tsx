import { ArrowUpRight, BookOpen, Github } from "lucide-react";
import type { Project } from "@/data/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_oklch(0.70_0.22_295/0.35)]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-primary">{project.type}</span>
          <span className="text-xs text-muted-foreground">{project.year}</span>
        </div>
        <div className="flex items-center gap-1">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} repository`}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} live demo`}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {project.resourceUrl && (
            <a
              href={project.resourceUrl}
              aria-label={`${project.title} resource`}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <BookOpen className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
      <h3 className="font-display text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
        {project.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>
      {project.platform && (
        <p className="mt-3 text-xs font-medium uppercase tracking-wide text-primary/80">
          {project.platform}
        </p>
      )}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground/80">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}