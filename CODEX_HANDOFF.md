# CODEX_HANDOFF — Session 5 → Session 6

**Created:** 21 May 2026
**Purpose:** Briefing for Codex (AI coding assistant) taking over from Claude after Session 5. Claude will audit Codex's Session 6 output before Session 7.

---

## What happened in Session 5

Session 5 was a Claude audit-and-fix session. Codex built the Blueprint checkout flow in Session 4 (Stripe checkout, webhook, success page). The flow had several infrastructure failures that prevented end-to-end checkout from working. All are now resolved.

### Bugs fixed (do not re-introduce)

**1. Stripe success URL template substitution**
`URLSearchParams.set()` was URL-encoding `{CHECKOUT_SESSION_ID}` to `%7BCHECKOUT_SESSION_ID%7D`. Stripe requires the literal braces to perform its own substitution.
Fixed in `src/lib/stripe.ts` — success URL is now built via string concatenation, not `.searchParams.set()`. Commit `f572b3d`.

**2. Supabase env vars were wrong in Vercel**
- `SUPABASE_SERVICE_ROLE_KEY` was set to the anon key (both look like long JWTs, easy to confuse)
- `NEXT_PUBLIC_SUPABASE_URL` had `/rest/v1/` appended — the JS client adds that internally, doubling the path
- All three Supabase keys were from a different project ref than the URL
Correct values now match project ref `wytzfynnftjurlamykmx`.

**3. Migrations had never been applied to the production Supabase project**
The `practice_areas`, `questions`, `answers`, `assessment_scores`, `findings_library`, and all `blueprint_*` tables did not exist in production. Resolved by running `COMBINED_SETUP.sql` in the Supabase SQL Editor.

**4. service_role lacked SELECT on `assessments`**
The Stripe webhook reads the assessment row via the admin client before upserting into `blueprint_assessments`. Without SELECT the lookup returned empty data and the webhook returned 404. Fixed by migration 009.

---

## State of the codebase as of Session 5 end

**Repo:** `github.com/joshpriestl/aperture-site`
**Branch:** `main` (commit `ab0063c`)
**Deployment:** Vercel, auto-deploys on push to main
**Dev server:** `npm run dev -- -p 3001` (port 3001 — selborne-king site uses 3000)

### What is live and working

- `/start` — Audit landing page
- `/start/details` — Lead capture form (7 fields → organisations + people + assessments rows)
- `/start/questions` — Full 40-question audit flow (10 practice areas × 4 questions)
- `/start/report/[id]` — Full report page (Aperture Score, COI panel, heat map, Priority Levers, Blueprint CTA)
- `/blueprint/checkout` — Creates Stripe Checkout session, redirects to Stripe
- `/api/stripe/webhook` — Receives `checkout.session.completed`, upserts `blueprint_assessments`
- `/blueprint/success` — Shows "Payment confirmed." with Cal.com booking button placeholder
- `/api/audit/preflight` — Health check endpoint (all critical checks currently green)

### What is NOT yet built / wired

- **Cal.com booking URL** — success page has a "Book review call" button but `NEXT_PUBLIC_CALCOM_BLUEPRINT_URL` env var is not set. Button currently has no real URL.
- **Blueprint question flow** — post-payment deeper question flow for the 3 priority areas (mentioned on success page but not built)
- **Google Sheets CRM sync** — `GOOGLE_SHEETS_WEBHOOK_URL` env var is missing. `GOOGLE_SHEETS_WEBHOOK.gs` script is in the repo root but not yet deployed to Apps Script or connected.
- **Stripe live mode** — currently test mode. Do not switch until explicitly instructed.
- **selborneking.com `/aperture` route** — still pending from Session 4 priorities

---

## Supabase project

**Ref:** `wytzfynnftjurlamykmx`
**URL:** `https://wytzfynnftjurlamykmx.supabase.co`

### Environment variables (in .env.local and Vercel)

- `NEXT_PUBLIC_SUPABASE_URL` = `https://wytzfynnftjurlamykmx.supabase.co` (no trailing slash, no path)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = the anon/publishable key for this project
- `SUPABASE_SERVICE_ROLE_KEY` = the service_role key for this project — JWT middle segment decodes to `{"ref":"wytzfynnftjurlamykmx","role":"service_role",...}`

