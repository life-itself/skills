---
name: finding-channels
description: Use when deciding where to post, promote or launch something (a product, report, course, event, site or piece), when a marketing plan's channel list is only platform names (Reddit, Hacker News, LinkedIn, X, Bluesky) or the founder's own accounts, or when a launch has drafts but no clear list of specific places and people to send them to.
license: Proprietary
metadata:
  author: rgrp
  status: draft
  origin: life-itself/courses explorer/marketing/strategy.md (Apr 2026); reportsthatmatter/marketing (Oct 2026), whose platform-level channel list was the failure this fixes
---

# Finding channels

A channel is a **specific place or person**: a named subreddit, Discord, forum, newsletter, mailing list, Substack comment section, organisation or editor. A platform is not a channel. "Reddit" is not a channel; r/streamentry (38k, posted to daily, self-promotion allowed with disclosure) is.

The output is a table per audience segment of real places, each checked, followed by a short ranked shortlist for this campaign.

## Inputs

- The audiences from the strategy or foundation. If there are none, stop and get them first (`marketing-strategy`).
- **The subjects.** For a catalogue (reports, datasets, courses, episodes), every item has its own enthusiast community. List the items and treat each strong one as a segment: the Challenger report has engineers, space historians and safety-culture people as its audience.
- What we already own: lists and accounts, with sizes.

## Process

1. **Segment.** Split each audience into sub-communities that have their own language and their own gathering places (Explorer split "adjacent movements" into climate, social justice, dharma and EA). Add one segment per strong catalogue item.
2. **Search wide, one subagent per segment, in parallel.** Each returns 10–20 candidates of these kinds:
   - subreddits, Discords, Slacks, forums and Facebook groups
   - newsletters and their editors
   - Substacks with active comment sections
   - mailing lists
   - podcasts
   - organisations and centres
   - course and library guides
   - named people with audiences
   - meetups

   Look for where the segment *talks*, not where the topic is mentioned.
3. **Check every row.** Each needs four things:
   - a URL
   - its size
   - a **dated observation of recent activity** (e.g. "top post 3 days ago, 40 comments")
   - its house rules on self-promotion, quoted from the community's own rules page

   Anything not opened is marked `(unchecked)` and may not be posted to. Never invent a community, a size or a rule. Some sites block automated fetching: Reddit, H-Net, many forums and some publishers. Keep their rows rather than dropping them. For Reddit, use [reddit-check.js](reddit-check.js): edit the `subs` list, then the person pastes it into the console of a logged-in reddit.com tab. It downloads the size, rules, posts in the last 7 days and the share of external links for each subreddit. For other blocked sites, use a browser tool if one is connected, or else a **by-hand checklist**.
4. **Score each row.** Fit (does this segment want *this*?), ease (can we post, or only comment or pitch?) and cost in minutes. Note the format that works there: image post, comment, pitch, DM.
5. **Shortlist in two tiers**, ranked by return per minute of the poster's time:
   - **Tier 1: open venues the founder can post to directly.** Subreddits, forums, HN, Lobsters, and Discords or Slacks that allow posts. One good post reaches thousands at no cost of anyone's attention. Each gets a ready draft that follows its rules.
   - **Tier 2: one-to-one pitches** to editors and curators, which an assistant can draft and send. Cold emails to busy editors are mostly ignored. Keep these short and specific, and aim them at smaller editors whose readers clearly fit.

   Choose 5–10 in all, including a few experiments chosen for learning. Give each a **stop rule** (e.g. "stop after 3 posts with no clicks").

## Output (into the strategy's channels section or appendix)

One table per segment:

| Channel | Platform | Size | Last activity (checked date) | Rules | Ease | Fit and notes |
|---|---|---|---|---|---|---|

Then **Shortlist for this run**: numbered, with the segment, the format, who posts, and the stop rule.

## Common mistakes

- **Missing the curators.** For a tool, dataset or reference site, also list curators: resource lists, directories, teaching networks and library guides. Listings that are a PR or a form (an awesome-list, a directory) are cheap. Cold emails are tier 2.
- **Listing platforms or own accounts** as the channel plan. Own accounts are for capture; the reach comes from borrowed places.
- **One generic channel list for all audiences.** The message and the channel go together, so each segment gets its own.
- **Skipping the subject communities** of individual items in a catalogue.
- **Cutting a whole channel type** ("any mailing list; any DM") instead of judging specific ones.
- **Stale or dead places.** A 500k subreddit with no posts this month is worth less than an active 3k one.
