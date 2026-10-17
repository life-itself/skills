---
name: project-planning
description: Use when starting a small product, a significant feature or area of work, infrastructure, or a team process or pattern, and you want to plan it properly before building. Walks the user through capturing the situation, complication and question (SCQ) and a first issue tree, writes them to a file, gets sign-off, then hands off to a fresh Logical Thinking Process (LTP) session. Usually invoked explicitly. Not for routine software features.
license: Proprietary
metadata:
  author: rgrp
  repo: planning
---

# Project planning (SCQ, sign-off, hand off to LTP)

Rufus's method for detailed planning of work that is big or new enough that building straight away would be a mistake. This skill covers the first half; the second half is deliberately separate.

1. **Walk the user through the SCQ** and a first issue tree (this skill).
2. **Write it to a file** with a standard shape (this skill).
3. **Sign-off gate** (this skill).
4. **Hand off to LTP** in a new thread (this skill stops here).
5. LTP gives a solid plan. Then: turn it into beads and an implementation plan, marking what needs AI and what needs human review; review; go. *Not written yet* — until it is, do it by prompting. See "Not yet covered".

## When to use

Use for: starting a small product, a significant feature or area of work, infrastructure, designing team processes or patterns.

Do **not** use for routine software features. Those need a job story or a quick clarification, not this.

This skill is usually invoked explicitly. If, in another session, the work looks like it fits, flag it in one line ("this looks like a `project-planning` job; want to run it?") and carry on. Do not start it unasked.

## How it differs from `plan-for-delegation` spec mode

Spec mode takes a rough description, **drafts** the SCQ, issue tree and leaf specs, and asks "what would you change?". It is for work already close to delegation. This skill is the opposite: the **user supplies the thinking by being asked**, you play it back, and the output is an agreed SCQ that feeds LTP — not a delegation spec. Use spec mode when the problem is already clear; use this when it is not, or when the plan is big enough to warrant LTP.

## Principles

- **Prompt, don't draft.** Do not open with "here is a draft SCQ". Ask the user to talk, then play it back. The user is the source; you are the interviewer and editor. (If context files already hold a lot, say what you've read and ask what's missing or wrong — still ask first.)
- **One question at a time.** Short questions, plain words. Wait for the answer. A message may carry a short playback or explanation plus one question, never two questions. Ask neutrally: don't offer examples or candidate answers before the user has answered.
- **Play back in the user's words.** After each part, restate it in two or three lines and ask "is that right?" Keep their wording, including rough edges.
- **Capture the issue tree while listening.** Questions come up as the user talks about the situation and complication. Note them as they appear; do not run a separate tree-building phase.
- **Stay out of solutions.** If the user starts proposing answers, park them under "Ideas offered" and return to the situation. Solutions come after LTP.
- **Do the reading yourself, then check it.** Read the repo, the bead and linked notes before the first question. Never ask the user for something you can read. But docs go stale: note each source's date, prefer the newest evidence (git log, recent files) over old plans, and put anything you read (not heard) into a playback as "I read X (dated Y) — still true?" rather than stating it as fact.
- **Label what's certain.** In playbacks and in the file, keep three kinds apart: confirmed facts, things the user is unsure of, and guesses. Mark guesses `(guess)`.

## Flow

### 0. Explain, in a few lines

Tell the user what is about to happen: we'll capture the situation, what's not working, and the question that follows; I'll write it to a file; you sign it off; then you run the Logical Thinking Process on it in a new thread. Say it takes about 10–20 minutes of talking. Do step 1 first, then send this explanation and the first situation question in one message.

### 1. Orient (silent)

Read what exists: the bead or project file that started this, the destination repo's `CLAUDE.md`, existing plans (`docs/plans/`), any root question file (e.g. `ROADMAP.md`, see `docs/decisions-and-work.md`). Pick the output file (below). If a file already exists, resume it; never overwrite. If an earlier SCQ or SCQH exists elsewhere (e.g. a `MOTIVATION.md`), or this work sits under a parent question (e.g. a strategy doc), say so in the first message and link it from the new file rather than silently choosing.

### 2. Situation

Ask: **"Tell me about the situation. What are you working on and what is true today?"**

Play back as 3–6 concise bullets both of you would agree are *facts*. Check: is every statement uncontroversial? Move anything arguable to the complication. Fold in what you read, flagged for checking (see Principles).

If the user doesn't know the facts (common for team processes, where others hold them), don't invent them: record "unknown — <who would know>" and either pause to ask those people before sign-off, or carry it as the first tree branch, marked as fact-finding to do before LTP.

### 3. Complication

Ask: **"What isn't working, or what has changed that makes this a problem?"**

Probe once or twice, one at a time: *"Who feels it? What does it cost? What happens if we do nothing?"* Then the reality check: **"What's the evidence this is a real problem — a concrete case where it bit?"** If the work is stalled or keeps slipping, ask the root-cause question on its own: **"Why hasn't this happened already?"** Push past the first answer to the blocker or indecision underneath (e.g. a step that needs a human, or no decision between two ways of doing it); that is usually the real complication. If the evidence is thin, say so plainly: the question becomes conditional (first find out whether the problem is real), and "is this the real constraint?" becomes the first tree branch. Play back. A complication names a tension or a cost, not a missing feature ("we have no dashboard" is a solution in disguise; "we cannot tell whether anyone visits tryinbox" is a complication).

