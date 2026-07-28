import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { coachSystem, assessorSystem } from "@/lib/onramp/prompts";

// Server-only proxy to the Anthropic Messages API. ANTHROPIC_API_KEY never
// reaches the browser. The request is a discriminated union rather than a
// generic { system, userText } passthrough so the assessment rubric
// (lib/onramp/prompts.ts assessorSystem) is built entirely server-side and
// never visible in the client's network tab — exposing it would let a user
// answer "to the rubric" instead of demonstrating real judgment (PRD §5.1).
// Gated behind a real Supabase session so an anonymous visitor to the public
// landing page can't rack up billed API calls by hitting this endpoint
// directly.

const requestSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("coach"),
    name: z.string().max(200),
    roleLabel: z.string().min(1).max(200),
    task: z.string().min(1).max(4000),
  }),
  z.object({
    kind: z.literal("assess"),
    role: z.enum(["finance", "sales", "ops"]),
    answer: z.string().min(1).max(4000),
  }),
]);

const CLAUDE_MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

async function callClaude(system: string, userText: string, maxTokens: number) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content: userText }],
    }),
  });

  if (!res.ok) {
    let message = `Request failed (${res.status}).`;
    try {
      const err = await res.json();
      if (err?.error?.message) message = err.error.message;
    } catch {
      // keep default message
    }
    throw new Error(message);
  }

  const data = await res.json();
  return (data.content ?? [])
    .filter((block: { type: string }) => block.type === "text")
    .map((block: { text: string }) => block.text)
    .join("\n")
    .trim();
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      {
        error:
          "ANTHROPIC_API_KEY isn't configured on the server yet — add it to web/.env.local to enable live grading.",
      },
      { status: 503 }
    );
  }

  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    if (parsed.data.kind === "coach") {
      const { name, roleLabel, task } = parsed.data;
      const text = await callClaude(coachSystem(name, roleLabel), task, 1500);
      return NextResponse.json({ text });
    }

    const { role, answer } = parsed.data;
    const text = await callClaude(
      assessorSystem(role),
      "Here is my submission:\n\n" + answer,
      1200
    );
    return NextResponse.json({ text });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
