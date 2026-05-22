export type BlueprintQuestion = {
  key: string;
  label: string;
  prompt: string;
  placeholder: string;
};

const DEFAULT_QUESTIONS: BlueprintQuestion[] = [
  {
    key: "current_state",
    label: "Current state",
    prompt: "What is happening in this area right now?",
    placeholder: "Name the system, habit, constraint or decision pattern that is creating drag.",
  },
  {
    key: "commercial_impact",
    label: "Commercial impact",
    prompt: "Where is this costing the business time, revenue or margin?",
    placeholder: "Use specific examples where possible. Lost deals, rework, slow delivery, unclear ownership or missed follow-up all count.",
  },
  {
    key: "next_90_days",
    label: "Next 90 days",
    prompt: "What would make this area materially better within 90 days?",
    placeholder: "Describe the change that would create the most relief or leverage.",
  },
];

const QUESTION_OVERRIDES: Record<string, BlueprintQuestion[]> = {
  "Strategy": [
    {
      key: "strategic_choice",
      label: "Strategic choice",
      prompt: "Which strategic decision is currently unclear or avoided?",
      placeholder: "Name the choice, trade-off or constraint the team keeps circling.",
    },
    {
      key: "focus_cost",
      label: "Cost of drift",
      prompt: "Where does lack of strategic focus show up in execution?",
      placeholder: "Think priorities, resourcing, offer shape, leadership decisions or weekly operating rhythm.",
    },
    {
      key: "decision_standard",
      label: "Decision standard",
      prompt: "What would help the team make better decisions over the next 90 days?",
      placeholder: "Describe the rule, metric, forum or operating principle that would reduce ambiguity.",
    },
  ],
  "Revenue and Pipeline": [
    {
      key: "pipeline_leak",
      label: "Pipeline leak",
      prompt: "Where does revenue momentum most often stall?",
      placeholder: "Name the stage, handoff, customer segment or offer where deals slow down or disappear.",
    },
    {
      key: "sales_signal",
      label: "Sales signal",
      prompt: "What evidence do you have about why prospects buy or do not buy?",
      placeholder: "Use customer language, objections, conversion data or feedback from recent deals.",
    },
    {
      key: "revenue_move",
      label: "Revenue move",
      prompt: "What change would create the strongest pipeline improvement within 90 days?",
      placeholder: "Describe one practical move, not a full sales transformation.",
    },
  ],
  "Marketing": [
    {
      key: "market_signal",
      label: "Market signal",
      prompt: "Which audience or channel is producing the clearest demand signal?",
      placeholder: "Name what is working, even if it is inconsistent or small.",
    },
    {
      key: "marketing_drag",
      label: "Marketing drag",
      prompt: "Where is marketing effort being wasted or under-used?",
      placeholder: "Think unclear positioning, weak follow-up, disconnected campaigns or content that does not convert.",
    },
    {
      key: "campaign_focus",
      label: "Campaign focus",
      prompt: "What should marketing prove or improve over the next 90 days?",
      placeholder: "Describe the outcome you would trust enough to invest behind.",
    },
  ],
  "Brand and Communications": [
    {
      key: "message_gap",
      label: "Message gap",
      prompt: "Where does the market misunderstand what you do or why it matters?",
      placeholder: "Name the confusion, objection or missed perception you hear most often.",
    },
    {
      key: "proof_points",
      label: "Proof points",
      prompt: "Which proof points should the brand be using more clearly?",
      placeholder: "Think customer outcomes, expertise, process, category insight or trust signals.",
    },
    {
      key: "communication_shift",
      label: "Communication shift",
      prompt: "What communication change would make buying easier within 90 days?",
      placeholder: "Describe the message, asset or narrative that would reduce friction.",
    },
  ],
  "Operations": [
    {
      key: "operating_bottleneck",
      label: "Operating bottleneck",
      prompt: "Which process or handoff creates the most operational drag?",
      placeholder: "Name the recurring delay, rework loop, dependency or unclear owner.",
    },
    {
      key: "capacity_cost",
      label: "Capacity cost",
      prompt: "Where is the team spending time that should not require senior attention?",
      placeholder: "Think approvals, manual coordination, repeated decisions or preventable escalation.",
    },
    {
      key: "operating_fix",
      label: "Operating fix",
      prompt: "What operating change would create the most relief within 90 days?",
      placeholder: "Describe the cadence, rule, owner, checklist or system change that would make execution cleaner.",
    },
  ],
  "AI and Automation": [
    {
      key: "automation_candidate",
      label: "Automation candidate",
      prompt: "Which repeatable task is the strongest candidate for automation?",
      placeholder: "Name the task, frequency, owner and current manual steps.",
    },
    {
      key: "ai_constraint",
      label: "Adoption constraint",
      prompt: "What is preventing useful AI or automation from being adopted safely?",
      placeholder: "Think data access, trust, workflow fit, team capability, governance or unclear ROI.",
    },
    {
      key: "automation_win",
      label: "First win",
      prompt: "What automation win would be meaningful within 90 days?",
      placeholder: "Describe a practical use case with a clear owner and measurable benefit.",
    },
  ],
  "Data and Reporting": [
    {
      key: "missing_metric",
      label: "Missing metric",
      prompt: "Which number does the business need but does not reliably have?",
      placeholder: "Name the metric, decision it supports and why it is hard to trust today.",
    },
    {
      key: "reporting_drag",
      label: "Reporting drag",
      prompt: "Where does reporting create confusion instead of clarity?",
      placeholder: "Think manual reporting, inconsistent definitions, stale dashboards or meetings without decisions.",
    },
    {
      key: "decision_view",
      label: "Decision view",
      prompt: "What decision view would improve management rhythm within 90 days?",
      placeholder: "Describe the report, dashboard or scorecard that would change behaviour.",
    },
  ],
  "People and Culture": [
    {
      key: "role_friction",
      label: "Role friction",
      prompt: "Where are roles, ownership or expectations unclear?",
      placeholder: "Name the team, decision, responsibility or behaviour pattern causing friction.",
    },
    {
      key: "leadership_load",
      label: "Leadership load",
      prompt: "What keeps coming back to leadership that should be owned elsewhere?",
      placeholder: "Think approvals, conflict, hiring, performance, prioritisation or quality control.",
    },
    {
      key: "team_shift",
      label: "Team shift",
      prompt: "What team change would improve performance within 90 days?",
      placeholder: "Describe the role clarity, cadence, standard or management action that would matter most.",
    },
  ],
  "Technology and Systems": [
    {
      key: "system_drag",
      label: "System drag",
      prompt: "Which system creates the most friction for the team or customer?",
      placeholder: "Name the tool, workflow, data handoff or limitation.",
    },
    {
      key: "integration_gap",
      label: "Integration gap",
      prompt: "Where do systems fail to connect in a way that creates manual work?",
      placeholder: "Describe the duplicated entry, spreadsheet workaround, missing sync or reporting gap.",
    },
    {
      key: "systems_fix",
      label: "Systems fix",
      prompt: "What systems improvement would create the most leverage within 90 days?",
      placeholder: "Name the fix that would reduce friction without becoming a major rebuild.",
    },
  ],
  "Customer Experience": [
    {
      key: "customer_friction",
      label: "Customer friction",
      prompt: "Where does the customer experience create avoidable effort or doubt?",
      placeholder: "Name the touchpoint, expectation gap, delay or confusing moment.",
    },
    {
      key: "retention_signal",
      label: "Retention signal",
      prompt: "What customer signal tells you the experience needs improvement?",
      placeholder: "Think churn, complaints, silence, support load, delayed onboarding or missed expansion.",
    },
    {
      key: "experience_fix",
      label: "Experience fix",
      prompt: "What customer experience improvement would matter most within 90 days?",
      placeholder: "Describe a specific fix customers would notice.",
    },
  ],
};

export function getBlueprintQuestionsForArea(areaName: string) {
  return QUESTION_OVERRIDES[areaName] ?? DEFAULT_QUESTIONS;
}
