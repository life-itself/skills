---
name: designing-look-and-feel
description: Use for any real design work (a site redesign, a theme or visual identity, a design system, a logo, a slide kit or deck look, a component such as a navigation or contents picker), or when asked for "mockups" or "design directions", before producing any mockup, theme CSS or build.
license: Proprietary
metadata:
  author: rgrp
  status: draft
  origin: reasoncommons brand redesign (2026-10-18)
---

# Designing look and feel

## The cycle (any design work)

Rufus's process, from the slides kit (2026-10-31), where skipping steps cost three rounds:

1. **Brief, then review.** Write the brief in markdown: goal, who it's for, the kinds of use and what each needs, what's fixed, and a done-check. Answer the first questions in the brief (what kinds, what each needs, good practice) *before* building, and have Rufus review them. Have a fresh subagent critique the brief too.
2. **Research and analysis.** Find out why the things we admire work. Take one factor at a time (layout, type, size ratios, colour, pictures), with measurements, not impressions.
3. **Mood boards.** Real references, each captioned with what to take and what to leave. **Start small: 4–6 references and 1–2 anti-references, get a reaction, then widen where the reaction points.** Rufus (2026-11-20): "i would start with a basic moodboard… capture 4-6 sites or whatever, and maybe 1-2 anti-patterns and get feedback then so you can get a sense of where to explore further b4 spending loads of time." Boards for the parts (a contents picker, verse setting, margin notes) go on their own page or in a research file, not on the main board.
4. **Mockups.** Two or three directions side by side on one page. Link the real thing (a live deck, a page), not only thumbnails.
5. **Select.** Rufus picks, or picks a blend. Give each decision a recommendation.
6. **Build.** Build the chosen direction properly and use it on real work.
7. **Cycle.** If using it shows a problem, go back to 3 (mood boards) or 4 (mockups), not straight to more build.

**Watch out for:**

- **One criterion taking over.** On the slides kit it was the Zoom size floor. Keep the feel and the real use in view.
- **Misquoting the human's feedback.** Quote it exactly, with its scope ("too small" meant the small text, not everything).
- **Reopening settled decisions.** Write each one down where the next agent will read it.
- **Reskinning instead of designing.** A suggestion, not a rule, from Sutras (2026-11-21): when the human names a reference they love, try a near-copy of it first, with the real content, measured in a browser (computed font, size, weight and colour per text role; the whole page scrolled; how images are treated). Then simplify the copy into a system. Directions built as new colours on the existing CSS came out "not bad, but not great… 5/10"; a one-hour measured copy of the reference was "the way to go". Critique each mockup beside the reference, not only beside its siblings, and treat images (toning, crop, scale) as part of the design.

The stages below are this cycle as it applies to a website's visual identity.


## Overview

Look and feel converges in stages, and each stage ends with the human choosing. Work happens on **one living page** — a design brief artifact republished at the same URL as it grows — so options are always compared side by side. Full-page mockups come last, for a direction that has already been picked.

## When to use

- Redesigning a site or app's visual identity, theme or design system; choosing fonts, palette, logo.
- Someone asks for "mockups" or "directions" and no direction has been chosen yet.

Not for: small CSS fixes, or building out a direction that is already chosen (go straight to stage 4).

**Precondition:** a brand narrative or positioning exists (what the thing is, for whom, the tone). If it doesn't, do that first.

**The feel comes before any visual.** Directions derived from existing assets ("extend the palette we already have") come out standard, because nothing tells you which to choose. Each direction should be a different *interpretation* of the feel. Example: https://design.seedsofrenaissance.org/feel.md ("Grounded hope"), which began as a few bullets.

## The stages

| Stage | What gets added to the brief page | Human gate |
|---|---|---|
| 0. Feel | One phrase every choice is judged against, plus 3 supporting notes, character, and "what we are not". Starts as a few bullets. | "Yes, that's us." |
| 1a. Mood board, raw | **Pictures to look at, not options to choose.** 4–6 real references and 1–2 anti-references, each one large image captured at its beautiful moment, with **take →** and **leave →** in a line each; the current site as "before". Real sites and real objects (printed pages, calligraphy, covers, museum images with licences) both count. **Names no directions.** | "These references, these takes", and where to look further. |
| 1b. Mood board, widened | Only after the reaction: widen where it points, to about 10–20 images on the page, grouped. Scan as wide as you like behind the scenes; the full candidate list with one line each (kept, held, dropped) lives in a repo file, not on the page. | "These too", or "enough". |
| 1c. Directions named | A **separate page or section** from the pictures: 3–5 directions read out of the board, each with a name, one image from the board and one sentence on what it would mean here; a shortlist of 2–3 with a recommendation. | "These directions." |
| 2. Specimens | 2–3 directions as **specimen cards side by side**, each a distinct reading of the feel. Each card has: wordmark, nav line, headline, standfirst, CTA, status line, hex swatches, type pairing, and one named signature component; underneath, *says / risk / draws on*. Mark one as recommended, and say why. | Pick one, or a blend. |
| 3. Mark | 4–6 logo/wordmark options at nav size and favicon size. Recommendation marked. | Pick one. |
| 4. Full pages | Only now: the chosen direction applied to the home page and one inner page with real copy, then to the real theme (e.g. a preview site). | Review, iterate, ship. |

