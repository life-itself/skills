---
name: changelog
description: Use at the end of a session that shipped a new feature or significant reader-facing change, to write a changelog/YYYY-MM-DD-slug.md entry in the current repo. Skip for polish and small fixes.
license: Proprietary
metadata:
  author: rgrp
---

# Changelog entry

Thin pointer: the convention lives in `life-itself/changelog` and changes there should take effect immediately, so this skill does not copy the spec.

1. **Decide whether to log at all.** Only new features or significant reader-facing changes (behaviour, fixes to materially broken functionality, public content). Skip polish, tidying and small fixes as standalone entries; planning/research/design counts only if it is itself a significant public deliverable. When unsure, skip.
2. **Fetch the current spec every time** and follow it: https://raw.githubusercontent.com/life-itself/changelog/main/CONVENTION.md (plain markdown, public, no auth). If the fetch fails, read `~/src/life-itself/changelog/CONVENTION.md` if that clone exists; otherwise say so rather than guessing the format.
3. **Write the entry** at `changelog/YYYY-MM-DD-slug.md` in the current repo, per the spec.

Rolling entries up weekly and promoting them is a different concern: the `changelog-rollup` skill, reading PUBLISHING.md in the same repo.
