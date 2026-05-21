-- Grant write access to service_role for Blueprint tables.
--
-- Migrations 006 and 007 only granted SELECT to anon/authenticated.
-- The Stripe webhook handler uses service_role to upsert Blueprint
-- purchase records, so it needs INSERT and UPDATE on blueprint_assessments.
-- blueprint_answers and blueprint_documents are included for the same
-- reason ahead of the Blueprint document pipeline going live.

grant insert, update, delete on public.blueprint_assessments to service_role;
grant insert, update, delete on public.blueprint_answers      to service_role;
grant insert, update, delete on public.blueprint_documents    to service_role;
