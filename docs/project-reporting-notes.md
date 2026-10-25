# Project reporting: notes toward a skill

Working notes for a future skill that reports project status from Beads plus an LTP plan (goal tree, transition). Collected from Rufus's feedback while reporting on the Seeds of Renaissance website (sor-website, planning session, 2026-10-23). Add to these as more feedback comes in.

Evolution of the graph, version by version: [project-reporting/evolution.md](project-reporting/evolution.md). Now a draft skill: [project-status-report](../skills/project-status-report/SKILL.md), with this example in [references/](../skills/project-status-report/references/sor-website-2026-10-23.md). Keep collecting feedback here, then fold it into the skill.

## What works

- **A table against the goal tree.** One row per critical success factor: status (🟢🟡🔴), what is live, the gap, the bead that closes it. Rufus: "the goal tree table is useful".
- **A dependency graph per track** (nodes and edges, as in a mathematical graph). Nodes are features or milestones, not tasks; edges mean "needed before". One diagram per track, so each has room.
- **A legend on every diagram.** ● done, ◉ at review (waiting on a person), ◐ being built, ○ not started. Solid for done reads best. Rufus (2026-10-23): "in progress" was wrong for pages that were only waiting on review; review needs its own mark, like a pair of eyes. ◉ looks like an eye and stays one character wide.
- **Lay the graph out in layers, top to bottom** (foundations → pages → ready to go public → final review → goal), with plenty of space. A dense left-to-right graph squeezed onto one line per stream was unreadable.

- **Progressive detail.** First pass: one simple graph per track with layers as single nodes ("Pages: 4 of 9 signed off"). Then an expanded version, or one graph per layer, when the reader wants to go deeper. Rufus on the layered Track 1 graph: "way better".
- **ASCII over SVG or Mermaid** for status in chat: very dense, renders anywhere (terminal, chat, Markdown), costs only the characters, needs no render step, and is easy to edit next time. Use SVG or Mermaid only for a published page.

- **Two levels of done** (Rufus, 2026-10-23): "good enough to go" vs "gone over with a fine-tooth comb". Signed off for v1 is ●; polish is a separate, later, site-wide pass, not a per-page gate.

## What does not work

- **Compressing the graph to keep a reply short.** The brevity goes in the prose; the graph keeps the layout from the last report, marking what changed.

- **Progress bars per "area".** The areas were vague (what is "guard"? "landing"?), and bars give every area equal weight when they are not equal (link previews ≠ all the pages).
- **Marking a node done when only part is done.** "Content imported ✓" hid that only the v1 subset was in and the archives (Substack, old episodes, past events) were not. Split the node: "v1 subset ●", "archives ○".
- **Leaving out a big piece of work** because it is not in the formal dependency list (forms wiring was missing from the launch graph). Check the graph against the goal tree: every CSF gap should show up somewhere.

## Shape of a status report

1. TL;DR (one or two lines, honest about slips).
2. Goal-tree table.
3. One graph per track, with a legend.
4. **You:** at most three asks, each with a recommendation.
5. **Decided:** one-liners.

## Example: Track 1 graph (sor-website, 2026-10-23)

As shown to Rufus. A later check against the beads and repo found several wrong marks (e.g. "● Analytics" when only the signals were chosen); the corrected version is in the [skill's worked example](../skills/project-status-report/references/sor-website-2026-10-23.md).

```
 LAYER 1  FOUNDATIONS
   ● Astro on Pages      ● Design system      ● v1 content subset
             └───────────────────┬───────────────────┘
                                 ▼
 LAYER 2  PAGES                          built → review → signed off
   ● About   ● Podcast   ● Blog   ● Courses     signed off
   ◐ Events                                     at review
   ◐ Join    ◐ Magazine                         built, to review
   ○ Papers                                     brief waits on OK
   ◐ Home                                       at review, signed off last
                                 │
                                 ▼
 LAYER 3  READY TO GO PUBLIC            (in parallel with layer 2)
   ● Redirects ─────────────► ○ Old-domain switch (at launch)
   ● Link previews built ───► ○ Tested in real apps
   ● Analytics
   ◐ Forms code merged ─────► ○ Newsletter destination ──► ○ Forms on
   ○ CI on push
                                 │
                                 ▼
 LAYER 4  ○ FINAL HUMAN REVIEW of every page
                                 │
                                 ▼
          (( ○ PUBLIC: draft marker off ))
```
