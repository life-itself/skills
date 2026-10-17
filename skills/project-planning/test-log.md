# project-planning test log

One entry per run. Purpose: learn whether SCQ-first beats going straight into LTP, and where the skill's prompts fall short. Don't claim a verdict from one run.

## 2026-10-16 — analytics one view (marketing-861.28) — paper test of the SCQ half

Type: paper test, not a live interview. Ran the skill's steps 2–6 against the SCQ already drafted in `~/src/rufuspollock/marketing/docs/plans/2026-10-16-analytics-one-view.md` to see what the interview would have changed. LTP half not yet run on this example.

Route: SCQ-first (that plan was written SCQ-first, with LTP optional afterwards). No straight-to-LTP arm yet; one is needed on a second project for a real comparison.

What the skill's checks would have changed:

- **Situation:** facts only, mostly passes. One item arguable: "Getting data out is harder than displaying it" sits in the complication, which is right.
- **Complication:** mixes a real complication ("cannot say whether anyone visits tryinbox"; sites with dead or no analytics) with an assertion that is really a design belief ("effort to measure risks exceeding the value"). The skill's test ("a tension or a cost, not a missing feature") would keep the first and turn the second into a tree question: *how much access setup is worth it?*
- **Question:** it is two questions (smallest set of metrics and sources; least access setup). The skill splits these and asks which is the real one. Likely the first, with the second as a branch.
- **Issue tree:** the plan had none; open questions were scattered through the text as "unverified", "decide when SCQ is settled". Capturing them as a tree gives at least: which sites are in scope (lifeitself.org, 2rcon etc. left unchecked); standardise on Umami or keep GA4 for the four older sites; Umami Cloud plan limits; how to measure sign-up conversion (Umami event vs Brevo join); who owns the GA4 properties; whether manual social numbers are worth it; where credentials live (`pl-zecn`). Several were already flagged "unverified" in the plan; the tree makes them visible as one list.
- **Solutions in the SCQ phase:** the plan's "short answer" and architecture are solutions drafted before sign-off. Under this skill they would be parked under "Ideas offered" until after LTP.

Skill changes prompted: none yet pending a live run. Open question for a live run: does "tell me about the situation" produce a usable answer from Rufus cold, or does he need the agent to say what it has read first? The skill currently reads silently then asks; try the other order.

Next: run `ltp-project` on the resulting SCQ file and record what it surfaced beyond the tree.

## 2026-10-16 — simulated live runs: LI DAM, LI coordination, RTM v2 launch

Setup (reusable, in `tests/harness/`): a Claude subagent ran the skill as interviewer; Codex (ChatGPT, low effort) played Rufus via `rufus-sim.sh`, answering only from his project notes (`src-*.txt`) and marking invented answers `[GUESS]`; Codex then scored each SCQ against [rubric.md](rubric.md) via `critic.sh`. Per run: transcript, scq, interviewer notes, critique in `tests/2026-10-16-<slug>/`. About 10–12 exchanges and 4 minutes per run. Simulated owner, so sign-off and "verdicts" are weak evidence; the real test is Rufus reading them.

| Run | Exchanges | Sim sign-off | Critic verdict | Did the SCQ add something? |
|---|---|---|---|---|
| DAM (infrastructure, partly developed) | 11 | first ask, with caveats | sign off as-is | Yes: surfaced that there's no evidence finding media is the real constraint; became tree branch 1 |
| Coordination (team process) | 11 | refused once (unevidenced fact), then yes | small edits | Partly: the owner doesn't hold the facts; Asdra and Fae do |
| RTM v2 (developed, launch) | 10 | first ask, one edit | rewrite (situation mixes facts and interpretation) | Yes: exposed that the launch is being avoided; reframed to "launch now with the archive we have" |

Skill problems found, and the change made:

- Stale docs read as facts (RTM, coord) → read-then-check: date each source, play back read facts as "I read X (dated Y) — still true?".
- Facts vs uncertainty vs guesses blurred (critic, coord) → label all three; `(guess)` in file.
- Owner doesn't know the situation (coord) → record "unknown — who would know"; ask them before sign-off or make fact-finding branch 1.
- No check the problem is real (DAM) → evidence probe in complication; thin evidence makes the question conditional.
- Criteria: four questions in one, and no fallback when the owner has no answer (all three) → ask one at a time, always ask "off the table" separately, propose `(guess)` values.
- Multi-question messages and leading examples (RTM critic) → one question per message, neutral wording; which steps may share a message is now explicit.
- Conditional sign-off and contradictions at sign-off (RTM) → covered.
- Output file when an older SCQH or parent question exists (DAM) → say so and link it.

Also changed from Rufus's comments mid-run: S/C/Q are headings one level below their parent section; the issue tree is nested bullets under the Question; S and C are concise bullets; the question carries criteria. (The three test SCQ files predate the heading change.)

Not yet tested: a real interview with Rufus; LTP on any of these SCQs; SCQ-first vs straight-to-LTP. Backup run not done: analytics one view (`marketing-861.28`).

### Rufus's verdict on the RTM run (2026-10-17)

Good enough to move forward ("small edits" at most). Complication good, and with the situation frames a strong question. Two real gaps: "now" is vague; and it doesn't reach the essence of why the launch hasn't happened — a step that needs a human posting, and indecision between just starting to post and a site launch with an announcement. The critique was valid but mostly tidying, not substantive. Changes: root-cause probe ("Why hasn't this happened already?") in step 3; vague time words become dates; rubric C5 (gets to the essence) and a substantive-vs-tidying split, with "rewrite" reserved for substantive problems; `critic.sh` updated to match.
