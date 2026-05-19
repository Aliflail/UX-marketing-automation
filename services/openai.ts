import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { logger } from "./logger.js";

type JsonValue = Record<string, unknown> | unknown[];

export interface JsonGenerationOptions {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  provider?: "openai" | "anthropic";
}

function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is required.");
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
}

function getAnthropicClient(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is required when provider is anthropic.");
  }

  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

async function retry<T>(label: string, operation: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      logger.warn(`${label} failed, retrying`, { attempt, attempts });
      await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
  }

  throw lastError;
}

function parseJsonResponse(content: string): JsonValue {
  const cleaned = content
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  return JSON.parse(cleaned) as JsonValue;
}

export async function generateJson(options: JsonGenerationOptions): Promise<JsonValue> {
  const provider = options.provider ?? "openai";

  if (provider === "anthropic") {
    const anthropic = getAnthropicClient();

    return retry("Anthropic JSON generation", async () => {
      const response = await anthropic.messages.create({
        model: process.env.ANTHROPIC_MODEL ?? "claude-3-5-sonnet-latest",
        max_tokens: 6000,
        temperature: options.temperature ?? 0.4,
        system: options.systemPrompt,
        messages: [{ role: "user", content: options.userPrompt }]
      });

      const text = response.content
        .filter((block) => block.type === "text")
        .map((block) => block.text)
        .join("\n");

      return parseJsonResponse(text);
    });
  }

  const openai = getOpenAIClient();

  return retry("OpenAI JSON generation", async () => {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o",
      temperature: options.temperature ?? 0.4,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: options.systemPrompt },
        { role: "user", content: options.userPrompt }
      ]
    });

    const content = response.choices[0]?.message.content;

    if (!content) {
      throw new Error("OpenAI returned an empty response.");
    }

    return parseJsonResponse(content);
  });
}
