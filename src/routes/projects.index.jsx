import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { ProjectCard } from "@/components/project-card";
import { profile, projects } from "@/data/portfolio";
const workProjects = projects.filter((project) => project.type !== "Learning Resource");
const filters = [
    { label: "All", type: "All" },
    { label: "Websites", type: "Website" },
    { label: "Apps", type: "Code" },
    { label: "Design", type: "Design" },
];
const VALID = new Set(filters.map((f) => f.type));
export const Route = createFileRoute("/projects/")({
    validateSearch: (search) => {
        const f = search?.filter;
        return { filter: typeof f === "string" && VALID.has(f) ? f : "All" };
    },
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
    const { filter: activeFilter } = Route.useSearch();
    const navigate = useNavigate({ from: "/projects" });
    const setActiveFilter = (type) =>
        navigate({ search: { filter: type }, replace: true });
    const projectCounts = useMemo(() => filters.reduce((counts, f) => ({
        ...counts,
        [f.type]: f.type === "All"
            ? workProjects.length
            : workProjects.filter((project) => project.type === f.type).length,
    }), {}), []);
    const filteredProjects = useMemo(() => activeFilter === "All"
        ? workProjects
        : workProjects.filter((project) => project.type === activeFilter), [activeFilter]);
    return (<div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
      <header className="mb-12 max-w-2xl">
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Work
        </h1>
        <p className="mt-4 text-muted-foreground">
          Project work across websites, code, design, and graphics — including coded builds,
          WordPress work, Wix sites, personal experiments, and work-related projects.
        </p>
      </header>
      <div className="-mx-6 mb-10 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Work type filters">
        <div className="flex w-max min-w-full gap-5 border-b border-border" role="tablist">
          {filters.map((f) => (<button key={f.type} type="button" role="tab" aria-selected={activeFilter === f.type} onClick={() => setActiveFilter(f.type)} className={`relative flex min-w-32 snap-start flex-col items-start gap-1 border-b-2 pb-4 pt-2 text-left transition-colors ${activeFilter === f.type
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"}`}>
              <span className="font-display text-base font-semibold tracking-tight">{f.label}</span>
              <span className="text-xs text-muted-foreground">{projectCounts[f.type]} pieces</span>
            </button>))}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((p) => (<ProjectCard key={p.slug} project={p}/>))}
      </div>
    </div>);
}
