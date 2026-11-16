---
name: portfolio
description: Add to, update, and garden the project/initiative portfolio in this repo (initiatives/, projects/, ideas/). One skill, three modes — add a new initiative or project, refresh a project's next actions, or run a hygiene sweep over the whole portfolio. Use when creating a project/initiative, capturing next actions, or doing periodic portfolio cleanup.
license: Proprietary
metadata:
  author: rgrp
  repo: planning
---

> **Repo-bound skill.** Expects a planning repo with `initiatives/`, `projects/`,
> `ideas/`, `portfolio/index.js` and Beads (paths below are relative to that
> repo). Install it per-repo, not user-level. Making the layout configurable at
> setup is an open item.

# Portfolio

Create and maintain the portfolio. One skill, three modes.

This skill is about *the portfolio itself*. Deciding **what to work on** (week /
day / now) is the separate `planning` skill.

Pick the mode from the ask:

- **add** — "add a project", "new initiative", capturing something to pursue.
- **update** — "next actions for X", "what's next on X", refreshing its tasks.
- **garden** — "tidy the portfolio", "find orphans", periodic cleanup.

Shared principles: **let me outflow first, then guess and check; suggest from
context; keep it light; omit empty fields.**

## Model

- **Type is the folder**, not a field. `initiatives/` = enduring effort
  (`<semantic-slug>.md`); `projects/` = bounded effort, almost always under an
  initiative; `ideas/` = a few sentences, same required frontmatter. Unsure
  between idea and initiative/project → `ideas/`, promote later.
