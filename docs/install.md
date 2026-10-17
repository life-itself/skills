# Installing these skills (Claude Code and Codex)

Checked against current docs on 2026-10-17: Claude Code (code.claude.com/docs: skills, plugin-marketplaces, host-marketplace), Codex (developers.openai.com/codex/skills, /plugins/build/plugins), and the `vercel-labs/skills` README.

## Short answer

- **Rufus (author):** keep user-level symlinks into the working clone. Edits are live in both tools. Nothing to change.
- **Teammate:** `npx skills add life-itself/skills -g` (or clone and symlink, same result).
- **Later, if this grows beyond a few people:** add a plugin marketplace on top. Not now.

## Facts that drive the choice

- Claude Code reads `~/.claude/skills/<name>/` (personal) and `.claude/skills/<name>/` (project). A skill folder can be a symlink. Changes to `SKILL.md` are picked up mid-session; a brand-new top-level skills dir needs `/reload-skills`.
- Codex reads `~/.agents/skills/` (user), `.agents/skills/` (repo, walking up to repo root) and `/etc/codex/skills`. Symlinks are followed. Changes are detected live (restart if not).
- Both use the same `SKILL.md` format (frontmatter `name` + `description`), so one folder serves both.
- Plugins are the "official" distribution path in both tools, but in Claude Code plugin skills are namespaced (`/plugin:skill`), and installed plugins are cached copies: edits only show after a version bump or, for a local-path marketplace, a session restart or `/reload-plugins`. Codex local plugin installs are also cached and need an app restart. Both need extra manifest files.

## Options

| Option | Claude Code | Codex | Live editing | Teammate effort | Verdict |
|---|---|---|---|---|---|
| **A. User-level symlinks** into a clone (`~/.claude/skills/x`, `~/.agents/skills/x` → clone) | yes | yes | yes, instant | clone + 2 `ln -s` per skill | **Author setup** |
| **B. `npx skills add life-itself/skills -g`** (vercel-labs installer; symlinks both agents to one canonical copy) | yes | yes | no (copy of repo; `npx skills update`) | one command | **Teammate setup** |
| **C. Plugin marketplace** (`.claude-plugin/marketplace.json` for Claude; `.agents/plugins/marketplace.json` for Codex; `plugin add owner/repo`) | yes | yes, separate manifest | cached; version bump or reload | two commands per tool; auto-update opt-in; admin can force via settings | Later |
| **D. Per-repo copies** (`.claude/skills/`, `.agents/skills/` committed in each repo) | yes | yes | no | none once committed | Only for a repo that must work for anyone who clones it. Drifts. |
| **E. Git submodule** of this repo in each repo | needs symlinks into `.claude/skills` anyway | same | no | high (submodule pain) | Avoid |
| **F. Codex `$skill-installer`** | no | yes | no | Codex only | Skip; Codex docs steer own skills to plugins |

## Decisions

### 1. Author setup: keep user-level symlinks (A)
- **Why:** only option that is instantly live for both tools and needs no manifests. Already working.
- **Reversibility:** easily reversible (delete links). No action needed.

### 2. Teammate install: `npx skills add life-itself/skills -g` (B)
- **Why:** one command, both agents, symlink mode keeps a single canonical copy, `npx skills update` pulls changes. Needs Node, which the team has. Fallback with no Node: `git clone` + `ln -s skills/<name> ~/.claude/skills/<name>` and the same for `~/.agents/skills/`.
- **Reversibility:** easily reversible (`npx skills remove`). Verify once on a clean machine before announcing: I did not run the installer here, so the exact flags above come from its README only.

### 3. Plugin marketplace (C): defer
- **Why:** gives auto-update, org-wide enablement (`extraKnownMarketplaces` + `enabledPlugins`) and versioning, but adds two manifest formats, `/plugin:skill` namespacing, version-bump discipline, and cached copies that break the live-edit loop. Worth it only when non-technical teammates or an admin-forced rollout matter.
- **Reversibility:** mostly reversible, but **the plugin `name` becomes a user-facing identifier** (renaming needs a `renames` map). Pick the name carefully when you do it. Medium-sized decision; not needed yet.

### 4. Where skills are installed: user-level, not per-repo
- **Why:** one install, available in every repo, no drift. Cost is that every installed skill's description is in every session (see below). Per-repo installs only make sense if the skill is irrelevant elsewhere.
- **Reversibility:** easily reversible.

### 5. Layout of this repo: keep `skills/<name>/SKILL.md`
- **Why:** this is the layout `npx skills`, Claude plugins and Codex plugins all expect, so options B and C both work later without restructuring. Do not add manifests until C is chosen.
- **Reversibility:** moving folders is cheap now, but costly after teammates install (paths in links). **Treat as the one medium-big decision**: settle folder names before announcing to the team.

## Context cost

- **Descriptions always loaded, bodies on demand.** Both tools put only name + description (+ path) in context; the full `SKILL.md` loads when the skill is chosen, and stays in the conversation after that.
- **Claude Code:** combined `description` + `when_to_use` is truncated at 1,536 characters per skill; `disable-model-invocation: true` removes the skill from context entirely (user must type `/name`).
- **Codex:** the whole skill list gets about 2% of the context window (8,000 chars if unknown). Over budget, Codex shortens descriptions first, then drops skills with a warning. `skills.max_context_tokens` raises it to at most 10k tokens. `allow_implicit_invocation: false` in `agents/openai.yaml` keeps a skill out of automatic selection (explicit `$skill` still works).
- **Rough sense of scale (my estimate, not from the docs):** a tight description costs on the order of 50 to 100 tokens per session; a long one several times that. Rufus's own `~/.claude/skills` holds about 80 entries (mostly gstack and Cloudflare), so that pile dwarfs these three skills. Trimming it matters more than anything done here.

### What authors should do

1. Description = trigger only: "Use when ..." plus the key case first. Aim for one or two sentences, well under 300 characters. No workflow summary in the description (the body says how).
2. Keep `SKILL.md` lean (a few hundred lines at most); push detail into sub-files the skill tells the agent to read when needed.
3. Mark explicit-only skills as such: `disable-model-invocation: true` (Claude) and `allow_implicit_invocation: false` (Codex). `project-planning` is a candidate: its description says "usually invoked explicitly" and is the longest of the three.
4. Fewer, sharper skills beat many overlapping ones; merge skills with similar triggers.
5. Install only what the team uses. Not every skill belongs in every user's global install.

## Teammate steps (copy into README when ready)

```bash
npx skills add life-itself/skills -g   # choose Claude Code and Codex when asked
npx skills update -g                   # later, to pull changes
```

No Node: `git clone https://github.com/life-itself/skills ~/src/life-itself/skills`, then for each skill, `ln -s ~/src/life-itself/skills/skills/<name> ~/.claude/skills/<name>` and the same into `~/.agents/skills/`.

## Open items

- Test option B on a clean account before announcing it.
- Decide whether `project-planning` becomes explicit-only.
- Revisit plugins (C) if the team passes roughly five regular users or someone wants enforced install.
