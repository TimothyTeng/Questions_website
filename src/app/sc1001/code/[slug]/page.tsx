import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProblems, problemBySlug } from "@/lib/sc1001/bank";
import { CodingWorkspace } from "@/components/sc1001/CodingWorkspace";

// Every problem is pre-rendered from generateStaticParams, so reading params up front is fine.
export const instant = false;

export function generateStaticParams() {
  return getProblems().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/sc1001/code/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  return { title: `${problemBySlug(slug)?.title ?? "Problem"} · SC1001 Coding` };
}

export default async function ProblemPage(props: PageProps<"/sc1001/code/[slug]">) {
  const { slug } = await props.params;
  const problem = problemBySlug(slug);
  if (!problem) notFound();
  return <CodingWorkspace key={problem.slug} problem={problem} />;
}
