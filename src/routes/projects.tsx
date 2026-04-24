import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { profile, projects, type Project } from "@/data/portfolio";

const filters = ["All", "Website", "Design", "Learning Resource", "Code"] as const;
type WorkFilter = (typeof filters)[number];

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: `Work — ${profile.name}` },
      {
        name: "description",
        content: `Selected work by ${profile.name}, including websites, design, learning resources, and developer-focused code projects.`,
      },
      { property: "og:title", content: `Work — ${profile.name}` },
      {
        property: "og:description",
        content: `Selected websites, design work, learning resources, and developer content by ${profile.name}.`,
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>("All");
  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project: Project) => project.type === activeFilter),
    [activeFilter],
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
      <header className="mb-12 max-w-2xl">
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Work
        </h1>
        <p className="mt-4 text-muted-foreground">
          A flexible portfolio of websites, code, design work, and learning resources — including
          coded builds, WordPress work, Wix sites, graphics, and teaching materials.
        </p>
      </header>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
              activeFilter === filter
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}