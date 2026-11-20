import { AiError, gradeExam, listModels } from "@/lib/he1002/ai-server";

// POST { action, ...fields } → JSON. HE1002 AI marking; see lib/he1002/ai-server.ts.
const ACTIONS: Record<string, (body: Record<string, unknown>) => Promise<unknown>> = {
  models: async () => ({ models: await listModels() }),
  gradeExam,
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
