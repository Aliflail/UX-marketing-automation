# UX Intelligence Engine Marketing Automation Context

This document is the agent handoff brief for the UX Intelligence Engine weekly content workflow. Read it before making changes.

## Project Purpose

UX Intelligence Engine is an AI-assisted creator workflow for Alif, a Senior Experience Designer at IBM iX Studio Dubai. The system generates weekly social content for a founder-led UX product, then emails a review-ready digest to Alif for manual posting.

The product is intentionally not a generic AI marketing tool. It should feel:

- thoughtful
- product-minded
- design-community native
- founder-led
- enterprise UX informed

Avoid startup-bro tone, broad AI hype, autonomous agent theatre, and overengineering. The system should feel like an internal content strategist briefing, not AI-generated marketing spam.

## Owner And Voice

Alif is positioned as:

- Senior Experience Designer at IBM iX Studio Dubai
- 6+ years across Toyota, Lexus, Al Ghurair, Nestle, and enterprise UX systems
- Builder of UX Intelligence Engine

Writing voice:

- direct
- warm
- designer-to-designer
- occasionally dry and funny
- never corporate
- never preachy
- no em dashes

## Tech Stack

Runtime and tooling:

- Node.js
- TypeScript
- OpenAI API
- optional Anthropic Claude support
- Resend API
- node-cron
- dotenv
- fs/promises
- zod for JSON validation

Do not introduce LangGraph, CrewAI, AutoGen, vector databases, web frameworks, or autonomous planning loops unless the product direction changes explicitly.

## Architecture

The workflow is deterministic and sequential:

```text
Research Agent
  -> outputs/weekly-research.json
Content Writer Agent
  -> outputs/content-week-[DATE].json
Email Digest Agent
  -> outputs/final-email.json
  -> Resend email
```

There are three agents:

1. `agents/research-agent.ts`
2. `agents/writer-agent.ts`
3. `agents/email-agent.ts`

Each agent:

- reads its prompt from `prompts/`
- calls the AI provider through `services/openai.ts`
- validates or normalizes the response with Zod
- writes JSON output into `outputs/`
- logs progress through `services/logger.ts`

## Folder Map

```text
agents/
  research-agent.ts
  writer-agent.ts
  email-agent.ts

prompts/
  research-prompt.md
  writer-prompt.md
  email-prompt.md

outputs/
  .gitkeep
  weekly-research.json              # generated, ignored
  content-week-[DATE].json          # generated, ignored
  final-email.json                  # generated, ignored

services/
  openai.ts
  resend.ts
  logger.ts

scheduler/
  weekly-runner.ts
  sample-runner.ts

utils/
  file.ts
  date.ts

.github/workflows/
  weekly-content.yml

.env.example
.gitignore
package.json
README.md
tsconfig.json
PROJECT_CONTEXT.md
```

## Key Files

### `scheduler/weekly-runner.ts`

Main production runner.

- Loads `dotenv/config`
- Defines `runWeeklyWorkflow`
- Runs once with `--once`
- Starts cron scheduler otherwise
- Cron: every Monday at 8:00 AM Asia/Dubai

NPM scripts:

```bash
npm run weekly
npm run dev
```

### `scheduler/sample-runner.ts`

Dry-run sample generator.

- Does not call OpenAI
- Does not call Resend
- Writes realistic sample JSON files to `outputs/`

Use it to inspect structure without API keys:

```bash
npm run sample
```

### `services/openai.ts`

Provider service for model JSON generation.

Default provider:

- OpenAI chat completions
- `response_format: { type: "json_object" }`
- default model from `OPENAI_MODEL`, fallback `gpt-4o`

Optional provider:

- Anthropic Claude if explicitly requested in code
- requires `ANTHROPIC_API_KEY`

Includes retry handling and JSON parsing.

### `services/resend.ts`

Email service.

- Sends HTML and text email with Resend
- Converts markdown to simple HTML
- Skips sending gracefully if `RESEND_API_KEY` is missing
- Defaults recipient to `alifnoushad.96@gmail.com`

Important: `EMAIL_FROM` must be a Resend-verified sender or domain.

### `agents/research-agent.ts`

Generates `outputs/weekly-research.json`.

Prompt source:

```text
prompts/research-prompt.md
```

The original research prompt is intentionally preserved. The implementation normalizes research items because model output may return either strings or objects.

Expected output fields:

- `week`
- `pain_points`
- `trending_topics`
- `ux_crime_candidate`
- `hot_take_angles`
- `content_angles`

### `agents/writer-agent.ts`

Reads `outputs/weekly-research.json` and generates `outputs/content-week-[DATE].json`.

Prompt source:

