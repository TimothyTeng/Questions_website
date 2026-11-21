import type { Metadata } from "next";
import { FormulaBank } from "./FormulaBank";

export const metadata: Metadata = { title: "Formula bank · HE1004 Prep" };

export default function He1004FormulasPage() {
  return <FormulaBank />;
}
