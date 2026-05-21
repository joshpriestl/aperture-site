-- Grants required for anon/authenticated access to the Audit methodology layer.
-- Run after 001_methodology_layer.sql.

grant usage on schema public to anon, authenticated;

grant select on public.practice_areas to anon, authenticated;
grant select on public.questions to anon, authenticated;
grant select on public.findings_library to anon, authenticated;

grant select, insert, update on public.answers to anon, authenticated;
grant select on public.assessment_scores to anon, authenticated;

