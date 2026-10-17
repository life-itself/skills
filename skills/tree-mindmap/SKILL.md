---
name: tree-mindmap
description: Use when turning an SCQ question tree or hypothesis tree (a governing question or answer with supporting assertions) into a beautiful, shareable mindmap of the argument — root on the left, branches curving right, plain text, no boxes. Writes the tree as a small JSON file and renders SVG (real text, fonts embedded) and PNG with a bundled script. Not for flowcharts or architecture diagrams.
license: Proprietary
metadata:
  author: rgrp
  status: draft
  origin: planning repo, projects/2026-shareable-tree-visuals (2026-10-17)
---

# Tree mindmap

Give people a **mindmap of the argument**: the question at the root on the left, the answers branching right in thin curved lines, each node plain text on white. Elegant and simple first; everything else second. The look is borrowed from the Seeds of Renaissance diagram style (Apfel Grotezk, no bold, ink lines, red only for what matters); see [PRINCIPLES.md](PRINCIPLES.md) for the reasons.

## Procedure

### 1. Write the text (most of the work)

From the Markdown tree, write a JSON file (schema below). For each node:

- **Root** (`label`, optional `note`): the question, short. A second half of the question can go in `note` (grey).
- **Level 1** (`label`, `text`, optional `note`): the pillars. `label` is the 2–6 words a skimmer reads (set in Mittel); `text` continues the sentence or gives the answer (Regular); `note` is grey — use it for the sub-question when the map shows questions and answers together.
- **Level 2+** (`text`): one assertion each, ≤ ~14 words.
- **Title** (top left, the claim if there is one) and **subtitle** (grey: what it means, or why, in one sentence). **Footer** (bottom right): author · project · status and date. **Alt**: what the map claims, in a few sentences.

Rules:

- **Quote, don't paraphrase.** Use the tree's bold leads verbatim. Split a lead into `label` + `text` at a natural break so it still reads as one sentence ("**The risks are real** and contested, and…").
- **Never cut a qualifier** ("partly", "plausibly", "mostly", "not yet", "external"). When you must shorten, cut clauses, then compare with the source and list what you dropped.
- **No new claims.** Every string traces to a numbered node. List drafted or shortened strings in a `texts.md` beside the output for the author to check.
- **Two or three levels.** A map of a whole area shows sub-tree answers plus short pillar labels; a map of one sub-tree shows its pillars and their children. Deeper detail stays in the source.
- **The synthesis node** ("So: …") is the last level-1 branch, marked `"accent": true` (red). Use red for that one thing only.

### 2. Render

```bash
SKILL=~/.claude/skills/tree-mindmap      # wherever this skill is installed
"$SKILL/scripts/mindmap.sh" path/to/map.json
```

Writes `map.svg` (real text, Apfel embedded, renders anywhere) and `map.png` (2x), and prints `OK` or problems (`map too wide: …`). Needs Google Chrome (override with `CHROME=`) and python3. A render takes a few seconds; occasionally Chrome is slow, so allow up to two minutes.

### 3. Look, then iterate

Read the PNG. Check:

- [ ] The root and the level-1 labels read in ten seconds as the shape of the argument.
- [ ] Curves are relaxed S-shapes, not near-vertical; no line crosses text.
- [ ] Line breaks fall at phrase boundaries; no one-word last lines.
- [ ] Red only on the root dot and the one branch that matters.
- [ ] Every string traces to the source; qualifiers intact.
- [ ] Title, subtitle, footer present; the status says draft if it is.

Fixes, in order: shorten text; change a wrap width or gap in `config`; only then change the defaults in `mindmap.js`. If `map too wide`, narrow `config.wrap` or shorten the longest nodes.

For a stronger check, show a fresh subagent only the PNG and ask: what is the main claim, what are the reasons, what question does it answer, what did you skip?

## JSON schema

```json
{
  "title": "Go at the speed of wisdom",
  "subtitle": "One grey sentence: what it means, or why.",
  "footer": "Author · Project · Draft, October 2026",
  "alt": "What the map claims.",
  "config": {"width": 1600, "wrap": [300, 420, 480, 440], "gapX": [150, 96, 72], "gapY": [0, 34, 12, 10]},
  "root": {
    "label": "How fast should we develop AI?",
    "note": "optional grey second line",
    "children": [
      {"label": "The risks are real", "text": "and contested, and the uncertainty itself calls for caution.", "note": "optional grey line",
       "children": [{"text": "Four kinds of catastrophe threaten, and two would survive successful alignment."}]},
      {"label": "So every actor should push", "text": "towards the speed of wisdom, each with its own lever.", "accent": true,
       "children": [{"text": "Labs: accept binding external checks."}]}
    ]
  }
}
```

`config` is optional: `wrap` is the maximum text width per depth (root, level 1, level 2, level 3), `gapX` the room for curves after each depth, `gapY` the gap between siblings at each depth. Width 1600 suits sharing and slides; the height follows the content. A full example: [examples/q2-mindmap.json](examples/q2-mindmap.json).

## Files

- [PRINCIPLES.md](PRINCIPLES.md): why it looks like this.
- [scripts/mindmap.sh](scripts/mindmap.sh): JSON → SVG + PNG via headless Chrome.
- [scripts/mindmap.js](scripts/mindmap.js): the layout (left-to-right tidy tree, cubic curves, tapering strokes, text wrapping, overflow check) and drawing.
- [fonts/](fonts/): Apfel Grotezk Regular and Mittel (SIL OFL).
