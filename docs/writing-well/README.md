# Writing well

Notes towards a future writing skill: examples of what went right and wrong when agents drafted or revised prose for Rufus, and what we learned. Not a skill yet; add examples here until a pattern is clear enough to turn into one.

## Examples

### 2026-10-25: a tight blog post got weaker through "improving" revisions

**What happened.** An agent (Claude Code, in the private reasoncommons/product repo, bead `rcprod-0so`) drafted the blog post [AI and the problem of proliferating plausible reasoning](https://reasoncommons.com/blog/proliferating-plausible-reasoning). The first draft, after one critique pass, was tight: a general hook in two paragraphs, the problem named by paragraph two, the old problem in one paragraph. Rufus asked for two additions: a footnote about decision research in one section, and a real two-model AI experiment as an excerpt. Over two more revisions the post grew from about 170 to about 520 words before the end of its first section. A bespoke scenario replaced the general hook, the research went into the body as two paragraphs (one of them, on Paul Nutt, off-topic), the experiment was narrated in detail, and points were restated. That version was published. Rufus spotted it: "this blog post has got weaker in the revision. it was really tight in original version and it's got verbose." The fix was to go back to the first draft and add the new material in its smallest form: one ~50-word evidence paragraph, one sentence plus a footnote for the research.

Versions are in git: reasoncommons/reasoncommons `website/blog/proliferating-plausible-reasoning.md` (published version at commit `7f21c82`, then the repair).

**Why it happened (the agent's own diagnosis).**

1. **Critique only adds.** Each pass asked a critic for weaknesses and "ways to make it more compelling". Critics answer with additions: a worked example, an answer to an objection, a gloss, a caveat. Each was right locally; together they bloated the piece. Accuracy fixes added more qualifiers.
2. **No comparison with the previous version.** Every critique and every self-check saw only the current draft. Nobody (agent or critic) read the new version beside the old one and asked "is this better?". Word count was never checked.
3. **New material wanted the spotlight.** Having run a real experiment, the agent rebuilt the opening around it. Fresh research felt valuable, so it got prominence it hadn't earned in the argument.
4. **The placement instruction drifted.** Rufus asked for a footnote; the agent wrote body paragraphs and a footnote. "Make it stronger" was read as "add rhetoric" rather than "cut".
5. **Shipping pressure.** "Ship it now" moved straight from revision to publish, with no cooling-off re-read.

**What to do instead.**

- Before showing or shipping a revision, read it side by side with the previous version, compare word counts, and say plainly which is better. If the old one is better, revert and add the new material minimally.
- Give the critic both versions, and ask it what to cut as well as what to add. Set a length budget per section.
- Add new material in its smallest form, where the user said to put it. "Footnote" means footnote.
- Treat "stronger" as "tighter" first.