```text
prompts/writer-prompt.md
```

Expected post count:

- 3 LinkedIn
- 4 Instagram
- 5 X/Twitter
- 2 Reddit

The implementation normalizes generated platform labels. The model may return `LinkedIn`, `Instagram`, `X/Twitter`, or `Reddit`; the saved JSON uses:

- `linkedin`
- `instagram`
- `x`
- `reddit`

Reddit posts should have `manual_review_required: true`.

### `agents/email-agent.ts`

Reads `outputs/content-week-[DATE].json`, creates `outputs/final-email.json`, and sends the digest via Resend.

Prompt source:

```text
prompts/email-prompt.md
```

The implementation tolerates richer model output for fields like `strongest_predicted_post` and normalizes missing visual/schedule arrays with sensible defaults.

## Environment Variables

Local `.env` is ignored by git.

Required for real generation:

```bash
OPENAI_API_KEY=
```

Required for email sending:

```bash
RESEND_API_KEY=
EMAIL_FROM=UX Intelligence Engine <weekly@your-verified-domain.com>
EMAIL_TO=alifnoushad.96@gmail.com
```

Optional:

```bash
ANTHROPIC_API_KEY=
OPENAI_MODEL=gpt-4o
ANTHROPIC_MODEL=claude-3-5-sonnet-latest
```

Security note: API keys were previously pasted into chat during setup. Treat pasted keys as exposed and rotate them.

## GitHub Actions

Workflow file:

```text
.github/workflows/weekly-content.yml
```

Schedule:

```yaml
cron: "0 4 * * 1"
```

This is Monday 4:00 AM UTC, equivalent to Monday 8:00 AM Asia/Dubai.

Manual run:

```text
GitHub -> Actions -> Weekly UX Content Workflow -> Run workflow
```

GitHub repository secrets must be configured under:

```text
Settings -> Secrets and variables -> Actions -> Repository secrets
```

Required secrets:

```text
OPENAI_API_KEY
RESEND_API_KEY
EMAIL_FROM
EMAIL_TO
```

Optional secret:

```text
ANTHROPIC_API_KEY
```

Optional repository variable:

```text
OPENAI_MODEL
```

The workflow uses Node 24-safe GitHub actions:

```yaml
actions/checkout@v6
actions/setup-node@v6
actions/upload-artifact@v7
```

It also sets:

```yaml
FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
```

Generated JSON outputs are uploaded as a GitHub Actions artifact named:

```text
weekly-content-outputs
```

## Commands

Install:

```bash
npm install
```

Run sample without APIs:

```bash
npm run sample
```

Run real workflow once:

```bash
npm run weekly
```

Start local cron scheduler:

```bash
npm run dev
```

Typecheck:

```bash
npm run typecheck
```

Build:

```bash
npm run build
```

## Generated Outputs

Generated files are intentionally ignored:

```text
outputs/weekly-research.json
outputs/content-week-[DATE].json
outputs/final-email.json
```

The folder is kept in git through:

```text
outputs/.gitkeep
```

## Known Operational Notes

- If `RESEND_API_KEY` is missing, the workflow completes and writes `final-email.json`, but logs that email sending was skipped.
- If `EMAIL_FROM` is not verified in Resend, the send will fail.
- GitHub Actions will not use local `.env`; it only uses repository secrets.
- The model does not browse live social platforms directly. The research agent prompt asks for weekly themes; current implementation relies on the model response. Add explicit research APIs only if needed later.
- The system currently uses OpenAI by default. Claude support exists at the service layer, but no agent is configured to select it by default.
- The repository has had manual GitHub UI edits to workflow files before. Pull before pushing workflow changes.

## Design Principles For Future Changes

Keep changes small and deterministic.

Prefer:

- plain async functions
- typed JSON contracts
- readable prompts
- clear logging
- direct file outputs
- graceful failure

Avoid:

- hidden autonomous loops
- multi-agent debate systems
- new databases
- unnecessary orchestration frameworks
- generic brand-safe marketing voice
- content that sounds like a SaaS content calendar template

## Current Remote

Repository:

```text
https://github.com/Aliflail/UX-marketing-automation.git
```

Primary branch:

```text
main
```

## Handoff Checklist For Agents

Before editing:

1. Run `git status --short --branch`.
2. Read this file and `README.md`.
3. Check `.github/workflows/weekly-content.yml` if touching automation.
4. Do not commit `.env`, generated outputs, `node_modules`, or `dist`.

Before finishing:

1. Run `npm run typecheck`.
2. Run `npm run build` if TypeScript or workflow behavior changed.
3. Commit focused changes.
4. Push to `origin/main` when requested or when continuing the established repo setup.
