> Historical design rationale. Current instructions live in this skill.

# Motivation

This is the working record — situation, complication, question tree, and hypothesis — behind why this repo exists and what it's for. Copied over from `~/src/me/planning` (where it was worked through interactively, SCQH-style) so this repo is self-contained and doesn't require that repo to be checked out to understand why things are the way they are. The planning repo keeps its own copy too; this isn't the only place it lives, just the place that doesn't require anything else checked out to read.

It's a historical record of *how the decisions got made*, not the current spec — for the current spec, see [CONVENTION.md](CONVENTION.md) and [add-to-agents.md](add-to-agents.md). In particular, some of the reasoning below refers to `CHANGELOG.md` (uppercase); that was later revised to lowercase `changelog.md` for Flowershow-publishing reasons — see CONVENTION.md for the current filename.

Two linked documents, worked through in that order: a general problem (Part 1) about not publishing what I produce at all, and a visual-specific child problem (Part 2) about capturing and storing screenshots/video. Cross-references between them below point to sections in this same file rather than the original separate files.

---

# Part 1 — Changelog for Me (the general publishing-indecision problem)

Parent document — covers the general "where does this go?" problem across all output (text and visual). The visual-capture-and-storage specifics are the separate, linked child problem in [Part 2](#part-2--central-visual-changelog-the-visual-specific-problem) below.

## S — Situation

I work rapidly across many projects — some Life Itself, some Datopian, some personal — and I produce a lot: code, writing, research. AI has sharply increased the pace, but even before AI I generated a lot without writing it up. I don't regularly or reliably produce changelogs — not per-project, not a personal one as a whole on my own website, and I don't send out periodic updates on what I've been up to.

Two things make this newly tractable. AI can help automate or at least polish an outward write-up of what I've done — polishing my own rough notes, or drafting the entry itself from a description of the work (I've already looked into this for text entries generated from commits — see `rufuspollock.com/2026-02-25-changelogs-lightweight-best-practice.md`). Separately, most of my projects already have a Git log I could draw on as raw material — though I don't know how good that raw material actually is; likely stronger for code-heavy projects than for writing/research work.

## C — Complication

This isn't just tidiness. A changelog makes a project look active and lets anyone who lands on it see what's actually going on — without one, finished work is invisible, even though almost no one goes and visits a project's changelog page unprompted. And posting about progress on social media promotes the project and me directly — people follow what I'm up to, and that's genuinely valuable, not a nice-to-have.

Four distinct gaps, not one:

- **I often don't write the entry at all.** There's no step in my workflow that produces a changelog entry as a by-product of doing the work — it has to be a deliberate, separate act I remember to do, so mostly I don't. This needs to be a built-in (ideally automated/AI-assisted) step, not an afterthought.
- **When I do write something, I stall on where it goes.** There isn't one publishing destination — there are several plausible ones for any given piece of work: a per-project changelog, Life Itself's own channels, my personal site (day-to-day feed vs. weekly/monthly review), a newsletter reaching ~2000 people, or nowhere public at all. Because there's no default, I have to actively decide the destination each time — and that decision point is where things stall. The item sits finished-but-unposted, or half-written, and the moment passes.
- **I don't reliably capture the visual side either.** Before/after screenshots or short videos of what I've been up to are the most compelling thing to share right now, but I forget to grab them before the moment passes, and by the time I think of it the app has moved on and the "before" state is gone for good. It's the same "no built-in capture step" gap as above, just for visual material — the capture and storage specifics get worked out in [Part 2](#part-2--central-visual-changelog-the-visual-specific-problem) rather than duplicated here.
- **Beyond individual entries, the aggregate write-ups don't get created either.** A personal weekly/monthly "what I've been up to," a Life Itself equivalent, and social media posts about progress are a different thing from a per-project changelog entry, and right now none of them happen. This isn't just a mechanics question of how entries roll up — the aggregate output itself has the same "nothing prompts me to actually produce it" gap as the first one, just one level up, and it could plausibly grow into its own SCQH later. For now I'm tracking it here as a fourth branch rather than splitting it out, since it shares the same root cause as the per-entry gap.

None of these is a one-off annoyance — all four are recurring, and all four are about to get worse with AI in the loop: an AI agent finishing a piece of work has nothing prompting it to write (or capture) the entry, and even if it does, it will ask "where does this go?" and either block on me or default arbitrarily, unless there's a clear policy for these steps.

## Q — Question (main)

