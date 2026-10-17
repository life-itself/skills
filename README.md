# Skills

Agent skills and recipes used by Rufus Pollock and Life Itself, in one place so they can be installed, improved and shared together. Each skill is a folder in `skills/` with a `SKILL.md`, and works in both Claude Code and Codex.

**Purpose:** one canonical home (not scattered across repos), easy to install everywhere, public so others can use and learn from them. Recent changes are in [changelog/](changelog/); the plan of work is in Beads (`bd list`).

## Install

See [docs/install.md](docs/install.md). Short version: `npx skills add life-itself/skills -g`, or clone and symlink `skills/<name>` into `~/.claude/skills/` and `~/.agents/skills/`. Repo-bound skills (marked below) install per repo instead.

## Skills

| Skill | What it does |
|---|---|
| [changelog](skills/changelog/SKILL.md) | Write a changelog entry at the end of a session that shipped something reader-facing. Fetches the current convention from [life-itself/changelog](https://github.com/life-itself/changelog). |
| [changelog-rollup](skills/changelog-rollup/SKILL.md) | Roll the week's project changelog entries into one draft and handle anything flagged for promotion. *Repo-bound (planning repo).* |
| [plan-for-delegation](skills/plan-for-delegation/SKILL.md) | Choose what to work on next across a portfolio, or specify selected work for eventual AI delegation. |
| [planning](skills/planning/SKILL.md) | Plan the week, the day, or the next hour from the portfolio and calendar. *Repo-bound (planning repo).* |
| [portfolio](skills/portfolio/SKILL.md) | Add to, update and tidy a project/initiative portfolio. *Repo-bound (planning repo).* |
| [project-planning](skills/project-planning/SKILL.md) | Plan big or new work properly: interview-style SCQ and issue tree, sign-off, then hand off to a Logical Thinking Process session. |
| [tree-mindmap](skills/tree-mindmap/SKILL.md) | Draw a question/hypothesis tree as an elegant left-to-right mindmap of the argument (SVG + PNG). *Draft.* |

## Recipes

- [Session handoff: the focus-label pattern](session-handoff.md) (replaces the retired `session-checkpoint` skill and `NEXT.md` files): close one agent session and start the next without handoff files (a static AGENTS.md rule, a `focus` beads label, status in the bead's notes, rules as beads memories).

## Work in development

[Adaptive delegation](docs/adaptive-delegation/adaptive-delegation-work-formulation-skill-2026-09-20.md): a reusable approach to turning rough intentions into delegation-ready work. The [wider orchestration vision](docs/adaptive-delegation/ai-work-orchestration-overall-vision-2026-09-20.md) provides context. Both documents are original design drafts; the skill is not implemented yet. See [NEXT.md](NEXT.md) for where to resume.
