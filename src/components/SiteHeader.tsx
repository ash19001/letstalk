import Link from "next/link";
import { BubbleButton } from "@/components/BubbleButton";
import { place } from "@/lib/rota";

const navLinks = [
  { href: "/#week", label: "The week" },
  { href: "/team", label: "Team" },
  { href: "/announcements", label: "Announcements" },
];

export function SiteHeader() {
  return (
    <header className="wrap relative z-20 flex h-[88px] items-center justify-between gap-4">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Link href="/" className="whitespace-nowrap text-[1.5rem] font-semibold tracking-[-0.02em] no-underline">
        Let&rsquo;s Talk
      </Link>

      <nav aria-label="Main" className="hidden items-center gap-6 text-body font-medium md:flex lg:gap-9">
        {navLinks.map((l) => (
          <Link key={l.href} href={l.href} className="link whitespace-nowrap no-underline">
            {l.label}
          </Link>
        ))}
        <BubbleButton href={place.phoneHref} size="small" className="whitespace-nowrap">
          <span className="lg:hidden">Call us</span>
          <span className="hidden lg:inline">Call {place.phone}</span>
        </BubbleButton>
      </nav>

      <div className="flex items-center gap-3 md:hidden">
        <BubbleButton href={place.phoneHref} size="small">
          Call
        </BubbleButton>
        <details className="menu">
          <summary className="press cursor-pointer list-none px-3 py-2 text-body font-semibold">Menu</summary>
          <div className="menu-sheet">
            <nav aria-label="Main" className="flex flex-col gap-6 text-[2rem] font-medium">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="no-underline">
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-10">
              <BubbleButton href={place.phoneHref}>Call {place.phone}</BubbleButton>
            </div>
            <p className="mt-10 text-body">
              {place.street}, {place.town} {place.postcode}
            </p>
          </div>
        </details>
      </div>
    </header>
  );
}
