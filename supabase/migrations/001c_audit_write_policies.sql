-- Write permissions required by the anonymous Audit flow.
-- Run after 001b_methodology_grants.sql.

grant select, insert, update on public.answers to anon, authenticated;
grant select, update on public.assessments to anon, authenticated;

drop policy if exists "Anonymous audit can read answers" on public.answers;
create policy "Anonymous audit can read answers"
on public.answers
for select
to anon, authenticated
using (true);

drop policy if exists "Anonymous audit can insert answers" on public.answers;
create policy "Anonymous audit can insert answers"
on public.answers
for insert
to anon, authenticated
with check (true);

drop policy if exists "Anonymous audit can update answers" on public.answers;
create policy "Anonymous audit can update answers"
on public.answers
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists "Anonymous audit can update assessments" on public.assessments;
create policy "Anonymous audit can update assessments"
on public.assessments
for update
to anon, authenticated
using (true)
with check (true);