What's the built-in step that gets each changelog entry written as a by-product of doing the work, the built-in step that turns those entries into the aggregate outputs I actually want — a personal weekly/monthly update, a Life Itself equivalent, social media posts — and the smallest set of default destinations and a decision rule for both levels, so that I (or an AI acting for me) reliably produce *and* publish all of this without depending on me remembering or deliberating in the moment?

### Sub-questions

- **Capture** — getting the entry written at all
  - What triggers writing an entry — end of a work session, a shipped milestone, a commit, something else?
  - How good is my existing Git log as raw material for auto-generating entries, and does that vary by project type (code-heavy vs. writing/research work)?
  - Can this be substantially automated/AI-drafted (as already scoped for text in the existing changelog-generation research), so the effort is reviewing a draft rather than writing from scratch?
  - Is this the same trigger/step as the visual capture question in the child SCQH, or a separate one that happens to produce a linked entry?
- **Destinations** — what are the actual distinct places, and what is each one for?
  - What's the difference in purpose between a day-to-day site changelog, a weekly/monthly personal review, and the newsletter — audience, frequency, effort to produce?
  - Is there a legitimate private/self-only tier (not published anywhere public), or does everything need a public home eventually?
  - Do Life Itself and personal (rufuspollock.com) need genuinely separate destinations, or can one policy cover both with an org/tag distinction?
- **Default & escalation rule** — how does something move from private → public → wide?
  - What's the always-safe default when nothing else has been decided (e.g. "post to my own day-to-day feed")?
  - Under what condition does an entry graduate from the personal feed to a Life Itself channel or the newsletter — manual promotion, or automatic via aggregation?
  - Should the default differ by content type (project update vs. essay/research post vs. visual/screenshot)?
- **Aggregate output** — does the aggregate write-up itself get produced, and how?
  - What triggers producing it at all — a fixed schedule (weekly/monthly), or does it also need a deliberate act like the per-entry gap does?
  - Can weekly/monthly reviews and the newsletter be substantially built by rolling up day-to-day entries, rather than written fresh each time?
  - Is social media its own channel with its own trigger/cadence (per notable moment, not periodic), or does it get fed from the same aggregate output?
  - What's the minimum cadence I can actually sustain without it becoming its own chore?
- **AI behavior** — what should an AI agent do by default?
  - Should an AI draft a changelog entry unprompted when it finishes a unit of work, rather than waiting to be asked?
  - When an AI finishes work and no destination is specified, what should it default to — post to the safe default, draft-only and ask, something else?
  - Should "publish" ever be an action AI takes autonomously, or does it always stop at draft for my review before anything goes out?

## H — Hypothesis

First pass — quick-and-dirty, meant to be trialed and revised, not the final architecture. Working through the issue tree, answering inline:

**Capture**
- Trigger → **piggyback on the existing session-checkpoint moment.** I already stop and checkpoint sessions (`skills/session-checkpoint/` in the planning repo) — add "draft a changelog entry" as a standard step there, so it's a byproduct of a habit I already have, not a new one to build.
  - If something visual happened this session → grab the screenshot/video at the same moment, same trigger, not a separate ritual.
- Git log quality → **treat as backup enrichment, not the primary source.** AI drafts the entry from what actually happened in the session (it has that context already); git log fills gaps, useful mainly for code-heavy projects.
- Automate/AI-draft? → **Yes, AI drafts, I skim/edit** — matches the "light human curation" sweet spot from the existing changelog-generation research.

**Destinations**
- Day-to-day vs weekly/monthly vs newsletter → **day-to-day = raw entry (low effort, near-zero audience); weekly = curated roll-up (small reflective audience); newsletter = manually promoted highlights only (big audience, high bar).**
- Private tier → **already exists** — a `status_notes` line or a project's own changelog file *is* the private tier. No new mechanism needed.
- Life Itself vs personal → **one policy, org is just a tag.** Don't split the mechanism. *(Note: this held for the publishing-decision logic; the storage question in Part 2 initially disagreed with this and split by org, then reversed again — see Part 2's Hypothesis for the full back-and-forth.)*

**Default & escalation rule**
- Safe default → **every entry always gets committed to the project's own changelog. No decision required — that's the floor, and it's a fine floor.**
- Escalation to Life Itself channel / newsletter → **always manual, never automatic.** Preserves the value of those channels (curation) and stops me feeling obligated to broadcast everything.
- Differ by content type → **no, one rule for v1.**

