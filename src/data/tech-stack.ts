// Only technologies we actually work in — drawn from the systems described on the Work page.
export type TechCategory = {
  category: string;
  items: string[];
};

export const techStack: TechCategory[] = [
  { category: "Languages", items: ["TypeScript", "Python", "SQL", "C# / .NET"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"] },
  { category: "Backend & APIs", items: ["Node.js", "FastAPI", "Django", "REST", "Webhooks"] },
  { category: "Data", items: ["PostgreSQL", "SQLite", "pandas", "pgvector"] },
  { category: "AI", items: ["OpenAI", "Anthropic Claude", "LangChain", "RAG", "PyTorch", "scikit-learn"] },
  { category: "Cloud & delivery", items: ["Vercel", "AWS", "Docker", "GitHub Actions", "Cloudflare"] },
  { category: "Automation", items: ["n8n", "Zapier", "SMTP / IMAP integrations"] },
];

export type ProcessStep = {
  step: string;
  title: string;
  summary: string;
  detail: string;
  outputs: string[];
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Understand",
    summary: "The work, not the software.",
    detail:
      "We start by learning who does what, where it breaks and what “better” would actually mean for the people doing it. No proposals before that.",
    outputs: ["Written problem statement", "Scope and out-of-scope list", "Rough estimate and options"],
  },
  {
    step: "02",
    title: "Architect",
    summary: "Decide what to build, buy or leave alone.",
    detail:
      "We design the data model and integrations before any screens, and we say plainly when an existing tool or a simpler approach will do the job.",
    outputs: ["Architecture and data model", "Integration map", "Delivery plan in stages"],
  },
  {
    step: "03",
    title: "Build",
    summary: "Working software every week.",
    detail:
      "Short cycles with real screens and real data you can click through on a shared staging environment, so you can change direction while it's still cheap.",
    outputs: ["Weekly working increments", "Shared staging environment", "Decision log"],
  },
  {
    step: "04",
    title: "Integrate",
    summary: "Connect to what you already run.",
    detail:
      "Accounting, CRM, email, spreadsheets, third-party APIs: we wire the new system into the tools your team already uses, with error handling for when those tools misbehave.",
    outputs: ["Live integrations", "Data sync and error handling", "Access and permissions"],
  },
  {
    step: "05",
    title: "Test",
    summary: "Automated where it counts, hands-on where it matters.",
    detail:
      "Automated tests for the logic, walkthroughs of the real workflow with the people who'll use it, and a security pass before anything goes live.",
    outputs: ["Test suite", "Acceptance checklist", "Security review"],
  },
  {
    step: "06",
    title: "Launch",
    summary: "Deploy with a way back.",
    detail:
      "Production deployment with monitoring, backups and a rollback path, plus documentation your team will actually read. Accounts and code are in your name.",
    outputs: ["Production deployment", "Runbook and documentation", "Monitoring and alerts"],
  },
  {
    step: "07",
    title: "Improve",
    summary: "Software meets reality after launch.",
    detail:
      "We watch how it's used, fix what's awkward, and keep improving it with you, as support or as the next stage of the build.",
    outputs: ["Usage and error reviews", "Prioritized backlog", "Ongoing support"],
  },
];
