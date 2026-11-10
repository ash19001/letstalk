# Design: Let's Talk, Rochdale

Rewritten on 10 November 2026. The owner kept the hero and asked for everything below it to be redesigned by the designer's own judgement, setting aside the earlier Impeccable direction (one motif, five type steps, no lines, no illustration). This file records the shipped system. The hero's own rules still live in `.impeccable/surfaces/src-app-page-tsx.md`.

## The idea

The centre is a former shop at 74 Drake Street with an orange fascia where "Talk" sits in a white speech bubble. The hero is that sign's bubble, enormous, saying what's on today. Every section below it is built from a real thing in or around the shop, drawn flat in the sign's colours:

| Section | The thing | What it does |
|---|---|---|
| The week | the calendar on the wall | every session at its real time; today, now, and "on now" from the Rochdale clock |
| It's all free | a till receipt | every item £0.00, total £0.00; prints out of the till as you scroll |
| Find us | the street map | Drake Street drawn from OpenStreetMap, number 74 pinned, real walking times, four Rochdale photos |
| In their words | people talking | real words (members, partners' exact published quotes) in wide white bubbles; placeholder stories in narrow black ones, marked "Example" inside the bubble |
| Announcements | the noticeboard | the newest as a big orange bubble with a giant date, the rest as title-only rows with tear-off calendar dates |
| Bring what you can | a shopping list | tick boxes for rice, oil, flour, coats and time |
| Footer | the sign over the door | "Let's [Talk]" with the white bubble, as on Drake Street |

The page alternates grounds so each object sits on its own: white (hero), white (week), black (receipt), white (map), orange (stories), white (news), black (list), orange (sign), black (links). Two orange fields never touch: on /team the orange band of people's words is followed by a white gap before the sign.

The inner pages use the same pieces: a page intro (title, one-line lead, one action, one duotone picture in a bubble), then the team as speech bubbles on orange (/team: real people in wide white bubbles, at most one example profile in a narrow black one, then one line about the psychologist and psychiatrist), the news card and rows (/announcements), and an orange header bubble with the date and title on each post.

## Colour

| Token | Value | Use |
|---|---|---|
| `--field` | `#f2602f` | the sign's orange: the hero bubble, calendar blocks, story band, news card, sign, the word "free.", tick boxes, photo duotone |
| `--ink` | `#161412` | text, black bands, "on now" block, date blocks, buttons |
| `--bg` | `#ffffff` | page ground, white bubbles, map labels |
| `--paper` | `#fffdf8` | the receipt |
| `--surface` | `#f3f2f0` | picture placeholders |
| `--muted` | `#5c5651` | secondary text on white |
| `--line` | `#e6e1db` | hairlines on white: calendar hours, closed-day hatching, news rows, map facts |
| `--line-ink` | `#34302c` | hairlines on black |
| `--tint` | `#fff1e9` | today's column on the calendar |

Text on orange is ink, never white (white on `#f2602f` fails contrast for body text); the one exception is the hero's live line, which is large. No gradients anywhere; the only blend is the photo duotone.

Focus: a 3px ring, offset 3px, in `--focus`, which is orange by default and ink on orange surfaces (stories, the sign, the day strip, the news card, and the header while it sits on the hero's bubble from 768px, where the black Call button also turns white rather than orange on hover and focus). The sideways calendar is a keyboard stop only while it scrolls; its ring is drawn on the frame around it, above the sticky time column. Bubble buttons draw their bubble on a layer behind the label so the ring is never clipped, and focus swaps their colour exactly as hover does; the news card turns black on focus as on hover.

## Type

Roundo 400/500/600 (self-hosted) for everything. IBM Plex Mono 500/600 only on the receipt, because a receipt is printed in a monospace face. It is declared in `Free.tsx` without preloading (the receipt is below the fold), and `.receipt` reads `var(--font-plex-mono)` directly, since that variable exists only on the receipt's section.

| Token | Size | Use |
|---|---|---|
| `--step-display` | clamp(64px, 6.4vw, 96px); 11.5vw on phones | hero headline, page titles |
| `.free-title` | clamp(56px, 1.8rem + 7.4vw, 152px) | "It's all free." |
| `.sign-word` | clamp(64px, 15.5vw, 240px) | the footer sign |
| `--step-title` | clamp(42px, 1.6rem + 3.6vw, 78px) | section titles, 600, tracking -0.035em |
| `--step-head` | clamp(32px, 1.2rem + 2.6vw, 56px) | story quotes, the address, the shopping list (capped at 48px), news card title |
| `--step-lead` | clamp(22px, 0.9rem + 1.1vw, 30px) | section leads, long partner quotes |
| `--step-body` | clamp(17px, 1rem + 0.25vw, 19px) | running text |
| `--step-small` | 13 to 14px | calendar hours, labels, credits |

Calendar block titles are clamp(16px, 0.82rem + 0.42vw, 21px); their times and notes 15px.

## Layout

One pair of margins, `--inset` (clamp 16px, 8vw, 120px). Every section below the hero has `--pad` (clamp 72px, 9vw, 144px) above and below. Columns come from CSS grid per section rather than one global grid: 5/7 for "Find us", 7/5 for news, 6/5 for the shopping list, a 12-column staggered grid for the story bubbles.

The calendar is a grid of a time column plus seven days (open days `1fr`, closed days `0.42fr`, hatched), each hour `--hour` tall (6rem from 1024px, 7rem below). A session block covers its real time and grows rather than cut its words; a note shows only on sessions of 90 minutes or more. Below 1024px a strip of seven day buttons sits above the calendar (orange open, hatched closed, black today; tapping one scrolls to it), and the calendar scrolls sideways under a time column that reaches back to the screen edge. It opens at today, always stopping on a day boundary so no sliver of another day sits beside the times.

## Shapes

- The speech bubble from the sign (`.bubble`, tail bottom-right; `.bubble-l`, tail bottom-left; tail size from `--tail-w` / `--tail-h`) is still the house shape: the hero, calendar blocks (tail 16 by 12), the "Today" tab, the map pin, story bubbles (34 by 30), the news card (34 by 28), buttons and the sign's "Talk".
- Square corners everywhere.
- The receipt has a torn zigzag top edge (a CSS mask) and stands in a till slot.
- Story bubbles sit slightly askew (-1.2 to 1.4 degrees) and straighten on hover.

## Pictures

Four found, openly licensed photos of Rochdale (credits in `assets/credits.json` and in the footer of every page), shown in an orange-and-black duotone (grayscale under an orange multiply layer, with a per-picture `--lift` to brighten dark ones) that lifts to full colour on hover. Never presented as the centre or its people. The map is an SVG drawn from OpenStreetMap data (see `docs/map.md`); only the stretch of Drake Street people walk is orange, from the Interchange to where the tram turns off for the station, and the two halves of a split carriageway are drawn thinner so the street keeps one width. The street name sits on a patch of the street's own orange so the tram rails never cross it. Labels, walking times and the pin are HTML laid over it, placed beside their points so the pin never covers them.

## Motion

- Hero: unchanged load sequence (bubble wipe, headline lines rising).
- Receipt: a scroll-driven animation timed to the till slot (a named view timeline on the slot, shared through `timeline-scope`) raises the paper out of it, header first: it starts when the slot comes on screen and ends when the slot is a quarter of the way up (a tenth on screens under 880px tall, so the whole receipt is in view when it finishes; under 720px it simply stands printed). Static in browsers without scroll timelines and under reduced motion.
- Calendar: the "now" marker pulses three times when it appears; reduced motion stops it. The now line runs behind the session blocks, never through their words.
- Photos: grayscale to colour on hover, 500ms ease-out.
- Story bubbles: straighten on hover, 450ms ease-out.
- Buttons: press scales to 0.97; hover swaps colour, never opacity.
- Nothing fades in on scroll.

Curves: `--ease-out` cubic-bezier(0.23, 1, 0.32, 1), `--ease-in-out` cubic-bezier(0.77, 0, 0.175, 1), `--ease-expo` cubic-bezier(0.16, 1, 0.3, 1).

## Live parts

All read the clock in Rochdale (`nowInRochdale()` in `src/lib/rota.ts`, Europe/London) after the page loads, so the server render is the plain week:

- the hero's line (what's on now or next),
- the calendar's today column, "Now" marker and "On now" block (black, with the words "On now" and a small orange square),
- the receipt's printed date and time.

## Things this site does not do

Purple or blue gradients, gradient text, emoji in headings, Inter, coloured-border cards, glass, icon rows, badges above headlines, Lucide icons, stock shadcn, fade-in on scroll, cursor effects, buttons that fade on hover, em dashes in copy, buzzwords, serif italic accents. No invented photos, people, reviews or numbers: sample stories and posts say "Sample".
