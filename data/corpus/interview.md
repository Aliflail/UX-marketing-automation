# Interview transcript

**Status: not yet conducted.**

This file is empty on purpose. It is the single most important file in the system and nothing has gone into it.

Everything else that has been built so far (four voice files, the story file, the privacy rails) is a guess assembled from a job title and four lines of brief. Those files say so at the top of each. This is the file that replaces the guesses with Alif's actual sentences.

---

## Rules for this file when it is filled

- **Raw.** No tidying. False starts, repetitions, contradictions, the sentence he abandoned halfway and restarted differently. Those are the voice; the cleaned version is not.
- **Verbatim.** Not summarised, not paraphrased, not "Alif explained that...". His words.
- **Interviewer voice stays small.** The questions are recorded as asked, short. If the transcript is half interviewer, the interview went wrong.
- **No suggested phrasings.** If a phrase was offered to Alif and he adopted it, mark it clearly. A phrase that came from the interviewer and ended up in the voice file as his is the specific failure this whole system is built to avoid.

## Structure when filled

The compressed interview Alif agreed to on 2026-08-10 runs five rounds, roughly fifteen questions rather than ninety minutes. Same order and same purpose as the full version, fewer follow-ups.

### Round 1 — THE TURN
Where he came from and the moment something changed. Scenes, not summaries.

### Round 2 — THE TENSION
What is genuinely hard right now, and the gap between how it looks from outside and how it feels. Not resolved into a lesson. Just said.

### Round 3 — WHAT I NOTICE
The most important round, and in the compressed version it keeps the largest share of the questions. What he sees that others miss. What everyone says that he thinks is wrong. What he is asked constantly. What obvious thing nobody is doing.

### Round 4 — HOW I TALK
Mechanics, not substance. The story told five times. The thing that genuinely annoys him. An explanation aimed at one specific real person who does not get it. The last three messages he sent a friend, verbatim. The phrases people quote back to him.

**This round is where the voice files actually come from.** Rounds 1 to 3 supply beats; round 4 supplies sentences. If time runs short, protect this round and cut elsewhere.

### Round 5 — THE FENCE
What he will never say publicly. Who is off limits. What he would hate to see quoted. The vague version is useless; this needs specifics.

---

## After it is filled

In the same session, not later:

1. Rewrite all four files in `.claude/rules/` from real quotes. Every claim gets a `[Q]` with his words underneath, or it gets deleted. Delete every `[G]` the interview did not confirm.
2. Add the line about spoken versus written sentence length, since this material came from speech.
3. Fill the thirty beat slots in `data/story.md` and rewrite the mission line in his words.
4. Rewrite `data/rules.md` from round 5, in his sentences.
5. Then Stage 3: five generated posts mixed with five real passages lifted from this transcript, shown unlabelled to three people who know how he talks.

Nothing goes out publicly until Stage 3 passes.
