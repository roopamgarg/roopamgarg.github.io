import type { Portfolio } from "@/types/portfolio";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const portfolio: Portfolio = {
  brand: "Roopam Garg",

  nav: [
    { id: "home", label: "Home" },
    {
      id: "projects",
      label: "Projects",
      blurb: "A selection of systems I've built and shipped.",
      ctaLabel: "More on GitHub",
      ctaHref: "https://github.com/roopamgarg",
    },
    {
      id: "experience",
      label: "Experience",
      blurb: "Where I've worked and what I've built.",
      ctaLabel: "View full timeline",
      ctaHref: "https://www.linkedin.com/in/roopamgarg1",
    },
    { id: "skills", label: "Skills" },
    {
      id: "about",
      label: "About",
      blurb: "A bit about me and what drives me.",
    },
    {
      id: "contact",
      label: "Contact",
      blurb: "Let's build something awesome together.",
    },
  ],

  hero: {
    greeting: "Hi, I'm Roopam",
    titleLead: "I don't just code features,",
    titleAccent: "I build systems.",
    description:
      "Scalable architecture. Clean code. Thoughtful design. Reliable systems.",
    primaryCta: "View my work",
    secondaryCta: "Download resume",
    resumeHref: asset("Roopam_Garg_Resume.pdf"),
  },

  architecture: {
    clients: ["Users", "Web App", "Mobile App"],
    gateway: "API Gateway",
    services: [
      "Auth Service",
      "Core API Service",
      "AI Orchestrator",
      "Embedding Worker",
    ],
    stores: ["PostgreSQL", "Redis Cache", "Vector DB", "Object Storage"],
    connections: [
      { service: "Auth Service", stores: ["PostgreSQL", "Redis Cache"] },
      { service: "Core API Service", stores: ["PostgreSQL", "Redis Cache"] },
      { service: "AI Orchestrator", stores: ["Redis Cache", "Vector DB", "Object Storage"] },
      { service: "Embedding Worker", stores: ["Vector DB", "Object Storage"] },
    ],
    footer: "Monitoring, Logging, Tracing & Model Observability",
  },

  projects: [
    {
      name: "Scout My Home",
      description:
        "Check a flat before you buy. An AI agent reads the builder's RERA floor plans, checks each flat's plan, adds vastu markings and builds a 3D model, alongside the public records around the address.",
      stack: ["OpenStreetMap", "RERA data"],
      live: "https://scoutmyhome.in/",
      image: {
        src: asset("projects/scoutmyhome.jpg"),
        alt: "Scout My Home landing page: Read the building before you buy the flat.",
      },
    },
    {
      name: "Anvesha",
      description:
        "A browser-based detective mystery game. You inspect evidence and question AI characters who reveal clues by set rules and hold back what they aren't meant to say.",
      stack: ["Next.js", "React"],
      live: "https://anvesha.vyom.sh/",
      image: {
        src: asset("projects/anvesha.jpg"),
        alt: "Anvesha landing page: Every crime leaves a pattern. Find where the threads cross.",
      },
    },
    {
      name: "Webcam Tracker",
      description:
        "A tiny macOS app that tells you which apps use your webcam and for how long, without touching the camera feed.",
      stack: ["Rust", "Tauri", "React"],
      live: "https://roopamgarg.in/webcam-usage-tracker/",
      github: "https://github.com/roopamgarg/webcam-usage-tracker",
      image: {
        src: asset("projects/webcam.jpg"),
        alt: "Webcam Tracker landing page",
      },
    },
    {
      name: "DPP Protocol",
      description:
        "Lets AI agents make payments on a user's behalf, with spending controls, merchant trust and audit trails.",
      stack: ["Node.js", "TypeScript", "MCP"],
      live: "https://roopamgarg.in/delegated-payments-protocol/",
      github: "https://github.com/roopamgarg/delegated-payments-protocol",
      image: {
        src: asset("projects/dpp.jpg"),
        alt: "Delegated Payments Protocol landing page",
      },
    },
  ],

  experience: [
    {
      period: "2026 - Present",
      role: "Sr. AI Software Engineer",
      company: "Five9",
      description:
        "Building contact center software that records agent screens, monitors them live, takes remote control and analyzes what agents did during calls.",
    },
    {
      period: "2024 - 2026",
      role: "Software Engineer 2",
      company: "Observe.AI",
      description:
        "Scaled frontend systems and performance infrastructure for high-traffic products, cutting load times and improving UX at scale.",
    },
    {
      period: "2022 - 2024",
      role: "Software Engineer",
      company: "Juspay",
      description:
        "Built and optimized critical payment flows and cross-platform systems to improve transaction success and onboarding efficiency.",
    },
  ],

  techStack: [
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Express.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Docker",
    "Kubernetes",
    "AWS",
    "S3",
    "Kafka",
    "Git",
    "Linux",
    "Nginx",
  ],

  about: {
    statement:
      "I'm a software engineer who likes building reliable systems that solve real problems.",
    statementMuted:
      "I enjoy turning ideas into products, and I'm always learning something new.",
    portrait: {
      src: asset("avatar.jpg"),
      alt: "Illustrated portrait of Roopam Garg",
    },
    traits: [
      {
        icon: "Brain",
        title: "Problem Solver",
        description:
          "I enjoy breaking down complex problems and building simple, effective solutions.",
      },
      {
        icon: "Boxes",
        title: "System Thinker",
        description:
          "I design with scalability, reliability and maintainability in mind.",
      },
      {
        icon: "BookOpen",
        title: "Lifelong Learner",
        description:
          "Always exploring new technologies and improving my craft.",
      },
      {
        icon: "Target",
        title: "Impact Driven",
        description:
          "I care about building products that create real value for users.",
      },
    ],
  },

  contact: {
    headline: "Let's connect",
    description: "I'm open to new opportunities and interesting projects.",
    email: "hello@roopamgarg.in",
    linkedin: "https://www.linkedin.com/in/roopamgarg1",
    github: "https://github.com/roopamgarg",
    status: "Open to work",
    location: "Bangalore, India",
  },
};
