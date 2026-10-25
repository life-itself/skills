---
name: close-out
description: Use when the user says "close out", "are we done?", "we're done", "done for today", "wrap up" or "is it committed?". Checks the session goal is met, sweeps loose ends, brings Beads, docs and changelog up to date, pushes, cleans up merged worktrees, and reports a short "closed out" TL;DR. Not for handoff to a new session.
license: Proprietary
metadata:
  author: rgrp
  status: draft
  origin: skills repo session (2026-10-25); built from Rufus's ask plus 30 finished (✅) sessions and a survey of Beads "landing the plane", superpowers and gstack
---

# Close out a finished session

Make "done" true and visible: every thread is finished, logged or deliberately dropped; Beads, docs, changelog and git match what happened; the user gets one short report they can trust.

If work will continue in a new session, also follow [session-handoff.md](../../session-handoff.md).

## Principles

- **Cheap and quick.** This runs at the end of a long session, while the user waits. The conversation is already in context: sweep it from memory, not by re-reading files. Aim for 4–6 tool calls: batch commands, send independent calls in parallel, `grep` rather than `Read`, no subagents. Think the sweep through silently; write only the report.
- **Thorough where it is free.** Skip a step only on a concrete guard (listed per step), never because the session felt small.
- **Ask little.** Default what you can and list it under **Decided**. Ask only where a thread is genuinely ambiguous: at most 3 questions, each with a recommendation.
- **Evidence, not claims.** "Done", "pushed", "synced" come from output you read after the last change. "Fix, don't just report": a missing bead or unpushed commit, do it and say so.

## 0. Are we done?

From the session's goal (as revised), not the last task. **Clearly done:** one line, carry on. **Not done:** stop and reply with what is left, one line each with its size, and a recommendation: finish now, or close out with the rest logged. If the user has clearly said they are finished, don't ask; leftovers go through the sweep.

## 1. State (one call)

In parallel, in one message:
- `bash ~/.claude/skills/close-out/state.sh` from the repo or worktree root (Codex: `~/.agents/skills/...`). It pulls code and Beads, then prints git status, unpushed commits, stashes, files committed this session, other worktrees (merged? dirty?), focus, in-progress and touched beads, open beads referenced in commits, the latest changelog entries, and the user's asks this session from the transcript. Session start comes from the transcript (pass an RFC3339 time to override). Lines starting `!!` need action; "unpushed" being empty is not proof of pushed unless there is no `!! no upstream`. Committed files may include other sessions' work in the same repo.
- Desktop app only: `ToolSearch` `select:mcp__ccd_session_mgmt__get_session,mcp__ccd_session_mgmt__set_session_title,mcp__ccd_session_mgmt__archive_session`, for steps 6–7.

`!! LINKED WORKTREE` means this session works on a branch: push the branch (and tell the coordinator, if a coordinator session started it); never push main. **Push rules:** Rufus's own repos (`~/src/rufuspollock/*`) or AGENTS.md allows it: push; if silent, commit and ask.

## 2. Loose-end sweep (from memory)

Walk the whole conversation, plus the state output's "user asks" list (it catches threads lost to context compaction): things asked for, started, put off, side ideas, promised steps ("details below"), the user's unanswered questions, side sessions. Bucket each: **Done** (close bead), **Logged** (asked for, or an obvious follow-up: make sure a bead exists), **Dropped** (user moved on: Decided, if substantial), **Owed** (your undelivered promise or answer: deliver now), **Unclear** (half-built, could go either way).

If anything is **Unclear**, ask about all of them in one message and stop, e.g. "CSV export is half-built (parser, no UI). Finish, log, or drop? I'd log it: the parser is reusable." Otherwise run straight through.

Side sessions still running or awaiting merge: name each with branch and state; never merge another session's branch without the user's yes.

## 3. Record: beads, docs, changelog

Make all edits, then do the bd writes in one chained call.

