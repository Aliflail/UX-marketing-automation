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

---

# TRANSCRIPT

Compressed interview, begun 2026-08-10. Spoken answers, dictated. Raw and untidied.

## Round 1 — THE TURN

**Q: Take me to the moment you decided design was going to be the thing. Not the reasons, the actual scene.**

So after I finish my, um, degree in computer science and engineering, I got an opportunity with an American based, um, fintech company, which I worked as a software engineer for one and a half years. But while I was working, I was not very happy with, you know, the work I was doing. And at some point of the time, I was asked to watch the users of the product that I was built for, you know, the actual users. And that sparked something in me where I was able to understand what actual problems these users were facing. So this... you know, I always wanted to also jump into a creative field, and that's when I decided, okay, I need to find something. Uh, it needs to be something creative, and it needs to be... it shouldn't be, like, too far from what I'm actually doing. That's when I landed in design. I was always a creative person. I got, you know, um, awards winning art competitions and, uh, things like that when I was young. But this is a moment, you know, I decided, okay. I need something different and design... UX design, um, you know, it was very easy for me to catch on too. It was very easy for me to learn.

**Q: You said you were asked to watch the actual users. What did you see them doing?**

I saw them using the software, uh, and it was very confusing. The software was very bulky, and there was a lot of function in it. And they were constantly hitting errors with multiple types of documents they were scanning. By the way, the product was to scan different documents and get financial data out of it. And these were, like, you know, manual, uh, manually picked up by these employees. There was an automated version of it, but this was my users who were manually picking, uh, numbers out of this big financial documents. So they would go through it, and then they would identify these numbers and then upload it with these highlighted numbers in the software. And I saw, like, after they're doing a lot of manual work, at the point of uploading it to the software, there was, uh, errors constantly hit. And I identified why it was happening. It was a technical issue, and that's where I thought, you know, okay. It made a lot of sense watching them in real, uh, to see where they're actually really facing problems. and also the whole software was a bit complicated. They had to go through multiple rounds of menus to actually do the quick and, you know, the things that were routine. They had to, like, even go into multiple layers of menu. So bringing that up was something also I thought could be improved.

**Q: You said you identified why the errors were happening. What did you do with that, and who did you take it to?**

So with the errors and the functionality wise issues that I saw from the users, I redesign the whole, um, the layout of the dashboard. I pulled out the key functions upfront and, um, you know, buried secondary actions behind because they were not used on a daily basis. Uh, I redesigned the dashboard and showed the new version to my manager, and, uh, he was impressed by it. the

**Q: What did he actually say when you showed him, and what happened to the redesign after that?**

He said it was a good idea, and how I presented it was... I showed him how the new layout was structured differently, uh, even though it was not a a big back end issue that we were solving. It was a UI redesign, which instantly solved a lot of problems. Uh, so it was not a big build or big effort for the development team to implement this, but it was a huge help for the users, actions, and speeding up the the process of whole scanning the documents, which could instantly increase the number of documents scanned by each person, effectively improving the efficiency of the, uh, software.

_Round 1 ends here._

## Round 2 — THE TENSION

**Q: Think about the last week at IBM iX. What was the hardest part of it?**

The hardest part was, um, something I worked for, uh, one of the clients. Uh, there were multiple iterations that was going on for this particular client, and they were never happy about it. Um, the budget of the whole project was so low, and we did not have enough time or money to spend more, um, to finish this project. But the client insisted they, um, you know, they wanted more out of what, uh, they had already seen. So there was multiple rounds of iteration, and it was very hard because they were never convinced of what designs we had shown.

**Q: In the most recent round, what did they actually say about the designs?**

They kept seeing, uh, the UI can be improved. Um, that was a key feedback that comes on coming back. Uh, but even though we've shown them, like, multiple iterations, and they were not deciding on which route they had to go. So we gave them some inspirations. We gave them, uh, a few ideas about how the UI can be more aligned with their thinking. Um, and some of them, they had picked, and we used those as reference to build the rest of the screens.

**Q: Someone reading "Senior Experience Designer at IBM iX, Dubai" pictures something. What is a week like that one actually like?**

