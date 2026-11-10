import type { Metadata } from "next";
import Image from "next/image";
import { Bubble } from "@/components/Bubble";
import { BubbleButton } from "@/components/BubbleButton";
import { PageIntro } from "@/components/PageIntro";
import { Prose } from "@/components/Prose";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getTeam } from "@/lib/content";
import { place } from "@/lib/rota";
import { lowerFirst } from "@/lib/text";

export const metadata: Metadata = {
  title: "Meet the team",
  description: "The people who open the door at Let's Talk, 74 Drake Street, Rochdale.",
};

/** The team as people talking: each person's own words in a bubble on the sign's orange. */
export default async function TeamPage() {
  const all = await getTeam();
  // Real people take the wide white bubbles; until more profiles arrive, one example shows how it will look
  const real = all.filter((m) => !m.sample);
  const examples = all.filter((m) => m.sample).slice(0, 1);
  const team: typeof all = [];
  while (real.length || examples.length) {
    const r = real.shift();
    if (r) team.push(r);
    const e = examples.shift();
    if (e) team.push(e);
  }
  return (
    <>
      <SiteHeader />
      {/* the white gap at the end keeps the orange band apart from the orange sign below */}
      <main id="main" className="pb-[var(--pad)]">
        <PageIntro
          title="Meet the team"
          lead="The people who open the door, make the tea and cook the Thursday lunch."
          action={<BubbleButton href={place.phoneHref}>Call {place.phone}</BubbleButton>}
          picture={{
            src: "/images/world/drake-street-in-rochdale-geograph-org-uk.jpg",
            alt: "Drake Street, Rochdale: tram lines down the middle, brick shops with shutters either side",
            position: "62% 60%",
            caption: "Drake Street, where you will find us. Photo: DS Pugh, CC BY-SA 2.0, recoloured.",
          }}
        />

        <section className="stories pad mt-[var(--pad)]" aria-label="The team, in their own words">
          <ul className="voices wrap">
            {team.map((m, i) => {
              const right = i % 2 === 1;
              return (
                <li key={m.slug} className={`voice ${right ? "tail-right" : ""}`}>
                  <figure>
                    {m.image ? (
                      <Bubble tailW={40} tailH={36} className="duo mb-6 aspect-[4/5] w-2/3">
                        <Image src={m.image} alt={m.name} fill sizes="(min-width: 900px) 30vw, 60vw" className="object-cover" />
                      </Bubble>
                    ) : null}
                    <blockquote
                      className={`voice-bubble ${right ? "bubble" : "bubble-l"} ${m.sample ? "is-example" : ""}`}
                    >
                      <Prose source={m.body} className="voice-quote is-long" />
                      {m.sample ? <p className="voice-flag">Example profile, to be replaced</p> : null}
                    </blockquote>
                    <figcaption>
                      <span className="font-semibold">{m.name}</span>, {lowerFirst(m.role)}
                      {m.note ? <span className="block text-small">{m.note}</span> : null}
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
          <div className="wrap mt-[clamp(3rem,6vw,5rem)]">
            <p className="max-w-[34ch] text-lead font-medium">
              On Wednesdays a psychologist and a psychiatrist join the men&rsquo;s club.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
