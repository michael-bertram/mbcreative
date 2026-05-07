import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef } from "react";
import { ArrowRight } from "lucide-react";
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
const SECTIONS = [
    { type: "Website", label: "Websites", description: "Hospitality, community, and education sites." },
    { type: "Code", label: "Apps", description: "Custom SaaS, scheduling, and AI-enhanced productivity tools." },
    { type: "Design", label: "Design", description: "Identity systems and brand marks rooted in geometry." },
];
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
function Section({ section, items, onViewAll, sectionRef }) {
    if (!items.length) return null;
    const [feature, ...rest] = items;
    return (
        <section ref={sectionRef} id={section.type.toLowerCase()} className="scroll-mt-24">
            <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-4">
                <div>
                    <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        {section.label}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                    <span className="hidden text-xs text-muted-foreground sm:inline">
                        {items.length} {items.length === 1 ? "project" : "projects"}
                    </span>
                    {onViewAll && (
                        <button
                            type="button"
                            onClick={onViewAll}
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-foreground"
                        >
                            View all <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="md:col-span-2">
                    <ProjectCard project={feature} featured pastel />
                </div>
                {rest.map((p) => (<ProjectCard key={p.slug} project={p} pastel />))}
            </div>
        </section>
    );
}
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
    const sectionRefs = useRef({});
    useEffect(() => {
        if (activeFilter === "All") return;
        const el = sectionRefs.current[activeFilter];
        if (el) {
            requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
        }
    }, [activeFilter]);
    const visibleSections = activeFilter === "All"
        ? SECTIONS
        : SECTIONS.filter((s) => s.type === activeFilter);
    return (<div className="mx-auto w-full max-w-6xl px-6 pt-32 pb-20 sm:pt-40 sm:pb-24">
      <header className="mb-10 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Selected work</p>
        <h1 className="font-display text-6xl font-bold tracking-tight text-foreground sm:text-7xl lg:text-8xl">
          Work
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A selection of websites, apps, and identity work — coded builds, WordPress and Wix sites,
          custom SaaS tools, and brand systems.
        </p>
      </header>
      <div className="mb-12 flex flex-wrap gap-2" role="tablist" aria-label="Work type filters">
        {filters.map((f) => {
            const active = activeFilter === f.type;
            return (
              <button
                key={f.type}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveFilter(f.type)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"}`}
              >
                {f.label}
                <span className={`text-xs ${active ? "text-background/70" : "text-muted-foreground/70"}`}>{projectCounts[f.type]}</span>
              </button>
            );
        })}
      </div>
      <div className="space-y-20">
        {visibleSections.map((section) => {
            const items = workProjects.filter((p) => p.type === section.type);
            return (
                <Section
                    key={section.type}
                    section={section}
                    items={items}
                    sectionRef={(el) => { sectionRefs.current[section.type] = el; }}
                    onViewAll={activeFilter === "All" ? () => setActiveFilter(section.type) : null}
                />
            );
        })}
      </div>
    </div>);
}
