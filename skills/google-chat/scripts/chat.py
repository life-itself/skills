#!/usr/bin/env python3
"""Google Chat as Rufus (user OAuth), for AI sessions.

Run through dotenvx so secrets reach only this process (chat.sh does this):
  chat.sh auth                         one-off: browser consent, stores refresh token in secrets
  chat.sh spaces [filter]              list spaces/DMs you're in (name, type, display name)
  chat.sh read <space> [n]             last n messages (default 20), oldest first
  chat.sh post <space> <text|->        post as Rufus; text is prefixed with the AI marker
  chat.sh reply <space> <thread> <text|->   reply in an existing thread (thread = spaces/X/threads/Y)
  chat.sh dm <email> <text|->          DM a person (finds or creates the DM)

<space> is a resource name (spaces/AAAA...) or a case-insensitive display-name match.
Secrets: GOOGLE_CHAT_OAUTH_CLIENT_ID, GOOGLE_CHAT_OAUTH_CLIENT_SECRET, GOOGLE_CHAT_RUFUS_REFRESH_TOKEN.
"""
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import os
import secrets as pysecrets
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request

MARKER = "🤖 "
API = "https://chat.googleapis.com/v1/"
SCOPES = [
    "https://www.googleapis.com/auth/chat.messages",
    "https://www.googleapis.com/auth/chat.spaces.readonly",
    "https://www.googleapis.com/auth/chat.spaces.create",
    "https://www.googleapis.com/auth/chat.memberships.readonly",
]
SECRETS_DIR = os.path.expanduser(os.environ.get("SECRETS_DIR", "~/src/rufuspollock/secrets"))
TOKEN_VAR = "GOOGLE_CHAT_RUFUS_REFRESH_TOKEN"


def env(name):
    v = os.environ.get(name)
    if not v:
        sys.exit(f"missing secret {name} (run via chat.sh, or run `chat.sh auth` first)")
    return v


def http(method, url, body=None, headers=None, form=False):
    headers = dict(headers or {})
    data = None
    if body is not None:
        if form:
            data = urllib.parse.urlencode(body).encode()
            headers["Content-Type"] = "application/x-www-form-urlencoded"
        else:
            data = json.dumps(body).encode()
            headers["Content-Type"] = "application/json; charset=UTF-8"
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as r:
            raw = r.read()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        sys.exit(f"HTTP {e.code} on {method} {url.split('?')[0]}: {e.read().decode()[:500]}")


def access_token():
    d = http("POST", "https://oauth2.googleapis.com/token", {
        "client_id": env("GOOGLE_CHAT_OAUTH_CLIENT_ID"),
        "client_secret": env("GOOGLE_CHAT_OAUTH_CLIENT_SECRET"),
        "refresh_token": env(TOKEN_VAR),
        "grant_type": "refresh_token",
    }, form=True)
    return d["access_token"]


class Chat:
    def __init__(self):
        self.h = {"Authorization": "Bearer " + access_token()}

    def get(self, path, params=None):
        q = "?" + urllib.parse.urlencode(params) if params else ""
        return http("GET", API + path + q, headers=self.h)

    def post(self, path, body, params=None):
        q = "?" + urllib.parse.urlencode(params) if params else ""
        return http("POST", API + path + q, body, headers=self.h)

    def spaces(self):
        out, tok = [], None
        while True:
            p = {"pageSize": 1000}
            if tok:
                p["pageToken"] = tok
            d = self.get("spaces", p)
            out += d.get("spaces", [])
            tok = d.get("nextPageToken")
            if not tok:
                return out

    def resolve(self, space):
        if space.startswith("spaces/"):
            return space
        hits = [s for s in self.spaces() if space.lower() in s.get("displayName", "").lower()]
        if len(hits) != 1:
            names = ", ".join(f"{s['name']} ({s.get('displayName','')})" for s in hits) or "none"
            sys.exit(f"space '{space}' matched {len(hits)}: {names}")
        return hits[0]["name"]


def text_arg(t):
    t = sys.stdin.read() if t == "-" else t
    return t if t.startswith(MARKER) else MARKER + t


def show(m):
    who = m.get("sender", {}).get("displayName") or m.get("sender", {}).get("name", "?")
    th = m.get("thread", {}).get("name", "")
    print(f"[{m.get('createTime','')[:16]}] {who}: {m.get('text','')}  ({th})")


