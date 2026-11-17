import type { Draft, TopicId } from "@/lib/sc1005/types";
import { introQuestions } from "./intro";
import { numberCodesQuestions } from "./number-codes";
import { booleanQuestions } from "./boolean";
import { arithmeticQuestions } from "./arithmetic";
import { kmapsQuestions } from "./kmaps";
import { icTechQuestions } from "./ic-tech";
import { combBlocksQuestions } from "./comb-blocks";
import { verilogCombQuestions } from "./verilog-comb";
import { sequentialQuestions } from "./sequential";
import { seqVerilogQuestions } from "./seq-verilog";
import { fsmQuestions } from "./fsm";
import { fsmVerilogQuestions } from "./fsm-verilog";
import { verilogRecapQuestions } from "./verilog-recap";

export const QUESTIONS_BY_TOPIC: Record<TopicId, Draft[]> = {
  intro: introQuestions,
  "number-codes": numberCodesQuestions,
  boolean: booleanQuestions,
  arithmetic: arithmeticQuestions,
  kmaps: kmapsQuestions,
  "ic-tech": icTechQuestions,
  "comb-blocks": combBlocksQuestions,
  "verilog-comb": verilogCombQuestions,
  sequential: sequentialQuestions,
  "seq-verilog": seqVerilogQuestions,
  fsm: fsmQuestions,
  "fsm-verilog": fsmVerilogQuestions,
  "verilog-recap": verilogRecapQuestions,
};
