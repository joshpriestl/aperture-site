export type PracticeArea = {
  id: string;
  name: string;
  display_order: number;
};

export type Question = {
  id: string;
  practice_area_id: string;
  question_text: string;
  format: "yes_no" | "rating_1_5";
  weight: number;
  is_inverted: boolean;
  question_version: number;
  display_order: number;
  practice_areas: PracticeArea | PracticeArea[] | null;
};

export type Answer = {
  id?: string;
  assessment_id: string;
  question_id: string;
  answer_value: number;
  raw_response: string;
};

export type Assessment = {
  id: string;
  completed_at: string | null;
  gross_margin_band: string | null;
  cac_band: string | null;
  ltv_band: string | null;
};

export type AssessmentScore = {
  id?: string;
  assessment_id: string;
  practice_area_id: string;
  score: number | null;
  gap_band?: string | null;
  practice_areas: PracticeArea | PracticeArea[] | null;
};

export type FinancialKey = "gross_margin_band" | "cac_band" | "ltv_band";

export type FinancialOption = {
  label: string;
  value: string;
  guidance: string;
};

export type FinancialQuestion = {
  key: FinancialKey;
  code: string;
  title: string;
  options: FinancialOption[];
};

export type QuestionScreen = {
  practiceArea: PracticeArea;
  questions: Question[];
};

export const PRACTICE_AREA_ORDER = [
  "Strategy",
  "Revenue and Pipeline",
  "Marketing",
  "Brand and Communications",
  "Operations",
  "AI and Automation",
  "Data and Reporting",
  "People and Culture",
  "Technology and Systems",
  "Customer Experience",
];

export const FINANCIAL_QUESTIONS: FinancialQuestion[] = [
  {
    key: "gross_margin_band",
    code: "Q47",
    title: "Roughly what is your business's gross margin? Gross margin is your revenue minus the direct cost of delivering what you sell, expressed as a percentage.",
    options: [
      {
        label: "Under 20%",
        value: "under_20",
        guidance: "typical for retail, distribution, low-margin service businesses",
      },
      {
        label: "20% to 40%",
        value: "20_to_40",
        guidance: "typical for many product businesses, hospitality, trades",
      },
      {
        label: "40% to 60%",
        value: "40_to_60",
        guidance: "typical for many service businesses, professional services, agencies",
      },
      {
        label: "60% to 80%",
        value: "60_to_80",
        guidance: "typical for software, high-margin consulting, digital services",
      },
      {
        label: "Over 80%",
        value: "over_80",
        guidance: "typical for SaaS, intellectual property businesses, some content businesses",
      },
      {
        label: "I'm not sure",
        value: "not_sure",
        guidance: "",
      },
      {
        label: "I'd rather not say",
        value: "rather_not_say",
        guidance: "",
      },
    ],
  },
  {
    key: "cac_band",
    code: "Q48",
    title: "Roughly what does it cost you to acquire a new customer (marketing spend, sales effort, time invested)?",
    options: [
      {
        label: "Under $100",
        value: "under_100",
        guidance: "",
      },
      {
        label: "$100 to $500",
        value: "100_to_500",
        guidance: "",
      },
      {
        label: "$500 to $2,000",
        value: "500_to_2000",
        guidance: "",
      },
      {
        label: "$2,000 to $10,000",
        value: "2000_to_10000",
        guidance: "",
      },
      {
        label: "Over $10,000",
        value: "over_10000",
        guidance: "",
      },
      {
        label: "I'm not sure",
        value: "not_sure",
        guidance: "",
      },
      {
        label: "I'd rather not say",
        value: "rather_not_say",
        guidance: "",
      },
    ],
  },
  {
    key: "ltv_band",
    code: "Q49",
    title: "Roughly what is the lifetime value of a typical customer (total revenue from them across the full relationship)?",
    options: [
      {
        label: "Under $1,000",
        value: "under_1000",
        guidance: "",
      },
      {
        label: "$1,000 to $10,000",
        value: "1000_to_10000",
        guidance: "",
      },
      {
        label: "$10,000 to $100,000",
        value: "10000_to_100000",
        guidance: "",
      },
      {
        label: "$100,000 to $1M",
        value: "100000_to_1m",
        guidance: "",
      },
      {
        label: "Over $1M",
        value: "over_1m",
        guidance: "",
      },
      {
        label: "I'm not sure",
        value: "not_sure",
        guidance: "",
      },
      {
        label: "I'd rather not say",
        value: "rather_not_say",
        guidance: "",
      },
    ],
  },
];

export function getPracticeArea(question: Question): PracticeArea | null {
  if (Array.isArray(question.practice_areas)) {
    return question.practice_areas[0] ?? null;
  }

  return question.practice_areas;
}

export function getScorePracticeArea(score: AssessmentScore): PracticeArea | null {
  if (Array.isArray(score.practice_areas)) {
    return score.practice_areas[0] ?? null;
  }

  return score.practice_areas;
}

export function groupQuestionsIntoScreens(questions: Question[]): QuestionScreen[] {
  const screens = new Map<string, QuestionScreen>();

  questions.forEach((question) => {
    const practiceArea = getPracticeArea(question);

    if (!practiceArea) {
      return;
    }

    if (!screens.has(practiceArea.id)) {
      screens.set(practiceArea.id, {
        practiceArea,
        questions: [],
      });
    }

    screens.get(practiceArea.id)?.questions.push(question);
  });

  return Array.from(screens.values())
    .map((screen) => ({
      ...screen,
      questions: [...screen.questions].sort(
        (a, b) => a.display_order - b.display_order,
      ),
    }))
    .sort(
      (a, b) => a.practiceArea.display_order - b.practiceArea.display_order,
    );
}

