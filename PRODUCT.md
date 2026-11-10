# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router, `src/`), TypeScript, Tailwind CSS v4, npm. Frontend only: no backend, no database. Content (announcements, team profiles, success stories) lives as Markdown/MDX files in the repo and is updated by adding a file and redeploying (confirmed by the user).

## Users

- People in Rochdale who need somewhere to go: women looking for a weekly group, men who want company and someone professional to talk to, adults learning English, anyone who needs a warm lunch, food or clothes during the cost-of-living crisis. Many will arrive on a phone, often sent by a friend or a Facebook post, asking "when is it on and can I just come?"
- People who want to help: neighbours and local businesses offering time, food or clothes.
- Secondary: the family who run the centre and the developer, who will add announcements and team members as Markdown files.

## Product Purpose

The website for Let's Talk, a wellbeing centre at 74 Drake Street, Rochdale OL16 1PQ. It tells people what happens there each week, that they can simply turn up without a referral, who runs it, what has changed for people who came, and what is happening now. Success: a visitor knows within seconds what Let's Talk is, which day to come, and that they are welcome.

## Positioning

A family-funded, non-profit wellbeing centre that started in 2019 as a single mental-health workshop and grew into a weekly rhythm: Monday for women, Wednesday for English and the men's club (with a psychologist and psychiatrist in the room), Thursday a community lunch with free food and clothes, Sunday a men's meditation club. No referral, no cost, food on the table. A larger charity could not truthfully say "a family runs this and you can walk in off Drake Street".

## Operating Context

- Weekly rota (owner's description; exact times are PLACEHOLDERS to be confirmed by the owner):
  - Monday: women's session, 30–40 women. One hour for them, one hour of teaching (mental health, physical health, exercise): "healthy mind, body, soul". Food served.
  - Wednesday morning: English class, anyone welcome. Wednesday afternoon: men's club with refreshments; a psychologist and a psychiatrist attend; talk about anything, make friends.
  - Thursday: community lunch, anyone in need welcome. Tea, coffee, cookies, a warm lunch, free food items and free clothes. Cost-of-living packages (oil, rice, flour etc.) made up for the person and what they eat.
  - Friday and Saturday: closed.
  - Sunday: meditation club for men.
- Shop-front premises on Drake Street: orange fascia sign "Let's Talk" with the word "Talk" inside a white speech bubble, "Wellbeing Centre", phone 07930 606 926. Grey roller shutters, brick terrace above.
- The owner mentioned "House under the hammer" (possibly BBC Homes Under the Hammer) — UNVERIFIED, under research.
- Visitors mostly use phones; some are learning English, so copy must be plain and short.

## Capabilities and Constraints

- Pages (confirmed): Home (what they do, weekly rota, success stories, latest announcements), Meet the team (photo + each person's own words), Announcements (posts, newest first, archive of previous posts). Plus whatever is needed: get involved / contact.
- Primary visitor actions (confirmed): "just turn up" (drop-in, no referral) and "volunteer / donate food and clothes". No online money donations for now. Phone number shown for questions.
- Content model: MDX files per announcement, per team member, per success story. Team photos and session/centre photos will be supplied by the user after the build; the build must work with and without them.
- No backend, no forms that need a server (contact goes by phone / email link).
- Exact session times, team names, real success stories: UNDECIDED, supplied later; every placeholder must be listed.

## Brand Commitments

- Name: Let's Talk (apostrophe, two words). Descriptor on the sign: Wellbeing Centre.
- Colours: orange, black and white (from the sign). Binding.
- Logo device: the word "Talk" sits inside a white speech bubble on the orange sign.
- Voice (user): clean and friendly, not verbose. Explicitly NOT the generic AI-site look: no purple/blue gradients, no gradient text, no emoji in headings, no Inter everywhere, no coloured-border cards, no glassmorphism, no low-contrast dark mode, no three icon boxes in a row, no badge above the headline, no Lucide icons everywhere, no untouched shadcn, no fade-in-on-scroll, no cursor beam, no buttons that merely fade on hover, consistent spacing, no em-dash habit, no buzzword copy, no serif italic accents, no Space Grotesk + Instrument Serif.
- Motion: Emil Kowalski's animation principles ("Kowalski design animations") to be installed as a skill and applied where relevant.

## Evidence on Hand

- Owner's verbal description of the weekly programme (above).
- Street-view photo of the shop front (user-supplied screenshot; Google imagery, not usable on the site).
- Web presence: letstalkrochdale.co.uk, facebook.com/letstalkrochdale, facebook.com/Letstalkfindyourvoice, a Yell listing (74 Drake St, OL16 1PQ). Research in progress; facts are only used once verified.
- Absent and must not be fabricated: real success stories (use clearly marked sample stories until the owner supplies real ones), team names, charity registration number (may be unregistered: "family funded non profit"), statistics beyond "30–40 women on Mondays" and "since 2019".

## Product Principles

1. Say when and where before anything else; the rota is the product.
2. Everyone is welcome and nobody needs a referral; the site must never feel like a form or a clinic.
3. Short, plain sentences a new English speaker can read.
4. Real people, real food, real street: show the place, never stock-photo it.
5. A family runs this: the tone is a neighbour's, not an institution's.

## Accessibility & Inclusion

Plain English (many visitors are learning it), large readable type, high contrast on orange, phone-first, tap targets 44px+, works without JavaScript for the rota and contact details.
