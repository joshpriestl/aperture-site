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
  { label: "Methodology", href: "#methodology" },
  { label: "Practice Areas", href: "#practice-areas" },
  { label: "About", href: "#the-founder" },
] as const;

export const hero = {
  eyebrow: "APERTURE",
  headline: "Diagnose what's leaking. Build what's missing.",
  subhead:
    "An operations firm for scaling consultancies, agencies, advisory firms and hospitality groups. The free Audit takes 15 minutes. You leave with a defensible operational score, a quantified cost of inaction and three priority interventions.",
  cta: "Take the free Audit — 15 minutes",
};

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
  subcopy:
    "Most recommendations fail because they remain abstract. Aperture converts the diagnosis into installed workflows, dashboards, agents and reporting rhythms.",
  cta: "Start with the free Audit",
  sections: [
    {
      shortLabel: "Lead Gen",
      title: "Lead Generation Systems",
      body: "Capture, qualify, route and follow up with leads automatically, so founder attention goes to the right conversations.",
      outputs: [
        "inbound lead capture",
        "AI qualification summary",
        "HubSpot or CRM sync",
        "automated follow-up workflow",
        "Slack alert to founder/sales team",
        "pipeline visibility dashboard",
      ],
      visualTitle: "Lead flow",
      flow: ["New enquiry", "AI qualification", "CRM update", "Slack alert", "follow-up sequence"],
    },
    {
      shortLabel: "Dashboards",
      title: "Founder Dashboards",
      body: "Dashboards that give operators visibility across pipeline, delivery, revenue and operational bottlenecks.",
      outputs: [
        "pipeline value",
        "lead source performance",
        "proposal conversion",
        "delivery capacity",
        "overdue follow-ups",
        "AI-generated weekly summary",
      ],
      visualTitle: "Operator dashboard",
      metrics: [
        { label: "Pipeline value", value: "$428k" },
        { label: "Proposal conversion", value: "38%" },
        { label: "Delivery capacity", value: "72%" },
        { label: "Overdue follow-ups", value: "9" },
      ],
    },
    {
      shortLabel: "AI Agents",
      title: "AI Operational Agents",
      body: "AI agents embedded into workflows to reduce manual coordination, admin and repeated drafting.",
      outputs: [
        "Lead qualification agent",
        "Proposal drafting agent",
        "Weekly reporting agent",
        "Client intake agent",
        "Internal knowledge retrieval agent",
      ],
      visualTitle: "Agent queue",
      agents: [
        { label: "Lead qualification agent", status: "running" },
        { label: "Proposal drafting agent", status: "draft ready" },
        { label: "Weekly reporting agent", status: "scheduled" },
        { label: "Client intake agent", status: "in review" },
        { label: "Knowledge retrieval agent", status: "indexed" },
      ],
    },
    {
      shortLabel: "Cadence",
      title: "Reporting and Operating Cadence",
      body: "Aperture does not just install tools. It creates the operating rhythm around them.",
      outputs: [
        "weekly scorecards",
        "founder summaries",
        "Slack notifications",
        "exception alerts",
        "review cadence",
      ],
      visualTitle: "Weekly operations summary",
      summary: [
        "Pipeline increased 14% this week.",
        "Three proposals need founder follow-up.",
        "Delivery capacity is tight in Strategy.",
        "Next review: Monday 9:00 AM.",
      ],
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

export const operatingSignals = {
  eyebrow: "OPERATIONAL SIGNALS",
  headline: "Signals we usually find before the score confirms it",
  body: "The Audit gives the problem structure. These are the patterns that usually appear before the score makes them visible.",
  items: [
    "The founder is still the reporting layer",
    "Pipeline visibility lives across spreadsheets",
    "AI tools exist but workflows do not",
    "No one owns the operating rhythm",
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
  headline: "Begin where every transformation begins.",
  body: "The Audit is free. 49 questions. 15 minutes. A defensible operational score and a real estimate of what your inefficiencies cost.",
  cta: "Take the free Audit",
};

export const footerItems = ["© APERTURE 2026", "SELBORNE KING IMPRINT", "APTR.AU"] as const;

export type PanelMap = Record<StageKey, ReactNode>;
