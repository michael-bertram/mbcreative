// Edit this file to customize your portfolio content.
import coverWebsiteBuilds from "@/assets/cover-website-builds.jpg";
export const profile = {
    name: "Michael Bertram",
    initials: "MB",
    role: "Developer Advocate, Mentor & Teacher",
    tagline: "Engineering mentor and ex–Computer Science teacher helping developers build better software through clear writing, working code, and honest conversations.",
    location: "Stockton-on-Tees, UK",
    email: "michael.bertram@wpengine.com",
    resumeUrl: "/resume.pdf",
    socials: {
        github: "https://github.com/michael-bertram",
        linkedin: "https://www.linkedin.com/in/michael-bertram-3b335b290/",
        x: "https://x.com/micberty",
    },
};
export const projects = [
    {
        slug: "wordpress-learning-workshops",
        title: "WordPress Learning Workshops",
        type: "Learning Resource",
        platform: "WordPress / Front-end",
        summary: "Practical workshop materials for developers learning modern WordPress workflows.",
        description: "Created structured learning resources, demos, and guided exercises to help developers understand WordPress, front-end tooling, and best-practice implementation.",
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
        description: "Built sample projects and demos that turn technical ideas into practical examples for talks, tutorials, and developer onboarding.",
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
        description: "Designed inclusive teaching materials for Computer Science, Creative iMedia, and staff development, with differentiated pathways and accessibility in mind.",
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
        description: "Designed and built web experiences across platforms, focusing on clear messaging, usable layouts, and practical delivery for each project’s constraints.",
        tags: ["Web Design", "WordPress", "Wix", "Frontend"],
        year: 2024,
        cover: coverWebsiteBuilds,
        client: "Mixed clients & personal",
        role: "Designer & developer",
        timeframe: "Ongoing, 2019 – present",
        stack: ["WordPress", "Wix", "HTML", "CSS", "JavaScript", "PHP"],
        highlights: [
            "Shipped sites across three different platforms",
            "Custom WordPress themes and block patterns",
            "Hand-coded landing pages with zero framework overhead",
            "Briefed, designed, built, and handed over end-to-end",
        ],
        sections: [
            {
                heading: "Context",
                body: "A rolling collection of small and mid-sized websites built for clients, friends, schools, and personal projects. Each one had a different brief, budget, and audience — from one-page event sites to fully managed WordPress builds — so the platform choice was driven by what the owner could maintain afterwards, not by what was most fun to build.",
            },
            {
                heading: "Approach",
                body: "Every build started with a short conversation about who the site was for and what success looked like a year after launch. From there I sketched a tight content structure first, then layered on visual design, then code. Keeping content and structure ahead of the visuals stopped scope creep and made handover painless.",
            },
            {
                heading: "What I built",
                body: "Hand-coded marketing sites in HTML/CSS/JS for performance-sensitive clients; custom WordPress themes and block patterns where the client needed to edit content themselves; Wix sites for owners who wanted full self-service after launch. Where it helped, I added small bits of bespoke functionality — booking forms, gated downloads, mailing list integrations — without bolting on heavy plugins.",
            },
            {
                heading: "Outcome",
                body: "Owners walked away with sites they could actually maintain, documentation they could understand, and clear Lighthouse / accessibility baselines to defend against future regressions. Several of these builds are still running, unchanged, years later — which I take as the real success metric.",
            },
            {
                heading: "What I learned",
                body: "The right platform is the one the owner will still be comfortable opening in twelve months. Restraint in design and tooling is almost always the kinder long-term choice for a small client.",
            },
        ],
    },
    {
        slug: "brand-and-logo-work",
        title: "Brand & Logo Work",
        type: "Design",
        platform: "Digital design",
        summary: "Logo concepts, graphics, and visual assets for digital and print use.",
        description: "Created visual identity work and graphics informed by a background in creative digital media, print production, and practical client delivery.",
        tags: ["Logo Design", "Graphics", "Branding", "Print"],
        year: 2024,
    },
    {
        slug: "developer-content",
        title: "Developer Content",
        type: "Learning Resource",
        platform: "Articles / Demos / Talks",
        summary: "Technical content that helps developers understand tools, workflows, and concepts.",
        description: "Produced tutorials, demos, documentation-style guidance, and educational content shaped by both industry and classroom experience.",
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
        description: "Bridge between the developer community and product teams. Create technical content, engage developers at events and online, and mentor colleagues on WordPress and front-end development.",
    },
    {
        period: "2023 — 2026",
        role: "Engineering Mentor",
        company: "Big Bite Creative",
        description: "Onboarded and mentored engineers, designed continuous-development programmes, and partnered with educational organisations to bridge industry and learning.",
    },
    {
        period: "2019 — 2023",
        role: "Head of Computer Science & iMedia",
        company: "Rye Hills Academy (NELT)",
        description: "Led the Computing department across KS3 and KS4, teaching GCSE Computer Science and Creative iMedia, and delivering staff CPD and digital solutions across the school.",
    },
    {
        period: "2017 — 2019",
        role: "Teacher of Computer Science",
        company: "Nunthorpe Academy",
        description: "Taught Computer Science at KS3/KS4 and Media at KS5, progressing from trainee to qualified teacher with full responsibility for planning, assessment, and pastoral care.",
    },
    {
        period: "2013 — 2017",
        role: "Cover Supervisor / Teacher",
        company: "Teaching Personnel",
        description: "Worked across mainstream and SEN secondary schools, progressing from teaching assistant to leading RE and later IT departments across KS3 and KS4.",
    },
    {
        period: "2006 — 2013",
        role: "Printer / Print Finisher",
        company: "County Print",
        description: "Produced print jobs and occasional design artwork, while handling customer liaison and deliveries — building adaptability and problem-solving skills.",
    },
];
