---
name: project-status-report
description: Use when asked "where are we?", for a status overview, or for a launch-readiness check on a project planned with the Logical Thinking Process (a goal tree with critical success factors, and a transition plan) and tracked in Beads. Gathers status from the beads and checks it against the repo, then writes a short report — TL;DR, a goal-tree table, one ASCII dependency graph per track, asks and decisions. Not for a daily task list or a changelog.
license: Proprietary
metadata:
  author: rgrp
  status: draft
  origin: sor-website status reports, planning session (2026-10-23); feedback in docs/project-reporting-notes.md
---

# Project status report (Beads + LTP plan)

Tell the owner, in a few minutes of reading, how close the project is to its goal, what is blocking it, and what they need to decide. The report is measured against the plan's goal tree, not against the task list: a project can close many beads and still be far from its goal.

Worked example, with the earlier drafts Rufus rejected: [references/sor-website-2026-10-23.md](references/sor-website-2026-10-23.md).

## Inputs

- **The LTP plan**: goal tree (goal, critical success factors CSF1…n, necessary conditions) and transition (streams, steps, done conditions). Usually `docs/plans/ltp/<project>/`. Read the goal tree in full; it is the frame for the table.
- **Beads**: the goal or launch bead (the one that says "done means public", "v1 live" and so on), what it depends on, the `focus` beads and the stage labels.
- **The repo**: git log, merged branches and the live or preview site, to check what beads claim.

If there is no goal tree, say so and report against the transition streams instead; do not invent CSFs.

## Gather

1. `bd list --label=focus`, and read each focus bead's notes: the current work and what sessions said about it.
2. `bd show <goal bead>`: **quote its done condition and report against that bar**, not one you made up ("4 of 9 pages signed off" is wrong if the bar is "Home, About, Podcast, Courses signed off; the rest at review").
3. `bd dep tree <goal bead>`: the edges are the `[blocks]` lines; `[parent-child]` lines are context, and a shared node is shown once.
4. Stage labels per page or feature (`bd list --all --label=stage:signed-off`, `--label=stage:review`). `--all` matters: plain `bd list` hides closed beads. The listing also prints unlabelled children as tree context and counts labelled child tasks, so count pages, not rows. Read the label, not only the status: a bead can be `in_progress` while its page is signed off.
5. **Map every CSF to its beads.** For each CSF, find the beads that close its gap, whether or not they hang off the goal bead. Work that matters often is not a formal dependency (forms wiring was not under the SoR launch bead). Anything you find that way goes in the graph, and if it should block the goal, say so as an ask.
6. **Check claims against the repo.** For anything you would mark done: is it merged (`git fetch`, then `git branch -a --merged origin/main`; a worktree's local `main` may be stale)? Is it live (fetch the URL)? Is all of it done, or only the v1 part? When the bead and the repo disagree, the repo wins: draw what is true and log it under **Decided** ("Redirects ●: merged, bead still open"). Say what you could not check.

## Report shape

Follow [reply shape](../../docs/reply-shape.md). A full report runs past one screen, so in chat: one-line TL;DR at the top, then the detail (2–3), then the full TL;DR, **You:** and **Decided:** at the end.

1. **TL;DR**: one or two lines. Honest about slips: if a target date has passed or will, say so and give the new estimate.
2. **Goal-tree table**: one row per CSF. Columns: CSF (short name) · status 🟢 met, or on track for the target / 🟡 gap that will close by the target / 🔴 will not be met by the target, or blocked · what is live · the gap · the bead that closes it (plain name first, then ID).
3. **One ASCII graph per track** (rules below).
4. **You:** at most three asks, each with a recommendation and one line of reasoning.
5. **Decided:** one-liners for the small choices you made (e.g. "treated Papers as at review: page live, sign-off pending").

## Graph rules

- **Nodes are features or milestones**, not tasks ("Join page", "Forms on", "Old-domain switch"). **Edges mean "needed before".**
- **Legend on every graph**: ● done · ◉ at review (built, waiting on a person's eyes: review, sign-off, a decision) · ◐ being built · ○ not started. The fill goes up as the work moves along. Keep "review" apart from "in progress": a page waiting on a person is not being built, and lumping them hides where the bottleneck is (Rufus, 2026-10-23). Stick to one-character-wide symbols: emoji such as 👀 break ASCII alignment. Beads uses ● for *blocked* and ✓ for closed; state the legend so nobody reads it the Beads way.
- **Layers, top to bottom**: foundations → features or pages → ready to go public → final human review → goal. One layer per band, plenty of space, a status note at the right of each line where it helps. Not left to right on one line per stream: that was unreadable.
- **One graph per track** (e.g. Track 1: the v1 site; Track 2: the system for the team to edit it), so each has room.
- **Split partly-done nodes.** If only the v1 subset is in, draw "v1 subset ●" and "archives ○", never one "content imported ●".
- **Progressive detail.** First pass: one simple graph per track, layers collapsed to one node each ("Pages: 4 of 9 signed off"). Then, if asked, the expanded graph or one graph per layer.
- **Coverage**: every gap in the table, whatever its colour, appears as a node in the expanded graphs; the first pass may fold it into a layer, marked ◐ not ●.
- **ASCII in chat** (dense, renders anywhere, cheap to edit); SVG or Mermaid only for a published page.

## Anti-patterns

- **Progress bars per vague area** ("guard 60%", "landing 40%"). The areas mean nothing to the reader, and bars give each the same weight when one is a link-preview check and another is every page on the site.
- **Partly done shown as done**: one ● hiding a missing archive, an unmerged branch or an untested integration.
- **Big work missing from the graph** because it is not under the goal bead.
- **Task counts as progress** ("41 of 60 beads closed"). Report against CSFs.
- **Restating the plan.** The owner wrote it; report the gaps.

## Before showing

A strong-model subagent checks the report against the beads, the repo and this file (every ●, and coverage); fix what it finds.

## Not yet covered

- Reporting change since the last report (a diff of statuses) once reports are saved somewhere regular.
- Whether to save reports to `docs/status/YYYY-MM-DD.md` in the project, or keep them in chat only.
