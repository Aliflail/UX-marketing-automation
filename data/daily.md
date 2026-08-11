# The Daily Plan

## Where it lives

**In Notion**, inside The Signal Desk.

> Daily Plan: https://app.notion.com/p/2b78f8ca03b145c6a18edbd9bb7374ba
> Parent page (The Signal Desk): https://app.notion.com/p/3b866ed43c3a8177bb5cc18f8264f6c5

This file documents the schema and the working agreement. The rows are in Notion.

## What it is, and why it is not the Content Queue

**One row is one day. That row holds every channel's post for that day, the comment
targets, and the live links once things are out.**

The Content Queue is one row per post, which is the right shape for drafting and for
ANALYZE. It is the wrong shape for a Tuesday morning, when the question is not "what
posts exist" but "what am I doing today". Six channels means six places to look, and
six places to look is how a daily routine stops being daily.

**Open the Daily Plan. Work down the row. Close it.**

## Columns

| Column | Type | What goes in it |
|---|---|---|
| **Day** | Title | "Tue 11 Aug". The row's name. |
| **Date** | Date | The day. Sorts the view. |
| **Status** | Select | Planned, Drafted, Ready, Done, Skipped. |
| **LinkedIn Alif** | Text | The exact post for Alif's own profile. Copy the whole field. Empty means comments only. |
| **LinkedIn Alif link** | URL | The live post URL, pasted in after posting. |
| **LinkedIn Ommelo** | Text | The exact post for the company page. |
| **LinkedIn Ommelo link** | URL | Live URL after posting. |
| **X** | Text | The day's post or posts, marked morning and evening. A thread is numbered. |
| **X link** | URL | Live URL after posting. |
| **Reddit** | Text | The post and the exact subreddit, or "comments only". |
| **Reddit link** | URL | Live URL after posting. |
| **Product Hunt** | Text | Normally comments only. A post here means teaser or launch work. |
| **Product Hunt link** | URL | Live URL. |
| **Figma Community** | Text | What gets finished or shipped. No daily quota on this channel. |
| **Figma link** | URL | Published resource URL. |
| **Comments** | Text | The tally, as done over target. "7 / 19". |
| **Beats used** | Text | Which beats from `data/story.md` the day consumed. |
| **Notes** | Text | Anything to know before pasting. Rails flags go here. |

**The page body of each row** holds the comment targets with their links, the rails
check, and anything that needs more than a line. That is where ENGAGE writes each
morning.

## How the statuses move

`Planned` → the shape is set. Channel, format, beat, subject. No copy written.
`Drafted` → the copy exists but Alif has not read it.
`Ready` → Alif has read every field and would publish them.
`Done` → posted, and the links are pasted back in.
`Skipped` → the day did not happen. **This is a normal, healthy outcome.** A skipped
day costs nothing. A day filled with thin posts costs the audience.

## Why the rows are drafted about a week ahead and no further

Drafting a fortnight ahead from a fixed backlog produces posts about things that came
up in an interview rather than posts about this week. The difference is visible to
exactly the people this is aimed at.

So: **roughly a week of Drafted rows, roughly a week of Planned rows behind them.** DRIP
converts Planned into Drafted against the journal, which is what keeps the posts
attached to a life rather than to an archive.

## The daily order of work

1. Open today's row.
2. Read every field you are going to post. If a sentence is not yours, change it, and
   say which words were wrong so the voice file gets fixed in the same session.
3. Post, by hand, on each channel. Paste each live URL back into the matching link
   column.
4. Do the comments. They are in the page body with links.
5. Update **Comments** with the tally and set **Status**.

**When the day is short, cut the posts and keep the comments.** At this follower count
comments do more on every one of these channels, and a missed post costs nothing.

## Where the links come from

Two kinds, and they behave differently.

**Standing links.** Subreddit "new" pages, LinkedIn recent-content searches, Product
Hunt's today page, X live searches. These are entry points, they do not go stale, and
they are seeded into every row already.

**Specific links.** The actual post to comment on. These are what ENGAGE produces each
morning and writes into the row's page body. A link that cannot be produced means the
item gets dropped rather than described.

## The supply problem, stated plainly

`data/story.md` holds thirty-one beats from the interview. At five LinkedIn posts and
two Reddit posts a week, the formats that need a lived beat consume about seven a week.

**That is under three weeks of supply, and it does not change by trying harder at it.**

Two refills, and there are no others:

1. **The journal.** One line a day. This is the whole supply line. `data/journal.md` has
   the exact steps and they take five minutes.
2. **A top-up interview round**, worth booking before the backlog hits zero rather than
   after.

**Two channels do not consume beats:** X teardown micro-posts, where the material is a
real interface rather than Alif's life, and Figma Community files. That is precisely why
they carry the highest volume in the plan. It was not an accident and it should not be
rebalanced away.

## Nothing here is ever published by this system

Same agreement as everywhere else in this repo. The rows are written into Notion and
that is where it stops. Alif copies and pastes, on every channel, every time.

There is no credential in this repo with permission to post anywhere, and there will not
be one. A post you paste yourself is a post you read once more before it is public, and
that read is the last real privacy check in the system.
