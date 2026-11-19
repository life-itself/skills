# tool-evaluation

For people browsing the repo. Agents read [SKILL.md](SKILL.md); this file is not loaded.

**What it does:** turns "what should I use for X?" or "find alternatives to X" into a decision. The agent writes what you need as job stories, names the market category, shortlists 3–5 candidates (keeping your current tool as a baseline), scores them against 3–5 weighted criteria with dated, sourced evidence, then gives one pick, a backup, what would flip it, and a short trial plan.

**Try it:** "We use Xero for accounting. Find alternatives and tell me which to switch to." or "Which tool should I use to schedule posts to LinkedIn, Mastodon and Bluesky?"

**Source:** the [Tool Evaluation](https://tao.rufuspollock.com/Tool+Evaluation) page in Rufus Pollock's tao.

**Status:** draft. Tested once with and without the skill on the Xero task: without it, a good feature table but no weights, scores or trial plan; with it, all seven rubric checks passed and the weighted scoring changed the verdict. See [test-log.md](test-log.md).
