# Reports That Matter v2 launch — SCQ

Status: signed off 2026-10-16 by Rufus Pollock (simulated)
Source: project `projects/2026-reports-that-matter-v2-launch.md`, bead pl-72f, repo `~/src/reportsthatmatter/reportsthatmatter` (docs/NOW.md, ROADMAP.md, CHANGELOG.md, docs/plans/2026-09-25-reader-layer-and-launch.md); interview 2026-10-16 (simulated test run)

## Situation
- The v2 site is live on reportsthatmatter.org, with the Jack Smith report on it.
  - Paragraph permalinks, highlight-to-share, quote-preview links, share cards, search, changelog.
- The archive is about 18 reports, not the one or two the launch notes assume.
  - Mueller and the Senate Torture Report went up on 10 Oct.
- About-page copy and a launch audit landed on 10 Oct; a Bluesky poster is in the repo in dry-run, waiting for account secrets.
- Nothing has been posted: no RTM account on X or Bluesky that the repo knows of, no Search Console, and `docs/NOW.md` still shows the January launch checklist unticked.
- The 25 Sep plan proposed launching Tue 13 Oct, three weeks before the 3 Nov US midterms; that date has passed.
- Traffic is about 3k uniques/month and we don't know what people come for.

## Complication
- The site kept getting better because that work was concrete and in our control; posting is a different kind of step, and it keeps waiting.
  - Rufus: "I may have kept reaching for technical work because it felt easier to finish than deciding what to say and putting it out there."
- "Next" with no date has meant never: the 13 Oct date passed with nothing posted.
- Because nothing goes out, we learn nothing: we don't know which reports or excerpts people respond to, so we can't tell what the next round of work should be.
- The Jack Smith hook is shrinking: the midterms are 3 Nov, 18 days away.
- The original one-report launch plan may no longer fit an 18-report archive.

## Question
How do we launch Reports That Matter now, with the archive we have, so that we learn what readers respond to?

Criteria:
- By when: target first public posts before 3 Nov 2026 (a target, not a guarantee it is still realistic).
- For whom: journalists, researchers and politically engaged readers already interested in these reports.
- Effort: a few focused hours of Rufus's time.
- Outcome: we come out knowing which reports or excerpts get a response.
- Off the table: commentary or opinion (the point is getting people to the primary evidence); a big technical build or more reports before posting.
- Not decided: paid promotion (not in the lean plan, not ruled out).

## Issue tree
- **What is the launch: the archive as a whole, or Jack Smith as the hook?** — open (Rufus: "feels like the main decision")
  - What's the smallest thing we can post that still feels like a proper launch? — open
- **Which channels and accounts: Rufus's personal X for the thread, an RTM excerpt account, Bluesky, X, or a subset?** — proposed: Bluesky and X excerpt account, Rufus's X for the launch thread (2026-09-25 plan)
- **What do we post, and do we have enough of it?** — open
  - Is 5 curated quotes, all Jack Smith, enough for launch and the first weeks? — open
- **How do we know what readers respond to?** — proposed: tagged links and Cloudflare analytics (2026-09-25 plan)
  - Is Search Console a prerequisite? — decided: no (Rufus, 2026-10-16)
- **When, and against which hooks?** — decided: target first posts before 3 Nov, not guaranteed realistic (Rufus, 2026-10-16)
  - Does Litvinenko's 20th anniversary (23 Nov) carry a second wave? — open
- **Which steps only Rufus can do, and what can run without him?** — open
- **What has to be true for the launch not to slip again?** — open
- **Does anything technical have to come first?** — decided: no big build or more reports ahead of launch (Rufus, 2026-10-16)

## Ideas offered (parked)
- Editorial layer per report (why it matters, findings, excerpts) feeding cards, picks and posts (2026-09-25 plan).
- Automated one-excerpt-a-day posting via the Bluesky poster / a cron job; a scheduler such as Typefully or Buffer for X.
- Rewrite the launch thread (Appendix A of the campaign plan) for the whole archive.
- Paid promotion.

## Next
LTP not yet run. Run `ltp-project` (or `reason-commons`) on this file in a new thread. When done, return to turn the result into beads and an implementation plan.
