import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
export function SiteFooter() {
    return (<footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}.
        </p>
        <div className="flex items-center gap-2">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <Github className="h-4 w-4"/>
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <Linkedin className="h-4 w-4"/>
          </a>
          <a href={profile.socials.x} target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <Twitter className="h-4 w-4"/>
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <Mail className="h-4 w-4"/>
          </a>
        </div>
      </div>
    </footer>);
}
