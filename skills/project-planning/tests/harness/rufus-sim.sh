#!/bin/bash
# Usage: rufus-sim.sh <sources-file: one absolute path per line> <transcript-file>
# Simulated Rufus (Codex / ChatGPT) answers the LAST interviewer question in the transcript.
SOURCES="$1"; TRANSCRIPT="$2"
CTX=""
while read -r f; do [ -f "$f" ] && CTX+=$'\n\n===== '"$f"$' =====\n'"$(head -c 30000 "$f")"; done < "$SOURCES"
PROMPT="You are role-playing Rufus Pollock answering a planning interview (this is a test of an interview skill). Speak as Rufus: first person, conversational, a bit rough like dictation, 2-8 sentences. Ground your answers in the SOURCE MATERIAL below, which is Rufus's own notes. Where it doesn't say, either say you're not sure, or give a plausible answer marked [GUESS]. Don't volunteer a full plan; answer what was asked, though drifting into solutions occasionally is fine, as a real person would. Never mention being an AI or a simulation. Output ONLY your answer.

SOURCE MATERIAL:$CTX

TRANSCRIPT SO FAR (answer the last question):
$(cat "$TRANSCRIPT")"
OUT=$(mktemp); cd /tmp && timeout 400 codex exec --sandbox read-only --skip-git-repo-check -c model_reasoning_effort=low -o "$OUT" "$PROMPT" > "$OUT.log" 2>&1 </dev/null; cat "$OUT"; rm -f "$OUT"
