# Voice: Figma Community

## What this file was built from, and how far to trust it

**CONFIDENCE: LOW. No corpus, and the platform is unlike the other five.**

Alif has published nothing to Figma Community, so there is no writing to build from. What
follows comes from the interview, the rails in `CLAUDE.md`, and how the Community
actually works as a distribution surface.

Tags: `[Q]` backed by a printed quote, `[S]` supported by a stated fact, `[G]` a guess.

**The thing that makes this channel different from the other five: the artifact is the
post.** On LinkedIn the writing is the product. Here the file is the product and the
writing is packaging. A brilliant description on a mediocre template does nothing. A
plain description on a template someone actually uses on Monday morning does everything.

So this file is short on prose rules and long on what to ship and what not to leak.

---

## Who is speaking

A working enterprise designer publishing the thing he actually uses. `[S — six years in consultancy]`

Not a template shop. Not a content creator. The credibility here comes from the file
being obviously made by someone who has run the process it describes, and the tell for
that is **specificity**: the awkward row in the checklist that only exists because
something went wrong once.

His engineering background is a genuine differentiator on this platform and should show
in the artifact, never in a claim. `[Q]`

> "So after I finish my, um, degree in computer science and engineering, I got an opportunity with an American based, um, fintech company, which I worked as a software engineer for one and a half years."

A pre-release QA file written by someone who has been on both sides of the handoff is a
different file from one written by someone who has only been on the design side. Let
that be visible in the contents.

## What this channel is for

**Designer credibility and top-of-funnel discovery.** `[S — stated by Alif]`

Be honest about the mechanics. Figma Community is a **search-and-browse surface, not a
feed.** Nothing decays the way a LinkedIn post does, and nothing gets a burst on day one
either. A file published today can still be getting duplicated in a year. `[G]`

Which means: **this is the only one of the six channels where the right cadence is not
daily.** Shipping one genuinely useful file a fortnight beats shipping four thin ones a
week, and thin ones actively cost you, because a profile of half-finished templates is
worse than a profile with two good ones.

**The daily work here is not publishing. It is the twenty minutes of finishing** that
turns a file Alif already has into a file someone else can open cold.

## The three files to ship first

From what Alif named:

1. **The design review checklist.** Closest to the problem he actually has: `[Q]`
   > "there was not enough time for reviewing all the work that the team had done"
2. **The design quality scorecard.** The artifact behind the argument he keeps losing.
3. **The pre-release QA file.** The handoff-side one, where the engineering background shows.

Ship them in that order, spaced out, not as a set on one day. `[G]`

## The writing surfaces, in order of how much they matter

**1. The cover page inside the file.** The single most neglected surface on this platform
and the one that decides whether someone uses the thing or closes the tab. First frame,
top left, where the file opens. Three things: what this is, how to use it, and who made
it. Six lines, not a manual.

**2. The resource description.** What it is, who it is for, what is in it. Plain. Three
to five sentences. No pitch.

**3. The title.** Descriptive and searchable. "Design review checklist" beats anything
clever, because people find these by typing what they need into a search box. `[G]`

**4. The cover image.** It is a thumbnail in a grid. Legible at small size, showing the
actual contents rather than a logo.

**5. Update notes when republishing.** One line on what changed. This is the closest
thing this platform has to a feed, and it is where returning users see you.

## Tone

Plainer than anywhere else, including Reddit. This is instructional writing.

No warmth in the LinkedIn sense, because there is no conversation happening. No
personality performance. **Say what the thing is.**

The one place his own voice should appear is the honest note about limits, which he does
naturally: `[Q]`

> "How the insights are drawn is something I'm still figuring out."

A line in the cover page saying "this is the version I use on enterprise projects, it is
probably too heavy for a two-week build" is worth more than any amount of polish.

## Machine-writing tells to avoid

- "The ultimate [thing]." "The only [thing] you'll ever need."
- A number in the title that is not real. "50+ components" when there are 31.
- Describing a checklist as a "framework", a "system" or a "methodology".
- "Perfect for designers who..." as the opening of the description.
- A description that never says what is actually in the file.
- Filler frames to make the file look substantial.
- Any claim about outcomes. "Ship 2x faster" is both a lie and unverifiable.
- Emoji headers on every frame.

