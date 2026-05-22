-- ============================================================
-- APERTURE COMBINED SETUP — run this entire block at once
-- in Supabase SQL Editor (New query → paste → Run)
-- ============================================================


-- ============================================================
-- 001 methodology layer
-- ============================================================

create extension if not exists "pgcrypto";

create table if not exists public.practice_areas (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  display_order int not null unique,
  default_weight float not null default 1.0
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  practice_area_id uuid not null references public.practice_areas(id) on delete cascade,
  question_text text not null,
  format text not null check (format in ('yes_no', 'rating_1_5')),
  weight float not null default 1.0,
  is_inverted boolean not null default false,
  question_version int not null default 2,
  display_order int not null,
  created_at timestamptz not null default now()
);

create table if not exists public.answers (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  answer_value int not null,
  raw_response text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (assessment_id, question_id)
);

create table if not exists public.assessment_scores (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  practice_area_id uuid not null references public.practice_areas(id) on delete cascade,
  score int not null check (score >= 0 and score <= 100),
  gap_band text not null check (gap_band in ('critical', 'vulnerable', 'capable', 'strong')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (assessment_id, practice_area_id)
);

create table if not exists public.findings_library (
  id uuid primary key default gen_random_uuid(),
  practice_area_id uuid not null references public.practice_areas(id) on delete cascade,
  trigger_question_id uuid references public.questions(id) on delete set null,
  trigger_condition text,
  gap_band text check (gap_band in ('critical', 'vulnerable', 'capable', 'strong')),
  severity text not null check (severity in ('high', 'medium', 'low')),
  finding_text text not null,
  created_at timestamptz not null default now()
);

insert into public.practice_areas (key, name, display_order, default_weight)
values
  ('strategy', 'Strategy', 1, 1.0),
  ('revenue_pipeline', 'Revenue and Pipeline', 2, 1.0),
  ('marketing', 'Marketing', 3, 1.0),
  ('brand_communications', 'Brand and Communications', 4, 1.0),
  ('operations', 'Operations', 5, 1.0),
  ('ai_automation', 'AI and Automation', 6, 1.0),
  ('data_reporting', 'Data and Reporting', 7, 1.0),
  ('people_culture', 'People and Culture', 8, 1.0),
  ('technology_systems', 'Technology and Systems', 9, 1.0),
  ('customer_experience', 'Customer Experience', 10, 1.0)
on conflict (key) do update
set
  name = excluded.name,
  display_order = excluded.display_order,
  default_weight = excluded.default_weight;

alter table public.practice_areas enable row level security;
alter table public.questions enable row level security;
alter table public.answers enable row level security;
alter table public.assessment_scores enable row level security;
alter table public.findings_library enable row level security;

drop policy if exists "Public can read practice areas" on public.practice_areas;
create policy "Public can read practice areas"
on public.practice_areas for select to anon, authenticated using (true);

drop policy if exists "Public can read questions" on public.questions;
create policy "Public can read questions"
on public.questions for select to anon, authenticated using (true);

drop policy if exists "Public can read findings library" on public.findings_library;
create policy "Public can read findings library"
on public.findings_library for select to anon, authenticated using (true);

drop policy if exists "Public can read answers" on public.answers;
create policy "Public can read answers"
on public.answers for select to anon, authenticated using (true);

drop policy if exists "Public can insert answers" on public.answers;
create policy "Public can insert answers"
on public.answers for insert to anon, authenticated with check (true);

drop policy if exists "Public can update answers" on public.answers;
create policy "Public can update answers"
on public.answers for update to anon, authenticated using (true) with check (true);

drop policy if exists "Public can read assessment scores" on public.assessment_scores;
create policy "Public can read assessment scores"
on public.assessment_scores for select to anon, authenticated using (true);


-- ============================================================
-- 001b grants
-- ============================================================

grant usage on schema public to anon, authenticated;
grant select on public.practice_areas to anon, authenticated;
grant select on public.questions to anon, authenticated;
grant select on public.findings_library to anon, authenticated;
grant select, insert, update on public.answers to anon, authenticated;
grant select on public.assessment_scores to anon, authenticated;


-- ============================================================
-- 001c audit write policies
-- ============================================================

grant select, insert, update on public.answers to anon, authenticated;
grant select, update on public.assessments to anon, authenticated;

drop policy if exists "Anonymous audit can read answers" on public.answers;
create policy "Anonymous audit can read answers"
on public.answers for select to anon, authenticated using (true);

drop policy if exists "Anonymous audit can insert answers" on public.answers;
create policy "Anonymous audit can insert answers"
on public.answers for insert to anon, authenticated with check (true);

drop policy if exists "Anonymous audit can update answers" on public.answers;
create policy "Anonymous audit can update answers"
on public.answers for update to anon, authenticated using (true) with check (true);

drop policy if exists "Anonymous audit can update assessments" on public.assessments;
create policy "Anonymous audit can update assessments"
on public.assessments for update to anon, authenticated using (true) with check (true);


-- ============================================================
-- 002b scoring function (replaces 002 — includes drop)
-- ============================================================

drop function if exists public.compute_assessment_scores(uuid);

create or replace function public.compute_assessment_scores(p_assessment_id uuid)
returns integer
language plpgsql
security definer
set search_path = public
as $function$
declare
  inserted_count integer := 0;
begin
  delete from public.assessment_scores where assessment_id = p_assessment_id;

  with scored as (
    select
      q.practice_area_id,
      round(
        sum(
          (case
            when q.is_inverted then 100 - normalised.normalised_value
            else normalised.normalised_value
          end) * q.weight
        ) / nullif(sum(q.weight), 0)
      )::int as score
    from public.answers a
    inner join public.questions q on q.id = a.question_id
    cross join lateral (
      select case
        when q.format = 'yes_no' and lower(a.raw_response) = 'yes' then 100
        when q.format = 'yes_no' and lower(a.raw_response) = 'no' then 0
        when q.format = 'rating_1_5' then greatest(0, least(100, (a.answer_value - 1) * 25))
        else greatest(0, least(100, a.answer_value))
      end as normalised_value
    ) normalised
    where a.assessment_id = p_assessment_id and q.question_version = 2
    group by q.practice_area_id
  ),
  inserted as (
    insert into public.assessment_scores (assessment_id, practice_area_id, score, gap_band)
    select
      p_assessment_id,
      scored.practice_area_id,
      scored.score,
      case
        when scored.score <= 25 then 'critical'
        when scored.score <= 50 then 'vulnerable'
        when scored.score <= 75 then 'capable'
        else 'strong'
      end as gap_band
    from scored
    returning 1
  )
  select count(*) into inserted_count from inserted;

  if inserted_count <> 10 then
    raise exception 'Expected 10 assessment score rows, inserted % for assessment %', inserted_count, p_assessment_id;
  end if;

  return inserted_count;
end;
$function$;

grant execute on function public.compute_assessment_scores(uuid) to anon, authenticated;


-- ============================================================
-- 002c assessment_scores read policy
-- ============================================================

drop policy if exists "Anonymous audit can read assessment_scores" on public.assessment_scores;
create policy "Anonymous audit can read assessment_scores"
on public.assessment_scores for select to anon, authenticated using (true);


-- ============================================================
-- 003 seed questions v2
-- ============================================================

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


-- ============================================================
-- 004 seed findings library
-- ============================================================

truncate public.findings_library restart identity cascade;

insert into public.findings_library (id, practice_area_id, trigger_question_id, trigger_condition, gap_band, severity, finding_text) values
(gen_random_uuid(), (select id from public.practice_areas where key = 'strategy'), null, null, 'capable', 'low', 'Strategy is mostly in place and mostly followed. Tightening the quarterly review rhythm would close the last gap between intent and execution.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'strategy'), null, null, 'capable', 'low', 'The filter for what to decline could be sharper. A one page version your team can reference would prevent the slow drift that has historically crept in.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'strategy'), null, null, 'critical', 'high', 'There is no shared answer to where the business is going. Without that, every decision is contested and nothing compounds. This is the most expensive gap in the business right now.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'strategy'), null, null, 'critical', 'high', 'Priorities change week to week based on who shouted loudest. The team is busy but the business is not moving in any deliberate direction.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'strategy'), null, null, 'critical', 'medium', 'You are saying yes to work that is wrong for you because there is no written filter for what to decline. Each wrong-fit client is consuming capacity the right ones could fund.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'strategy'), null, null, 'critical', 'medium', 'No one outside your head can describe the strategy in a sentence. That means no one outside your head is helping you execute it.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'strategy'), null, null, 'vulnerable', 'medium', 'Strategy exists but is not reviewed on a cadence. Plans drift, the team improvises, and quarters end without a clean read on what worked.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'strategy'), null, null, 'vulnerable', 'medium', 'The link between annual goals and weekly work is loose. People are busy on things that look productive but do not move the strategic needle.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'strategy'), null, null, 'vulnerable', 'medium', 'Decisions to take on new work happen case by case rather than against a written filter. Over time this dilutes positioning and clogs delivery.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'strategy'), null, null, 'vulnerable', 'medium', 'There is a plan but it does not survive contact with a hard week. The first sign of pressure and the team reverts to reacting to whatever lands in the inbox.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'strategy'), (select id from public.questions where question_text like 'Could everyone in your business%'), 'failed_yes_no', null, 'high', 'Your team is operating without a shared direction. Different people are pulling toward different versions of the future, which means effort compounds inefficiently and decisions get re-litigated.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'strategy'), (select id from public.questions where question_text like 'Do you have a documented set of strategic priorities%'), 'failed_yes_no', null, 'high', 'Without written priorities reviewed quarterly, the business defaults to whatever is loudest this week. Strategy without cadence is just opinion.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'strategy'), (select id from public.questions where question_text like 'Is there a clear written definition of who your ideal customer%'), 'failed_yes_no', null, 'medium', 'You are likely saying yes to clients you should be declining, which costs more than the revenue they bring. Defining who you do not serve is the discipline that protects margin.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'strategy'), (select id from public.questions where question_text like 'How confident are you that you (and anyone working with you) understands what to say no to%'), 'low_rating', null, 'medium', 'Your team does not have a clear filter for what to decline. This produces scope creep, distracted execution and dilution of what you are best at.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'revenue_pipeline'), null, null, 'capable', 'low', 'Pipeline hygiene is good but could be tighter. A weekly 20 minute review of stage movement would catch the small leaks before they compound.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'revenue_pipeline'), null, null, 'capable', 'low', 'Conversion data is captured but rarely acted on. The next win is in using it to coach the team rather than just report on it.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'revenue_pipeline'), null, null, 'critical', 'high', 'You cannot say with confidence what is in pipeline this week. Forecasting is guesswork, hiring is guesswork, and cash decisions are made on hope.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'revenue_pipeline'), null, null, 'critical', 'high', 'Deals are being lost between stages because no one owns the handoff. Qualified interest is decaying into nothing and you have no visibility into where.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'revenue_pipeline'), null, null, 'critical', 'medium', 'The sales process lives in individual heads. When someone leaves or gets ill, the pipeline they were running goes dark with them.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'revenue_pipeline'), null, null, 'critical', 'medium', 'Follow-up is inconsistent. The cheapest revenue you will ever have access to is the leads you have already paid to acquire, and most of it is leaking.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'revenue_pipeline'), null, null, 'vulnerable', 'medium', 'Pipeline is tracked but not trusted. The numbers in the CRM and the numbers in the founder''s head do not match, so neither gets used to make decisions.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'revenue_pipeline'), null, null, 'vulnerable', 'medium', 'Conversion is not measured stage by stage. You know the top of funnel and you know revenue, but the bit in the middle is a black box.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'revenue_pipeline'), null, null, 'vulnerable', 'medium', 'Sales activity is happening but not against targets. The team is busy without a clear read on whether they are on pace.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'revenue_pipeline'), null, null, 'vulnerable', 'medium', 'Lead qualification varies by who picks up the call. The same prospect can be in pipeline or rejected depending on the day.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'revenue_pipeline'), (select id from public.questions where question_text like 'Can you tell me right now, without checking%'), 'failed_yes_no', null, 'high', 'You cannot answer the most basic commercial question about your business in real time. Decisions are being made on instinct rather than instrumented data.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'revenue_pipeline'), (select id from public.questions where question_text like 'Is there a defined process for how leads become customers%'), 'failed_yes_no', null, 'high', 'Your sales process exists in the heads of individuals. When one of them leaves, the process leaves with them. Revenue is single-point-of-failure dependent.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'revenue_pipeline'), (select id from public.questions where question_text like 'How confident are you that no qualified lead%'), 'low_rating', null, 'high', 'Qualified leads are going dark without follow-up. This is the cheapest revenue you will ever have access to and you are giving it back to your competitors.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'revenue_pipeline'), (select id from public.questions where question_text like 'Do you know where in the buying conversation%'), 'failed_yes_no', null, 'medium', 'You can see leads in and revenue out but not where deals are stalling. The biggest leverage point in any pipeline is the worst-converting stage and you cannot see yours.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'marketing'), null, null, 'capable', 'low', 'Marketing is performing but could be sharper. A quarterly review of message-market fit would prevent the slow drift that historically sets in.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'marketing'), null, null, 'capable', 'low', 'Distribution is solid but underleveraged. Each piece of content could work harder across more surfaces with minimal additional effort.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'marketing'), null, null, 'critical', 'high', 'You are spending on marketing without knowing what is working. The budget is being allocated on instinct and the wrong half keeps getting funded.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'marketing'), null, null, 'critical', 'high', 'There is no plan. Marketing happens when someone has time, which means it produces noise rather than compounding pipeline.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'marketing'), null, null, 'critical', 'medium', 'Your positioning speaks to everyone, which means it lands with no one. Prospects cannot tell what you do or who you do it for.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'marketing'), null, null, 'critical', 'medium', 'The 80 percent of prospects not ready today are being abandoned. There is no nurture and no follow-up, so the work that brought them in is wasted.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'marketing'), null, null, 'vulnerable', 'medium', 'Marketing activity is steady but the throughline is missing. Campaigns happen but do not build on each other, so each one starts cold.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'marketing'), null, null, 'vulnerable', 'medium', 'You can describe what you do but not why a buyer should care. The message is accurate and forgettable, which is the worst combination.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'marketing'), null, null, 'vulnerable', 'medium', 'Attribution is partial. You can see some channels working but not the picture as a whole, which makes reallocating budget a guess.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'marketing'), null, null, 'vulnerable', 'medium', 'Content is being produced but not distributed. The best work the team is making is being seen by a fraction of the audience that should see it.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'marketing'), (select id from public.questions where question_text like 'Do you know how much it costs you to generate a qualified lead%'), 'failed_yes_no', null, 'high', 'You are spending on marketing without knowing which channels are working. Budget is being allocated by inertia rather than evidence.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'marketing'), (select id from public.questions where question_text like 'Do you have a way of staying in front of prospects%'), 'failed_yes_no', null, 'high', 'The 80 percent of prospects who are not ready to buy today are being lost. There is no asset working in the background to bring them back when they are ready.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'marketing'), (select id from public.questions where question_text like 'Is your marketing activity tied to a documented annual plan%'), 'failed_yes_no', null, 'medium', 'Marketing is reactive rather than planned, which means it is producing tactical output instead of compounding brand and pipeline assets.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'marketing'), (select id from public.questions where question_text like 'How confident are you that your marketing speaks to specific buyer segments%'), 'low_rating', null, 'medium', 'Your marketing speaks to everyone, which means it speaks to no one. Generic messaging converts at a fraction of segment-specific messaging.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'brand_communications'), null, null, 'capable', 'low', 'Brand is consistent enough. The next gain is in sharpening the few high-leverage surfaces, the homepage hero, the first proposal page, the founder bio.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'brand_communications'), null, null, 'capable', 'low', 'Messaging is on point and could be tested more aggressively. Small variations on the highest traffic pages would surface what is actually doing the work.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'brand_communications'), null, null, 'critical', 'high', 'Your positioning has not been tested against the buyers you want. You are guessing at what resonates and the market is telling you, in silence, that you have guessed wrong.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'brand_communications'), null, null, 'critical', 'medium', 'The brand is whatever the last person to touch it decided. There is no written reference, so every prospect experiences a slightly different company.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'brand_communications'), null, null, 'critical', 'medium', 'No one on the team can crisply say why you are different. If they cannot, the market will not work it out either.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'brand_communications'), null, null, 'critical', 'medium', 'Visual and verbal identity drift across surfaces. The website, the deck and the proposal look like three different companies, which costs you trust before the sales conversation starts.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'brand_communications'), null, null, 'vulnerable', 'medium', 'Brand exists in fragments. There are guidelines but they are not enforced, so the work coming out is on-brand only by accident.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'brand_communications'), null, null, 'vulnerable', 'medium', 'Your messaging is functional but not memorable. Buyers can describe what you do and not why it matters, which puts every deal on price.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'brand_communications'), null, null, 'vulnerable', 'medium', 'The story you tell internally and the story you tell externally are not aligned. Team members hesitate when describing the company because they are not sure which version to use.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'brand_communications'), null, null, 'vulnerable', 'medium', 'Customer language is not feeding back into messaging. The exact phrases that win deals are not making it into the website or the deck.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'brand_communications'), (select id from public.questions where question_text like 'Do you have a defined positioning statement%'), 'failed_yes_no', null, 'high', 'Your positioning has not been tested against the people you are trying to win. You may be saying things that resonate internally and fall flat externally.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'brand_communications'), (select id from public.questions where question_text like 'Do you have documented brand guidelines%'), 'failed_yes_no', null, 'medium', 'Your brand is inconsistent because there is no written reference for what it is. Every piece of output is a guess at the standard.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'brand_communications'), (select id from public.questions where question_text like 'If a stranger read three pieces%'), 'failed_yes_no', null, 'medium', 'Customers experience a different company depending on who in your team they are talking to. Trust erodes when the voice is inconsistent.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'brand_communications'), (select id from public.questions where question_text like 'How clearly can you (and anyone working with you) articulate what makes your business different%'), 'low_rating', null, 'medium', 'Your team cannot crisply articulate why you are different. If the team cannot say it, the market certainly cannot hear it.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'operations'), null, null, 'capable', 'low', 'Operations are solid and could be more leveraged. The next gain is in turning informal best practice into written standard.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'operations'), null, null, 'capable', 'low', 'Documentation exists but is not maintained. A light quarterly review would prevent the slow rot that creeps in over a year.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'operations'), null, null, 'critical', 'high', 'The business cannot scale because it cannot be replicated. Every new hire releases capacity slowly because nothing is documented.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'operations'), null, null, 'critical', 'high', 'Quality drops whenever you step out of the room. The business runs on your attention rather than on systems, which caps how big it can get.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'operations'), null, null, 'critical', 'medium', 'Capacity is invisible. You cannot tell whether the team is at, under or over until something breaks, which makes hiring reactive and expensive.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'operations'), null, null, 'critical', 'medium', 'Work is being redone because handoffs are unclear. The same conversation is happening three times across delivery, which is a tax on every project.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'operations'), null, null, 'vulnerable', 'medium', 'Process exists but is inconsistently followed. New hires learn by osmosis, which means each one is slightly different from the last.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'operations'), null, null, 'vulnerable', 'medium', 'Some workflows are documented and most are not. The 20 percent that are documented are running well, which proves the model and exposes the gap.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'operations'), null, null, 'vulnerable', 'medium', 'Operational reviews are infrequent. Issues that should have been caught in week one are surfacing in month three, which is when they get expensive.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'operations'), null, null, 'vulnerable', 'medium', 'Project quality is good when conditions are good. The system has not been tested against pressure, and the cracks will appear at the worst time.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'operations'), (select id from public.questions where question_text like 'Are your core operational processes documented%'), 'failed_yes_no', null, 'high', 'Your business cannot scale because it cannot be replicated. Every new hire relearns from scratch and every senior person is a single point of failure.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'operations'), (select id from public.questions where question_text like 'When work is won, is there a defined way%'), 'failed_yes_no', null, 'high', 'Deals are won and then lose value at the seam between sales and delivery. The promise the customer bought is not the experience they get.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'operations'), (select id from public.questions where question_text like 'How confident are you that your business could operate at current quality%'), 'low_rating', null, 'high', 'The business cannot operate at quality without you in the room. This is the constraint on everything: your time, your scale, your eventual exit value.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'operations'), (select id from public.questions where question_text like 'Do you measure operational capacity%'), 'failed_yes_no', null, 'medium', 'You cannot see whether you are at, under or over capacity, which means hiring and delivery decisions are being made blind.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'ai_automation'), null, null, 'capable', 'low', 'AI is integrated and could be pushed further. The next gain is in identifying the two or three workflows where automation would unlock disproportionate time.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'ai_automation'), null, null, 'capable', 'low', 'Standards exist but could be tighter. A short monthly review of what is working would compound the gains the team is already making.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'ai_automation'), null, null, 'critical', 'high', 'AI is not part of how the business operates. The productivity differential between teams using it well and teams not using it at all is now too large to ignore.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'ai_automation'), null, null, 'critical', 'high', 'Your team is spending hours on work that does not need a human. Every one of those hours is paid for twice, once in salary and once in the work that did not happen.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'ai_automation'), null, null, 'critical', 'medium', 'There is no map of where AI would create the most leverage. Adoption is happening at the edges and the highest value applications are sitting unused.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'ai_automation'), null, null, 'critical', 'medium', 'No one owns AI in the business. Without ownership, it stays as a personal productivity tool rather than becoming a competitive advantage.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'ai_automation'), null, null, 'vulnerable', 'medium', 'AI is being used by some of the team some of the time. The benefits are real and uneven, which means the business is not capturing the full upside.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'ai_automation'), null, null, 'vulnerable', 'medium', 'Tools have been adopted but workflows have not changed. People are using AI to do the old work faster rather than to rethink what the work is.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'ai_automation'), null, null, 'vulnerable', 'medium', 'There is no shared standard for how to use AI safely. Sensitive information is being pasted into models without anyone owning the policy.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'ai_automation'), null, null, 'vulnerable', 'medium', 'The pace of AI capability is faster than your review cycle. By the time you have a process, the underlying tool has moved.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'ai_automation'), (select id from public.questions where question_text like 'Have you identified the top three workflows%'), 'failed_yes_no', null, 'high', 'You have not identified where AI would create the most leverage in your business. Competitors are doing this work right now and the gap compounds monthly.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'ai_automation'), (select id from public.questions where question_text like 'Do you have any automated workflows running today%'), 'failed_yes_no', null, 'high', 'Your team is doing work that does not need a human. Every hour spent on this is an hour not spent on the work that does.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'ai_automation'), (select id from public.questions where question_text like 'How embedded is AI in your day-to-day operations%'), 'low_rating', null, 'high', 'AI is not yet part of how your team operates. The productivity differential between AI-native teams and non-AI teams is now the single biggest commercial gap in most markets.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'ai_automation'), (select id from public.questions where question_text like 'Is there a clear owner for AI adoption%'), 'failed_yes_no', null, 'medium', 'AI adoption has no owner, which means it has no accountability. It will not happen by accident.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'data_reporting'), null, null, 'capable', 'low', 'Reporting is in good shape. The next gain is in tightening the link between what is reported and what gets acted on the next day.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'data_reporting'), null, null, 'capable', 'low', 'Dashboards exist and are slightly underused. A 20 minute weekly review with the team would convert visibility into momentum.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'data_reporting'), null, null, 'critical', 'high', 'You cannot see your own business in real time. Every important decision waits on someone manually pulling numbers, which means decisions are made late or not at all.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'data_reporting'), null, null, 'critical', 'high', 'The team does not trust the numbers. When data is questionable, decision-making defaults to whoever is loudest, and loud is not always right.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'data_reporting'), null, null, 'critical', 'medium', 'There is no single dashboard the team reviews together. Different people are looking at different views of the truth, which guarantees disagreement.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'data_reporting'), null, null, 'critical', 'medium', 'Material decisions are being made on instinct. Instinct is sometimes right and is not a strategy.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'data_reporting'), null, null, 'vulnerable', 'medium', 'Reporting exists but is not actioned. Numbers are produced, glanced at, and filed, which is the worst kind of overhead.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'data_reporting'), null, null, 'vulnerable', 'medium', 'Data is captured in multiple systems that do not talk. The hours spent reconciling are coming out of the work that produces revenue.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'data_reporting'), null, null, 'vulnerable', 'medium', 'Lagging indicators are tracked, leading indicators are not. By the time the lagging metric moves, the window to influence it has closed.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'data_reporting'), null, null, 'vulnerable', 'medium', 'The reporting cadence is irregular. Reviews happen when something breaks, which means they happen too late.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'data_reporting'), (select id from public.questions where question_text like 'Can you see your most important business metrics in real time%'), 'failed_yes_no', null, 'high', 'You cannot see your own business in real time. Every important decision waits on someone manually pulling a report, which means decisions are slower and worse.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'data_reporting'), (select id from public.questions where question_text like 'How confident are you that the numbers you are working from%'), 'low_rating', null, 'high', 'Your team does not trust the numbers. When the data is questionable, decision-making collapses to whoever has the strongest opinion in the room.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'data_reporting'), (select id from public.questions where question_text like 'Do you have a single set of numbers that you review on a fixed cadence%'), 'failed_yes_no', null, 'medium', 'There is no single dashboard the leadership team reviews together. Different people see different numbers, which means alignment is theatre rather than substance.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'data_reporting'), (select id from public.questions where question_text like 'Do you regularly make material business decisions based on documented data%'), 'failed_yes_no', null, 'medium', 'Material business decisions are being made on instinct. Sometimes instinct is right. Often it is expensive.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'people_culture'), null, null, 'capable', 'low', 'People practices are sound and could be more deliberate. Codifying the existing informal standards would protect them as the team grows.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'people_culture'), null, null, 'capable', 'low', 'Reviews are happening and could be tied more tightly to development. A small change in structure would convert good intent into compounding growth.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'people_culture'), null, null, 'critical', 'high', 'You have lost people you wanted to keep. The cost of that turnover, in cash and in momentum, is larger than the salary line suggests.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'people_culture'), null, null, 'critical', 'high', 'Performance is reviewed inconsistently or not at all. Your best people are unrewarded and your weakest are uncorrected, which is the slowest way to lose both.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'people_culture'), null, null, 'critical', 'medium', 'Hiring is unstructured. Some hires work, some do not, and the difference is luck rather than process.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'people_culture'), null, null, 'critical', 'medium', 'Expectations are unclear. Without quarterly goals people set their own, which often do not align with what the business needs.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'people_culture'), null, null, 'vulnerable', 'medium', 'Reviews happen but are uneven. Some people get developed and others get forgotten, which the team notices even when you do not.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'people_culture'), null, null, 'vulnerable', 'medium', 'Onboarding is informal. New hires take three months to do what could take six weeks, which is a tax on every hire.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'people_culture'), null, null, 'vulnerable', 'medium', 'Culture is real and undefined. It works while the founder is in the room and weakens when the team grows beyond personal contact.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'people_culture'), null, null, 'vulnerable', 'medium', 'Career paths are implicit. Ambitious people are guessing at what the next step looks like, which is when they start taking calls from recruiters.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'people_culture'), (select id from public.questions where question_text like 'Do you review the work being done in your business%'), 'failed_yes_no', null, 'high', 'Performance is reviewed inconsistently or not at all. Your best people are unrewarded and your underperformers are uncorrected.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'people_culture'), (select id from public.questions where question_text like 'In the last year, have you lost anyone%'), 'inverted_failed', null, 'high', 'You have lost people in the last year you wanted to keep. The cost of that turnover is rarely the salary. It is the institutional knowledge that left with them.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'people_culture'), (select id from public.questions where question_text like 'When you bring someone new into the business%'), 'failed_yes_no', null, 'medium', 'Hiring is unstructured, which produces inconsistent outcomes. Some hires work out, some do not, and you cannot tell why either happened.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'people_culture'), (select id from public.questions where question_text like 'How confident are you that everyone working in or for your business%'), 'low_rating', null, 'medium', 'Your team does not have clear quarterly expectations. Without that clarity, motivation defaults to compliance rather than ownership.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'technology_systems'), null, null, 'capable', 'low', 'The stack is in good shape and modestly bloated. A quarterly audit would catch the tools that have quietly stopped earning their keep.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'technology_systems'), null, null, 'capable', 'low', 'Integrations are working and could be deeper. The next gain is in eliminating the last two or three manual handoffs between systems.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'technology_systems'), null, null, 'critical', 'high', 'Customer and pipeline data lives in multiple parallel systems. This is the single largest source of internal friction and it is paid for in every meeting.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'technology_systems'), null, null, 'critical', 'medium', 'Your stack has no designated owner. Tools accumulate, contracts auto-renew, and no one is responsible for whether the spend is producing value.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'technology_systems'), null, null, 'critical', 'medium', 'Tools have been adopted but not integrated. The team is doing the integration work manually, which is the most expensive way to do it.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'technology_systems'), null, null, 'critical', 'medium', 'Security and access have not been reviewed recently. Former contractors and old accounts likely still have access to things they should not.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'technology_systems'), null, null, 'vulnerable', 'medium', 'The stack works and could work better. Two or three of your most-used tools are likely doing 30 percent of what you bought them for.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'technology_systems'), null, null, 'vulnerable', 'medium', 'Adoption of new tools is patchy. Some of the team are deep, others are doing things the old way, which means you are paying for capability you are not using.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'technology_systems'), null, null, 'vulnerable', 'medium', 'System health is checked when something breaks. Quarterly review would surface the slow degradations before they become outages.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'technology_systems'), null, null, 'vulnerable', 'medium', 'Documentation of how systems fit together exists in fragments. Onboarding into the stack takes longer than it should because there is no single map.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'technology_systems'), (select id from public.questions where question_text like 'Is there a single source of truth for customer and pipeline data%'), 'failed_yes_no', null, 'high', 'Customer and pipeline data lives in multiple parallel systems. This is the single most common cause of revenue leakage in mid-market businesses.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'technology_systems'), (select id from public.questions where question_text like 'Have you reviewed your technology stack in the last 12 months%'), 'failed_yes_no', null, 'low', 'Your stack has not been reviewed for redundancy or gaps recently. You are likely paying for tools you have outgrown and missing tools you now need.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'technology_systems'), (select id from public.questions where question_text like 'Do you have a documented list of the technology%'), 'failed_yes_no', null, 'medium', 'Your technology stack does not have designated owners. Tools accumulate, contracts auto-renew and no one is accountable for the spend or the integration.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'technology_systems'), (select id from public.questions where question_text like 'How confident are you that you (and anyone working with you) are using your existing technology%'), 'low_rating', null, 'medium', 'Your team is using a fraction of what your existing tools can do. New software is rarely the answer when the existing software is underused.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'customer_experience'), null, null, 'capable', 'low', 'Customer experience is strong and could be more systematic. The next gain is in turning the informal customer success motions into a written playbook.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'customer_experience'), null, null, 'capable', 'low', 'Feedback is captured and lightly used. Closing the loop with customers on what changed because of their input would convert satisfaction into advocacy.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'customer_experience'), null, null, 'critical', 'high', 'New customers experience a different version of your business depending on who handled them. Your weakest onboarding is what the market thinks you are.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'customer_experience'), null, null, 'critical', 'high', 'You would not know a customer was about to leave until they had already left. By the time it shows up in revenue, retention work is too late.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'customer_experience'), null, null, 'critical', 'medium', 'You are not measuring satisfaction. You will find out a customer is unhappy when they stop replying, which is the most expensive form of feedback.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'customer_experience'), null, null, 'critical', 'medium', 'Feedback is being given and not captured. The patterns that would tell you what to fix are sitting in individual inboxes and Slack threads.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'customer_experience'), null, null, 'vulnerable', 'medium', 'Onboarding is consistent enough and not deliberate. The first 30 days set the tone for the relationship and are being left to chance.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'customer_experience'), null, null, 'vulnerable', 'medium', 'NPS or equivalent is run occasionally. Without a cadence, you cannot see whether the trend is up or down, which is the only number that matters.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'customer_experience'), null, null, 'vulnerable', 'medium', 'Account management is reactive. You respond well when customers ask and you are not proactively shaping the relationship between asks.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'customer_experience'), null, null, 'vulnerable', 'medium', 'Renewal conversations happen close to renewal. The expansion opportunities sit in the six months before that, and they are mostly being missed.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'customer_experience'), (select id from public.questions where question_text like 'Do you have a defined customer onboarding process%'), 'failed_yes_no', null, 'high', 'New customers experience a different version of your business depending on who handles them. The most expensive moment in the customer relationship has the least process behind it.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'customer_experience'), (select id from public.questions where question_text like 'How confident are you that you would know if a customer was unhappy%'), 'low_rating', null, 'high', 'You would not know a customer was about to leave until they had already left. By that point, recovery is rarely possible.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'customer_experience'), (select id from public.questions where question_text like 'Are you actively measuring customer satisfaction%'), 'failed_yes_no', null, 'medium', 'You are not measuring customer satisfaction. You will find out a customer is unhappy when they leave, which is too late to do anything about it.'),
(gen_random_uuid(), (select id from public.practice_areas where key = 'customer_experience'), (select id from public.questions where question_text like 'Do you have a documented process for capturing and acting on customer feedback%'), 'failed_yes_no', null, 'medium', 'Feedback is being given but not captured systematically, which means it cannot be acted on at scale. Insight is being lost the moment it is offered.');


