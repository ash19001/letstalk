# Let's Talk, Rochdale — website

The site for Let's Talk, a family-funded wellbeing centre at 74 Drake Street, Rochdale. Next.js 16, TypeScript, Tailwind CSS v4. Frontend only: there is no database, and all content lives in this repo as files.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Change the content

Everything the centre will want to change is in `content/` and `src/lib/rota.ts`. Add or edit a file, commit, redeploy.

### The weekly rota

`src/lib/rota.ts` holds the sessions: day, start and end time (24h `"HH:MM"`), title and an optional short note (shown in the calendar on sessions of an hour and a half or more). `who`, `summary` and `includes` are kept for a future page about each session; the home page does not show them yet. The home page draws the week calendar from it (each session as a block at its real time; the calendar starts on the hour of the earliest start and ends on the hour of the latest finish), the hero bubble works out "what's on now / next", and the calendar marks today, the time now and any session that is on, all using the clock in Rochdale. A day with no sessions is drawn as closed, and the open days listed in the footer follow from the sessions too.

Sessions marked `placeholderTime: true` show a line under the calendar saying days and times are being confirmed. Set it to `false` once a time is confirmed.

### What's free

The till receipt in "It's all free" lists what people can have. Edit the `items` list in `src/components/home/Free.tsx` if that changes.

### Announcements

One Markdown file per post in `content/announcements/`, named `yyyy-mm-dd-short-title.mdx`:

```md
---
title: Christmas lunch on Thursday 18 December
date: 2026-12-18
summary: One or two sentences shown in the list and on the home page.
image: /photos/announcements/christmas-2026.jpg   # optional
imageAlt: What the picture shows                   # with image
---

The post itself, in plain Markdown. Short paragraphs.
```

Newest date first, everywhere. The newest post is shown large on the home page and at the top of the announcements page. The two files with `sample: true` are marked "Example post" on the page and kept out of search engines; delete them once real posts exist, and publish a real, current post before launch. Put pictures in `public/photos/announcements/`.

### Team

One file per person in `content/team/`:

```md
---
name: First Last
role: What they do here
note: Where or when they said it   # optional, shown under their words
image: /photos/team/first-last.jpg   # optional, 4:5 portrait works best
order: 2                              # lower comes first
---

Their own words, one or two short sentences: what they do and what they want for the people who come in.
```

Each person's words show in a speech bubble on the team page, with their name and role beneath and their photo above if there is one. Put photos in `public/photos/team/`. Only ever publish words the person wrote or approved. The three `sample-*.mdx` files are marked "Example profile"; delete them once real people are in.

### Success stories

`content/stories/*.mdx` with `name`, `session`, `quote` and a short body. The quote is shown large in a white speech bubble on the home page ("In their words"), each sentence on its own line; keep it short, one or two sentences. Quotes over about 60 characters are set smaller automatically. The two `sample-*.mdx` files are placeholders; replace them with real stories (first name or how the person wants to be known, with their consent). The two partner quotes in the same section come from `src/lib/quotes.ts`, each with its source.

### Contact details

`place` in `src/lib/rota.ts`: address, phone, WhatsApp link, Facebook page, directions link.

## Pictures of Rochdale

`public/images/world/` holds found, openly licensed pictures of Drake Street, the station, Toad Lane and the Town Hall. They are shown in an orange-and-black duotone (and in colour on hover) in "Find us" and on the team and announcements pages. Their credits are in `assets/credits.json` and in the footer (`src/components/Credits.tsx`). They show the town, never the centre or its people. When the centre's own photographs arrive, use them on the team page, in announcements and in "Find us", and keep the credits line in step with what is still used.

The map in "Find us" is drawn from OpenStreetMap data; see `docs/map.md` for where everything comes from and how to regenerate it.

## Design notes

- Orange `#f2602f`, near-black `#161412`, white. Roundo (self-hosted) for everything; IBM Plex Mono only on the till receipt.
- The hero keeps its giant orange speech bubble. Below it, each section is built from something in or around the shop: the week on the wall, a till receipt, the street map, people talking, the shopping list, and the sign itself in the footer. See `DESIGN.md`.
- Tokens, type sizes and motion curves are in `src/app/globals.css`.
- Keep copy short and plain. Many visitors are learning English.
- Never call the organisation a charity or a CIC on the site unless it is registered again; "funded by one Rochdale family" is accurate.

## Before launch

See `docs/research-notes.md` for the open questions to put to the owner: session times, the domain (the old one has lapsed), the Facebook and Instagram handles, team names and photos, real stories, and whether to mention Homes Under the Hammer.
