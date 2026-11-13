import type { Metadata } from "next";
import { Mock } from "./Mock";

export const metadata: Metadata = { title: "Mock test · SC1001 Prep" };

export default function MockPage() {
  return <Mock />;
}
