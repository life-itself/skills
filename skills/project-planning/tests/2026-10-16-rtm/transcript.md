# Simulated test run of `project-planning` (interviewer: Claude subagent; "Rufus" simulated by Codex from his notes), project: RTM v2 launch, 2026-10-16

Interviewer: Quick frame before we start. We'll capture three things: the situation (what's true today), the complication (what isn't working or has changed), and the question that follows, plus a first tree of sub-questions as they come up. I'll write that to a file, you sign it off, and then you run the Logical Thinking Process on it in a fresh thread. About 10-20 minutes of talking.

I've read the project file, the repo's NOW.md, ROADMAP.md, PRODUCT.md, MARKETING.md, PROGRESS.md, and bead pl-72f. My read: the site and pipeline are built and live on reportsthatmatter.org with ten reports, ~3k uniques/month, and the launch itself (announcement page, X account, thread) is the bit still open since January. So rather than start from scratch: tell me about the situation. What are you working on here and what is true today, especially anything those docs get wrong or leave out?

Rufus: Yeah, that's broadly right: the site is live, the pipeline's in place, and there are ten reports on it now. The Jack Smith report was meant to be the first launch report, but the docs don't tell me whether the announcement page, X account, or thread have actually been done since. There's also a broader question of what to do next: launch work is still open, but the roadmap has technical work waiting too.

Interviewer: I checked the repo rather than make you remember. Playback of the situation, as facts:
- The v2 site is live on reportsthatmatter.org: paragraph permalinks, highlight-to-share, quote-preview links, share cards, search, changelog. Jack Smith is on it.
- The archive is now well past ten: the changelog shows ~18 reports (Mueller and the Senate Torture Report went up on 10 Oct).
- About-page copy and a launch audit landed on 10 Oct. A Bluesky poster is in the repo, in dry-run, waiting for account secrets.
- Nothing has been posted. No RTM X/Bluesky account exists that the repo knows of; Search Console isn't set up. NOW.md still shows the January checklist unticked.
- The 25 Sep plan proposed launching Tue 13 Oct (three weeks before the 3 Nov US midterms). That date has passed.
- Traffic is ~3k uniques/month and we don't know what people come for.
Is that right? Anything there you'd dispute or that's missing?

Rufus: Yeah, that sounds right. The about copy exists now, and the archive is bigger than those old launch notes suggest, but nothing has actually been posted and the planned date has gone by. The bit I'd add is that we still don't know what people are coming for, so I'm not sure whether to push the launch now or do the technical work that's waiting first.

Interviewer: Good. Now the complication: what isn't working, or what has changed, that makes this a problem? Why has the launch stayed "next" since January while the site kept getting better?

Rufus: Well, the site kept getting better because that work was concrete and mostly in our control; posting is a different step, and it's still waiting. The launch date we had in mind has passed, and we don't know what the existing visitors come for, so I'm not sure the original launch plan still fits. [GUESS] I may have kept reaching for technical work because it felt easier to finish than deciding what to say and putting it out there.

Interviewer: What does that cost, and what happens if we do nothing for another month? For example: the midterms are 3 Nov and Litvinenko's 20th anniversary is 23 Nov.

Rufus: I'm not sure what another month would cost in traffic or attention—we haven't set up Search Console, so we don't know what visitors are looking for. The midterms launch window has already passed, and the Litvinenko anniversary might be another timely hook, but I don't know if we'd use it. [GUESS] If we do nothing, the site stays live and useful, but we keep putting off the public launch and learning what people respond to.

Interviewer: Playback of the complication, in your words:
- Building the site was concrete and in our control; posting is a different kind of step, and it keeps waiting. You may have kept reaching for technical work because it was easier to finish than deciding what to say and putting it out.
- "Next" with no date has meant never: the 13 Oct date passed with nothing posted.
- Because nothing goes out, we learn nothing: we don't know what visitors come for, so we can't tell which reports or features are worth the next round of work. The roadmap's own line: the most beautiful archive won't matter if nobody visits.
- The original one-report launch plan may no longer fit an 18-report archive.
One check on a fact: the 13 Oct date passed, but the midterms themselves are 3 Nov, 18 days away, so a Jack Smith hook is shrinking rather than gone. Is all that right?

Rufus: Yeah, that's right. The date for the launch passed, but the midterms are still ahead, so there's a shorter window for a Jack Smith hook. And with about 18 reports now, the old one-report launch plan may need a rethink. We still don't know what visitors are looking for, and without putting something out there we won't learn what gets a response.

Interviewer: Here's a proposed question. Fix the wording:
"How do we get Reports That Matter publicly launched in a way that actually happens and starts telling us what readers respond to?"
Is this the question we are trying to answer?

Rufus: Yeah, that's basically it. I'd make it a bit more concrete: "How do we launch Reports That Matter now, with the archive we have, and learn what readers respond to?"

Interviewer: Your version joins two things with "and": launching, and learning. I'd keep it as one question by making learning the purpose: "How do we launch Reports That Matter now, with the archive we have, so that we learn what readers respond to?" Then: what would make an answer good enough? By when, for whom, at what cost of your time, and what's off the table?

Rufus: Good enough is that something actually gets posted soon enough to catch the remaining midterms window, and we learn which reports or excerpts people respond to. I'd want it out before 3 November, if that's still realistic. I can give it a few focused hours, but I don't want another big technical build ahead of it. [GUESS] The audience is the people already interested in these reports—journalists, researchers, and politically engaged readers.

Interviewer: Criteria so far: first public posts before 3 Nov; for journalists, researchers and politically engaged readers; a few focused hours of yours; no big technical build ahead of it; and we come out knowing which reports or excerpts get a response. One gap: what's explicitly off the table? For example, commentary or opinion posts, a blog, paid promotion, waiting on more reports or on the editorial layer for all reports?

Rufus: I don't want this turning into commentary or opinion; the point is to get people to the primary evidence. And I wouldn't wait for more reports or a big new build before posting. Paid promotion? I'm not sure that's off the table, but it isn't in the lean plan.

Interviewer: Here's the question tree I've been noting as we went. Main question: how do we launch RTM now, with the archive we have, so that we learn what readers respond to?
1. What is "the launch": the Jack Smith report, or the archive as a whole? — open
2. Which channels and accounts: your personal X for the thread, an RTM excerpt account, Bluesky, X, or a subset? — proposed (25 Sep plan: Bluesky + X excerpt account, your X for the thread)
3. What do we post, and do we have enough of it? There are 5 curated quotes, all Jack Smith. — open
4. How do we know what readers respond to: what we measure and where (Search Console, tagged links, Cloudflare)? — proposed
5. When, and against which hooks: before 3 Nov for Jack Smith; Litvinenko 23 Nov after? — partly decided: first posts before 3 Nov (you, today)
6. Which steps only you can do (accounts, approving copy, posting), and what can run without you? — open
7. What has to be true for it not to slip again? — open
And decided: no big technical build or more reports ahead of launch; no commentary.
What's missing, and what here is not really a question?

Rufus: I think the bit about who has to do what is a real question, and so is what would stop this slipping again. "What is the launch?" feels like the main decision, really: are we launching the archive, or using Jack Smith as the hook? The channel and measurement questions are useful, though I wouldn't make Search Console a prerequisite. [GUESS] I'd also ask what's the smallest thing we can post that still feels like a proper launch.

Interviewer: I've written it up at `docs/plans/2026-10-16-rtm-launch-scq.md` (test copy: `tests/2026-10-16-rtm/scq.md`). Changes from the playback: "what is the launch" is now the first branch, with "smallest thing that still feels like a proper launch" under it; Search Console marked not a prerequisite. Left out: the technical backlog (footnote leakage, pre-render, OCR review), which you said shouldn't come first, and the details of the 25 Sep editorial-layer plan, parked as an idea. Full file:

    # Reports That Matter v2 launch — SCQ
    
    Status: draft
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
    - By when: first public posts before 3 Nov 2026.
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
    - **When, and against which hooks?** — decided: first posts before 3 Nov (Rufus, 2026-10-16)
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

Sign off on this SCQ and question tree? Anything to change before we go to LTP?

Rufus: I'd sign off on that. The main question and tree look right; I'd just make clear that "before 3 Nov" is the target we named, not a guarantee that it's still realistic.

Interviewer: Done: the criteria and the "when" branch now say "target, not a guarantee it is still realistic", and the file records sign-off 2026-10-16 by you.

SCQ is signed off at `docs/plans/2026-10-16-rtm-launch-scq.md` in `~/src/reportsthatmatter/reportsthatmatter` (test copy: `skills/project-planning/tests/2026-10-16-rtm/scq.md`). LTP is best run in a new thread so it has room. Start a new session in `~/src/reportsthatmatter/reportsthatmatter` and run it there. Prompt to paste:

```text
Use the ltp-project skill on docs/plans/2026-10-16-rtm-launch-scq.md. Treat the SCQ as the situation, complication and goal; the tree questions are candidate assumptions and open questions. Write the candidate ltp.yaml and report, then summarise the judgment calls I should check first.
```

(For a live, conversational pass instead, use the `reason-commons` skill; both live in `~/src/life-itself/reasoncommons/skills/`.) The file's "Next" line says LTP is not yet run; when it is, come back to turn the result into beads and an implementation plan. Given the 3 Nov target, I'd run LTP today or tomorrow.

[End of simulated run. LTP not run; no beads created.]