-- ============================================================
-- 005 findings library read policy
-- ============================================================

drop policy if exists "Public can read findings_library" on public.findings_library;
create policy "Public can read findings_library"
on public.findings_library for select to anon, authenticated using (true);


-- ============================================================
-- 006 blueprint checkout schema
-- ============================================================

create table if not exists public.blueprint_assessments (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  organisation_id uuid references public.organisations(id) on delete set null,
  person_id uuid references public.people(id) on delete set null,
  paid boolean not null default false,
  paid_at timestamptz,
  stripe_checkout_session_id text not null unique,
  stripe_payment_id text,
  questions_complete boolean not null default false,
  calcom_booking_id text,
  calcom_booking_confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (assessment_id, stripe_checkout_session_id)
);

alter table public.blueprint_assessments enable row level security;

grant select on public.blueprint_assessments to anon, authenticated;

drop policy if exists "Public can read blueprint assessments" on public.blueprint_assessments;
create policy "Public can read blueprint assessments"
on public.blueprint_assessments for select to anon, authenticated using (true);


-- ============================================================
-- 007 blueprint document schema
-- ============================================================

create table if not exists public.blueprint_answers (
  id uuid primary key default gen_random_uuid(),
  blueprint_assessment_id uuid not null references public.blueprint_assessments(id) on delete cascade,
  practice_area_id uuid references public.practice_areas(id) on delete set null,
  question_key text not null,
  question_label text not null,
  answer_value jsonb not null default '{}'::jsonb,
  raw_response text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (blueprint_assessment_id, question_key)
);

