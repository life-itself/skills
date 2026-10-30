---
name: portfolio
description: Add to, update, and garden the project/initiative portfolio in this repo (initiatives/, projects/, ideas/). One skill, three modes — add a new initiative or project, refresh a project's next actions, or run a hygiene sweep over the whole portfolio. Use when creating a project/initiative, capturing next actions, or doing periodic portfolio cleanup.
license: Proprietary
metadata:
  author: rgrp
  repo: planning
---

> **Repo-bound skill.** Expects a planning repo laid out as described in that repo's `docs/data-model.md` (paths below like `docs/`, `projects/`, `portfolio/index.js` are relative to that repo, not this skills repo). Install it per-repo (symlink into that repo's `.claude/skills/`), not user-level. Making the layout configurable at setup is an open item.

# Portfolio

Create and maintain the portfolio. One skill, three modes. The **data model**
(folders, frontmatter schema, vocabularies) lives in
[`docs/data-model.md`](docs/data-model.md) — read it when you need field
or naming detail; do not duplicate the schema here.

This skill is about *the portfolio itself*. Deciding **what to work on** (week /
day / now) is the separate `planning` skill.

Pick the mode from the ask:

- **add** — "add a project", "new initiative", capturing something to pursue.
- **update** — "next actions for X", "what's next on X", refreshing a file's tasks.
- **garden** — "tidy the portfolio", "find orphans", periodic cleanup.

Shared principles: **let me outflow first, then guess and check; suggest from
context; keep it light; omit empty fields.**

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
   - Mention any other fields only if the outflow implied them (`github`, `url`,
     `tracker`, `phase`, `tags`). Don't ask for empty ones.
4. **Tasks.** Always offer initial tasks. Derive candidates from the outflow;
   if none are obvious, ask "any first actions?" — fine to leave empty if I say so.
5. **Write the file** once I confirm.
   - Initiative → `initiatives/<semantic-slug>.md`.
   - Project → `projects/YYNN-<kebab-title>.md` in the repo where the work lives
     (`YY` = year created, `NN` = next number across all repos; see the data
     model's "Project number allocation"). Extra files (plans, LTP outputs,
     research) go in `projects/YYNN-<kebab-title>/`. Outputs the project makes
     (a design system, a kit, a site) live outside `projects/`.
   - Frontmatter: required `title`, `description`, `created` (today), `status`
     (default `backlog`) + any confirmed optional fields. Omit empty fields. If
     `github` given and `tracker` not, add `tracker: {github}/issues`. Body =
     full description, then `## Tasks` with the agreed actions.

```
---
title: [Title]
description: [Short description]
created: [YYYY-MM-DD]
status: backlog
parent: [[parent-slug]]
---

[Full description]

## Tasks

- [ ] ⏭️ [first action]
- [ ] [next action]
```

Fallback (thin outflow, no clear inference): walk type → description → parent →
tasks as single quick questions, one at a time.

---

## Mode: update

Refresh a file's next actions. Fast and conversational — this repo caches only
3-5 immediate next actions; full backlogs live in the tracker.

1. **Which file?** If not given, ask. Read it for description + existing tasks.
2. **Surface next actions** via quick prompts (S/C/Q/H framing optional):
   - **Situation** — where do things stand right now?
   - **Complication** — anything blocked or needing a decision?
   - **Next** — name 1-3 concrete actions (verb-first, completable in one sitting).
3. **Reflect back** the actions, tidied, and ask before writing.
4. **Write** to `## Tasks` as a checklist. Mark the immediate next action ⏭️.
   Group under `###` headings only if there are distinct streams. Keep to 3-5.
5. **External tasks.** If the canonical list lives elsewhere, surface the
   `tracker` / `github` / `url` and ask for the next action — do not fetch or
   invent backlog detail.

```
## Tasks

- [ ] ⏭️ Draft the API spec
- [ ] Set up the GitHub repo
- [ ] Message Jo about timeline
```

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
   - **Stale** — `status: in-progress` but file untouched > 6 months (use git mtime).
   - **Should-archive** — `status: done` / `superseded` still in a live folder.
2. **Report** in the [reply shape](../../docs/reply-shape.md): a TL;DR with counts per category, then **You:**
   the groups that need a call, each with a recommended fix. File lists come
   after that, or in a linked file.
3. **Fix interactively** — offer per group (or per file). Apply only what the
   user approves. For orphans, propose a likely `parent` from context but confirm.
4. **Stop** when the user is done — do not force-fix everything in one pass.

---

## Common mistakes (all modes)

- Duplicating the schema here instead of pointing to `docs/data-model.md`.
- Asking broad open questions before offering context-based suggestions.
- Asking more than one question at a time.
- Long reports, or asks buried at the bottom; follow the [reply shape](../../docs/reply-shape.md).
- Writing empty frontmatter fields instead of omitting them.
- Fetching / inventing external backlog detail instead of surfacing the link.
- Bulk-editing in garden mode without a report-and-approve step.
