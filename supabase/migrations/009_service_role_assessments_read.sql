-- Grant SELECT on assessments to service_role.
--
-- The Stripe webhook handler (api/stripe/webhook) uses the service_role
-- admin client to look up the assessment row before upserting into
-- blueprint_assessments.  Without this grant the lookup returns no data
-- and the webhook returns 404 "Assessment could not be found".

grant select on public.assessments to service_role;
