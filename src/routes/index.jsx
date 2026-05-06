import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import { FeaturedCategories } from "@/components/featured-categories";
import { profile, projects, techStack } from "@/data/portfolio";
import { TypeAnimation } from 'react-type-animation';
export const Route = createFileRoute("/")({
    head: () => ({
        meta: [
            { title: `${profile.name} — ${profile.role}` },
            {
                name: "description",
                content: profile.tagline,
            },
            { property: "og:title", content: `${profile.name} — ${profile.role}` },
            { property: "og:description", content: profile.tagline },
        ],
    }),
    component: Index,
});
function Index() {
    const workProjects = projects.filter((p) => p.type !== "Learning Resource");
    return (<div>
      {/* Hero */}
      <section className="hero-animated relative overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-40 sm:pb-32 sm:pt-48 lg:pb-40 lg:pt-56">
          <div>
            {/* Name Section */}
            <TypeAnimation
              sequence={["Hi, i'm Michael."]}
              speed={70}
              className="font-display text-6xl font-bold tracking-tighter text-foreground sm:text-8xl lg:text-[10rem] leading-[0.95] mb-6"
              repeat={0}
            />
            
            <br />

            {/* Role Section */}
            <TypeAnimation
              sequence={[
                "Developer Advocate", 1000,
                "Mentor", 1000,
                "Teacher", 1000
              ]}
              wrapper="span"
              speed={20}
              className="block text-primary font-display text-5xl font-bold tracking-tighter sm:text-7xl lg:text-9xl leading-[0.95]"
              repeat={Infinity}
            />
          </div>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {profile.tagline}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to="/projects" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
              View work <ArrowRight className="h-4 w-4"/>
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Tech strip */}
      {/* <section className="border-y border-border bg-card/30">
        <div className="mx-auto w-full max-w-6xl px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {techStack.map((t) => (<span key={t} className="text-sm text-muted-foreground">
                {t}
              </span>))}
          </div>
        </div>
      </section> */}

      {/* Featured */}
      <FeaturedCategories projects={workProjects} />

      <section className="border-y border-border bg-secondary/20">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-14 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-primary">
              <BookOpen className="h-4 w-4"/> Developer learning resources
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
              Tutorials, workshops, and resources for a developer audience.
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Separate from project work, this space focuses on the learning material I create as a
              Developer Advocate: WordPress guidance, front-end demos, workshops, and mentoring resources.
            </p>
          </div>
          <Link to="/resources" className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-secondary">
            Explore resources <ArrowRight className="h-4 w-4"/>
          </Link>
        </div>
      </section>

      {/* About teaser */}
      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              I care about craft, performance, and helping developers build better on WordPress.
            </h2>
            <div>
              <p className="text-muted-foreground">
                Based in the North East of England. Developer Advocate and former educator with
                experience in developer tools, WordPress, and front-end development, focused on
                mentoring, content, and developer experience.
              </p>
              <Link to="/about" className="mt-6 inline-flex items-center gap-1 text-sm text-primary transition-colors hover:text-[oklch(0.78_0.20_300)]">
                More about me <ArrowRight className="h-4 w-4"/>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>);
}
