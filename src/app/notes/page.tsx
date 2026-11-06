import type { Metadata } from "next";
import { Notes } from "./Notes";

export const metadata: Metadata = { title: "Notes · LA CA2 Mastery" };

export default function NotesPage() {
  return <Notes />;
}