### 4. Question

Propose a single question that follows from the complication and ask the user to fix it: **"Is this the question we are trying to answer?"** Aim for a question whose answer would be the plan. If the user's wording is two questions, split and ask which is the real one; park the other in the tree.

The question must carry **qualifying criteria**: the constraints a good answer has to meet, so "how do we X" becomes "how do we X, by <when>, for <whom>, within <budget / effort / what we won't change>". Ask for criteria one at a time (by when; for whom; effort or cost; what's off the table), skipping any already answered. "Off the table" is the one users skip; always ask it on its own. Write the question as one line, then the criteria as short bullets under it. If the user has no answer for one, propose a value marked `(guess)` and ask them to accept or change it; guesses are fine at sign-off if labelled. A question with no criteria at all is not ready for sign-off. Vague time words in the question or criteria ("now", "soon", "quickly") become a date or a duration.

### 5. Issue tree (while capturing)

Throughout steps 2–4, keep a running list of sub-questions. Now play the tree back: the main question at the top, 3–7 branches, each a question (not a task). Ask: **"What's missing, and what here is not really a question?"** Mark each question's status with the vocabulary from `docs/decisions-and-work.md`: decided / proposed / open. No tasks and no trackers in the file: if a question needs work, name the bead only after the user agrees to one.

### 6. Write the file

Write to the pattern below, show the user the path, and say what you left out.

Before showing it, self-check against [rubric.md](rubric.md) and fix any fail.

### 7. Sign-off gate

Ask exactly: **"Sign off on this SCQ and question tree? Anything to change before we go to LTP?"** (Step 6's "here's the file" can share this message.) Revise until the user says yes. Record the sign-off in the file (date, who). Do not go past this point without an explicit yes. A "looks fine, go" counts. A conditional yes ("yes, once X is clear") counts once you've made the change and shown it; record the condition. If the user states something in sign-off that contradicts what you read, ask which is right before recording it.

### 8. Hand off to LTP

Do **not** run LTP in this thread. It is a large skill and will crowd this conversation. Instead:

1. Say: "SCQ is signed off at `<path>`. LTP is best run in a new thread so it has room. Start a new session in `<repo>` and run it there."
2. Give the user the exact prompt to paste, for example:

   ```text
   Use the ltp-project skill on <path-to-scq-file>. Treat the SCQ as the situation, complication and goal; the tree questions are candidate assumptions and open questions. Write the candidate ltp.yaml and report, then summarise the judgment calls I should check first.
   ```

   (For a live, conversational pass with the user, use the `reason-commons` skill instead of `ltp-project`.) The Reason Commons skills live in `~/src/life-itself/reasoncommons/skills/`; they are not part of this repo, so point at them, don't copy or edit them.
3. Add a "Next" line to the file: LTP not yet run; when done, return to turn the result into beads and an implementation plan.
4. Offer to open the new session (`start_session`, with this file as context) only if the user asks.

Stop here. Do not create beads yet unless the user asks.

## Output file

One file per piece of work, in the destination repo:

- If the repo has a root question file for this work (e.g. `ROADMAP.md`) use its tree and put the SCQ at the top.
- Otherwise `docs/plans/YYYY-MM-DD-<topic>-scq.md`. In this planning repo with no destination repo: `docs/plans/` too.

```md
# <Topic> — SCQ

Status: draft | signed off <date> by <who>
Source: <bead / project / conversation>

## SCQ

### Situation
- <fact>
  - <short supporting detail, if needed>

### Complication
- <tension or cost>

### Question
<one question>

Criteria:
- <by when / for whom / budget or effort / what's off the table>

Issue tree:
- <sub-question> — open
  - <sub-sub-question> — open
- <sub-question> — decided: <answer> (<who>, <date>)

## Ideas offered (parked)
- <solution the user floated; not evaluated>

## Next
LTP not yet run. Run `ltp-project` (or `reason-commons`) on this file in a new thread.
```

Markdown pattern: Situation, Complication and Question are always headings, one level below the section that holds them (here `## SCQ` → `###`; inside an existing root file such as `ROADMAP.md`, nest them under whatever level fits). The issue tree is plain nested bullets directly under the Question (after its criteria) — no separate section, no tables. Situation and complication are **concise bullets**, one claim each, with short sub-bullets where a point needs support. No paragraphs. Keep any prose in long lines; do not hard-wrap.

## Not yet covered (come back to these)

- **Turning the LTP result into beads and an implementation plan**, marking AI vs human review, then review and go. Until written, do it by prompting: read the LTP report, make `kind:`/`who:` beads per `docs/bd-task-conventions.md`, and show the plan to the user before creating anything.
- **Whether SCQ-first beats straight-to-LTP.** Keep a log (`skills/project-planning/test-log.md`) with one entry per run: project, which route, what LTP surfaced that the SCQ missed or the reverse, time cost. Don't claim a verdict from one run.
- Possible later extraction of "capture a good SCQ" as its own small skill, with `project-planning` as an overarching skill that sequences it, LTP and the implementation-plan step.
