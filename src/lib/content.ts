import type { ReactNode } from "react";

export type StageKey = "audit" | "blueprint" | "build" | "engine";

export type Stage = {
  key: StageKey;
  step: string;
  name: string;
  chip: string;
  headline: string;
  body: string;
  visualSide: "left" | "right";
  deliverables?: {
    eyebrow: string;
    items: string[];
    closing: string;
  };
};

export const navLinks = [
  { label: "What we do", href: "#what-we-do" },
  { label: "Builds", href: "#what-aperture-builds" },
  { label: "Who we are", href: "#who-we-are" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  eyebrow: "APERTURE",
  headline: "Operational diagnostics and systems for modern firms.",
  subhead:
    "Identify bottlenecks. Generate a sequenced plan. Install the workflows, reporting and operational infrastructure required to scale clearly.",
  cta: "Start the Audit",
};

export const whatWeDo = {
  eyebrow: "WHAT WE DO",
  headline: "From operational noise to installed systems.",
  body: "Aperture gives scaling firms a clear sequence: diagnose the drag, plan the fix, install the operating layer, then keep improving it.",
  steps: [
    { name: "AUDIT", body: "Find operational bottlenecks" },
    { name: "BLUEPRINT", body: "Generate a sequenced transformation plan" },
    { name: "BUILD", body: "Install systems and workflows" },
    { name: "ENGINE", body: "Monitor and optimise continuously" },
  ],
} as const;

export const stages: Stage[] = [
  {
    key: "audit",
    step: "Step 01",
    name: "Audit",
    chip: "Step 01 - Audit",
    headline: "We map where your operations leak.",
    body: "A 49-question diagnostic across ten core practice areas. Maturity scoring, quantified cost of inaction, prioritised recommendations. Free.",
    visualSide: "left",
    deliverables: {
      eyebrow: "WHAT YOU RECEIVE",
      items: [
        "Aperture Score across all ten practice areas",
        "Cost of Inaction range, derived from your own financial inputs",
        "Three Priority Levers with the specific findings that fired",
        "Persistent on-screen report at a unique URL",
        "Same-day email delivery",
      ],
      closing: "Fifteen minutes. Forty-nine questions. Always free.",
    },
  },
  {
    key: "blueprint",
    step: "Step 02",
    name: "Blueprint",
    chip: "Step 02 - Blueprint",
    headline: "A roadmap for what to fix first.",
    body: "Founder pricing $199. Strategic recommendations, implementation sequencing, automation opportunities, automated workflow design. Generated from your Audit.",
    visualSide: "right",
  },
  {
    key: "build",
    step: "Step 03",
    name: "Build",
    chip: "Step 03 - Build",
    headline: "We implement the systems.",
    body: "Engagement-based execution. CRM, workflow automation, AI integrations, dashboards, operational tooling. Build transforms the Blueprint from advisory into operating reality.",
    visualSide: "left",
  },
  {
    key: "engine",
    step: "Step 04",
    name: "Engine",
    chip: "Step 04 - Engine",
    headline: "Operations that compound, quietly.",
    body: "Recurring intelligence layer. Continuous monitoring, AI-assisted optimisation, benchmark comparison. Every completed Audit sharpens the methodology for the next one.",
    visualSide: "right",
  },
];

export const auditScores = [
  { label: "strategy", value: 54, tone: "amber" },
  { label: "revenue-pipeline", value: 31, tone: "red" },
  { label: "marketing", value: 68, tone: "green" },
  { label: "operations", value: 47, tone: "amber" },
  { label: "ai-automation", value: 22, tone: "red" },
  { label: "data-reporting", value: 71, tone: "green" },
] as const;

export const blueprintItems = [
  {
    title: "Pipeline visibility infrastructure",
    detail: "CRM consolidation, stage definitions, reporting cadence",
  },
  {
    title: "AI workflow orchestration",
    detail: "Client intake, proposal drafting, knowledge retrieval",
  },
  {
    title: "Reporting + decision layer",
    detail: "Operational dashboards, weekly review structure",
  },
  {
    title: "+ 6 more sequenced items",
    detail: "",
  },
] as const;

export const buildItems = [
  { status: "SHIPPED", title: "CRM consolidation", tone: "green" },
  { status: "SHIPPED", title: "Proposal automation", tone: "green" },
  { status: "IN BUILD", title: "Client portal v1", tone: "amber" },
  { status: "IN BUILD", title: "Ops dashboard", tone: "amber" },
  { status: "QUEUED", title: "AI intake agent", tone: "neutral" },
  { status: "QUEUED", title: "Reporting cadence", tone: "neutral" },
] as const;

export const engineMetrics = [
  { label: "Operational maturity", value: "Benchmarked" },
  { label: "Pipeline velocity", value: "Quarter on quarter" },
  { label: "Inefficiency exposure", value: "Quantified" },
  { label: "Review cadence", value: "Recurring" },
] as const;

export const whatApertureBuilds = {
  eyebrow: "BUILD OUTPUTS",
  headline: "What Aperture Builds",
  intro:
    "Blueprint shows what needs to change. Build turns that into operating systems your business can actually use.",
  cta: "Start the Audit",
  sections: [
    {
      title: "Lead systems",
      body: "Capture, qualify, route and follow up with inbound demand without leaving ownership unclear.",
      visual: ["New lead", "Qualified", "CRM synced", "Follow-up queued"],
    },
    {
      title: "Founder dashboards",
      body: "Create a small operating view across pipeline, proposals, delivery capacity and overdue action.",
      visual: ["Pipeline visible", "Follow-ups flagged", "Capacity reviewed"],
    },
    {
      title: "AI workflows",
      body: "Embed AI into practical handoffs: intake, qualification, proposal drafts and weekly reporting.",
      visual: ["Intake captured", "Draft prepared", "Human review"],
    },
    {
      title: "Reporting cadence",
      body: "Turn operating data into weekly summaries, exception alerts and a review rhythm people follow.",
      visual: ["Scorecard sent", "Exceptions noted", "Review scheduled"],
    },
  ],
} as const;

export const whoWeAre = {
  eyebrow: "WHO WE ARE",
  headline: "Most firms do not have a people problem.",
  body: [
    "They have an operational visibility problem.",
    "AI amplifies this. It does not solve it automatically.",
    "Aperture exists to diagnose operational bottlenecks and install the systems required to reduce friction, improve visibility and increase execution clarity.",
  ],
} as const;

export const operatingSignals = {
  eyebrow: "OPERATIONAL SIGNALS",
  headline: "Signals we typically find",
  body: "The Audit gives the problem structure. These are the patterns that usually appear before the score makes them visible.",
  items: [
    "Follow-up relies on memory",
    "Reporting arrives too late",
    "No operational scorecard",
    "The founder is the reporting layer",
    "AI tools exist but workflows do not",
  ],
} as const;

export const caseStudies = {
  eyebrow: "TESTIMONIALS / CASE STUDIES",
  headline: "Built for practical operational change",
  body: "Aperture is early. We will publish named client stories only when they can be shared properly. Until then, the work is deliberately grounded in the transformations the system is designed to produce.",
  items: [
    {
      title: "From scattered follow-up to owned pipeline",
      body: "Lead capture, routing, CRM ownership and weekly review cadence installed around the founder.",
    },
    {
      title: "From manual reporting to operating rhythm",
      body: "A compact scorecard and exception process that makes decisions visible before they become urgent.",
    },
    {
      title: "From ad hoc AI tools to workflow support",
      body: "AI placed inside intake, proposal and reporting workflows with human review where it matters.",
    },
  ],
} as const;

export const buyerFit = {
  eyebrow: "WHO THIS IS FOR",
  headline: "Built for operationally stretched firms",
  body: "Aperture is built for scaling service businesses where growth has created operational drag. More leads, more delivery, more tools, more reporting and too much still sitting in the founder's head.",
  notFor:
    "Built for operators who need diagnosis, systems and execution. Not built for teams looking for another dashboard.",
  examples: [
    "Consultancies and advisory firms",
    "Agencies and creative studios",
    "Property and hospitality operators",
    "Founder-led service businesses past the early days",
  ],
} as const;

export const benchmarkIntelligence = {
  eyebrow: "BENCHMARK INTELLIGENCE",
  headline: "Built to compound",
  body: "Every Audit contributes to a growing operational benchmark corpus. Over time, Aperture uses this intelligence to identify recurring bottlenecks, workflow patterns and transformation opportunities across modern firms.",
} as const;

export const faqs = {
  eyebrow: "FAQ",
  headline: "Questions before the Audit",
  items: [
    {
      question: "Is this consulting or software?",
      answer:
        "It starts with diagnosis and moves into implementation. Aperture uses software to deliver operational intelligence, but the value is the method, sequencing and installed systems.",
    },
    {
      question: "Do you implement the systems after the Blueprint?",
      answer:
        "Yes. Build is scoped from the Blueprint, then delivered as systems, dashboards, agents, workflows and reporting cadence.",
    },
    {
      question: "Can Aperture work with our existing tools?",
      answer:
        "Usually, yes. Aperture works with existing tools where possible and recommends replacement only when the current stack blocks the operating system.",
    },
  ],
} as const;

export const practiceAreas = {
  eyebrow: "THE TEN PRACTICE AREAS",
  headline: "Every operational system runs on these ten.",
  body: "The Aperture diagnostic evaluates firms across ten interconnected practice areas - each scored, sequenced, and benchmarked against the corpus.",
  items: [
    { number: "01", name: "Strategy", category: "Foundational" },
    { number: "02", name: "Revenue & Pipeline", category: "Commercial" },
    { number: "03", name: "Marketing", category: "Commercial" },
    { number: "04", name: "Brand & Communications", category: "Commercial" },
    { number: "05", name: "Operations", category: "Operational" },
    { number: "06", name: "AI & Automation", category: "Operational" },
    { number: "07", name: "Data & Reporting", category: "Operational" },
    { number: "08", name: "People & Culture", category: "Organisational" },
    { number: "09", name: "Technology & Systems", category: "Operational" },
    { number: "10", name: "Customer Experience", category: "Commercial" },
  ],
};

export const methodology = {
  eyebrow: "WHAT THE AUDIT ACTUALLY SCORES",
  body: "Pipeline visibility. Reporting cadence. Decision latency. AI maturity. Operating rhythm. Cost of inaction. Each of the ten practice areas is scored against a benchmark of scaling firms, then sequenced into the three changes that will move the needle fastest.",
  closing: "Score is the start. Sequence is the plan. Systems are the outcome.",
};

export const finalCta = {
  eyebrow: "CONTACT",
  headline: "Start with the Audit.",
  body: "The Audit is free. 49 questions. 15 minutes. A defensible operational score and a clear view of what to fix first.",
  cta: "Start the Audit",
  email: "jjppriestley@gmail.com",
};

export const footerItems = ["(C) APERTURE 2026", "SELBORNE KING IMPRINT", "APTR.AU"] as const;

export type PanelMap = Record<StageKey, ReactNode>;
