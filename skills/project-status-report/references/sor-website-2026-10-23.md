# Worked example: Seeds of Renaissance website, 2026-10-23

The project: the Seeds of Renaissance website (Astro on Cloudflare Pages, draft at seedsofrenaissance.org), planned with LTP (goal tree CSF1–CSF7, transition streams) and tracked in local Beads (`sorw-*`). The goal bead is "Public bar met: draft marker off" (`sorw-ol5.7.5`), target about 23 October. Two tracks: **Track 1**, the v1 site; **Track 2**, the system for the team to edit and update it (epic `sorw-ol5.13`).

This is the report as shaped through Rufus's feedback that day, then corrected against the beads and the repo by a critique pass (several marks in the version Rufus saw were wrong; see the end). Statuses are as of 2026-10-23 and will be stale by the time you read this; the shape is the point.

## What the inputs looked like

- `bd list --label=focus` → the "simple, friendly pass" epic with forms wiring (in progress), the newsletter destination (not started), link-preview testing in real apps (not started) and a dozen smaller items.
- `bd dep tree sorw-ol5.7.5` → 14 dependencies: Astro migration and link previews closed; Join, Magazine, Events, Papers, Courses and redirects in progress; Home, Blog, CI on push, email and analytics switch, final human review not started.
- **Not** in that tree: forms wiring (`sorw-ol5.10.30`) and its newsletter destination. They surfaced only by mapping CSF4 ("easy next steps") to beads. Rufus caught the omission in an earlier draft.
- The goal bead's done condition: "Home, About, Podcast and Courses at stage:signed-off; every other nav page (Join, Magazine, Events, Blog, Papers) at stage:review or better; redirects, CI checks and analytics in place." The report measures against that, not "all pages signed off".
- Stage labels disagreed with bead status: Courses and Blog had `stage:signed-off` while their beads were in progress or open (follow-ups). Redirects was `in_progress` but its branch was merged; Join's branch was not merged. The repo and the label win.

## The report

**TL;DR (one line):** v1 misses the 23 October target by about a week; detail below, three asks at the end.

| CSF | Status | Live | Gap | Closes it |
|---|---|---|---|---|
| CSF1 Grasp the vision in a minute | 🔴 | Home at review | Home must be signed off for the bar; copy and hero video not final | Home page (sorw-ol5.3) |
| CSF2 Content in depth, easy to find | 🟢 | v1 subset of episodes, posts, papers, courses | Archives (all Substack posts, past events), planned for after launch | Content migration (sorw-ol5.2) |
| CSF3 Trust the people | 🟢 | About signed off | Team section | About: team (sorw-ol5.10.27) |
| CSF4 Easy next steps | 🔴 | Join on a branch, not merged | Forms code merged but not switched on; newsletter destination not chosen; not a launch dependency | Forms (sorw-ol5.10.30) |
| CSF5 Arrivals land on the right page | 🟡 | Redirects in, link previews built | Previews untested in real apps; old-domain switch at launch | Link previews in apps (sorw-ol5.10.40) |
| CSF6 Team keeps it current | 🟡 | Astro, publish by push | No edit path for non-technical people yet; planned after launch, not on the public bar | Easy editing (sorw-ol5.13) |
| CSF7 Tell whether it delivers | 🟡 | Signals chosen | Email and analytics not on the new domain | Email and analytics (sorw-ol5.7.2) |

### Track 1: the v1 site

First pass, layers collapsed:

```
 ● Foundations ──► ◐ Pages: 3 of 4 required signed off ──► ◐ Ready to go public ──► ○ Final review ──► (( ○ PUBLIC ))
                    (Home not yet; Join, Papers not at review)  (forms, previews, CI)
 Legend: ● done  ◐ in progress  ○ not started
```

Expanded, after Rufus asked for more:

```
 LAYER 1  FOUNDATIONS
   ● Astro on Pages      ● Design system      ● v1 content subset
   ○ Archives (after launch, not on the bar)
             └───────────────────┬───────────────────┘
                                 ▼
 LAYER 2  PAGES                          built → review → signed off
   ● About   ● Podcast   ● Courses             signed off (required)
   ● Blog                                       signed off
   ◐ Home                                       at review; must be signed off
   ◐ Events                                     at review
   ◐ Magazine                                   built, to review
   ◐ Join                                       on a branch, not merged
   ◐ Papers                                     research and mockup on a branch
                                 │
                                 ▼
 LAYER 3  READY TO GO PUBLIC            (in parallel with layer 2)
   ● Redirects ─────────────► ○ Old-domain switch (at launch)
   ● Link previews built ───► ○ Tested in real apps
   ● Signals chosen ────────► ○ Email + analytics on new domain
   ● Forms code merged ─────► ○ Newsletter destination ──► ○ Forms on
   ○ CI on push
                                 │
                                 ▼
 LAYER 4  ○ FINAL HUMAN REVIEW of every page
                                 │
                                 ▼
          (( ○ PUBLIC: draft marker off ))

 Legend: ● done  ◐ in progress  ○ not started
```

### Track 2: the system for the team to edit and update it

```
 LAYER 1  FOUNDATIONS
   ● Astro, publish by git push      ● Content types with checked frontmatter
                                 │
                                 ▼
 LAYER 2  EDIT PATHS
   ○ Who edits what, how, per level
   ○ About: team section (CSF3)          (content, not editing; shown here so no gap is lost)
             │
             ├──► ○ Page copy without git (pick an editor)
             └──► ○ Publish-post skill (Doc or Markdown → branch)
                                 │
                                 ▼
 LAYER 3  ○ How-to for the team (short, with screenshots)
                                 │
                                 ▼
 LAYER 4  (( ○ PILOT: a team member publishes a post and edits a page without Rufus ))

 Legend: ● done  ◐ in progress  ○ not started
```

**TL;DR:** v1 misses the 23 October target by about a week: Home still needs sign-off, Join and Papers are not yet at review, and the forms are not switched on. Track 2 (team editing) has not started; it is not needed to go public.

**You:**
1. *Big:* make forms (and the newsletter destination) a launch dependency. Recommend yes: CSF4 is red and Join without working forms breaks the main next step.
2. *Small:* new target about 30 October. Recommend accepting it; the remaining pages are at review, the risk is the final human review.
3. *Small:* start Track 2 after launch, not before. Recommend yes; it is not on the public bar and pages need the attention now.

**Decided:**
- Counted Courses and Blog as signed off (label `stage:signed-off`; beads open for follow-ups).
- Redirects ●: branch merged, bead still in progress.
- Join ◐ "not merged" although its bead says built: the branch is not on main.
- Split "content imported" into v1 subset ● and archives ○.

## Earlier drafts Rufus rejected, and why

- **Progress bars per area** ("guard ▓▓▓░░ 60%", "landing ▓▓░░░ 40%"): vague areas, false equal weight.
- **"Content imported ✓"** when only the v1 subset was in: partly done shown as done.
- **A launch graph without forms**, because forms were not a dependency of the goal bead: big work missing.
- **A dense left-to-right graph, one line per stream**: unreadable. Replaced with layers top to bottom, which Rufus called "way better".
- **Marks the critique pass fixed** in the graph Rufus saw: "4 of 9 signed off" (wrong bar; the goal bead names four required pages), Papers ○ (work was on a branch), Join "built" (not merged), "◐ Forms code merged" (merged, so ●), "● Analytics" (only the signals were chosen; the switch was open), and "○ Archives" inside a ● Foundations layer.
