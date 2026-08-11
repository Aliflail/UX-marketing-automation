# Platform

How each channel is played. This is a different question from how Alif sounds on it, which is in `.claude/rules/voice-[platform].md`.

Sources for what follows: general platform mechanics as of 2026, plus the audience Alif named (experience design leads and design managers). None of it is measured against his own numbers yet, because there are none. **Every timing and frequency claim here is a starting position to be corrected by ANALYZE after the first month, not a fact.**

**Six channels, updated 2026-08-11** on Alif's instruction, for the Ommelo marketing push. Each has its own voice file and its own goal:

| Channel | Voice file | Goal | Cadence Alif set |
|---|---|---|---|
| LinkedIn — Alif | `voice-linkedin-alif.md` | Founder-led credibility, waitlist, design partners | 5 posts/week, 10 comments/day |
| LinkedIn — Ommelo | `voice-linkedin-ommelo.md` | Followers on the company page | 2 to 3 posts/week |
| X | `voice-x.md` | Fast message testing, indie founder reach | 1 to 2 posts/day, 1 thread/week |
| Reddit | `voice-reddit.md` | Trust, and scan requests | 3 to 5 comments/day, 2 posts/week |
| Product Hunt | `voice-producthunt.md` | Followers and launch-day assets | 5 comments/day, teaser page, launch later |
| Figma Community | `voice-figma.md` | Designer credibility, top-of-funnel discovery | Ship templates, no daily quota |

The daily assembly of all six lives in `data/daily.md` and in the Notion **Daily Plan** database.

---

## LinkedIn — Alif

**Primary channel.** The audience Alif named is here in a way it is not anywhere else. Design leads and design managers read LinkedIn during the working day, largely because their employers have made it the professional default. If only one channel survives, it is this one.

**What gets read:** first-person accounts of a specific situation at work. Posts where the writer is visibly still doing the job. Anything that names a real constraint rather than a best practice.

**What gets ignored:** carousels of tips. Anything that looks like it was designed rather than written. Reposted quotes. Congratulation posts. Career advice from people whose career is now posting career advice. Links in the body, which suppress reach badly.

**Post shapes that work:** The Room, The Correction, The Quiet Cost, The Question I Keep Getting. The Disagreement works but costs more.

**Length:** 150 to 300 words. The first two lines carry everything, because that is all that shows before "see more". This is why the Notion queue gives the hook its own column.

**Frequency and timing:** **five a week**, Monday to Friday, roughly 8 to 9am Gulf time. That window catches the local working morning and the start of the European one. Friday is the weakest day in this region and is the one to drop first when there are only four good posts.

**Ten comments a day**, and they matter more than the posts do at this follower count. See ENGAGE.

**Note on the jump from two or three to five.** Five a week is a real load on a two-source journal. The first thing that breaks is not the writing, it is the supply of true material, and the failure mode is a Thursday post about a thing that did not happen. If a day has nothing real behind it, **post nothing and take the comments instead.** Ten good comments beat a thin post, every time, on this channel.

**Images:** a single relevant image helps a little. A designed graphic with text on it helps less than people think and often signals "marketing". A plain screenshot of a real artifact beats a polished carousel. Video is not worth the effort here yet.

**Never:** link in the body, engagement pods, "Agree?", comment-for-the-PDF, tagging people who are not actually in the story, or posting the same body that went to X.

## LinkedIn — Ommelo

**The company page. A destination, not an engine.** Voice file: `.claude/rules/voice-linkedin-ommelo.md`, which is the file that explains why this page must never say "we" about one person.

**How a new company page actually grows:** almost entirely from Alif's personal profile. People arrive because they read something of his and clicked through. They follow because the page has something worth following, not because it posts often. **Posting five times a week into a page with forty followers is work with no destination.**

**What gets read:** the artifact. Screenshots of the actual product. The unfinished part said out loud.

**What gets ignored:** announcements, milestone posts, tips carousels, anything reposted verbatim from Alif's own profile, which makes both accounts look automated.

**Post shapes that work:** The Founder Note, The Small Artifact, The Quiet Cost. Only those three.

**Length:** 100 to 200 words. Shorter than his personal posts.

**Frequency and timing:** **two to three a week**, same morning window. One good one is better than three.

**The growth levers that actually work here, in order:** Alif linking the page from his own profile's Experience section so every profile visit sees it; his personal posts occasionally mentioning what he is building, without a link in the body; the page having three or four real posts on it before anyone is sent there.

**Never:** "we" for one person, a metric that has not happened, an invented user or testimonial, a link in the body, any IBM iX client work, or a launch from a draft.

## X

**Secondary, and slow.** Design leads are here but they are not here in a professional-reading posture, and reach at a low follower count is genuinely hard. This channel pays off over a year, through replies, not through posts.

