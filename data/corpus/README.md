# Corpus

Everything Alif has actually written, in his own words. This folder is what makes the voice files real rather than plausible.

**It is currently empty apart from an unfilled interview template.** That is the single biggest gap in the system.

## Why exports matter more than the interview

The interview captures how Alif talks. The exports capture how he **writes**, which is a different voice, usually shorter and flatter. If the two disagree, the Kickstart's instruction is to trust the interview for character and the exports for mechanics.

There are three separate voices in an export and they must not be mixed:

- **Posts** — the public, considered voice.
- **Comments** — replies to other people. Looser, more reactive. This is where the comment sections of the voice files come from.
- **Messages** — DMs. The most natural and least performed voice, and the one nobody can fake.

Keep them in separate files. A voice file built from all three blended together describes an average that Alif never actually uses.

## Getting the exports

Start these now, before the interview, because two of them take a day or more to arrive.

### LinkedIn — do this first, it is the slowest

1. Open LinkedIn on a desktop browser and click your photo, top right.
2. **Settings & Privacy**.
3. Left sidebar: **Data privacy**.
4. **Get a copy of your data**.
5. Choose **Want something in particular?** and tick at least: *Posts*, *Comments*, *Messages*, *Articles*.
6. **Request archive** and enter your password.
7. LinkedIn emails a download link. The larger archive typically takes up to 24 hours, sometimes longer. The link expires after a few days, so download it when the email arrives rather than later.

Unzip it and drop the CSV files into `data/corpus/linkedin/`.

### X

1. Open X on a desktop browser. **More** in the left sidebar, then **Settings and privacy**.
2. **Your account** → **Download an archive of your data**.
3. Re-enter your password and confirm the code X sends you.
4. **Request archive**.
5. X usually takes about 24 hours and notifies you in-app when it is ready.

Unzip and drop the whole folder into `data/corpus/x/`. The relevant files inside are `tweets.js` and `direct-messages.js`.

### Reddit

1. Open reddit.com on desktop, click your avatar → **Settings**.
2. **Privacy** tab.
3. Scroll to **Manage third-party app authorization**... just above it is **Request your Reddit data**. (Or go straight to reddit.com/settings/data-request.)
4. Choose **I want data from** → *Since account creation*, and submit.
5. Usually arrives within a day or two, by email.

Drop the CSVs into `data/corpus/reddit/`. `comments.csv` is the valuable one; on Reddit the comments are almost always a better voice sample than the posts.

### Product Hunt

No meaningful export and probably nothing to export yet. Skip it.

## If there is nothing to export

Entirely possible. Alif said he posts "a bit", which may mean the archives are thin.

If so, say it plainly rather than working around it: the voice files will rest on the interview alone, the `[Q]` quotes will all come from the transcript, and Stage 3 will use five passages lifted from the interview as the "real" samples instead of real posts. That is a legitimate path and the Kickstart names it explicitly.

## Folder layout

```
data/corpus/
  interview.md          the transcript, raw and untidied
  linkedin/             posts, comments, messages as separate files
  x/
  reddit/
```
