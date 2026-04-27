import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { profile, projects, type Project } from "@/data/portfolio";

const workProjects = projects.filter((project) => project.type !== "Learning Resource");
const filters = ["All", "Website", "Design", "Code"] as const;
type WorkFilter = (typeof filters)[number];

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: `Work — ${profile.name}` },
      {
        name: "description",
        content: `Selected project work by ${profile.name}, including websites, design, graphics, and developer-focused code projects.`,
      },
      { property: "og:title", content: `Work — ${profile.name}` },
      {
        property: "og:description",
        content: `Selected websites, design work, graphics, and code projects by ${profile.name}.`,
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>("All");
  const projectCounts = useMemo(
    () =>
      filters.reduce(
        (counts, filter) => ({
          ...counts,
          [filter]:
            filter === "All"
              ? workProjects.length
              : workProjects.filter((project: Project) => project.type === filter).length,
        }),
        {} as Record<WorkFilter, number>,
      ),
    [],
  );
  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? workProjects
        : workProjects.filter((project: Project) => project.type === activeFilter),
    [activeFilter],
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
      <header className="mb-12 max-w-2xl">
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Work
        </h1>
        <p className="mt-4 text-muted-foreground">
          Project work across websites, code, design, and graphics — including coded builds,
          WordPress work, Wix sites, personal experiments, and work-related projects.
        </p>
      </header>
      <div
        className="-mx-6 mb-10 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Work type filters"
      >
        <div className="flex w-max min-w-full gap-5 border-b border-border" role="tablist">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative flex min-w-32 snap-start flex-col items-start gap-1 border-b-2 pb-4 pt-2 text-left transition-colors ${
                activeFilter === filter
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              }`}
            >
              <span className="font-display text-base font-semibold tracking-tight">{filter}</span>
              <span className="text-xs text-muted-foreground">{projectCounts[filter]} pieces</span>
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}