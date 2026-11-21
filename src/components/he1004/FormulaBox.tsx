"use client";

import { useState } from "react";
import { Rich, Tex } from "@/components/Rich";
import type { Formula } from "@/lib/he1004/types";

/** A formula card; in "Hide formulas" mode the expression stays blurred until clicked. */
export function FormulaBox({ f }: { f: Formula }) {
  const [shown, setShown] = useState(false);
  return (
    <div className="formula">
      <div className="f-name">{f.name}</div>
      <div className={`f-expr ${shown ? "shown" : ""}`} onClick={() => setShown((s) => !s)}>
        <Tex tex={f.tex} display />
      </div>
      {f.note && <Rich className="f-note" text={f.note} />}
    </div>
  );
}
