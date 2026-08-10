---
name: drip
description: Draft posts in Alif's voice from the Notion journal, and file approved drafts into the Notion Content Queue. Use when Alif types DRIP, or asks to draft, write posts, or work on content. Runs once or twice a week.
---

# DRIP

Drafting. Once or twice a week. Expect several rounds.

## Load these first, before anything else

1. `data/journal.md` — how the journal works, and the Notion database it lives in.
2. The Notion **Journal** database — the actual entries. https://app.notion.com/p/a5f8d48c3fed4fb59a10b75d42a93f1b
3. `data/story.md` — the mission line, the four subjects, and the beat backlog.
4. `data/rules.md` — the privacy rails. Read in full, every session.
5. `.claude/rules/voice-[platform].md` — only the one for the channel being drafted. Never blend two.
6. `data/platform.md` — how that channel is played, and the cadence ceiling.
7. The Notion **Content Queue** — what is already queued, so nothing repeats. https://app.notion.com/p/f97c58d06d7e43d88d0655de595e76e1

## Steps

1. **Check the journal first.** Query the Notion Journal database for entries since the last DRIP session.

   **If nothing has been added in seven days, stop. Say so, and do not draft.** Tell Alif the journal has been quiet since [date] and ask what happened in the last week; if he answers with something real, capture it as a journal entry and continue. If he does not, end the session. Inventing material is worse than an empty week, and this is the rule that keeps the whole system honest.

2. **Read the raw entries and find the beat.** A beat is a moment, a decision or a mistake, with a when and a where. Cross-check against the backlog in `data/story.md` and against Posted rows in the queue so nothing is used twice.

3. **Propose ONE direction. Not a menu.** Name the beat, the channel, the format and the subject, and say in one line why this one and not the others. If Alif rejects the direction, propose one more. Never list three and ask him to pick.

4. **Ask two or three sharp questions.** Pull out the specifics the journal entry does not have: what was actually said, who else was in the room, what happened immediately afterwards, what he expected instead. Ask them one at a time. These answers are what make the post unwriteable by anyone else.

   Never suggest phrasings. If you offer Alif a phrase he will take it, and it ends up in the voice file as his when it is yours.

5. **Draft.** One channel, one voice file, one post. Write the hook as its own two lines, deliberately, because it carries the whole post on LinkedIn.

   **Every draft names its format and says in one line why that format fits this beat.** This is not decoration; it is how Alif learns the patterns rather than just receiving output.

6. **Expect several rounds.** When Alif says a draft does not sound like him, **he is right. Do not defend it.** Ask which specific words were wrong. Then write that answer into the relevant voice file **in this same session**, as a `[Q]` line with his correction quoted underneath. A correction that is not written down will be made again next week.

7. **Check against the rails** before anything is marked Ready. Every rail in `data/rules.md`, not a general impression of them. If a draft sits anywhere near one, ask Alif rather than deciding.

8. **File approved drafts into the Notion Content Queue** with a date against each one. Fill Hook, Date, Channel, Body, Format, Subject, Media, Status, Why this format, Beat. Status starts at `Ready` once Alif has approved it.

9. **Log and strike.** Move the source journal entry to `drafted` (and to `queued` once it has a date). Strike the beat in `data/story.md` so it is never used twice.

10. **Respect the ceiling.** Four posts a week across all channels, and that is a ceiling, not a target. If the queue already holds four Ready rows for this week, say so and stop drafting rather than adding a fifth.

## Privacy rails, in full

These are repeated here so they are never one file away.

**People.** No named colleagues, managers, reports or peers. Nobody who has not agreed in words to be written about. No identifying detail that functions as a name. No stories where someone comes off badly, even anonymised. Family off limits entirely. No screenshots containing anyone else's name, avatar or handle.

**Employer and clients.** IBM iX can be named as where he works. Client work is described by shape and problem, never by account name. No screenshots of client work. Nothing under NDA, and assume it is when unsure. No internal process, tooling or org detail that is not already public. Nothing about a pitch, bid or account that has not been announced. He does not speak for IBM iX.

**Money.** No salary, day rates, project values or contract sizes. No Ommelo revenue, funding, valuation or burn. No user or waitlist numbers unless Alif has deliberately made that number public. No pricing under consideration.

**Under negotiation.** No job conversations. No promotion, review or internal role discussion. No partnership, client or acquisition talk before announcement. No unreleased Ommelo plans beyond what he has already said publicly.

**Claims.** Never invent a number, result, metric or outcome. Never invent a user, client quote or testimonial. No experience Alif has not actually had. No implied credential. If a claim cannot be backed up when someone asks in the comments, it does not go in.

**Tone.** No punching down. No subtweets or vaguebooking. Disagree with claims, never with named people. Nothing posted while angry about something that happened that day.

**Screenshots.** Check tabs, sidebar, notifications, file names, browser history strip, calendar, and reflections before any image goes out.

**When unsure, ask. Do not post.**

## Nothing is ever published by this system

DRIP writes rows into Notion and stops. Alif copies and pastes. There is no credential anywhere in this repo with permission to publish to any platform.

## History

_Empty. Corrections, rejected drafts and what they taught go here as they happen._
