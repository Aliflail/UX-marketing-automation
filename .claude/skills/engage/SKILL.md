---
name: engage
description: Surface recent posts worth commenting on and draft comments in Alif's voice, with direct links, into the Notion Daily Plan. Use when Alif types ENGAGE, or asks for comments, engagement, or who to reply to. Runs daily, around twenty comments across LinkedIn, Reddit and Product Hunt.
---

# ENGAGE

Commenting. Daily.

This is the routine that actually reaches people. At a low follower count, comments do far more than posts, because they put Alif inside conversations that already have an audience.

## The daily numbers

**Set by Alif on 2026-08-11:** 10 on LinkedIn, 3 to 5 on Reddit, 5 on Product Hunt. Around twenty a day.

**That is sixty to ninety minutes, not the fifteen to twenty this routine used to be scoped for.** Say so rather than quietly producing twenty thin comments. And when the day is short, **the comments are the part that stays and the posts are the part that goes.** At this follower count that trade is right every time, on every one of these channels.

X replies have no fixed number and should happen most days regardless. Figma Community and the Ommelo company page are not commenting channels at all: the Figma activity that pays is finishing files, and a company page commenting on someone's post is an interruption from a brand where the same comment from Alif's own profile is a person joining a conversation.

## Load these first

1. `.claude/rules/voice-[platform].md` — the **Comment voice** section specifically, for whichever platform is being worked. Never blend two platforms. There are six files; `voice-linkedin-alif.md` is the one for commenting, never `voice-linkedin-ommelo.md`.
2. `data/rules.md` — the privacy rails, in full.
3. `data/story.md` — the four subjects, so comments stay on territory Alif actually owns.
4. `data/platform.md` — where commenting matters most on each channel.
5. `data/daily.md` — where the output goes.

## Two of the four channels are automated. Two cannot be.

**Reddit and Product Hunt run themselves**, every weekday at 06:30 Dubai time, in GitHub Actions. `scheduler/engage-runner.ts` finds real threads and launches through each platform's own read-only API, drafts a comment against the voice files, and writes them with their links into today's Daily Plan row. Alif opens Notion and copies. Nothing is posted.

**LinkedIn and X cannot be automated, and this is not a gap to close later.** Both need an authenticated session to read a feed at all, both forbid automated reading in their terms, and LinkedIn bans accounts for it. Automating them would mean risking the account the entire plan is built on. So those two are done by hand.

**Never fetch or claim to fetch LinkedIn or X, and never produce a link to a post on either that has not come from Alif.** An invented link is worse than no link.

## When running interactively

If Alif types ENGAGE in a session, the automated half has usually already run. So:

1. Read today's Daily Plan row and tell him what is already drafted and waiting.
2. For LinkedIn, ask him to paste. One lump of post text, unlabelled and untidied, is the right ask. Number the comments back in the order he pasted them so he can work straight down.
3. Never make him format the input. Parsing his mess is this routine's job, not his.

## Where the output goes

**Into the page body of today's row in the Notion Daily Plan.** https://app.notion.com/p/2b78f8ca03b145c6a18edbd9bb7374ba

Each row also carries standing entry points for the manual channels: LinkedIn recent-content searches and X live searches. Those do not go stale.

## Steps

1. **Find enough recent posts to hit the day's numbers.** Recent means the last 24 to 48 hours; a comment on a four-day-old post is invisible. On Reddit it is tighter still: sort by new, and go for threads under an hour old with fewer than ten comments, because a comment on a three-hour-old thread with forty replies is not read by anyone.

2. **Weight toward the people Alif actually wants to reach**, which is experience design leads and design managers. Not the biggest accounts. A thoughtful comment on a post by a design manager with 2,000 followers is worth more than the two hundredth comment under a design influencer, because the manager will read it and the influencer will not.

   Rough split: most from mid-sized accounts in his actual field, at most one or two from larger accounts, and include people who have engaged with him before.

3. **For each one, give Alif four things:**
   - **The direct link.** Not optional. Never make him hunt for a post. If the link cannot be produced, drop the item.
   - **The post in one line.**
   - **The drafted comment.**
   - **One line on why this one.**

