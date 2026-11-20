#!/usr/bin/env bash
# Post a message to a Google Chat space via its incoming webhook.
# Usage: post.sh <SPACE> "message text" [thread-key]
#   SPACE maps to the secret GOOGLE_CHAT_<SPACE>_WEBHOOK_URL (e.g. AI_POSTS_TEST).
#   Text may be "-" to read from stdin. A thread key groups replies in one thread.
set -euo pipefail
[ $# -ge 2 ] || { echo "usage: $0 <SPACE> <text|-> [thread-key]" >&2; exit 2; }
space=$(echo "$1" | tr '[:lower:]-' '[:upper:]_'); text=$2; thread=${3:-}
[ "$text" = "-" ] && text=$(cat)
var="GOOGLE_CHAT_${space}_WEBHOOK_URL"
SECRETS=${SECRETS_ENV:-$HOME/src/rufuspollock/secrets/.env}
export CHAT_TEXT="$text" CHAT_THREAD="$thread" CHAT_VAR="$var"
dotenvx run --quiet --strict -f "$SECRETS" -- python3 -I -c '
import json, os, sys, urllib.request
url = os.environ.get(os.environ["CHAT_VAR"])
if not url: sys.exit("missing secret " + os.environ["CHAT_VAR"])
body = {"text": os.environ["CHAT_TEXT"]}
if os.environ["CHAT_THREAD"]:
    body["thread"] = {"threadKey": os.environ["CHAT_THREAD"]}
    url += "&messageReplyOption=REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD"
req = urllib.request.Request(url, json.dumps(body).encode(), {"Content-Type": "application/json; charset=UTF-8"})
try:
    d = json.load(urllib.request.urlopen(req))
except urllib.error.HTTPError as e:
    sys.exit(f"Chat API error {e.code}: {e.read().decode()[:300]}")
print("posted", d.get("name", "").split("?")[0])
'
