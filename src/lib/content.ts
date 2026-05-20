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

export const footerItems = ["© APERTURE 2026", "SELBORNE KING IMPRINT", "APTR.AU"] as const;

export type PanelMap = Record<StageKey, ReactNode>;
