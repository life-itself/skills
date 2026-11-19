# Writing skills

How to write and edit skills in this repo. For the general method (testing a
skill against a baseline), see the `superpowers:writing-skills` skill.

## Concise, but enough to act on

Walk the line between brevity and having enough detail to act reliably and
consistently. Too long, and agents skim and miss the rule that matters. Too
short, and each agent fills the gaps its own way, so results drift.

Test: could a fresh agent, with only this skill and the repo in front of it,
produce the same output as the last one? If not, add the missing rule. If a line
would not change what it does, cut it.

- **Self-contained.** Put the rules the skill needs in the skill. Don't make it
  depend on a long doc in another repo: the agent may not have that repo, or
  may skip reading it, and the two drift apart. Link out only for optional
  depth.
- **Inline rules, not the whole schema.** Include what the skill writes or
  checks (required fields, vocabularies, naming). For the long tail, say
  "copy how existing files do it" rather than listing every field.
- **One concrete example** of each output beats a paragraph describing it.
  Keep examples current: a stale example is copied faithfully.
- **Name the common mistakes** you have actually seen, briefly.
- **Core in `SKILL.md`, detail in a reference file.** `SKILL.md` is read every
  time, so keep it to the workflow and the rules most often got wrong. Put
  material needed only sometimes (a full schema, setup steps) in a file in the
  skill folder, and say when to read it.
- **Shared reference, one copy.** If several skills need the same model, keep
  one file (e.g. [portfolio/data-model.md](../skills/portfolio/data-model.md))
  and have each skill link to it. Repos can add a local `docs/data-model.md`
  that overrides it; skills must check for one.
- **Point to shared conventions** (e.g. [reply shape](reply-shape.md)) instead
  of restating them.

## Folder layout and loading

Skills load in three levels (progressive disclosure), so cost grows only with use:

1. **Frontmatter** (`name`, `description`): always in context, about 100 tokens per skill, for every installed skill. This is what decides whether the skill triggers.
2. **`SKILL.md` body**: read when the skill triggers. Keep it under 500 lines (aim for under ~600 words in this repo).
3. **Other files in the folder**: cost nothing until read. Scripts are run, and only their output enters context.

Rules that follow:

- **README.md in a skill folder: optional, for humans.** `SKILL.md` is what agents read, so it stays the single source of the rules and is tuned for agents and tokens. A short `README.md` may sit beside it for people browsing GitHub: what the skill is for, an example prompt, where it came from, test status. Agents never need to read it, so don't link it from `SKILL.md` and never put rules there. (Open question: Anthropic's own [skills repo](https://github.com/anthropics/skills) has no per-skill READMEs and an older Anthropic skill-creator said not to add them; Rufus finds them useful. Trialled on `tool-evaluation` first.) Test notes go in a `test-log.md` (see `project-planning`).
- **Reference files one level deep**, each linked directly from `SKILL.md` with a line saying when to read it. Nested links get read partially. Give any reference file over ~100 lines a contents list at the top. Name files for content (`rubric.md`, not `notes2.md`).
- **Scripts over prose** for fragile, exact steps: say whether to run or read the file.

## Frontmatter

- `name`: lowercase letters, numbers, hyphens; at most 64 characters; must match the folder name. Noun names (`research-note`) and gerunds (`designing-look-and-feel`) are both fine; prefer the name people already use for the method.
- `description`: at most 1,024 characters, third person. Give a short phrase of scope and then the triggers in detail ("Use when …", with the words a user would actually say), plus a "Not for …" clause if it could over-trigger. **Never summarise the steps**: agents follow the summary and skip the body.
- House fields: `license: MIT`, and `metadata` with `author`, `status` (`draft` until tested on real use) and `origin` (link to the source page or note).

## Token economy

- Assume the agent is smart: add only what it would not do unaided. For each line, ask whether removing it would change the output.
- One default, not a menu, with an escape hatch for exceptions.
- No time-sensitive facts (prices, versions, "as of" dates) in the skill; tell the agent how to check them instead.
- One term per concept throughout.

## Testing

Test before trusting (Anthropic's evaluation-driven approach and superpowers' RED-GREEN are the same idea):

1. **Baseline:** give a fresh subagent a realistic task without the skill and note what it gets wrong.
2. Write a short rubric (5–7 pass/fail checks) aimed at those failures, and write the skill to fix them, nothing more.
3. **With skill:** run the same task in a fresh subagent told to read the `SKILL.md` first; score both against the rubric.
4. Fix gaps, re-run. Record each run in the skill's `test-log.md`.

Sources: [Anthropic skill best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices), [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview), [agentskills.io spec](https://agentskills.io/specification).
