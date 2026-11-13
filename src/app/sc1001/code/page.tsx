import type { Metadata } from "next";
import { ProblemList } from "./ProblemList";

export const metadata: Metadata = { title: "Coding · SC1001 Prep" };

export default function CodePage() {
  return <ProblemList />;
}
