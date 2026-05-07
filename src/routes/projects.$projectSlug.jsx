import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Calendar, Tag } from "lucide-react";
import { profile, projects } from "@/data/portfolio";

export const Route = createFileRoute("/projects/$projectSlug")({
    head: ({ params }) => {
        const project = projects.find((p) => p.slug === params.projectSlug);
        if (!project) {
            return { meta: [{ title: `Project not found — ${profile.name}` }] };
        }
        const title = `${project.title} — ${profile.name}`;
        const description = project.summary;
        const meta = [
            { title },
            { name: "description", content: description },
            { property: "og:title", content: title },
            { property: "og:description", content: description },
        ];
        if (project.cover && project.coverMode !== "logo") {
            meta.push({ property: "og:image", content: project.cover });
            meta.push({ name: "twitter:image", content: project.cover });
        }
        return { meta };
    },
    loader: ({ params }) => {
        const project = projects.find((p) => p.slug === params.projectSlug);
        if (!project) throw notFound();
        return { project };
    },
    component: ProjectDetail,
    notFoundComponent: NotFoundProject,
    errorComponent: ProjectError,
});

function ProjectDetail() {
    const { project } = Route.useLoaderData();
    const isLogo = project.coverMode === "logo";
    const bgClass = project.coverBg === "dark" ? "bg-[oklch(0.14_0.02_280)]" : "bg-white";

    return (
        <article className="mx-auto w-full max-w-4xl px-6 pt-32 pb-20 sm:pt-40 sm:pb-24">
            <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" /> All work
            </Link>

            <header className="mt-8">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
                        {project.type}
                    </span>
                    {project.platform && (
                        <span className="text-muted-foreground">{project.platform}</span>
                    )}
                    {project.year && (
                        <span className="inline-flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-3 w-3" /> {project.year}
                        </span>
                    )}
                </div>
                <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    {project.title}
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{project.summary}</p>

                {project.demoUrl && (
                    <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
                    >
                        Visit live site <ArrowUpRight className="h-4 w-4" />
                    </a>
                )}
            </header>

            {project.cover && (
                <div className="mt-10 overflow-hidden rounded-2xl border border-border">
                    {isLogo ? (
                        <div className={`flex aspect-[16/9] w-full items-center justify-center p-12 ${bgClass}`}>
                            <img
                                src={project.cover}
                                alt={`${project.title} logo`}
                                className="max-h-[70%] max-w-[70%] object-contain"
                            />
                        </div>
                    ) : (
                        <img
                            src={project.cover}
                            alt=""
                            className="aspect-[16/9] w-full object-cover"
                        />
                    )}
                </div>
            )}

            {project.gallery && project.gallery.length > 0 && (
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {project.gallery.map((g) => (
                        <figure key={g.label} className="overflow-hidden rounded-xl border border-border">
                            <div className={`flex aspect-square items-center justify-center p-6 ${bgClass}`}>
                                <img src={g.src} alt={g.label} className="max-h-[80%] max-w-[80%] object-contain" />
                            </div>
                            <figcaption className="border-t border-border bg-card px-3 py-2 text-xs text-muted-foreground">
                                {g.label}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            )}

            <div className="mt-10 space-y-8">
                {project.description && (
                    <p className="text-base leading-relaxed text-muted-foreground">
                        {project.description}
                    </p>
                )}
                {project.sections?.map((section) => (
                    <section key={section.heading}>
                        <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
                            {section.heading}
                        </h2>
                        <p className="mt-2 leading-relaxed text-muted-foreground">{section.body}</p>
                    </section>
                ))}
            </div>

            {project.tags?.length > 0 && (
                <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-8">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    {project.tags.map((t) => (
                        <span
                            key={t}
                            className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-xs text-muted-foreground"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            )}
        </article>
    );
}

function NotFoundProject() {
    const { projectSlug } = Route.useParams();
    return (
        <div className="mx-auto w-full max-w-2xl px-6 py-24 text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">
                Project not found
            </h1>
            <p className="mt-3 text-muted-foreground">
                No project matches &quot;{projectSlug}&quot;.
            </p>
            <Link
                to="/projects"
                className="mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
            >
                <ArrowLeft className="h-4 w-4" /> Back to work
            </Link>
        </div>
    );
}

function ProjectError({ error, reset }) {
    const router = useRouter();
    return (
        <div className="mx-auto w-full max-w-2xl px-6 py-24 text-center">
            <h1 className="font-display text-3xl font-bold text-foreground">Something went wrong</h1>
            <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
            <button
                type="button"
                onClick={() => {
                    router.invalidate();
                    reset();
                }}
                className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
                Retry
            </button>
        </div>
    );
}