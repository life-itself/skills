---
name: planning
description: AI-guided planning for this repo at three altitudes — week, day, and "what do I do right now". Live-reads the portfolio (projects/, initiatives/, week/, day/, bd inbox, `focus` beads) and the Google Calendar, then runs a low-friction interactive session and writes the plan. Use when planning the week, planning a day, or deciding what to work on next.
license: Proprietary
metadata:
  author: rgrp
  repo: planning
---

> **Repo-bound skill.** Expects a planning repo laid out as described in that repo's `docs/data-model.md` (paths below like `docs/`, `projects/`, `portfolio/index.js` are relative to that repo, not this skills repo). Install it per-repo (symlink into that repo's `.claude/skills/`), not user-level. Making the layout configurable at setup is an open item.

# Planning

One skill, three modes. All modes share the same **context core** and the same
principles: **suggest from context first, never start from a blank page; ask one
question at a time; keep it light; bias to commitment over completeness.**

Pick the mode from the user's ask:

- **week** — "plan my week", a Sunday/Monday, `/planning week`
- **day** — "plan today", "what's my day", `/planning day`
- **now** — "what do I do now", "decide next", "I have 30 minutes", `/planning now`

If unclear, ask which altitude in one line. (Month / quarter are not built yet —
say so if asked.)

---

## Context core (all modes)

Read **live** each session — do not rely on a cached index. Read only what the
mode needs (see each mode for depth).

Sources, in priority order:

1. `week/*.md` — most recent 2-4 weekly notes (tone, structure, open threads).
2. `day/*.md` — most recent few day notes (what's actually been getting done).
3. `projects/*.md` — the portfolio. Each file is an **outline**; frontmatter has
   `title`, `description`, `status`, optional `parent`, `github`, `tracker`,
   `url`. Detailed tasks usually live **elsewhere** (the project's own repo /
   GitHub) — this repo holds enough to know where I am in the big picture.
4. `initiatives/*.md` — the enduring efforts projects hang under.
5. `bd list` (bd/beads inbox — quick-capture open loops, replaced `INBOX.md` 2026-08-21; see [docs/plans/2026-08-21-inbox-to-beads-design.md](docs/plans/2026-08-21-inbox-to-beads-design.md)). Before using a selected linked local workspace as planning evidence, `git fetch --prune` it and fast-forward it with `git pull --ff-only` only when it is clean and merely behind its tracked remote; report dirty/diverged checkouts as stale instead of pulling them. Then inspect local Beads first when it has `.beads`; read its `focus`-labelled beads (`bd list --label=focus`) first. `NEXT.md` is legacy: use it only when the workspace has no `.beads` yet, and flag that workspace for migration to Beads.

**Calendar.** Pull what's already scheduled via the Google Calendar MCP:
`mcp__claude_ai_Google_Calendar__list_events` for the target window
(`rufus@lifeitself.org`). Default to events the user has **accepted / not
declined**. Use this to show committed meeting load and remaining capacity before
proposing focus. If the calendar tool is unavailable, say so and proceed without
it — never block planning on the calendar.

**Ticklers.** Skip projects with `status: paused` and a `tickler:` date in the
future — they were deliberately deferred. Surface them once the date has passed.
Same for task lines carrying `📆YYYY-MM-DD`. See
[docs/data-model.md](docs/data-model.md). When the user defers something
during a session, record it as a tickler rather than leaving it in the plan.

Treat `status: next` as explicitly selected near-term work and `status:
in-progress` as work already underway; do not promote `backlog` or `someday`
items without a planning decision.

**Do not** scan outside this repo unless the user changes scope. **Do not** reference dead paths (`projects.md`, `.taskgraph/`, `INBOX.md` — retired 2026-08-21). Planning-repository `bd` is the source of truth for project-level task state; use `plan-for-delegation`'s read-only `ready` mode after a recent sweep when the question is what is currently claimable. If the needed lane has not been reconciled recently, offer a sweep rather than treating a stale queue as authoritative.

**External tasks.** When a chosen project's detailed tasks live elsewhere, do not
try to fetch them. Surface the project's `github` / `tracker` / `url` and ask the
user to name the next concrete action.

---

## Mode: week

Goal: a small, calendar-aware week plan at **project/initiative level**. Not a
portfolio review — extract the few themes that matter this week.

Read: context core, focus on recent `week/*.md`, a scoped `plan-for-delegation` ready query when a recent sweep exists, local Beads for selected linked workspaces when present, then any legacy `NEXT.md` only where a workspace has no Beads yet, and a sample of the `projects/` that look live. Pull the week's calendar.

Interactive flow — **one question at a time**:

1. **Frame from the calendar.** Show what's already scheduled this week
   (meetings, travel, childcare, low-capacity days) and the rough free capacity.
   Note constraints directly ("Tue is mostly meetings").
2. **Project selection.** Propose a shortlist of 3-5 likely live areas from the
   repo. Ask which 3-5 to focus on. Allow add / remove / rename.
3. **Goal selection.** For each chosen area, suggest 1-2 candidate outcomes from
   the project files. Ask to confirm/edit. Bias to one goal if capacity is tight.
4. **Task selection (light).** For each goal, suggest a short list of concrete
   next moves. Keep it lightweight — not backlog grooming. Where detail lives
   external, surface the link and ask for the next action.
5. **Draft.** Write `week/YYYY-MM-DD.md` (dated the **Monday** of the target
   week). Reflect calendar constraints explicitly. If something clearly isn't
   happening this week, name it.

Output structure (match existing week notes):

```md
## Focus for this week

- [ ] **Project/area**: outcome(s)
    - [ ] concrete move
    - [ ] concrete move

## Admin / follow-ups

- short tail of important open loops

## Brainstorm (optional)

- rougher ideas, directions, tensions, possible bets
```

Prioritization: strategic/creative ahead of admin; keep Focus small (≤5 goals);
prefer projects that are active in the `bd` inbox (focus-labelled beads), strategically central,
close to shipping, or unblocked by a small decision. Use outcome verbs: clarify,
ship, decide, write, set up, unblock.

---

## Mode: day

Goal: a day plan grounded in the active week's focus and today's calendar.

Read: the current `week/YYYY-MM-DD.md` (the Monday-dated file covering today),
recent `day/*.md`, and the `projects/` named in this week's focus. Pull today's
calendar.

Interactive flow — **one question at a time**:

1. **Frame.** Show today's scheduled events and the real free blocks. Ask time
   available + energy (Low / Med / High) if not obvious.
2. **Pick the focus** from this week's Focus section (don't re-plan the week).
3. **Drill to next actions.** For the chosen project(s), suggest concrete next
   actions from local Beads when present, otherwise repo `## Tasks` / legacy `NEXT.md` / the planning `bd` inbox. Where the canonical
   tasks are external, surface `github`/`tracker`/`url` and ask the user to name
   the next action.