**Beads** (skip if no `.beads/`):
- Close done: `bd close <id> <id> --reason="..."` (an epic only when all children are closed or moved). Check the "referenced in commits" list.
- Touched but unfinished: `bd update <id> --append-notes="state; next"`. `--notes` replaces; use it only for the focus bead's status. Never `bd edit`.
- Log missing: `bd create --title=... --description=... --type=... --priority=... --parent=<epic> --deps=blocked-by:<id>`.
- Dependencies: for each new or changed bead, what must come first and what does it unblock? `bd dep add <later> <earlier>`. Confirm with `bd show <id>` only for beads you created or re-linked.
- Focus moved or finished: move the `focus` label, rewrite its notes.
- User corrected how you work and it will recur: `bd remember "..."` with the reason.

**Docs** (skip if no files changed and no decisions, conventions or corrections were made in chat):
- Should have changed: README tables, AGENTS.md links, plans or design docs the work implemented, indexes.
- Now stale: superseded docs, scratch notes, merged drafts, plans now living in beads. Delete or merge; no "superseded" banners.
- Renamed or removed things: one `grep -rn "<old>|<old2>"` over the repo; fix what turns up.
- Decisions that exist only in the chat and will be needed again: into the right doc or bead.
Only this session's docs; log a bead for unrelated rot.

**Changelog** (skip if no `changelog/` folder or changelog rule in AGENTS.md):
- Warranted? Repo AGENTS.md rule, else the `changelog` skill's test; when unsure, skip.
- Entry for this feature already exists (see the state output)? **Update it**, don't add a second. Scope changed: make it describe what shipped, with a live link. Feature dropped: delete it.

## 4. Verify

Skip only if you can name the command and it ran and passed after your last file edit in this session; cite it. After compaction you can't be sure, so run it. Otherwise run the gates that exist for what changed and read the output (skipped tests are not a pass). Failing: fix it, or report it as not done.

## 5. Commit and push (one call)

First look at the `??` lines in the state output; anything that should not go in goes in `.gitignore`, or `git add` explicit paths instead. Then `git add -A && git commit -m "..." && git pull --rebase && git push && git status -sb`. Notes:
- Beads repos: the pre-push hook pushes Dolt; on failure `bd dolt push`. Another session's Dolt lock can make it hang to the timeout: wait, don't retry in a loop.
- Divergence you can't resolve safely: stop and report. Never force-push.
- Child worktree: push the branch, message the coordinator that it is ready to merge (don't make the user relay); "pushed" means the branch, not main.
- This session's stashes: drop only if their content is committed; otherwise ask.

## 6. Worktrees

Skip if the state output lists no other worktrees and no `!! LINKED WORKTREE`. A worktree can go only if it is **merged** (or its PR is merged: squash merges show "unmerged", so check `gh pr list --head <branch> --state merged`), **dirty:0**, and belongs to this session or a session this one started. Never touch others' worktrees or a running session's.

- **Plain git worktree** this session made (outside `.claude/worktrees/`): `git worktree remove <path> && git branch -d <branch>` (`-d` refuses unmerged branches). List under Decided.
- **App-made worktree** (`.claude/worktrees/...`) of a finished child session: the app removes it when the session is archived, so don't `git worktree remove` it. Put one ask under **You:** ("Archive 3 finished child sessions? Branches merged, worktrees clean.") and on yes call `mcp__ccd_session_mgmt__archive_session` for each.
- **This session's own worktree**, branch merged: the cleanup is archiving this session, which ends the conversation. Offer it as the last line of the report ("Archive this session? It removes its worktree.") and on yes call `archive_session("self")` after the ✅ rename.

## 7. Report and mark done

About 150 words, per [docs/reply-shape.md](../../docs/reply-shape.md):

```
✅ Closed out. <one-line TL;DR of what this session delivered>

**You:** <only big asks still open; omit if none>
**Done:** <shipped items, with live links>
**Logged for later:** <plain name (bead-id), one per line>
**Decided:** <defaults applied, incl. anything dropped>
**State:** committed and pushed (<branch>), Beads synced, <checks and evidence>.
```

Anything not done (failing check, branch awaiting merge, open question): the first line says so instead, e.g. "Nearly closed out: branch pushed, waiting on coordinator merge."

On a full close-out, in the desktop app: `get_session("self")`, then `set_session_title("self", "✅ <title>")` unless it already starts with ✅ (the app may ask the user to approve). No tool (Codex, CLI, subagent): skip and say so in one line.
