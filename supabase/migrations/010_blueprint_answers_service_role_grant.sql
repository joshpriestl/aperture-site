-- Re-assert service_role write access for Blueprint question saves.
--
-- The Blueprint question API uses the server-side service_role client to
-- upsert blueprint_answers after payment. Some deployed projects may have
-- the Blueprint tables without the grants from 008 applied.

grant select, insert, update, delete on public.blueprint_assessments to service_role;
grant select, insert, update, delete on public.blueprint_answers to service_role;
