#!/usr/bin/env bash
# Close-out state in one call, compact. Usage: state.sh [SINCE]
# SINCE: session start, RFC3339 or YYYY-MM-DD (default: today). Run from the repo root.
since="${1:-$(date +%F)}"

echo "== git"
git pull --rebase -q 2>&1 | tail -2
git status --short --branch | head -30
echo "-- unpushed"; git log --oneline '@{u}..HEAD' 2>/dev/null | head -10
echo "-- stashes"; git stash list | head -5
echo "-- worktrees"; git worktree list | tail -n +2
echo "-- files committed since $since"
git log --since="$since" --name-only --pretty=format: | grep . | sort -u | head -40

if [ -d .beads ] && command -v bd >/dev/null; then
  bd dolt pull >/dev/null 2>&1 || echo "!! bd dolt pull failed"
  echo "== beads"
  echo "-- focus"; bd list --label=focus --brief --flat 2>/dev/null | grep -E '^\S' | head -5
  echo "-- in progress"; bd list --status=in_progress --brief --flat -n 20 2>/dev/null | grep -E '^\S' | head -20
  echo "-- touched since $since"; bd list --all --updated-after="${since%%T*}" --brief --flat -n 30 2>/dev/null | grep -E '^\S' | head -30
  echo "-- open but referenced in commits"; bd orphans 2>/dev/null | head -10
fi

if [ -d changelog ]; then
  echo "== changelog (latest)"; ls changelog | tail -5
fi