**What gets read:** one sharp observation with no setup. Screenshots. Replies inside an existing conversation.

**What gets ignored:** threads that should have been one post. Anything with a link. Announcements. Posts with no referent, which read as quote graphics.

**Post shapes that work:** The Correction and The Quiet Cost compress best. The Small Artifact with a screenshot. The Founder Note, which travels further here than on LinkedIn because the build-in-public audience is on X.

**Length:** under 220 characters, well inside the limit, because the ceiling forces the cut and keeps posts quotable.

**Frequency and timing:** **one to two posts a day, plus one thread a week.** Two windows, roughly 8am and 6pm Gulf time. Replies still matter more than posts on this channel and should happen every day regardless of whether anything is posted.

**Teardown micro-posts** are the format that makes daily volume survivable here. One specific observation about one real interface, from a designer who is looking at it properly. They are the only thing on this list that does not consume a beat from `data/story.md`, because the material is the interface rather than Alif's life. **Use public products, never a client's, and never a named person's portfolio.** A teardown that reads as a critique of a team rather than of a decision breaks the anti-negativity rule that runs through every voice file.

**The one thread a week** carries a real sequence: five to seven posts where each one stands alone. Not one post cut into pieces. If the material is not genuinely sequential, skip the thread that week.

**Images:** yes. Screenshots carry well and lift reach.

**Never:** links in the post body, hashtags, threads under five genuinely sequential points, borrowed X slang, subtweets.

## Reddit

**Third, and the highest-risk channel by a distance.** Every post here is read by Alif before it goes anywhere. See `.claude/rules/voice-reddit.md` for why that rule is not negotiable.

**What gets read:** a real question from someone genuinely stuck. A specific answer from direct experience. Long is fine; Reddit actually reads.

**What gets ignored, or worse:** anything with a promotional smell. Perfect formatting on a personal anecdote. Leading with a job title. A useful post with a product mention in the last paragraph, which retroactively poisons the whole thing.

**Post shapes that work:** The Correction, The Quiet Cost as a discussion opener, The Question I Keep Getting reframed as a genuine question to the sub. The Small Artifact only in r/SideProject.

**Length:** 200 to 600 words for a post. Comments as short as two sentences.

**Frequency and timing:** **3 to 5 comments a day, and 2 posts a week.** Roughly 10am to 12pm US Eastern, which is when these subs are awake, not Gulf morning.

**Strong recommendation, and it is Alif's call to override: ramp into the two posts a week rather than starting there.** Reddit's spam filters and its human moderators both weight account age and comment history, and a new account whose first fortnight includes four posts in UX subs is close to the profile they remove. The drafts exist from week one either way; this is about when they go out.

- **Week 1 and 2: comments only.** 3 to 5 a day, zero posts. Not a warm-up formality, it is what buys the standing that makes a post survive.
- **Week 3: one post.** In whichever sub Alif has actually been commenting in.
- **Week 4 onward: two a week**, in different subs, never the same content twice.

If Alif wants the two a week from day one, post into **r/SideProject first**, where a new account building something is on-topic by default, and keep r/UXDesign for later, because that is the sub where a removal costs the most.

**Timing inside a day matters here more than on any other channel.** A comment on a thread that is three hours old and has forty comments is invisible. Sort by new, find threads under an hour old with fewer than ten comments, answer the actual question.

**Offering limited scans.** This is the highest-risk instruction in the whole brief and it has narrow rails:

- **Never in a post.** Not in the body, not in an edit, not in the title.
- **Only in a comment reply, and only to someone who has described a problem the scan would actually answer.** Unprompted is promotion, and it is read as promotion.
- **Never in r/UXDesign.** That sub's self-promotion rule is enforced and Ommelo is not mentioned there at all, in any form.
- **Say the approach first, the tool second, and only if they ask.** "I'd check X and Y" is the comment. "I've built something that does that, happy to run it if useful" is only ever the second message, after they have replied.
- If a scan offer would make the comment worse without it, it comes out.

**Images:** rarely. Text posts do better in the UX subs.

**Never:** post without reading the subreddit's rules and its last week of threads. Never cross-post the same content to multiple subs. Never link to your own work. Never mention Ommelo in r/UXDesign at all.

## Product Hunt

**Not a publishing channel. An event venue.** Nobody publishes here regularly; you launch once per product and you comment the rest of the time.

**What gets read on a launch:** what it does in one concrete sentence, the specific problem it came from, and what it does not do. Naming a limitation buys more credibility here than any feature claim.

**What gets ignored:** adjectives before function, category claims, launch-day enthusiasm with nothing under it.

**Post shapes that work:** The Founder Note for the launch itself. The Small Artifact as a comment on someone else's launch.

**Length:** six to twelve sentences for a launch post. Two to four for a comment.

