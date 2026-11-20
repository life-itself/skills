#!/usr/bin/env bash
# Wrapper: run chat.py with secrets injected by dotenvx (only this process sees them).
set -euo pipefail
dir=$(cd "$(dirname "$0")" && pwd)
SECRETS=${SECRETS_ENV:-$HOME/src/rufuspollock/secrets/.env}
if [ "${1:-}" = "auth" ]; then strict=""; else strict="--strict"; fi
exec dotenvx run --quiet $strict -f "$SECRETS" -- python3 -I "$dir/chat.py" "$@"
