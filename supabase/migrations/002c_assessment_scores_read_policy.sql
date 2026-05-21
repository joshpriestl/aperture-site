-- assessment_scores SELECT policy for anonymous audit flow.
-- RLS is enabled on assessment_scores but had no read policy, so anon role
-- could not count rows after the scoring function ran. This caused the
-- post-scoring count check in the frontend to return 0 and show a false
-- "retry submit" error even when scoring succeeded.

create policy "Anonymous audit can read assessment_scores"
on public.assessment_scores
for select
to anon, authenticated
using (true);
