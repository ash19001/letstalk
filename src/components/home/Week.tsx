"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import {
  CLOSED_DAYS,
  DAY_NAMES,
  DAY_SLUGS,
  WEEK_ORDER,
  formatRange,
  formatTime,
  nowInRochdale,
  place,
  sessions,
  sessionsOn,
  type Weekday,
} from "@/lib/rota";

const SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
// The calendar starts on the hour of the earliest start and ends on the hour of the latest finish
const START = Math.floor(Math.min(...sessions.map((s) => toMin(s.start))) / 60) * 60;
const END = Math.ceil(Math.max(...sessions.map((s) => toMin(s.end))) / 60) * 60;
const SPAN = END - START;
const HOURS = SPAN / 60;
const at = (minutes: number) => (minutes - START) / SPAN;
const hourLabel = (h: number) => formatTime(`${String(h).padStart(2, "0")}:00`);

/** A note only fits in a block of an hour and a half or more */
const NOTE_MIN = 90;

const colsFor = (open: string, closed: string) =>
  WEEK_ORDER.map((d) => (CLOSED_DAYS.includes(d) ? closed : open)).join(" ");
const COLS_FIXED = colsFor("var(--open-col)", "var(--closed-col)");
const COLS_FLUID = colsFor("minmax(0, 1fr)", "minmax(2.75rem, 0.42fr)");

/**
 * The week on the wall: each session drawn at its real time. Server and first
 * paint show the plain week; once the clock in Rochdale is known, today is
 * tinted, a line marks the time, and a session that is on turns black.
 * Below 1024px the week scrolls sideways under a fixed time column, with a
 * strip of days above it to jump straight to any day.
 */
