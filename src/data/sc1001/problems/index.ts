import type { CodingProblem } from "@/lib/sc1001/types";
import { basicsProblems } from "./basics";
import { stringsProblems } from "./strings";
import { listsProblems } from "./lists";
import { dictsSetsProblems } from "./dicts-sets";
import { mathProblems } from "./math";
import { recursionProblems } from "./recursion";
import { searchSortProblems } from "./search-sort";
import { matricesProblems } from "./matrices";

export const PROBLEMS: CodingProblem[] = [
  ...basicsProblems,
  ...stringsProblems,
  ...listsProblems,
  ...dictsSetsProblems,
  ...mathProblems,
  ...recursionProblems,
  ...searchSortProblems,
  ...matricesProblems,
];
