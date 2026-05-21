type Props = {
  searchParams: {
    token?: string;
  };
};

export default function AdminSyncPage({ searchParams }: Props) {
  const adminToken = process.env.ADMIN_ACCESS_TOKEN;
  const isAllowed = Boolean(adminToken && searchParams.token === adminToken);

  if (!isAllowed) {
    return (
      <main className="min-h-screen bg-base px-5 py-16 text-ink sm:px-8">
        <section className="mx-auto flex min-h-[72vh] max-w-[720px] flex-col justify-center">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
            APERTURE ADMIN
          </p>
          <h1 className="mt-7 font-display text-[clamp(40px,7vw,72px)] font-normal leading-[1.04]">
            Admin access is restricted.
          </h1>
          <p className="mt-6 max-w-[560px] text-[16px] leading-8 text-ink-soft">
            Add a valid admin token to the URL to retry Google Sheets syncs.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base px-5 py-16 text-ink sm:px-8">
      <section className="mx-auto flex min-h-[72vh] max-w-[720px] flex-col justify-center">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
          APERTURE ADMIN
        </p>
        <h1 className="mt-7 font-display text-[clamp(40px,7vw,72px)] font-normal leading-[1.04]">
          Retry a Sheets sync.
        </h1>
        <p className="mt-6 max-w-[560px] text-[16px] leading-8 text-ink-soft">
          Use this when an Audit completion needs to be pushed to the interim Google Sheet again. Paste the assessment ID from Supabase or the report URL.
        </p>
        <form
          action="/api/sheets/sync"
          className="mt-10 rounded-[24px] bg-base px-6 py-6 shadow-[8px_8px_20px_#c4c9cc,-8px_-8px_20px_#ffffff] sm:px-8"
          method="post"
        >
          <input name="admin_token" type="hidden" value={adminToken} />
          <label className="grid gap-2 text-[13px] font-medium text-ink-soft">
            Assessment ID
            <input
              className="min-h-[52px] rounded-[18px] border-0 bg-base px-4 text-[15px] text-ink shadow-[inset_6px_6px_12px_#cbd0d3,inset_-6px_-6px_12px_#ffffff] outline-none"
              name="assessment_id"
              required
              type="text"
            />
          </label>
          <button
            className="mt-6 rounded-full bg-ink px-7 py-3.5 text-[14px] font-medium text-card transition-opacity hover:opacity-80"
            type="submit"
          >
            Sync to Sheet
          </button>
        </form>
      </section>
    </main>
  );
}
