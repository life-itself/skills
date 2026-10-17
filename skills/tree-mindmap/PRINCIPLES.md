# Tree mindmap: principles

Why [SKILL.md](SKILL.md) draws trees the way it does. From the trials on the Wise AI briefing (2026-10-17) and Rufus's steer: *give people a mindmap of the argument; elegance and simplicity over everything*. Background research and the earlier, rejected poster designs are in the planning repo under `projects/2026-shareable-tree-visuals/`.

## Form

1. **A classic mindmap, left to right.** Root on the left, branches fanning right, as in Coggle or good mindmap software. Reading left to right is reading from question to answer to reasons; the shape of the argument is visible before a word is read.
2. **No blocks.** No boxes, cards, panels, columns or bands. Text sits on white, connected by lines. Blocks make an argument look like a slide or a software diagram; the earlier poster trials were rejected for exactly this.
3. **A relaxed fan from one seed.** All level-1 branches spring from one red seed just right of the root. Give the root fan real horizontal room (run ≥ half the vertical spread); near-vertical curves bunched at the root are the strongest "generated" signal.
3a. **Shared fan origins.** Each column's children fan out from one vertical line just right of that column; a hairline leads out of each parent's label to it, so the branch flows out of the label (the Coggle move) rather than starting in empty space.
3b. **Tapering ribbons, landing flat.** Each branch is a filled ribbon that thins to about half its width as it goes (2.4 → 1.6 → 1.3 px by depth), leaving horizontally and landing flat into the child's text. No stroke under 1.3 px, or it vanishes in a feed.
3c. **Few dots.** A small dot only where a level-1 branch lands; leaves have none (a dot on every leaf reads as a bullet list).
4. **Two or three levels.** Root, pillars, children. A whole area: question → sub-tree answers → short pillar labels. One sub-tree: question → pillars → their children.

## Text

5. **The text is the design.** No layout makes sentence-length nodes elegant; short leads are written, ideally by the author with the tree. Quote them verbatim.
6. **Label + continuation.** A pillar's first 2–6 words in Mittel, the rest of the same sentence in Regular below. Skimmers read the labels; readers read the sentences; nothing is repeated. Lines are balance-wrapped so a node is a neat block, not a long line and a stub.
7. **Questions in grey, above.** When a map shows questions and answers together, the question is a small grey kicker above its answer, as in a question tree. The root is the question.
8. **Never cut a qualifier; never add a claim.** Drift happens in the small text: check every shortened string against its source.

## Style (borrowed from the Seeds of Renaissance diagram style, for now)

9. **One face, no bold:** Apfel Grotezk Regular, Mittel for labels. Title 46 px, subtitle 28 px grey, root 40 px, labels 32 px, text 26 px, at 1600 px wide. Nothing below 26 px except the footer.
10. **Ink on white; red for one thing.** Lines and text in ink (#1b1916), notes at 60% ink, the root dot in red (#e5201c), and red for the single branch that matters (usually the "So" synthesis). Never red as decoration.
11. **Title top left, map aligned under it, footer bottom right.** The title states the claim; the subtitle says what it means or why; the footer carries author, project, status and date, so the image stays attributed when shared alone.
12. **Real text, embedded fonts.** The SVG keeps its text selectable and searchable and embeds Apfel, so it renders anywhere; the PNG (2x) is for posting.

## Open (to research later)

- Colour per branch (Coggle) versus SoR's ink-and-red restraint.
- Phone-shaped versions (the maps are ~1600 × 1500; a 4:5 crop or a carousel of branches).
- Questions-only view of the same tree, and a radial layout for larger trees.