4. **Commit.** 3-5 actions max, sized to today's free blocks. Mark one ⭐ "if I
   only did one thing today".
5. **Draft** `day/YYYY-MM-DD.md` as a checklist, ⭐ first, matching existing day
   notes (use `[[project-slug]]` links and `⌛`/`✅` markers as in prior days).

---

## Mode: now

Goal: in ~5 minutes, leave with **one ⭐ startable micro-task** and stop. Ported
from `docs/protocol.md` + `docs/plan-with-me.md`. Planning time proportional to
work time (30 min of work → ~5 min planning).

Acts as a focused planning guide, not a coach. **One question at a time. Push
gently to commitment. Stop when done — do not re-plan.**

1. **Frame.** Time available (minutes)? Energy (Low / Med / High)?
2. **Inventory.** Surface 3-6 live projects from the repo (or ask the user to
   name them). Names only.
3. **Leverage.** Order top projects by leverage ("progress here makes other
   things easier/clearer"). No long justification.
4. **Scope gate.** Of the top two, which can produce a **finished artifact**
   today? If neither → meta-work (planning / clarification).
5. **Generate.** Write 4-6 candidate micro-tasks (10-30 min each, verb-first,
   immediately startable, no "think about", no external dependencies). Where
   tasks live external, surface the link and ask for the next action.
6. **Commit.** Pick 3-4 max. "If I only did one, which makes the day count?" →
   mark ⭐.

**Hard stop:** output the list as a markdown checklist, ⭐ first, then:

> "Planning is complete. Start the starred task now for 10 minutes. Do not
> re-plan. Return only if blocked."

Optionally append to today's `day/YYYY-MM-DD.md`. End the session.

Fallback if stuck generating: "When this work is *done enough*, what questions
could I answer confidently?" List 5-10, derive tasks, return to step 6.

---

## Optional: continue to specification

Planning selects work; it does not normally make that work ready to delegate. When the user explicitly says “spec this,” “start shaping this,” or equivalent, treat that as a user-triggered continuation into `plan-for-delegation` spec mode. Carry across the selected action, its portfolio project, the source day/week note or conversation context, and any known `workspace`/`github`/`tracker` pointer.

The delegation skill then creates or resumes a specification stub in the destination repo when possible (otherwise in this planning repo), records a thin pointer here, and runs the collaborative SCQ/issue-tree/specification session. Do not append this offer automatically to every day, week, or now plan, and do not describe the selected planning item as delegation-ready.

---

## Common mistakes (all modes)

- Turning a plan into a full portfolio review.
- Letting admin crowd out the top focus.
- Asking broad open questions before offering context-based suggestions.
- Asking more than one question at a time.
- Fetching / inventing external task detail instead of surfacing the link.
- Ignoring the calendar when capacity is the real constraint.
- Over-planning: stop before it feels "complete".
