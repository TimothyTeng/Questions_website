import type { ExamSection, TopicId } from "./types";

export interface TopicMeta {
  id: TopicId;
  /** Lecture number, 1–12. */
  n: number;
  name: string;
  /** 1 = the long run (L1–7), 2 = short-run fluctuations (L8–10), 3 = the open economy (L11–12). */
  part: 1 | 2 | 3;
  blurb: string;
  color: string;
}

export const TOPICS: TopicMeta[] = [
  { id: "gdp", n: 1, part: 1, name: "Measuring a Nation's Income", blurb: "GDP and the circular flow, what GDP counts, value added, C + I + G + NX, nominal vs real GDP, the GDP deflator, growth rates and CAGR, GNP/NNP/national, personal and disposable income, GDP and well-being", color: "#4b5bdc" },
  { id: "cpi", n: 2, part: 1, name: "Measuring the Cost of Living", blurb: "Computing the CPI and inflation, core CPI and PPI, the three CPI biases, CPI vs GDP deflator, converting dollars across years, indexation, real vs nominal interest rates, who gains from unexpected inflation", color: "#0f9488" },
  { id: "unemployment", n: 3, part: 1, name: "Unemployment", blurb: "Employed, unemployed, not in the labour force; u-rate, LFPR and employment-population ratio; limits of the u-rate; natural vs cyclical; frictional vs structural; job search and UI; minimum wages, unions, efficiency wages", color: "#c2410c" },
  { id: "growth", n: 4, part: 1, name: "Production and Growth", blurb: "Living standards across countries and time, productivity and its four determinants (K/L, H/L, N/L, A), the production function, diminishing returns, catch-up effect, growth policies, population growth", color: "#9333ea" },
  { id: "saving", n: 5, part: 1, name: "Saving, Investment & the Financial System", blurb: "Financial markets (bonds and their characteristics, stocks) and intermediaries (banks, mutual funds), saving and investment identities, private vs public saving, the loanable funds market, saving/investment incentives and budget deficits", color: "#be185d" },
  { id: "money", n: 6, part: 1, name: "The Monetary System", blurb: "Functions and kinds of money, M2, the Fed, bank T-accounts and reserve ratios, money creation and the money multiplier, bank capital and leverage, the federal funds rate, OMOs, discount lending, reserve requirements, interest on reserves", color: "#2563eb" },
  { id: "inflation", n: 7, part: 1, name: "Money Growth and Inflation", blurb: "Value of money (1/P), the money supply–demand diagram, quantity theory, classical dichotomy and monetary neutrality, the quantity equation and velocity, the inflation tax, the Fisher effect, the inflation fallacy, the costs of inflation", color: "#059669" },
  { id: "adas", n: 8, part: 2, name: "Aggregate Demand & Aggregate Supply", blurb: "Three facts about fluctuations, why AD slopes down (wealth, interest-rate, exchange-rate effects) and what shifts it, LRAS and natural output, SRAS and its three theories, AD and SRAS shocks, stagflation and accommodation", color: "#d97706" },
  { id: "policy", n: 9, part: 2, name: "Monetary & Fiscal Policy and AD", blurb: "Liquidity preference and the money market, the interest-rate effect, monetary policy and rate targets, the zero lower bound (forward guidance, QE), the multiplier and crowding-out effects, tax changes, the stabilisation debate, automatic stabilisers", color: "#7c3aed" },
  { id: "keynesian", n: 10, part: 2, name: "The Keynesian Cross", blurb: "Planned vs actual expenditure and inventories, the consumption and planned-expenditure functions, equilibrium Y = PE and the recessionary gap, government-purchases and tax multipliers, the paradox of thrift, deriving AD", color: "#db2777" },
  { id: "open-basics", n: 11, part: 3, name: "Open-Economy Macro: Basic Concepts", blurb: "Open vs closed economies, exports, imports and net exports, factors affecting NX, net capital outflow (FDI vs FPI), NX = NCO, S = I + NCO, nominal and real exchange rates, appreciation/depreciation, purchasing-power parity and its limits", color: "#0891b2" },
  { id: "open-theory", n: 12, part: 3, name: "A Macro Theory of the Open Economy", blurb: "Loanable funds with S = I + NCO, how NCO depends on r, the market for foreign-currency exchange, budget deficits and twin deficits, trade policy (tariffs, import quotas), capital flight", color: "#65a30d" },
];

export const PARTS = [
  { part: 1 as const, name: "The economy in the long run", note: "Lectures 1–7" },
  { part: 2 as const, name: "Short-run fluctuations", note: "Lectures 8–10" },
  { part: 3 as const, name: "The open economy", note: "Lectures 11–12" },
];

export const topicById = (id: TopicId) => TOPICS.find((t) => t.id === id)!;

export const SECTIONS: { s: ExamSection; q: number; name: string; short: string; perQ: number; count: number; note: string }[] = [
  { s: "calc", q: 1, name: "Calculation", short: "Calc", perQ: 3, count: 13, note: "State the formula used and show your working." },
  { s: "short", q: 2, name: "Short answer", short: "Short", perQ: 3, count: 9, note: "Around 5–6 lines (3–4 sentences)." },
  { s: "tf", q: 3, name: "True or false", short: "T/F", perQ: 3, count: 8, note: "Say true or false and clearly explain your reasoning in 3–4 sentences." },
  { s: "diagram", q: 4, name: "Diagram question", short: "Diagram", perQ: 10, count: 1, note: "Two parts, 5 marks each. Draw clearly labelled diagrams." },
];

export const sectionMeta = (s: ExamSection) => SECTIONS.find((x) => x.s === s)!;
