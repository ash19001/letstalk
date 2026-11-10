/**
 * The weekly rota. This is the product: when to come, and what happens.
 *
 * Times marked `placeholderTime: true` were not confirmed by the owner and
 * must be checked before launch. Thursday's time matches the centre's own
 * 2022 listing ("Every Thursday from 12.30 pm to 2 pm").
 */

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, like Date#getDay

export type Session = {
  id: string;
  day: Weekday;
  /** 24h "HH:MM" */
  start: string;
  end: string;
  title: string;
  /** who it is for, in plain words */
  who: string;
  /** one or two short lines for the rota */
  summary: string;
  /** what is included: short phrases */
  includes: string[];
  /** a short note shown in the accent ink, e.g. "Lunch served" */
  note?: string;
  placeholderTime: boolean;
};

export const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const DAY_SLUGS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export const sessions: Session[] = [
  {
    id: "womens-group",
    day: 1,
    start: "11:00",
    end: "13:00",
    title: "Women’s group",
    who: "Women of all ages",
    summary:
      "One hour to talk, one hour to learn: health, exercise, confidence. Thirty to forty women most weeks.",
    includes: [
      "Lunch is served",
      "Exercise, yoga and health talks",
      "In English, Urdu and Punjabi",
    ],
    note: "Lunch served",
    placeholderTime: true,
  },
  {
    id: "english-class",
    day: 3,
    start: "10:00",
    end: "12:00",
    title: "English class",
    who: "Anyone, any level",
    summary: "Beginners welcome. Practise everyday English with people who are learning too.",
    includes: ["Beginners welcome", "Tea and biscuits"],
    note: "Beginners welcome",
    placeholderTime: true,
  },
  {
    id: "mens-club",
    day: 3,
    start: "13:00",
    end: "15:00",
    title: "Men’s club",
    who: "Men of all ages",
    summary:
      "Refreshments, company, and a psychologist and a psychiatrist in the room to talk to about anything.",
    includes: [
      "Tea and refreshments",
      "A psychologist and a psychiatrist to talk to",
      "Talk, or just listen",
    ],
    note: "No need to speak",
    placeholderTime: true,
  },
  {
    id: "community-lunch",
    day: 4,
    start: "12:30",
    end: "14:00",
    title: "Community lunch",
    who: "Anyone in need",
    summary:
      "A warm meal, tea and coffee, then food and clothes to take home. Food packages made up for you and what you eat.",
    includes: [
      "A warm lunch, tea, coffee and biscuits",
      "Free food items and clothes",
      "Packages of oil, rice, flour and more",
    ],
    note: "Free, no referral",
    placeholderTime: false,
  },
  {
    id: "mens-meditation",
    day: 0,
    start: "10:00",
    end: "11:00",
    title: "Men’s meditation",
    who: "Men",
    summary: "A quiet hour on a Sunday morning. Sit, breathe, and start the week calm.",
    includes: ["Quiet, guided", "Come as you are"],
    placeholderTime: true,
  },
];

/** Monday first, as the week is shown */
export const WEEK_ORDER: Weekday[] = [1, 2, 3, 4, 5, 6, 0];
/** The days with at least one session, Monday first; every other day is drawn as closed */
export const OPEN_DAYS: Weekday[] = WEEK_ORDER.filter((d) => sessions.some((s) => s.day === d));
export const CLOSED_DAYS: Weekday[] = WEEK_ORDER.filter((d) => !OPEN_DAYS.includes(d));

/** "Monday, Wednesday, Thursday and Sunday" */
export function openDaysText(): string {
  const names = OPEN_DAYS.map((d) => DAY_NAMES[d]);
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}` : (names[0] ?? "");
}

export const place = {
  name: "Let's Talk",
  descriptor: "Wellbeing Centre",
  street: "74 Drake Street",
  town: "Rochdale",
  postcode: "OL16 1PQ",
  phone: "07930 606 926",
  phoneHref: "tel:+447930606926",
  whatsappHref: "https://wa.me/447930606926",
  facebook: "https://www.facebook.com/Letstalkfindyourvoice",
  mapsHref:
    "https://www.google.com/maps/dir/?api=1&destination=74+Drake+Street,+Rochdale+OL16+1PQ",
  founded: 2019,
};

/** "11:00" -> "11am", "12:30" -> "12.30pm", "13:00" -> "1pm" */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour}${suffix}` : `${hour}.${String(m).padStart(2, "0")}${suffix}`;
}

/** "11am till 1pm" */
export function formatRange(s: Pick<Session, "start" | "end">): string {
  return `${formatTime(s.start)} till ${formatTime(s.end)}`;
}

export function sessionsOn(day: Weekday): Session[] {
  return sessions.filter((s) => s.day === day).sort((a, b) => a.start.localeCompare(b.start));
}

export type WhatsOn =
  | { kind: "now"; session: Session; day: Weekday }
  | { kind: "later-today"; session: Session; day: Weekday }
  | { kind: "next"; session: Session; day: Weekday; daysAway: number };

/**
 * What the bubble says. Pure: give it the local time and it answers.
 * `daysAway` is 0 for today, 1 for tomorrow, and so on.
 */
export function whatsOn(now: { day: Weekday; minutes: number }): WhatsOn {
  const today = sessionsOn(now.day);
  for (const s of today) {
    const start = toMinutes(s.start);
    const end = toMinutes(s.end);
    if (now.minutes >= start && now.minutes < end) return { kind: "now", session: s, day: now.day };
    if (now.minutes < start) return { kind: "later-today", session: s, day: now.day };
  }
  for (let d = 1; d <= 7; d++) {
    const day = ((now.day + d) % 7) as Weekday;
    const list = sessionsOn(day);
    if (list.length) return { kind: "next", session: list[0], day, daysAway: d };
  }
  // unreachable while the rota has at least one session
  return { kind: "next", session: sessions[0], day: sessions[0].day, daysAway: 7 };
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** The local time in Rochdale, whatever clock the visitor's device keeps. */
export function nowInRochdale(date = new Date()): { day: Weekday; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const hour = Number(get("hour")) % 24;
  const minute = Number(get("minute"));
  return { day: (dayIndex < 0 ? 0 : dayIndex) as Weekday, minutes: hour * 60 + minute };
}

/** The sentence the bubble speaks. */
export function sayWhatsOn(w: WhatsOn): { lead: string; detail: string } {
  const dayName = DAY_NAMES[w.day];
  const range = formatRange(w.session);
  if (w.kind === "now") {
    return {
      lead: `It's ${dayName}. ${w.session.title} is on now.`,
      detail: `${range}. Come in.`,
    };
  }
  if (w.kind === "later-today") {
    return {
      lead: `It's ${dayName}. ${w.session.title} today.`,
      detail: `${range}. Come in.`,
    };
  }
  const when = w.daysAway === 1 ? "tomorrow" : `on ${dayName}`;
  return {
    lead: `Next: ${w.session.title}, ${when}.`,
    detail: `${range}. Come in.`,
  };
}
