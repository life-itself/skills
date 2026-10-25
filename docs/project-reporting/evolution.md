# How the status graph evolved, and what worked

A record of one project's status reports changing over two days (the Seeds of Renaissance website, planned with LTP and tracked in Beads, 2026-10-23 to 2026-10-25), kept so the skill [project-status-report](../../skills/project-status-report/SKILL.md) can be developed from real feedback. Each version below is the diagram as Rufus saw it, with his reaction and what changed next. Statuses are as of those dates and are stale now; the shapes are the point. The standing notes are in [../project-reporting-notes.md](../project-reporting-notes.md).

Legend in all versions unless stated: ● done · ◉ at review · ◐ being built · ○ not started · ★ changed since last report · `((…))` the goal.

## v0: progress bars per area (rejected)

```
TRACK 1  BUILD V1                                          → PUBLIC (draft off)
  platform   ████████████ Astro + Pages              ✓
  pages      ██████████░░ About Podcast Blog Courses ✓ │ Home Events: review
                          Join Magazine: live, to review │ Papers: brief waits on your OK
  landing    ███████████░ redirects ✓  previews ✓  real-app test ○
  measure    ████████████ Umami ✓
  guard      ██░░░░░░░░░░ CI on push ○
  review     █░░░░░░░░░░░ final human pass (Asdra, Fae) ○ ── gates launch
```

Reaction: "the previous graph with progress bars wasn't super useful (more because the areas weren't so useful, e.g. what is *guard*? and *landing* has as much area as *pages*)". Lesson: bars imply equal weight and need areas the reader already knows. Use nodes and edges for features instead.

## v1: first nodes-and-edges graph (readable by nobody)

Rufus had asked for "a small ascii graph (a mathematical graph: nodes and edges) of steps at feature level". Both tracks were crammed into left-to-right strings:

```
TRACK 1: V1 SITE

 [Astro platform ✓]──►[Design system ✓]──►[Pages built ◐]──►[Pages signed off ◐]─┐
                                              │ Papers ○                           │
                                              │ Join, Magazine ◐                   │
 [Content imported ✓]─────────────────────────┘ Home ◐ (last)                      ▼
                                                                         [Final human review ○]
 [Redirects ✓]──►[Previews built ✓]──►[Previews tested in apps ○]────────────────┤
 [Analytics ✓]───────────────────────────────────────────────────────────────────┤
 [CI on push ○]──────────────────────────────────────────────────────────────────┤
                                                                                 ▼
                                                                  ((PUBLIC: draft off ○))
                                                                                 │
                                                       [Old-domain redirect ○] ◄─┘
```

Reaction: asked what the symbols meant ("a solid circle is more visible for done"), and to split the tracks into two diagrams. Lessons: always give a legend; one diagram per track; ✓ and ○ are not a set (use fill level: ○ ◐ ●).

## v2: split by track, with ● ◐ ○ (still unreadable)

```
 ●Astro ──► ●Design system ──► ◐Pages built ──────► ◐Pages signed off ──┐
                                 Papers ○  Join ◐                     │
                                 Magazine ◐  Home ◐                   │
 ●v1 content subset ─────────────┘                                    ▼
 ◐Forms live ── ○newsletter destination (.10.30.1) ──────────► ○Final human review
 ●Redirects ──► ●Link previews built ──► ○Previews tested ──────────────┤
 ●Analytics ───────────────────────────────────────────────────────────┤
 ○CI on push ──────────────────────────────────────────────────────────┤
                                                                        ▼
                                                           ((○ PUBLIC: draft off))
```

Reaction: "the current graph is almost unreadable. The whole point of separating was to give you more space to design with". Two corrections inside the same exchange: "is all content really imported? what about Substack?" (the node said done when only the v1 subset was in) and "where is forms wiring? that's a big deal" (a launch-relevant stream was missing because it was not in the formal dependency list). Lessons: use the space; split partly-done nodes; check the graph against the goal tree, not only against the bead dependencies.

## v3: layered, top to bottom (the version that worked)

```
 LAYER 1  FOUNDATIONS
   ● Astro on Pages      ● Design system      ● v1 content subset
             └───────────────────┬───────────────────┘
                                 ▼
 LAYER 2  PAGES                          built → review → signed off
   ● About   ● Podcast   ● Blog   ● Courses     signed off
   ◐ Events                                     at review
   ◐ Join    ◐ Magazine                         built, to review
   ○ Papers                                     brief waits on your OK
   ◐ Home                                       at review, signed off last
                                 │
                                 ▼
 LAYER 3  READY TO GO PUBLIC            (in parallel with layer 2)
   ● Redirects (73/73) ─────► ○ Old-domain switch (at launch)
   ● Link previews built ───► ○ Tested in real apps (.10.40)
   ● Analytics (Umami)
   ◐ Forms code merged ─────► ○ Newsletter destination ──► ○ Forms on
   ◐ Build check on push ───► ○ All three checks on push (.7.4)
                                 │
                                 ▼
 LAYER 4  ○ FINAL HUMAN REVIEW of every page (.7.11, Asdra + Fae)
                                 │
                                 ▼
          (( ○ PUBLIC: draft marker off  .7.5 ))
```

