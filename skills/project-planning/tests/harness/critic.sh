#!/bin/bash
# Usage: critic.sh <test-dir>  -> writes <test-dir>/critique.md using Codex
D="$1"; R=/Users/rgrp/src/rufuspollock/planning/skills/project-planning/rubric.md
PROMPT="You are a sharp, sceptical reviewer of planning documents (McKinsey-style SCQ / issue trees). Score the SCQ below against the RUBRIC: for every check give pass / weak / fail, a quote from the SCQ it rests on, and a one-line reason. Classify each non-pass as SUBSTANTIVE (would change the question or send LTP the wrong way) or TIDY (wording, length, placement); verdict 'rewrite' only for substantive problems. Then: (1) an overall verdict the owner would most likely give: sign off as-is / small edits / rewrite; (2) a rewritten Situation, Complication and Question (with criteria) that would pass, as concise bullets; (3) the process checks P1-P3 judged from the TRANSCRIPT; (4) the single most useful change to the interviewing skill that would have produced a better SCQ. Be terse. Markdown output only.

RUBRIC:
$(cat $R)

SCQ:
$(cat $D/scq.md)

TRANSCRIPT:
$(cat $D/transcript.md)"
OUT=$(mktemp); cd /tmp && timeout 500 codex exec --sandbox read-only --skip-git-repo-check -o "$OUT" "$PROMPT" > "$OUT.log" 2>&1 </dev/null
{ echo "# Critique (Codex / ChatGPT, rubric-based) — $(date +%F)"; echo; cat "$OUT"; } > $D/critique.md; rm -f "$OUT" "$OUT.log"; wc -l $D/critique.md
