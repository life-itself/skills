---
name: close-out
description: Use when the user says "close out", "are we done?", "we're done", "done for today", "wrap up", "is it committed?" or otherwise signals that a session's work is finished. Sweeps the session for loose ends, brings Beads, docs and the changelog up to date, verifies, commits and pushes, then reports a short "closed out" TL;DR. Not for handing work to a new session (see session-handoff.md) or for a project status report.
license: Proprietary
metadata:
  author: rgrp
  status: draft
  origin: skills repo session (2026-10-25); built from Rufus's ask plus 30 finished (✅) sessions and a survey of Beads "landing the plane", superpowers and gstack
---

# Close out a finished session

Make "done" true and visible: every thread of the session is finished, logged or deliberately dropped; Beads, docs, changelog and git match what happened; and the user gets one short report they can trust without asking "is it committed?".

This is for the end of work. If work will continue in a new session, also follow [session-handoff.md](../../session-handoff.md) (focus label and notes).

## Principles

- **Ask little.** The user wants to stop. Default what you can and list it under **Decided**. Ask only where a thread is genuinely ambiguous: at most 3 questions, each with a recommendation.
- **Evidence, not claims.** Every "done", "pushed", "synced" in the report comes from a command you ran this turn and read the output of.
- **Fix, don't just report.** A missing bead, stale doc or unpushed commit: do it (within the repo's push rules) and say so.

## 1. Context

```bash
git pull --rebase && bd dolt pull      # beads may have moved during the session
git status --short --branch
git worktree list; git stash list
git log --oneline @{u}..HEAD           # unpushed commits
bd list --label=focus
```

- **Child or main session?** A worktree session started by a coordinator session pushes its own branch and tells the coordinator; it does not merge or push main.
- **Push rules.** Rufus's own repos (`~/src/rufuspollock/*`) and repos whose AGENTS.md allows it: push. Otherwise follow that AGENTS.md; if silent, commit and ask.

## 2. Loose-end sweep

Go back through the whole conversation, not just the last few turns. List every thread: things asked for, started, put off ("later"), side ideas, promised steps ("details below"), questions of the user's you never answered, side sessions started. Put each in a bucket:

| Bucket | Meaning | Action |
|---|---|---|
| **Done** | Finished and verified | Close its bead |
| **Logged** | User asked to log it, or an obvious follow-up (known bug, deferred step, "confirm with X") | Make sure a bead exists |
| **Dropped** | User clearly moved on | Nothing; list under Decided if substantial |
| **Unclear** | Half-built, or the user went quiet and it could go either way | Ask |
| **Owed** | A promise or answer you did not deliver | Deliver it now |

If there are **Unclear** items, ask about all of them first, in one message, and stop; the answer may reopen work. E.g. "The CSV export is half-built (parser done, no UI). Finish it, log a bead, or drop it? I'd log it: the parser is reusable." If there are none, run straight through steps 3–8 without stopping.

Side sessions or subagents still running or awaiting merge: name each with its branch and state. Do not merge another session's branch without the user's yes.

## 3. Beads

- **Close** finished beads: `bd close <id> --reason="..."`. Close an epic only when all its children are closed or moved. `bd orphans` lists open beads already referenced in commits, which are often done.
- **Update** beads touched but not finished: `bd update <id> --append-notes="..."` (where it stands, what is next). `--notes` replaces the notes; use it only to rewrite the focus bead's status. Never `bd edit`.
- **Log** each Logged item with no bead: `bd create --title=... --description=... --type=... --priority=... --parent=<epic> --deps=blocked-by:<id>`.
- **Dependencies.** For each new or changed bead, ask what must happen first and what it unblocks; add missing links with `bd dep add <later> <earlier>`. Confirm with `bd show <id>` (parent and blockers right) and `bd blocked`.
- **Focus.** If the focus bead is finished or the focus moved, move the `focus` label and update its notes.
- **Rules learned.** If the user corrected how you work and it will recur: `bd remember "..."` with the reason.

## 4. Docs

Only docs related to this session's work; log a bead for unrelated rot.

- **Should have changed:** README tables, AGENTS.md links, plans or design docs the work implemented or changed, indexes. Update them.
- **Now stale:** docs superseded by later decisions, scratch notes, drafts merged elsewhere, plans whose content now lives in beads or the final doc. Delete or merge; git keeps history. No "superseded" banners.
- **Dangling references:** for each thing renamed or removed, `grep -r "<old name>"` and fix what turns up.
- **Only in the chat:** decisions or content that will be needed again. Move them to the right doc or bead.

## 5. Changelog

Only where the repo has a `changelog/` folder or a changelog rule in AGENTS.md.

1. **Should there be one?** Apply the repo's AGENTS.md rule, else the `changelog` skill's test. When unsure, skip.
2. **Is there one already?** If an entry for this feature exists (this session or recent), **update it**; do not add a second.
3. **Does it still match?** If scope changed during the session, edit the entry to describe what actually shipped, with a live link. If the feature was dropped, delete the entry.

## 6. Verify

Run the gates that exist for what changed (tests, build, lint) and read the output; skipped tests are not a pass. For sites, check the live or preview page after the deploy. If a check fails, fix it or report it as not done.

## 7. Git and sync

1. Nothing stray: untracked files that belong in the repo are added; this session's stashes and worktrees are cleared (never remove a worktree with uncommitted changes; ask).
2. Commit with a message that says what changed.
3. `git pull --rebase`, then `git push`. In Beads repos the pre-push hook also pushes Dolt; on failure run `bd dolt push`. A Dolt lock held by another session can make the hook hang until its timeout; wait, then check.
4. Divergence or conflict you cannot resolve safely: stop and report. Never force-push.
5. Child worktree session: push the branch, then message the coordinator session that it is ready to merge yourself; do not ask the user to relay. "Pushed" then means the branch, not main; say so.
6. Confirm `git status` is up to date with origin.

## 8. Report and mark done

Follow [docs/reply-shape.md](../../docs/reply-shape.md), about 150 words:

```
✅ Closed out. <one-line TL;DR of what this session delivered>

**You:** <only big asks still open; omit if none>
**Done:** <shipped items, with live links>
**Logged for later:** <plain name (bead-id), one per line>
**Decided:** <defaults you applied, including anything dropped>
**State:** committed and pushed (<branch>), Beads synced, <checks run>.
```

If anything is not done (failing check, branch waiting on the coordinator, open question), the first line says so instead, e.g. "Nearly closed out: branch pushed, waiting on coordinator merge."

Then, if you can rename the session, put ✅ at the front of its title.
