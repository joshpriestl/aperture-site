import { footerItems } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-hairline px-5 py-8 sm:px-8">
      <div className="mx-auto grid max-w-site gap-4 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink-muted sm:grid-cols-3">
        {footerItems.map((item, index) => (
          <p key={item} className={index === 1 ? "sm:text-center" : index === 2 ? "sm:text-right" : ""}>
            {item}
          </p>
        ))}
      </div>
    </footer>
  );
}
