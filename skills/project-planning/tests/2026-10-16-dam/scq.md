# Life Itself DAM — SCQ

Status: signed off 2026-10-16 by Rufus (simulated), with caveats: keep "is finding media a real constraint?" open; the one-week cap is a guess, not agreed
Source: `projects/2026-life-itself-dam.md`; `~/src/life-itself/dam` (README, MOTIVATION, PLAN, jobs-to-be-done, research checkpoint 2026-09-13); interview with Rufus 2026-10-16 (simulated test run)

## Situation
- DAM is about helping Life Itself find and reuse images and video for the Hubs, Orion and Second Renaissance sites, and for comms more broadly.
- There is a lot of material already, scattered across Drive, Photos, YouTube, Zoom, SSDs and people's machines.
- Since the September checkpoint, DAM sits under the comms content strategy as a supporting capability, not a goal in itself.
- Drive has been tried as an archive and is okay; a Drive intake-first prototype was proposed in PLAN.md, but how far it got is unclear.
- Live website work is under way, especially for the Hubs site.

## Complication
- People building the sites and doing comms can't find strong, relevant media quickly: there is no consistent way to tell what's good, where it came from, or whether we've used it before.
  - So they reuse the same things or settle for something weaker, and time goes on asset hunting.
- Useful footage may be unpublished or underused, and stays buried.
- Tagging at capture isn't realistic, so a fix can't depend on it.
- But we can't yet point to a specific page or post that stalled because of this; the checkpoint also says there's no evidence yet that finding assets is the main constraint on comms.

## Question
How should Life Itself make its strong existing images and video quick to find and reuse for the people building pages and doing comms, without relying on tagging at capture?

Criteria:
- For: the people building pages (Hubs site first) and doing comms; usable by non-technical volunteers.
- By when: in time to help the live Hubs site work; no fixed date yet.
- Effort / cost: small and low-cost; about a week of team time for the first attempt (Rufus: "reasonable", not yet agreed with the team); tools we already have unless a paid one clearly earns it.
- Off the table: tagging everything at capture; building the full long-term archive first.

## Issue tree
- **Is finding media actually a real constraint on site and comms work, and where does it bite?** — open
- **Who does the hunting today, and what do they need in practice?** — open
  - Which live pages and comms pieces need what media first (Hubs site first)? — open
- **Where does our material live today?** — open (Drive partly surveyed in Sept)
  - Who knows or controls each location, and who can actually get material out for us? — open
- **Should findable material be moved into one archive, or pointed to where it already lives?** — open
- **What must we know about each asset, and how do we tell what's "strong" without tagging at capture?** — open
  - What is the minimum to record (source, date, used where)? — open
  - Can use, a quick human pick, or AI signal "strong"? — open
- **How will we know the first attempt worked well enough to continue?** — open
  - Does it fit the wider comms pipeline (Riverside, Canva, episode records), or fight it? — open

## Ideas offered (parked)
- Drive as the first destination archive, with the numbered folder layout in PLAN.md (from notes; Rufus raised it again in interview).
- Ask the people doing the hunting to walk through a real page or comms job (Rufus, interview).
- Usage as a curation signal: an asset used in a page or post counts as "curated" (from MOTIVATION.md).
- AI-assisted description and tagging after ingest (from PLAN.md).
- Frame.io; Cloudflare R2 for raw storage; R2 plus image resizing for site images (from PLAN.md, image-storage.md).

## Next
LTP not yet run. Run `ltp-project` (or `reason-commons`) on this file in a new session in `~/src/life-itself/dam`. When done, return to turn the result into beads and an implementation plan.
