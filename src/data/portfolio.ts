import type { Portfolio } from "@/types/portfolio";

export const portfolio: Portfolio = {
  brand: "Roopam.dev",

  nav: [
    { id: "home", num: "01", label: "Home" },
    {
      id: "projects",
      num: "02",
      label: "Projects",
      blurb: "A selection of systems I've built and shipped.",
      ctaLabel: "View all projects",
    },
    {
      id: "experience",
      num: "03",
      label: "Experience",
      blurb: "Where I've worked and what I've built.",
      ctaLabel: "View full timeline",
    },
    { id: "skills", num: "04", label: "Skills" },
    {
      id: "about",
      num: "05",
      label: "About",
      blurb: "A bit about me and what drives me.",
    },
    {
      id: "contact",
      num: "06",
      label: "Contact",
      blurb: "Let's build something awesome together.",
    },
  ],

  hero: {
    greeting: "Hi, I'm Roopam",
    titleLead: "I don't just code features, I build",
    titleAccent: "systems.",
    description:
      "Scalable architecture. Clean code. Thoughtful design. Reliable systems.",
    primaryCta: "View my work",
    secondaryCta: "Download resume",
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
      name: "StoryLens",
      icon: "Code2",
      description:
        "A system that converts stories into graphs to detect plot holes, inconsistencies, and logical gaps",
      stack: ["Next.js", "Node.js", "LLMs", "wink-nlp"],
      live: "https://storylens.viralengine.in/",
      github: "https://github.com/roopamgarg/StoryLens",
    },
    {
      name: "AuthHub",
      icon: "Lock",
      description:
        "Secure authentication system with OAuth, JWT and role-based access control.",
      stack: ["TypeScript", "Express", "Redis"],
      live: "#",
      github: "#",
    },
    {
      name: "PayStream",
      icon: "CreditCard",
      description:
        "Payment processing service handling transactions, refunds and webhooks.",
      stack: ["Node.js", "PostgreSQL", "Kafka"],
      live: "#",
      github: "#",
    },
    {
      name: "FileStore",
      icon: "Folder",
      description:
        "Scalable file storage service with S3 integration, signed URLs and access control.",
      stack: ["AWS S3", "Node.js", "Redis"],
      live: "#",
      github: "#",
    },
  ],

  experience: [
    {
      period: "2024 - Present",
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
        "Built and optimized critical payment flows and cross-platform systems to improve transaction success and onboarding efficiency."
    },
    {
      period: "2021 - 2022",
      role: "Software Developer Intern",
      company: "Appdesk",
      description:
        "Developed scalable frontend and end-to-end wallet systems, boosting development speed and improving payment reliability.",
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

  codeSnippet: `const buildSystem = (requirements) => {
  const analyze = breakDown(requirements);
  const design  = createArchitecture(analyze);
  const build   = implement(design);
  const test    = ensureReliability(build);
  return deploy(test);
};`,

  about: {
    whoami: [
      "roopam@dev:~$ whoami",
      "Software Engineer",
      "Passionate about building reliable systems",
      "that solve real problems.",
      "",
      "I enjoy turning ideas into products and",
      "constantly learning new things.",
      "roopam@dev:~$ _",
    ],
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
    description:
      "I'm open to new opportunities and interesting projects.",
    email: "hello@roopamgarg.in",
    linkedin: "https://www.linkedin.com/in/roopamgarg1",
    status: "Open to work",
    location: { label: "India", flag: "🇮🇳" },
  },
};
