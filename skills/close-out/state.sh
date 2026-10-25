#!/usr/bin/env bash
# Close-out state in one call, compact. Usage: state.sh [SINCE]
# SINCE: session start (RFC3339). Default: first timestamp of this Claude Code
# session's transcript, else today 00:00. Run from the repo or worktree root.
# Lines starting "!!" need attention.

git rev-parse --git-dir >/dev/null 2>&1 || { echo "!! not a git repo"; exit 1; }
to() { timeout 20 "$@" || { [ $? = 124 ] && echo "!! timed out: $* (Dolt lock?)"; }; }

t=""; [ -n "${CLAUDE_CODE_SESSION_ID:-}" ] && t=$(ls ~/.claude/projects/*/"$CLAUDE_CODE_SESSION_ID".jsonl 2>/dev/null | head -1)
since="${1:-}"
[ -z "$since" ] && [ -n "$t" ] && since=$(jq -r 'select(.timestamp)|.timestamp' "$t" 2>/dev/null | head -1)
[ -z "$since" ] && since="$(date +%F)T00:00:00"

echo "== git (since $since)"
[ "$(git rev-parse --git-dir)" != "$(git rev-parse --git-common-dir)" ] && echo "!! LINKED WORKTREE: push this branch only, never main"
if git rev-parse -q --verify '@{u}' >/dev/null; then
  git pull --rebase --autostash -q 2>&1 | tail -2 | sed 's/^/!! pull: /'
  git status --short --branch | head -30
  echo "-- unpushed"; git log --oneline '@{u}..HEAD' | head -10
else
  git status --short --branch | head -30
  echo "!! no upstream: every commit on this branch is unpushed (git push -u)"
fi
echo "-- stashes"; git stash list | head -5
echo "-- files committed this session"
git log --since="$since" --name-only --pretty=format: | grep . | sort -u | head -40

echo "-- other worktrees (path  branch  merged?  dirty)"
base=$(git symbolic-ref -q --short refs/remotes/origin/HEAD 2>/dev/null || echo origin/main)
main=$(git rev-parse --path-format=absolute --git-common-dir | sed 's#/\.git$##')
here=$(git rev-parse --show-toplevel)
git worktree list --porcelain | awk '/^worktree /{p=$2} /^HEAD /{h=$2} /^branch /{b=$2} /^$/{print p"\t"h"\t"b; b=""}' |
while IFS=$'\t' read -r path head branch; do
  [ "$path" = "$main" ] && continue
  br=${branch#refs/heads/}; br=${br:-"(detached)"}
  git merge-base --is-ancestor "$head" "$base" 2>/dev/null && m=merged || m=unmerged
  d=$(git -C "$path" status --porcelain 2>/dev/null | wc -l | tr -d ' ')
  [ "$path" = "$here" ] && m="$m (this session)"
  echo "$path  $br  $m  dirty:$d"
done

if [ -d "$main/.beads" ] && command -v bd >/dev/null; then
  to bd dolt pull >/dev/null 2>&1 || echo "!! bd dolt pull failed"
  echo "== beads"
  echo "-- focus"; to bd list --label=focus --brief --flat | grep -E '^\S' | head -5
  echo "-- in progress"; to bd list --status=in_progress --brief --flat -n 20 | grep -E '^\S'
  echo "-- touched this session"; to bd list --all --updated-after="$since" --brief --flat -n 30 | grep -E '^\S'
  echo "-- open but referenced in commits"; to bd orphans | head -10
fi

[ -d changelog ] && { echo "== changelog (latest)"; ls changelog | tail -5; }

if [ -n "$t" ]; then
  echo "== user asks this session (first 100 chars; for the sweep after compaction)"
  jq -r 'select(.type=="user" and (.message.content|type)=="string")
    | .message.content | select(test("^\\s*<|^Another Claude session|^\\[Request interrupted")|not) | .[0:100] | gsub("\n";" ")' "$t" 2>/dev/null | tail -40
fi
