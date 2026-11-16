# Portfolio data model

The generic model for a portfolio repo: folders, file naming, frontmatter and
vocabularies. Shared by the `portfolio`, `planning`, `changelog-rollup` and
`plan-for-delegation` skills. Change the generic model here, in one place.

## Local overrides

A repo may have its own `docs/data-model.md`. **Check for it before working.**
It adds or overrides rules for that repo (extra fields, extra folders, different
defaults); where it conflicts with this file, the local file wins. It should hold
only the differences and link back here, not a copy of this file.

## Folders

- `initiatives/` — one file per initiative: an **enduring effort** that can
  contain projects. Created deliberately (promoted from an idea, or with intent
  to pursue).
- `projects/` — one file per project: a **bounded effort**, usually under an
  initiative via `parent`. Extra files for a project (plans, research) go in a
  folder with the same name as the file. Outputs the project makes (a site, a
  kit) live outside `projects/`.
- `ideas/` — lightweight captures of potential work: a few sentences. Unsure
  between idea and initiative? Put it in `ideas/` and promote later: when you
  decide to pursue it, move it to `initiatives/` (or `projects/`) and flesh it
  out.
- `projects/archive/` — optional home for closed projects; most closed projects
  stay in `projects/` with a closed status.

Ideas and initiatives are separate folders, not a status, so the view of what is
being worked on stays uncluttered.

The **type** of an item is its folder. There is no `type` field.

## File naming

- **Initiatives:** stable semantic slug, e.g. `initiatives/life-itself.md`.
- **Projects:** `projects/YYNN-<kebab-title>.md`. `YY` = creation year; `NN` =
  highest number for that year in this repo + 1, starting at `01`. The repo
  (or its Beads prefix) scopes the number. Older `YYYY-<slug>.md` files are
  legacy: leave them, and don't count them when numbering.
- **Ideas:** semantic slug.
- An item's **slug** is its filename stem. Links and labels use it.

## Frontmatter

Omit empty fields. For a field not listed here, copy how existing files in the
repo use it (or the local data model); don't invent one.

### Required (all types, ideas included)

| Field | Notes |
|---|---|
| `title` | Human title, 2-5 words |
| `description` | One sentence, < 120 chars |
| `created` | `YYYY-MM-DD` |
| `status` | see vocabulary below; default `backlog` |

### Optional

| Field | Notes |
|---|---|
| `parent` | `"[[initiative-slug]]"` — containment. Projects almost always have one |
| `tags` | list; also used for theme and organisation (not hierarchy) |
| `github` | repo URL |
| `tracker` | issue tracker; if absent and `github` set, assume `{github}/issues` |
| `url` | homepage or live site |
| `workspace` | local checkout path, e.g. `~/src/<owner>/<repo>` |
| `phase` | `inbox` · `shaping` · `shipping` · `sharing` |
| `start` / `end` | `YYYY` or `YYYY-MM-DD` — when the work really started / ended, if different from `created` / `completed` |
| `due` | `YYYY-MM-DD` real deadline |
| `tickler` | `YYYY-MM-DD` resurface date (see Tickler) |
| `completed` | `YYYY-MM-DD`, set when `status` becomes `done` |
| `resolution` | outcome tag on close (see vocabulary) |
| `superseded_by` / `supersedes` | `[[slug]]` — replacement (see Sequence links) |
| `followed_by` / `follows` | `[[slug]]` — continuation (see Sequence links) |
| `status_notes` | dated status updates: one string, or a list once it grows |
| `changelog_path` | repo-relative changelog location, e.g. `changelog/` |
| `changelog_url` | public changelog URL, if any |

### Example

```yaml
---
title: Example Project
description: One sentence under 120 characters.
created: 2026-11-16
status: backlog
parent: "[[life-itself]]"
tags:
  - research
---

Two to four sentences: what, why, what done looks like.
```

Wiki-links in frontmatter: quote them (`"[[slug]]"`) in a new repo. Unquoted
`[[slug]]` is a YAML nested list; tools may cope, but if a repo already uses it,
match the repo.

