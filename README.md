# The Signal Desk

Alif Noushad's personal publishing system. It drafts posts from his own journal, in his own voice, and files them into Notion for him to read and post by hand.

**Nothing in this repo publishes anything.** There is no credential here with permission to post to LinkedIn, X, Reddit or Product Hunt, and there will not be one. Every draft ends as text Alif copies and sends.

## How it works

```
Notion Journal  (five minutes a day, on the phone)
    -> daily draft run  (weekdays, 07:00 Asia/Dubai)
    -> Notion Content Queue  (Status: Draft)
    -> Alif reads, edits, publishes by hand
    -> Notion Post Log  (ANALYZE, monthly)
```

The journal is the input and the constraint. **If it has had no entries for seven days, the run files nothing and says so.** An empty week is information. Inventing material to fill it is the failure this system exists to prevent.

## Where things live

In Notion, inside the existing **Personal Brand** page:

- [The Signal Desk](https://app.notion.com/p/3b866ed43c3a8177bb5cc18f8264f6c5)
- [Content Queue](https://app.notion.com/p/f97c58d06d7e43d88d0655de595e76e1)
- [Journal](https://app.notion.com/p/a5f8d48c3fed4fb59a10b75d42a93f1b)
- [Post Log](https://app.notion.com/p/eb7976ee86a44916a449f93c13ff1c4e)

In this repo:

| Path | What it is |
|---|---|
| `CLAUDE.md` | The standing brief. Read first. |
| `.claude/rules/voice-*.md` | One voice file per platform. Never blended. |
| `.claude/skills/` | DRIP, ENGAGE, ANALYZE, REPLIES. |
| `data/` | Story, journal, privacy rails, platform play, queue and log schemas. |
| `data/corpus/` | Alif's actual writing. Currently empty. |
| `decisions/` | One file per month from ANALYZE. |

## Current status

**Interview done, 2026-08-10.** The transcript is in `data/corpus/interview.md`, kept raw.

The voice files, `data/story.md` and `data/rules.md` were rebuilt from it. Claims carry `[Q]` with Alif's own words printed underneath, or say plainly that they are guesses.

The remaining gap: the evidence is almost all *speech*. The only samples of his writing are three one-line WhatsApp messages, because he has barely posted. His character and subjects are well evidenced; the mechanics of his written posts are still partly inferred. His first real posts become corpus.

**Stage 3 has not run yet.** Five generated posts mixed with five real passages from the transcript, shown unlabelled to three people who know how he talks. Nothing goes out publicly until that passes.

## Connecting Notion

The daily run needs its own Notion token. This takes about three minutes.

An "internal integration" is Notion's name for a key that lets a script read and write specific pages you choose. It cannot see anything you have not explicitly shared with it.

1. Go to **https://www.notion.so/profile/integrations** and click **New integration**.
2. Name it `Signal Desk`. Under **Associated workspace** pick *Alif Noushad's Notion*. Type is **Internal**.
3. Click **Save**, then open the integration and click **Configure integration settings**.
4. Under **Capabilities**, tick **Read content**, **Update content** and **Insert content**. Leave user information at **No user information**.
5. Copy the **Internal Integration Secret**. It starts with `ntn_`. This is your `NOTION_API_KEY`.
6. Now give it access to the pages. Open **The Signal Desk** page in Notion, click the **···** menu at the top right, choose **Connections**, then **Connect to**, and pick `Signal Desk`. Access flows down to all three databases inside it.

Then locally:

```bash
cp .env.example .env
```

Fill in `NOTION_API_KEY` and one model key. The three database IDs are already filled in.

## Running it

```bash
npm install
npm run daily            # one draft run now
npm run daily:schedule   # local scheduler, weekdays 07:00 Asia/Dubai
npm run typecheck
```

The scheduled run happens on GitHub Actions via `.github/workflows/daily-drafts.yml`. For that, add these under **Settings → Secrets and variables → Actions → Repository secrets**:

```
NOTION_API_KEY
NOTION_QUEUE_DB_ID
NOTION_JOURNAL_DB_ID
NOTION_LOG_DB_ID
ANTHROPIC_API_KEY   (or OPENAI_API_KEY)
```

Run it manually from **Actions → Daily Draft Run → Run workflow**.

## The three words

- **DRIP** once or twice a week, to draft properly with several rounds of correction.
- **ENGAGE** each morning, fifteen to twenty minutes, to comment.
- **ANALYZE** once a month, to see what worked.

Plus **REPLIES**, optional, X only, with a warning at the top of the file about how a fixed reply routine reads from the outside.

The daily run is the automated floor: it keeps a supply of drafts in the queue. DRIP is where the real work happens.

**Cadence ceiling: four posts a week across all channels. A ceiling, not a target.**

## Privacy rails

Repeated in full in `CLAUDE.md`, in `data/rules.md`, and at the bottom of every skill file, so they are never one file away from wherever a decision gets made.

The short version: no named people, no client accounts, no money, nothing under negotiation, nothing that cannot be backed up. **When unsure, ask. Do not post.**

## The superseded weekly workflow

This repo previously ran a research → writer → email workflow that generated a weekly content batch and emailed a digest. That code is still here: `agents/research-agent.ts`, `agents/writer-agent.ts`, `agents/email-agent.ts`, `scheduler/weekly-runner.ts`, `services/resend.ts`, and `PROJECT_CONTEXT.md` describes it in detail.

It generated content from model knowledge rather than from Alif's life, which is exactly what The Signal Desk is built to avoid. Its schedule is disabled and it is kept for reference only. It still runs on demand:

```bash
npm run sample     # no API keys needed, writes example JSON
npm run weekly     # full run, needs OpenAI and Resend
```
