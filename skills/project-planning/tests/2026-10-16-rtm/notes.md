# Interviewer notes — project-planning test, RTM v2 launch, 2026-10-16

Run: 10 exchanges (interviewer messages answered by the sim), including 3 playbacks (situation, complication, tree), 1 question proposal, 2 criteria turns and the sign-off. Signed off first time with one small edit. Sim round trip was fast (~6-30 s each); total about 20 minutes of agent time.

## Did the SCQ add anything on a well-defined project?
Yes, but mostly because orientation found the project docs were stale, not because of the interview. The planning-repo project file, NOW.md and bead pl-72f all describe a January one-report launch checklist; the repo's CHANGELOG and `docs/plans/2026-09-25-reader-layer-and-launch.md` show ~18 reports, about copy done, a Bluesky poster in dry-run and a missed 13 Oct launch date. The real value: the complication surfaced *avoidance* ("reaching for technical work because it felt easier") and the question shifted from "execute the checklist" to "what is the launch: archive or Jack Smith hook", which the bead's acceptance criteria do not ask. For a well-defined project the honest output may be "the plan exists; the problem is that it doesn't happen" — the skill has no branch for that, and LTP may be overkill when the answer is a date and 30 minutes of account creation.

## Skill problems
1. **"Never ask what you can read" vs "ask first" when the docs are rich and stale.** Principles say ask before drafting, but step 1 orientation found more than the user knew (sim even said "the docs don't tell me whether..."). I ended up playing back a situation largely from my own reading, which is effectively drafting. The skill should say: when context is rich, open with a short "here's what I read, what's wrong or missing" playback (it half-says this in a parenthesis), and check *recency* of sources: project file and bead were months stale against the repo.
2. **Step 0 and step 2 collide.** Step 0 says "explain, then go"; no instruction whether to send explain + first question in one message. I combined them. Fine, but say so.
3. **Step 4 asks two questions in one step.** "Is this the question?" then "what would make an answer good enough? by when, for whom, cost, off the table" — the criteria prompt is itself four questions, against "one question at a time". Took two turns, and "off the table" needed its own follow-up because users answer the first three and skip it.
4. **Output file location is ambiguous for this case.** The project has a root question file (`docs/ROADMAP.md`) but it's a feature roadmap, not this work's question tree; the rule "if the repo has a root question file, use its tree and put SCQ at the top" would have wrongly put the launch SCQ on top of the product roadmap. Need: "root question file *for this piece of work*", with a test.
5. **Sign-off with an edit.** "I'd sign off; just make clear X" — skill says "revise until yes" and "do not go past without explicit yes". I applied the edit and recorded sign-off without re-asking. Skill should say whether a conditional yes with a trivial edit counts.
6. **Facts the user gets wrong.** Sim said "the midterms window has already passed" (false: 3 Nov is 18 days out). "Play back in the user's words" conflicts with keeping the situation factual. I corrected it inline in the complication playback. Skill should say: correct factual errors in playback, flagged, rather than preserve wording.
7. **Status vocabulary in the tree.** "decided" requires who and date; "proposed" by a prior plan doc has no who — I used the doc date. Also "partly decided" came up naturally and isn't in the vocabulary.
8. **Hand-off assumes the new session is in the destination repo**, but the LTP skills live in `~/src/life-itself/reasoncommons/skills/` — will `ltp-project` be discoverable from the RTM repo session? The prompt should probably name the skill path.
9. **Time pressure is invisible.** A 3 Nov target with an LTP run then a beads/implementation step before any posting is a lot of process for 18 days; the skill has no "is this worth LTP?" check after the SCQ.

## Improvised
- Read CHANGELOG.md and the 25 Sep plan beyond the listed sources (the sim could not see them; it accepted them in playback).
- Pasted the full SCQ into the transcript for the sign-off turn, since the sim only sees the transcript.
- Rewrote the user's "X and learn Y" question as "X so that Y" to pass Q1 (one question) — arguably steering wording.

## Rubric self-check (before sign-off)
S1-S4 pass (S4 weak: 6 situation bullets, at the limit). C1-C4 pass. Q1 pass after rewrite; Q4 pass; Q5 pass. T1 pass; T2 weak: "which steps only Rufus can do" and "what stops it slipping" overlap, as do "what is the launch" and "what do we post". T3 pass. P1 weak (situation playback was mostly my reading), P2 pass, P3 pass.
