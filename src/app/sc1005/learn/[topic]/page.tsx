import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LESSONS } from "@/data/sc1005/lessons";
import { TOPICS } from "@/lib/sc1005/topics";
import { LessonView } from "./LessonView";

// Every lesson is pre-rendered from generateStaticParams, so reading params up front is fine.
export const instant = false;

export function generateStaticParams() {
  return TOPICS.map((t) => ({ topic: t.id }));
}

export async function generateMetadata(props: PageProps<"/sc1005/learn/[topic]">): Promise<Metadata> {
  const { topic } = await props.params;
  const t = TOPICS.find((x) => x.id === topic);
  return { title: t ? `${t.name} · SC1005 Learn` : "Learn · SC1005" };
}

export default async function Sc1005LessonPage(props: PageProps<"/sc1005/learn/[topic]">) {
  const { topic } = await props.params;
  const meta = TOPICS.find((x) => x.id === topic);
  const lesson = LESSONS.find((l) => l.topic === topic);
  if (!meta || !lesson) notFound();
  return <LessonView lesson={lesson} />;
}