**Aggregate output**
- Trigger → **weekly, tied to the existing `week/` review** — I already write one; auto-draft it by rolling up that week's changelog entries across projects instead of starting blank.
- Social media → **its own trigger: per notable moment, not periodic** — decided in the moment when something's worth showing, AI drafts a caption, I approve. Different rhythm from the weekly roll-up on purpose.

**AI behavior**
- Draft unprompted? → **Yes, standard step in session-checkpoint.**
- Default destination when unspecified → **commit to the project's own changelog, always — never block waiting to ask.**
- Autonomous publish? → **Committing to the project's own repo can be autonomous** (low-stakes, reversible). **Anything leaving that repo — site, social, newsletter — waits for my go-ahead.**

**Synthesis:** Fold changelog-drafting into the session-checkpoint step I already do. Every entry defaults to landing in the project's own changelog with zero decision required — that's the universal floor that kills the stalling. Weekly, roll those entries up into the `week/` review I already write, auto-drafted, human-edited. Anything beyond that — Life Itself channel, newsletter, social — is always a deliberate manual "feature this," never automatic, so promotion stays a choice rather than an obligation. AI can commit the low-stakes project-level entry on its own; anything public-facing waits for me.

What "perfect" adds later, skipped for v1: an actual aggregating site page pulling from every repo automatically, R2-hosted images instead of repo commits, a social-media approval queue, structured `git-cliff`-style parsing.

Assumptions to revisit if wrong: (1) "project's own changelog" means a changelog file per repo, not something living back in the planning repo; (2) the weekly roll-up is genuinely just an enrichment of the existing `week/` file, not a new separate artifact.

---

# Part 2 — Central Visual Changelog (the visual-specific problem)

