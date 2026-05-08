// Edit this file to customize your portfolio content.
import logoNortonCharity from "@/assets/logos/norton-sports-charity.png";
import logoNortonComplex from "@/assets/logos/norton-sports-complex.png";
import logoNslp from "@/assets/logos/nslp.png";
import logoGather from "@/assets/logos/gather.png";
import logoTraqr from "@/assets/logos/traqr.png";
import logoLearnJs from "@/assets/logos/mb-creative.webp";
import logoMbCreative from "@/assets/mb-logo-white.png";
export const profile = {
    name: "Michael Bertram",
    initials: "MB",
    role: "Developer Advocate, Mentor & Teacher",
    tagline: "Developer Advocate, Mentor and ex–Computer Science teacher helping developers build better software through clear writing, working code, and honest conversations.",
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
    // ===== Websites =====
    {
        slug: "the-moline-cross",
        title: "The Moline Cross",
        type: "Website",
        platform: "Wix",
        summary: "A digital presence for a premium pub, restaurant, and community clubhouse.",
        description: "A site designed to reflect a recent high-end refurbishment, balancing heritage storytelling with practical hospitality needs like menu access and conferencing info.",
        tags: ["Wix", "Hospitality", "Branding", "Web Design"],
        year: 2024,
        demoUrl: "https://www.themolinecross.co.uk",
        sections: [
            { heading: "The Project", body: "A digital presence for a premium pub, restaurant, and community clubhouse." },
            { heading: "Key Focus", body: "Designed to reflect the venue's recent high-end refurbishment. The site balances heritage storytelling with modern hospitality needs, such as menu accessibility and conferencing information." },
            { heading: "Branding", body: "The logo utilises a stylised millrind cross, honouring 14th-century iconography with a clean, contemporary execution suitable for an upscale social hub." },
        ],
    },
    {
        slug: "norton-bowling-club",
        title: "Norton Bowling Club",
        type: "Website",
        platform: "Wix",
        summary: "A comprehensive portal for a historic flat green bowling club, established 1949.",
        description: "A site that manages club history alongside active utility — a central hub for upcoming events, member news, and team fixtures.",
        tags: ["Wix", "Community", "Sports", "Web Design"],
        year: 2023,
        demoUrl: "https://www.nortonbowlingclub.com",
        sections: [
            { heading: "The Project", body: "A comprehensive portal for a historic flat green bowling club (est. 1949)." },
            { heading: "Key Focus", body: "Managing club history alongside active utility. The site serves as a central hub for upcoming events, member news, and team fixtures." },
            { heading: "Branding", body: "Focuses on a classic, welcoming circular motif that speaks to the precision and community nature of the sport." },
        ],
    },
    {
        slug: "norton-sports-charity",
        title: "Norton Sports Charity",
        type: "Website",
        platform: "Wix",
        summary: "The digital home for Norton Sports Charity, sitting within the wider Moline Cross brand identity.",
        description: "A community-focused website supporting the charity's work across the 55-acre Norton Sports Complex, tied visually into the same heritage brand system as The Moline Cross.",
        tags: ["Wix", "Charity", "Community", "Web Design"],
        year: 2024,
        cover: logoNortonCharity,
        coverMode: "logo",
        coverBg: "light",
        sections: [
            { heading: "The Project", body: "The digital home for Norton Sports Charity — part of the wider Moline Cross brand family." },
            { heading: "Key Focus", body: "Communicates the charity's mission and activities while tying directly into the heritage and visual language of The Moline Cross and Norton Sports Complex." },
        ],
    },
    {
        slug: "learn-js",
        title: "Learn JS",
        type: "Website",
        platform: "Custom Web App",
        summary: "An interactive, practical-based learning tool for JavaScript fundamentals.",
        description: "A hands-on pedagogical platform that moves users from basic variables to advanced asynchronous concepts through live coding and logic application.",
        tags: ["JavaScript", "Education", "Web App", "Frontend"],
        year: 2025,
        demoUrl: "https://learn-js-react.vercel.app/",
        cover: logoLearnJs,
        coverMode: "logo",
        coverBg: "dark",
        sections: [
            { heading: "The Project", body: "An interactive, practical-based learning tool for JavaScript fundamentals." },
            { heading: "Key Focus", body: "A hands-on pedagogical platform that moves users from basic variables to advanced asynchronous concepts through live coding and logic application." },
            { heading: "Branding", body: "A sharp, developer-centric aesthetic that emphasises logic and structural growth." },
        ],
    },

    // ===== Apps (type: Code) =====
    {
        slug: "gather",
        title: "Gather",
        type: "Code",
        platform: "Custom Development",
        summary: "A full-suite HR and event-booking platform for the hospitality industry.",
        description: "Designed for high-utility SaaS environments — handles event tracking and invoicing alongside deep HR data (contracts, onboarding, payroll, compliance) with a dedicated staff portal for training and digital time-tracking.",
        tags: ["SaaS", "HR", "Hospitality", "Custom"],
        year: 2025,
        cover: logoGather,
        coverMode: "logo",
        coverBg: "light",
        demoUrl: "https://gather-app.co.uk",
        sections: [
            { heading: "The Project", body: "A full-suite HR and event-booking platform for the hospitality industry." },
            { heading: "Functionality", body: "Handles event tracking and invoicing alongside deep HR data (contracts, onboarding, payroll, and compliance). Includes a dedicated staff portal for training and digital time-tracking." },
            { heading: "Branding", body: "Features a friendly, bold script logo that suggests connectivity, service, and high-energy hospitality environments. Designed for high-utility SaaS environments — clean and flat for app icons and dashboards." },
        ],
    },
    {
        slug: "bowls-booker",
        title: "Bowls Booker",
        type: "Code",
        platform: "Lovable (AI-Powered Development)",
        summary: "A niche scheduling and selection app for competitive bowling clubs.",
        description: "Allows administrators to manage bookable matches while giving players a streamlined interface to mark availability and view team sheets.",
        tags: ["SaaS", "Scheduling", "Sports", "Lovable"],
        year: 2026,
        sections: [
            { heading: "The Project", body: "A niche scheduling and selection app for competitive bowling clubs." },
            { heading: "Functionality", body: "Allows administrators to manage bookable matches while giving players a streamlined interface to mark availability and view team sheets." },
        ],
    },
    {
        slug: "traqr",
        title: "Traqr",
        type: "Code",
        platform: "Lovable (AI-Powered Development)",
        summary: "An AI-enhanced personal productivity and goal-setting ecosystem.",
        description: "Designed for high-utility SaaS environments — bridges the gap between long-term goals and daily tasks, with an AI-driven notebook that converts audio or text transcripts into actionable project tasks.",
        tags: ["SaaS", "AI", "Productivity", "Lovable"],
        year: 2026,
        cover: logoTraqr,
        coverMode: "logo",
        coverBg: "dark",
        sections: [
            { heading: "The Project", body: "An AI-enhanced personal productivity and goal-setting ecosystem." },
            { heading: "Functionality", body: "Bridges the gap between long-term goals and daily tasks. Features an AI-driven notebook that converts audio or text transcripts into actionable project tasks." },
            { heading: "Branding", body: "A kinetic, forward-moving 'arrow' motif that emphasises speed, direction, and the tracking of progress." },
        ],
    },

    // ===== Identity & Brand Design =====
    {
        slug: "norton-sports-charity-brand",
        title: "Norton Sports Charity & NS&LP",
        type: "Design",
        platform: "Identity system",
        summary: "A unified visual language for Norton Sports Complex and its promotional arm, NS&LP CIC.",
        description: "A cohesive sub-brand system under a single organisational umbrella — built around shield/crest geometry and the millrind cross to tie back to the local heritage of the Moline Cross.",
        tags: ["Branding", "Identity", "Logo", "Print"],
        year: 2023,
        cover: logoNortonCharity,
        coverMode: "logo",
        coverBg: "light",
        gallery: [
            { src: logoNortonComplex, label: "Norton Sports Complex" },
            { src: logoNslp, label: "NS&LP CIC" },
        ],
        sections: [
            { heading: "The Design", body: "A unified visual language for the Norton Sports Complex, its charity arm, and its promotional vehicle NS&LP CIC — all sitting alongside The Moline Cross within the same brand family." },
            { heading: "Visual Logic", body: "These logos use a consistent shield/crest geometry, incorporating the millrind cross to tie the family of brands back to the local heritage of The Moline Cross. Bold, block typography ensures readability across physical signage on the 55-acre site." },
        ],
    },
    {
        slug: "mb-creative",
        title: "MB Creative",
        type: "Design",
        platform: "Personal identity",
        summary: "Personal logo representing the intersection of software engineering and creative design.",
        description: "A geometric M/B fusion mark and brand system. Engineering Community. Designing Logic. The creative engine for diverse projects across technical and design work.",
        tags: ["Branding", "Identity", "Logo", "Personal"],
        year: 2024,
        cover: logoMbCreative,
        coverMode: "logo",
        coverBg: "dark",
        sections: [
            { heading: "The Identity", body: "A personal logo — the geometric 'M' / 'B' fusion — representing the intersection of software engineering and creative design." },
            { heading: "The Philosophy", body: "Engineering Community. Designing Logic. This brand serves as the creative engine for diverse projects, proving that high-level technical development and soulful, community-driven design can live in the same space." },
        ],
    },

    // ===== Learning Resources (kept for /resources page) =====
    {
        slug: "wordpress-learning-workshops",
        title: "WordPress Learning Workshops",
        type: "Learning Resource",
        platform: "WordPress / Front-end",
        summary: "Practical workshop materials for developers learning modern WordPress workflows.",
        description: "Structured learning resources, demos, and guided exercises to help developers understand WordPress, front-end tooling, and best-practice implementation.",
        tags: ["WordPress", "Teaching", "Workshops", "DX"],
        resourceUrl: "/resources",
        year: 2026,
    },
    {
        slug: "developer-content",
        title: "Developer Content",
        type: "Learning Resource",
        platform: "Articles / Demos / Talks",
        summary: "Technical content that helps developers understand tools, workflows, and concepts.",
        description: "Tutorials, demos, documentation-style guidance, and educational content shaped by both industry and classroom experience.",
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
