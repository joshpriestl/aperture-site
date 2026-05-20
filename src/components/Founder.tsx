import Image from "next/image";
import Link from "next/link";

export function Founder() {
  return (
    <section id="the-founder" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-site">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-12">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[14px]">
            <Image
              src="/josh-priestley.jpeg"
              alt="Josh Priestley"
              fill
              className="object-cover object-top"
            />
          </div>
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
              THE FOUNDER
            </p>
            <h2 className="mt-6 font-display text-[clamp(30px,3.4vw,50px)] font-normal leading-[1.08] tracking-[-0.02em] text-ink">
              Josh Priestley
            </h2>
            <p className="mt-7 text-[16px] leading-7 text-ink-soft">
              Josh Priestley founded Aperture after a decade building operational systems for
              businesses where growth had outpaced structure. The four years immediately preceding
              Aperture were spent leading marketing, brand and sales operations for Azure Rich
              Group&apos;s resort developments across Thailand. 940 keys across two flagship sites.
              28 international markets. A lead generation engine that captured 28,000+ leads and
              supported more than $20M in Phase 1 international sales.
            </p>
            <p className="mt-5 text-[16px] leading-7 text-ink-soft">
              The systems behind those numbers were the work that mattered most. An integrated
              HubSpot, ClickUp and Slack ecosystem that coordinated a 20-person Bangkok office across
              global campaigns. CRM logic that lifted contact rates by 35 percent and booking rates
              by 25 percent. Reporting cadences that gave executives operational visibility for the
              first time. Aperture is that work productized. The methodology applies cleanly across
              scaling consultancies, advisory practices, agencies and hospitality operators. The Audit
              identifies where the operational drag is hiding. The Blueprint sequences the fix. The
              Build installs the systems.
            </p>
            <div className="mt-8 flex flex-col gap-2">
              <Link
                href="https://www.linkedin.com/in/joshpriestley/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted transition-colors duration-150 hover:text-ink"
              >
                linkedin.com/in/joshpriestley
              </Link>
              <Link
                href="mailto:jjppriestley@gmail.com"
                className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted transition-colors duration-150 hover:text-ink"
              >
                jjppriestley@gmail.com
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
