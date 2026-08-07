import { profile, projects, skills, timeline } from "@/data/portfolio";

function projectLine(p) {
  const bits = [
    `- ${p.title} (${p.type}${p.platform ? `, ${p.platform}` : ""}${p.year ? `, ${p.year}` : ""})`,
    `  Link on this site: /projects/${p.slug}`,
    p.demoUrl ? `  Live: ${p.demoUrl}` : null,
    p.summary ? `  Summary: ${p.summary}` : null,
    p.description ? `  Detail: ${p.description}` : null,
    Array.isArray(p.sections)
      ? p.sections.map((s) => `  ${s.heading}: ${s.body}`).join("\n")
      : null,
  ];
  return bits.filter(Boolean).join("\n");
}

export function buildSiteContext() {
  return [
    `NAME: ${profile.name}`,
    `ROLE: ${profile.role}`,
    `LOCATION: ${profile.location}`,
    `TAGLINE: ${profile.tagline}`,
    `EMAIL: ${profile.email}`,
    `LINKS: GitHub ${profile.socials.github} | LinkedIn ${profile.socials.linkedin} | X ${profile.socials.x}`,
    "",
    "SITE PAGES: / (home), /projects (work), /resources (learning resources), /about, /contact",
    "",
    "SKILLS:",
    (skills ?? [])
      .map((s) => (typeof s === "string" ? `- ${s}` : `- ${s.title ?? s.name}: ${(s.items ?? []).join(", ")}`))
      .join("\n"),
    "",
    "CAREER TIMELINE:",
    (timeline ?? [])
      .map((t) => `- ${t.period ?? t.year ?? ""} ${t.title ?? ""}${t.org ? ` @ ${t.org}` : ""}: ${t.description ?? ""}`)
      .join("\n"),
    "",
    "PROJECTS AND WORK:",
    projects.map(projectLine).join("\n"),
  ].join("\n");
}

export const whatsappLink = (message) =>
  `https://wa.me/${profile.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;