def cmd_auth():
    """Loopback OAuth flow; stores the refresh token with dotenvx, never prints it."""
    cid, csec = env("GOOGLE_CHAT_OAUTH_CLIENT_ID"), env("GOOGLE_CHAT_OAUTH_CLIENT_SECRET")
    state = pysecrets.token_urlsafe(16)
    result = {}

    class H(BaseHTTPRequestHandler):
        def do_GET(self):
            q = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            if q.get("state", [""])[0] == state:
                result.update({k: v[0] for k, v in q.items()})
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"Done - you can close this tab.")

        def log_message(self, *a):
            pass

    srv = HTTPServer(("127.0.0.1", 0), H)
    redirect = f"http://127.0.0.1:{srv.server_port}/"
    url = "https://accounts.google.com/o/oauth2/v2/auth?" + urllib.parse.urlencode({
        "client_id": cid, "redirect_uri": redirect, "response_type": "code",
        "scope": " ".join(SCOPES), "access_type": "offline", "prompt": "consent",
        "state": state, "login_hint": "rufus@lifeitself.org",
    })
    print("Opening browser for consent. If it doesn't open, visit:\n" + url, flush=True)
    subprocess.run(["open", url])
    while "code" not in result and "error" not in result:
        srv.handle_request()
    if "error" in result:
        sys.exit("consent failed: " + result["error"])
    d = http("POST", "https://oauth2.googleapis.com/token", {
        "code": result["code"], "client_id": cid, "client_secret": csec,
        "redirect_uri": redirect, "grant_type": "authorization_code",
    }, form=True)
    if "refresh_token" not in d:
        sys.exit("no refresh token returned")
    subprocess.run(["dotenvx", "set", TOKEN_VAR, d["refresh_token"], "-f", os.path.join(SECRETS_DIR, ".env")],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"stored {TOKEN_VAR}; granted scopes: {d.get('scope')}")
    print(f"now commit: cd {SECRETS_DIR} && git commit -am 'add {TOKEN_VAR}' && git push")


def main():
    a = sys.argv[1:]
    if not a or a[0] in ("-h", "--help"):
        print(__doc__)
        return
    cmd, a = a[0], a[1:]
    if cmd == "auth":
        return cmd_auth()
    c = Chat()
    if cmd == "spaces":
        f = (a[0] if a else "").lower()
        for s in c.spaces():
            if f in s.get("displayName", "").lower() or f in s["name"].lower():
                print(f"{s['name']}\t{s.get('spaceType','')}\t{s.get('displayName','')}")
    elif cmd == "read":
        sp = c.resolve(a[0])
        n = int(a[1]) if len(a) > 1 else 20
        msgs = c.get(sp + "/messages", {"pageSize": n, "orderBy": "createTime desc"}).get("messages", [])
        for m in reversed(msgs):
            show(m)
    elif cmd == "post":
        sp = c.resolve(a[0])
        m = c.post(sp + "/messages", {"text": text_arg(a[1])})
        print("posted", m["name"])
    elif cmd == "reply":
        sp = c.resolve(a[0])
        m = c.post(sp + "/messages", {"text": text_arg(a[2]), "thread": {"name": a[1]}},
                   {"messageReplyOption": "REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD"})
        print("posted", m["name"])
    elif cmd == "dm":
        email, text = a[0], text_arg(a[1])
        try_find = urllib.request.Request(
            API + "spaces:findDirectMessage?" + urllib.parse.urlencode({"name": "users/" + email}), headers=c.h)
        try:
            with urllib.request.urlopen(try_find) as r:
                sp = json.loads(r.read())["name"]
        except urllib.error.HTTPError as e:
            if e.code != 404:
                sys.exit(f"HTTP {e.code} finding DM: {e.read().decode()[:300]}")
            sp = c.post("spaces:setup", {"space": {"spaceType": "DIRECT_MESSAGE"},
                                         "memberships": [{"member": {"name": "users/" + email, "type": "HUMAN"}}]})["name"]
        m = c.post(sp + "/messages", {"text": text})
        print("posted", m["name"])
    else:
        sys.exit("unknown command; see --help")


if __name__ == "__main__":
    main()
