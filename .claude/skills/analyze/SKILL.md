---
name: analyze
description: Pull real post numbers into the Notion Post Log, read what the numbers actually say, and recommend exactly one variable to change. Use when Alif types ANALYZE, or asks about performance, results, or what is working. Runs monthly.
---

# ANALYZE

Measuring. Monthly. Not weekly, because a month is the shortest window in which a difference is a difference rather than noise.

## Load these first

1. `data/log.md` — the schema and why these particular numbers.
2. The Notion **Post Log** — the actual rows. https://app.notion.com/p/eb7976ee86a44916a449f93c13ff1c4e
3. The Notion **Content Queue** — Posted rows that have not yet been logged. https://app.notion.com/p/f97c58d06d7e43d88d0655de595e76e1
4. `decisions/` — every previous month's decision, so this month's is not a repeat or a reversal made blind.
5. `data/platform.md` — the current cadence rule, which is one of the things that can change.

## Steps

1. **Pull real numbers from the platforms. Never from memory, and never estimated.**

   Alif does this by hand, because there is no analytics API credential in this system. Tell him exactly where to look:
   - **LinkedIn:** open each post, click **View analytics** under it. Take impressions, and the members-outside-your-network percentage from the breakdown.
   - **X:** open the post, click the analytics bar icon. Take impressions.
   - **Reddit:** post page shows views and upvote ratio.

   If a number cannot be obtained, leave the cell empty. **An empty cell is fine; a guessed number corrupts every comparison that follows and every decision built on it.**

2. **Update the Post Log.** One row per published post. Move the source journal entries to `logged`.

3. **Mark maturity.** Tick `Mature` on everything over 24 hours old.

   **Anything under 24 hours old is excluded from every comparison in this session.** No exceptions and no "but it is obviously doing well". Early numbers measure who happened to be online in the first hour.

4. **Read what the numbers actually say. Six things.**

   **Rewrite these from scratch each month.** Do not carry forward last month's framing, do not reuse last month's categories, and do not check whether this month agrees with last month before writing them. The whole value is an independent read; a running narrative will find its own confirmation every time.

   Anchor each of the six to specific rows. "Posts that opened on a quoted line ran roughly double the out-of-network share of posts that opened on a statement, across the four in each group" is a finding. "Storytelling performs well" is a horoscope.

   Lead with out-of-network percent and comments from strangers. Impressions are context, not score.

   Say when something cannot be concluded yet. With eight posts, most apparent patterns are noise, and saying so is more useful than manufacturing six insights from four data points.

5. **Compare Alif's `What I think happened` column against the numbers.** Where his read was right, say so. Where it was wrong, that is the most useful finding available, because it recalibrates the judgement he uses every week.

6. **Recommend exactly ONE variable to change next month.**

   One. Not a list, not a prioritised set, not "primarily X but also consider Y". Two changes at once mean neither can be attributed, and the month is wasted as evidence.

   Candidates: opening move, format mix, channel split, posting time, ending type, media, or the cadence ceiling itself.

   Lead with the pick and defend it. Do not present options.

7. **Write the decision and its evidence into `decisions/`.**

   One file per month: `decisions/YYYY-MM.md`. It contains the variable being changed, the specific rows that justify it, what result would confirm it, and what result would falsify it. **Write the falsifying condition before the month starts**, or next month will explain any outcome as a success.

## What not to do

- Do not compare immature posts.
- Do not report follower count. Nothing here is optimised for it.
- Do not treat likes as a signal.
- Do not average across platforms. LinkedIn and X impressions are different units and combining them is meaningless.
- Do not recommend "post more". If volume genuinely is the variable, say which specific number and why, and remember the ceiling is a ceiling.
- Do not retrofit an explanation onto a post that did well. Sometimes a post is timing.

## Privacy rails, in full

Analysis is internal, but anything drawn from it that becomes a post is public writing and carries every rail.

**People.** No named colleagues, managers, reports or peers. Nobody who has not agreed in words to be written about. No identifying detail that functions as a name. No stories where someone comes off badly, even anonymised. Family off limits entirely. No screenshots containing anyone else's name, avatar or handle.

**Employer and clients.** IBM iX can be named as where he works. Client work is described by shape and problem, never by account name. No screenshots of client work. Nothing under NDA, and assume it is when unsure. No internal process, tooling or org detail that is not already public. Nothing about a pitch, bid or account that has not been announced. He does not speak for IBM iX.

**Money.** No salary, day rates, project values or contract sizes. No Ommelo revenue, funding, valuation or burn. No user or waitlist numbers unless Alif has deliberately made that number public. No pricing under consideration. **This includes his own post metrics**: impressions and engagement numbers are not published without a deliberate decision to do so.

**Under negotiation.** No job conversations. No promotion, review or internal role discussion. No partnership, client or acquisition talk before announcement. No unreleased Ommelo plans beyond what he has already said publicly.

**Claims.** Never invent a number, result, metric or outcome. Never invent a user, client quote or testimonial. No experience Alif has not actually had. No implied credential. If a claim cannot be backed up when someone asks, it does not go in.

**Tone.** No punching down. No subtweets or vaguebooking. Disagree with claims, never with named people. Nothing posted while angry about something that happened that day.

**When unsure, ask. Do not post.**

## Nothing is ever published by this system

## History

_Empty. What the numbers turned out to mean, and which of these readings were later shown to be wrong, go here._