Stage 1a **should** ship rough and small, within the first hour or two, so the reaction steers the rest. The pictures (1a, 1b) and the directions (1c, 2) are two different things: the mood board page stays a page of pictures; directions get their own page or a clearly separate section below. Each later stage republishes the **same** page with a new section rather than making a new artifact, except that a directions page may be separate from the pictures page.

## Mood board rules

From Sutras (2026-11-20), where a first board was rejected ("mood board is weak. where is the true beauty in this"), a second was too much at once, and a third merged the pictures into named directions ("where's the actual mood board of existing sites that I'm looking at?"):

- **Small first.** 4–6 references and 1–2 anti-references, then a reaction, then widen. Hours, not days, before the first feedback. **Widen into new territory**, not more of the thing the human already picked: "i didn't really need more emergence… i already know that."
- **Pictures, not options.** A mood board is existing things to look at. Do not name directions, shortlist or recommend on the pictures page; that comes after the reaction, on its own page.
- **Beauty is the test.** For every image ask "where is the true beauty in this?" Relevant but plain does not qualify. Capture the beautiful moment, which is often scrolled down or a detail, never the mere top of a page, and show it large: one or two across, not thumbnails.
- **Real objects count.** Printed pages, calligraphy, book covers, ceramics, museum images with open licences, credited. Roughly half the board need not be websites.
- **One or two lines per image.** Take →, leave →. If a caption describes something not visible in the picture, change the picture, not the caption.
- **Scan wide, show little.** Keep the full candidate list, one line each on kept, held or dropped, in a repo file.
- **One stage per page.** Technical or feature research (measurements, how a component should work) goes in its own document, linked, never on the board.
- **Look in the human's own archive first** (for Rufus: `~/src/rufuspollock/ux-patterns`), then related projects whose design could be borrowed with tweaks (a direction in its own right), then galleries such as Typewolf, siteInspire and Awwwards.
- **Have a fresh subagent review the board** as an art director, image by image, before the human sees it.

## Screenshots for the mood board

Headless Chrome or Playwright at 1440×900, scrolled to the moment that matters (a selector or a scroll offset per target), with cookie and newsletter overlays removed; a phone capture at 390 wide where the phone is the real use. Downscale to about 1100px wide, JPEG around q70, embedded as data URIs; a tall detail may be narrower. Keep the raw captures and a contact sheet so the choice can be revisited. If a site blocks the capture or renders blank, drop it and pick another. Never fake a screenshot.

## The brief page, in order

1. The feel phrase and its notes.
2. Before: the current site, and what's wrong with it.
3. Mood board.
4. Directions, side by side.
5. Marks.
6. Decisions needed: each one a question with a recommendation.

Reference example (an intermediate version; it started rawer): https://claude.ai/artifact/DLpmX593GvBX214vHLxCb9. Read it with the Artifact tool. A finished system laid out as files (README, feel.md, brand.md, type.md, BUILD.md, specimens/, archive/): https://design.seedsofrenaissance.org

## Common mistakes

| Mistake | Instead |
|---|---|
| Full-page mockups before a direction is chosen | Hero specimens on the brief page |
| One artifact per direction | All directions on one page, side by side |
| References without take/leave notes | Every reference says what to take and what to leave |
| Naming directions on the mood board, or a shortlist before the human has looked | Pictures first, reaction, then directions on their own page |
| Fifty images at once, or a week of scanning before anything is shown | 4–6 references and 1–2 anti-references first, then widen |
| Thumbnails of page tops, chosen for relevance | Scrolled moments and details, chosen for beauty, shown large |
| Captions that describe what is not in the picture | Change the picture |
| A new link per iteration | Republish the same page |
| Generic AI-site tics: tracked-caps eyebrows, an italic accent word in every headline, identical section rhythm, triads of cards | Name them as anti-references, and add a table of tic × direction |
| Directions extrapolated from existing assets | Derive each direction from the feel |
| Invented examples presented as real | Label them illustrative |
