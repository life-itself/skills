---
name: portfolio
description: Add to, update, and garden the project/initiative portfolio in this repo (initiatives/, projects/, ideas/). One skill, three modes — add a new initiative or project, refresh a project's next actions, or run a hygiene sweep over the whole portfolio. Use when creating a project/initiative, capturing next actions, or doing periodic portfolio cleanup.
license: Proprietary
metadata:
  author: rgrp
---

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

## Data model

**Before writing anything, read [data-model.md](data-model.md)** (folders,
naming, frontmatter, status words, tasks in Beads, new-repo setup). Then check
for the repo's own `docs/data-model.md`: it adds to or overrides the generic
model, and wins where they differ.

The rules most often got wrong:

- The folder is the type; there is no `type` field.
- Projects are `projects/YYNN-<kebab-title>.md`, numbered per repo.
- Tasks are Beads issues labelled `project:<slug>`, never a `## Tasks` list.
- Omit empty fields.

**Lookup:** use `portfolio/index.js` if present (regenerate with
`node scripts/build-index.js` if stale) instead of reading every file.
**Empty repo:** follow "Setting up a new portfolio repo" in the data model.

---

## Mode: add

Add a new initiative or project. **Outflow-first**: let me brain-dump before any
questions, then you infer everything you can and check it fast.

1. **Take the outflow.** I'll usually just say "add a project/initiative" and
   dump. Don't interrogate field-by-field first. If I gave almost nothing, ask
   one open prompt ("dump whatever you've got") — not a schema.
2. **Duplicate check (always).** Before proposing anything, scan
   `portfolio/index.js` (or the files, if no index; skip in an empty repo) for an existing item with a similar title / slug /
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
     (projects should almost always have one; none yet → offer to create it).
   - **Tasks** — 2-5 candidate next actions pulled from the outflow (see step 4).
   - For each task, its `kind:` and `who:` labels.
   - Mention any other fields only if the outflow implied them (`github`, `url`,
     `tracker`, `phase`, `tags`). Don't ask for empty ones.
4. **Tasks.** Always offer initial tasks. Derive candidates from the outflow;
   if none are obvious, ask "any first actions?" — fine to leave empty if I say so.
5. **Write the file** once I confirm, per the data model: path and number,
   frontmatter, body = full description, no task list. If the parent keeps a
   `## Projects` list, add the new project to it. Create the agreed tasks in
   Beads, then rebuild the index if the repo has the script.

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

- Skipping the repo's local `docs/data-model.md`.
- Asking broad open questions before offering context-based suggestions.
- Asking more than one question at a time.
- Long reports, or asks buried at the bottom; follow the [reply shape](../../docs/reply-shape.md).
- Writing empty frontmatter fields instead of omitting them.
- Fetching / inventing external backlog detail instead of surfacing the link.
- Bulk-editing in garden mode without a report-and-approve step.
