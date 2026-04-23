import { createFileRoute } from "@tanstack/react-router";
import { ProjectCard } from "@/components/project-card";
import { profile, projects } from "@/data/portfolio";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: `Projects — ${profile.name}` },
      {
        name: "description",
        content: `Selected projects by ${profile.name}, including web apps, developer tools, and open-source work.`,
      },
      { property: "og:title", content: `Projects — ${profile.name}` },
      {
        property: "og:description",
        content: `Selected projects by ${profile.name}.`,
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
      <header className="mb-12 max-w-2xl">
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Projects
        </h1>
        <p className="mt-4 text-muted-foreground">
          A selection of work — products, tools, and open source. Each one taught me something
          new.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}