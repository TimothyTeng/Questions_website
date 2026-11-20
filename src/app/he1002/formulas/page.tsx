import type { Metadata } from "next";
import { FormulaBank } from "./FormulaBank";

export const metadata: Metadata = { title: "Formula bank · HE1002 Prep" };

export default function He1002FormulasPage() {
  return <FormulaBank />;
}
