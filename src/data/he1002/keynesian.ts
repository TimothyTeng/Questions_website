import type { Graph, TopicData } from "@/lib/he1002/types";

// Lecture 10: The Keynesian Cross (+ Problem Set 10, solved from the lecture).

const KX = "Income, output (Y)";
const KY = "Planned expenditure (PE)";
const L45 = { label: "Y = PE (45°)", pts: [[0, 0], [10, 10]] as [number, number][], tone: 1 as const };

const consumptionFn: Graph = {
  x: "Disposable income (Y − T)",
  y: "Consumption (C)",
  lines: [{ label: "C = a + b(Y − T)", pts: [[0, 2], [9.5, 7.7]] }],
  points: [
    { at: [0, 2], label: "a", yTick: "a" },
    { at: [5, 5], label: "slope = b (MPC)" },
  ],
  caption: "The intercept is autonomous consumption a; the slope is the MPC b: each extra $1 of disposable income raises C by b × $1.",
};

const peShifts: Graph = {
  x: "Income (Y)",
  y: KY,
  lines: [
    { label: "PE₁", pts: [[0, 4.5], [9, 9.9]] },
    { label: "PE₀", pts: [[0, 3], [10, 9]], tone: 3 },
    { label: "PE₂", pts: [[0, 1.5], [10, 7.5]], tone: 2 },
  ],
  arrows: [
    { from: [4, 5.6], to: [4, 6.9] },
    { from: [6, 6.4], to: [6, 5.1] },
  ],
  caption: "PE = (a − bT + IP + G) + bY. A rise in a, IP or G, or a fall in T, shifts PE up (PE₁); the opposite shifts it down (PE₂). The slope b is unchanged.",
};

const kcEq: Graph = {
  x: KX,
  y: KY,
  lines: [
    L45,
    { label: "PE", pts: [[0, 2.5], [10, 8.5]] },
    { label: "Full-employment Y", pts: [[8, 0.5], [8, 9.5]], tone: 2, dashed: true },
  ],
  points: [{ on: ["PE", "Y = PE (45°)"], label: "A", xTick: "Equilibrium Y", yTick: "PE*" }],
  arrows: [{ from: [6.4, 1.2], to: [7.8, 1.2] }],
  caption: "Equilibrium A is where PE crosses the 45° line (Y = PE). Here it lies below full-employment income: the arrow marks the recessionary gap.",
};

const kcAdjust: Graph = {
  x: KX,
  y: KY,
  lines: [L45, { label: "PE", pts: [[0, 2.5], [10, 8.5]] }],
  points: [
    { on: ["PE", "Y = PE (45°)"], label: "E", xTick: "Y*" },
    { at: [8.5, 8.5], label: "Y" },
    { at: [8.5, 7.6], label: "PE < Y", xTick: "Y₂" },
    { at: [4, 4], label: "Y" },
    { at: [4, 4.9], label: "PE > Y", xTick: "Y₁" },
  ],
  arrows: [
    { from: [9, 1], to: [7, 1] },
    { from: [3.5, 1], to: [5.5, 1] },
  ],
  caption: "Above Y*, PE < Y: unsold goods pile up as unplanned inventories, so firms cut production. Below Y*, PE > Y: inventories fall, so firms raise production.",
};

const kcGovt: Graph = {
  x: KX,
  y: KY,
  lines: [
    L45,
    { label: "PE₁", pts: [[0, 2.5], [10, 8.5]], tone: 3 },
    { label: "PE₂", pts: [[0, 3.2], [10, 9.2]] },
  ],
  points: [
    { on: ["PE₁", "Y = PE (45°)"], label: "A", xTick: "Y₁" },
    { on: ["PE₂", "Y = PE (45°)"], label: "B", xTick: "Y₂ (full employment)" },
  ],
  arrows: [{ from: [2, 3.8], to: [2, 4.4] }],
  caption: "A rise in G shifts PE up by ΔG; equilibrium income rises from Y₁ to Y₂ by ΔG × 1 ÷ (1 − MPC), more than ΔG.",
};

const kcThrift: Graph = {
  x: KX,
  y: KY,
  lines: [
    L45,
    { label: "PE₁", pts: [[0, 3.2], [10, 9.2]], tone: 3 },
    { label: "PE₂", pts: [[0, 2.5], [10, 8.5]] },
  ],
  points: [
    { on: ["PE₁", "Y = PE (45°)"], label: "A", xTick: "Y₁" },
    { on: ["PE₂", "Y = PE (45°)"], label: "B", xTick: "Y₂" },
  ],
  arrows: [{ from: [2, 4.4], to: [2, 3.8] }],
  caption: "Households try to save more: a falls, PE shifts down from PE₁ to PE₂, and equilibrium income falls from Y₁ to Y₂. National saving ends unchanged at S = IP.",
};

const mmPriceRise: Graph = {
  title: "1–2. Money market",
  x: "Quantity of money (M)",
  y: "Interest rate (r)",
  lines: [
    { label: "MS", pts: [[5, 0.5], [5, 9.5]], tone: 1 },
    { label: "MD₁", pts: [[1, 9], [9, 1]], tone: 3 },
    { label: "MD₂", pts: [[2.5, 9.5], [9.5, 2.5]] },
  ],
  points: [
    { on: ["MS", "MD₁"], label: "A", yTick: "r₁" },
    { on: ["MS", "MD₂"], label: "B", yTick: "r₂" },
  ],
  arrows: [{ from: [7, 3], to: [8, 4] }],
  caption: "P rises from P₁ to P₂: people want more money for transactions, MD shifts right and r rises from r₁ to r₂.",
};

const kcInvestFall: Graph = {
  title: "3–4. Keynesian cross",
  x: KX,
  y: KY,
  lines: [
    L45,
    { label: "PE₁", pts: [[0, 3.2], [10, 9.2]], tone: 3 },
    { label: "PE₂", pts: [[0, 2.5], [10, 8.5]] },
  ],
  points: [
    { on: ["PE₁", "Y = PE (45°)"], label: "A", xTick: "Y₁" },
    { on: ["PE₂", "Y = PE (45°)"], label: "B", xTick: "Y₂" },
  ],
  arrows: [{ from: [2, 4.4], to: [2, 3.8] }],
  caption: "The higher r makes borrowing for capital projects dearer, so planned investment falls; PE shifts down and equilibrium income falls from Y₁ to Y₂.",
};

const adDerived: Graph = {
  title: "Aggregate demand",
  x: "Income, output (Y)",
  y: "Price level (P)",
  lines: [{ label: "AD", pts: [[1, 9], [9, 1]] }],
  points: [
    { at: [6, 4], label: "A", xTick: "Y₁", yTick: "P₁" },
    { at: [4, 6], label: "B", xTick: "Y₂", yTick: "P₂" },
  ],
  caption: "Plotting each price level against its equilibrium income gives a negative relationship between P and Y: the aggregate-demand curve.",
};

