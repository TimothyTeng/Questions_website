import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lessons } from "@/data/lessons";
import { TOPICS } from "@/lib/topics";
import { LessonView } from "./LessonView";

// Every lesson is pre-rendered from generateStaticParams, so reading params up front is fine.
export const instant = false;

export function generateStaticParams() {
  return TOPICS.map((t) => ({ topic: t.id }));
}

export async function generateMetadata(props: PageProps<"/learn/[topic]">): Promise<Metadata> {
  const { topic } = await props.params;
  const t = TOPICS.find((x) => x.id === topic);
  return { title: t ? `${t.name} · Learn` : "Learn" };
}

export default async function LessonPage(props: PageProps<"/learn/[topic]">) {
  const { topic } = await props.params;
  const meta = TOPICS.find((x) => x.id === topic);
  const lesson = lessons.find((l) => l.topic === topic);
  if (!meta || !lesson) notFound();
  return <LessonView lesson={lesson} />;
}
