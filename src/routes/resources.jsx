import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { profile } from "@/data/portfolio";
const starterResources = [
    {
        title: "WordPress developer workflows",
        summary: "Guides and demos focused on modern WordPress development, front-end tooling, and practical implementation.",
        type: "Tutorials & demos",
    },
    {
        title: "Workshop materials",
        summary: "Structured learning activities, exercises, and reference materials for developers and learners.",
        type: "Workshops",
    },
    {
        title: "Teaching and CPD resources",
        summary: "Classroom-tested resources and professional development materials shaped by education and mentoring experience.",
        type: "Education",
    },
];
export const Route = createFileRoute("/resources")({
    head: () => ({
        meta: [
            { title: `Learning Resources — ${profile.name}` },
            {
                name: "description",
                content: `Learning resources by ${profile.name}, focused on WordPress, front-end development, mentoring, and developer education.`,
            },
            { property: "og:title", content: `Learning Resources — ${profile.name}` },
            {
                property: "og:description",
                content: `WordPress, front-end development, and developer education resources by ${profile.name}.`,
            },
        ],
    }),
    component: ResourcesPage,
});
function ResourcesPage() {
    return (<div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
      <header className="mb-12 max-w-3xl">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
          <BookOpen className="h-3.5 w-3.5 text-primary"/> WordPress-powered soon
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Learning resources
        </h1>
        <p className="mt-4 text-muted-foreground">
          A dedicated space for tutorials, workshops, teaching materials, and developer-focused
          resources. This page is ready to connect to your existing WordPress site once the resource
          category or tag is confirmed.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {starterResources.map((resource) => (<article key={resource.title} className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">
              {resource.type}
            </p>
            <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-foreground">
              {resource.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {resource.summary}
            </p>
          </article>))}
      </div>

      <section className="mt-12 rounded-xl border border-border bg-secondary/30 p-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          WordPress content source
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          When connected, this page can pull learning-resource posts from your existing WordPress
          site using a dedicated category, tag, or custom post type. Portfolio work such as websites,
          logo design, and graphics can stay curated locally unless you decide otherwise later.
        </p>
        <a href="mailto:mjbertram87@gmail.com" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground">
          Share the WordPress details <ArrowUpRight className="h-4 w-4"/>
        </a>
      </section>
    </div>);
}