create table if not exists public.blueprint_documents (
  id uuid primary key default gen_random_uuid(),
  blueprint_assessment_id uuid not null unique references public.blueprint_assessments(id) on delete cascade,
  draft_content jsonb,
  approved_content jsonb,
  status text not null default 'draft' check (status in ('draft', 'queued', 'approved', 'delivered', 'error')),
  build_price_low int,
  build_price_midpoint int,
  build_price_high int,
  timeline_weeks int,
  founder_review_flag boolean not null default false,
  error_message text,
  approved_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.document_review_queue (
  id uuid primary key default gen_random_uuid(),
  blueprint_document_id uuid not null unique references public.blueprint_documents(id) on delete cascade,
  status text not null default 'queued' check (status in ('queued', 'in_review', 'approved', 'blocked')),
  priority int not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.engagement_corpus (
  id uuid primary key default gen_random_uuid(),
  blueprint_document_id uuid references public.blueprint_documents(id) on delete set null,
  organisation_id uuid references public.organisations(id) on delete set null,
  industry text,
  revenue_band text,
  headcount_band text,
  priority_practice_area_keys text[] not null default '{}',
  content text not null,
  metadata jsonb not null default '{}'::jsonb,
  embedding jsonb,
  created_at timestamptz not null default now()
);

alter table public.blueprint_answers enable row level security;
alter table public.blueprint_documents enable row level security;
alter table public.document_review_queue enable row level security;
alter table public.engagement_corpus enable row level security;

grant select on public.blueprint_answers to anon, authenticated;
grant select on public.blueprint_documents to anon, authenticated;

drop policy if exists "Public can read blueprint answers" on public.blueprint_answers;
create policy "Public can read blueprint answers"
on public.blueprint_answers for select to anon, authenticated using (true);

drop policy if exists "Public can read approved blueprint documents" on public.blueprint_documents;
create policy "Public can read approved blueprint documents"
on public.blueprint_documents for select to anon, authenticated
using (status in ('approved', 'delivered'));


-- ============================================================
-- 008 service_role write grants
-- ============================================================

grant select, insert, update, delete on public.blueprint_assessments to service_role;
grant select, insert, update, delete on public.blueprint_answers      to service_role;
grant select, insert, update, delete on public.blueprint_documents    to service_role;


-- ============================================================
-- 009 service_role read on assessments
-- ============================================================

-- The Stripe webhook handler looks up the assessment row using the
-- service_role admin client before upserting into blueprint_assessments.
-- Without SELECT the lookup returns empty data and the webhook returns 404.
grant select on public.assessments to service_role;


-- ============================================================
-- 010 blueprint answers service_role regrant
-- ============================================================

grant select, insert, update, delete on public.blueprint_assessments to service_role;
grant select, insert, update, delete on public.blueprint_answers to service_role;
