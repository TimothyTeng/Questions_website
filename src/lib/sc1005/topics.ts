import type { TopicId } from "./types";

export interface TopicMeta {
  id: TopicId;
  /** Chapter number, 1–13. */
  ch: number;
  name: string;
  /** 1 = digital logic fundamentals (Ch 1–6), 2 = building blocks, Verilog & sequential logic (Ch 7–13). */
  part: 1 | 2;
  blurb: string;
  color: string;
}

export const TOPICS: TopicMeta[] = [
  { id: "intro", ch: 1, part: 1, name: "Introduction to Digital Systems", blurb: "Analog vs digital, logic levels, digital waveforms, bits & ranges, serial vs parallel, ICs and PLDs", color: "#4b5bdc" },
  { id: "number-codes", ch: 2, part: 1, name: "Number Systems & Codes", blurb: "Binary, octal, hex and fraction conversions, BCD, Gray code, ASCII, parity", color: "#0f9488" },
  { id: "boolean", ch: 3, part: 1, name: "Logic Gates & Boolean Algebra", blurb: "Gates and truth tables, timing, Boolean theorems, De Morgan, NAND/NOR-only, XOR parity", color: "#c2410c" },
  { id: "arithmetic", ch: 4, part: 1, name: "Digital Arithmetic", blurb: "Adders, 2's complement, sign extension, overflow, add/subtract circuit, multiplication, BCD addition", color: "#9333ea" },
  { id: "kmaps", ch: 5, part: 1, name: "Combinational Logic & K-maps", blurb: "Minterms & maxterms, canonical SOP/POS, K-map minimisation, don't cares, active-low signals", color: "#be185d" },
  { id: "ic-tech", ch: 6, part: 1, name: "Digital ICs, PLAs & Floating Point", blurb: "TTL & CMOS, noise margins, fan-out, power, tri-state, open drain, Schmitt triggers, PLAs, fixed & floating point", color: "#2563eb" },
  { id: "comb-blocks", ch: 7, part: 2, name: "Combinational Building Blocks", blurb: "Multiplexers, decoders, encoders, comparators, adders as blocks, building functions from MUXes", color: "#059669" },
  { id: "verilog-comb", ch: 8, part: 2, name: "Verilog for Combinational Circuits", blurb: "Modules, ports, wires & vectors, literals, operators, assign, gate primitives, always @*, if/case, instantiation", color: "#d97706" },
  { id: "sequential", ch: 9, part: 2, name: "Sequential Circuits", blurb: "SR/D latches, D/JK/T flip-flops, timing, registers, shift registers, counters", color: "#7c3aed" },
  { id: "seq-verilog", ch: 10, part: 2, name: "Sequential Circuits in Verilog", blurb: "always @(posedge clk), non-blocking assignment, resets, enables, registers, counters, pipelines", color: "#db2777" },
  { id: "fsm", ch: 11, part: 2, name: "Finite State Machines", blurb: "Moore vs Mealy, state diagrams & tables, state encoding, next-state logic, analysing FSM circuits", color: "#0891b2" },
  { id: "fsm-verilog", ch: 12, part: 2, name: "FSMs in Verilog", blurb: "State registers, next-state & output blocks, localparam encodings, sequence detectors, tracing FSM code", color: "#65a30d" },
  { id: "verilog-recap", ch: 13, part: 2, name: "Verilog Recap & Synthesis Pitfalls", blurb: "reg vs wire, blocking vs non-blocking, latches from incomplete ifs, sensitivity lists, parameters, generate, testbenches", color: "#dc2626" },
];

export const PARTS = [
  { part: 1 as const, name: "Part 1 · Digital logic fundamentals", note: "Ch 1–6" },
  { part: 2 as const, name: "Part 2 · Building blocks, Verilog & sequential logic", note: "Ch 7–13" },
];

export const topicById = (id: TopicId) => TOPICS.find((t) => t.id === id)!;
