import Link from "next/link";
import { DateBlock } from "@/components/DateBlock";
import { type Announcement, formatDate } from "@/lib/content";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-11-03" -> { day: "3 Nov", year: "2026" } */
function bigDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { day: `${d} ${MONTHS[(m || 1) - 1]}`, year: String(y) };
}

/** The newest announcement pinned up large in orange, the next ones as rows with torn-off dates. */
export function NewsLead({ item, headingLevel = 3 }: { item: Announcement; headingLevel?: 2 | 3 }) {
  const date = bigDate(item.date);
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="news-lead bubble">
      <p className="news-lead-date">
        {date.day} <span>{date.year}</span>
      </p>
      <Heading>
        <Link href={`/announcements/${item.slug}`} className="no-underline">
          <span className="sr-only">{formatDate(item.date)}: </span>
          {item.title}
        </Link>
      </Heading>
      {item.sample ? <p className="news-flag">Example post, to be replaced</p> : null}
    </article>
  );
}

export function NewsRow({ item, headingLevel = 3 }: { item: Announcement; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <li className="news-row">
      <DateBlock iso={item.date} />
      <div>
        <Heading>
          <Link href={`/announcements/${item.slug}`} className="no-underline">
            <span className="sr-only">{formatDate(item.date)}: </span>
            {item.title}
          </Link>
        </Heading>
        {item.sample ? <p className="news-flag">Example post</p> : null}
      </div>
    </li>
  );
}

export function News({ items }: { items: Announcement[] }) {
  const [lead, ...rest] = items;
  if (!lead) return null;
  return (
    <section className="wrap pad" aria-labelledby="news-title">
      <div className="news-head">
        <h2 id="news-title" className="title">
          Announcements
        </h2>
        <Link href="/announcements" className="text-body font-semibold underline">
          All announcements
        </Link>
      </div>

      <div className="news-grid">
        <NewsLead item={lead} />
        <ol className="news-list" role="list">
          {rest.map((a) => (
            <NewsRow key={a.slug} item={a} />
          ))}
        </ol>
      </div>
    </section>
  );
}
