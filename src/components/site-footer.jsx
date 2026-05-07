import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { profile } from "@/data/portfolio";
import logoMbCreative from "@/assets/mb-logo-white.png";

export function SiteFooter() {
    const iconClass = "rounded-md p-2 text-primary-foreground/70 transition-colors hover:text-primary-foreground";
    return (<footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 py-16 text-center">
        <img src={logoMbCreative} alt="MB Creative" className="h-12 w-auto" />

        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
            Got questions?
          </h2>
          <Link to="/contact" className="mt-2 inline-block font-display text-2xl font-bold tracking-tight text-primary-foreground/90 underline-offset-4 transition-opacity hover:opacity-80 hover:underline sm:text-3xl">
            Feel free to reach out.
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconClass}>
            <Linkedin className="h-5 w-5" />
          </a>
          <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconClass}>
            <Github className="h-5 w-5" />
          </a>
          <a href={profile.socials.x} target="_blank" rel="noreferrer" aria-label="X (Twitter)" className={iconClass}>
            <Twitter className="h-5 w-5" />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className={iconClass}>
            <Mail className="h-5 w-5" />
          </a>
        </div>

        <p className="text-sm text-primary-foreground/70">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>);
}
