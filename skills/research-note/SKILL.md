---
name: research-note
description: Use when writing a note or page about a person, thinker, researcher or field for a personal site or digital garden — from a quick stub (who they are, why they matter, links) up to a researched note that assesses their claims and evidence and why they are influential now. Covers picking the depth first, the question tree, separating results from theory from worldview, tiering evidence, fact-checking citations with a subagent, and finding and crediting a portrait. Not for writing an original argued essay.
license: Proprietary
metadata:
  author: rgrp
  status: draft
  origin: rufuspollock.com, "Michael Levin.md" (2026-10-22)
---

# Research note

A note about a person or field. Most should ship in minutes; a few deserve a
real assessment. Decide which **before** doing any research.

The site's own conventions (filenames, frontmatter, tags, status line, image
folders, publishing) live in that repo's `AGENTS.md` / `docs/conventions.md`.
Read them first; this skill doesn't repeat them.

## 0. Pick the depth

Ask, or infer from the request, which kind of page this is:

| Depth | What it is | Steps |
|-------|-----------|-------|
| **Quick stub** (default) | Ship fast: who they are, one paragraph on why they matter, 2–4 links. Minutes, not an hour. | 3, plus a link check. Image optional (5). Skip 1, 2, 4. |
| **Researched stub** | Assesses claims and evidence; still a stub. Example: [Michael Levin](https://rufuspollock.com/Michael+Levin). | All steps. |
| **Essay** | The author's own argued piece about them. | Out of scope — start from a researched stub. |

If unclear, default to quick stub and say so in one line; it can grow later.

## 1. Question tree (researched stub)

Before drafting, play back the root question and a sub-tree and get one OK.
Default root:

> What is X claiming, how well does the evidence support it, and why does it
> matter (or why is it influential) now?

Keep **"how solid is it?"** as its own branch, separate from "what has been
shown" — merged, the note reads as hype. The branches become the note's
sections. Optional last branch, "so what, for me": usually one "why I care"
line in a stub.

## 2. Separate layers, tier the evidence (researched stub)

- **Layers:** results → theory built on them → worldview / metaphysics. Say
  which layer each claim sits in; popular figures blur them.
- **Evidence tiers:** *solid* (peer-reviewed, independent support) · *real but
  limited* (true, smaller than the headline) · *weak or contested* · then
  overall caveats (replication concentrated in one group, no real-world
  translation yet, framing inflation — the words doing more work than the data).

## 3. Draft

- Top: status line, optional portrait, the question (researched only), a short
  answer, one "why I care" line.
- Body: one section per branch of the tree (researched) or one paragraph
  (quick).
- End: "Where to start" — key paper or book, best talks or interviews, their
  own site or blog.

## 4. Fact-check (researched stub)

Citations and specifics written from memory need checking. Hand the list of
claims (authors, year, journal, what each paper showed, job titles,
affiliations, companies) to a cheap subagent with web search. Ask for
CONFIRMED / WRONG / UNVERIFIED with a source URL each, and no file edits.

The usual failure is **overclaiming, not invention**: on the Levin note it found
no wrong citations but three overstatements ("his startup" for an affiliation,
a gene-name case, how a result was described).

Record how deep the check went in the status line, e.g. "Citations checked
against abstracts, not full texts; judgements on strength of evidence are
mine."

## 5. Portrait

1. Take the image from the person's Wikipedia infobox.
2. Open its Wikimedia Commons file page for licence, author and source. Other
   Commons photos can carry conflicting "all rights reserved" metadata — skip
   those.
3. Store a local copy, resized for 2× display (`cwebp -q 80 -resize 640 0
   in.jpg -o out.webp` for a 320px slot), in the repo's images folder.
4. Portraits are tall: use `<img src="…" alt="…" width="320" />`, not `![]()`.
5. Credit in an italic caption below:
   `*<What it shows>. Photo: <author>, [<licence>](<licence URL>), via [Wikimedia Commons](<file page>).*`

Fair use is generally fine for a commentary note, but credit the source anyway.

## 6. Publish

If pushing publishes the site, confirm before each push unless the repo's
instructions say otherwise.
