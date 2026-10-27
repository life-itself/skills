# Publishing: weekly roll-up and manual promote

What happens to changelog entries *after* they land in a project's own `changelog.md` (see [CONVENTION.md](CONVENTION.md) for that part). This is a different concern with a different audience and a different rhythm:

- **Audience:** whoever's doing the personal/Life Itself weekly review in the planning repo (`~/src/rufuspollock/planning`) — not a project-repo agent drafting one entry. A project repo never needs to read this file.
- **Rhythm:** weekly (roll-up) and per-notable-moment (promote), not per-session. It aggregates *across* repos rather than writing *within* one.
- **Where it runs:** the planning repo, via the `changelog-rollup` skill there (`~/src/life-itself/skills/skills/changelog-rollup/SKILL.md`) — this file is the canonical spec that skill points to, same pattern as `add-to-agents.md` → `CONVENTION.md`.

v1 for both is fully AI-assisted-on-demand — no script, nothing scheduled. See MOTIVATION.md for the fuller reasoning behind "always manual beyond the project's own repo."

## Weekly roll-up (v1) — [issue #2](https://github.com/life-itself/changelog/issues/2)

- **Discovery:** read `~/src/rufuspollock/planning/projects/*.md` frontmatter for a `github:` URL, filtered to non-`done`/non-archived `status:`. That's "every active project."
- **Reading each changelog:** local checkouts only for v1 — if a project's repo isn't checked out, it's skipped (a known v1 gap, not silently wrong: worth a `git clone` before the roll-up if a given project matters that week). No remote-API fetching yet. Read every file in that project's `changelog/` folder whose `date` frontmatter falls in the target week (filename prefix is a quick pre-filter, frontmatter `date` is authoritative).
- **Output:** draft a "This week across projects" section from that week's entries across each active project's `changelog/` folder (text + any embedded images), appended into the existing `week/YYYY-MM-DD.md`. Human edits before it counts as done — same light-curation model as a single project's entry.
- **Where it lives:** the `changelog-rollup` skill in the planning repo, run on demand during the weekly review — not a cron job, not a script in this repo.

## Manual promote (v1) — [issue #3](https://github.com/life-itself/changelog/issues/3)

- **Flag marker:** an entry worth promoting gets `promote: true` in its frontmatter, set at drafting time — by the AI if it judges the entry promotion-worthy (visual entries are the default strong candidates, per `MOTIVATION.md`), confirmed or added by the human. The weekly roll-up already opens every entry file to build the roll-up section, so this isn't about avoiding a read — it's capturing the drafting-time judgment (why this mattered, how it compares to other recent work) that a terse two-sentence entry read cold a week later doesn't carry on its own.
- **Social:** AI drafts a caption from a flagged entry (using its image if it has one), human approves and posts by hand. No auto-posting, no queue — v1 is just "AI drafts, human pastes it in."
- **Site:** there's no dedicated personal/Life Itself site to promote to yet beyond each project's own repo/Flowershow page. Until one exists, "promote to site" is out of scope — revisit once rufuspollock.com or a Life Itself channel is real.
- **Newsletter:** a manual curation step layered on top of the weekly roll-up, not automatic from it — after the roll-up drafts `week/YYYY-MM-DD.md`, the human picks flagged/notable items from it for the ~2000-person newsletter. Same roll-up, second manual pass, higher bar.

## Not doing yet

- No automated weekly-roll-up script pulling from every project's `changelog/` folder — do that by hand (well, AI-assisted-by-hand) first.
- No remote-API reading of a project's changelog — local checkouts only.
- No auto-posting to social media — promotion is always a manual step.
- No dedicated promote queue/dashboard — the `promote` frontmatter flag is the whole mechanism for now.
