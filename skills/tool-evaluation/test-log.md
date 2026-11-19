# tool-evaluation test log

One entry per run. Rubric (pass/fail): 1 context and why leaving, assumptions marked; 2 at most five criteria with weights, two or more user-specific; 3 current tool scored as baseline, switching cost covered; 4 3–5 candidates scored with a reason per score; 5 one pick, a named backup, what would flip it; 6 prices dated, plan named, sourced per row; 7 trial plan naming what to try first and 2–4 checks.

## 2026-11-19 — "find alternatives to Xero" (small UK part non-profit, GBP/EUR, grants, MTD VAT)

Same prompt to two fresh subagents (Opus, ~11 searches each), one without the skill and one told to read it first.

| Check | Without skill | With skill |
|---|---|---|
| 1 Context | partial: needs listed, reason for leaving not stated | pass: job stories, constraints, guesses marked |
| 2 Weighted criteria | fail: none | pass: 5 criteria, weights 30/25/20/15/10 |
| 3 Baseline + switching | partial: Xero cost and "stay" covered; no migration cost | pass: Xero in table, switching cost row |
| 4 Scored shortlist | fail: 6-tool feature table, no scores | pass: 4 + baseline, reason per cell |
| 5 Pick + backup + flip | partial: pick FreeAgent, backup implicit | pass: stay on Xero (4.0), backup FreeAgent (3.6), flip conditions |
| 6 Evidence | partial: sources listed at the end, no dates | pass: dated, per-row sources, unverified marked |
| 7 Trial plan | fail: none | pass: Xero discount check first, then FreeAgent trial with four checks |

Outcome: the baseline was well researched but stopped at a comparison; with the skill the weighted scoring changed the verdict (stay and cut the bill, rather than switch) and added a trial plan. The baseline's "check the non-profit discount first" caveat became the main recommendation.

Gaps the with-skill agent reported, all patched: stakes call for thorough but resources allow only quick; vendor pricing pages that won't load (403, JS-only); evidence column too long (allow footnotes); switching-cost row favours staying (say it is intended); vendors with several plan tiers (score one named tier).
