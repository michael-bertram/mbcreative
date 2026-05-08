import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { profile, skills, timeline } from "@/data/portfolio";
import { ScrollTimeline } from "@/components/scroll-timeline";
export const Route = createFileRoute("/about")({
    head: () => ({
        meta: [
            { title: `About — ${profile.name}` },
            {
                name: "description",
                content: `About ${profile.name}: ${profile.role} based in ${profile.location}.`,
            },
            { property: "og:title", content: `About — ${profile.name}` },
            {
                property: "og:description",
                content: `About ${profile.name}: ${profile.role} based in ${profile.location}.`,
            },
        ],
    }),
    component: AboutPage,
});
function AboutPage() {
    return (<div className="mx-auto w-full max-w-4xl px-6 pt-32 pb-20 sm:pt-40 sm:pb-24">
      <header className="mb-12">
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          About
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          I&apos;m {profile.name}, a {profile.role.toLowerCase()} based in {profile.location}. I
          like building products that feel fast, look clean, and respect the people using them.
          Most of my work lives at the intersection of design systems, developer tooling, and
          frontend infrastructure.
        </p>
        <p className="mt-4 text-muted-foreground">
          Outside of code, I&apos;m usually reading sci-fi, brewing coffee, or wandering around
          looking at architecture.
        </p>
        <a href={profile.resumeUrl} className="mt-8 inline-flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
          <Download className="h-4 w-4"/> Download résumé
        </a>
      </header>

      <section className="mb-16">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          Experience
        </h2>
        <ScrollTimeline items={timeline} />
      </section>

      <section>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          Skills
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {skills.map((s) => (<div key={s.group} className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground">{s.group}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.items.map((item) => (<span key={item} className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-xs text-muted-foreground">
                    {item}
                  </span>))}
              </div>
            </div>))}
        </div>
      </section>
    </div>);
}
