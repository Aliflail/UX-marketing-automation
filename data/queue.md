# Queue

## Where the queue lives

**In Notion.** Alif chose this on 2026-08-10.

> Content Queue: https://app.notion.com/p/f97c58d06d7e43d88d0655de595e76e1
> Parent page (The Signal Desk): https://app.notion.com/p/3b866ed43c3a8177bb5cc18f8264f6c5

This file documents the schema and the working agreement. The rows themselves are in Notion.

## Columns

| Column | Type | What goes in it |
|---|---|---|
| **Hook** | Title | The first two lines, exactly as they will appear. This is the title of the row because on LinkedIn it is the entire post until someone taps "more". |
| **Date** | Date | The day this is intended to go out. An intention, not a trigger. |
| **Channel** | Select | LinkedIn, X, Reddit, Product Hunt. One channel per row. |
| **Body** | Text | Everything below the hook. Copy Hook then Body, in that order. |
| **Format** | Select | One of the seven named formats. |
| **Subject** | Select | One of the four recurring subjects from `data/story.md`. |
| **Media** | Select | None, Screenshot, Image, Carousel, Video. |
| **Status** | Select | Draft, Ready, Queued, Posted, Killed. |
| **Why this format** | Text | One line from DRIP on why this format fits this beat. This column is how the patterns get learned rather than just applied. |
| **Beat** | Text | The specific moment this came from. Struck from `data/story.md` once used. |

There is one example row in the database, marked `EXAMPLE ROW` and set to `Killed`. Delete it once there is a real one.

## How the statuses move

`Draft` → written by DRIP or the daily run, not yet read by Alif.
`Ready` → Alif has read it and would publish it.
`Queued` → it has a date against it and is next up.
`Posted` → copied out and published. ANALYZE picks these up.
`Killed` → not going out. **This is a normal, healthy outcome**, not a failure. Drafts that sit more than two weeks get killed rather than published late.

## The working agreement

**You copy and paste out of here yourself. Nothing is ever scheduled and nothing is ever auto-posted.**

There is no API key in this system with permission to publish anywhere. The daily runner writes rows into Notion and stops. Publishing is a human action, every time, on every channel.

Three reasons this is not laziness in the design. Timing judgement on the day is better than a schedule set a week earlier. A post you paste yourself is a post you read once more before it is public, which is the last real privacy check. And an automated posting pipeline attached to a personal account is one bad draft away from a problem that cannot be taken back.

## Supply and the ceiling

Drafts arrive daily. The publishing ceiling is four a week, from `data/platform.md`.

Those two numbers are deliberately mismatched. The daily run creates a surplus so that picking is possible; the ceiling stops the surplus from turning into an obligation. **Unused drafts expire. That is the design, not a leak.**

If the queue is consistently full of drafts nobody wants to publish, that is a voice problem and it belongs in a DRIP session, not a reason to lower the bar and publish them.
