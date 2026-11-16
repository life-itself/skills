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