Child of [Part 1](#part-1--changelog-for-me-the-general-publishing-indecision-problem) — that document covers *where things get published*; this one covers the visual-specific *capture and storage* problem, and only reaches into publishing where it depends on Part 1's answer.

## S — Situation

Within the broader publishing-indecision problem (Part 1), visual material is a special case. When working on a project — especially moving fast with AI — a screenshot or short video of the app at a given stage is cheap to capture in the moment but becomes impossible to recreate later: a week on, the UI has moved and that exact "before" state is gone. Before/after visual material is also more compelling for social media and quick "look what I built" updates than plain text.

I've already researched text-changelog generation (`rufuspollock.com/2026-02-25-changelogs-lightweight-best-practice.md`), but that covers only text entries generated from commits, not visual capture. Separately, on one project an AI agent spontaneously created a dedicated visual-changelog repo and started committing screenshots to it, unprompted — an ad hoc pattern that worked well enough to notice, but was never designed or decided on.

## C — Complication

Three distinct gaps, not one:

- **I don't have a reliable way to notice and grab the moment.** Screenshots and video are cheap to capture *in the moment*, but nothing prompts me to actually do it — by the time I remember, the app has moved on and that exact "before" state is gone for good. This is the same "no built-in capture step" gap as the parent problem's writing gap, just for visual material — arguably worse here, since missing the moment is a permanent loss rather than just a delay.
- **Storing the material has no settled pattern.** Committing a lot of images/video into a project's main repo bloats it, but standing up a separate changelog repo per project is overhead to repeat every time — and it's unclear whether that overhead is worth it versus one central repo across all projects.
- **The one time this happened, it wasn't a decision.** On one project, an AI agent spontaneously created a changelog repo and started committing screenshots to it, unprompted. That's evidence the instinct is right, but it happened without a pattern I'd actually chosen — I don't want that repeating inconsistently, differently, across every project depending on what a given AI session decides to do on its own.

Even once something is captured and stored, it still runs into the general publishing-destination indecision from Part 1 — that layer isn't solved here, it's inherited.

## Q — Question (main)

What's the built-in step that captures a visual moment as a by-product of the work, the pattern for storing it without bloating the project's main repo, and the way it plugs into publishing — one I can apply to any project or organisation (Life Itself, personal, etc.) without redesigning it each time?

### Sub-questions

- **Capture**
  - What counts as a changelog-worthy visual moment — every notable UI change, or only ones tied to a shipped milestone?
  - Who or what captures it: me manually, or can an AI agent be instructed to do it as part of finishing a unit of work (as it already did once, unprompted)?
  - What granularity — per commit, per work session, per week?
- **Storage**
  - Per-project changelog repo (like the one AI already created) vs. one central changelog repo across all projects — what's the tradeoff, and does it depend on project size or lifespan?
    - If per-project: is there a naming/setup convention so this doesn't need re-deciding each time (e.g. a `<project>-changelog` repo, or a `changelog/` folder alongside — not inside — the main repo)?
    - If central: how does each entry reference back to its source project, and does that hold up once there are dozens of projects in one repo?
  - Should images/video be hosted via the existing R2/image-hosting research (referenced in the project file) rather than committed as binary blobs to any git repo at all?
  - Does the pattern need to differ between a Life Itself project and a personal one, or is org context just a tag on an otherwise identical pattern?
- **Publishing** (depends on Part 1's destination/default-rule answer)
  - Once a visual entry exists, does it get pushed anywhere automatically, or does it wait for a manual publish step?
  - Is a visual entry's default destination the same as the general default from Part 1, or does visual content warrant a different one (e.g. social media first, site second)?
- **Aggregate output** (mirrors Part 1's aggregate-output branch, applied to visual)
  - Can per-project visual entries roll up into the personal day-to-day/weekly review from Part 1, so they're not a separate stream to maintain?
  - How much of the GitHub-activity side of this can be automated vs. needs a human moment to add the actual screenshot?

## H — Hypothesis

First pass — quick-and-dirty, meant to be trialed and revised, not the final architecture. Working through the issue tree, answering inline:

**Capture**
- What counts as changelog-worthy → **only when there's a "before" worth showing — a shipped milestone at session-checkpoint, not every UI tweak.**
- Who captures → **AI, as part of the same session-checkpoint step, when the session touched something visual — takes the screenshot, flags it for review.**
- Granularity → **tied to session-checkpoint, same cadence as the text entry, not separately timed.**

**Storage — revised twice, folded back to per-project (current answer)**

Went through two revisions: first draft said one repo total (org as a tag); second draft (after pushback) said one repo per org. Re-examined a third time when asked "are we sure we need a separate repo at all" — and no, on reflection a separate repo was solving a *scale* problem (repo bloat from binary assets) that hadn't actually shown up yet, while adding real cost now: a cross-repo hop (the agent working in a project has to know about and write to a completely different clone), plus infrastructure stood up before a single real entry existed. That's the exact "design for hypothetical future requirements" trap the same Hypothesis already avoided for R2-hosting and for a personal-org repo — it should have applied to this decision too. The one real precedent — an AI that spontaneously created a changelog *in the project's own repo*, unprompted — points the same way.

- Per-project repo vs. central → **neither — no separate repo.** Visual entries live in the **project's own repo**, unified with the text changelog: a `changelog/images/YYYY-MM-DD-slug.png` alongside the same changelog file the text entries go in (one format for both — see [CONVENTION.md](CONVENTION.md)).
- Historical 2026 decision: `life-itself/changelog` held the convention rather than images. The convention moved to `life-itself/skills` in October 2026, and the old repository was archived.
- Image hosting → **plain git commits, in the project's own repo.** Defer R2/image-hosting to later — only worth the setup once volume actually demands it.

**Publishing**
- Automatic vs. manual → **same floor as Part 1: committing the entry (text or visual) to the project's own repo is automatic, no decision needed. Anything going to site/social/newsletter is a manual promote.**
- Visual-specific default → **not a different mechanism — a nudge.** When doing the weekly review, visual entries are flagged as the best candidates for social promotion, since that's what performs — but promotion is still always a manual call.

**Aggregate output**
- Rolls into the weekly review → **yes — the same weekly roll-up from Part 1's hypothesis reads each project's changelog file for that week's entries, text and visual both, so the "this week" post is text bullets plus a couple of embedded before/after images.**
- Automation boundary → **capture stays a human/AI-in-the-moment act; everything after that — inclusion in the weekly roll-up — is automatable once it's committed.**

**Synthesis:** Same session-checkpoint trigger as text, same file. If something visual happened this session, AI commits the image straight into the project's own `changelog/images/` and references it from that project's changelog file — no separate repo, no cross-repo hop. That's the always-on floor. Weekly, the roll-up reads every active project's changelog file, so the weekly review becomes text-plus-images automatically. Social promotion stays manual, but visual entries get flagged as the strongest candidates for it. The format itself — what the file looks like, where images go — is written once as the canonical convention doc in this repo (public), and every other repo's `AGENTS.md` gets one line pointing to it, rather than repeating the spec everywhere or auto-loading it as a skill on every session.
