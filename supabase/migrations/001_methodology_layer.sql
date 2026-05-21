-- Aperture methodology layer
-- Source of truth: APERTURE OS / DATABASE v2, AUDIT_SPEC v2, SCORING_MODEL v2.
-- Run this in the existing Supabase project before testing /start/questions.

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
on public.practice_areas
for select
to anon, authenticated
using (true);

drop policy if exists "Public can read questions" on public.questions;
create policy "Public can read questions"
on public.questions
for select
to anon, authenticated
using (true);

drop policy if exists "Public can read findings library" on public.findings_library;
create policy "Public can read findings library"
on public.findings_library
for select
to anon, authenticated
using (true);

drop policy if exists "Public can read answers" on public.answers;
create policy "Public can read answers"
on public.answers
for select
to anon, authenticated
using (true);

drop policy if exists "Public can insert answers" on public.answers;
create policy "Public can insert answers"
on public.answers
for insert
to anon, authenticated
with check (true);

drop policy if exists "Public can update answers" on public.answers;
create policy "Public can update answers"
on public.answers
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists "Public can read assessment scores" on public.assessment_scores;
create policy "Public can read assessment scores"
on public.assessment_scores
for select
to anon, authenticated
using (true);