export function Week() {
  const [now, setNow] = useState<{ day: Weekday; minutes: number } | null>(null);
  const [scrollable, setScrollable] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const autoScrolled = useRef(false);

  // The calendar is a keyboard stop (and a named region) only while it actually scrolls sideways
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const check = () => setScrollable(el.scrollWidth > el.clientWidth + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const tick = () => setNow(nowInRochdale());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  /**
   * Bring a day fully into view without leaving a sliver of another day beside the time column.
   * "start" puts the day right next to the times (a tapped day); "fit" uses the earliest day
   * boundary from which the whole day shows, so the day before stays in view for context (opening at today).
   */
  const showDay = useCallback((day: Weekday, smooth: boolean, mode: "start" | "fit") => {
    const el = scroller.current;
    if (!el || el.scrollWidth <= el.clientWidth + 1) return;
    const days = el.querySelector<HTMLElement>(".cal-days");
    const axis = el.querySelector<HTMLElement>(".cal-axis");
    const col = el.querySelector<HTMLElement>(`#${DAY_SLUGS[day]}`);
    if (!days || !axis || !col) return;
    const origin = days.getBoundingClientRect().left + el.scrollLeft;
    const starts = Array.from(days.children, (c) => c.getBoundingClientRect().left + el.scrollLeft - origin);
    const colStart = col.getBoundingClientRect().left + el.scrollLeft - origin;
    const colEnd = colStart + col.getBoundingClientRect().width;
    const visible = el.clientWidth - axis.getBoundingClientRect().width;
    const max = el.scrollWidth - el.clientWidth;
    // Stop on a day boundary, so no sliver of another day sits beside the times.
    const reachable = starts.filter((s) => s <= max + 0.5).sort((a, b) => a - b);
    const fits = (s: number) => s >= colEnd - visible - 4 && s <= colStart + 0.5;
    let target: number;
    if (mode === "start" && colStart <= max + 0.5) target = colStart;
    else {
      const boundary = reachable.find(fits);
      // no boundary shows the whole day (the end of the week on a tablet): use the furthest scroll if that does
      target = boundary ?? (max >= colEnd - visible - 4 ? max : (reachable[reachable.length - 1] ?? 0));
    }
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: target, behavior: smooth && !calm ? "smooth" : "instant" });
  }, []);

  // Open the sideways week at today, once, unless the visitor has already moved it
  const today = now?.day;
  useEffect(() => {
    if (today === undefined || autoScrolled.current) return;
    autoScrolled.current = true;
    if ((scroller.current?.scrollLeft ?? 0) > 0) return;
    showDay(today, false, "fit");
  }, [today, showDay]);

  const nowAt = now && now.minutes >= START && now.minutes < END ? at(now.minutes) : null;
  const showNow = nowAt !== null && today !== undefined && !CLOSED_DAYS.includes(today);
  const anyPlaceholder = sessions.some((s) => s.placeholderTime);

  return (
    <section id="week" className="wrap pad" aria-labelledby="week-title">
      <div className="week-head">
        <h2 id="week-title" className="title">
          The week
        </h2>
        <p className="text-lead">Just turn up. No need to book.</p>
      </div>

      <ul className="week-strip" aria-label="Go to a day">
        {WEEK_ORDER.map((day) => {
          const closed = CLOSED_DAYS.includes(day);
          return (
            <li key={day}>
              <button
                type="button"
                onClick={() => showDay(day, true, "start")}
                aria-controls="week-calendar"
                className={`week-strip-day press ${closed ? "is-closed" : ""} ${today === day ? "is-today" : ""}`}
              >
                <span aria-hidden="true">{SHORT[day]}</span>
                <span className="sr-only">
                  {DAY_NAMES[day]}
                  {closed ? ", closed" : ""}
                  {today === day ? ", today" : ""}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="cal-frame">
      <div
        ref={scroller}
        id="week-calendar"
        className="cal-scroll"
        role={scrollable ? "region" : undefined}
        aria-label={scrollable ? "The week, day by day" : undefined}
        tabIndex={scrollable ? 0 : undefined}
      >
        <div
          className="cal"
          style={{ "--hours": HOURS, "--cols-fixed": COLS_FIXED, "--cols-fluid": COLS_FLUID } as CSSProperties}
        >
          <div className="cal-axis" aria-hidden="true">
            <div />
            <div className="cal-axis-body">
              {Array.from({ length: HOURS + 1 }, (_, i) => START / 60 + i)
                // the Now label takes the place of an hour label it would cover
                .filter((h) => !showNow || Math.abs(h * 60 - (now?.minutes ?? 0)) > 18)
                .map((h) => (
                  <span key={h} className="cal-hour" style={{ "--at": at(h * 60) } as CSSProperties}>
                    {hourLabel(h)}
                  </span>
                ))}
              {showNow ? (
                <span className="cal-hour is-now" style={{ "--at": nowAt } as CSSProperties}>
                  Now
                </span>
              ) : null}
            </div>
          </div>

          <ol className="cal-days" role="list">
            {WEEK_ORDER.map((day) => {
              const closed = CLOSED_DAYS.includes(day);
              const isToday = today === day;
              return (
                <li
                  key={day}
                  id={DAY_SLUGS[day]}
                  className={`cal-day scroll-mt-24 ${closed ? "is-closed" : ""} ${isToday ? "is-today" : ""}`}
                  aria-current={isToday ? "date" : undefined}
                >
                  <h3 className="cal-dayname">
                    {closed ? (
                      <span>
                        <span aria-hidden="true">{SHORT[day]}</span>
                        <span className="sr-only">{DAY_NAMES[day]}</span>
                      </span>
                    ) : (
                      <span>{DAY_NAMES[day]}</span>
                    )}
                    {isToday ? <span className="cal-today bubble-l">Today</span> : null}
                  </h3>

                  <div className="cal-body">
                    {closed ? (
                      <p className="cal-closed">
                        <span>Closed</span>
                      </p>
                    ) : (
                      <ul className="cal-sessions" role="list">
                        {sessionsOn(day).map((s) => {
                          const from = toMin(s.start);
                          const to = toMin(s.end);
                          const on = isToday && now !== null && now.minutes >= from && now.minutes < to;
                          return (
                            <li
                              key={s.id}
                              className={`cal-block bubble-l ${on ? "is-on" : ""}`}
                              style={{ "--from": at(from), "--to": at(to) } as CSSProperties}
                            >
                              {on ? <p className="cal-block-on">On now</p> : null}
                              <p className="cal-block-title">{s.title}</p>
                              <p className="cal-block-time">{formatRange(s)}</p>
                              {s.note && to - from >= NOTE_MIN ? <p className="cal-block-note">{s.note}</p> : null}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    {isToday && showNow ? (
                      <div className="cal-now" style={{ "--at": nowAt } as CSSProperties} aria-hidden="true" />
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      </div>

      {anyPlaceholder ? (
        <p className="mt-6 text-body text-muted">
          Days and times are being confirmed. Call{" "}
          <a href={place.phoneHref} className="whitespace-nowrap underline">
            {place.phone}
          </a>{" "}
          to check.
        </p>
      ) : null}
    </section>
  );
}
