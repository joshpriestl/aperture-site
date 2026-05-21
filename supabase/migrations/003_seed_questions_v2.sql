-- Seed current Aperture Audit v2 practice-area questions.
-- Source: Lovable questions export C:/Users/catpr/Downloads/questions-export-2026-05-21_12-39-23.csv
-- Inserts 40 practice-area questions and leaves context/financial questions out.

delete from public.questions where question_version = 2;

insert into public.questions (practice_area_id, question_text, format, weight, is_inverted, question_version, display_order)
values
  ((select id from public.practice_areas where key = 'strategy'), 'Could everyone in your business (including you) articulate the same direction for the business in a single sentence?', 'yes_no', 1, false, 2, 1),
  ((select id from public.practice_areas where key = 'strategy'), 'Do you have a documented set of strategic priorities for this year that are reviewed at least quarterly?', 'yes_no', 1, false, 2, 2),
  ((select id from public.practice_areas where key = 'strategy'), 'Is there a clear written definition of who your ideal customer is and who you decline to serve?', 'yes_no', 1, false, 2, 3),
  ((select id from public.practice_areas where key = 'strategy'), 'How confident are you that you (and anyone working with you) understands what to say no to?', 'rating_1_5', 1, false, 2, 4),
  ((select id from public.practice_areas where key = 'revenue_pipeline'), 'Can you tell me right now, without checking, what is in your sales pipeline and how likely each one is to close?', 'yes_no', 1, false, 2, 1),
  ((select id from public.practice_areas where key = 'revenue_pipeline'), 'Is there a defined process for how leads become customers in your business?', 'yes_no', 1, false, 2, 2),
  ((select id from public.practice_areas where key = 'revenue_pipeline'), 'Do you know where in the buying conversation you typically lose prospects?', 'yes_no', 1, false, 2, 3),
  ((select id from public.practice_areas where key = 'revenue_pipeline'), 'How confident are you that no qualified lead in the last 90 days has gone without follow-up?', 'rating_1_5', 1, false, 2, 4),
  ((select id from public.practice_areas where key = 'marketing'), 'Do you know how much it costs you to generate a qualified lead from each place you market your business?', 'yes_no', 1, false, 2, 1),
  ((select id from public.practice_areas where key = 'marketing'), 'Is your marketing activity tied to a documented annual plan rather than produced reactively?', 'yes_no', 1, false, 2, 2),
  ((select id from public.practice_areas where key = 'marketing'), 'Do you have a way of staying in front of prospects who are not ready to buy yet?', 'yes_no', 1, false, 2, 3),
  ((select id from public.practice_areas where key = 'marketing'), 'How confident are you that your marketing speaks to specific buyer segments rather than a generic audience?', 'rating_1_5', 1, false, 2, 4),
  ((select id from public.practice_areas where key = 'brand_communications'), 'Do you have documented brand guidelines covering tone of voice, messaging and visual identity?', 'yes_no', 1, false, 2, 1),
  ((select id from public.practice_areas where key = 'brand_communications'), 'If a stranger read three pieces of your customer-facing content from the last month, would they recognise it as coming from the same business?', 'yes_no', 1, false, 2, 2),
  ((select id from public.practice_areas where key = 'brand_communications'), 'Do you have a defined positioning statement that has been tested against your ideal customer?', 'yes_no', 1, false, 2, 3),
  ((select id from public.practice_areas where key = 'brand_communications'), 'How clearly can you (and anyone working with you) articulate what makes your business different from your nearest competitor?', 'rating_1_5', 1, false, 2, 4),
  ((select id from public.practice_areas where key = 'operations'), 'Are your core operational processes documented to the point someone new could follow them without you in the room?', 'yes_no', 1, false, 2, 1),
  ((select id from public.practice_areas where key = 'operations'), 'Do you measure operational capacity in a way that shows when you are at, under or over capacity?', 'yes_no', 1, false, 2, 2),
  ((select id from public.practice_areas where key = 'operations'), 'When work is won, is there a defined way the customer goes from just bought to being served without information getting lost?', 'yes_no', 1, false, 2, 3),
  ((select id from public.practice_areas where key = 'operations'), 'How confident are you that your business could operate at current quality if you took two weeks off without contact?', 'rating_1_5', 1, false, 2, 4),
  ((select id from public.practice_areas where key = 'ai_automation'), 'Have you identified the top three workflows in your business that would benefit most from AI or automation?', 'yes_no', 1, false, 2, 1),
  ((select id from public.practice_areas where key = 'ai_automation'), 'Do you have any automated workflows running today that materially reduce manual work?', 'yes_no', 1, false, 2, 2),
  ((select id from public.practice_areas where key = 'ai_automation'), 'Is there a clear owner for AI adoption in your business, accountable for it?', 'yes_no', 1, false, 2, 3),
  ((select id from public.practice_areas where key = 'ai_automation'), 'How embedded is AI in your day-to-day operations, from drafting communications to analysing data?', 'rating_1_5', 1, false, 2, 4),
  ((select id from public.practice_areas where key = 'data_reporting'), 'Can you see your most important business metrics in real time without having to dig through spreadsheets or compile data manually?', 'yes_no', 1, false, 2, 1),
  ((select id from public.practice_areas where key = 'data_reporting'), 'Do you have a single set of numbers that you review on a fixed cadence to know whether the business is on track?', 'yes_no', 1, false, 2, 2),
  ((select id from public.practice_areas where key = 'data_reporting'), 'Do you regularly make material business decisions based on documented data rather than instinct alone?', 'yes_no', 1, false, 2, 3),
  ((select id from public.practice_areas where key = 'data_reporting'), 'How confident are you that the numbers you are working from are accurate and up to date?', 'rating_1_5', 1, false, 2, 4),
  ((select id from public.practice_areas where key = 'people_culture'), 'When you bring someone new into the business (employee, contractor or freelancer), do you have a structured process for assessing fit?', 'yes_no', 1, false, 2, 1),
  ((select id from public.practice_areas where key = 'people_culture'), 'Do you review the work being done in your business (yours and anyone working with you) against clear expectations on a regular cadence?', 'yes_no', 1, false, 2, 2),
  ((select id from public.practice_areas where key = 'people_culture'), 'In the last year, have you lost anyone working in or for your business (employee, contractor, key supplier, advisor) who you wish had stayed?', 'yes_no', 1, true, 2, 3),
  ((select id from public.practice_areas where key = 'people_culture'), 'How confident are you that everyone working in or for your business (including yourself) knows what success looks like this quarter?', 'rating_1_5', 1, false, 2, 4),
  ((select id from public.practice_areas where key = 'technology_systems'), 'Do you have a documented list of the technology your business uses, with a clear understanding of why each tool is in the stack?', 'yes_no', 1, false, 2, 1),
  ((select id from public.practice_areas where key = 'technology_systems'), 'Is there a single source of truth for customer and pipeline data rather than multiple parallel systems?', 'yes_no', 1, false, 2, 2),
  ((select id from public.practice_areas where key = 'technology_systems'), 'Have you reviewed your technology stack in the last 12 months for redundancy, gaps or better alternatives?', 'yes_no', 1, false, 2, 3),
  ((select id from public.practice_areas where key = 'technology_systems'), 'How confident are you that you (and anyone working with you) are using your existing technology to its full capability?', 'rating_1_5', 1, false, 2, 4),
  ((select id from public.practice_areas where key = 'customer_experience'), 'Do you have a defined customer onboarding process that every new client goes through?', 'yes_no', 1, false, 2, 1),
  ((select id from public.practice_areas where key = 'customer_experience'), 'Are you actively measuring customer satisfaction or NPS on a regular cadence?', 'yes_no', 1, false, 2, 2),
  ((select id from public.practice_areas where key = 'customer_experience'), 'Do you have a documented process for capturing and acting on customer feedback?', 'yes_no', 1, false, 2, 3),
  ((select id from public.practice_areas where key = 'customer_experience'), 'How confident are you that you would know if a customer was unhappy before they churned?', 'rating_1_5', 1, false, 2, 4);
