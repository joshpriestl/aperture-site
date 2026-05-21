# Audit Migration Notes

## Current Preview State

The Audit routes are present:

- `/start`
- `/start/details`
- `/start/questions?assessment_id={id}`
- `/start/report/{id}`

Marketing Audit links now point to `/start`. The old `/audit` route redirects to `/start`.

## Required Vercel Environment Variables

The linked Vercel project currently has no Supabase variables configured.

Add these to preview and production before running a real Audit:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Optional scoring override variables:

```text
NEXT_PUBLIC_SUPABASE_SCORING_RPC
NEXT_PUBLIC_SUPABASE_SCORING_EDGE_FUNCTION
```

Use one scoring override once the existing Supabase scoring function name is confirmed.

## Verification Blockers

Session 2 cannot be marked acceptance-clean until:

1. Supabase env vars are added to Vercel.
2. The existing scoring function name and signature are confirmed.
3. Q47 to Q49 financial labels, guidance text and stored values are replaced with the exact Lovable contract.
4. A real assessment is walked end to end and confirms 10 rows in `assessment_scores`.

