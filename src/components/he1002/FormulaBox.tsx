"use client";

import { useState } from "react";
import type { Formula } from "@/lib/he1002/types";

/** A formula card; in "Hide formulas" mode the expression stays blurred until clicked. */
export function FormulaBox({ f }: { f: Formula }) {
  const [shown, setShown] = useState(false);
  return (
    <div className="formula">
      <div className="f-name">{f.name}</div>
      <div className={`f-expr ${shown ? "shown" : ""}`} onClick={() => setShown((s) => !s)}>
        {f.expr}
      </div>
      {f.note && <div className="f-note">{f.note}</div>}
    </div>
  );
}
