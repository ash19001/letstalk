import type { CSSProperties } from "react";
import { Backdrop } from "@/components/Backdrop";
import { BubbleButton } from "@/components/BubbleButton";
import { WhatsOn } from "@/components/WhatsOn";
import { DAY_NAMES, OPEN_DAYS, formatRange, place, sessions, weekInWords } from "@/lib/rota";
import { lowerFirst } from "@/lib/text";

const DAYS_IN_WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven"];

function WeekInShort({ className = "" }: { className?: string }) {
  return (
    <ul className={`text-body font-medium ${className}`}>
      {sessions.map((s) => (
        <li key={s.id}>
          {DAY_NAMES[s.day]}s: {lowerFirst(s.title)}, {formatRange(s)}
        </li>
      ))}
    </ul>
  );
}

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section className="hero enter isolate" aria-labelledby="hero-title">
      <Backdrop className="left-[-14vw] bottom-[-6vh] h-[38vh] w-[40vw] md:h-[44vh] md:w-[34vw]" opacity={0.1} />
      <div className="hero-bubble-wrap" aria-hidden="true">
        <div className="hero-bubble bubble-l" />
      </div>

      <div className="wrap">
        <div className="hero-copy">
          <h1 id="hero-title" className="lines text-display font-semibold">
            <span className="line">
              <span data-line style={{ "--i": 0 } as CSSProperties}>
                Come in.
              </span>
            </span>
            <span className="line">
              <span data-line style={{ "--i": 1 } as CSSProperties}>
                Let&rsquo;s talk.
              </span>
            </span>
          </h1>
          <p className="mt-8 max-w-[34ch] text-body" data-load style={d(420)}>
            A free wellbeing centre in a shop on Drake Street, Rochdale. No referral, nothing to pay.
          </p>
          <div className="mt-10" data-load style={d(500)}>
            <BubbleButton href="#week">When to come</BubbleButton>
          </div>
          <p className="mt-12 text-body" data-load style={d(580)}>
            {place.street}, {place.town} {place.postcode}
          </p>
        </div>
      </div>

      <div className="hero-say">
        <WhatsOn
          leadClassName="hero-live block font-semibold"
          detailClassName="mt-4 block text-lead font-medium"
          nowClassName="text-white"
          fallback={
            <p className="hero-live font-semibold">
              {DAYS_IN_WORDS[OPEN_DAYS.length] ?? OPEN_DAYS.length} days a week, every week.
              <span className="sr-only"> {weekInWords()}.</span>
            </p>
          }
        />
        <WeekInShort className="mt-8 hidden lg:block" />
      </div>
    </section>
  );
}
