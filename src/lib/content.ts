import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Announcement = {
  slug: string;
  title: string;
  /** ISO date, e.g. 2026-11-05 */
  date: string;
  summary: string;
  /** optional picture under /public, e.g. /photos/announcements/lunch.jpg */
  image?: string;
  imageAlt?: string;
  /** true for sample posts written during the build; delete or replace them */
  sample?: boolean;
  body: string;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  /** optional context for their words, shown under the bubble (e.g. when and where they said it) */
  note?: string;
  /** optional picture under /public */
  image?: string;
  /** lower comes first */
  order: number;
  sample?: boolean;
  /** their own words, in Markdown */
  body: string;
};

export type Story = {
  slug: string;
  /** a first name or how they want to be known */
  name: string;
  /** which session they came to */
  session: string;
  /** the one line that is quoted large */
  quote: string;
  image?: string;
  imageAlt?: string;
  sample?: boolean;
  body: string;
};

/** gray-matter turns an unquoted YAML date into a Date; keep ISO yyyy-mm-dd either way */
function isoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "").slice(0, 10);
}

async function readDir(kind: string): Promise<{ slug: string; data: Record<string, unknown>; body: string }[]> {
  const dir = path.join(CONTENT_DIR, kind);
  let names: string[] = [];
  try {
    names = await fs.readdir(dir);
  } catch {
    return [];
  }
  const files = names.filter((n) => n.endsWith(".mdx") || n.endsWith(".md"));
  const out = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.mdx?$/, ""), data, body: content.trim() };
    }),
  );
  return out;
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const items = await readDir("announcements");
  return items
    .map(({ slug, data, body }) => ({
      slug,
      title: String(data.title ?? slug),
      date: isoDate(data.date),
      summary: String(data.summary ?? ""),
      image: data.image ? String(data.image) : undefined,
      imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
      sample: Boolean(data.sample),
      body,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getAnnouncement(slug: string): Promise<Announcement | undefined> {
  const all = await getAnnouncements();
  return all.find((a) => a.slug === slug);
}

export async function getTeam(): Promise<TeamMember[]> {
  const items = await readDir("team");
  return items
    .map(({ slug, data, body }) => ({
      slug,
      name: String(data.name ?? slug),
      role: String(data.role ?? ""),
      note: data.note ? String(data.note) : undefined,
      image: data.image ? String(data.image) : undefined,
      order: Number(data.order ?? 99),
      sample: Boolean(data.sample),
      body,
    }))
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

export async function getStories(): Promise<Story[]> {
  const items = await readDir("stories");
  return items.map(({ slug, data, body }) => ({
    slug,
    name: String(data.name ?? slug),
    session: String(data.session ?? ""),
    quote: String(data.quote ?? ""),
    image: data.image ? String(data.image) : undefined,
    imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
    sample: Boolean(data.sample),
    body,
  }));
}

/** "2026-11-05" -> "5 November 2026" */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}
