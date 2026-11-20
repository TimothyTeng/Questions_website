import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DATA } from "@/data/hp1000";
import { TOPICS } from "@/lib/hp1000/topics";
import { Notes } from "./Notes";

// Every topic is pre-rendered from generateStaticParams, so reading params up front is fine.
export const instant = false;

export function generateStaticParams() {
  return TOPICS.map((t) => ({ topic: t.id }));
}

export async function generateMetadata(props: PageProps<"/hp1000/learn/[topic]">): Promise<Metadata> {
  const { topic } = await props.params;
  const t = TOPICS.find((x) => x.id === topic);
  return { title: t ? `${t.name} · HP1000 Learn` : "Learn · HP1000" };
}

export default async function Hp1000TopicPage(props: PageProps<"/hp1000/learn/[topic]">) {
  const { topic } = await props.params;
  const meta = TOPICS.find((x) => x.id === topic);
  const data = DATA.find((d) => d.id === topic);
  if (!meta || !data) notFound();
  return <Notes topic={meta.id} />;
}
