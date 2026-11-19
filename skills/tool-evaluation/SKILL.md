---
name: tool-evaluation
description: Choosing a tool, app, software, service, product or supplier with a weighted comparison. Use when someone asks which tool to use or buy, wants alternatives to or a replacement for something they use now, or wants products compared — "which tool for X", "alternatives to X", "what should I buy", "compare A and B", "replace X", "is there something better than X". Not for choosing a code library inside a coding task.
license: MIT
metadata:
  author: rgrp
  status: draft
  origin: https://tao.rufuspollock.com/Tool+Evaluation
---

# Tool evaluation

Turn "what should I use for X?" into a decision: one recommended tool, one backup, and what to check in a trial. A list of options, or a feature table without scores, is not an answer.

## 0. Pick the depth

| Depth | What it is |
|---|---|
| **Quick** (default) | About 15 minutes. Steps 1–7, 3–5 candidates, key facts checked. |
| **Thorough** | For costly or hard-to-reverse choices (contract, data migration, whole team). Wider candidate sweep, a source for every cell, and you or the user run the trial in step 7. |

Say which depth you chose in one line. If the stakes call for thorough but you can't trial or research that deeply, do quick, say thorough is warranted, and let the trial plan carry the rest.

## Steps

1. **Say what is wanted.** Write 1–3 job stories: "When *situation*, I want to *do something*, so I can *outcome*." Note hard constraints (country, budget, team size, must-work-with). If replacing a tool, say why they are leaving it. Guess what you can't find out and mark each guess *(assumed)*. Ask one question only if the answer would change the shortlist; otherwise keep going.
2. **Name the category.** Search for what the market calls this ("social media scheduling tool", not "thing to post everywhere"). Use that name to find candidates.
3. **List candidates.** Gather widely, then cut to 3–5 using the hard constraints. One line on why each notable name was dropped. If replacing a tool, keep the current one in the table as the baseline.
4. **Set criteria and weights.** 3–5 core criteria, taken from the job stories, at least two specific to this user. Weights sum to 100. Anything else is a secondary note, not a scored row. When replacing, switching cost (data export and import, history, retraining, the accountant/partners who must change too) is a criterion.
5. **Score.** 1–5 per cell, each with a short reason. Score one named plan tier per vendor (the one that meets the hard constraints) and put it in the column header. A switching-cost row favours the current tool; that is intended, so weight it honestly rather than leaving it out. Total = sum of weight × score ÷ 100.
6. **Recommend.** One pick and one named backup, one line of reasoning each, and what would flip the choice. If the top two are within about 0.3, say it is close and let the trial decide. "Stay with what you have" is a valid answer.
7. **Trial plan.** Name which tool to try first and 2–4 concrete checks, drawn from the criteria you could not verify ("import last year's data", "connect all four accounts"). Even an hour is worth it. If the first is good, stop; if not, try the backup. In thorough mode, run the trial if you have access, then suggest a short screen recording walking through what was found.

## Evidence rules

- Prices come from the vendor's pricing page, with plan name, currency and the date checked. If the page won't load, use a recent third-party figure marked *unverified*. Never quote a price from memory as fact.
- Put the source link for each fact that drives a score in the table's evidence column (or as numbered footnotes under the table if cells get long), not only in a list at the end. Prefer docs and independent reviews to vendor or affiliate blogs.
- Mark anything you could not check as *unverified* and put it in the trial plan.
- Recommend only. Never sign up, start a paid trial or buy without a yes.

## Output

Table and evidence first, then the recommendation and trial plan. If the repo or user has a reply convention (e.g. a Summary / You block), end with it and put the pick and backup there as the recommended option.

Example (illustrative tools, a social media posting tool):

> **Wanted:** When I publish a post, I want to schedule it to LinkedIn, X, Mastodon and Bluesky at once, so I can spend 10 minutes a week on it. Budget under £20 a month *(assumed)*. Category: social media scheduling tools.
>
> | Criterion | Weight | Tool A | Tool B | Tool C | Evidence |
> |---|---|---|---|---|---|
> | Posts to all four channels | 35 | 5 | 3 | 5 | B has no Mastodon ([docs](https://example.com)) |
> | Cost | 25 | 3 | 5 | 1 | A £15/mo "Solo", B free tier, C £45/mo; pricing pages, checked 2026-11-19 |
> | Ease of scheduling | 20 | 4 | 4 | 3 | From demo videos, *unverified* |
> | Data export | 10 | 3 | 2 | 4 | A CSV only; B none found |
> | Analytics | 10 | 4 | 3 | 5 | Feature pages |
> | **Total** | 100 | **4.0** | 3.6 | 3.5 | |
>
> **Recommend Tool A:** the only one that covers all four channels within budget. **Backup, Tool B:** free, if Mastodon can be dropped. Would flip if: A's Mastodon posting fails in trial. Dropped: Tool D (enterprise only).
>
> **Trial A first (14-day free trial):** connect all four accounts; schedule one post with an image to all four; export last month's posts.

## Common mistakes

- Listing many tools, or a feature table with no scores, and no pick. End on one recommendation and one backup.
- Generic criteria (features, support, integrations) that fit any user. Derive them from the job stories.
- More than five scored criteria, or no weights. Everything then scores about the same.
- Forgetting the tool being replaced: no baseline score, no switching cost, no "stay put" option.
- Prices and features from memory, undated and unsourced.
- Scores with no reason, or a 0.1 gap presented as a clear win.
- Searching the user's phrase instead of the category name, and missing half the market.
- Stopping at the table, with no trial checks.
- Opening with a list of questions instead of marked guesses.
