ROUND 4 (5 Nov 2026, after the owner: "the week rota, what happens here and user stories are very plain and basic and too much text"; on .impeccable/review/desktop-now.png, mobile-now.png, tablet.png, desktop-closed.png)
Seen in one second: three boards after the hero: an orange hours board, a white notice pinned to a black shopfront, a black chalkboard.
What changed: a five-agent panel (three angles: the board, the conversation, the poster; two judges) chose "the board" for all three sections. The week is one giant orange bubble with every day on it, times at head size, closed days small, today wearing an ink tab; What happens here is a full-bleed ink band with a white bubble of six words (five of them links into the board) and the Toad Lane picture pointing back at it; Stories is one ink bubble with each story chalked in one breath at a capped display size. Words: ~140 → 47, ~180 → 34, ~110 → 40.
Layout words by section: hero=giant shape / week=framed orange board / what-happens=ink band, white notice left, picture right and low / corner=split (frame + text) / stories=framed ink board of type / announcements=bands with tabs / bring=field with the object / coupon=card / footer=mark built large
Scores: design 8 · usability 8 · creativity 8 · content 7.5 → overall 7.9
Caps: none (0 FAIL; the two WARNs, no footage and little motion, are defended as before).
Top three problems:
1. desktop-now.png, the notice: the five linked lines show their underline only on hover, so a thumb cannot tell they are links; accepted because the notice is complete without tapping, and the board is one screen below.
2. The psychologist and psychiatrist at the men's club no longer appear on the home page ("Someone to talk to" stands in); the fact now lives on the team page and in rota.ts.
3. The chalk size at 1440 is 81px, a capped display step (min(display, 5.6vw)) like .intro-title and .bring-number; at 1440 the cap bites, so the page holds a sixth measured size. Kept because the display step itself does not fit a 46-character story in two lines on the board.

ROUND 3 (on .impeccable/review/desktop.png and mobile.png, plus the inspector sheets)
Seen in one second: a huge orange speech bubble beside "Come in. Let's talk."
Idea (one sentence): the white speech bubble around "Talk" on the Drake Street sign is the one shape on the site, and the hero bubble says what's on today from the real rota.
Live thing: the bubble's line ("It's Thursday. Community lunch is on now. 12.30pm till 2pm. Come in.") computed from the clock in Rochdale, updating every minute; without script it lists the week.
Layout words by section: hero=giant shape / week=two-column list / what-happens=split (masked photo + points) / corner=split (frame + text, mirrored) / stories=split (bubble quote + offset column) / announcements=bands with tabs / bring=field with the object / coupon=card / footer=mark built large
Scores: design 7.5 · usability 8 · creativity 8 · content 7 → overall 7.6
Caps applied: none on the home page (0 FAIL). Team and announcements pages: fewer than four real pictures until the owner's photos arrive (design on those pages capped at 6.5 for now).
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. desktop.png, the "What happens here" points: twelve small points in two columns read as a long list; when the owner's session photos exist, four of the points should become captioned pictures and the list shrink to eight.
2. desktop.png, Stories: two sample quotes carry the right column; they are honest placeholders but the section only becomes proof once the owner supplies real stories with first names and sessions.
3. mobile.png, the hero: the orange bubble has no tail on the phone (it is cropped by the bottom edge); a tail on the left edge would keep the sign's shape on the smallest screen.

ROUND 2 (on the inspector sheets after the first fixes)
Seen in one second: the orange bubble.
Scores: design 7 · usability 7.5 · creativity 8 · content 7 → overall 7.3
Caps: none (0 FAIL on home).
Top three fixed this round: nav links straddling the bubble's left edge (bubble moved to 46vw); the phone address crossing the bubble's top edge (bubble height 44svh); 392px of plain orange above the number bubble (field now a hard cut after the folders, bubble anchored low).

ROUND 1 (first render)
Seen in one second: the orange bubble.
Scores: design 6 · usability 6 · creativity 8 · content 6 → overall 6.4
Caps: 8 FAIL (overall ≤ 6.0): raw Date strings in the announcement strips, 56px titles on three lines, sticky folders covering text, tablet nav wrapping.
Fixed: dates normalised in content.ts; folder titles set as 30px statements; stacking removed; nav shortened at md; lead step reduced to 22–30px; team page portrait placeholders replaced by small initial marks plus a Drake Street picture; announcements intro picture and a visible action.
