---
name: session-checkpoint
description: Use when stopping, pausing, resetting, or handing off AI work in a destination repo (a linked project workspace) and the next action should survive the current session.
---

# Session Checkpoint

Use this when the user says "checkpoint this", "hand this off", "I'm stopping", or wants a clean new session — **in a destination repo**, i.e. one of the linked project workspaces this planning repo points at (`workspace:`/`github:` on a `projects/*.md` or `initiatives/*.md` entry), not this planning repo itself.

This planning repo's own stopping points are tracked in `bd`, not a `NEXT.md` — `bd prime` surfaces active state on session start, and `bd update`/`bd close` record what happened. There is nothing for this skill to write here. In a destination repo with `.beads`, local Beads holds the actionable state; do not duplicate that task list in `NEXT.md`. A short `NEXT.md` may remain as orientation or a pointer to the active Bead, but retire action-bearing checklist content. In a destination repo without `.beads`, `NEXT.md` remains the cross-session checkpoint this skill maintains.

## Procedure

1. Inspect the current work and summarize what changed in 1–3 bullets. If `.beads` exists, run `bd prime` and identify the active or next local Bead first.
2. Propose one next action. If it is genuinely unclear, use `needs-planning`; never invent false precision.
3. If `.beads` exists, update the relevant local Bead and write `NEXT.md` only when a short orientation pointer adds distinct value. Otherwise find the checkpoint file: root `NEXT.md`; if that name is already used incompatibly, use `planning/NEXT.md`.
4. When writing a checkpoint, create or replace the `## Current checkpoint` section. Prune stale
   non-checkpoint sections per the rule below; preserve anything still
   genuinely distinct.
5. Include the project/workstream, state (`ready` or `needs-planning`), next action, context pointers, optional GitHub issue link, and today's date.
6. Show the resulting checkpoint. Ask one short correction question only if the proposed next action or context is materially uncertain.

## Template

```md
## Current checkpoint

- **Project:** [project/workstream]
- **State:** ready | needs-planning
- **Next:** [one concrete next action]
- **Context:** [pointer to where the detail lives, not a restatement of it]
- **Issue:** [optional GitHub issue]
- **Updated:** YYYY-MM-DD
```

## Rules

- Keep the file to the current checkpoint; do not turn it into a backlog.
  When updating, **prune stale non-checkpoint sections** already in the
  file — dated priority/status snapshots, session-scoped caches, anything
  now covered by the planning repo's `bd` entries or a `plan-for-delegation`
  sweep — rather than preserving them indefinitely. Keep only content
  that's still genuinely distinct and has no other home (e.g. a true
  one-off note). When unsure whether something is safe to drop, ask rather
  than silently deleting it.
- **Pointer, not a copy.** If the work has its own portfolio project file
  in the planning repo (`## Inbox` with an `⏭️` marker, `status_notes`, an
  increment log), the checkpoint should *link to it*, not restate its
  content — "see the `⏭️` item on `[[project-slug]]`", not a re-narration of
  what shipped. The project file is the canonical detail; this repo's
  `NEXT.md` is a fast pointer for orientation. If a full recap seems worth
  writing, it belongs in the project's `status_notes` or increment log, not
  here.
- A clean handoff may record a review or decision as the next action, not only implementation.
- Do not create a GitHub issue just for a personal checkpoint.
- Do not commit or push unless requested.
- If no useful next action can be identified, record `needs-planning` and explain what is unresolved.
