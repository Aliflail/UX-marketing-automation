import { logger } from "./logger.js";

/**
 * Reads today's Product Hunt launches so ENGAGE can hand Alif five real ones
 * rather than the front page to scroll.
 *
 * Product Hunt's own GraphQL API, with a free developer token. Read-only. It
 * cannot comment, and it cannot vote, which matters on this platform in
 * particular: asking for or automating upvotes violates their rules outright.
 */

const API = "https://api.producthunt.com/v2/api/graphql";

/**
 * Launches worth commenting on are the ones adjacent to Alif's actual work.
 * A generic "congrats" on an unrelated launch is the thing this filter exists
 * to prevent, because it is visible and it is worth nothing.
 */
const RELEVANT = [
  "design",
  "figma",
  "ux",
  "ui",
  "prototyp",
  "handoff",
  "design system",
  "wireframe",
  "user research",
  "usability",
  "qa",
  "accessibility",
  "front-end",
  "frontend"
];

export interface ProductHuntLaunch {
  name: string;
  tagline: string;
  description: string;
  url: string;
  topics: string[];
}

interface GraphQlResponse {
  data?: {
    posts: {
      nodes: Array<{
        name: string;
        tagline: string;
        description: string | null;
        url: string;
        topics: { nodes: Array<{ name: string }> };
      }>;
    };
  };
  errors?: Array<{ message: string }>;
}

export function productHuntConfigured(): boolean {
  return Boolean(process.env.PRODUCTHUNT_TOKEN);
}

function isRelevant(launch: ProductHuntLaunch): boolean {
  const haystack = [launch.name, launch.tagline, launch.description, ...launch.topics]
    .join(" ")
    .toLowerCase();

  return RELEVANT.some((term) => haystack.includes(term));
}

/**
 * Today's launches, filtered to the ones Alif can speak to from a different
 * seat. Returns everything if the filter finds nothing, because a thin day on
 * Product Hunt is better handled by him picking than by returning nothing.
 */
export async function findProductHuntLaunches(): Promise<ProductHuntLaunch[]> {
  const token = process.env.PRODUCTHUNT_TOKEN;

  if (!token) {
    throw new Error(
      "PRODUCTHUNT_TOKEN is required. Create a free developer token at https://www.producthunt.com/v2/oauth/applications."
    );
  }

  const query = `
    query TodaysLaunches {
      posts(order: RANKING, first: 30) {
        nodes {
          name
          tagline
          description
          url
          topics(first: 5) { nodes { name } }
        }
      }
    }
  `;

  const response = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ query })
  });

  if (!response.ok) {
    throw new Error(`Product Hunt request failed (${response.status}): ${await response.text()}`);
  }

  const payload = (await response.json()) as GraphQlResponse;

  if (payload.errors?.length) {
    throw new Error(`Product Hunt returned errors: ${payload.errors.map((e) => e.message).join("; ")}`);
  }

  const launches: ProductHuntLaunch[] = (payload.data?.posts.nodes ?? []).map((node) => ({
    name: node.name,
    tagline: node.tagline,
    description: node.description ?? "",
    url: node.url,
    topics: node.topics.nodes.map((topic) => topic.name)
  }));

  const relevant = launches.filter(isRelevant);

  logger.info("Found Product Hunt launches", { total: launches.length, relevant: relevant.length });

  return relevant.length > 0 ? relevant : launches;
}
