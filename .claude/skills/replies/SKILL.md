---
name: replies
description: Optional low-volume reply routine for a platform where Alif has no audience yet. Use only when Alif types REPLIES and only for X or Product Hunt. Read the warning at the top before running.
---

# REPLIES

## Read this before running the skill

**A fixed list of accounts replied to at the same hour every night reads as engagement farming from the outside, no matter how genuine each individual reply is.**

This matters because the judgement is not made by a human reading your replies and deciding you are sincere. It is made by a classifier looking at pattern: same accounts, same interval, same time of day, similar length, sustained over weeks. Genuine intent is not visible in that data and does not protect you.

**The usual penalty is silent reach suppression.** No notification, no strike, no appeal, and no way to confirm it happened. Posts simply stop being shown to people who do not already follow you, and it can persist long after the behaviour stops. By the time it is detectable it has been running for weeks.

The cost of getting this wrong is much higher than the benefit of getting it right. If in any doubt, use ENGAGE instead and do not run this skill at all.

## When this skill applies

**Only** on a platform where Alif has no audience yet, which currently means X, and possibly Product Hunt.

**Never on LinkedIn.** He has an existing network and a real name attached to an employer there. ENGAGE covers LinkedIn.

**Never on Reddit.** Reddit's detection for this is the most aggressive of any platform and the penalty is an account ban that takes the whole comment history with it.

## Load these first

1. `.claude/rules/voice-x.md` — the **Comment voice** section.
2. `data/rules.md` — the privacy rails, in full.
3. `data/platform.md`.

## The four constraints

Every one of these is non-negotiable. They exist to break the pattern, not to slow you down.

**1. Irregular in timing.** Never the same hour twice in a week. Skip days, and skip them unpredictably. Three days on, two off, one on is fine. Every day at 9pm is not.

**2. Varied in target.** Never the same set of accounts. Keep a rolling list and drop anyone replied to twice in a fortnight. If you find yourself returning to the same five people, the routine has already become the thing it must not be.

**3. Low in volume.** Two to four replies in a session, maximum. Not ten. Volume is the clearest signal in the pattern.

**4. Done by hand.** Alif reads the post and writes or edits the reply himself. Drafts from this skill are starting points, never something to paste unread.

## Steps

1. Find two to four recent posts, from accounts not replied to in the past fortnight, on subjects Alif genuinely has a position on.
2. For each: the direct link, the post in one line, a drafted reply, one line on why.
3. Apply the comment rules from `voice-x.md`: open from his own experience, never restate their point, never reframe it as a lesson, stay on their exact subject from a different seat, no links, no pitching.
4. Hand them to Alif. He edits and posts by hand, at a time of his choosing, and skips any that do not feel right.
5. **Do not schedule the next session.** If this skill runs on a schedule, it has become the pattern it warns about.

## Privacy rails, in full

**People.** No named colleagues, managers, reports or peers. Nobody who has not agreed in words to be written about. No identifying detail that functions as a name. No stories where someone comes off badly, even anonymised. Family off limits entirely. No screenshots containing anyone else's name, avatar or handle.

**Employer and clients.** IBM iX can be named as where he works. Client work is described by shape and problem, never by account name. No screenshots of client work. Nothing under NDA, and assume it is when unsure. No internal process, tooling or org detail that is not already public. Nothing about a pitch, bid or account that has not been announced. He does not speak for IBM iX.

**Money.** No salary, day rates, project values or contract sizes. No Ommelo revenue, funding, valuation or burn. No user or waitlist numbers unless Alif has deliberately made that number public. No pricing under consideration.

**Under negotiation.** No job conversations. No promotion, review or internal role discussion. No partnership, client or acquisition talk before announcement. No unreleased Ommelo plans beyond what he has already said publicly.

**Claims.** Never invent a number, result, metric or outcome. Never invent a user, client quote or testimonial. No experience Alif has not actually had. No implied credential. If a claim cannot be backed up when someone asks, it does not go in.

**Tone.** No punching down. No subtweets or vaguebooking. Disagree with claims, never with named people. Nothing posted while angry about something that happened that day.

**When unsure, ask. Do not post.**

## Nothing is ever published by this system

## History

_Empty._
