import type { Story } from "@/lib/content";
import { partnerQuotes } from "@/lib/quotes";
import { lowerFirst } from "@/lib/text";

/** "I came for the class. I stayed for the people." is two breaths: one line each. */
function breaths(quote: string): string[] {
  const parts = quote.split(/(?<=[.!?])\s+/).filter(Boolean);
  return parts.length === 2 || parts.length === 3 ? parts : [quote];
}

type Voice = {
  key: string;
  lines: string[];
  by: string;
  source?: string;
  example: boolean;
};

/**
 * In their words: people talking, as speech bubbles on the sign's orange.
 * Real words (members' stories and partners' published quotes) take the wide white
 * bubbles; placeholder stories, flagged `sample: true`, take the narrow black ones
 * and say so inside the bubble until real stories replace them.
 */
export function Stories({ stories }: { stories: Story[] }) {
  const members: Voice[] = stories.map((s) => ({
    key: s.slug,
    lines: breaths(s.quote),
    by: s.sample ? s.session : `${s.name}, ${lowerFirst(s.session)}`,
    example: Boolean(s.sample),
  }));
  const partners: Voice[] = partnerQuotes.map((q) => ({
    key: q.short,
    lines: [q.quote],
    by: q.short,
    source: q.source,
    example: false,
  }));
  const real = [...members.filter((v) => !v.example), ...partners];
  const examples = members.filter((v) => v.example);
  // alternate wide (real) and narrow (example) bubbles
  const voices: Voice[] = [];
  while (real.length || examples.length) {
    const r = real.shift();
    if (r) voices.push(r);
    const e = examples.shift();
    if (e) voices.push(e);
  }

  return (
    <section className="stories pad" aria-labelledby="stories-title">
      <div className="wrap">
        <h2 id="stories-title" className="title">
          In their words
        </h2>
        <ul className="voices">
          {voices.map((v, i) => {
            const right = i % 2 === 1;
            const long = v.lines.join(" ").length > 60;
            return (
              <li key={v.key} className={`voice ${right ? "tail-right" : ""}`}>
                <figure>
                  <blockquote
                    cite={v.source}
                    className={`voice-bubble ${right ? "bubble" : "bubble-l"} ${v.example ? "is-example" : ""}`}
                  >
                    <div className={`voice-quote ${long ? "is-long" : ""}`}>
                      {v.lines.map((line, j) => (
                        <p key={j}>{line}</p>
                      ))}
                    </div>
                    {v.example ? <p className="voice-flag">Example story, to be replaced with a real one</p> : null}
                  </blockquote>
                  <figcaption>
                    {v.by}
                    {v.source ? (
                      <>
                        {". "}
                        <a href={v.source} className="voice-source">
                          Source<span className="sr-only">: the quote on {new URL(v.source).hostname.replace(/^www\./, "")}</span>
                        </a>
                      </>
                    ) : null}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
