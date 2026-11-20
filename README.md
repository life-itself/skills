# Skills

Agent skills for knowledge work: planning, closing out sessions, writing changelogs, research notes, tool choice and visual design. By [Rufus Pollock](https://rufuspollock.com), and used day to day at [Life Itself](https://lifeitself.org).

Each skill is a folder in `skills/` with a `SKILL.md`. They work in Claude Code and Codex. Recent changes are in [changelog/](changelog/), and the plan of work is in Beads (`bd list`).

## Install

```bash
npx skills add rufuspollock/skills -g
```

Or clone the repo and symlink `skills/<name>` into `~/.claude/skills/` and `~/.agents/skills/`. Skills marked *repo-bound* below are installed per repo instead. Details: [docs/install.md](docs/install.md).

## Skills

| Skill | What it does |
|---|---|
| [changelog](skills/changelog/SKILL.md) | Write a changelog entry at the end of a session that shipped something reader-facing. Fetches the current convention from [life-itself/changelog](https://github.com/life-itself/changelog). |
| [changelog-rollup](skills/changelog-rollup/SKILL.md) | Roll the week's project changelog entries into one draft and handle anything flagged for promotion. *Repo-bound (planning repo).* |
| [close-out](skills/close-out/SKILL.md) | Close out a finished session: sweep for loose ends (asking only where unclear), bring Beads, docs and changelog up to date, verify, push, and report a short "closed out" TL;DR. *Draft.* |
| [designing-look-and-feel](skills/designing-look-and-feel/SKILL.md) | Develop a visual identity in stages on one living brief page: mood board, then side-by-side direction specimens, then marks, then full pages. *Draft.* |
| [finding-channels](skills/finding-channels/SKILL.md) | Find where an audience actually gathers: named communities, newsletters, lists and people per audience segment (and per item in a catalogue), each checked with a URL, size, dated activity and house rules, then a shortlist with stop rules. *Draft.* |
| [google-chat](skills/google-chat/SKILL.md) | Read and post in Google Chat from an AI session: as you via the Chat API (list, read, post, reply, DM, with a 🤖 marker), or as an app via a per-space webhook anyone can set up. *Draft.* |
| [marketing-strategy](skills/marketing-strategy/SKILL.md) | Write a lightweight campaign strategy (context, dated goals, audiences, value proposition, messaging and channels, budget, calendar, results) plus a marketing pack of ready copy. From [Marketing Strategy Structure](https://tao.rufuspollock.com/Marketing+Strategy+Structure.md). *Draft.* |
| [plan-for-delegation](skills/plan-for-delegation/SKILL.md) | Choose what to work on next across a portfolio, or specify selected work for eventual AI delegation. |
| [planning](skills/planning/SKILL.md) | Plan the week, the day, or the next hour from the portfolio and calendar. *Repo-bound (planning repo).* |
| [portfolio](skills/portfolio/SKILL.md) | Add to, update and tidy a project/initiative portfolio. *Repo-bound (planning repo).* |
| [project-planning](skills/project-planning/SKILL.md) | Plan big or new work properly: interview-style SCQ and issue tree, sign-off, then hand off to a Logical Thinking Process session. |
| [project-status-report](skills/project-status-report/SKILL.md) | Report where a Beads + LTP project stands: TL;DR, a goal-tree table, one ASCII dependency graph per track, asks and decisions. *Draft.* |
| [research-note](skills/research-note/SKILL.md) | Write a note about a person or field: pick the depth first (quick stub by default), or go deeper with a question tree, tiered evidence, a fact-check subagent and a credited portrait. *Draft.* |
| [tool-evaluation](skills/tool-evaluation/SKILL.md) | Choose a tool or find alternatives to one: job stories, 3–5 weighted criteria, a scored shortlist with the current tool as baseline, one pick plus a backup, and a trial plan. From [Tool Evaluation](https://tao.rufuspollock.com/Tool+Evaluation). *Draft.* |

## Recipes

- [Writing well](docs/writing-well/README.md): examples and lessons towards a future writing skill, starting with a blog post that got weaker through revision.
- [Session handoff: the focus-label pattern](session-handoff.md) (replaces the retired `session-checkpoint` skill and `NEXT.md` files): close one agent session and start the next without handoff files (a static AGENTS.md rule, a `focus` beads label, status in the bead's notes, rules as beads memories).

## Work in development

[Adaptive delegation](docs/adaptive-delegation/adaptive-delegation-work-formulation-skill-2026-09-20.md): a reusable approach to turning rough intentions into delegation-ready work. The [wider orchestration vision](docs/adaptive-delegation/ai-work-orchestration-overall-vision-2026-09-20.md) provides context. Both documents are original design drafts; the skill is not implemented yet. Open work is tracked in Beads.

## License

MIT. See [LICENSE](LICENSE).