const data: TopicData = {
  id: "keynesian",

  // ------------------------------------------------------------------ content
  sections: [
    {
      title: "The big idea",
      intro: "Why Keynes built a model of self-reinforcing downturns.",
      points: [
        {
          term: "Keynes's main insight",
          text: "Depressed economic activity during economic downturns is self-reinforcing: a decline in spending triggers a vicious cycle.",
          eg: "Households cut spending, so firms sell and produce less, so incomes fall, so households cut spending again.",
        },
        {
          term: "Jumpstart spending",
          text: "The solution to the vicious cycle is to jumpstart spending.",
        },
        {
          term: "Positive feedback loop",
          text: "A system in which a small disturbance in one variable can amplify as it influences related variables: small bad news amplified into big bad news. It also amplifies the effect of government spending through the multiplier effect.",
        },
        {
          term: "Keynesian Cross",
          text: "Provides a mathematical model of the positive feedback loop.",
        },
      ],
    },
    {
      title: "Planned vs actual expenditure",
      points: [
        {
          term: "Planned expenditure (PE)",
          text: "The amount households, firms and the government plan to spend on goods and services. It can differ from actual expenditure.",
        },
        {
          term: "Actual sales lower than expected",
          text: "The stock of inventories rises. This additional inventory investment is unplanned and therefore raises actual expenditure above planned expenditure.",
          eg: "A shop expects to sell 100 shirts but sells 80; the 20 unsold shirts count as unplanned inventory investment.",
        },
        {
          term: "Actual sales higher than expected",
          text: "The stock of inventories falls. This negative unplanned inventory investment reduces actual expenditure below planned expenditure.",
        },
        {
          term: "Unplanned inventory investment",
          text: "The change in inventories that firms did not intend; it is the gap between actual and planned expenditure.",
        },
      ],
      formulas: [
        { name: "Sales below expectations", expr: "Inventories ↑ → unplanned inventory investment > 0 → actual expenditure > PE" },
        { name: "Sales above expectations", expr: "Inventories ↓ → unplanned inventory investment < 0 → actual expenditure < PE" },
      ],
    },
    {
      title: "The basic model",
      points: [
        { term: "Planned expenditure (closed economy)", text: "PE is the sum of consumption, planned investment (IP) and government purchases." },
        { term: "Consumption function", text: "C = a + b(Y − T): consumption depends on disposable income." },
        { term: "Autonomous consumption (a)", text: "The constant term in the consumption function: the part of consumption that does not depend on income." },
        { term: "Marginal propensity to consume (b)", text: "The slope of the consumption function: the fraction of each extra $1 of disposable income that is consumed." },
        { term: "Disposable income (Y − T)", text: "Income minus taxes." },
        { term: "Planned expenditure function", text: "Substituting the consumption function into PE gives PE = a + b(Y − T) + IP + G." },
      ],
      formulas: [
        { name: "Planned expenditure", expr: "PE = C + IP + G" },
        { name: "Consumption function", expr: "C = a + b(Y − T)" },
        { name: "Planned expenditure function", expr: "PE = a + b(Y − T) + IP + G" },
      ],
      diagrams: [consumptionFn],
    },
    {
      title: "The planned expenditure function",
      points: [
        {
          term: "Rearranged PE function",
          text: "PE = a − bT + IP + G + bY. The intercept is (a − bT + IP + G) and the slope is b, the MPC.",
        },
        {
          term: "Upward shift of PE",
          text: "A rise in a, IP or G, or a fall in T, shifts the PE function up (PE₁).",
        },
        {
          term: "Downward shift of PE",
          text: "A fall in a, IP or G, or a rise in T, shifts the PE function down (PE₂).",
        },
      ],
      formulas: [{ name: "PE function (intercept + slope)", expr: "PE = (a − bT + IP + G) + bY" }],
      table: [
        ["Change", "Effect on PE function"],
        ["a ↑ (more autonomous consumption)", "Shifts up"],
        ["IP ↑ (more planned investment)", "Shifts up"],
        ["G ↑", "Shifts up"],
        ["T ↓", "Shifts up (by b × ΔT)"],
        ["a ↓, IP ↓, G ↓ or T ↑", "Shifts down"],
      ],
      diagrams: [peShifts],
    },
    {
      title: "Equilibrium: Y = PE",
      points: [
        {
          term: "Equilibrium condition",
          text: "The economy is in equilibrium when income (output) equals planned expenditure: Y = PE.",
        },
        {
          term: "45° line",
          text: "The line on which Y = PE. Equilibrium income is where the PE function crosses the 45° line (the 'cross').",
        },
        {
          term: "Full-employment income",
          text: "The level of income when the economy is fully employed, also known as the natural level of output.",
        },
        {
          term: "Recessionary gap",
          text: "Given planned investment and fiscal policy, the economy can reach an equilibrium below the full-employment level; the shortfall is a recessionary gap.",
        },
      ],
      diagrams: [kcEq],
    },
    {
      title: "Solving for equilibrium algebraically",
      points: [
        {
          term: "Method",
          text: "Take PE = a + b(Y − T) + IP + G and Y = PE. Substitute the second into the first: Y = a + bY − bT + IP + G. Collect terms: (1 − b)Y = a − bT + IP + G. Then divide by (1 − b).",
        },
      ],
      formulas: [
        { name: "Equilibrium income", expr: "Y = (a − bT + IP + G) ÷ (1 − b)" },
      ],
      worked: [
        {
          problem: "Lecture worked example: a = 200, b = 0.75, T = 400, IP = 300, G = 500. Find equilibrium income.",
          solution: "Y = (a − bT + IP + G) ÷ (1 − b)\nY = (200 − 0.75 × 400 + 300 + 500) ÷ (1 − 0.75)\nY = (200 − 300 + 300 + 500) ÷ 0.25 = 700 ÷ 0.25 = 2,800",
        },
        {
          problem: "Problem Set 10 Q2: C = 200 + 0.8(Y − T), IP = 200, G = 100, T = 100. (a) Write PE as a function of Y. (b) Find equilibrium income.",
          solution: "(a) PE = 200 + 0.8(Y − 100) + 200 + 100 = 420 + 0.8Y (intercept 420, slope 0.8)\n(b) Y = PE → Y = 420 + 0.8Y → 0.2Y = 420 → Y = 2,100\nCheck with the formula: (200 − 0.8 × 100 + 200 + 100) ÷ 0.2 = 420 ÷ 0.2 = 2,100",
        },
      ],
    },
    {
      title: "Adjustment to equilibrium",
      points: [
        {
          term: "Output above equilibrium",
          text: "PE is less than Y, so actual sales fall short of what firms produced: inventories pile up (positive unplanned inventory investment) and firms cut production, so Y falls toward equilibrium.",
        },
        {
          term: "Output below equilibrium",
          text: "PE exceeds Y, so sales exceed expectations: inventories fall (negative unplanned inventory investment) and firms raise production, so Y rises toward equilibrium.",
        },
      ],
      diagrams: [kcAdjust],
    },
    {
      title: "The government-purchases multiplier",
      intro: "How policymakers can shrink a recessionary gap: an increase in government purchases shifts PE up.",
      points: [
        {
          term: "Multiplier in action",
          text: "A change in G raises income by ΔG; consumption then rises by MPC × ΔG, then MPC² × ΔG, then MPC³ × ΔG, … so ΔY = (1 + MPC + MPC² + MPC³ + …)ΔG.",
        },
        {
          term: "Government-purchases multiplier",
          text: "ΔY/ΔG = 1 + MPC + MPC² + … = 1 ÷ (1 − MPC). It can also be derived from the equilibrium income formula, since G enters with coefficient 1 ÷ (1 − b).",
          eg: "If MPC = 0.75, the multiplier is 1 + 0.75 + 0.75² + … = 1 ÷ 0.25 = 4.",
        },
      ],
      formulas: [
        { name: "Multiplier as a series", expr: "ΔY/ΔG = 1 + MPC + MPC² + MPC³ + …" },
        { name: "Government-purchases multiplier", expr: "ΔY/ΔG = 1 ÷ (1 − MPC) = 1 ÷ (1 − b)" },
        { name: "Equilibrium income (multiplier form)", expr: "Y = [1 ÷ (1 − b)] × (a − bT + IP + G)" },
        { name: "Change in G needed to close a gap", expr: "ΔG = required ΔY ÷ [1 ÷ (1 − MPC)] = required ΔY × (1 − MPC)" },
      ],
      worked: [
        {
          problem: "Problem Set 10 Q1: Equilibrium income is 8,000, full-employment income is 10,000 and MPC = 0.75. By how much must government purchases change to close the recessionary gap?",
          solution: "Gap = 10,000 − 8,000 = 2,000\nMultiplier = 1 ÷ (1 − 0.75) = 4\nΔG = 2,000 ÷ 4 = 500: government purchases must increase by 500",
        },
        {
          problem: "Problem Set 10 Q2: C = 200 + 0.8(Y − T), IP = 200, G = T = 100 (Y = 2,100). (c) G rises to 110: new Y and the multiplier? (d) What G gives Y = 2,200 (T = 100)?",
          solution: "(c) Y = (200 − 80 + 200 + 110) ÷ 0.2 = 430 ÷ 0.2 = 2,150\nMultiplier = ΔY ÷ ΔG = 50 ÷ 10 = 5 (= 1 ÷ (1 − 0.8))\n(d) Need ΔY = 2,200 − 2,100 = 100 → ΔG = 100 ÷ 5 = 20 → G = 120",
        },
      ],
      diagrams: [kcGovt],
    },
    {
      title: "The tax multiplier",
      points: [
        {
          term: "Tax multiplier",
          text: "Taxes enter the equilibrium solution as −bT, so ΔY/ΔT = −b ÷ (1 − b) = −MPC ÷ (1 − MPC). A tax increase lowers income; a tax cut raises it.",
        },
        {
          term: "Comparison (MPC = 0.75)",
          text: "A $1 increase in G raises income by $4; a $1 tax cut raises income by $3.",
        },
        {
          term: "Why the tax multiplier is smaller",
          text: "Households save part of a tax cut, so first-round spending is only MPC × $1. After that, both follow the same multiplier process.",
        },
        {
          term: "Targeting tax cuts (Problem Set 10)",
          text: "Since the tax multiplier −MPC ÷ (1 − MPC) is larger in size when MPC is higher, tax cuts aimed at households with a high MPC give the largest rise in income per dollar of tax cut.",
        },
        {
          term: "Equal rise in G and T (Problem Set 10)",
          text: "Adding the two multipliers: ΔY = ΔG ÷ (1 − b) − bΔT ÷ (1 − b). With ΔG = ΔT, this equals ΔG × (1 − b) ÷ (1 − b) = ΔG, whatever the MPC.",
        },
      ],
      formulas: [
        { name: "Tax multiplier", expr: "ΔY/ΔT = −MPC ÷ (1 − MPC) = −b ÷ (1 − b)" },
        { name: "Equal change in G and T", expr: "ΔY = ΔG ÷ (1 − b) − b × ΔT ÷ (1 − b) = ΔG when ΔG = ΔT" },
      ],
      worked: [
        {
          problem: "Problem Set 10 Q2(e): C = 200 + 0.8(Y − T), IP = 200, G = 100, Y = 2,100 at T = 100. What level of taxes gives Y = 2,200?",
          solution: "Tax multiplier = −0.8 ÷ (1 − 0.8) = −4\nNeed ΔY = +100 → ΔT = 100 ÷ (−4) = −25 → T = 75\nCheck: (200 − 0.8 × 75 + 200 + 100) ÷ 0.2 = 440 ÷ 0.2 = 2,200",
        },
        {
          problem: "Problem Set 10 Q3: MPC = 0.6. Find the change in equilibrium income from (a) G up $100b, (b) T up $100b, (c) G and T both up $100b.",
          solution: "(a) ΔY = ΔG ÷ (1 − MPC) = 100 ÷ 0.4 = +$250b\n(b) ΔY = −MPC × ΔT ÷ (1 − MPC) = −0.6 × 100 ÷ 0.4 = −$150b\n(c) ΔY = 250 − 150 = +$100b\nA larger MPC makes (a) a bigger rise and (b) a bigger fall; (c) stays at +$100b.",
        },
      ],
    },
    {
      title: "The efficacy of fiscal tools",
      points: [
        {
          term: "What drives the multiplier",
          text: "The impact of changes in G and T depends on the multiplier, which is driven by the MPC. A higher MPC creates a stronger feedback loop, leading to a larger multiplier.",
        },
        {
          term: "Investment rising with income",
          text: "Investment may rise with income, increasing the multiplier. Problem Set 10: with IP = c + dY, PE rises by (b + d) per $1 of income, so ΔY/ΔG = 1 ÷ (1 − b − d), larger than 1 ÷ (1 − b).",
        },
        {
          term: "Taxes rising with income",
          text: "Taxes rise as income increases, so higher income leads to automatic tax hikes, reducing the multiplier. Problem Set 10: with T = T̄ + tY (t = marginal tax rate), PE rises by b(1 − t) per $1, so ΔY/ΔG = 1 ÷ [1 − b(1 − t)], smaller than 1 ÷ (1 − b).",
        },
        {
          term: "Leakages from imports",
          text: "Spending on imports causes leakages, lowering the domestic impact of fiscal policy. Problem Set 10: with NX = e − fY, PE rises by (b − f) per $1, so ΔY/ΔG = 1 ÷ (1 − b + f), smaller than 1 ÷ (1 − b). An economy where imports are a larger share of GDP (Canada, about 33%) should have a smaller multiplier than one with a smaller share (U.S., about 15%).",
        },
      ],
      formulas: [
        { name: "Taxes rise with income: T = T̄ + tY", expr: "ΔY/ΔG = 1 ÷ [1 − b(1 − t)]" },
        { name: "Investment rises with income: IP = c + dY", expr: "ΔY/ΔG = 1 ÷ (1 − b − d)" },
        { name: "Open economy: NX = e − fY", expr: "ΔY/ΔG = 1 ÷ (1 − b + f)" },
      ],
      table: [
        ["Complication", "Slope of PE", "Multiplier", "vs 1 ÷ (1 − b)"],
        ["None (basic model)", "b", "1 ÷ (1 − b)", "—"],
        ["Taxes rise with income (t)", "b(1 − t)", "1 ÷ [1 − b(1 − t)]", "Smaller"],
        ["Investment rises with income (d)", "b + d", "1 ÷ (1 − b − d)", "Larger"],
        ["Imports rise with income (f)", "b − f", "1 ÷ (1 − b + f)", "Smaller"],
      ],
      worked: [
        {
          problem: "MPC b = 0.8. Find the government-purchases multiplier if (i) the marginal tax rate t = 0.25; (ii) instead, net exports fall by f = 0.3 per $1 of income.",
          solution: "(i) 1 ÷ [1 − 0.8(1 − 0.25)] = 1 ÷ (1 − 0.6) = 1 ÷ 0.4 = 2.5\n(ii) 1 ÷ (1 − 0.8 + 0.3) = 1 ÷ 0.5 = 2\nBoth are smaller than the basic multiplier 1 ÷ (1 − 0.8) = 5.",
        },
      ],
    },
    {
      title: "The paradox of thrift",
      points: [
        {
          term: "Rise in thriftiness",
          text: "Households become pessimistic and decide to save more: a in the consumption function falls. This shifts the PE function down and reduces equilibrium income.",
        },
        {
          term: "National saving",
          text: "S = Y − C − G. Substituting C = a + b(Y − T), with G and T fixed: S = (1 − b)Y − a + bT − G. Substituting equilibrium Y and simplifying gives S = IP.",
        },
        {
          term: "Paradox of thrift",
          text: "National saving is determined solely by the fixed level of planned investment. When people try to save more, the consumption function shifts down, but income falls so much that national saving is unchanged.",
        },
      ],
      formulas: [
        { name: "National saving", expr: "S = Y − C − G" },
        { name: "Saving with the consumption function", expr: "S = (1 − b)Y − a + bT − G" },
        { name: "Saving in the Keynesian cross", expr: "S = IP" },
      ],
      worked: [
        {
          problem: "Show that S = IP in the Keynesian cross.",
          solution: "Equilibrium: (1 − b)Y = a − bT + IP + G\nSaving: S = (1 − b)Y − a + bT − G\nSubstitute: S = (a − bT + IP + G) − a + bT − G = IP",
        },
      ],
      diagrams: [kcThrift],
    },
    {
      title: "Loanable funds vs Keynesian cross",
      points: [
        {
          term: "Loanable-funds model",
          text: "More saving increases funds, lowers interest rates, boosts investment and raises national income. Designed to explain a fully employed economy.",
        },
        {
          term: "Keynesian cross",
          text: "Investment is fixed, so more saving lowers income without increasing national saving. More applicable to an economy in recession or depression.",
        },
      ],
      table: [
        ["", "Loanable-funds model", "Keynesian cross"],
        ["Effect of more saving", "More funds → lower r → more investment → higher income", "Investment fixed → income falls; national saving unchanged"],
        ["Best applied to", "A fully employed economy", "An economy in recession or depression"],
      ],
    },
    {
      title: "The Keynesian cross and aggregate demand",
      points: [
        { term: "Step 1", text: "When the price level P increases, people want to hold more money to engage in transactions." },
        { term: "Step 2", text: "By the theory of liquidity preference, an increase in money demand increases the equilibrium interest rate." },
        { term: "Step 3", text: "When the interest rate increases, it is more expensive to borrow to finance capital projects, so planned investment falls." },
        { term: "Step 4", text: "By the Keynesian cross, a fall in planned investment reduces equilibrium income." },
        { term: "Aggregate-demand curve", text: "The result is a negative relationship between the price level P and income Y: the aggregate-demand curve." },
      ],
      formulas: [{ name: "Deriving AD", expr: "P ↑ → MD ↑ → r ↑ → IP ↓ → PE shifts down → Y ↓" }],
      diagrams: [mmPriceRise, kcInvestFall, adDerived],
    },
  ],

  // ------------------------------------------------------------------ flashcards
  flashcards: [
    { id: "keynesian-c1", type: "concept", front: "Keynes's description of depressed economic activity in downturns: it feeds on itself.", back: "Self-reinforcing", why: "A decline in spending triggers a vicious cycle." },
    { id: "keynesian-c2", type: "concept", front: "What a decline in spending triggers in a downturn: lower spending leads to lower income, which leads to lower spending.", back: "Vicious cycle", why: "Keynes's solution was to jumpstart spending." },
    { id: "keynesian-c3", type: "concept", front: "A system in which a small disturbance in one variable can amplify as it influences related variables.", back: "Positive feedback loop", why: "Small bad news can be amplified into big bad news; it also amplifies government spending via the multiplier." },
    { id: "keynesian-c4", type: "concept", front: "The model that provides a mathematical model of the positive feedback loop, finding equilibrium where planned expenditure meets the 45° line.", back: "Keynesian cross", why: "It explains how a recessionary gap can persist and how fiscal policy can close it." },
    { id: "keynesian-c5", type: "concept", front: "The amount households, firms and government plan to spend; in a closed economy C + IP + G.", back: "Planned expenditure (PE)", why: "It differs from actual expenditure when inventories change unexpectedly." },
    { id: "keynesian-c6", type: "concept", front: "Inventory investment that firms did not intend, e.g. unsold goods piling up when sales are lower than expected.", back: "Unplanned inventory investment", why: "When positive, actual expenditure exceeds planned expenditure." },
    { id: "keynesian-c7", type: "concept", front: "In C = a + b(Y − T), the term a.", back: "Autonomous consumption", why: "It falls when households become pessimistic and decide to save more." },
    { id: "keynesian-c8", type: "concept", front: "In C = a + b(Y − T), the term b.", back: "Marginal propensity to consume (MPC)", why: "It is also the slope of the consumption function and the PE function." },
    { id: "keynesian-c9", type: "concept", front: "Income minus taxes, written (Y − T).", back: "Disposable income", why: "Consumption depends on it in the consumption function." },
    { id: "keynesian-c10", type: "concept", front: "The equation C = a + b(Y − T).", back: "Consumption function", why: "Intercept a, slope b (the MPC)." },
    { id: "keynesian-c11", type: "concept", front: "The equation PE = a + b(Y − T) + IP + G, or PE = a − bT + IP + G + bY.", back: "Planned expenditure function", why: "Its slope is b; a, T, IP and G shift it." },
    { id: "keynesian-c12", type: "concept", front: "The investment firms intend to make, written IP and held fixed in the basic Keynesian cross.", back: "Planned investment", why: "A rise in it shifts PE up; in the paradox of thrift, national saving equals it." },
    { id: "keynesian-c13", type: "concept", front: "The line on the Keynesian cross along which income equals planned expenditure.", back: "45-degree line / 45° line", why: "Equilibrium is where the PE function crosses it." },
    { id: "keynesian-c14", type: "concept", front: "The level of income at which Y = PE.", back: "Equilibrium income", why: "Y = (a − bT + IP + G) ÷ (1 − b)." },
    { id: "keynesian-c15", type: "concept", front: "The shortfall when equilibrium income is below full-employment income.", back: "Recessionary gap", why: "Policymakers can shrink it by raising G or cutting T." },
    { id: "keynesian-c16", type: "concept", front: "Income when the economy is fully employed, also called the natural level of output.", back: "Full-employment income", why: "The Keynesian cross equilibrium can sit below it." },
    { id: "keynesian-c17", type: "concept", front: "ΔY/ΔG = 1 + MPC + MPC² + … = 1 ÷ (1 − MPC).", back: "Government-purchases multiplier", why: "With MPC = 0.75 it equals 4." },
    { id: "keynesian-c18", type: "concept", front: "ΔY/ΔT = −MPC ÷ (1 − MPC).", back: "Tax multiplier", why: "With MPC = 0.75, a $1 tax cut raises income by $3." },
    { id: "keynesian-c19", type: "concept", front: "Spending on imports, which lowers the domestic impact of fiscal policy and reduces the multiplier.", back: "Leakages", why: "Imports rise with income, so part of each round of spending leaves the domestic economy." },
    { id: "keynesian-c20", type: "concept", front: "When people try to save more, income falls so much that national saving is unchanged.", back: "Paradox of thrift", why: "In the Keynesian cross, national saving always equals planned investment (S = IP)." },
    { id: "keynesian-c21", type: "concept", front: "Y − C − G.", back: "National saving (S)", why: "In the Keynesian cross it simplifies to S = IP." },
    { id: "keynesian-c22", type: "concept", front: "The model in which more saving lowers interest rates, boosts investment and raises national income; designed for a fully employed economy.", back: "Loanable-funds model", why: "By contrast, the Keynesian cross fits an economy in recession or depression." },
    { id: "keynesian-c23", type: "concept", front: "In T = T̄ + tY, the parameter t: how much taxes rise when income rises by $1.", back: "Marginal tax rate", why: "Problem Set 10: it reduces the slope of PE to b(1 − t) and shrinks the multiplier." },
    { id: "keynesian-c24", type: "concept", front: "The slope of the planned expenditure function.", back: "MPC / b", why: "Each extra $1 of income raises planned spending by b × $1." },
    { id: "keynesian-c25", type: "concept", front: "The negative relationship between P and Y obtained by combining liquidity preference with the Keynesian cross.", back: "Aggregate-demand curve (AD)", why: "Higher P → higher r → lower planned investment → lower equilibrium income." },
    { id: "keynesian-c26", type: "concept", front: "Keynes's solution to the vicious cycle of falling spending and income.", back: "Jumpstart spending", why: "The multiplier then amplifies the initial boost." },
    { id: "keynesian-s1", type: "scenario", front: "A firm's actual sales turn out lower than expected. What happens to inventories, and how does actual expenditure compare with planned expenditure?", back: "Inventories rise; actual > planned", why: "The extra inventory is unplanned inventory investment, which raises actual expenditure above planned expenditure." },
    { id: "keynesian-s2", type: "scenario", front: "Output is above its Keynesian-cross equilibrium. How does the economy adjust?", back: "Firms cut production; Y falls to equilibrium", why: "At that Y, PE < Y, so goods go unsold and inventories pile up. Firms respond by producing less until Y = PE." },
    { id: "keynesian-s3", type: "scenario", front: "a = 200, b = 0.75, T = 400, IP = 300, G = 500. What is equilibrium income?", back: "2,800", why: "Y = (a − bT + IP + G) ÷ (1 − b) = (200 − 300 + 300 + 500) ÷ 0.25 = 700 ÷ 0.25 = 2,800." },
    { id: "keynesian-s4", type: "scenario", front: "C = 200 + 0.8(Y − T), IP = 200, G = T = 100. What is equilibrium income?", back: "2,100", why: "PE = 420 + 0.8Y; Y = PE → 0.2Y = 420 → Y = 2,100." },
    { id: "keynesian-s5", type: "scenario", front: "Equilibrium income is 8,000, full employment is 10,000 and MPC = 0.75. How much must G change?", back: "Increase G by 500", why: "Multiplier = 1 ÷ (1 − 0.75) = 4. Gap = 2,000, so ΔG = 2,000 ÷ 4 = 500." },
    { id: "keynesian-s6", type: "scenario", front: "MPC = 0.75. Compare the effect on income of a $1 rise in G and a $1 tax cut.", back: "G: +$4; tax cut: +$3", why: "G multiplier = 1 ÷ 0.25 = 4; tax multiplier = −0.75 ÷ 0.25 = −3. Households save part of the tax cut, so first-round spending is only $0.75." },
    { id: "keynesian-s7", type: "scenario", front: "Households become pessimistic and decide to save more. What happens to PE, equilibrium income and national saving in the Keynesian cross?", back: "PE shifts down, Y falls, national saving unchanged", why: "a falls, shifting PE down and lowering income. Since S = IP and IP is fixed, saving does not rise: the paradox of thrift." },
    { id: "keynesian-s8", type: "scenario", front: "MPC = 0.6. G and T both rise by $100b. What happens to equilibrium income?", back: "Rises by $100b", why: "G effect: 100 ÷ 0.4 = +250. Tax effect: −0.6 × 100 ÷ 0.4 = −150. Net = +100, equal to ΔG." },
    { id: "keynesian-s9", type: "scenario", front: "Taxes now rise automatically with income (T = T̄ + tY). Is the G multiplier larger or smaller than 1 ÷ (1 − b)?", back: "Smaller: 1 ÷ [1 − b(1 − t)]", why: "Each $1 of income raises disposable income by only (1 − t), so PE rises by b(1 − t) < b. A flatter PE means a weaker feedback loop." },
    { id: "keynesian-s10", type: "scenario", front: "Firms invest more when income is high (IP = c + dY). Is the G multiplier larger or smaller than 1 ÷ (1 − b)?", back: "Larger: 1 ÷ (1 − b − d)", why: "PE now rises by b + d per $1 of income, a steeper PE and stronger feedback loop." },
    { id: "keynesian-s11", type: "scenario", front: "Two economies have the same MPC, but imports are 33% of GDP in one and 15% in the other. Which has the larger multiplier?", back: "The one with imports at 15% of GDP", why: "With NX = e − fY the multiplier is 1 ÷ (1 − b + f); more spending on imports (larger f) means larger leakages and a smaller multiplier." },
    { id: "keynesian-s12", type: "scenario", front: "The government wants the most 'bang for the buck' from a tax cut. Should it target high-MPC or low-MPC households?", back: "High-MPC households", why: "The tax multiplier −MPC ÷ (1 − MPC) is larger in size when MPC is higher: they spend more of the cut in the first round and every later round." },
    { id: "keynesian-s13", type: "scenario", front: "The price level rises. Use the liquidity preference theory and the Keynesian cross to show what happens to income.", back: "Income falls (AD slopes down)", why: "Higher P → people want more money → r rises → borrowing for capital projects costs more, planned investment falls → PE shifts down → equilibrium income falls." },
    { id: "keynesian-s14", type: "scenario", front: "Planned investment rises by 50 and MPC = 0.8. By how much does equilibrium income rise?", back: "250", why: "IP enters the equilibrium formula with coefficient 1 ÷ (1 − b) = 1 ÷ 0.2 = 5, so ΔY = 5 × 50 = 250." },
  ],

  // ------------------------------------------------------------------ quiz
  quiz: [
    { id: "keynesian-q1", kind: "fill", sub: "Big idea", prompt: "Keynes's main insight: depressed economic activity during downturns is self-____.", answers: [["reinforcing"]], explain: "A decline in spending triggers a vicious cycle." },
    { id: "keynesian-q2", kind: "fill", sub: "Big idea", prompt: "A decline in spending triggers a ____ cycle.", answers: [["vicious"]], explain: "Lower spending lowers income, which lowers spending further." },
    { id: "keynesian-q3", kind: "fill", sub: "Big idea", prompt: "A system in which a small disturbance in one variable amplifies as it influences related variables is a positive ____ loop.", answers: [["feedback"]], explain: "Small bad news is amplified into big bad news." },
    { id: "keynesian-q4", kind: "fill", sub: "Big idea", prompt: "Keynes's solution to the vicious cycle is to ____ spending.", answers: [["jumpstart", "jump-start", "jump start", "boost", "increase"]], explain: "The multiplier then amplifies the initial boost." },
    { id: "keynesian-q5", kind: "fill", sub: "Big idea", prompt: "The ____ provides a mathematical model of the positive feedback loop.", answers: [["Keynesian cross", "Keynesian cross model"]], explain: "It finds equilibrium where PE crosses the 45° line." },
    { id: "keynesian-q6", kind: "fill", sub: "Planned expenditure", prompt: "When actual sales are lower than expected, the stock of inventories ____.", answers: [["rises", "increases", "goes up"]], explain: "Unsold goods pile up." },
    { id: "keynesian-q7", kind: "fill", sub: "Planned expenditure", prompt: "The additional inventory investment when sales disappoint is ____, so it raises actual expenditure above planned expenditure.", answers: [["unplanned"]], explain: "Firms did not intend to accumulate those inventories." },
    { id: "keynesian-q8", kind: "fill", sub: "Planned expenditure", prompt: "When actual sales are higher than expected, actual expenditure is ____ planned expenditure.", answers: [["below", "less than", "lower than"]], explain: "Inventories fall: negative unplanned inventory investment." },
    { id: "keynesian-q9", kind: "fill", sub: "Basic model", prompt: "In a closed economy, PE = C + IP + ____.", answers: [["G", "government purchases"]], explain: "Consumption, planned investment and government purchases." },
    { id: "keynesian-q10", kind: "fill", sub: "Basic model", prompt: "In C = a + b(Y − T), a is ____ consumption.", answers: [["autonomous"]], explain: "The part of consumption that does not depend on income." },
    { id: "keynesian-q11", kind: "fill", sub: "Basic model", prompt: "In C = a + b(Y − T), b is the ____.", answers: [["marginal propensity to consume", "MPC"]], explain: "The slope of the consumption function." },
    { id: "keynesian-q12", kind: "fill", sub: "Basic model", prompt: "In the consumption function, (Y − T) is ____ income.", answers: [["disposable"]], explain: "Income minus taxes." },
    { id: "keynesian-q13", kind: "fill", sub: "PE function", prompt: "Written as PE = a − bT + IP + G + bY, the slope of the PE function is ____.", answers: [["b", "MPC", "marginal propensity to consume"]], explain: "The intercept is a − bT + IP + G." },
    { id: "keynesian-q14", kind: "fill", sub: "PE function", prompt: "A rise in a, IP or G, or a decrease in ____, shifts the PE function upward.", answers: [["T", "taxes", "tax"]], explain: "Lower taxes raise disposable income and consumption." },
    { id: "keynesian-q15", kind: "fill", sub: "Equilibrium", prompt: "In the Keynesian cross, equilibrium requires Y = ____.", answers: [["PE", "planned expenditure"]], explain: "Income equals planned expenditure." },
    { id: "keynesian-q16", kind: "fill", sub: "Equilibrium", prompt: "Equilibrium income is where the PE function crosses the ____-degree line.", answers: [["45"]], explain: "Every point on the 45° line has Y = PE." },
    { id: "keynesian-q17", kind: "fill", sub: "Equilibrium", prompt: "If equilibrium income is below full-employment income, there is a ____ gap.", answers: [["recessionary"]], explain: "Policymakers can raise G or cut T to close it." },
    { id: "keynesian-q18", kind: "fill", sub: "Equilibrium", prompt: "Full-employment income is also known as the ____ level of output.", answers: [["natural"]], explain: "The lecture uses both names." },
    { id: "keynesian-q19", kind: "fill", sub: "Equilibrium algebra", prompt: "Equilibrium income: Y = (a − bT + IP + G) ÷ (1 − ____).", answers: [["b", "MPC"]], explain: "From (1 − b)Y = a − bT + IP + G." },
    { id: "keynesian-q20", kind: "fill", sub: "Equilibrium algebra", prompt: "a = 200, b = 0.75, T = 400, IP = 300, G = 500. Equilibrium income = ____.", answers: [["2800", "2,800"]], explain: "(200 − 300 + 300 + 500) ÷ 0.25 = 700 ÷ 0.25 = 2,800." },
    { id: "keynesian-q21", kind: "fill", sub: "Equilibrium algebra", prompt: "C = 200 + 0.8(Y − T), IP = 200, G = T = 100. Equilibrium income = ____.", answers: [["2100", "2,100"]], explain: "PE = 420 + 0.8Y → 0.2Y = 420 → Y = 2,100." },
    { id: "keynesian-q22", kind: "fill", sub: "Equilibrium algebra", prompt: "In the economy C = 200 + 0.8(Y − T), IP = 200, G = T = 100, the intercept of the PE function is ____.", answers: [["420"]], explain: "200 − 0.8 × 100 + 200 + 100 = 420." },
    { id: "keynesian-q23", kind: "fill", sub: "Adjustment", prompt: "If output is above equilibrium, inventories pile up and firms ____ production.", answers: [["cut", "reduce", "decrease", "lower"]], explain: "PE < Y, so Y falls toward equilibrium." },
    { id: "keynesian-q24", kind: "fill", sub: "G multiplier", prompt: "ΔY/ΔG = 1 + MPC + MPC² + MPC³ + … = 1 ÷ (1 − ____).", answers: [["MPC", "b"]], explain: "The government-purchases multiplier." },
    { id: "keynesian-q25", kind: "fill", sub: "G multiplier", prompt: "If MPC = 0.75, the government-purchases multiplier is ____.", answers: [["4"]], explain: "1 ÷ (1 − 0.75) = 4." },
    { id: "keynesian-q26", kind: "fill", sub: "G multiplier", prompt: "If MPC = 0.8, the government-purchases multiplier is ____.", answers: [["5"]], explain: "1 ÷ 0.2 = 5." },
    { id: "keynesian-q27", kind: "fill", sub: "Tax multiplier", prompt: "With MPC = 0.75, a $1 tax cut raises equilibrium income by $____.", answers: [["3"]], explain: "Tax multiplier = −0.75 ÷ 0.25 = −3." },
    { id: "keynesian-q28", kind: "fill", sub: "Tax multiplier", prompt: "The tax multiplier is smaller than the G multiplier because households ____ part of a tax cut.", answers: [["save"]], explain: "First-round spending is only MPC × $1." },
    { id: "keynesian-q29", kind: "fill", sub: "Tax multiplier", prompt: "Tax multiplier: ΔY/ΔT = −____ ÷ (1 − MPC).", answers: [["MPC", "b"]], explain: "Taxes enter the equilibrium solution as −bT." },
    { id: "keynesian-q30", kind: "fill", sub: "Efficacy of fiscal tools", prompt: "A higher MPC creates a stronger feedback loop, leading to a ____ multiplier.", answers: [["larger", "bigger", "greater"]], explain: "1 ÷ (1 − MPC) rises with MPC." },
    { id: "keynesian-q31", kind: "fill", sub: "Efficacy of fiscal tools", prompt: "If investment rises with income, the multiplier ____.", answers: [["increases", "rises", "gets larger", "is larger"]], explain: "PE becomes steeper (slope b + d)." },
    { id: "keynesian-q32", kind: "fill", sub: "Efficacy of fiscal tools", prompt: "Spending on imports causes ____, lowering the domestic impact of fiscal policy.", answers: [["leakages", "leakage"]], explain: "Part of each round of spending goes abroad." },
    { id: "keynesian-q33", kind: "fill", sub: "Problem Set 10", prompt: "Equilibrium income 8,000, full-employment income 10,000, MPC 0.75. Government purchases must rise by ____.", answers: [["500"]], explain: "Multiplier 4; 2,000 ÷ 4 = 500." },
    { id: "keynesian-q34", kind: "fill", sub: "Problem Set 10", prompt: "C = 200 + 0.8(Y − T), IP = 200, T = 100. If G rises from 100 to 110, new equilibrium income = ____.", answers: [["2150", "2,150"]], explain: "430 ÷ 0.2 = 2,150 (ΔY = 50 = 5 × 10)." },
    { id: "keynesian-q35", kind: "fill", sub: "Problem Set 10", prompt: "In the same economy (T = 100), government purchases of ____ are needed for income of 2,200.", answers: [["120"]], explain: "ΔY = 100; ΔG = 100 ÷ 5 = 20; G = 100 + 20." },
    { id: "keynesian-q36", kind: "fill", sub: "Problem Set 10", prompt: "In the same economy (G = 100), taxes of ____ are needed for income of 2,200.", answers: [["75"]], explain: "Tax multiplier = −4; ΔT = 100 ÷ (−4) = −25; T = 75." },
    { id: "keynesian-q37", kind: "fill", sub: "Problem Set 10", prompt: "MPC = 0.6. A $100b rise in government purchases raises equilibrium income by $____ billion.", answers: [["250"]], explain: "100 ÷ (1 − 0.6) = 250." },
    { id: "keynesian-q38", kind: "fill", sub: "Problem Set 10", prompt: "MPC = 0.6. A $100b rise in taxes lowers equilibrium income by $____ billion.", answers: [["150"]], explain: "0.6 × 100 ÷ 0.4 = 150." },
    { id: "keynesian-q39", kind: "fill", sub: "Problem Set 10", prompt: "MPC = 0.6. A $100b rise in both G and T raises equilibrium income by $____ billion.", answers: [["100"]], explain: "250 − 150 = 100: equal to ΔG whatever the MPC." },
    { id: "keynesian-q40", kind: "fill", sub: "Problem Set 10", prompt: "To get the largest effect per dollar, tax cuts should be aimed at households with a ____ MPC.", answers: [["high", "higher", "large"]], explain: "The tax multiplier −MPC ÷ (1 − MPC) is bigger in size for high MPC." },
    { id: "keynesian-q41", kind: "fill", sub: "Problem Set 10", prompt: "In T = T̄ + tY, t is the marginal ____ rate.", answers: [["tax"]], explain: "If income rises $1, taxes rise by t × $1." },
    { id: "keynesian-q42", kind: "fill", sub: "Problem Set 10", prompt: "With T = T̄ + tY, the G multiplier is 1 ÷ [1 − b(1 − t)]. If b = 0.8 and t = 0.25, it equals ____ (1 d.p.).", answers: [["2.5"]], explain: "1 ÷ (1 − 0.6) = 2.5, smaller than 5." },
    { id: "keynesian-q43", kind: "fill", sub: "Problem Set 10", prompt: "With IP = c + dY, the G multiplier is 1 ÷ (1 − b − d). If b = 0.6 and d = 0.2, it equals ____.", answers: [["5"]], explain: "1 ÷ 0.2 = 5, larger than 1 ÷ 0.4 = 2.5." },
    { id: "keynesian-q44", kind: "fill", sub: "Problem Set 10", prompt: "With NX = e − fY, the G multiplier is 1 ÷ (1 − b + f). If b = 0.8 and f = 0.3, it equals ____.", answers: [["2"]], explain: "1 ÷ 0.5 = 2, smaller than 5." },
    { id: "keynesian-q45", kind: "fill", sub: "Problem Set 10", prompt: "An economy whose imports are a ____ share of GDP should have a larger multiplier.", answers: [["smaller", "lower", "small", "low"]], explain: "Fewer leakages: smaller f in 1 ÷ (1 − b + f)." },
    { id: "keynesian-q46", kind: "fill", sub: "Paradox of thrift", prompt: "When households decide to save more, a in the consumption function ____.", answers: [["falls", "decreases", "drops"]], explain: "This shifts PE down." },
    { id: "keynesian-q47", kind: "fill", sub: "Paradox of thrift", prompt: "National saving: S = Y − C − ____.", answers: [["G"]], explain: "With G and T fixed, S = (1 − b)Y − a + bT − G." },
    { id: "keynesian-q48", kind: "fill", sub: "Paradox of thrift", prompt: "In the Keynesian cross, national saving S equals ____.", answers: [["IP", "planned investment", "Ip"]], explain: "National saving is determined solely by fixed planned investment." },
    { id: "keynesian-q49", kind: "fill", sub: "Paradox of thrift", prompt: "When people try to save more but income falls so much that national saving is unchanged, this is the paradox of ____.", answers: [["thrift"]], explain: "Income falls; S stays at IP." },
    { id: "keynesian-q50", kind: "fill", sub: "Model comparison", prompt: "The loanable-funds model is designed to explain a ____ employed economy.", answers: [["fully"]], explain: "The Keynesian cross is more applicable to recession or depression." },
    { id: "keynesian-q51", kind: "fill", sub: "Model comparison", prompt: "The Keynesian cross is more applicable to an economy in recession or ____.", answers: [["depression"]], explain: "Investment is fixed, so more saving lowers income." },
    { id: "keynesian-q52", kind: "fill", sub: "Keynesian cross and AD", prompt: "A higher price level raises money demand and r, so ____ investment falls and equilibrium income falls.", answers: [["planned"]], explain: "This negative P–Y relationship is the aggregate-demand curve." },
    { id: "keynesian-q53", kind: "fill", sub: "Keynesian cross and AD", prompt: "The negative relationship between P and Y derived from liquidity preference and the Keynesian cross is the ____ curve.", answers: [["aggregate-demand", "aggregate demand", "AD"]], explain: "P ↑ → r ↑ → IP ↓ → Y ↓." },
    { id: "keynesian-q54", kind: "mcq", sub: "Planned expenditure", prompt: "Actual sales are higher than firms expected. Which is correct?", options: ["Inventories rise and actual expenditure exceeds PE", "Inventories fall and actual expenditure is below PE", "Inventories fall and actual expenditure exceeds PE", "Inventories are unchanged"], answer: 1, explain: "Negative unplanned inventory investment reduces actual expenditure below planned." },
    { id: "keynesian-q55", kind: "mcq", sub: "PE function", prompt: "Which change shifts the PE function DOWN?", options: ["A fall in taxes", "A rise in planned investment", "A rise in taxes", "A rise in government purchases"], answer: 2, explain: "Higher T lowers disposable income, so C falls by b × ΔT at every Y." },
    { id: "keynesian-q56", kind: "mcq", sub: "Equilibrium", prompt: "On the Keynesian cross, equilibrium income is found where:", options: ["PE crosses the vertical axis", "PE crosses the 45° line", "The consumption function crosses the 45° line at a", "PE is horizontal"], answer: 1, explain: "On the 45° line, Y = PE." },
    { id: "keynesian-q57", kind: "mcq", sub: "Adjustment", prompt: "Output is below the Keynesian-cross equilibrium. What happens?", options: ["Inventories pile up and firms cut production", "Inventories fall and firms raise production", "Firms cut prices but not output", "Nothing: any output level is an equilibrium"], answer: 1, explain: "PE > Y, so sales exceed expectations; firms produce more until Y = PE." },
    { id: "keynesian-q58", kind: "mcq", sub: "Multipliers", prompt: "With MPC = 0.75, which pair gives the G multiplier and the size of the tax multiplier?", options: ["4 and 3", "4 and 4", "3 and 4", "0.75 and 0.25"], answer: 0, explain: "1 ÷ 0.25 = 4; 0.75 ÷ 0.25 = 3." },
    { id: "keynesian-q59", kind: "mcq", sub: "Multipliers", prompt: "Which feature makes the multiplier LARGER than 1 ÷ (1 − MPC)?", options: ["Taxes that rise with income", "Spending on imports", "Investment that rises with income", "A lower MPC"], answer: 2, explain: "PE becomes steeper (slope b + d), so the feedback loop is stronger." },
    { id: "keynesian-q60", kind: "mcq", sub: "Paradox of thrift", prompt: "In the Keynesian cross, households try to save more. What happens?", options: ["Income rises and saving rises", "Income falls and national saving is unchanged", "Income is unchanged and saving rises", "Interest rates fall and investment rises"], answer: 1, explain: "S = IP, which is fixed: the paradox of thrift." },
    { id: "keynesian-q61", kind: "mcq", sub: "Model comparison", prompt: "In the loanable-funds model, more saving:", options: ["Lowers income without changing saving", "Lowers interest rates, boosts investment and raises national income", "Has no effect on interest rates", "Shifts the PE function down"], answer: 1, explain: "That model is designed for a fully employed economy." },
    { id: "keynesian-q62", kind: "mcq", sub: "Problem Set 10", prompt: "MPC = 0.6. G and T both rise by $100b. Equilibrium income:", options: ["Is unchanged", "Rises by $250b", "Rises by $100b", "Falls by $150b"], answer: 2, explain: "+250 from G and −150 from T: net +100." },
    { id: "keynesian-q63", kind: "mcq", sub: "Keynesian cross and AD", prompt: "Which sequence correctly derives the AD curve?", options: ["P ↑ → MD ↓ → r ↓ → IP ↑ → Y ↑", "P ↑ → MD ↑ → r ↑ → IP ↓ → Y ↓", "P ↑ → MS ↑ → r ↓ → Y ↑", "P ↑ → G ↓ → Y ↓"], answer: 1, explain: "Higher P raises money demand and r, which lowers planned investment and equilibrium income." },
  ],

  // ------------------------------------------------------------------ exam
  exam: [
    // ---- calc
    {
      id: "keynesian-e1", section: "calc", sub: "Closing a recessionary gap", source: "Problem Set 10 Q1",
      prompt: "An economy has an equilibrium income of 8,000 and full-employment income of 10,000. The MPC is 0.75. According to the Keynesian cross, by how much must government purchases change to close the recessionary gap?",
      marks: 3,
      rubric: [
        { point: "States the formula: ΔY/ΔG = 1 ÷ (1 − MPC); ΔG = ΔY ÷ multiplier", marks: 1 },
        { point: "Correct working: gap = 2,000; multiplier = 1 ÷ 0.25 = 4; 2,000 ÷ 4", marks: 1 },
        { point: "Correct answer: G must increase by 500", marks: 1 },
      ],
      model: "Recessionary gap = 10,000 − 8,000 = 2,000\nMultiplier = 1 ÷ (1 − MPC) = 1 ÷ (1 − 0.75) = 4\nΔG = 2,000 ÷ 4 = 500\nGovernment purchases must increase by 500; through the multiplier this raises income by 4 × 500 = 2,000.",
      answer: "Increase G by 500",
    },
    {
      id: "keynesian-e2", section: "calc", sub: "Equilibrium income", source: "Lecture 10 worked example",
      prompt: "In a closed economy, a = 200, b = 0.75, T = 400, IP = 300 and G = 500. Calculate equilibrium income using the Keynesian cross.",
      marks: 3,
      rubric: [
        { point: "States the formula: Y = (a − bT + IP + G) ÷ (1 − b)", marks: 1 },
        { point: "Correct working: (200 − 300 + 300 + 500) ÷ 0.25 = 700 ÷ 0.25", marks: 1 },
        { point: "Correct answer: 2,800", marks: 1 },
      ],
      model: "Y = (a − bT + IP + G) ÷ (1 − b)\nY = (200 − 0.75 × 400 + 300 + 500) ÷ (1 − 0.75)\nY = 700 ÷ 0.25 = 2,800",
      answer: "2,800",
    },
    {
      id: "keynesian-e3", section: "calc", sub: "Equilibrium income", source: "Problem Set 10 Q2(b)",
      prompt: "The consumption function is C = 200 + 0.8(Y − T). Planned investment is 200; government purchases and taxes are both 100. Find equilibrium income.",
      marks: 3,
      rubric: [
        { point: "States PE = C + IP + G and Y = PE (or the equilibrium formula)", marks: 1 },
        { point: "Correct working: PE = 200 + 0.8(Y − 100) + 200 + 100 = 420 + 0.8Y; 0.2Y = 420", marks: 1 },
        { point: "Correct answer: Y = 2,100", marks: 1 },
      ],
      model: "PE = C + IP + G = 200 + 0.8(Y − 100) + 200 + 100 = 420 + 0.8Y\nEquilibrium: Y = PE → Y = 420 + 0.8Y\n0.2Y = 420 → Y = 2,100",
      answer: "2,100",
    },
    {
      id: "keynesian-e4", section: "calc", sub: "Multiplier", source: "Problem Set 10 Q2(c)",
      prompt: "C = 200 + 0.8(Y − T), IP = 200, T = 100. Government purchases rise from 100 to 110. Find the new equilibrium income and the multiplier for government purchases.",
      marks: 3,
      rubric: [
        { point: "States Y = (a − bT + IP + G) ÷ (1 − b) and multiplier = ΔY ÷ ΔG (or 1 ÷ (1 − MPC))", marks: 1 },
        { point: "Correct working: (200 − 80 + 200 + 110) ÷ 0.2 = 430 ÷ 0.2; ΔY = 2,150 − 2,100 = 50; 50 ÷ 10", marks: 1 },
        { point: "Correct answer: Y = 2,150 and multiplier = 5", marks: 1 },
      ],
      model: "Y = (a − bT + IP + G) ÷ (1 − b) = (200 − 0.8 × 100 + 200 + 110) ÷ 0.2 = 430 ÷ 0.2 = 2,150\nMultiplier = ΔY ÷ ΔG = (2,150 − 2,100) ÷ (110 − 100) = 50 ÷ 10 = 5\nCheck: 1 ÷ (1 − 0.8) = 5",
      answer: "Y = 2,150; multiplier = 5",
    },
    {
      id: "keynesian-e5", section: "calc", sub: "Required G", source: "Problem Set 10 Q2(d)",
      prompt: "C = 200 + 0.8(Y − T), IP = 200, T = 100; with G = 100 equilibrium income is 2,100. What level of government purchases is needed to achieve an income of 2,200?",
      marks: 3,
      rubric: [
        { point: "States the formula: ΔG = ΔY ÷ [1 ÷ (1 − MPC)]", marks: 1 },
        { point: "Correct working: multiplier = 5; ΔY = 100; ΔG = 100 ÷ 5 = 20", marks: 1 },
        { point: "Correct answer: G = 120", marks: 1 },
      ],
      model: "Multiplier = 1 ÷ (1 − 0.8) = 5\nRequired ΔY = 2,200 − 2,100 = 100\nΔG = 100 ÷ 5 = 20 → G = 100 + 20 = 120",
      answer: "G = 120",
    },
    {
      id: "keynesian-e6", section: "calc", sub: "Required T", source: "Problem Set 10 Q2(e)",
      prompt: "C = 200 + 0.8(Y − T), IP = 200, G = 100; with T = 100 equilibrium income is 2,100. What level of taxes is needed to achieve an income of 2,200?",
      marks: 3,
      rubric: [
        { point: "States the tax multiplier: ΔY/ΔT = −MPC ÷ (1 − MPC)", marks: 1 },
        { point: "Correct working: −0.8 ÷ 0.2 = −4; ΔT = 100 ÷ (−4) = −25", marks: 1 },
        { point: "Correct answer: T = 75", marks: 1 },
      ],
      model: "Tax multiplier = −MPC ÷ (1 − MPC) = −0.8 ÷ 0.2 = −4\nRequired ΔY = +100 → ΔT = 100 ÷ (−4) = −25\nT = 100 − 25 = 75\nCheck: (200 − 0.8 × 75 + 200 + 100) ÷ 0.2 = 440 ÷ 0.2 = 2,200",
      answer: "T = 75",
    },
    {
      id: "keynesian-e7", section: "calc", sub: "Tax multiplier", source: "Problem Set 10 Q3(b)",
      prompt: "The MPC is 0.6. Using the Keynesian cross, calculate the impact on equilibrium income of an increase in taxes of $100 billion.",
      marks: 3,
      rubric: [
        { point: "States the formula: ΔY = −MPC × ΔT ÷ (1 − MPC)", marks: 1 },
        { point: "Correct working: −0.6 × 100 ÷ 0.4", marks: 1 },
        { point: "Correct answer: income falls by $150 billion", marks: 1 },
      ],
      model: "ΔY = [−MPC ÷ (1 − MPC)] × ΔT = (−0.6 ÷ 0.4) × $100b = −1.5 × $100b = −$150 billion\nEquilibrium income falls by $150 billion.",
      answer: "Falls by $150 billion",
    },
    {
      id: "keynesian-e8", section: "calc", sub: "Equal change in G and T", source: "Problem Set 10 Q3(c)",
      prompt: "The MPC is 0.6. Using the Keynesian cross, calculate the impact on equilibrium income of a $100 billion increase in both government purchases and taxes.",
      marks: 3,
      rubric: [
        { point: "States the formula: ΔY = ΔG ÷ (1 − MPC) − MPC × ΔT ÷ (1 − MPC)", marks: 1 },
        { point: "Correct working: 100 ÷ 0.4 − 0.6 × 100 ÷ 0.4 = 250 − 150", marks: 1 },
        { point: "Correct answer: income rises by $100 billion", marks: 1 },
      ],
      model: "ΔY = ΔG ÷ (1 − MPC) − MPC × ΔT ÷ (1 − MPC)\n= 100 ÷ 0.4 − 0.6 × 100 ÷ 0.4 = 250 − 150 = +$100 billion\n(In general, with ΔG = ΔT, ΔY = ΔG × (1 − MPC) ÷ (1 − MPC) = ΔG.)",
      answer: "Rises by $100 billion",
    },
    {
      id: "keynesian-e9", section: "calc", sub: "Multiplier with income taxes", source: "New (Problem Set 10 Q5 style)",
      prompt: "Tax revenue is T = T̄ + tY with marginal tax rate t = 0.25, and the MPC is 0.8. Calculate the multiplier for changes in government purchases (1 d.p.).",
      marks: 3,
      rubric: [
        { point: "States the formula: ΔY/ΔG = 1 ÷ [1 − b(1 − t)]", marks: 1 },
        { point: "Correct working: 0.8 × (1 − 0.25) = 0.6; 1 ÷ (1 − 0.6)", marks: 1 },
        { point: "Correct answer: 2.5", marks: 1 },
      ],
      model: "With T = T̄ + tY, PE = a + b(Y − T̄ − tY) + IP + G, so PE rises by b(1 − t) per $1 of income.\nΔY/ΔG = 1 ÷ [1 − b(1 − t)] = 1 ÷ [1 − 0.8 × 0.75] = 1 ÷ 0.4 = 2.5\n(smaller than the basic multiplier 1 ÷ 0.2 = 5)",
      answer: "2.5",
    },
    {
      id: "keynesian-e10", section: "calc", sub: "Multiplier in an open economy", source: "New (Problem Set 10 Q7 style)",
      prompt: "In an open economy, net exports are NX = e − fY with f = 0.3, and the MPC is 0.8. Calculate the multiplier for changes in government purchases and the change in income from a 40 rise in G.",
      marks: 3,
      rubric: [
        { point: "States the formula: ΔY/ΔG = 1 ÷ (1 − b + f)", marks: 1 },
        { point: "Correct working: 1 ÷ (1 − 0.8 + 0.3) = 1 ÷ 0.5 = 2; 2 × 40", marks: 1 },
        { point: "Correct answer: multiplier 2; income rises by 80", marks: 1 },
      ],
      model: "PE = a + b(Y − T) + IP + G + e − fY, so PE rises by (b − f) per $1 of income.\nΔY/ΔG = 1 ÷ (1 − b + f) = 1 ÷ (1 − 0.8 + 0.3) = 1 ÷ 0.5 = 2\nΔY = 2 × 40 = 80",
      answer: "Multiplier 2; ΔY = 80",
    },

    // ---- short
    {
      id: "keynesian-e11", section: "short", sub: "Planned vs actual expenditure", source: "Lecture 10",
      prompt: "Explain why actual expenditure may differ from planned expenditure.",
      marks: 3,
      rubric: [
        { point: "When actual sales are lower than expected, inventories rise", marks: 1 },
        { point: "This unplanned inventory investment raises actual expenditure above planned expenditure", marks: 1 },
        { point: "When sales are higher than expected, inventories fall: negative unplanned inventory investment makes actual expenditure lower than planned", marks: 1 },
      ],
      model: "Actual expenditure includes changes in inventories that firms did not plan. When actual sales are lower than expected, the stock of inventories rises; this additional inventory investment is unplanned, so actual expenditure is above planned expenditure. When actual sales are higher than expected, the stock of inventories falls; this negative unplanned inventory investment makes actual expenditure lower than planned expenditure.",
    },
    {
      id: "keynesian-e12", section: "short", sub: "Tax multiplier", source: "Lecture 10",
      prompt: "With an MPC of 0.75, a $1 increase in government purchases raises income by $4 but a $1 tax cut raises it by only $3. Explain why the tax multiplier is smaller.",
      marks: 3,
      rubric: [
        { point: "A rise in G directly adds the full $1 to spending in the first round", marks: 1 },
        { point: "Households save part of a tax cut, so first-round spending is only MPC × $1 = $0.75", marks: 1 },
        { point: "After that both follow the same multiplier process: 4 × $1 vs 4 × $0.75 = $3 (tax multiplier = −MPC ÷ (1 − MPC))", marks: 1 },
      ],
      model: "An increase in government purchases adds the full $1 to planned expenditure in the first round. A $1 tax cut raises disposable income by $1, but households save part of it, so first-round spending rises by only MPC × $1 = $0.75. After that, both follow the same multiplier process, so the G change raises income by 1 ÷ (1 − 0.75) × $1 = $4 while the tax cut raises it by 4 × $0.75 = $3, i.e. a tax multiplier of −MPC ÷ (1 − MPC).",
    },
    {
      id: "keynesian-e13", section: "short", sub: "Efficacy of fiscal tools", source: "Lecture 10",
      prompt: "Give three real-world complications that affect the size of the multiplier, stating whether each increases or reduces it.",
      marks: 3,
      rubric: [
        { point: "Investment may rise with income, increasing the multiplier", marks: 1 },
        { point: "Taxes rise as income increases (automatic tax hikes), reducing the multiplier", marks: 1 },
        { point: "Spending on imports causes leakages, lowering the domestic impact / reducing the multiplier", marks: 1 },
      ],
      model: "First, investment may rise with income, which strengthens the feedback loop and increases the multiplier. Second, taxes rise as income increases, so higher income leads to automatic tax hikes that reduce disposable income and reduce the multiplier. Third, spending on imports causes leakages out of the domestic economy, lowering the domestic impact of fiscal policy and reducing the multiplier.",
    },
    {
      id: "keynesian-e14", section: "short", sub: "Targeting tax cuts", source: "Problem Set 10 Q4",
      prompt: "The government is proposing to eliminate a recessionary gap by cutting taxes. To get the largest 'bang for the buck', should it aim the tax cuts at households with a high MPC or a low MPC? Explain.",
      marks: 3,
      rubric: [
        { point: "Target households with a high MPC", marks: 1 },
        { point: "High-MPC households spend more of each dollar of tax cut in the first round (first-round spending = MPC × tax cut)", marks: 1 },
        { point: "The tax multiplier −MPC ÷ (1 − MPC) is larger in size when MPC is higher, so income rises more per dollar", marks: 1 },
      ],
      model: "It should aim the tax cuts at households with a high MPC. A tax cut raises spending in the first round by MPC × the tax cut, so households that consume a larger fraction of extra income add more to planned expenditure. A higher MPC also strengthens every later round of the feedback loop: the tax multiplier −MPC ÷ (1 − MPC) is larger in size. So each dollar of tax cut raises equilibrium income by more.",
    },
    {
      id: "keynesian-e15", section: "short", sub: "Model comparison", source: "Lecture 10",
      prompt: "Compare what happens when households decide to save more in the loanable-funds model and in the Keynesian cross.",
      marks: 3,
      rubric: [
        { point: "Loanable funds: more saving increases funds, lowers interest rates, boosts investment and raises national income", marks: 1 },
        { point: "Keynesian cross: investment is fixed, so PE shifts down and income falls without increasing national saving (paradox of thrift)", marks: 1 },
        { point: "Loanable funds is designed for a fully employed economy; the Keynesian cross is more applicable to recession or depression", marks: 1 },
      ],
      model: "In the loanable-funds model, more saving increases the supply of funds, lowers interest rates, boosts investment and raises national income. In the Keynesian cross, planned investment is fixed, so more saving lowers autonomous consumption, shifts PE down and reduces income, leaving national saving unchanged (the paradox of thrift). The loanable-funds model is designed to explain a fully employed economy, whereas the Keynesian cross is more applicable to an economy in recession or depression.",
    },
    {
      id: "keynesian-e16", section: "short", sub: "Keynesian cross and AD", source: "Lecture 10",
      prompt: "Explain how the theory of liquidity preference and the Keynesian cross together imply a downward-sloping aggregate-demand curve.",
      marks: 3,
      rubric: [
        { point: "A higher P makes people want to hold more money for transactions, raising money demand and (by liquidity preference) the interest rate", marks: 1 },
        { point: "A higher interest rate makes borrowing for capital projects more expensive, so planned investment falls", marks: 1 },
        { point: "In the Keynesian cross, lower IP shifts PE down and reduces equilibrium income: a negative P–Y relationship (AD)", marks: 1 },
      ],
      model: "When the price level rises, people want to hold more money to engage in transactions; by the theory of liquidity preference, this increase in money demand raises the equilibrium interest rate. A higher interest rate makes it more expensive to borrow to finance capital projects, so planned investment falls. In the Keynesian cross, lower planned investment shifts the PE function down and reduces equilibrium income. So a higher price level is associated with lower income: the aggregate-demand curve slopes downward.",
    },
    {
      id: "keynesian-e17", section: "short", sub: "Imports and the multiplier", source: "Problem Set 10 Q7(d)",
      prompt: "Would you expect the government-purchases multiplier to be larger for a large economy such as the United States (imports about 15% of GDP) or a small economy such as Canada (imports about 33% of GDP)? Explain.",
      marks: 3,
      rubric: [
        { point: "Larger for the United States", marks: 1 },
        { point: "Higher income raises spending on imports; with NX = e − fY the multiplier is 1 ÷ (1 − b + f), so a larger f means a smaller multiplier", marks: 1 },
        { point: "Canada spends more of each extra dollar on imports, so leakages are larger and less spending stays in the domestic feedback loop", marks: 1 },
      ],
      model: "The multiplier should be larger for the United States. Higher income leads to higher purchases of imports, so net exports fall as income rises (NX = e − fY), and the multiplier becomes 1 ÷ (1 − b + f). An economy like Canada, where imports are a much larger share of GDP, has a larger f: more of each round of spending leaks abroad. The domestic feedback loop is therefore weaker and its multiplier smaller.",
    },
    {
      id: "keynesian-e18", section: "short", sub: "Big idea", source: "Lecture 10",
      prompt: "Explain Keynes's main insight about economic downturns and how the Keynesian cross relates to it.",
      marks: 3,
      rubric: [
        { point: "Depressed activity in downturns is self-reinforcing: a decline in spending triggers a vicious cycle (lower spending → lower income → lower spending)", marks: 1 },
        { point: "This is a positive feedback loop: a small disturbance amplifies; the solution is to jumpstart spending, which is amplified via the multiplier", marks: 1 },
        { point: "The Keynesian cross provides a mathematical model of this positive feedback loop", marks: 1 },
      ],
      model: "Keynes's main insight is that depressed economic activity during downturns is self-reinforcing: a decline in spending lowers income, which lowers spending further, in a vicious cycle. This is a positive feedback loop, in which a small disturbance in one variable amplifies as it affects related variables, turning small bad news into big bad news. The solution is to jumpstart spending, and the same loop amplifies government spending through the multiplier effect. The Keynesian cross provides a mathematical model of this positive feedback loop.",
    },

    // ---- tf
    {
      id: "keynesian-e19", section: "tf", sub: "Paradox of thrift", source: "Lecture 10",
      prompt: "In the Keynesian cross, when households decide to save more, national saving rises.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: national saving is unchanged", marks: 1 },
        { point: "Saving more lowers a, shifting PE down and reducing equilibrium income", marks: 1 },
        { point: "S = IP, which is fixed, so income falls so much that saving is unchanged: the paradox of thrift", marks: 1 },
      ],
      model: "False. When households try to save more, autonomous consumption a falls, shifting the planned-expenditure function down and reducing equilibrium income. Substituting equilibrium income into S = Y − C − G shows that national saving S = IP, which is fixed. Income falls so much that national saving ends up unchanged: the paradox of thrift.",
    },
    {
      id: "keynesian-e20", section: "tf", sub: "Tax multiplier", source: "Lecture 10",
      prompt: "A $1 tax cut raises equilibrium income by the same amount as a $1 increase in government purchases.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: the tax cut raises income by less", marks: 1 },
        { point: "Households save part of a tax cut, so first-round spending is only MPC × $1", marks: 1 },
        { point: "Tax multiplier −MPC ÷ (1 − MPC) is smaller in size than 1 ÷ (1 − MPC); e.g. MPC 0.75: $3 vs $4", marks: 1 },
      ],
      model: "False. A $1 increase in G adds the full $1 to spending, but households save part of a $1 tax cut, so first-round spending is only MPC × $1. After that both follow the same multiplier process, so the tax multiplier, −MPC ÷ (1 − MPC), is smaller in size than the G multiplier, 1 ÷ (1 − MPC). With MPC = 0.75, the G increase raises income by $4 but the tax cut by only $3.",
    },
    {
      id: "keynesian-e21", section: "tf", sub: "Inventories", source: "Lecture 10",
      prompt: "If actual sales are lower than firms expected, actual expenditure exceeds planned expenditure.",
      tf: true,
      marks: 3,
      rubric: [
        { point: "States True", marks: 1 },
        { point: "Lower-than-expected sales mean the stock of inventories rises", marks: 1 },
        { point: "This additional inventory investment is unplanned, so it raises actual expenditure above planned expenditure", marks: 1 },
      ],
      model: "True. When actual sales are lower than expected, unsold goods add to the stock of inventories. This additional inventory investment is unplanned, so it is counted in actual expenditure but not in planned expenditure. Actual expenditure therefore exceeds planned expenditure, and firms will respond by cutting production.",
    },
    {
      id: "keynesian-e22", section: "tf", sub: "MPC and the multiplier", source: "Lecture 10",
      prompt: "A higher marginal propensity to consume makes the government-purchases multiplier smaller.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: a higher MPC makes the multiplier larger", marks: 1 },
        { point: "Multiplier = 1 ÷ (1 − MPC) = 1 + MPC + MPC² + …, which rises with MPC (e.g. 0.75 → 4, 0.8 → 5)", marks: 1 },
        { point: "A higher MPC means each round of spending is a larger fraction of extra income: a stronger feedback loop", marks: 1 },
      ],
      model: "False. The government-purchases multiplier is 1 ÷ (1 − MPC) = 1 + MPC + MPC² + …, which rises as MPC rises: for example, MPC = 0.75 gives 4 while MPC = 0.8 gives 5. A higher MPC means households spend a larger fraction of each round of extra income, creating a stronger feedback loop. So a higher MPC makes the multiplier larger.",
    },
    {
      id: "keynesian-e23", section: "tf", sub: "Taxes that rise with income", source: "Problem Set 10 Q5",
      prompt: "If tax revenue rises with income (T = T̄ + tY), the multiplier for government purchases is larger than 1 ÷ (1 − MPC).",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: the multiplier is smaller", marks: 1 },
        { point: "Each $1 of income now raises disposable income by only (1 − t), so PE rises by b(1 − t) < b (a flatter PE function)", marks: 1 },
        { point: "Multiplier = 1 ÷ [1 − b(1 − t)], which is smaller than 1 ÷ (1 − b): automatic tax hikes reduce the multiplier", marks: 1 },
      ],
      model: "False. With T = T̄ + tY, each extra $1 of income raises taxes by t × $1, so disposable income rises by only (1 − t) and planned expenditure rises by b(1 − t), less than b. The multiplier becomes 1 ÷ [1 − b(1 − t)], which is smaller than 1 ÷ (1 − b). As the lecture notes, higher income leads to automatic tax hikes, reducing the multiplier.",
    },
    {
      id: "keynesian-e24", section: "tf", sub: "Investment that rises with income", source: "Problem Set 10 Q6",
      prompt: "If planned investment rises with income (IP = c + dY), the multiplier for government purchases is larger than 1 ÷ (1 − MPC).",
      tf: true,
      marks: 3,
      rubric: [
        { point: "States True", marks: 1 },
        { point: "Each $1 of income now raises planned expenditure by b + d (a steeper PE function)", marks: 1 },
        { point: "Multiplier = 1 ÷ (1 − b − d) > 1 ÷ (1 − b): a stronger feedback loop", marks: 1 },
      ],
      model: "True. If planned investment rises by d × $1 when income rises by $1, then planned expenditure rises by b + d per $1 of income instead of b. The multiplier becomes 1 ÷ (1 − b − d), which is larger than 1 ÷ (1 − b) because the denominator is smaller. The feedback loop is stronger, as the lecture notes: investment rising with income increases the multiplier.",
    },
    {
      id: "keynesian-e25", section: "tf", sub: "Equal change in G and T", source: "Problem Set 10 Q3(c)",
      prompt: "In the Keynesian cross, a $100 billion increase in both government purchases and taxes leaves equilibrium income unchanged.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: income rises (by $100b)", marks: 1 },
        { point: "The G increase raises income by ΔG ÷ (1 − MPC); the tax increase lowers it by only MPC × ΔT ÷ (1 − MPC)", marks: 1 },
        { point: "Net effect = ΔG = +$100b (e.g. MPC 0.6: +250 − 150 = +100)", marks: 1 },
      ],
      model: "False. The rise in G raises income by ΔG ÷ (1 − MPC), while the rise in taxes lowers it by MPC × ΔT ÷ (1 − MPC), which is smaller because households pay part of the tax out of saving. With MPC = 0.6, the effects are +$250b and −$150b, so income rises by $100b. In general, an equal increase in G and T raises income by the amount of the G increase.",
    },
    {
      id: "keynesian-e26", section: "tf", sub: "Equilibrium", source: "Lecture 10",
      prompt: "Equilibrium income in the Keynesian cross is always at the full-employment level of output.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "Equilibrium is where PE crosses the 45° line (Y = PE), which depends on a, b, T, IP and G", marks: 1 },
        { point: "Given planned investment and fiscal policy, this can be below full-employment income: a recessionary gap", marks: 1 },
      ],
      model: "False. Equilibrium income in the Keynesian cross is where the planned-expenditure function crosses the 45° line, so that Y = PE; it is determined by a, b, T, IP and G, i.e. Y = (a − bT + IP + G) ÷ (1 − b). Nothing forces this to equal full-employment income. Given the level of planned investment and fiscal policy, the economy can settle at an equilibrium below the full-employment level, leaving a recessionary gap.",
    },

    // ---- diagram
    {
      id: "keynesian-e27", section: "diagram", sub: "Closing a recessionary gap", source: "Lecture 10 / Problem Set 10 Q1",
      prompt: "An economy is in equilibrium below its full-employment level of income. Policymakers decide to increase government purchases.",
      parts: [
        { label: "(a)", prompt: "Draw a clearly labelled Keynesian cross showing the initial equilibrium and the recessionary gap. Explain why the economy settles at this equilibrium.", marks: 5 },
        { label: "(b)", prompt: "On a Keynesian cross, show the effect of the increase in government purchases. Explain why equilibrium income rises by more than the increase in G.", marks: 5 },
      ],
      marks: 10,
      rubric: [
        { point: "(a) Axes: income/output Y (horizontal) and planned expenditure PE (vertical)", marks: 1 },
        { point: "(a) 45° line (Y = PE) and upward-sloping PE function with slope = MPC", marks: 1 },
        { point: "(a) Equilibrium where PE crosses the 45° line, marked Y₁", marks: 1 },
        { point: "(a) Full-employment income to the right of Y₁; the gap labelled as the recessionary gap", marks: 1 },
        { point: "(a) Explains adjustment: above Y₁ inventories pile up and firms cut output; below Y₁ inventories fall and firms raise output", marks: 1 },
        { point: "(b) PE shifts up by ΔG (PE₁ to PE₂)", marks: 1 },
        { point: "(b) New equilibrium at the 45° line, Y₂ > Y₁ (at or toward full employment)", marks: 1 },
        { point: "(b) Higher income raises consumption by MPC × ΔG, then MPC² × ΔG, …", marks: 1 },
        { point: "(b) ΔY = ΔG × 1 ÷ (1 − MPC), larger than ΔG", marks: 1 },
        { point: "(b) Links to the positive feedback loop / multiplier effect", marks: 1 },
      ],
      model: "(a) The Keynesian cross plots planned expenditure against income. Equilibrium is at Y₁, where the PE function (slope = MPC) crosses the 45° line, so Y = PE. Full-employment income lies to the right of Y₁; the shortfall is the recessionary gap. If output were above Y₁, PE would be less than Y, inventories would pile up and firms would cut production; if output were below Y₁, inventories would fall and firms would raise production. So the economy settles at Y₁ even though it is below full employment.\n(b) An increase in government purchases shifts the PE function up by ΔG, from PE₁ to PE₂, and the new equilibrium Y₂ is where PE₂ crosses the 45° line. Income rises by more than ΔG because of the positive feedback loop: the extra G raises income, which raises consumption by MPC × ΔG, which raises income again and consumption by MPC² × ΔG, and so on. In total ΔY = (1 + MPC + MPC² + …)ΔG = ΔG ÷ (1 − MPC). For example, with MPC = 0.75 a gap of 2,000 can be closed with ΔG = 500.",
      diagram: [kcEq, kcGovt],
    },
    {
      id: "keynesian-e28", section: "diagram", sub: "Paradox of thrift", source: "Lecture 10",
      prompt: "Households become pessimistic about the future and decide to save more.",
      parts: [
        { label: "(a)", prompt: "Using a clearly labelled Keynesian cross, show the effect on planned expenditure and equilibrium income.", marks: 5 },
        { label: "(b)", prompt: "Explain what happens to national saving, and why the result differs from the prediction of the loanable-funds model.", marks: 5 },
      ],
      marks: 10,
      rubric: [
        { point: "(a) Axes Y and PE; 45° line", marks: 1 },
        { point: "(a) Initial PE₁ and equilibrium Y₁ where it crosses the 45° line", marks: 1 },
        { point: "(a) Saving more means autonomous consumption a falls in C = a + b(Y − T)", marks: 1 },
        { point: "(a) PE shifts down to PE₂ (parallel, same slope)", marks: 1 },
        { point: "(a) Equilibrium income falls from Y₁ to Y₂ (by more than the fall in a, via the multiplier)", marks: 1 },
        { point: "(b) States S = Y − C − G = (1 − b)Y − a + bT − G", marks: 1 },
        { point: "(b) Substituting equilibrium Y gives S = IP", marks: 1 },
        { point: "(b) Since IP is fixed, national saving is unchanged: income falls so much that saving does not rise (paradox of thrift)", marks: 1 },
        { point: "(b) Loanable funds: more saving lowers r, boosts investment and raises income", marks: 1 },
        { point: "(b) Difference: Keynesian cross holds investment fixed and suits recession/depression; loanable funds is designed for a fully employed economy", marks: 1 },
      ],
      model: "(a) When households decide to save more, autonomous consumption a in C = a + b(Y − T) falls. Because PE = a + b(Y − T) + IP + G, the planned-expenditure function shifts down from PE₁ to PE₂ with the same slope. The new equilibrium, where PE₂ crosses the 45° line, is at Y₂, below Y₁: equilibrium income falls, and through the multiplier it falls by more than the fall in a.\n(b) National saving is S = Y − C − G = (1 − b)Y − a + bT − G. Substituting the equilibrium income Y = (a − bT + IP + G) ÷ (1 − b) gives S = IP. Since planned investment is fixed, national saving is unchanged: people try to save more, but income falls so much that saving does not rise. This is the paradox of thrift. In the loanable-funds model, by contrast, more saving increases the supply of funds, lowers interest rates, boosts investment and raises national income. The models differ because the Keynesian cross holds investment fixed and applies to an economy in recession or depression, while the loanable-funds model is designed for a fully employed economy.",
      diagram: [kcThrift],
    },
    {
      id: "keynesian-e29", section: "diagram", sub: "Deriving aggregate demand", source: "Lecture 10",
      prompt: "The price level rises from P₁ to P₂.",
      parts: [
        { label: "(a)", prompt: "Using a clearly labelled money-market diagram (theory of liquidity preference), show the effect of the rise in P on the interest rate and explain the effect on planned investment.", marks: 5 },
        { label: "(b)", prompt: "Using a clearly labelled Keynesian cross, show the effect on equilibrium income, and use your results to derive the aggregate-demand curve.", marks: 5 },
      ],
      marks: 10,
      rubric: [
        { point: "(a) Axes: interest rate r and quantity of money M; vertical MS", marks: 1 },
        { point: "(a) MD₁ and initial equilibrium r₁", marks: 1 },
        { point: "(a) Higher P: people want more money for transactions, MD shifts right to MD₂", marks: 1 },
        { point: "(a) r rises from r₁ to r₂", marks: 1 },
        { point: "(a) Higher r makes borrowing for capital projects more expensive, so planned investment falls", marks: 1 },
        { point: "(b) Axes Y and PE with 45° line", marks: 1 },
        { point: "(b) Lower IP shifts PE down from PE₁ to PE₂", marks: 1 },
        { point: "(b) Equilibrium income falls from Y₁ to Y₂", marks: 1 },
        { point: "(b) AD diagram: (Y₁, P₁) and (Y₂, P₂) plotted", marks: 1 },
        { point: "(b) Joining them gives a downward-sloping AD curve: negative relationship between P and Y", marks: 1 },
      ],
      model: "(a) In the money market, the money supply is fixed (vertical MS). When the price level rises from P₁ to P₂, people want to hold more money to engage in transactions, so money demand shifts right from MD₁ to MD₂. By the theory of liquidity preference, the equilibrium interest rate rises from r₁ to r₂. A higher interest rate makes it more expensive to borrow to finance capital projects, so planned investment falls.\n(b) In the Keynesian cross, the fall in planned investment shifts the PE function down from PE₁ to PE₂, so equilibrium income (where PE meets the 45° line) falls from Y₁ to Y₂. Plotting the price level against equilibrium income gives point A (Y₁, P₁) and point B (Y₂, P₂). Joining these points shows a negative relationship between the price level and income: the downward-sloping aggregate-demand curve.",
      diagram: [mmPriceRise, kcInvestFall, adDerived],
    },
  ],
};

export default data;
