import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Github, Linkedin, Mail, Send, Twitter } from "lucide-react";
import { z } from "zod";
import { profile } from "@/data/portfolio";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${profile.name}` },
      {
        name: "description",
        content: `Get in touch with ${profile.name} about projects, collaborations, or just to say hi.`,
      },
      { property: "og:title", content: `Contact — ${profile.name}` },
      {
        property: "og:description",
        content: `Get in touch with ${profile.name}.`,
      },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});

type FormErrors = Partial<Record<"name" | "email" | "message", string>>;

function ContactPage() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const parsed = contactSchema.safeParse({
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
    });
    if (!parsed.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    e.currentTarget.reset();
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-20 sm:py-24">
      <header className="mb-12 max-w-2xl">
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Let&apos;s talk
        </h1>
        <p className="mt-4 text-muted-foreground">
          Have a project, a role, or an idea you&apos;d like to discuss? Drop a message — I read
          every one and reply within a couple of days.
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-[1fr_280px] md:items-start">
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl border border-border bg-card p-6"
          noValidate
        >
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              maxLength={100}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              placeholder="Your name"
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              maxLength={255}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              maxLength={1000}
              className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              placeholder="Tell me a bit about what you're working on…"
            />
            {errors.message && (
              <p className="mt-1 text-xs text-destructive">{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <Send className="h-4 w-4" /> Send message
          </button>
          {submitted && (
            <p className="text-sm text-primary">Thanks — your message has been queued.</p>
          )}
        </form>

        <aside className="space-y-4">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm text-foreground transition-colors hover:border-primary/40"
          >
            <Mail className="h-4 w-4 text-primary" /> {profile.email}
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm text-foreground transition-colors hover:border-primary/40"
          >
            <Github className="h-4 w-4 text-primary" /> GitHub
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm text-foreground transition-colors hover:border-primary/40"
          >
            <Linkedin className="h-4 w-4 text-primary" /> LinkedIn
          </a>
          <a
            href={profile.socials.x}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm text-foreground transition-colors hover:border-primary/40"
          >
            <Twitter className="h-4 w-4 text-primary" /> X (Twitter)
          </a>
        </aside>
      </div>
    </div>
  );
}