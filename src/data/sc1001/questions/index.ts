import type { ScDraft, ScTopicId } from "@/lib/sc1001/types";
import { ctBasics } from "./ct-basics";
import { flowchartPseudo } from "./flowchart-pseudo";
import { typesVarsIo } from "./types-vars-io";
import { booleanSelection } from "./boolean-selection";
import { moreSelection } from "./more-selection";
import { repetition } from "./repetition";
import { strings } from "./strings";
import { composite } from "./composite";
import { functions } from "./functions";
import { decompositionPatterns } from "./decomposition-patterns";
import { recursion } from "./recursion";
import { complexity } from "./complexity";
import { searchSort } from "./search-sort";
import { exceptions } from "./exceptions";

export const QUESTIONS_BY_TOPIC: Record<ScTopicId, ScDraft[]> = {
  "ct-basics": ctBasics,
  "flowchart-pseudo": flowchartPseudo,
  "types-vars-io": typesVarsIo,
  "boolean-selection": booleanSelection,
  "more-selection": moreSelection,
  "repetition": repetition,
  "strings": strings,
  "composite": composite,
  "functions": functions,
  "decomposition-patterns": decompositionPatterns,
  "recursion": recursion,
  "complexity": complexity,
  "search-sort": searchSort,
  "exceptions": exceptions,
};
