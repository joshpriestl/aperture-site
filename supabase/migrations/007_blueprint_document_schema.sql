-- Blueprint document and review foundation.
-- Run after 006_blueprint_checkout_schema.sql.

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
on public.blueprint_answers
for select
to anon, authenticated
using (true);

drop policy if exists "Public can read approved blueprint documents" on public.blueprint_documents;
create policy "Public can read approved blueprint documents"
on public.blueprint_documents
for select
to anon, authenticated
using (status in ('approved', 'delivered'));
