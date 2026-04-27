import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, BookOpen, Github } from "lucide-react";
import { profile, projects } from "@/data/portfolio";
export const Route = createFileRoute("/projects/$projectSlug")({
    head: ({ params }) => {
        const project = projects.find((item) => item.slug === params.projectSlug);
        const title = project ? `${project.title} — ${profile.name}` : `Project — ${profile.name}`;
        const description = project?.summary ?? `A project case study by ${profile.name}.`;
        return {
            meta: [
                { title },
                { name: "description", content: description },
                { property: "og:title", content: title },
                { property: "og:description", content: description },
            ],
        };
    },
    component: ProjectPage,
});
function ProjectPage() {
    const { projectSlug } = Route.useParams();
    const project = projects.find((item) => item.slug === projectSlug);
    if (!project) {
        return (<main className="mx-auto w-full max-w-3xl px-6 py-28">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4"/> Back to work
        </Link>
        <h1 className="mt-10 font-display text-4xl font-bold tracking-tight text-foreground">
          Project not found
        </h1>
        <p className="mt-4 text-muted-foreground">
          This project may have moved, or it may not be ready as a case study yet.
        </p>
      </main>);
    }
    const externalLinks = [
        ...(project.demoUrl ? [{ label: "View live example", href: project.demoUrl, icon: ArrowUpRight }] : []),
        ...(project.repoUrl ? [{ label: "View repository", href: project.repoUrl, icon: Github }] : []),
    ];
    return (<main className="mx-auto w-full max-w-5xl px-6 py-24 sm:py-28">
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4"/> Back to work
      </Link>

      <header className="mt-10 border-b border-border pb-10">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="text-primary">{project.type}</span>
          <span aria-hidden="true">/</span>
          <span>{project.year}</span>
          {project.platform && (<>
              <span aria-hidden="true">/</span>
              <span>{project.platform}</span>
            </>)}
        </div>
        <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
      </header>

      <div className="grid gap-10 py-10 lg:grid-cols-[1fr_18rem]">
        <section>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Case study
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </section>

        <aside className="space-y-6 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <div>
            <h2 className="text-sm font-medium text-foreground">Focus areas</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (<span key={tag} className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-xs text-muted-foreground">
                  {tag}
                </span>))}
            </div>
          </div>

          {(externalLinks.length > 0 || project.resourceUrl) && (<div>
              <h2 className="text-sm font-medium text-foreground">Links</h2>
              <div className="mt-3 grid gap-2">
                {externalLinks.map((link) => {
                const Icon = link.icon;
                const className = "inline-flex items-center justify-between gap-3 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-secondary";
                return (<a key={link.label} href={link.href} target="_blank" rel="noreferrer" className={className}>
                    {link.label} <Icon className="h-4 w-4 text-primary"/>
                  </a>);
            })}
                {project.resourceUrl && (<Link to="/resources" className="inline-flex items-center justify-between gap-3 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-secondary">
                    View resource <BookOpen className="h-4 w-4 text-primary"/>
                  </Link>)}
              </div>
            </div>)}
        </aside>
      </div>
    </main>);
}
