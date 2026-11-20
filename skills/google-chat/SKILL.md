---
name: google-chat
description: Use when an AI session should post a message (status update, summary, alert) into a Life Itself Google Chat space. Posts via the space's incoming webhook, shown as the "Rufus's AI" app, not as Rufus. Post-only; cannot read messages or DM people.
---

# Google Chat: post from an AI session

Each space that accepts AI posts has an incoming webhook. Its URL is a secret, stored in the dotenvx secrets as `GOOGLE_CHAT_<SPACE>_WEBHOOK_URL` (see the `secrets` skill).

```bash
~/src/rufuspollock/skills/skills/google-chat/scripts/post.sh AI_POSTS_TEST "Build finished: 3 PRs merged"
echo "long text" | ~/src/rufuspollock/skills/skills/google-chat/scripts/post.sh AI_POSTS_TEST -
~/src/rufuspollock/skills/skills/google-chat/scripts/post.sh AI_POSTS_TEST "step 2 done" nightly-2026-11-20   # thread key: replies go in one thread
```

Spaces set up:

| SPACE | Chat space | Notes |
|---|---|---|
| `AI_POSTS_TEST` | AI posts (test) | Rufus only; for trying things out |

## Rules

- Posting to a shared space is sending a message on Rufus's behalf: post only where the task or Rufus's standing instruction says to. Never post secrets or private content into a space with people who should not see it.
- Text only, Chat markdown-ish formatting (`*bold*`, `_italic_`, `` `code` ``, links as `<url|label>`). Max 1 message per second per space.

## Add a space

1. In Chat (web): open the space > space name menu > Apps & integrations > Webhooks > Add webhooks, name "Rufus's AI", Save. (Org setting "Allow users to add and use incoming webhooks" is already ON at lifeitself.org.)
2. Webhook menu > Copy link, then store it without displaying it: `cd ~/src/rufuspollock/secrets && git pull && dotenvx set GOOGLE_CHAT_<SPACE>_WEBHOOK_URL "$(pbpaste)" >/dev/null && printf '' | pbcopy && git commit -am "add GOOGLE_CHAT_<SPACE>_WEBHOOK_URL" && git push`
3. Add a row to the table above.

## Beyond webhooks

To read messages, DM people, or post as Rufus himself, use the Chat API with user OAuth (needs a lifeitself.org Google Cloud project with the Chat API enabled and a Chat app configured). Not set up; see planning bead pl-atuv.
