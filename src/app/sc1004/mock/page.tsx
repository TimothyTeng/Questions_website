import type { Metadata } from "next";
import { Mock } from "./Mock";

export const metadata: Metadata = { title: "Mock final · SC1004 Prep" };

export default function MockPage() {
  return <Mock />;
}
