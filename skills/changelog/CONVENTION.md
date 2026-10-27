# Changelog Convention

How any repo keeps a changelog — text and visual, same folder, same trigger. Quick-and-dirty v1: meant to be trialed and revised, not final.

The short version that goes into a repo's `AGENTS.md` lives in its own file, [add-to-agents.md](add-to-agents.md) — copy its whole content in, don't paraphrase this longer doc. This file is the full spec that snippet points to once an entry's actually being drafted.

**Scope:** this file is only about writing the per-project changelog entry itself — the thing every project-repo agent needs. What happens to entries *after* that (rolling them up into a weekly review, promoting one to social/newsletter) is a separate, much-less-frequent concern with its own audience (whoever's doing the weekly review, not a project-repo session drafting one entry) — see [PUBLISHING.md](PUBLISHING.md). Deliberately not folded in here: a project-repo agent drafting one entry has no reason to load roll-up/promote instructions into context.

## File

A `changelog/` folder at the repo root, one file per entry — not a single growing file, not version-numbered releases (most of these repos ship continuously rather than cutting formal releases). Filename: `YYYY-MM-DD-slug.md`. The date is in the filename even though it's also in frontmatter — filename sort order gives free chronological skimming (`ls`, GitHub's file browser) with no need to open files, and same-day entries (this happens — three in one day isn't rare) need the slug to disambiguate regardless.

```markdown
---
date: 2026-08-15
title: Short title
promote: false
---

One or two sentences, written for a reader, not a raw commit-message dump.
See it live: [the feature](https://example.com/the-feature).

Optional image, if something visual shipped this session:

![Caption describing the moment](images/2026-08-15-short-title.png)
```

Frontmatter fields:
- `date` — the frontmatter copy is what Flowershow (or any generator building a list/index page) actually reads for sorting; the filename copy is for humans and git.
- `title` — plain text, **never a link**. The title is reserved for a future listing page to link *to* this entry — don't spend it on a link to something else.
- `promote` — boolean, `false` by default. See [PUBLISHING.md](PUBLISHING.md) — set at drafting time when the entry looks like a strong candidate for social/newsletter, so that judgment (made with full session context) isn't lost by the time of the weekly review.

If a repo does versioned releases, note the version in the body/title as needed — the folder/frontmatter mechanics don't change.

## Images

`changelog/images/YYYY-MM-DD-slug.png` (or `.mp4`/`.mov` for a short video) inside the project's **own** repo — not a separate changelog repo. Plain git commit; no external hosting for v1. Referenced inline from the entry file via a relative path, as above.

No mandatory before/after pairing — just grab whatever's compelling in the moment (usually the "after"/current state). If a reader wants the comparison, the previous entry's image is one file over in the same folder.

**Check for it, don't skip past it.** If the session touched UI or anything visual, that's a deliberate point to consider a screenshot before deciding the entry doesn't need one — not something that only happens to come up. Still judgment, not mandatory: a prototype or visible UI change is a strong candidate; a backend-only change isn't.

## Link to the live feature

An entry that describes something a reader can actually go look at should link to it — a page, a specific feature, wherever the change is visible. This is easy to skip and shouldn't be: "the concept wiki grows to seventeen pages" without a link to the concept wiki gives the reader nothing to do with that sentence.

- Link inline, early in the entry text, or in a trailing `See: [...]` line — whichever reads better for that entry. Judgment call, not a fixed placement.
- An entry covering multiple things (more likely at the bigger tier below — a feature plus a couple of fixes) can have more than one link, one per thing, rather than forcing everything into a single link.
- Don't turn the title into a link (see Frontmatter fields above) and don't cram so many links into the lead sentence that it reads like a reference list — spread them across the entry instead.
- No link if there's genuinely nothing public to point to yet (e.g. a feature not linked from navigation) — say so rather than linking to something misleading.

## Trigger

At session-checkpoint time (end of a work session / handoff point) — the same moment a `NEXT.md` update happens in repos that use one.

**Default to no entry at the end of a routine session.** Write a standalone entry only for a new feature or a comparably significant reader-facing change: a meaningful change in behaviour, a fix to something materially broken for users, or a significant new piece of public content. A visible difference alone is not enough.

**Skip visual polish, alignment/spacing tweaks, typo fixes, config tidying, internal cleanup, renames, reorganisations, and other small fixes.** These do not get standalone entries, even a single sentence. Several small changes together do not become changelog-worthy just because the session was busy.

**Smaller changes can accompany a bigger announcement.** An entry about a substantial feature, milestone, or release may include relevant smaller improvements and bug fixes as supporting detail or bullets. The main announcement must qualify on its own; don't create an entry just to collect small changes.

Skip failed experiments and planning/research/design unless the work is itself a significant public deliverable. Drafting ahead of a ship is fine. When unsure, skip the entry.

1. Did something changelog-worthy ship this session? (See threshold above — not every commit, not every session.)
2. If yes: draft a new file, `changelog/YYYY-MM-DD-slug.md`.
3. If something visual shipped: grab a screenshot/short video at the same moment, commit it to `changelog/images/`, embed it in the entry.

AI drafts the entry from what actually happened in the session; a human skims/edits before it's committed — light curation, not writing from scratch.

## Calibrating detail

First decide whether the work clears the Trigger threshold. Only then choose how much detail it needs. There is no standalone "small work" tier. Match the entry's weight to what a reader outside the session would care about, not how much work it took or how many files changed:

- **A qualifying feature or significant change:** title, one or two sentences written for a reader, screenshot/video if something visual shipped, link to the live feature (see above). This is the default for an ordinary qualifying session.
- **Something bigger** (a substantial feature, milestone, or release with several meaningful changes): multiple paragraphs and/or bullets, more than one link if more than one thing is covered, images where relevant. Relevant smaller improvements and bug fixes can sit alongside the main announcement. Don't pad an ordinary entry to this length or list every incidental cleanup.
- **Only small changes:** no entry.

Describe reader-facing outcomes, not the session's internal steps. File names, config keys, and internal moves usually belong in `git log`, not the changelog.

**Examples of the threshold:**

- A session rebrands the repo, tidies the README, reorganises folders, and adjusts page spacing: **skip the entry**, rather than condensing the work into a one-liner.
- A session ships a new search feature: **write a short entry** explaining what readers can now find, with a link and a screenshot where useful.
- A substantial search release adds filters and saved searches and also fixes broken result links: **write a broader entry**, leading with the new capabilities and including the link fix as a supporting bullet. The release qualifies without the smaller fix.

## Publishing

Committing the entry to the project's own repo is the automatic, no-decision floor — it always happens, no destination choice required. Anything beyond that (a personal/org site, a weekly review, social media, a newsletter) is always a **manual promote**, never automatic, and lives in [PUBLISHING.md](PUBLISHING.md), not here.

## Not doing yet

- No image hosting (R2 or otherwise) — plain git until volume makes that painful.
- No roll-up/promote automation of any kind at the per-entry level — see `PUBLISHING.md` for what v1 of that looks like.