It it it looks like design, uh, work, but mostly it's collaboration between the team. So the help that you get between the other IXers in Dubai Studio is something invaluable. Uh, when you're working individually on a product or, uh, you know, it's not just you. So you can ask for others opinions around the studio. You can ask for others inspiration. So it's... when you collaborate with others, even though you're the only one who's working on the project, you get a sense of being part of of something bigger, and you get inspired by others, and that is something invaluable. Uh, even when I'm working on multiple projects at the same time, I get inspired by others' opinions, you know, and I use that. Uh, and I love that about being part of the AIx team. And one big part is the creative directors in our studio is really, really cool. I love how they always give to the rest of the team, how they always inspire others, how they, um, you know, show examples of to work rather than, you know, bossing around people. They're the one who show things, and then we follow them. Those are good leaders.

**Q: You're building Ommelo alongside all that. When did you last work on it, and what was that evening actually like?**

I love working on Omelo because this is something I had thought of because I was working on, uh, one of the client's projects, and there was not enough time for reviewing all the work that the team had done. I was always engaging with the clients, and it was also very difficult to convince these clients of the decisions that I was making. Uh, so having a back back to research and a decision making tool that would help decide me, which is, you know, a better route. was something I, you know, would would have helped me a lot. That is how came in. And the last week I worked on was, you know, to enhance the rule sections of the tool. How the insights are drawn is something I'm still figuring out. How the, you know, it it should bring out the best insights and useful insights for anybody who is using the tool. So that's why I'm I'm making sure I'm spending enough time to bring out the best, uh, of. And it is very fun to actually work on it. I'm also learning a lot of stuff about how to use AI and a lot of things. I'm also experimenting how to market things. So it is it is something good learning for me, but also it is, uh, something I think would solve a lot of people's problems.

_Round 2 ends here._

## Round 3 — WHAT I NOTICE

**Q: What do you see in this work that the designers around you seem to miss?**

I think the designers are rushed to finish certain things, and they're not given enough time, um, to review or, uh, to to try out multiple versions to test their designs with actual users. And I've see... I thought it was just me, but the thing is it's almost in every place that designers are not given enough time to actually test with users. So the designers are missing that opportunity, and even, you know, so the new designers are also thinking maybe that's not needed at all. Uh, they look at inspirations and they build it, but the actual user experience is not fulfilled at the end of the day when it is passed to the development.

**Q: When did you last see that happen? What was the project, and what got skipped?**

The client project I mentioned earlier, we did not get the opportunity to test the product with, uh, any users at all. Even though we were implementing something, you know, really different experience than, uh, what was implemented before, this was a big gap, uh, that should have been filled. Um, you know, we would have made better decisions if the testing was done properly, and it would have been much easier if users were involved from the beginning. The thing is, uh, we did, um, you know, testing and interviewing certain users in the beginning, but as a product was developed, there was no enough time to, like, test the new ideas with them. and the business had different idea of when and when not to test it. So, uh, we did not, uh, get the opportunity for that.

**Q: What is something everyone in design says that you think is wrong?**

AI is going to replace design. I think that is wrong. Um, I feel like AI is going to enable and, um, bring out the strategic part of the designer's roles rather than design being simplified with, uh, you know, a lot of AI tools. It it will improve the strategic thinking of designers. They get more opportunity to think what to build and what not to build. So that is where the strength of designers can come in.

**Q: Where have you seen that in your own work? What has AI actually changed in how you work?**

AI has changed how we work. Before, we were just building everything in Figma, and there was a lot of animation tools like, uh, rave, um, those prototype. There was a lot of other AI... not AI. Sorry. Just animation tools which we used, uh, and a lot of Adobe tools as well. All these things have changed because now there is AI generation. Um, those tools have been replaced by Claude Claude code. Klodex, uh, IBM's Bob internal one. And there is other Oma AI, um, which also generates three d models. So there is a lot of AI generation tools replaced the work. Uh, the other tools that we were using before. Some designers are afraid of it. Uh, some designers think it will reduce their creativity, but I don't feel like that. I think it it shown... it has shown that there is no limit for what designers can create. It need not be just you know, bounded by Figma's capabilities.

