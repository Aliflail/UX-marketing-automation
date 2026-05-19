# UX Intelligence Engine Content Workflow

Production-ready weekly AI content workflow for UX Intelligence Engine, built for Alif’s founder-led design voice.

It runs three deterministic agents in sequence:

1. Research Agent creates `outputs/weekly-research.json`
2. Content Writer Agent creates `outputs/content-week-[DATE].json`
3. Email Digest Agent creates `outputs/final-email.json` and sends the digest to `alifnoushad.96@gmail.com`

This is intentionally not a multi-agent debate system. It is a reliable weekly creator workflow with clear files, prompts, validation, logs, and predictable execution.

## Setup

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Fill in the required keys:

```bash
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
RESEND_API_KEY=
EMAIL_FROM=UX Intelligence Engine <weekly@yourdomain.com>
EMAIL_TO=alifnoushad.96@gmail.com
```

`OPENAI_API_KEY` is required for generation. `ANTHROPIC_API_KEY` is supported by the service layer but the default workflow uses OpenAI. `RESEND_API_KEY` is required to send email. If it is missing, the workflow still writes `final-email.json` and skips sending.

## Running Locally

Run one full weekly workflow:

```bash
npm run weekly
```

Run a local sample without API keys or email sending:

```bash
npm run sample
```

Run the scheduler locally:

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

## Scheduling

The scheduler uses `node-cron` and runs every Monday at 8:00 AM Dubai time:

```ts
0 8 * * 1
```

The schedule is defined in `scheduler/weekly-runner.ts`.

## GitHub Actions

The repository includes `.github/workflows/weekly-content.yml` for GitHub-hosted scheduling.

It runs every Monday at 8:00 AM Dubai time, which is 4:00 AM UTC:

```yaml
0 4 * * 1
```

To configure it in GitHub:

1. Open the repository on GitHub.
2. Go to **Settings**.
3. Go to **Secrets and variables**.
4. Open **Actions**.
5. Add these **Repository secrets**:

```bash
OPENAI_API_KEY=your_openai_key
RESEND_API_KEY=your_resend_key
EMAIL_FROM=UX Intelligence Engine <weekly@your-verified-domain.com>
EMAIL_TO=alifnoushad.96@gmail.com
```

Optional secrets:

```bash
ANTHROPIC_API_KEY=your_anthropic_key
```

Optional repository variable:

```bash
OPENAI_MODEL=gpt-4o
```

To test manually:

1. Go to the **Actions** tab.
2. Select **Weekly UX Content Workflow**.
3. Click **Run workflow**.

The workflow uploads generated JSON files as an artifact named `weekly-content-outputs`, even if the email step fails.

## Architecture

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
  weekly-research.json
  content-week-[DATE].json
  final-email.json

services/
  openai.ts
  resend.ts
  logger.ts

scheduler/
  weekly-runner.ts

utils/
  file.ts
  date.ts
```

## Agent Flow

The workflow is sequential on purpose:

```text
Research Agent
  -> outputs/weekly-research.json
Content Writer Agent
  -> outputs/content-week-[DATE].json
Email Digest Agent
  -> outputs/final-email.json
  -> Resend email
```

Each agent reads its prompt from `prompts/`, calls the model through `services/openai.ts`, validates the JSON shape with Zod, then writes a file to `outputs/`.

## Content System

The content is designed around UX Intelligence Engine’s positioning:

- thoughtful
- product-minded
- design-community native
- founder-led
- enterprise UX informed

The writer prompt avoids corporate tone, generic AI content, and hype. Reddit posts are flagged with `manual_review_required` because they should be reviewed before posting.

## Error Handling

The system includes:

- timestamped console logs
- retry handling for model calls
- JSON parsing and validation
- missing file detection
- graceful email skipping when Resend is not configured

## Troubleshooting

If generation fails, check:

- `.env` exists and contains `OPENAI_API_KEY`
- model access is available for `OPENAI_MODEL`
- prompt files exist in `prompts/`
- `outputs/content-week-[DATE].json` matches today’s generated date before running the email agent directly

If email does not send, check:

- `RESEND_API_KEY` is set
- `EMAIL_FROM` uses a verified Resend sender/domain
- `EMAIL_TO` is correct

If JSON validation fails, inspect the relevant output from the model call and tighten the prompt or schema. The workflow is designed to fail visibly rather than save malformed content.