- **Hierarchy** is initiative → project, via `parent: [[initiative-slug]]`
  (slug = filename stem; match the repo's existing quoting). Theme and org are
  `tags`, not nesting.
- **Required frontmatter:** `title`, `description` (one sentence, < 120 chars),
  `created` (`YYYY-MM-DD`), `status`. Add optional fields only when known, e.g.
  `github`, `url`, `tracker` (default `{github}/issues`), `workspace`, `phase`,
  `tags`, `due`, `tickler`, `status_notes`. For a field not listed here, copy
  how existing files in the repo use it; don't invent one.
- **status:** open = `next` · `in-progress` · `backlog` (default) · `someday` ·
  `paused` (+ `tickler: YYYY-MM-DD` to resurface); closed = `done` (+
  `completed`, `resolution: fixed`) · `superseded` (+ `superseded_by`) ·
  `dropped` · `archived`. A project that finished and led to the next one uses
  `followed_by`/`follows`, not supersede.
- **Status updates** go in `status_notes` (dated string, or a list of dated
  strings), not a body section.
- **Tasks live in Beads, not the file.** Each next action is a `bd` issue
  labelled `project:<slug>` plus `kind:plan|run` and `who:ai|collab|rufus`;
  blocking is `bd dep add`. If the work's own repo has `.beads`, create them
  there instead; with no `workspace`/`github`, use this repo's Beads. Default
  `--priority=2` and label `triaged`. Don't copy a remote backlog: one issue pointing at it is
  enough.

**The index.** `portfolio/index.js` is the generated index of every item
(`globalThis.PORTFOLIO_INDEX`, an array with `slug`, `type`, `title`,
`description`, `status`, `parent`, `tags`, …). Read it to look up existing
items, parents, and duplicates **instead of scanning all files**. If it looks
stale, regenerate with `node scripts/build-index.js`.

---

## Mode: add

Add a new initiative or project. **Outflow-first**: let me brain-dump before any
questions, then you infer everything you can and check it fast.

1. **Take the outflow.** I'll usually just say "add a project/initiative" and
   dump. Don't interrogate field-by-field first. If I gave almost nothing, ask
   one open prompt ("dump whatever you've got") — not a schema.
2. **Duplicate check (always).** Before proposing anything, scan
   `portfolio/index.js` for an existing item with a similar title / slug /
   description (and check the likely parent's children). If there's a plausible
   match, surface it and ask: **add to it / update it / still create new** —
   don't silently create a near-duplicate.
3. **Infer, then check in one pass.** From the outflow, guess and present
   together for a quick yes/tweak:
   - **Type** — project vs initiative (state your call + why). If genuinely
     between project and idea, prefer `ideas/` and say so.
   - **Title** (2-5 words) + **short description** (< 120 chars) + **full
     description** (2-4 sentences).
   - **Parent** — best-guess initiative from the index, e.g. `[[life-itself]]`
     (projects should almost always have one).
   - **Tasks** — 2-5 candidate next actions pulled from the outflow (see step 4).
   - For each task, its `kind:` and `who:` labels.
   - Mention any other fields only if the outflow implied them (`github`, `url`,
     `tracker`, `phase`, `tags`). Don't ask for empty ones.
4. **Tasks.** Always offer initial tasks. Derive candidates from the outflow;
   if none are obvious, ask "any first actions?" — fine to leave empty if I say so.
5. **Write the file** once I confirm.
   - Initiative → `initiatives/<semantic-slug>.md`.
   - Project → `projects/YYNN-<kebab-title>.md` in the repo where the work lives.
     `YY` = creation year; `NN` = highest number for that year in that repo + 1
     (start at `01`). Old `YYYY-slug` files are legacy: don't count or rename
     them. Repo name/Beads prefix scopes the ID. Extra files (plans, LTP outputs,
     research) go in `projects/YYNN-<kebab-title>/`. Outputs the project makes
     (a design system, a kit, a site) live outside `projects/`.
   - Frontmatter per [Model](#model); body = full description. No task list.
   - If the parent has a `## Projects` list, append
     `- [[projects/<file-stem>|Title]]`.
   - Create the agreed tasks in Beads (see [Model](#model)), then run
     `node scripts/build-index.js`.

```
---
title: Example Project
description: One sentence under 120 characters.
created: 2026-11-16
status: backlog
parent: [[life-itself]]
---

Two to four sentences: what, why, what done looks like.
```

```bash
bd create --title="Draft the API spec" --description="..." --type=task \
  --priority=2 --labels=triaged,project:2601-example-project,kind:run,who:collab
```

Fallback (thin outflow, no clear inference): walk type → description → parent →
tasks as single quick questions, one at a time.

---

## Mode: update

Refresh an item's next actions in Beads. Fast and conversational — keep 3-5
open actions per project; full backlogs live in the tracker.

1. **Which item?** If not given, ask. Read the file for context and
   `bd list --label=project:<slug>` for open tasks.
2. **Surface next actions** via quick prompts (S/C/Q/H framing optional):
   - **Situation** — where do things stand right now?
   - **Complication** — anything blocked or needing a decision?
   - **Next** — name 1-3 concrete actions (verb-first, completable in one sitting).
3. **Reflect back** the actions, tidied, and ask before writing.
4. **Write** to Beads: create new issues, close done ones, `bd dep add` where
   one waits on another. Add a dated `status_notes` line if the situation
   changed. If the file still has an old `## Tasks` list, offer to move it to
   Beads and delete the list.
5. **External tasks.** If the canonical list lives elsewhere, surface the
   `tracker` / `github` / `url` and ask for the next action — do not fetch or
   invent backlog detail.

---

## Mode: garden

Periodic hygiene sweep. **Report first, fix interactively** — never bulk-edit
frontmatter silently.

1. **Sweep** `initiatives/`, `projects/`, `ideas/`. Use `portfolio/index.js` if
   fresh, else read frontmatter directly (regenerate via
   `node scripts/build-index.js` if helpful). Collect findings:
   - **Orphans** — projects with no `parent`.
   - **Broken links** — `parent` (or `superseded_by`) pointing to a file that
     doesn't exist.
   - **Missing required frontmatter** — no `status` / `description` / `created`.
   - **Misfiles** — idea-scale items sitting in `initiatives/`, or
     initiative/project-scale items sitting in `ideas/`.
   - **Stale** — `status: in-progress` but no commit to the file in 6 months
     (`git log -1 --format=%cs <file>`).
   - **Closed but incomplete** — `done` without `completed`, `superseded`
     without `superseded_by`. (Closed items may stay in `projects/` or `projects/archive/`.)
   - **No next action** — `next` / `in-progress` project with no open
     `project:<slug>` Bead; or a leftover `## Tasks` list to move to Beads.
2. **Report** in the [reply shape](../../docs/reply-shape.md): a summary with counts per category, then **You:**
   the groups that need a call, each with a recommended fix. File lists come
   after that, or in a linked file.
3. **Fix interactively** — offer per group (or per file). Apply only what the
   user approves. For orphans, propose a likely `parent` from context but confirm.
4. **Stop** when the user is done — do not force-fix everything in one pass.

---

## Common mistakes (all modes)

- Keeping tasks as a `## Tasks` checklist in the file instead of in Beads.
- Adding a `type` field: the folder is the type.
- Asking broad open questions before offering context-based suggestions.
- Asking more than one question at a time.
- Long reports, or asks buried at the bottom; follow the [reply shape](../../docs/reply-shape.md).
- Writing empty frontmatter fields instead of omitting them.
- Fetching / inventing external backlog detail instead of surfacing the link.
- Bulk-editing in garden mode without a report-and-approve step.