**Q: What question do you get asked most often?**

_(Answered the other direction, as what he asks other people. Kept as given.)_

I would ask, what are the new trending things in design field? Um, what are you working on? So if I'm if I'm interacting with a person, I I... I'm interested in what they're doing, how they're doing it, um, what differentiates... you know, I'm trying to pick up things that, um, other people are doing differently.

**Q: I meant it the other way round. What do people come to you and ask?**

People come often to me to review their products or even ask my opinion on, um, what are the other features that, you know, users might need. Uh, any ideas to improve the products? or even some people ask me, like, you know, certain technical things. What is your, uh, tech stack? All these things. How are you working?

**Q: What is the obvious thing nobody in design is doing?**

DLS. That is the the worst thing I see in certain teams. They underestimate design language system, having a design language setup even before starting a project. They think DLS is something, um, you know, they need to hand over to the client who was the end, and they they work without any DLS upfront. And, um, at the end of the project, they just replay stuff, which is, like, a hell a lot of work, which is the worst. I hate that. So in any of the projects I'm working, I always, always try to sell the DLS front and then start on the design. And I always insisted designers to use a DLS correctly and not just break stuff and recreates things.

_Round 3 ends here._

## Round 4 — HOW I TALK

**Q: Tell me a story you've told at least five times. Tell it the way you'd tell it out loud.**

_(Personal and family material. Captured for voice mechanics only. Not publishable: family is off limits under data/rules.md.)_

So this is a story I've always told my friends about. I always, uh, I'm afraid of blood. Uh, so if I see a blood, I, um, you know, I I I get a heavy head, and I would fall down. So I... one day, I was going for... in my college, I was in college, and I was going for my max exam. It was morning, and I was taking out my Activa, my two liter. and I I had already seen that the stand of the activa was open, which I didn't mind, uh, but I was standing outside and turning the activa myself with a stand open, which incidentally hit one of my toes, which impacted one of my knees. It... the nail came off. I saw the blood. I knew I was going to faint. So I I went down to my home, and I laid on bed because I know I'm gonna faint now. Uh, I laid there for, like, five, ten minutes, and then I was okay, but I still... then I woke up, and I saw my toe and the needle was tilted. I... it was not placed correctly in my... one of the toes. My mom came in and she wrapped a small, uh, cloth around it and asked me to, like, go write the exam. Uh, so I anyway went to the exam. I was dropped off by my mom, and after the exam was done, I called my dad so he would pick me up from college. So he came in. He was... he came in on one of his, um, Royal Enfield bullets. So I love writing that bullet. I I love that bullet. Anyway, I sat behind him, and we were traveling. And he asked me what happened, all these things. I told, okay. My toe is slightly tilted. And he started scaring me incidentally. He started telling me stuff that I would be afraid. Like, oh, this is something doctor cannot fix. This, you know, doctor will have to pull the nail out. It was already tilted. There is nothing you can do. They won't give you any anesthetics. And I... after I hearing him, I was so much afraid, and I fainted of the bike. And I fell on the road, and they... my dad saw me, like, fell, and he stopped the vehicle, the bike, and then he came, picked me up. I couldn't actually stand up. I was still I was still on the road. And he... this is a place where, you know, my my dad knows everyone, and everyone knows my dad. So one of the cars passed by, and it was his friend. and he took me to hospital. So I was late in the back seat of the car, and we went to the hospital, and the doctor was laughing at me. Like, I was some kind of a child. I was already in college, and I was, like, twenty years old, fainted off her blood. So that's how afraid I'm of blood.

**Q: Open WhatsApp. The last three messages you sent a friend, copied exactly, typos and all.**

Sure let me know, we can meet another day

Hmm, apply and if you see any other role i can refer you

Pls check your email

_Note for the voice files: these are the only samples of Alif's actual WRITING captured so far, as against his speech. All three are one line. No terminal full stop. Lowercase "i" as the first person pronoun in the second. "Pls" contracted. "Hmm," as an opener. The contrast with his spoken answers above is extreme, and confirms the rule that his written sentences run far shorter than his spoken ones._
