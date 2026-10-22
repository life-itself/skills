---
name: plan-for-delegation
description: Use when choosing what to work on next across the portfolio, starting structured specification for selected work, or preparing work for eventual AI delegation.
license: Proprietary
metadata:
  author: rgrp
  repo: planning
---

# Plan for Delegation

Three modes:

- **spec** (default) — selected item or rough description → recorded specification stub → SCQ → issue tree → draft task specs → further repo-local design as needed.
- **sweep** — "what should I do next?" — rank the whole portfolio into
  delegatable-to-AI / needs-you / needs-definition lanes, computed fresh
  each time.
- **ready** — "what is claimable now?" — return a read-only, scoped queue from reconciled Beads state.

## Mode: sweep

As of 2026-08-21 this is an **audit**, not a derivation. Actionable task
state lives in `bd`, not in project frontmatter or prose — see
[docs/plans/2026-08-21-bd-task-layer-design.md](../../docs/plans/2026-08-21-bd-task-layer-design.md).
The sweep's job is to read what `bd` already claims, spot-check the claims
that are old enough or important enough to doubt, and propose corrections —
not to re-derive every lane assignment from scratch every time. Apply those corrections only when the user has authorized the reconciliation. Phase 1 of
that design did this by hand once: read 9 projects against their real
sources, found 6 materially stale. That's the failure mode this mode now
exists to catch on an ongoing basis, cheaply.

**Step 1 — read the two layers.**

- `portfolio/index.js` (`globalThis.PORTFOLIO_INDEX`; regenerate with
  `node scripts/build-index.js` if stale) — `status`, `due`, `tickler`,
  `parent` for every project/initiative/idea.