### Critical: verifying key alignment

If the webhook starts returning 404 "Assessment could not be found" again, check:
1. Decode the middle segment of `SUPABASE_SERVICE_ROLE_KEY` (base64) — `ref` must be `wytzfynnftjurlamykmx` and `role` must be `service_role`
2. `NEXT_PUBLIC_SUPABASE_URL` must be exactly `https://wytzfynnftjurlamykmx.supabase.co` — no `/rest/v1/` suffix

### Critical RLS pattern

Every table needs BOTH:
1. `GRANT SELECT ON table TO anon, authenticated`
2. An explicit `FOR SELECT TO anon, authenticated USING (true)` RLS policy

A `FOR ALL TO public` policy with no USING clause does NOT permit reads via PostgREST. This burned us on `assessment_scores` (Session 2), `findings_library` (Session 3), and was a factor in Session 5 debugging.

### Tables and key columns

- `organisations` → `revenue_band`, `headcount_band` (string bands, NOT numeric)
- `assessments` → `gross_margin_band`, `cac_band`, `ltv_band`, `completed_at`, `organisation_id`, `person_id`
- `assessment_scores` → `practice_area_id`, `score` (0–100), `gap_band` (critical/vulnerable/capable/strong)
- `findings_library` → `practice_area_id`, `trigger_question_id` (nullable), `trigger_condition`, `gap_band` (nullable), `severity`, `finding_text`
- `blueprint_assessments` → `assessment_id`, `organisation_id`, `person_id`, `paid`, `paid_at`, `stripe_checkout_session_id`, `stripe_payment_id`, `questions_complete`, `calcom_booking_id`
- `blueprint_answers` → `blueprint_assessment_id`, `practice_area_id`, `question_key`, `question_label`, `answer_value` (jsonb)
- `blueprint_documents` → `blueprint_assessment_id`, `draft_content`, `approved_content`, `status` (draft/queued/approved/delivered/error)

### Migration files applied (in order, all on `wytzfynnftjurlamykmx`)

1. `001_audit_schema.sql` — schema + RLS + grants
2. `001b_grants.sql` — additional grants
3. `001c_audit_write_policies.sql` — write policies for audit flow
4. `002b_scoring_function_fix.sql` — scoring function (002 skipped, superseded)
5. `002c_assessment_scores_read_policy.sql` — SELECT policy for assessment_scores
6. `003_seed_questions_v2.sql` — 40 questions seeded
7. `004_seed_findings_library.sql` — 140 findings seeded
8. `005_findings_library_read_policy.sql` — SELECT policy for findings_library
9. `006_blueprint_checkout_schema.sql` — blueprint_assessments table
10. `007_blueprint_document_schema.sql` — blueprint_answers, blueprint_documents, document_review_queue, engagement_corpus
11. `008_service_role_grants.sql` — SELECT/INSERT/UPDATE/DELETE on blueprint tables to service_role
12. `009_service_role_assessments_read.sql` — SELECT on assessments to service_role

`COMBINED_SETUP.sql` in the migrations folder runs all of the above in a single paste — use this to set up any new Supabase project from scratch.

---

## Key technical decisions Codex must not override

### Supabase client

- `src/lib/supabase.ts` — anon client via `createClient()`. Used for all public-facing reads.
- `src/lib/supabase-admin.ts` — service_role admin client. Used only in server-side route handlers (webhook, preflight). Never expose to client.
- Do NOT switch to `@supabase/ssr` or cookie-based auth. The audit is fully anonymous.

### Stripe success URL

In `src/lib/stripe.ts`, the success URL is built via string concatenation:
```ts
const successUrl =
  new URL("/blueprint/success", baseUrl).toString() +
  "?session_id={CHECKOUT_SESSION_ID}";
```
Do NOT change this to `successUrl.searchParams.set("session_id", "{CHECKOUT_SESSION_ID}")`. URLSearchParams URL-encodes the braces and Stripe cannot substitute the session ID.

### Findings query

`.in("practice_area_id", ids)` silently returns 0 rows for the anon client (PostgREST edge case). The report page fetches ALL findings and filters in TypeScript. Do NOT revert this to a filtered Supabase query.

### Scoring function

`compute_assessment_scores(p_assessment_id uuid)` filters questions by `question_version = 2`. New questions must use version 2. Do not change the return type (integer) — migration 002b dropped and replaced the original void-returning function.