An initiative looks the same, minus `parent`, often with a `## Projects` list
in the body.

If an initiative keeps a `## Projects` list in its body, add new child projects
to it as `- [[projects/<file-stem>|Title]]`.

## Vocabularies

**status** — open: `next` (selected as near-term) · `in-progress` · `backlog`
· `someday` · `paused` (deferred or blocked). Closed: `done` · `superseded` ·
`dropped` (actively abandoned) · `archived` (old, kept for the record). A
non-empty `resolution` also means closed.

**resolution** — `fixed` (default for `done`) · `wontfix` · `duplicate` ·
`superseded`. Free text allowed for nuance.

**Closing:** `done` → add `completed` and `resolution: fixed`. `superseded` →
add `superseded_by`. Close or move the item's open Beads tasks too.

## Status notes

Dated updates go in `status_notes`, not a body section:

```yaml
status_notes:
  - "2026-06-01 — kicked off, scope agreed."
  - "2026-07-11 — blocked on upstream release."
```

## Tickler

For work deliberately pushed to a later date, not dropped: `status: paused` +
`tickler: YYYY-MM-DD`, with the reason in `status_notes`. Planning skips paused
items whose tickler is in the future and surfaces them once it passes. Pick the
start of the week you want it back. Use `due` for a real deadline. For a single
task, use `bd defer <id> --until=YYYY-MM-DD`.

## Sequence links

Both differ from `parent`, which is containment.

- **Supersession = replacement.** The old project was abandoned part-way; the
  new one does the same job differently. Old: `status: superseded`,
  `superseded_by: [[new]]`. New: `supersedes: [[old]]`.
- **Succession = continuation.** The old project finished; the new one is the
  next stage. Old: `status: done`, `followed_by: [[next]]`. New:
  `follows: [[old]]`.

Test: if closing the old one felt like a win, it's `followed_by`; if it felt
like a restart, it's `superseded_by`.

## Tasks (Beads)

Tasks don't live in item files. Each next action is a Beads (`bd`) issue:

- Label `project:<slug>` (or `initiative:<slug>`), plus `triaged`.
- `kind:plan` (needs a plan or decision first) or `kind:run` (ready to do).
- `who:ai` (AI finishes it alone) · `who:collab` (AI drafts, the owner steers
  live) · `who:<owner>` (needs the owner's decision or hands, e.g. `who:rufus`).
- Blocking is `bd dep add <issue> <depends-on>`, only for a real blocker.
- Keep 3-5 open actions per project. Don't mirror a remote backlog: one issue
  pointing at it is enough.
- If the item's own repo (`workspace` / `github`) has `.beads`, its tasks live
  there. Otherwise use this repo's Beads.

```bash
bd create --title="Draft the API spec" --description="..." --type=task \
  --priority=2 --labels=triaged,project:2601-example-project,kind:run,who:collab
```

## Index

`portfolio/index.js`, if present, is a generated index of every item
(`globalThis.PORTFOLIO_INDEX`: `slug`, `type`, `title`, `description`,
`status`, `parent`, `tags`, …), built by `node scripts/build-index.js`. Use it
to look items up instead of reading every file. If the repo has no index, read
frontmatter directly.

## Setting up a new portfolio repo

When the folders don't exist yet:

1. Create `initiatives/`, `projects/` and `ideas/` (only those you need now).
2. If the repo has no Beads, ask before running `bd init` (prefix: a short
   form of the repo name).
3. Create the initiative first, then the project with `parent` pointing at it,
   then add the project to the initiative's `## Projects` list. A project may
   have no parent if none fits yet.
4. Add a `docs/data-model.md` only if this repo differs from this file.

## Principles

- Hierarchy is initiative → project → tasks (in Beads).
- Theme and organisation are `tags`, not nesting.
- Metadata goes in frontmatter.
- The source of truth for detail (backlogs, specs, decisions) lives in project
  repos and trackers; the portfolio holds enough to orient and resume, and links
  out.
