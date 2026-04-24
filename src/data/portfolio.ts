// Edit this file to customize your portfolio content.
export const profile = {
  name: "Michael Bertram",
  initials: "MB",
  role: "Developer Advocate, Mentor & Teacher",
  tagline:
    "Engineering mentor and ex–Computer Science teacher helping developers build better software through clear writing, working code, and honest conversations.",
  location: "Stockton-on-Tees, UK",
  email: "mjbertram87@gmail.com",
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
  type: "Website" | "Design" | "Learning Resource" | "Code";
  platform?: string;
  summary: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  resourceUrl?: string;
  featured?: boolean;
  year: number;
};

export const projects: Project[] = [
  {
    slug: "wordpress-learning-workshops",
    title: "WordPress Learning Workshops",
    type: "Learning Resource",
    platform: "WordPress / Front-end",
    summary: "Practical workshop materials for developers learning modern WordPress workflows.",
    description:
      "Created structured learning resources, demos, and guided exercises to help developers understand WordPress, front-end tooling, and best-practice implementation.",
    tags: ["WordPress", "Teaching", "Workshops", "Developer Experience"],
    resourceUrl: "/resources",
    featured: true,
    year: 2026,
  },
  {
    slug: "developer-demo-projects",
    title: "Developer Demo Projects",
    type: "Code",
    platform: "React / WordPress",
    summary: "Small, focused builds used to explain concepts through working code.",
    description:
      "Built sample projects and demos that turn technical ideas into practical examples for talks, tutorials, and developer onboarding.",
    tags: ["React", "JavaScript", "WordPress", "Tutorials"],
    featured: true,
    year: 2026,
  },
  {
    slug: "education-resource-packs",
    title: "Education Resource Packs",
    type: "Learning Resource",
    platform: "Classroom / CPD",
    summary: "Curriculum materials, CPD sessions, and scaffolded resources for mixed abilities.",
    description:
      "Designed inclusive teaching materials for Computer Science, Creative iMedia, and staff development, with differentiated pathways and accessibility in mind.",
    tags: ["Curriculum", "CPD", "Accessibility", "Computer Science"],
    featured: true,
    year: 2023,
  },
  {
    slug: "website-builds",
    title: "Website Builds",
    type: "Website",
    platform: "Code / WordPress / Wix",
    summary: "A mix of coded, WordPress, and Wix websites created for different audiences.",
    description:
      "Designed and built web experiences across platforms, focusing on clear messaging, usable layouts, and practical delivery for each project’s constraints.",
    tags: ["Web Design", "WordPress", "Wix", "Frontend"],
    year: 2024,
  },
  {
    slug: "brand-and-logo-work",
    title: "Brand & Logo Work",
    type: "Design",
    platform: "Digital design",
    summary: "Logo concepts, graphics, and visual assets for digital and print use.",
    description:
      "Created visual identity work and graphics informed by a background in creative digital media, print production, and practical client delivery.",
    tags: ["Logo Design", "Graphics", "Branding", "Print"],
    year: 2024,
  },
  {
    slug: "developer-content",
    title: "Developer Content",
    type: "Learning Resource",
    platform: "Articles / Demos / Talks",
    summary: "Technical content that helps developers understand tools, workflows, and concepts.",
    description:
      "Produced tutorials, demos, documentation-style guidance, and educational content shaped by both industry and classroom experience.",
    tags: ["Technical Writing", "Demos", "Mentoring", "WordPress"],
    resourceUrl: "/resources",
    year: 2026,
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
  {
    group: "WordPress & Web",
    items: ["WordPress", "PHP", "HTML", "CSS", "JavaScript"],
  },
  {
    group: "Programming",
    items: ["Python", "TypeScript", "Visual Basic", "React", "Node.js"],
  },
  {
    group: "Education & Mentoring",
    items: [
      "Curriculum design",
      "Workshops & CPD",
      "Inclusive practice",
      "Onboarding programmes",
    ],
  },
  {
    group: "Content & Media",
    items: ["Technical writing", "Tutorials & demos", "Digital media", "Public speaking"],
  },
];

export const timeline = [
  {
    period: "2026 — Present",
    role: "Developer Advocate",
    company: "WP Engine",
    description:
      "Bridge between the developer community and product teams. Create technical content, engage developers at events and online, and mentor colleagues on WordPress and front-end development.",
  },
  {
    period: "2023 — 2026",
    role: "Engineering Mentor",
    company: "Big Bite Creative",
    description:
      "Onboarded and mentored engineers, designed continuous-development programmes, and partnered with educational organisations to bridge industry and learning.",
  },
  {
    period: "2019 — 2023",
    role: "Head of Computer Science & iMedia",
    company: "Rye Hills Academy (NELT)",
    description:
      "Led the Computing department across KS3 and KS4, teaching GCSE Computer Science and Creative iMedia, and delivering staff CPD and digital solutions across the school.",
  },
  {
    period: "2017 — 2019",
    role: "Teacher of Computer Science",
    company: "Nunthorpe Academy",
    description:
      "Taught Computer Science at KS3/KS4 and Media at KS5, progressing from trainee to qualified teacher with full responsibility for planning, assessment, and pastoral care.",
  },
  {
    period: "2013 — 2017",
    role: "Cover Supervisor / Teacher",
    company: "Teaching Personnel",
    description:
      "Worked across mainstream and SEN secondary schools, progressing from teaching assistant to leading RE and later IT departments across KS3 and KS4.",
  },
  {
    period: "2006 — 2013",
    role: "Printer / Print Finisher",
    company: "County Print",
    description:
      "Produced print jobs and occasional design artwork, while handling customer liaison and deliveries — building adaptability and problem-solving skills.",
  },
];
