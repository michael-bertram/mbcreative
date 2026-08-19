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
        <article className="mx-auto w-full max-w-6xl px-6 pt-32 pb-20 sm:pt-40 sm:pb-24">
            <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" /> All work
            </Link>

            {/* Hero */}
            <header className="mt-8 grid items-center gap-8 lg:grid-cols-[1.15fr_1fr]">
                <div>
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
                    <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                        {project.title}
                    </h1>
                    <p className="mt-5 max-w-xl text-xl leading-relaxed text-foreground/80">
                        {project.summary}
                    </p>
                    {project.demoUrl && (
                        <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
                        >
                            Visit live site <ArrowUpRight className="h-4 w-4" />
                        </a>
                    )}
                </div>

                {project.cover && (
                    <div className="relative">
                        <div
                            aria-hidden
                            className="absolute -inset-6 rounded-[2rem] bg-primary/10 blur-2xl"
                        />
                        <div className="relative overflow-hidden rounded-2xl border border-border shadow-xl shadow-foreground/5">
                            {isLogo ? (
                                <div className={`flex aspect-[4/3] w-full items-center justify-center p-12 ${bgClass}`}>
                                    <img
                                        src={project.cover}
                                        alt={`${project.title} logo`}
                                        className="max-h-[70%] max-w-[70%] object-contain"
                                    />
                                </div>
                            ) : (
                                <img src={project.cover} alt="" className="aspect-[4/3] w-full object-cover" />
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Body + sticky meta rail */}
            <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_260px]">
                <div className="min-w-0">
                    {project.description && (
                        <p className="border-l-2 border-primary pl-5 text-lg leading-relaxed text-foreground/85">
                            {project.description}
                        </p>
                    )}

                    <div className="mt-10 space-y-5">
                        {project.sections?.map((section, i) => (
                            <section
                                key={section.heading}
                                className="group rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 sm:p-7"
                            >
                                <div className="flex items-baseline gap-4">
                                    <span className="font-display text-sm font-semibold tabular-nums text-primary/70">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
                                        {section.heading}
                                    </h2>
                                </div>
                                <p className="mt-3 pl-0 leading-relaxed text-muted-foreground sm:pl-10">
                                    {section.body}
                                </p>
                            </section>
                        ))}
                    </div>

                    {project.gallery?.length > 0 && (
                        <div className="mt-12">
                            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                                Gallery
                            </h2>
                            <div
                                className={`mt-5 grid gap-5 ${
                                    project.gallery.length === 1 ? "" : "sm:grid-cols-2"
                                }`}
                            >
                                {project.gallery.map((g) => {
                                    const asImage = g.mode === "image";
                                    return (
                                        <figure
                                            key={g.label}
                                            className="overflow-hidden rounded-2xl border border-border shadow-md shadow-foreground/5 transition-transform hover:-translate-y-0.5"
                                        >
                                            {asImage ? (
                                                <img
                                                    src={g.src}
                                                    alt={g.label}
                                                    loading="lazy"
                                                    className="w-full object-cover"
                                                />
                                            ) : (
                                                <div className={`flex aspect-square items-center justify-center p-8 ${bgClass}`}>
                                                    <img
                                                        src={g.src}
                                                        alt={g.label}
                                                        loading="lazy"
                                                        className="max-h-[80%] max-w-[80%] object-contain"
                                                    />
                                                </div>
                                            )}
                                            <figcaption className="border-t border-border bg-card px-4 py-2.5 text-xs text-muted-foreground">
                                                {g.label}
                                            </figcaption>
                                        </figure>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <aside className="lg:sticky lg:top-32 lg:self-start">
                    <div className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-sm">
                        <dl className="space-y-4 text-sm">
                            <div>
                                <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Type</dt>
                                <dd className="mt-1 font-medium text-foreground">{project.type}</dd>
                            </div>
                            {project.platform && (
                                <div>
                                    <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Platform</dt>
                                    <dd className="mt-1 font-medium text-foreground">{project.platform}</dd>
                                </div>
                            )}
                            {project.year && (
                                <div>
                                    <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Year</dt>
                                    <dd className="mt-1 font-medium text-foreground">{project.year}</dd>
                                </div>
                            )}
                        </dl>

                        {project.tags?.length > 0 && (
                            <div className="mt-6 border-t border-border pt-5">
                                <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                                    <Tag className="h-3.5 w-3.5" /> Tags
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {project.tags.map((t) => (
                                        <span
                                            key={t}
                                            className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-xs text-muted-foreground"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.demoUrl && (
                            <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                            >
                                Live site <ArrowUpRight className="h-4 w-4" />
                            </a>
                        )}
                    </div>
                </aside>
            </div>
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