- `bd list --label-pattern 'project:*' --all` — every project-linked task
  entry. Each carries `project:<slug>` plus `kind:plan`/`kind:run` (needs a
  plan first, or ready to execute) and `who:ai`/`who:collab`/`who:rufus`
  (AI finishes it unattended; AI drafts with Rufus steering live; or gated
  on Rufus's review/decision/hands/relationship). Blocking is a `bd dep` edge —
  `bd blocked` shows what's gated and by what.
- For each selected linked workspace that exists locally, refresh it before trusting its task state: run `git -C <workspace> fetch --prune`, inspect branch status, and run `git -C <workspace> pull --ff-only` only when the checkout is clean and simply behind its tracked remote. Do not pull a dirty or diverged checkout; report it as stale and inspect the remote tracker/source instead. Then check for `.beads`. When present, inspect its local Beads (`bd -C <workspace> list` and, when useful, `bd -C <workspace> blocked`) as that repo's primary task state. Check its `focus`-labelled beads first. When `.beads` is absent, the linked tracker or the project body is the source to inspect; a legacy `NEXT.md` is supporting context only and the workspace should be flagged for migration to Beads.

**Step 2 — candidate pool.** `status: next|in-progress|backlog|someday` from
the index, excluding `paused` items whose `tickler` is in the future
(deliberately deferred — see `docs/data-model.md`). Wider than just
`next|in-progress` on purpose — genuinely important work often isn't
labeled `next` yet.

**Step 3 — gather evidence, then propose reconciliation.** For each candidate:

- **Has open bd entries already** — trust them by default. Spot-check (open the actual source — local Beads when the linked repo has `.beads`, then GitHub issues (or a legacy `NEXT.md`, flagged for migration) as appropriate, or the project file's own body) any entry that is: older than
  ~7 days since its last update, carries no `updated`/recency signal at
  all, or is about to be surfaced as a top-ranked item in the report below
  (the cases that matter most are exactly the ones worth a real check,
  same as Phase 1). If the check finds it stale, propose a `bd update`, defer, closure, replacement, or dependency-edge change with the evidence source. Apply only after authorization, then use the corrected entry in the report and note material corrections the way the Phase 1 evidence log in `projects/2026-bd-task-layer.md` does for its own project.
- **Has no bd entries, but is `next`/`in-progress`** — this is a gap, not
  an absence of work. Read the actual source (project body, linked
  `workspace`/`github`/`tracker`) and propose a new bd entry: `kind:`,
  `who:`, one-line description pointing at the source, `project:<slug>`
  label. Report it as a proposed addition with its evidence source; don't create it without confirmation.
- **Has no bd entries and is `backlog`/`someday`** — leave it alone unless
  it's genuinely being pulled forward this sweep. Absence of a bd entry is
  itself the correct signal for inert backlog; don't manufacture one.

**Place each candidate with open bd entries in exactly one lane** (a
project with entries split across kind/who still lands in one lane — pick
by its most actionable open entry):

1. **Delegatable to AI** — has an open bd entry with `who:ai` (AI can
   finish it unattended, whether `kind:run` or a `kind:plan` feasibility /
   brief), and no unresolved `bd dep` blocking it.
2. **AI-collaborative** — has an open bd entry with `who:collab`: planning,
   strategy, or design where AI drafts but Rufus steers in a live session.
3. **Gated on you** — has an open bd entry with `who:rufus`: a review,
   decision, relationship, or physical action only Rufus can do.
4. **Needs a next action defined** — `status: next|in-progress` with no
   bd entry and nothing in the source worth turning into one yet (surfaced
   per Step 3's second bullet). A blank spot is information, don't drop it
   silently.

**Rank within the three "ready" lanes** (Delegatable, AI-collaborative, Gated on you) — computed
fresh every sweep, never stored as a field (it goes stale the way a
hand-maintained priority list always does):
(a) friction — how little stands between this item and being actionable,
lowest first; (b) real deadlines or decay risk (`due`/`tickler`, a `bd`
priority, data that could be lost, a stalled launch); (c) leverage —
unblocks other work (check `bd blocked`) or ships something visible. Say
which criterion is doing the work for the top few — don't just present a
bare ranking.

**Report in the [reply shape](../../docs/reply-shape.md).** Open with a TL;DR: the 1–3 things to do next and why. Then **You:** at most 3 items that need the user's decision or a session with them, each with a recommendation. Name projects and tasks in plain words, with IDs in brackets. The full table comes after that, or in the sweep's dated file if it is long: one row per item, grouped by lane:

| Lane | Project | bd entry | Why ranked here | Suggested next |
|---|---|---|---|---|
| Delegatable | [[project-slug]] | pl-xxx | low friction, `due` in 3d | run it |
| AI-collaborative | [[project-slug]] | pl-zzz | gates two delegatable tasks | book a session |
| Gated on you | [[project-slug]] | pl-yyy | high leverage, blocks two others | decide |
| Needs definition | [[project-slug]] | — | `status: next`, no bd entry, no source next action | define a next action |

**Offer reconciliation changes, don't act without confirmation.** Recommend one batch ("apply 1 and 3 now") rather than asking about each change:
1. Run spec mode on chosen Delegatable candidates.
2. Create the proposed bd entries for gaps found in Step 3.
3. Correct any bd entries found stale during spot-checking.
4. Write `status: next` / `due` / `tickler` onto any items the user confirms
   as genuinely prioritized right now — report the inference, apply only on
   approval.

When changing dependencies, use `bd dep add <dependent> <blocker>` only for a distinct hard gate, not loose sequencing or a shared topic. After an authorized edge change, inspect `bd blocked` and `bd show <id>` for affected tasks; run `bd orphans` before concluding a sweep.

Never write to `bd`, `status`, `due`, or `tickler` without confirming with the user first. A user request to reconcile, correct, or apply the sweep's proposed changes is sufficient confirmation for that batch.

## Mode: ready

This mode is read-only. It answers what can start now from already reconciled Beads state; it does not scan every portfolio source, change task state, or silently combine Beads databases.

**Step 1 — name the scope.** Default to this planning repository. If the user names a linked workspace, query that workspace explicitly with `bd -C <workspace> ...`; its local Beads is an independent detailed task database. State the scope in the result.

**Step 2 — select the narrowest supported view.**

```bash
# Planning-repository work AI can claim now
bd ready --label=who:ai --sort=priority

# Planning-repository work where AI's immediate output is a plan or brief
bd ready --label=who:ai --label=kind:plan --sort=priority

# Planning-repository work to do with AI in a live session
bd ready --label=who:collab --sort=priority

# Planning-repository work gated on Rufus
bd ready --label=who:rufus --sort=priority

# Broad portfolio context, including blocked and deferred planning entries
node scripts/list-beads-by-initiative.mjs --by-initiative

# Why work is not claimable
bd blocked
bd show <bead-id>
```

`bd ready` is canonical for a narrow queue because it excludes dependency-blocked, deferred, and in-progress work. The grouped CLI is a complementary planning-repository view, not a cross-repository aggregator.

**Step 3 — report compactly.** Return task, portfolio project/initiative, `kind:`, priority, source pointer when known, and any material caveat. If no recent sweep has reconciled the relevant lane, say that the queue is provisional and offer a sweep; do not invent a short-lived `48h` label.

## Mode: spec

For big or new work (a small product, a significant feature or area, infrastructure, a team process) where the problem itself is unclear, use the `project-planning` skill instead: it interviews the user to build the SCQ, gets sign-off, then hands off to a Logical Thinking Process session. Spec mode below drafts for the user to react to and suits work already close to delegation.

## Overview

This is a high-level structured specification session. You give a selected planning item or rough description (2-3 sentences is enough); the skill records a starting stub, reads the relevant context, drafts an SCQ and issue tree, and proposes a preliminary delegation spec for each leaf task. You react to the draft, and the session continues until the important scope and design decisions are explicit.

This mode complements feature brainstorming and design workflows such as `superpowers:brainstorming`: it supplies the problem overview and decomposition that those workflows can take into detailed repo-specific design. It does not bypass design work, and its first draft is not automatically delegation-ready. `ready_to_spec` means precisely that this shaping work still needs human judgment.

The design principle: **produce first, ask second.** Never start from a blank page. Reduce your role to critic and approver, not generator.

## Inputs

- A selected planning item or rough description (required — just a few sentences)
- Relevant files in the current repo (auto-detected from the description)
- Optional source-planning pointers carried from an earlier planning session

When invoked globally from a project workspace, treat the current repo as the destination context. A planning portfolio project, day/week note, or `bd` inbox is optional source context, not a prerequisite; do not assume those planning-only sources exist in an unrelated destination repo.

## Flow

### 0. Route and record the specification session

If the item already has a `workspace` or an available local checkout corresponding to `github`, run the specification session in that destination repo. Follow that repo's own design conventions; when it has none, default to `docs/plans/YYYY-MM-DD-<topic>-design.md`. If no destination repo exists yet, create the stub in this planning repo under `docs/plans/`.

Create or resume a specification stub before expanding the design. Never overwrite an existing stub. Record only what is already known:

- source planning item and portfolio project
- current intent or desired outcome
- destination repo and relevant context pointers
- known constraints or decisions
- open questions the specification session must resolve
- readiness state: shaping, not delegation-ready

Use this minimal body unless the destination repo has its own template:

```md
# <Topic> — Specification

Status: shaping (`ready_to_spec`; human design input still required)

## Source

- Planning item: <selected action and source note or conversation>
- Portfolio project: <path or link>

## Intent

<What outcome currently seems desirable, without inventing unresolved requirements.>

## Known context

- Destination repo: <path or URL>
- Relevant files/decisions: <specific pointers>
- Constraints already decided: <list or “none recorded”>

## Open questions

- <Questions the collaborative specification session must answer before implementation can be delegated.>
```

This planning repo's job stays a thin pointer when the stub lives elsewhere: record the destination path in the portfolio item's `status_notes`, and create a `bd` entry (`kind:plan, who:collab, project:<slug>`) pointing at the stub, only after confirmation. Do not duplicate the destination spec into the portfolio file.

### 1. Read context

Before responding, read:
- The destination repo's local instructions, relevant files, history, and local Beads when `.beads` exists; `focus`-labelled beads first; read a legacy `NEXT.md` only as supporting context when present
- The source portfolio project or day/week note when the selected item carries that pointer
- The planning repo's related `bd` captures only when the session originated there and they are relevant

Do not ask what to read. Infer it.

### 2. Draft SCQ

Produce a draft SCQ (Situation / Complication / Question) from the user's description and the context you've read. Be opinionated. Do not hedge.

### 3. Produce issue tree

Break the Question into 3-7 sub-questions or hypotheses. Structure as a tree. Each leaf should be:
- independently resolvable (no dependency on other leaves)
- concrete enough to hand to an AI with no further clarification
- scoped to 30 min–2 hr of work

Flag any leaves that have dependencies and suggest sequencing.

### 4. Draft task specs

For each leaf, draft a delegation spec:

```
**Task:** [leaf name]
**Outcome:** [one sentence — what does done look like?]
**Constraints:** [2-3 things NOT to do]
**Context:** [files, docs, or decisions the AI needs — be specific with paths]
**Pre-answered questions:** [anticipated mid-run questions, answered upfront]
```

These are preliminary until the unresolved design decisions have been answered. A well-formed draft is useful shaping output; it is not evidence by itself that the task is ready for autonomous implementation.

### 5. Ask one question

After producing everything, ask exactly one question:

> "What would you change — in the SCQ, the issue tree, or any of the specs?"

Then revise based on the answer. Do not ask multiple questions.

### 6. Record the resulting readiness

After revision, assess the result honestly against the two-axis model in
[docs/bd-task-conventions.md](../../docs/bd-task-conventions.md):

- `kind:plan, who:collab` while scope, approach, constraints, or what
  "done" means still need shaping in a session — AI drafts, Rufus steers
- `kind:plan, who:rufus` when all that remains is a discrete decision or
  review only Rufus can make (e.g. approve the draft spec)
- `kind:run, who:ai` only once the spec is input-free and has passed the
  pre-flight checklist below — an AI can take it autonomously from here

Report the assessment first and create or update the `bd` entry
(`project:<slug>` label, pointing at the stub) only with confirmation.

## Output

- A created or resumed specification stub in the destination repo when one exists, otherwise in this repo
- Draft SCQ, issue tree, and preliminary task specs in that stub
- A thin pointer in this planning repo when the full stub lives elsewhere
- A proposed `bd` entry (`kind:`/`who:` labels, `project:<slug>`) reflecting the assessed readiness, written only after confirmation
- Optional: a "pre-flight checklist" for each spec (see below)

## Pre-flight Checklist

Before any spec is handed off, it should pass:
- [ ] Outcome is a concrete artifact or state, not a process ("a written spec" not "research X")
- [ ] Constraints cover the most likely failure modes
- [ ] Context pointers are specific file paths, not vague references
- [ ] Anticipated questions are answered upfront
- [ ] Scope is small enough to complete in one session without human input

If any item fails, revise the spec before handing off.

## Style

- Be direct and opinionated. The user's job is to react, not generate.
- Every message to the user follows the [reply shape](../../docs/reply-shape.md): TL;DR, at most 3 asks with recommendations, small choices decided and listed, detail last.
- Keep specs short. Verbosity is not thoroughness.
- Flag dependencies explicitly — don't bury them.
- If the rough description is genuinely too vague to produce anything useful, ask one clarifying question only.

## Common Mistakes

- Asking too many questions before producing anything
- Producing a spec that requires the AI to make the decisions the user should have made
- Leaving "context" vague ("see the project notes") instead of specific ("see `projects/flowershow.md` lines 20-35")
- Making leaf tasks too large to complete autonomously
- Forgetting to answer anticipated questions upfront