Reaction: "this is *way* better. well done." Plus a method note from Rufus: first pass could be simpler (layers as single nodes), then expand: progressive detail. A side question showed the cost of an easy-looking node: "CI on push: isn't that already working?" The answer was half yes (the host builds on every push) and half no (the link, SEO and scan checks were manual), so the node was split into two. Lesson: when a node confuses the reader, it is usually two things.

## v4: an "at review" mark, and a mistake (over-compressed)

Rufus: "'in progress' is mistaken if it just means review… maybe something looking like a pair of eyes". The legend gained ◉ (one character wide; the 👀 emoji is two cells wide and breaks alignment). Then I over-corrected a "too verbose" complaint by squeezing the graph:

```
 LAYER 2  PAGES
   ● About ● Podcast ● Blog ● Courses   signed off
   ◉ Events    ◉ Join    ◉ Magazine     waiting on you or Sylvie
   ◉ Papers (v1 on a branch, not merged)
   ◉ Home (Sylvie's facts still needed)
 LAYER 3  ● CI ● Substack import ● Courses housekeeping ● Redirects ● Analytics
          ○ Previews tested   ○ Mailboxes, Stripe, fonts
 LAYER 4  ○ Final human review
 LAYER 5  ◉ Launch-day branch ──► your go ──► (( ○ PUBLIC ))
```

Reaction: "perfect, and why is this now so compressed compared to before?" Lesson: keep prose short, not the graph. Keep the layout the reader already knows and mark what changed (★).

## v5: two levels of done, changes marked

Rufus: "join and magazine are good enough to go… so we need to differentiate 'good enough to go' (for v1) from 'we've gone over this with a fine-tooth comb'". Signed off now means the v1 bar; polish is a separate, later, site-wide pass (and a per-page polish plan kept as post-v1 beads). Rufus then also turned the page-by-page final review into one AI sweep plus one human pass, because per-page review was the polishing he had just postponed.

```
 LAYER 2  PAGES (all signed off, all live)
   ● About ★ (no more "media house")   ● Podcast   ● Blog   ● Courses
   ● Join   ● Magazine   ● Events ★    ● Papers ★
   ● Home ★ (new preview image, call button → connection-call page)
   ● Manifesto ★ (approved text)       ● Connection-call page ★
                                   │
 LAYER 3  READY TO GO PUBLIC
   ● CI on push        ● Redirects         ● Analytics
   ● Mailboxes ★       ● Previews tested ★ ● Newsletter decided
   ◐ Sweep fix: 4 slide images ★ (branch claude/sweep-fixes, to merge)
   ○ Stripe product names (minor)      ○ Font licences
                                   │
 LAYER 4  PRE-LAUNCH FINAL PASS
   ● AI sweep ★ (4 fixed, 0 launch flags left)
   ○ Asdra's human pass + image rights  ◄── the one gate
                                   │
 LAYER 5  ◉ Launch-day branch ready ──► your go ──► (( ○ PUBLIC ))

 AFTER V1   ○ Polish pass page by page   ○ Luma pages   ○ Mailer switch   ○ Track 2
```

What worked here: a "the one gate" arrow so the reader sees what to do; "after v1" as its own line so deferred work is visible but not on the path.

## An omission found late: the Manifesto

A nav-only public bar had missed a footer page that Home links to prominently with a "Read the manifesto" button, which was still a draft stub. Rufus: "is the manifesto page done and how come I don't see that in the list of things to sign off?" Lesson: build the node list from the site's real pages (sitemap and nav and footer), not from the bar's wording; the bar can be wrong.

## What the process taught about producing these reports

1. **Start from the goal tree, not the beads.** The table by goal (CSF1–CSF7) is what Rufus found useful from the first version, and the missing forms and manifesto both surfaced by asking "what serves this goal?" rather than "what does the bar depend on?".
2. **Check every ● against the repo.** Marks that were wrong in drafts: analytics (only the signals were chosen), redirects (merged but the bead was open), Papers (merged but the bead said "not merged"), content import (only the v1 subset). `git branch -r --merged origin/main` settles most of them in seconds.
3. **Name what only the reader can do, and what can be delegated.** The report that landed best ended with "you (7 things, two sittings)" and "sub-sessions (5)", then the one gate.
4. **A short reply and a full graph can coexist.** Tight prose, an unchanged layout, ★ on what moved.
5. **Rufus iterates fast and cheaply on shape, so show the shape early.** Each of v1→v3 was one message of feedback; the earlier the diagram, the sooner the legend and layers were right.
6. **Write the symbols in the legend every time.** Beads uses ● for blocked and ✓ for closed, so the legend must say what ours mean.

Rufus's asides worth keeping: "these ascii diagrams have *great* info density", and "the goal tree table is useful btw".