**Frequency and timing:** **5 comments a day on other people's launches**, plus the teaser page now and the launch later. The launch itself: when Ommelo is genuinely ready, on a Tuesday or Wednesday, posted at 00:01 Pacific because the daily ranking window starts there. Arriving only to launch is visible and it costs you, which is exactly what the daily commenting is buying.

**The teaser page ("Coming soon").** Set it up early, because it collects followers who are notified automatically on launch day, and that notification list is the single highest-value asset for the launch. It needs a name, a one-line description, a thumbnail and a link. It does not need, and must not have, a launch date until there is one.

**Comment on launches adjacent to the work**, which means design tools, AI-for-design, developer handoff, QA. Five a day is achievable because there are dozens of launches daily. Two to four sentences each, on a specific part of what they built. Never "congrats".

**Images:** required. A launch without a visual and a demo underperforms regardless of the copy.

**Never:** ask for upvotes anywhere. Never launch on a draft; the exact copy gets Alif's explicit go-ahead first, because a launch is one-shot and public. Never invent a user count or a testimonial. **DRIP still does not queue Product Hunt post rows in the daily run.** The daily row for this channel is comments, not a post.

## Figma Community

**The slowest channel and the only one that compounds instead of decaying.** Voice file: `.claude/rules/voice-figma.md`.

**Not a feed.** Nothing here gets a day-one burst and nothing here dies after 48 hours. A file published in August is still being duplicated the following year. Everything about how this channel is played follows from that.

**What gets used:** a file someone can open cold and run on Monday. The cover page inside the file, with what it is and how to use it, decides this more than the description does.

**What gets ignored:** thin templates, files with filler frames, anything that reads as a wrapper around a link.

**What to ship, in this order:** the design review checklist, the design quality scorecard, the pre-release QA file. Spaced out, not published as a set on one day.

**Frequency:** **no daily quota, and that is deliberate.** One genuinely finished file a fortnight. The daily work on this channel is twenty minutes of finishing, not publishing. A profile of four half-finished templates is worse than a profile with two good ones.

**The link:** one link to the Ommelo scan request, at the bottom of the cover page inside the file. Never in the title, never in the first line of the description, never repeated per frame. The file has to be worth having with the link removed.

**Never:** publish a duplicate of a working file. Build every Community file from blank, by hand. A duplicated file carries its pages, hidden layers, version history, linked libraries, comments and thumbnail with it, and that is how a client name gets published. See the full list in the voice file, because this is the highest-confidentiality-risk channel of the six by a distance.

---

## Standing cadence rule

**Updated 2026-08-11 on Alif's instruction. The previous rule was four posts a week across all channels, a ceiling rather than a target. It has been replaced by per-channel targets for the Ommelo push.**

The targets are in the table at the top of this file. Roughly: **five LinkedIn posts, two or three Ommelo page posts, seven to fourteen X posts, one X thread, and two Reddit posts a week**, plus **around twenty comments a day** across LinkedIn, Reddit and Product Hunt.

That is about five times the previous volume. Alif has asked for it, and it is his call. What follows is what to watch, because these are the things that will actually break first and the order they will break in.

**1. The material runs out before the writing does.** `data/story.md` holds thirty-one beats, all real, all from the interview. At the new volume the posts that need a lived beat, the LinkedIn and Reddit ones, consume seven a week. **That is four weeks of supply and then nothing.** The journal is the only refill and it currently has to carry the whole system. The mitigation is in the design already: X teardowns and Figma files do not consume beats, and they are deliberately the highest-volume channels. **When the backlog drops below ten, run a top-up round rather than reaching.** DRIP still refuses to draft after seven silent journal days, and that rule does not relax because the target went up.

**2. The comments are the real time cost, not the posts.** Twenty thoughtful comments a day is sixty to ninety minutes, not the fifteen to twenty ENGAGE was scoped for. **When the day is short, cut the posts and keep the comments.** At this follower count comments do more, on every one of these channels, and a missed post costs nothing while a fortnight of silence in a subreddit costs the standing that makes posting possible at all.

**3. Reddit is the account that can actually be lost.** Everything else degrades. Reddit bans, and a ban takes the history with it. The ramp in the Reddit section is not optional.

**4. Volume is the enemy of the voice, and the voice is not proven yet.** The Stage 3 blind test in `data/stage3-voice-test.md` has not run. Five posts a week from a MEDIUM-confidence voice file compounds a wrong voice faster than it compounds an audience. **Run Stage 3 before the volume goes up, not after.**

Drafts land in the Notion **Daily Plan** database, one row per day, all six channels in that row. Unused drafts still expire. That has not changed and it is still the design.

Revisit all of this at the first ANALYZE, with real numbers, and write the change in `decisions/` rather than here.
