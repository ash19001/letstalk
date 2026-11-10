import type { Metadata } from "next";
import { BubbleButton } from "@/components/BubbleButton";
import { NewsLead, NewsRow } from "@/components/home/News";
import { PageIntro } from "@/components/PageIntro";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getAnnouncements } from "@/lib/content";
import { place } from "@/lib/rota";

export const metadata: Metadata = {
  title: "Announcements",
  description: "What's happening at Let's Talk, Rochdale: this week's sessions, lunches, events and news.",
};

export default async function AnnouncementsPage() {
  const [lead, ...rest] = await getAnnouncements();
  return (
    <>
      <SiteHeader />
      <main id="main" className="pb-[var(--pad)]">
        <PageIntro
          title="Announcements"
          lead="What’s on, what changed, and what happened. Newest first."
          action={<BubbleButton href={place.facebook}>Follow on Facebook</BubbleButton>}
          picture={{
            src: "/images/world/rochdale-town-hall-and-gracie-fields-statue.jpg",
            alt: "The bronze statue of Gracie Fields singing, with Rochdale Town Hall's clock tower behind her",
            position: "55% 40%",
            caption: "Gracie Fields, Rochdale’s own, outside the Town Hall.",
            lift: 1.45,
          }}
        />

        {lead ? (
          <div className="news-grid wrap mt-[var(--pad)]">
            <NewsLead item={lead} headingLevel={2} />
            <ol className="news-list" role="list">
              {rest.map((a) => (
                <NewsRow key={a.slug} item={a} headingLevel={2} />
              ))}
            </ol>
          </div>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
