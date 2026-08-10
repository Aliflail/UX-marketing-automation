# The Signal Desk

Standing brief. Read this first, every session.

This repo is Alif Noushad's personal publishing system: Senior Experience Designer at IBM iX Studio Dubai, founder of Ommelo, writing for experience design leads and design managers on LinkedIn, X, Reddit and Product Hunt.

**Nothing in this system is ever published by you.** Every draft ends as text Alif copies and sends. There is no credential in this repo with permission to post to any platform, and there will not be one.

---

## Current state: the voice files are provisional

The interview has not happened. `data/corpus/interview.md` is empty.

Everything in `.claude/rules/` was assembled from a job title, four lines of brief, and an AI-written context file. Each of those files opens by saying so. They contain zero `[Q]` lines, meaning zero claims backed by an actual quote of Alif's, which is the Kickstart's hard rule.

**Consequence: do not treat generated drafts as ready.** Expect several rounds of correction, and write every correction back into the voice file in the same session.

The next real piece of work is the compressed interview, roughly fifteen questions across five rounds. `data/corpus/interview.md` holds the structure. After it: rewrite the voice files from quotes, fill the thirty beat slots in `data/story.md`, rewrite `data/rules.md` in Alif's own words, then run the Stage 3 blind test before anything goes out publicly.

## The files

| File | What it is |
|---|---|
| `.claude/rules/voice-linkedin.md` | How Alif sounds on LinkedIn. Never blended with another platform. |
| `.claude/rules/voice-x.md` | How he sounds on X. |
| `.claude/rules/voice-reddit.md` | How he sounds on Reddit. Every Reddit post needs his review before posting. |
| `.claude/rules/voice-producthunt.md` | How he sounds on Product Hunt. Event-driven, not a daily channel. |
| `data/story.md` | Mission line, four recurring subjects, the beat backlog. Currently thirty empty slots. |
| `data/journal.md` | How the daily journal works. Lives in Notion. |
| `data/rules.md` | Privacy rails. Provisional until round 5 of the interview. |
| `data/platform.md` | How each channel is played, and the cadence ceiling. |
| `data/queue.md` | The publishing queue schema. Lives in Notion. |
| `data/log.md` | The post log schema. Lives in Notion. |
| `data/corpus/` | Alif's actual writing. Currently empty. `README.md` has the export steps. |
| `decisions/` | One file per month from ANALYZE: the variable changed and why. |

## Notion

The Signal Desk lives inside the existing **Personal Brand** page.

- **The Signal Desk** — https://app.notion.com/p/3b866ed43c3a8177bb5cc18f8264f6c5
- **Content Queue** — https://app.notion.com/p/f97c58d06d7e43d88d0655de595e76e1
- **Journal** — https://app.notion.com/p/a5f8d48c3fed4fb59a10b75d42a93f1b
- **Post Log** — https://app.notion.com/p/eb7976ee86a44916a449f93c13ff1c4e

## The daily journal: exact steps

Five minutes. Decided once, written here so it is never decided again.

1. Open the **Notion app on your phone**. The Journal database is favourited, so it is on the home tab.
2. Tap **New**.
3. In **Note**, type one line about something that actually happened today. A moment, not a topic.
4. Set **Date** to today. Leave **State** as `raw`.
5. If there is more, put it in **Detail**: who else was there, what was actually said, what happened next. If not, stop. One line is a complete entry.

Nothing happened worth writing? Write "nothing today". That is real data.

**If the journal goes seven days without an entry, DRIP says so and refuses to draft.** Inventing material is worse than an empty week.

## The three words

- **DRIP** — once or twice a week, to draft. Reads the journal, proposes one direction, drafts, files into the Notion queue.
- **ENGAGE** — each morning, fifteen to twenty minutes, to comment.
- **ANALYZE** — once a month, to see what worked.

Plus **REPLIES**, optional, X only, with a warning at the top of the file that must be read before it is run.

Cadence ceiling: **four posts a week across all channels. A ceiling, not a target.** Drafts arrive daily so there is a surplus to pick from. Unused drafts expire, and that is the design.

---

## Privacy rails, in full

**People.** No named colleagues, managers, reports or peers. Nobody who has not agreed in words to be written about. No identifying detail that functions as a name; "my skip-level" identifies a person to everyone inside the building. No stories where someone comes off badly, even anonymised, because people recognise themselves and so do their colleagues. Family off limits entirely. No screenshots containing anyone else's name, avatar or handle.

**Employer and clients.** IBM iX can be named as where he works. Client work is described by shape and problem, never by account name; "a large automotive client" is fine, the account name is not. No screenshots of client work, not blurred and not redacted. Nothing under NDA, and when unsure whether something is, assume it is. No internal process, tooling or org detail that is not already public. Nothing about a pitch, bid or account that has not been announced. He does not speak for IBM iX and posts must not read as company position.

**Money.** No salary, his or anyone's. No day rates, project values or contract sizes. No Ommelo revenue, funding, valuation or burn. No user or waitlist numbers unless Alif has deliberately decided to make that number public. No pricing under consideration.

**Anything under negotiation.** No job conversations, his or anyone else's. No promotion, review or internal role discussion. No partnership, client or acquisition talk before it is announced. No unreleased Ommelo plans beyond what he has already said publicly.

**Claims.** Never invent a number, a result, a metric or an outcome. Never invent a user, a client quote or a testimonial. No experience Alif has not actually had; if a draft needs a story he does not have, the draft is wrong, not the story. No implied credential. If a claim cannot be backed up when someone in the comments asks for the detail, it does not go in.

**Tone.** No punching down, not at juniors, clients or other designers' portfolios. No subtweets, no vaguebooking about work. Disagree with claims, never with named people. Nothing posted while angry about something that happened that day; if it is still true tomorrow it is a better post.

**Screenshots.** Before any image goes out, check the tabs, the sidebar, the notifications, the file names, the browser history strip, the calendar in the corner, and any reflection. This is where confidential detail actually escapes.

**When unsure, ask. Do not post.**

---

## How to work with Alif

- Assume he has not done any of this before. Explain what a thing is in one sentence before asking him to do it. Never assume a menu path, a file format or a piece of jargon. If he goes quiet, ask whether you lost him.
- If a step needs something outside this folder (an account, an export, a tool), say so up front and tell him exactly where to click.
- **Give one recommendation, not a menu.** Lead with the pick and defend it.
- Teach as you go. Name the format and say why it works.
- **When he says a draft does not sound like him, he is right.** Do not defend it. Ask which words were wrong, fix the voice file in the same session, move on.
- Never invent a number, a result or an experience he has not earned.
- Never suggest a phrasing during the interview. If you offer him a phrase he will take it, and it ends up in the voice file as his when it is yours.
- When unsure whether something is safe to publish, ask. Do not guess.

## The old workflow

This repo previously held a weekly research → writer → email workflow that sent a digest to Alif's inbox. Its code is still here (`agents/`, `prompts/`, `scheduler/weekly-runner.ts`, `services/resend.ts`) and `PROJECT_CONTEXT.md` describes it.

That system generated content from model knowledge rather than from Alif's life, which is exactly the failure this one is built to avoid. It is kept for reference and its scheduled workflow is disabled. **The Signal Desk supersedes it.** Do not extend it.
