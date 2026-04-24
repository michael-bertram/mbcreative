// Edit this file to customize your portfolio content.
export const profile = {
  name: "Michael Bertram",
  initials: "MB",
  role: "Developer Advocate & Mentor",
  tagline: "I help developers build better software — through clear writing, working code, and honest conversations.",
  location: "Brooklyn, NY",
  email: "hello@michaelbertram.dev",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/your-handle",
    linkedin: "https://linkedin.com/in/your-handle",
    x: "https://x.com/your-handle",
  },
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  year: number;
};

export const projects: Project[] = [
  {
    slug: "lumen-analytics",
    title: "Lumen Analytics",
    summary: "Realtime product analytics dashboard with sub-second queries.",
    description:
      "Built a multi-tenant analytics platform powered by ClickHouse and a custom query DSL. Reduced p95 query latency from 4s to 280ms.",
    tags: ["TypeScript", "React", "ClickHouse", "Node"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/your-handle/lumen",
    featured: true,
    year: 2024,
  },
  {
    slug: "orbit-ui",
    title: "Orbit UI",
    summary: "Open-source headless component library used by 4k+ devs.",
    description:
      "Designed and shipped a fully accessible, themeable React component library with first-class TypeScript types and zero runtime CSS.",
    tags: ["React", "Radix", "Tailwind", "OSS"],
    repoUrl: "https://github.com/your-handle/orbit-ui",
    featured: true,
    year: 2024,
  },
  {
    slug: "drift-cms",
    title: "Drift CMS",
    summary: "Git-backed headless CMS for marketing teams.",
    description:
      "A Git-native CMS with branch-based previews, role-based publishing, and a visual block editor built on Tiptap.",
    tags: ["Next.js", "tRPC", "Postgres"],
    demoUrl: "https://example.com",
    featured: true,
    year: 2023,
  },
  {
    slug: "pulse-cli",
    title: "Pulse CLI",
    summary: "Developer CLI for inspecting production traffic locally.",
    description: "A Rust-powered CLI that streams sanitized production traffic into a local dev environment for safer debugging.",
    tags: ["Rust", "CLI", "DevTools"],
    repoUrl: "https://github.com/your-handle/pulse",
    year: 2023,
  },
  {
    slug: "tidepool",
    title: "Tidepool",
    summary: "Collaborative whiteboard with CRDT-backed offline sync.",
    description: "Real-time multiplayer canvas using Yjs, with offline-first persistence and conflict-free merging.",
    tags: ["React", "Yjs", "CRDT"],
    demoUrl: "https://example.com",
    year: 2022,
  },
  {
    slug: "harbor",
    title: "Harbor",
    summary: "Self-hosted feature flag service with edge evaluation.",
    description: "A lightweight feature-flag service that evaluates rules at the edge with <5ms overhead.",
    tags: ["Go", "Edge", "Infra"],
    repoUrl: "https://github.com/your-handle/harbor",
    year: 2022,
  },
];

export const techStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Postgres",
  "Tailwind",
  "Rust",
  "Go",
  "Docker",
  "AWS",
];

export const skills = [
  { group: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Radix UI", "Framer Motion"] },
  { group: "Backend", items: ["Node.js", "tRPC", "Postgres", "Redis", "GraphQL"] },
  { group: "Infra", items: ["AWS", "Docker", "Terraform", "GitHub Actions", "Cloudflare"] },
  { group: "Tools", items: ["Vite", "Vitest", "Playwright", "Figma"] },
];

export const timeline = [
  {
    period: "2023 — Present",
    role: "Senior Software Engineer",
    company: "Northwind Labs",
    description: "Leading the platform team building developer-facing tools used by 50k+ engineers.",
  },
  {
    period: "2020 — 2023",
    role: "Full-Stack Engineer",
    company: "Vellum",
    description: "Shipped the v2 editor and rebuilt the rendering pipeline for a 3x perf improvement.",
  },
  {
    period: "2018 — 2020",
    role: "Frontend Engineer",
    company: "Foundry",
    description: "Designed the design system and onboarded the first 12 engineers to it.",
  },
];