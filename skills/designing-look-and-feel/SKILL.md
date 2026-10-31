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
3. **Mood boards.** Real references, each captioned with what to take and what to leave. Make them for the parts as well as the whole: a component such as a contents picker gets its own board.
4. **Mockups.** Two or three directions side by side on one page. Link the real thing (a live deck, a page), not only thumbnails.
5. **Select.** Rufus picks, or picks a blend. Give each decision a recommendation.
6. **Build.** Build the chosen direction properly and use it on real work.
7. **Cycle.** If using it shows a problem, go back to 3 (mood boards) or 4 (mockups), not straight to more build.

**Watch out for:**

- **One criterion taking over.** On the slides kit it was the Zoom size floor. Keep the feel and the real use in view.
- **Misquoting the human's feedback.** Quote it exactly, with its scope ("too small" meant the small text, not everything).
- **Reopening settled decisions.** Write each one down where the next agent will read it.

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
| 1. Mood board (can start raw) | The current site as a "before" shot. 6–12 real references (screenshots), each captioned **take →** and **leave →**. 2–3 anti-references. | "These references, these takes." |
| 2. Directions | 2–3 directions as **specimen cards side by side**, each a distinct reading of the feel. Each card has: wordmark, nav line, headline, standfirst, CTA, status line, hex swatches, type pairing, and one named signature component; underneath, *says / risk / draws on*. Mark one as recommended, and say why. | Pick one, or a blend. |
| 3. Mark | 4–6 logo/wordmark options at nav size and favicon size. Recommendation marked. | Pick one. |
| 4. Full pages | Only now: the chosen direction applied to the home page and one inner page with real copy, then to the real theme (e.g. a preview site). | Review, iterate, ship. |

Stage 1 may ship alone and rough: a page of references and notes is a valid first version. Each later stage republishes the **same** page with a new section; it does not create a new artifact.

## Screenshots for the mood board

Use headless Chrome or Playwright at 1440×900, top of the page only. Downscale to about 720px and save as JPEG at around q60 (40–80KB each), embedded as data URIs. If a site blocks the capture or renders blank, drop it and pick another. Never fake a screenshot.

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
| A new link per iteration | Republish the same page |
| Generic AI-site tics: tracked-caps eyebrows, an italic accent word in every headline, identical section rhythm, triads of cards | Name them as anti-references, and add a table of tic × direction |
| Directions extrapolated from existing assets | Derive each direction from the feel |
| Invented examples presented as real | Label them illustrative |