## Formatting

- Description: short paragraphs, no markdown, Figma does not render it.
- Inside the file: text styles, real spacing, components where components make sense. The
  file is a portfolio piece whether or not it is meant as one, and enterprise design leads
  will judge the craft before they read a word.
- Tags on publish: use the real ones people search. Fewer and accurate beats many and hopeful.

## Punctuation habits

- **No em dashes.** `[S]` Same hard rule. It applies inside the Figma file too, in every
  text layer, not only in the description.
- Full stops. Plain sentences.
- Exclamation marks: none.

## Emoji

`[G]` None in the description or the title. Inside the file, only if it is functional, a
status marker in a checklist column for example, and never decorative.

## The link

Every file may carry **one** link to the Ommelo scan request, and it goes in **one** place:
the bottom of the cover page inside the file, under a plain line of text saying what it
is. Not in the title. Not in the first line of the description. Not repeated on every
frame.

**The file has to be worth having with the link removed.** If someone would feel the
template was a wrapper around an advert, it is a wrapper around an advert. That test is
the whole rule.

`[OPEN QUESTION — the scan request URL does not exist in this repo yet. Alif provides it
before the first file ships. Until then the placeholder stays a placeholder and nothing
publishes.]`

## What must never leave the building in a Figma file

**This is the most dangerous channel in the set for confidentiality, and it is not close.**
`data/rules.md` says to check screenshots for tabs, sidebars and reflections. A Figma file
is far worse than a screenshot, because it carries things a screenshot cannot:

- **Other pages in the file.** Check every page tab, not just the one that is open.
- **Hidden layers and layers outside the visible frames.** Anything dragged off-canvas
  during a working session is still in the published file.
- **Version history.** Published files carry their history. A client artboard that was in
  this file three weeks ago is recoverable.
- **Component libraries and linked styles.** A file that pulls from an IBM iX or client
  library exposes the library name.
- **Comments.** Old file comments contain colleagues' names and what they said.
- **File and layer names.** "AcmeBank_dashboard_v4" in a layer tree is a client name.
- **Prototype links** pointing at anything internal.
- **The thumbnail**, which is often an old frame nobody looked at again.

**The rule: build every Community file from a blank file, by hand.** Never publish a
duplicate of a working file, and never publish a duplicate of a duplicate. Copying frames
across brings history, links and names with them. Retyping is slower and it is the only
version of this that is actually safe.

Everything else in the rails applies unchanged: no client work by name or by shape close
enough to identify, no colleague names anywhere in the file, nothing under NDA, no
invented numbers.

## Do

- Ship the file he actually uses, cleaned up, not a file invented for publishing.
- Put the how-to-use on the first frame.
- Say what the file is not good for.
- Name the real constraint it came from, in one line, without naming the project.
- Build from blank, every time.
- Republish with a note when it improves. Files here get better with age.

## Do not

- Do not use an em dash, in the description or in any text layer.
- Do not publish a duplicate of a working file.
- Do not claim an outcome or a number.
- Do not put the link anywhere except the bottom of the cover page.
- Do not ship on a schedule. Ship when a file is finished.
- Do not lead with the job title in the description. The work carries it.

---

## Comment voice

Barely a surface here. Figma Community is not a conversation platform and there is no
daily commenting quota to hit on it. `[G]`

Where it exists, comments on someone else's file follow the Product Hunt posture: two to
four sentences on a specific part of what they made, from someone who has solved the same
problem differently. Never "great file". Never a link to your own.

**Do not treat this channel as a commenting channel to fill a daily number.** The activity
that pays here is finishing files.

## Message voice

Rare. If someone gets in touch about a file, answer about the file. `[Q]`

> "Hmm, apply and if you see any other role i can refer you"

One line, no closing full stop, no greeting or sign-off, offers help without being asked.
That last habit is genuinely his and it is the right instinct here too: if someone is
using the checklist and stuck, tell them how you run it.

Never a cold pitch. Never convert a file question into an Ommelo conversation unless they
ask what you are building.
