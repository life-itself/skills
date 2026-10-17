#!/usr/bin/env bash
# mindmap.sh TREE.json — renders a tree (JSON, schema in SKILL.md) as a left-to-right mindmap.
# Writes next to the JSON: NAME.svg (real text, fonts embedded) and NAME.png (2x), and prints the report ("OK" or problems).
set -euo pipefail
[ $# -ge 1 ] || { echo "usage: mindmap.sh tree.json" >&2; exit 2; }
json="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"; dir="$(dirname "$json")"; base="$(basename "$json" .json)"
here="$(cd "$(dirname "$0")" && pwd)"; fonts="$here/../fonts"
CH="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
page="$dir/.$base.page.html"
python3 - "$json" "$here/mindmap.js" "$fonts" "$page" <<'PY'
import sys, base64, json
src, js, fonts, out = sys.argv[1:]
tree = json.load(open(src))
b = {n: base64.b64encode(open(f"{fonts}/ApfelGrotezk-{w}.otf", 'rb').read()).decode() for n, w in [('ApfelRegular','Regular'),('ApfelMittel','Mittel')]}
ff = ''.join(f'@font-face{{font-family:{n};src:url(data:font/otf;base64,{d}) format("opentype")}}' for n, d in b.items())
open(out, 'w').write(f'<!doctype html><meta charset="utf-8"><style>{ff}</style><body>'
  f'<span style="font-family:ApfelRegular">.</span><span style="font-family:ApfelMittel">.</span>'
  f'<script>window.TREE={json.dumps(tree)};window.FONTS={json.dumps(b)};</script><script>{open(js).read()}</script></body>')
PY
"$CH" --headless=new --disable-gpu --virtual-time-budget=5000 --dump-dom "file://$page" 2>/dev/null > "$page.dump"
size=$(python3 - "$page.dump" "$dir/$base.svg" <<'PY'
import re, html, sys
d = open(sys.argv[1]).read()
g = lambda k: html.unescape(re.search(rf'<pre id="{k}">(.*?)</pre>', d, re.S).group(1))
open(sys.argv[2], 'w').write(g('svgout')); print(g('size')); print(g('warnings'), file=sys.stderr)
PY
)
rm -f "$page" "$page.dump"
"$CH" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=3000 --force-device-scale-factor=2 --window-size="${size/x/,}" --screenshot="$dir/$base.png" "file://$dir/$base.svg" 2>/dev/null >/dev/null
echo "wrote $base.svg and $base.png ($size, 2x)"