### Financial question bands

Q47 (gross margin), Q48 (CAC), Q49 (LTV) bands are stored as specific strings. The COI formula in `src/app/start/report/[id]/page.tsx` is keyed to these exact strings. Do not change them.

---

## Tone and style rules

- Operator voice. Direct, specific, no jargon.
- No em dashes. No comma before "and" in lists.
- No emoji anywhere in the audit or blueprint flows.
- Numbers in abbreviated financial notation ($X.XM, $XXK).
- No hype, no AI-bro language.
- Applies to: findings text, report copy, success page copy, any email templates.

---

## Design system

The audit zone (`/start/*`) and blueprint zone (`/blueprint/*`) use a neumorphic design language:

- Background: `#ECF0F3` → CSS var `--base` → Tailwind `bg-base`
- Text: `#14181c` → `text-ink`, `#4a5560` → `text-ink-soft`, `#8896a3` → `text-ink-muted`
- Dividers: `#d4dbe0` → `border-hairline`
- Raised panels: `shadow-[8px_8px_20px_#c4c9cc,-8px_-8px_20px_#ffffff]`
- Inset elements: `shadow-[inset_4px_4px_10px_#c4c9cc,inset_-4px_-4px_10px_#ffffff]`
- Fonts: `font-display` (Fraunces serif), `font-sans` (Geist), `font-mono` (Geist Mono)
- No colour scale on heat map bars. Pure black fill on light grey.
- No icons in the audit zone except a small back-arrow on the question flow.

---

## Where specs live (Notion)

- **AUDIT_SPEC** — `https://www.notion.so/3653a30e6ef78054a0c3cf82745dab96` — authoritative spec for the Audit product
- **COST_OF_INACTION** — `https://www.notion.so/3653a30e6ef780edbe4ee65ec55ff623` — COI formula spec
- **DECISIONS** — APERTURE OS > Product > DECISIONS — all non-obvious choices logged here
- **Findings Library** — APERTURE OS > Product > AUDIT_SPEC > Findings Library — all 140 findings
- **DATABASE** — APERTURE OS > Build > DATABASE — schema reference
- **API_FLOW** — APERTURE OS > Build > API_FLOW — route handler documentation

---

## Session 6 priorities (in order)

1. **Cal.com wiring** — Add `NEXT_PUBLIC_CALCOM_BLUEPRINT_URL` to Vercel env vars (the Cal.com booking page URL). Update the success page button to use it. Confirm the button works after redeploy.

2. **Blueprint question flow** — The success page currently says "The next step is the deeper question flow for the three areas your Audit surfaced as priorities." Build this. It is the post-payment questionnaire that collects deeper context for the 3 lowest-scoring practice areas. Answers go into `blueprint_answers`. When complete, set `blueprint_assessments.questions_complete = true`.

3. **Google Sheets CRM sync** — Three env vars needed in Vercel: `GOOGLE_SHEETS_WEBHOOK_URL`, `GOOGLE_SHEETS_WEBHOOK_SECRET`, `ADMIN_ACCESS_TOKEN`. The Apps Script file is at `GOOGLE_SHEETS_WEBHOOK.gs` in the repo root — update the placeholder secret and deploy to Google Apps Script before wiring. The `/api/sheets/sync` route handler already exists.

4. **selborneking.com `/aperture` route** — A Next.js route at `/aperture` on the selborne-king site that renders a landing page for the Audit with a "Begin the Audit" CTA pointing to the aperture-site `/start` URL.

5. **Stripe live mode** — When instructed: swap `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET` to live mode equivalents in Vercel. Re-register the webhook endpoint in Stripe live mode dashboard. Do NOT do this without explicit instruction.

**Do not build:** Email delivery via Resend. HubSpot API. Any auth layer on the audit flow.

---

## What Claude will audit in the next session

- Preflight endpoint still green after any env var changes
- Blueprint question flow correctly writes to `blueprint_answers` and sets `questions_complete`
- Cal.com button resolves to a real URL on the success page
- Google Sheets receiving rows after a test audit + checkout
- RLS correctness on any new tables added
- Tone guide compliance in any new copy
- Git diff to catch unintended changes to audit flow, scoring, or report page
