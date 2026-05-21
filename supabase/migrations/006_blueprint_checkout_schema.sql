-- Blueprint checkout foundation.
-- Stripe webhook writes paid Blueprint records after signature validation.

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
on public.blueprint_assessments
for select
to anon, authenticated
using (true);
