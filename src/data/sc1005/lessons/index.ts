import type { Lesson } from "@/lib/sc1005/types";
import { introLesson } from "./intro";
import { numberCodesLesson } from "./number-codes";
import { booleanLesson } from "./boolean";
import { arithmeticLesson } from "./arithmetic";
import { kmapsLesson } from "./kmaps";
import { icTechLesson } from "./ic-tech";
import { combBlocksLesson } from "./comb-blocks";
import { verilogCombLesson } from "./verilog-comb";
import { sequentialLesson } from "./sequential";
import { seqVerilogLesson } from "./seq-verilog";
import { fsmLesson } from "./fsm";
import { fsmVerilogLesson } from "./fsm-verilog";
import { verilogRecapLesson } from "./verilog-recap";

export const LESSONS: Lesson[] = [
  introLesson,
  numberCodesLesson,
  booleanLesson,
  arithmeticLesson,
  kmapsLesson,
  icTechLesson,
  combBlocksLesson,
  verilogCombLesson,
  sequentialLesson,
  seqVerilogLesson,
  fsmLesson,
  fsmVerilogLesson,
  verilogRecapLesson,
];
