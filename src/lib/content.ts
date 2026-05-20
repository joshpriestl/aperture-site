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
};

export const navLinks = [
  { label: "Methodology", href: "#" },
  { label: "Practice Areas", href: "#" },
  { label: "Journal", href: "#" },
  { label: "About", href: "#" },
] as const;

export const hero = {
  eyebrow: "APERTURE",
  headline: "Diagnose what your operations don't say out loud.",
  subhead:
    "An operational intelligence platform for professional service firms. Free 49-question diagnostic across ten core practice areas. Maturity scoring. Quantified cost of inaction.",
  cta: "Take the free Audit",
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
  },
  {
    key: "blueprint",
    step: "Step 02",
    name: "Blueprint",
    chip: "Step 02 - Blueprint",
    headline: "A roadmap for what to fix first.",
    body: "Founder pricing $199. Strategic recommendations, implementation sequencing, automation opportunities, AI-native workflow design. Generated from your Audit.",
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
  { label: "Operational maturity", value: "+12 vs. industry" },
  { label: "Pipeline velocity", value: "+24% vs. last quarter" },
  { label: "Inefficiency exposure", value: "-$184k recovered" },
  { label: "Next review", value: "in 14 days" },
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
  quote:
    '"In an age where AI commoditises code, the durable asset is methodology - diagnostic sequencing, scoring logic, and a benchmark corpus that compounds with every completed Audit."',
  citation: "CORE THESIS - APERTURE",
};

export const finalCta = {
  headline: "Begin where every transformation begins.",
  body: "The Audit is free. 49 questions. 15 minutes. A defensible operational score and a real estimate of what your inefficiencies cost.",
  cta: "Take the free Audit",
};

export const footerItems = ["\u00a9 APERTURE 2026", "SELBORNE KING IMPRINT", "APTR.AU"] as const;

export type PanelMap = Record<StageKey, ReactNode>;