4. **Write each comment to the comment rules below.**

5. **He edits and posts them himself.** Nothing is submitted by this system.

## Comment rules

- **Open with a concrete scene from Alif's own experience.** Not a grade of their post. "Great post", "This is so true", "Well said, and I'd add" are all dead on arrival.
- **Never restate their point back to them.** They know what they wrote. Summarising it is what people do when they have nothing to add.
- **Never reframe their post as a lesson.** "Great reminder that..." turns their thinking into a moral and it is condescending.
- **Stay on their exact subject, but speak from a different position inside it.** Alif is a designer in an enterprise consultancy in Dubai, building a product on the side. Most people posting about design leadership are in-house at product companies. That gap is the entire value of the comment. Same subject, different seat.
- **No pitching. No links. Ever.** Not to Ommelo, not to his own posts, not to anything.
- **Disagree with claims, never with people.** And when disagreeing, concede the reasonable version first.
- **Length:** two to five sentences on LinkedIn, one or two on X, as long as the question needs on Reddit.
- **Do not comment on something he has not read properly.** A comment that responds to the headline rather than the post is obvious.

## Per-platform notes

**LinkedIn** — the main venue for this. Comments here surface to the commenter's network, so a good one is a small post in itself.

**X** — replies matter more than posts at low follower counts. Shorter and drier. This is where consistency compounds slowest but most durably.

**Reddit** — comment far more than posting. Answer the exact question from direct experience and stop. Read the subreddit's rules first. Never link to anything of his own.

**Offering a scan on Reddit** is the highest-risk instruction in the whole brief, and it has narrow rails. Never unprompted, and never in a post. Only in a reply to someone who has described a problem the scan would actually answer, only after they have replied once, and **never in r/UXDesign in any form.** Say the approach first and the tool second. If the comment would be worse without the offer in it, the offer comes out.

**Product Hunt** — five a day on other people's launches, in the months before Ommelo's own. Design tools, AI-for-design, handoff and QA. Two to four sentences on a specific part of what they built, from someone who has hit the same problem from a different angle. Never "congrats". Arriving only to launch is visible, and this daily commenting is what buys the launch.

## A warning about rhythm

Do not comment on the same set of accounts at the same time every day. See the REPLIES skill for why: a fixed list hit at a fixed hour reads as engagement farming from the outside no matter how genuine each comment is, and the penalty is silent reach suppression that nobody tells you about.

Vary who, vary when, and skip days.

## Privacy rails, in full

These apply to comments exactly as they apply to posts. A comment is public writing.

**People.** No named colleagues, managers, reports or peers. Nobody who has not agreed in words to be written about. No identifying detail that functions as a name. No stories where someone comes off badly, even anonymised. Family off limits entirely. No screenshots containing anyone else's name, avatar or handle.

**Employer and clients.** IBM iX can be named as where he works. Client work is described by shape and problem, never by account name. No screenshots of client work. Nothing under NDA, and assume it is when unsure. No internal process, tooling or org detail that is not already public. Nothing about a pitch, bid or account that has not been announced. He does not speak for IBM iX.

**Money.** No salary, day rates, project values or contract sizes. No Ommelo revenue, funding, valuation or burn. No user or waitlist numbers unless Alif has deliberately made that number public. No pricing under consideration.

**Under negotiation.** No job conversations. No promotion, review or internal role discussion. No partnership, client or acquisition talk before announcement. No unreleased Ommelo plans beyond what he has already said publicly.

**Claims.** Never invent a number, result, metric or outcome. Never invent a user, client quote or testimonial. No experience Alif has not actually had. No implied credential. If a claim cannot be backed up when someone asks, it does not go in.

**Tone.** No punching down. No subtweets or vaguebooking. Disagree with claims, never with named people. Nothing posted while angry about something that happened that day.

**When unsure, ask. Do not post.**

## Nothing is ever published by this system

Comments are drafted here and posted by Alif by hand.

## History

_Empty. What worked, which accounts turned into real conversations, and which comment openings fell flat go here as they are learned._
