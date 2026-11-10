---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/team/page.tsx","src/app/announcements/page.tsx"]
---

# Surface brief: home page (src/app/page.tsx)

> **Superseded on 10 November 2026.** The owner kept the hero and asked for everything below it to be redesigned by the designer's own judgement, "ignoring the impeccable recommendation". The direction contract below now applies to the hero and header only. The rest of the home page, the footer and the inner pages follow `DESIGN.md` (rewritten the same day). Do not enforce the one-motif, five-step or no-lines rules on them.

Scope: the home page of letstalk, with the header and footer it establishes for /team and /announcements. Visitor mode: Persuade.

Audience and job: someone in Rochdale on a phone asking "when is it on and can I just come?"; someone who wants to help with food, clothes or time. Action: know which day to come (the rota) and ring 07930 606 926. Proof: the real weekly rota, the real address, real partner descriptions (Royal Exchange, Manchester City of Literature), sample success stories marked for replacement. Constraints: orange, black and white from the sign; Roundo; plain English; no referral language; never "charity" or "CIC"; the twenty "vibe-coded" tells are banned.

## Direction contract

THESIS: One shape from the client's own sign, the square-cornered speech bubble around "Talk", runs the whole site, and the bubble literally speaks: the hero's giant orange bubble says what's on today from the real rota. Refused: the photo hero with headline and button, three service blocks and a timetable table.

OWN-WORLD: White ground, near-black ink (#161412), the sign's orange (#f2602f) as whole flat fields, never an accent on a template; #f3f2f0 as the one surface step; #ffd9c9 only for blocks inside an orange card. Roundo at 400/500/600, one display size (clamp 64–100px) and five steps in all. The bubble at three scales: giant (hero field, the three boards: the orange hours board, the white notice on the ink shopfront band, the ink chalkboard of stories; closing field, footer mark), medium (photo masks, folder tabs, the coupon), small (buttons, the Today tab). The owner's rule for the boards (5 Nov 2026): visual and bold, with far less text; a board holds words, not sentences. Square corners everywhere; tails are right-angled like the sign. No lines, shadows, gradients, icons or illustration.

STORY: A stranger reads "Come in. Let's talk." and the bubble telling them what's on today; believes it is free, warm and for them because the hours board shows every day with its times in big type (today wearing a tab) and the notice in the window says what they get in six words (a warm lunch, food to take home, free clothes, English class, someone to talk to, nothing to pay); then checks the day, rings, or just turns up. Helpers reach "Bring what you can" and the phone number.

FIRST VIEWPORT (1440×900): header on the 8vw inset: wordmark left, three links and a black bubble "Call 07930 606 926" right. Left half, vertically centred at 8vw: h1 "Come in. / Let's talk." at 92px, one sentence at 20px, the black bubble button "When to come", the address small at the foot. Right half: a flat orange bubble from x=46% to past the right edge, cropped by the top and right, its tail at the bottom-left pointing at the headline; inside it, in ink, "It's Thursday. Community lunch is on now." at 36px and "12.30pm till 2pm. Come in." beneath, then the four days in short at body size. Phone (390): headline at 11.5vw on two lines, sentence, button; the bubble fills the lower 44% of the screen with the live line. Signature interaction: the live line is computed from the clock in Rochdale and updates each minute; without script the bubble lists the week. Motion grammar: the bubble wipes in from the right edge over 1.1s (the dealt "shutter") while the headline's two lines rise from their baselines; press feedback scales 0.97; hover changes colour, never opacity; no fade-in on scroll anywhere; the gallery frame crossfades; the one reserved colour move is the live line turning white while a session is on. The announcement folders are flat colour bands with date tabs, in normal flow (the sticky stack was dropped: it covered the bands' text, which the house rules forbid).

FORM: One motif (taste-skill direction `one-motif`, seed 2109698207), the subject's bubble; first on my ordered list and pinned by the brief; raised by the session-sleeve challenger (orange as whole fields), the paper automata (one colour move reserved for the live line), HyperCard (every day deep-linkable) and the six-pack (all seven days always shown). seed:2e81035c0e8193df

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved
Session times (placeholders except Thursday); real team photos, names and words; real success stories; the Instagram handle; the domain.
