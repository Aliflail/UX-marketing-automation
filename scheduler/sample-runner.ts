import "dotenv/config";
import { logger } from "../services/logger.js";
import { writeJsonFile } from "../utils/file.js";
import { getContentOutputPath, getWeekDate } from "../utils/date.js";
import type { WeeklyResearch } from "../agents/research-agent.js";
import type { WeeklyContent } from "../agents/writer-agent.js";
import type { EmailDigest } from "../agents/email-agent.js";

async function runSampleWorkflow(date = getWeekDate()): Promise<void> {
  logger.info("Sample workflow started", { date });

  const research: WeeklyResearch = {
    week: date,
    pain_points: [
      "Designers are frustrated by audit findings that sound correct but are too generic to influence product teams. Source context: r/UXDesign discussions around critique quality.",
      "Stakeholders keep asking for benchmark scores while ignoring the specific moments where users lose trust. Source context: LinkedIn design leadership posts.",
      "Teams using AI design tools are getting faster at generating screens but slower at deciding what should exist. Source context: product design conversations on X.",
      "Design-to-dev handoff still breaks around empty states, validation, and loading behavior. Source context: r/webdev threads about Figma handoff gaps.",
      "UX audit decks often become theatre when they do not connect issues to revenue, support load, or task completion. Source context: enterprise UX posts on LinkedIn."
    ],
    trending_topics: [
      "AI-assisted UX audits moving from checklist output to decision support",
      "Figma Make and AI prototyping raising expectations for interaction detail",
      "Product teams asking designers to prove quality with clearer operational signals"
    ],
    ux_crime_candidate:
      "The apologetic error modal: a full-screen interruption that says something went wrong but gives no recovery path, no plain reason, and no next best action.",
    hot_take_angles: [
      "Most UX audits fail because they are written for designers, not for the people who fund the backlog.",
      "AI will not replace UX judgment. It will expose which teams never had a clear UX standard in the first place.",
      "A beautiful design system can still produce a bad product if the flows are stitched together without intent."
    ],
    content_angles: [
      "Pain: Why audit findings get ignored when they sound too abstract",
      "Build: What UX Intelligence Engine checks before calling something a UX issue",
      "Opinion: AI design tools make judgment more important, not less",
      "Education: How to turn UX problems into product decisions",
      "Demo: A before-and-after audit of a broken error state"
    ]
  };

  const content: WeeklyContent = {
    week: date,
    theme: "Turning UX audits from polite feedback into product decisions",
    posts: [
      {
        platform: "linkedin",
        post_type: "storytelling",
        scheduled_time: `${date} Tue 08:30`,
        content:
          "A product team once asked for a UX audit and then quietly ignored half the findings.\n\nNot because the findings were wrong. Because they sounded like design language. The deck said things like inconsistency, unclear hierarchy, and cognitive load. All true. None of it helped the team decide what to fix first.\n\nThe better conversation started when the audit moved from taste to consequence: users cannot recover from this error, support will keep getting tickets here, and this step makes the next action feel risky.\n\nThat is the gap UX Intelligence Engine is trying to close. Not replacing designer judgment. Making the first pass sharper, more specific, and easier to turn into a backlog conversation.\n\nA UX issue is not just something that looks off. It is something that changes user behavior in the wrong direction.\n\nThat distinction matters more than most teams admit."
      },
      {
        platform: "linkedin",
        post_type: "opinion",
        scheduled_time: `${date} Thu 08:45`,
        content:
          "AI design tools are making screens cheaper.\n\nThat does not make product judgment cheaper.\n\nIf anything, it makes judgment more visible. Anyone can generate five polished layouts now. Fewer people can explain which one reduces risk, improves comprehension, or helps a user recover when the happy path breaks.\n\nIn enterprise UX work, the difficult part is rarely making another screen. It is aligning the screen with messy constraints: legal, brand, dev effort, business targets, accessibility, stakeholder memory, and the tiny emotional moments where users decide whether they trust the product.\n\nThat is why I am more interested in AI as a reviewer than as a magic designer. A good reviewer asks better questions. It catches the boring but expensive problems. It helps the human designer spend more time on decisions and less time hunting for obvious misses.\n\nThe future is not AI making designers irrelevant.\n\nIt is designers being expected to have much clearer standards."
      },
      {
        platform: "linkedin",
        post_type: "education",
        scheduled_time: `${date} Tue 08:15`,
        content:
          "A useful UX audit finding has three parts.\n\nFirst, the moment. Where exactly does the user hesitate, misunderstand, abandon, or lose confidence?\n\nSecond, the consequence. What does this create for the product team? More support tickets, lower completion, weaker trust, avoidable dev churn, slower onboarding?\n\nThird, the decision. What should the team do next, and how urgent is it compared with everything else already on fire?\n\nWithout those three parts, audit findings drift into commentary. Correct commentary, maybe, but still commentary.\n\nThis is one of the principles behind UX Intelligence Engine. The goal is not to produce longer reports. Nobody needs another PDF quietly aging in a folder.\n\nThe goal is to turn interface problems into product decisions faster.\n\nThat is where UX work starts to earn attention outside the design team."
      },
      {
        platform: "instagram",
        post_type: "carousel",
        scheduled_time: `${date} Tue 12:00`,
        content: [
          "Slide 1: Your UX audit is probably too polite.",
          "Slide 2: 'Improve hierarchy' sounds smart. It also sounds easy to ignore.",
          "Slide 3: Say what breaks instead. Users miss the primary action after reviewing pricing.",
          "Slide 4: Connect it to the product. More hesitation, more support, less trust.",
          "Slide 5: Give the team a decision, not a vibe.",
          "Slide 6: UX Intelligence Engine helps turn findings into clearer product calls."
        ]
      },
      {
        platform: "instagram",
        post_type: "carousel",
        scheduled_time: `${date} Wed 12:30`,
        content: [
          "Slide 1: AI made the screen. Who checked the thinking?",
          "Slide 2: Fast UI is not the same as useful UI.",
          "Slide 3: Pretty flows can still hide dead ends.",
          "Slide 4: Error states, empty states, and handoff details still matter.",
          "Slide 5: Judgment is the real design skill.",
          "Slide 6: UX Intelligence Engine reviews the bits teams usually miss."
        ]
      },
      {
        platform: "instagram",
        post_type: "ux_crime_of_the_week",
        scheduled_time: `${date} Thu 11:30`,
        content:
          "UX Crime of the Week: The Apologetic Error Modal\n\nWhat it does wrong: It interrupts the user, says something went wrong, then offers no reason, recovery path, or next best action.\n\nSentenced to: 40 hours of writing helpful microcopy under production pressure."
      },
      {
        platform: "instagram",
        post_type: "demo",
        scheduled_time: `${date} Fri 12:15`,
        content: [
          "Slide 1: Bad error states are trust leaks.",
          "Slide 2: 'Something went wrong' is not guidance.",
          "Slide 3: Tell users what happened.",
          "Slide 4: Tell them what they can do next.",
          "Slide 5: Keep the action close to the problem.",
          "Slide 6: Tiny fixes. Very real product impact."
        ]
      },
      {
        platform: "x",
        post_type: "opinion",
        scheduled_time: `${date} Tue 08:00`,
        content: "Most UX audits do not fail because the findings are wrong. They fail because the findings are too abstract to become decisions."
      },
      {
        platform: "x",
        post_type: "observation",
        scheduled_time: `${date} Tue 18:00`,
        content: "AI makes screens faster. It does not make product judgment optional."
      },
      {
        platform: "x",
        post_type: "education_thread",
        scheduled_time: `${date} Wed 08:00`,
        content: [
          "1. A good UX finding names the moment where the user gets stuck.",
          "2. Then it explains the consequence for the product, not just the interface.",
          "3. Then it gives the team a decision they can actually act on."
        ]
      },
      {
        platform: "x",
        post_type: "hot_take",
        scheduled_time: `${date} Thu 18:00`,
        content: "A design system can make a bad journey look extremely consistent."
      },
      {
        platform: "x",
        post_type: "demo_teaser",
        scheduled_time: `${date} Fri 08:00`,
        content: "This week’s UX crime: the error modal that apologizes beautifully and helps nobody."
      },
      {
        platform: "reddit",
        post_type: "discussion",
        scheduled_time: `${date} Tue 10:30`,
        manual_review_required: true,
        target_community: "r/UXDesign",
        content:
          "Manual review required: How do you frame UX audit findings so product and engineering teams actually act on them? I am especially curious about wording that moves findings from design critique into prioritization."
      },
      {
        platform: "reddit",
        post_type: "discussion",
        scheduled_time: `${date} Thu 11:00`,
        manual_review_required: true,
        target_community: "r/userexperience",
        content:
          "Manual review required: With AI tools generating more interface options, what parts of UX review do you think become more important? My instinct is that error states, flow logic, and decision quality get even more exposed."
      }
    ]
  };

  const digest: EmailDigest = {
    week: date,
    subject: "UX Intelligence Engine weekly content brief",
    weekly_theme: content.theme,
    strongest_predicted_post:
      "LinkedIn opinion post on AI making screens cheaper but product judgment more visible.",
    markdown: `# UX Intelligence Engine Weekly Brief

## Weekly Theme
${content.theme}

## Strongest Predicted Post
LinkedIn opinion post: AI design tools make screens cheaper, but product judgment more visible.

## Platform Notes
LinkedIn carries the strategic thinking. Instagram makes the pain visual and punchy. X gets the sharpest observations. Reddit stays discussion-first and requires manual review.

## Human Notes
Keep the tone grounded. Avoid saying AI audit as a magic promise. The stronger angle is that UX Intelligence Engine helps Alif move faster on the first pass while keeping senior designer judgment in charge.

## Suggested Visual Ideas
- Before and after error modal with recovery action
- Audit finding rewritten from vague to product-specific
- Small diagram: moment, consequence, decision
- Screenshot-style carousel with redline annotations

## Posting Schedule
- LinkedIn: Tuesday and Thursday, 8:00 to 9:00 AM
- Instagram: 11:00 AM to 1:00 PM
- X: 8:00 AM and 6:00 PM
- Reddit: 10:00 AM to 12:00 PM, manual review first
`,
    suggested_visual_ideas: [
      "Before and after error modal with recovery action",
      "Audit finding rewritten from vague to product-specific",
      "Small diagram showing moment, consequence, decision"
    ],
    posting_schedule_recommendations: [
      "Post LinkedIn on Tuesday and Thursday between 8:00 and 9:00 AM.",
      "Use Instagram around midday for carousel visibility.",
      "Review Reddit posts manually before publishing."
    ],
    sent: false
  };

  await writeJsonFile("outputs/weekly-research.json", research);
  await writeJsonFile(getContentOutputPath(date), content);
  await writeJsonFile("outputs/final-email.json", digest);

  logger.info("Sample workflow completed", {
    research: "outputs/weekly-research.json",
    content: getContentOutputPath(date),
    email: "outputs/final-email.json"
  });
}

runSampleWorkflow().catch((error) => {
  logger.error("Sample workflow failed", error);
  process.exitCode = 1;
});
