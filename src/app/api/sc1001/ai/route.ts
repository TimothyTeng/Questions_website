import { AiError, codeHint, gradeOpen, listModels, questionHint, reviewCode } from "@/lib/sc1001/ai-server";

// POST { action, ...fields } → JSON. One endpoint for every SC1001 AI feature; see lib/sc1001/ai-server.ts.
const ACTIONS: Record<string, (body: Record<string, unknown>) => Promise<unknown>> = {
  models: async () => ({ models: await listModels() }),
  questionHint,
  codeHint,
  gradeOpen,
  reviewCode,
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const action = body && typeof body.action === "string" ? ACTIONS[body.action] : undefined;
  if (!body || !action) return Response.json({ error: "Unknown action." }, { status: 400 });
  try {
    return Response.json(await action(body));
  } catch (e) {
    const status = e instanceof AiError ? e.status : 500;
    return Response.json({ error: e instanceof Error ? e.message : "AI request failed." }, { status });
  }
}
