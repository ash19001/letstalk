import Link from "next/link";
import { BubbleButton } from "@/components/BubbleButton";
import { Credits } from "@/components/Credits";
import { openDaysText, place } from "@/lib/rota";

const links = [
  { href: "/", label: "Home" },
  { href: "/#week", label: "The week" },
  { href: "/#find-us", label: "Find us" },
  { href: "/team", label: "Team" },
  { href: "/announcements", label: "Announcements" },
];

/** The page ends where the visit starts: under the sign at 74 Drake Street. Every page carries the picture credits. */
export function SiteFooter() {
  return (
    <footer>
      <div className="sign">
        <div className="wrap">
          <p className="sign-word">
            <span>Let&rsquo;s</span>
            <span className="sign-bubble bubble">Talk</span>
          </p>
          <p className="sign-sub">Wellbeing Centre</p>
        </div>
      </div>

      <div className="bg-ink text-white">
        <div className="wrap pb-10 pt-[clamp(3.5rem,6vw,5.5rem)]">
          <div className="grid gap-10 md:grid-cols-12 md:gap-x-[var(--gutter)]">
            <nav aria-label="Footer" className="flex flex-col text-body md:col-span-4">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="link py-1.5 no-underline">
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="text-body md:col-span-4">
              <p>
                {place.street}
                <br />
                {place.town} <span className="whitespace-nowrap">{place.postcode}</span>
              </p>
              <p className="mt-4 flex flex-col items-start">
                <a href={place.phoneHref} className="link py-1.5 no-underline">
                  {place.phone}
                </a>
                <a href={place.facebook} className="link py-1.5 no-underline">
                  Facebook: Let&rsquo;s Talk &ndash; Find Your Voice
                </a>
              </p>
            </div>
            <div className="text-body md:col-span-4">
              <p>Open {openDaysText()}.</p>
              <p className="mt-4">
                Need to talk right now? Samaritans are free, any time:{" "}
                <a href="tel:116123" className="whitespace-nowrap underline">
                  116 123
                </a>
                .
              </p>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-6 border-t border-[var(--line-ink)] pt-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[80ch] text-body">
              <p>Funded by one Rochdale family since {place.founded}. Not a registered charity.</p>
              <p className="mt-3 text-small text-white/80">
                <Credits />
              </p>
            </div>
            <BubbleButton href={place.phoneHref} size="small" tone="white" className="shrink-0 self-start whitespace-nowrap md:self-auto">
              Call us
            </BubbleButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
