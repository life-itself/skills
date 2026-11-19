---
name: marketing-strategy
description: Use when asked for a marketing strategy, "lightweight marketing strategy", campaign or launch plan, promotion or go-to-market plan, or a marketing or press pack, for a product, report, course, event, site or initiative; also when a launch keeps slipping or the drafts exist but nothing has been posted.
license: Proprietary
metadata:
  author: rgrp
  status: draft
  origin: tao.rufuspollock.com "Marketing Strategy Structure"; life-itself/courses explorer/marketing (Apr 2026); comparison with Haines marketingskills and Anthropic campaign-plan (life-itself/marketing docs/research/2026-11-19-marketing-skills.md)
---

# Marketing strategy

A campaign strategy is short and time-boxed. It follows Rufus's [Marketing Strategy Structure](https://tao.rufuspollock.com/Marketing+Strategy+Structure.md). Next to it sits a **pack** of ready-to-use copy. The worked example is [Explorer](https://github.com/life-itself/courses/tree/main/explorer/marketing).

## Process

1. **Bring rough context first.** Collect what exists before asking anything:
   - the offer
   - the dates
   - what has been done, what is in flight and what is stuck
   - the owned lists and accounts, with sizes
   - past campaigns and how they did
   - the initiative's standing brief, if it has one (e.g. `docs/marketing-foundation.md`); read it rather than restating it

   Then refine through a few questions. Don't arrive with a finished answer.
2. **Write `strategy.md`** from [strategy-template.md](strategy-template.md). Goals go near the top and must have a number and a date.
3. **Find the channels.** **REQUIRED SUB-SKILL:** use `finding-channels`. Its tables go in the appendix and its shortlist goes in the channels section.
4. **Write `pack.md`** from [pack-template.md](pack-template.md): a one-liner, then short and long blurbs, a version per audience, hooks, cards and a press block.
5. **Critique.** Run two subagents in parallel:
   - a skeptical strategist: is the audience narrow enough, are the channels real and doable in the stated budget?
   - a member of the primary audience, reacting to the pack: would I click, share, sign up? Finish the sentence "I'd ignore this because…".

   Revise.
6. **Readiness gate before setting a date.** Is the offer simple (one job), lovable (someone would choose it) and complete (no visible stubs)? Then cut to what can ship without the open decisions, and set the date. A launch that has slipped twice is too big, so cut it further.
7. **Plan and log.**
   - Add a dated calendar of which piece goes to which channel on which day, with an owner for each.
   - Put tasks in the repo's tracker (Beads), not in Markdown.
   - Log each post where the repo logs activity.
8. **Results when it ends.** Fill in the Results section: the outcome against the goal, what each channel produced, and what we learned. Record these, not impressions.

Put both files in the initiative's marketing folder (e.g. `marketing/<campaign>/`), with a short README of key links and the status of each asset.

## Common mistakes

- **Goals without a number or a date**, or placed at the bottom.
- **Channels listed as platforms.** Use `finding-channels`.
- **One message for every audience.** Each audience gets its own hook, value proposition and channels.
- **The budget left unstated.** Time is the real budget. Plans that need more hours than exist don't run.
- **The plan grows instead of the posting.** More research and drafts aren't progress if nothing is posted.
- **No Results section.** If it's missing, the next campaign starts from zero.
