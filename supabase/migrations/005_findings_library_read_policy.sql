-- findings_library SELECT policy for anonymous report rendering.
-- RLS is enabled on findings_library but the existing "FOR ALL, TO public"
-- policy has a null USING clause which does not permit reads via PostgREST.
-- This adds an explicit SELECT policy for anon and authenticated roles.

create policy "Public can read findings_library"
on public.findings_library
for select
to anon, authenticated
using (true);
