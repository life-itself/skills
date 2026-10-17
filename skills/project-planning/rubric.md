# SCQ rubric

How to judge an SCQ produced by `project-planning`. Score each check **pass / weak / fail** and quote the line it rests on. Use it for self-check before sign-off, and for a separate critic agent when testing the skill.

Separate **substantive** problems (the question would change, or LTP would start from the wrong place) from **tidying** (wording, length, placement). Verdict "rewrite" only for substantive problems; tidying alone is "small edits" at most. Calibration: on the RTM run (2026-10-16) the critic said "rewrite" over tidying issues, and Rufus judged it good enough to move forward, missing only the root cause of the stall.

The real test is the owner's verdict: **sign off as-is / small edits / rewrite**. When comparing two versions (e.g. skill output vs an existing SCQ), use a blind pairwise "which is better and why" rather than absolute scores. Later, a downstream test: does LTP from this SCQ give a cleaner goal tree.

## Situation

- S1 **Agreed facts** — every bullet is something the owner and a sceptical colleague would both accept. Nothing arguable.
- S2 **Relevant** — each bullet is needed to understand the complication. Remove any that aren't.
- S3 **No smuggling** — no problem (belongs in complication) or solution (belongs in "Ideas offered").
- S4 **Concise** — bullets, one claim each, about 3–6, short sub-bullets only where needed.

## Complication

- C1 **Tension, not missing feature** — names a cost, a conflict or a change. "We have no X" is a solution in disguise.
- C2 **Concrete** — who feels it, what it costs, what happens if nothing is done.
- C3 **Follows from situation** — needs no new facts that should have been in the situation.
- C4 **Load-bearing** — without it, the question would lose its urgency.
- C5 **Gets to the essence** — for stalled work, names why it hasn't happened (the blocker or the indecision), not only that it hasn't.

## Question

- Q1 **One question** — not two joined by "and".
- Q2 **Follows from complication** — answering it resolves the tension.
- Q3 **Answer is the plan** — not a fact-finding question.
- Q4 **Criteria** — states by when, for whom, at what cost or effort, and what's off the table. No vague time words ("now").
- Q5 **Solution-neutral** — doesn't presume the answer.

## Issue tree

- T1 Branches are questions, not tasks.
- T2 Roughly MECE: branches don't overlap much and together cover the question.
- T3 Statuses (decided / proposed / open) are honest; "decided" names who and when.

## Process (for test runs)

- P1 The interviewer asked before drafting, one question at a time.
- P2 Playbacks kept the owner's wording.
- P3 Solutions offered by the owner were parked, not built on.
