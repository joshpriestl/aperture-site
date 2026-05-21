import Link from "next/link";
import { navLinks } from "@/lib/content";

export function Nav() {
  return (
    <nav className="sticky top-4 z-20 px-5 pt-4 sm:px-8" aria-label="Main navigation">
      <div className="mx-auto flex max-w-site items-center justify-between gap-5 rounded-full bg-card px-4 py-3 shadow-pill ring-1 ring-hairline sm:px-5">
        <Link href="/" className="font-display text-[17px] font-medium tracking-[-0.01em] text-ink">
          Aperture.
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] leading-none text-ink-soft transition-colors duration-150 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>
        <Link
          href="/start"
          className="rounded-full bg-ink px-4 py-2 text-[13px] leading-none text-card transition-opacity duration-150 hover:opacity-85"
        >
          Take the Audit
        </Link>
      </div>
    </nav>
  );
}

