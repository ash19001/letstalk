import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bubble } from "@/components/Bubble";
import { Prose } from "@/components/Prose";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { formatDate, getAnnouncement, getAnnouncements } from "@/lib/content";

export async function generateStaticParams() {
  const items = await getAnnouncements();
  return items.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/announcements/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = await getAnnouncement(slug);
  if (!a) return {};
  // an example post says so wherever it can be seen, including search results and link previews
  return a.sample
    ? { title: `Example post: ${a.title}`, description: `Example post, not real. ${a.summary}`, robots: { index: false } }
    : { title: a.title, description: a.summary };
}

export default async function AnnouncementPage({ params }: PageProps<"/announcements/[slug]">) {
  const { slug } = await params;
  const a = await getAnnouncement(slug);
  if (!a) notFound();

  return (
    <>
      <SiteHeader />
      <main id="main" className="wrap pb-[var(--pad)] pt-[clamp(2rem,5vw,4rem)]">
        <article className="grid gap-10 md:grid-cols-12 md:gap-x-[var(--gutter)]">
          <div className="md:col-span-8">
            <header className="news-lead bubble">
              <p className="news-lead-date">{formatDate(a.date)}</p>
              <h1>{a.title}</h1>
              {a.sample ? <p className="news-flag">Example post, to be replaced</p> : null}
            </header>
            {a.image ? (
              <Bubble tailW={40} tailH={36} className="relative mt-10 aspect-[16/10] overflow-clip bg-surface">
                <Image src={a.image} alt={a.imageAlt ?? ""} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" preload />
              </Bubble>
            ) : null}
            <Prose source={a.body} className="mt-10 text-lead" />
            <p className="mt-14">
              <Link href="/announcements" className="text-body font-semibold underline">
                All announcements
              </Link>
            </p>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
