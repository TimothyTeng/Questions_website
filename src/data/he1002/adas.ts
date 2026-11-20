import type { Graph, TopicData } from "@/lib/he1002/types";

// Lecture 8: Aggregate Demand and Aggregate Supply (+ Problem Set 8 and the exam-document diagram example).
// Grid geometry: LRAS at x = 5; SRAS₁: y = 0.75x + 1.25; AD₁: y = −x + 10 → long-run equilibrium A at (5, 5).

const LRAS = { label: "LRAS", pts: [[5, 0.3], [5, 9.7]] as [number, number][], tone: 1 as const };
const SRAS1_PTS: [number, number][] = [[1, 2], [9, 8]]; // y = 0.75x + 1.25
const AD1_PTS: [number, number][] = [[1, 9], [9, 1]]; // y = −x + 10
const AD_LEFT_PTS: [number, number][] = [[0.5, 7.5], [7.5, 0.5]]; // y = −x + 8 → meets SRAS₁ at (3.86, 4.14), LRAS at (5, 3)
const AD_RIGHT_PTS: [number, number][] = [[3, 9], [9.5, 2.5]]; // y = −x + 12 → meets SRAS₁ at (6.14, 5.86), LRAS at (5, 7)
const SRAS_RIGHT_PTS: [number, number][] = [[1.5, 0.375], [9.5, 6.375]]; // y = 0.75x − 0.75 → meets LRAS at (5, 3)
const SRAS_LEFT_PTS: [number, number][] = [[0.5, 3.625], [8.5, 9.625]]; // y = 0.75x + 3.25 → meets LRAS at (5, 7)
const SRAS_OIL_PTS: [number, number][] = [[0.5, 3.375], [9, 9.75]]; // y = 0.75x + 3 → meets AD₁ at (4, 6), LRAS at (5, 6.75)
const AD_ACCOM_PTS: [number, number][] = [[2.5, 9.25], [9.5, 2.25]]; // y = −x + 11.75 → meets SRAS_OIL on LRAS at (5, 6.75)

const XY = { x: "Real GDP (Y)", y: "Price level (P)" };

const modelGraph: Graph = {
  title: "The model of aggregate demand and aggregate supply",
  ...XY,
  lines: [
    { label: "SRAS", pts: SRAS1_PTS },
    { label: "AD", pts: AD1_PTS, tone: 2 },
  ],
  points: [{ on: ["AD", "SRAS"], label: "E", xTick: "Y₁", yTick: "P₁" }],
  caption: "The intersection of AD and SRAS gives the equilibrium price level and equilibrium output (real GDP).",
};

const adSlope: Graph = {
  title: "The AD curve slopes downward",
  ...XY,
  lines: [{ label: "AD", pts: AD1_PTS, tone: 2 }],
  points: [
    { at: [3, 7], xTick: "Y₂", yTick: "P₂" },
    { at: [6, 4], xTick: "Y₁", yTick: "P₁" },
  ],
  caption: "A fall in P from P₂ to P₁ raises the quantity of goods and services demanded from Y₂ to Y₁ (wealth, interest-rate and exchange-rate effects).",
};

const lrasGraph: Graph = {
  title: "The long-run aggregate-supply curve",
  ...XY,
  lines: [LRAS],
  points: [
    { at: [5, 3], yTick: "P₁" },
    { at: [5, 7], yTick: "P₂", xTick: "YN" },
  ],
  caption: "LRAS is vertical at the natural level of output YN: a change in P does not change labour, capital, natural resources or technology.",
};

const srasGraph: Graph = {
  title: "The short-run aggregate-supply curve",
  ...XY,
  lines: [{ label: "SRAS", pts: SRAS1_PTS }],
  points: [
    { at: [3, 3.5], xTick: "Y₁", yTick: "P₁" },
    { at: [7, 6.5], xTick: "Y₂", yTick: "P₂" },
  ],
  caption: "Over 1–2 years an increase in P from P₁ to P₂ raises the quantity of goods and services supplied from Y₁ to Y₂.",
};

const slopeMatters: Graph = {
  title: "Why the slope of SRAS matters",
  ...XY,
  lines: [
    LRAS,
    { label: "SRAS", pts: SRAS1_PTS },
    { label: "AD low", pts: AD_LEFT_PTS, tone: 3 },
    { label: "AD₁", pts: AD1_PTS, tone: 2 },
    { label: "AD high", pts: AD_RIGHT_PTS, tone: 3 },
  ],
  points: [
    { on: ["AD low", "SRAS"], xTick: "Ylo" },
    { on: ["AD₁", "SRAS"], xTick: "Y₁" },
    { on: ["AD high", "SRAS"], xTick: "Yhi" },
    { on: ["AD low", "LRAS"], yTick: "Plo" },
    { on: ["AD high", "LRAS"], yTick: "Phi" },
  ],
  caption: "Along vertical LRAS, AD shifts change only P; along upward-sloping SRAS, the same AD shifts also change output (Ylo to Yhi) and employment.",
};

const srasEquation: Graph = {
  title: "Y = YN + a(P − PE)",
  ...XY,
  lines: [
    { label: "LRAS", pts: [[5, 0.3], [5, 9.7]], tone: 1, dashed: true },
    { label: "SRAS", pts: SRAS1_PTS },
  ],
  points: [
    { on: ["LRAS", "SRAS"], xTick: "YN", yTick: "PE" },
    { at: [7.5, 6.875], label: "P > PE: Y > YN" },
    { at: [2.5, 3.125], label: "P < PE: Y < YN" },
  ],
  caption: "SRAS passes through (YN, PE): output is above YN when P is above the expected price level and below YN when P is below it.",
};

const srasShift: Graph = {
  title: "A rise in PE shifts SRAS left",
  ...XY,
  lines: [
    LRAS,
    { label: "SRAS₁", pts: SRAS1_PTS, tone: 3 },
    { label: "SRAS₂", pts: SRAS_LEFT_PTS },
  ],
  points: [
    { on: ["LRAS", "SRAS₁"], yTick: "PE₁", xTick: "YN" },
    { on: ["LRAS", "SRAS₂"], yTick: "PE₂" },
  ],
  arrows: [{ from: [7.6, 7], to: [5.2, 7] }],
  caption: "Higher PE → higher nominal wages → production less profitable at each P → less output supplied → SRAS shifts left.",
};

const lrEq: Graph = {
  title: "Long-run equilibrium",
  ...XY,
  lines: [LRAS, { label: "SRAS", pts: SRAS1_PTS }, { label: "AD", pts: AD1_PTS, tone: 2 }],
  points: [{ on: ["AD", "SRAS"], label: "A", xTick: "YN", yTick: "P = PE" }],
  caption: "AD, SRAS and LRAS meet at one point: P = PE, Y = YN, and unemployment is at its natural rate.",
};

// AD falls (stock market crash / pessimism), then SRAS shifts right.
const adLeftSR: Graph = {
  title: "AD shifts left: short run",
  ...XY,
  lines: [
    LRAS,
    { label: "SRAS₁", pts: SRAS1_PTS },
    { label: "AD₁", pts: AD1_PTS, tone: 3 },
    { label: "AD₂", pts: AD_LEFT_PTS, tone: 2 },
  ],
  points: [
    { on: ["AD₁", "SRAS₁"], label: "A", xTick: "YN", yTick: "P₁" },
    { on: ["AD₂", "SRAS₁"], label: "B", xTick: "Y₂", yTick: "P₂" },
  ],
  arrows: [{ from: [7.5, 2.5], to: [5.7, 2.3] }],
  caption: "Lower spending shifts AD left: the short-run equilibrium moves from A to B with lower P and lower Y (unemployment rises).",
};

const adLeftLR: Graph = {
  title: "AD shifts left: long-run adjustment",
  ...XY,
  lines: [
    LRAS,
    { label: "SRAS₁", pts: SRAS1_PTS, tone: 3 },
    { label: "SRAS₂", pts: SRAS_RIGHT_PTS },
    { label: "AD₁", pts: AD1_PTS, tone: 3 },
    { label: "AD₂", pts: AD_LEFT_PTS, tone: 2 },
  ],
  points: [
    { on: ["AD₁", "SRAS₁"], label: "A", yTick: "P₁" },
    { on: ["AD₂", "SRAS₁"], label: "B", xTick: "Y₂", yTick: "P₂" },
    { on: ["AD₂", "SRAS₂"], label: "C", xTick: "YN", yTick: "P₃" },
  ],
  arrows: [{ from: [5.9, 5.5], to: [8.1, 5.5] }],
  caption: "Over time PE falls, wages and prices adjust down, SRAS shifts right and the economy reaches C on LRAS: Y back at YN, P permanently lower.",
};

// AD rises (money supply / optimism / government spending), then SRAS shifts left.
const adRightSR: Graph = {
  title: "AD shifts right: short run",
  ...XY,
  lines: [
    LRAS,
    { label: "SRAS₁", pts: SRAS1_PTS },
    { label: "AD₁", pts: AD1_PTS, tone: 3 },
    { label: "AD₂", pts: AD_RIGHT_PTS, tone: 2 },
  ],
  points: [
    { on: ["AD₁", "SRAS₁"], label: "A", xTick: "YN", yTick: "P₁" },
    { on: ["AD₂", "SRAS₁"], label: "B", xTick: "Y₂", yTick: "P₂" },
  ],
  arrows: [{ from: [7, 3], to: [8.8, 3.2] }],
  caption: "Higher spending shifts AD right: the short-run equilibrium moves from A to B with higher P and higher Y.",
};

const adRightLR: Graph = {
  title: "AD shifts right: long-run adjustment",
  ...XY,
  lines: [
    LRAS,
    { label: "SRAS₁", pts: SRAS1_PTS, tone: 3 },
    { label: "SRAS₂", pts: SRAS_LEFT_PTS },
    { label: "AD₁", pts: AD1_PTS, tone: 3 },
    { label: "AD₂", pts: AD_RIGHT_PTS, tone: 2 },
  ],
  points: [
    { on: ["AD₁", "SRAS₁"], label: "A", yTick: "P₁" },
    { on: ["AD₂", "SRAS₁"], label: "B", xTick: "Y₂", yTick: "P₂" },
    { on: ["AD₂", "SRAS₂"], label: "C", xTick: "YN", yTick: "P₃" },
  ],
  arrows: [{ from: [7.6, 7], to: [5.2, 7] }],
  caption: "Over time PE rises, nominal wages rise, SRAS shifts left and the economy reaches C on LRAS: Y back at YN, P permanently higher.",
};

// SRAS shifts left (oil price rise).
const oilSR: Graph = {
  title: "SRAS shifts left: stagflation",
  ...XY,
  lines: [
    LRAS,
    { label: "SRAS₁", pts: SRAS1_PTS, tone: 3 },
    { label: "SRAS₂", pts: SRAS_OIL_PTS },
    { label: "AD₁", pts: AD1_PTS, tone: 2 },
  ],
  points: [
    { on: ["AD₁", "SRAS₁"], label: "A", xTick: "YN", yTick: "P₁" },
    { on: ["AD₁", "SRAS₂"], label: "B", xTick: "Y₂", yTick: "P₂" },
  ],
  arrows: [{ from: [7.4, 7], to: [5.6, 7] }],
  caption: "Higher costs shift SRAS left: from A to B, P rises and Y falls (stagflation), and unemployment rises.",
};

const oilAccommodate: Graph = {
  title: "Accommodating the SRAS shift",
  ...XY,
  lines: [
    LRAS,
    { label: "SRAS₁", pts: SRAS1_PTS, tone: 3 },
    { label: "SRAS₂", pts: SRAS_OIL_PTS },
    { label: "AD₁", pts: AD1_PTS, tone: 3 },
    { label: "AD₂", pts: AD_ACCOM_PTS, tone: 2 },
  ],
  points: [
    { on: ["AD₁", "SRAS₁"], label: "A", yTick: "P₁" },
    { on: ["AD₁", "SRAS₂"], label: "B", xTick: "Y₂", yTick: "P₂" },
    { on: ["AD₂", "SRAS₂"], label: "C", xTick: "YN", yTick: "P₃" },
  ],
  arrows: [{ from: [7.2, 3], to: [8.5, 3] }],
  caption: "Policymakers raise AD from AD₁ to AD₂: output returns to YN at C, but the price level is permanently higher.",
};

const data: TopicData = {
  id: "adas",

  // ================================================================ sections
  sections: [
    {
      title: "From the long run to the short run",
      intro: "Lectures 1–7 described the economy in the long run. Lectures 8–10 turn to short-run fluctuations around the long-run trend.",
      points: [
        {
          term: "The economy in the long run (recap)",
          text: "Productivity is key to economic growth; the long-run real interest rate is determined by saving and investment; unemployment is frictional and structural; an increase in the money supply affects the price level and inflation rate but has no effect on real variables.",
        },
        {
          term: "The economy in the short run (what comes next)",
          text: "The AD–AS model explains how shifts in AD or AS cause economic fluctuations; monetary and fiscal policy influence AD (economic stabilisation policy); the Keynesian cross shows the economy can be stuck at an equilibrium below full employment.",
        },
      ],
    },
    {
      title: "Three key facts about economic fluctuations",
      points: [
        {
          term: "Fact 1: irregular and unpredictable",
          text: "Economic fluctuations are irregular and unpredictable.",
          eg: "Recessions do not arrive at regular intervals, so you cannot date the next one from past ones.",
        },
        {
          term: "Fact 2: quantities fluctuate together",
          text: "Most macroeconomic quantities fluctuate together.",
          eg: "When real GDP falls, real investment spending falls too.",
        },
        {
          term: "Fact 3: output down, unemployment up",
          text: "As output falls, unemployment rises.",
        },
        {
          term: "Classical theory and the short run",
          text: "The classical dichotomy and monetary neutrality describe the world in the long run, but not the short run. In the short run, changes in nominal variables (like the money supply or P) can affect real variables (like Y or the unemployment rate). So we need a new model.",
        },
      ],
    },
    {
      title: "The model of aggregate demand and aggregate supply",
      points: [
        {
          term: "AD–AS model",
          text: "The model determines the equilibrium price level and equilibrium output (real GDP). The vertical axis is the price level P; the horizontal axis is real GDP, the quantity of output Y.",
        },
        {
          term: "Aggregate demand (AD) curve",
          text: "Shows the quantity of all goods and services demanded in the economy at each price level.",
        },
        {
          term: "Short-run aggregate supply (SRAS) curve",
          text: "Shows the quantity of goods and services firms produce and sell at each price level in the short run. Equilibrium is where AD and SRAS cross.",
        },
      ],
      diagrams: [modelGraph],
    },
    {
      title: "Why the AD curve slopes downward",
      intro: "Y = C + I + G + NX. Assume G is fixed by government policy. To understand the slope of AD, we must determine how a change in P affects C, I and NX.",
      points: [
        {
          term: "Wealth effect (P and C)",
          text: "Suppose P declines: the real value of money increases, consumers are wealthier, consumer spending C increases, so the quantity of goods and services demanded increases.",
          eg: "Prices fall, so the $500 in your account buys more and you spend more.",
        },
        {
          term: "Interest-rate effect (P and I)",
          text: "Suppose P declines: buying goods and services requires fewer dollars, so people reduce their money holdings by buying interest-bearing assets (e.g. bonds). The interest rate decreases, spending on investment goods I increases, so the quantity of goods and services demanded increases.",
        },
        {
          term: "Exchange-rate effect (P and NX)",
          text: "Suppose the US price level P declines: the US interest rate decreases, so some investors seek higher returns by selling American bonds to buy bonds from other countries. The supply of US dollars in the foreign-exchange market increases, the dollar depreciates, which stimulates US net exports NX, so the quantity of goods and services demanded increases.",
        },
      ],
      formulas: [{ name: "Components of aggregate demand", expr: "Y = C + I + G + NX", note: "G is assumed fixed by government policy" }],
      table: [
        ["Effect", "Component affected", "Chain when P falls"],
        ["Wealth effect", "Consumption (C)", "P ↓ → real value of money ↑ → consumers wealthier → C ↑"],
        ["Interest-rate effect", "Investment (I)", "P ↓ → fewer dollars needed → people buy bonds → interest rate ↓ → I ↑"],
        ["Exchange-rate effect", "Net exports (NX)", "P ↓ → interest rate ↓ → investors buy foreign bonds → supply of $ ↑ → $ depreciates → NX ↑"],
      ],
      diagrams: [adSlope],
    },
    {
      title: "Why the AD curve might shift",
      intro: "A change in P moves the economy along the AD curve. Anything else that changes C, I, G or NX at a given price level shifts the whole AD curve.",
      points: [
        { term: "Changes in C", text: "Stock market boom/crash; tax hikes/cuts.", eg: "A stock market crash makes households poorer, so C falls and AD shifts left." },
        {
          term: "Changes in I",
          text: "A faster line of computers induces firms to buy new computer systems; optimism/pessimism about future business conditions; interest rates (monetary policy); tax policy or other tax incentives.",
        },
        { term: "Changes in G", text: "An increase/decrease in government spending on defence, infrastructure, etc." },
        {
          term: "Changes in NX",
          text: "Booms/recessions in countries that buy our exports; appreciation/depreciation resulting from international speculation in the foreign exchange market.",
        },
      ],
      table: [
        ["Component", "Shifts AD right (examples)", "Shifts AD left (examples)"],
        ["C", "Stock market boom, tax cut", "Stock market crash, tax hike, households save more"],
        ["I", "New faster computers, optimism, lower interest rates, investment tax incentives", "Pessimism about business conditions, higher interest rates"],
        ["G", "More spending on defence or infrastructure", "Less government spending"],
        ["NX", "Boom in countries that buy our exports, depreciation", "Recession overseas, appreciation"],
      ],
    },
    {
      title: "The aggregate-supply curves and LRAS",
      points: [
        {
          term: "Aggregate-supply (AS) curve",
          text: "Shows the total quantity of goods and services firms produce and sell at each price level. AS is upward-sloping in the short run and vertical in the long run.",
        },
        {
          term: "Natural level of output (YN)",
          text: "The amount of output the economy produces when unemployment is at its natural rate. Also called potential output or full-employment output.",
        },
        {
          term: "Long-run aggregate-supply curve (LRAS)",
          text: "A vertical line at YN.",
        },
        {
          term: "Why LRAS is vertical",
          text: "YN is determined by the economy's stocks of labour, capital and natural resources, and on the level of technology. An increase in P does not affect any of these, so it does not affect YN (the classical dichotomy).",
        },
      ],
      diagrams: [lrasGraph],
    },
    {
      title: "Why the LRAS curve might shift",
      intro: "Anything that changes the natural level of output shifts LRAS (and SRAS too).",
      points: [
        {
          term: "Changes in labour (L) or the natural rate of unemployment",
          text: "Immigration; changes in the natural unemployment rate from government policies (e.g. more generous unemployment insurance, a new successful job training program).",
          eg: "A wave of immigration raises L → LRAS shifts right.",
        },
        {
          term: "Changes in physical capital (K) or human capital (H)",
          text: "Investment in factories and equipment; investment in human capital; factories destroyed by a hurricane.",
          eg: "A hurricane destroys factories → K falls → LRAS shifts left.",
        },
        {
          term: "Changes in natural resources",
          text: "Discovery of new mineral deposits; reduction in the supply of imported oil; changing weather patterns that affect agricultural production.",
        },
        {
          term: "Changes in technological knowledge",
          text: "Productivity improvements from technological progress.",
          eg: "A new, more powerful computer chip → LRAS shifts right.",
        },
      ],
      table: [
        ["Determinant of YN", "LRAS shifts right", "LRAS shifts left"],
        ["Labour / natural rate of unemployment", "Immigration, successful job training program", "Emigration, more generous unemployment insurance, higher minimum wage"],
        ["Capital (K) and human capital (H)", "Investment in factories, equipment, human capital", "Factories destroyed by a hurricane"],
        ["Natural resources", "Discovery of new mineral deposits", "Less imported oil, bad weather patterns for agriculture"],
        ["Technology", "Technological progress raises productivity", "—"],
      ],
    },
    {
      title: "The short-run aggregate-supply curve",
      points: [
        {
          term: "SRAS is upward sloping",
          text: "In the short run (a period of 1–2 years), an increase in P causes an increase in the quantity of goods and services supplied.",
        },
        {
          term: "Why the slope of SRAS matters",
          text: "If AS is vertical, fluctuations in AD do not cause fluctuations in output or employment (only P changes). If AS slopes up, shifts in AD do affect output and employment.",
        },
      ],
      diagrams: [srasGraph, slopeMatters],
    },
    {
      title: "Three theories of the upward-sloping SRAS",
      intro: "Each theory is built on a short-run imperfection that makes output rise when the actual price level is above the expected price level PE.",
      points: [
        {
          term: "Sticky-wage theory",
          text: "Imperfection: nominal wages are sticky in the short run; they adjust sluggishly, due to labour contracts and social norms. Firms and workers set the nominal wage in advance based on the expected price level, PE. If P > PE, revenue is higher but labour cost is not, so production is more profitable and firms increase output and employment. Hence higher P causes higher Y.",
        },
        {
          term: "Sticky-price theory",
          text: "Imperfection: many prices are sticky in the short run, due to menu costs (the costs of adjusting prices, e.g. printing new menus, the time required to change price tags). Firms set sticky prices in advance based on PE. If the Fed increases the money supply unexpectedly, P will rise in the long run; in the short run, firms without menu costs raise prices immediately, while firms with menu costs wait. Their relatively low prices increase demand for their products, so they increase output and employment. Hence higher P is associated with higher Y.",
        },
        {
          term: "Misperceptions theory",
          text: "Imperfection: firms may confuse changes in P with changes in the relative price of the products they sell. If P rises above PE, a firm sees its own price rise before realising all prices are rising, believes its relative price is rising, and increases output and employment. So an increase in P can cause an increase in Y.",
        },
        {
          term: "Expected price level (PE)",
          text: "The price level that firms and workers expect, used to set nominal wages and sticky prices in advance.",
        },
      ],
      table: [
        ["Theory", "Imperfection", "Why P > PE raises Y", "How it disappears over time"],
        ["Sticky-wage", "Nominal wages set in advance on PE (contracts, social norms)", "Revenue up but labour cost not → more profitable → more output", "Wages are renegotiated and become flexible"],
        ["Sticky-price", "Menu costs keep some prices fixed (set on PE)", "Firms with sticky, relatively low prices see higher demand → more output", "Firms eventually adjust their prices"],
        ["Misperceptions", "Firms confuse a rise in P with a rise in their relative price", "Firm thinks its relative price rose → more output", "Misperceptions are corrected"],
      ],
    },
    {
      title: "What the three theories have in common: SRAS and LRAS",
      points: [
        {
          term: "Common result",
          text: "In all three theories, Y deviates from YN when P deviates from PE: Y = YN + a(P − PE).",
        },
        {
          term: "The terms of the equation",
          text: "Y = quantity of output supplied; YN = natural rate of output (long-run); a > 0 measures how much Y responds to unexpected changes in P; P = actual price level; PE = expected price level.",
        },
        {
          term: "Reading the equation",
          text: "When P > PE, Y > YN. When P < PE, Y < YN. When P = PE, Y = YN.",
        },
        {
          term: "SRAS and LRAS",
          text: "The imperfections in these theories are temporary. Over time, sticky wages and prices become flexible and misperceptions are corrected. In the long run PE = P, so Y = YN and the AS curve is vertical.",
        },
      ],
      formulas: [
        { name: "Short-run aggregate supply", expr: "Y = YN + a × (P − PE)", note: "a > 0" },
        { name: "Rearranged for P", expr: "P = PE + (Y − YN) ÷ a" },
        { name: "Long run", expr: "PE = P, so Y = YN" },
      ],
      worked: [
        {
          problem: "YN = 2,000, a = 100, PE = 100. The actual price level turns out to be 103. Find the quantity of output supplied.",
          solution: "Y = YN + a × (P − PE)\n= 2,000 + 100 × (103 − 100)\n= 2,000 + 300 = 2,300\nP is above PE, so output is above the natural level.",
        },
        {
          problem: "YN = 1,000, a = 40, PE = 100. Output is 920. What is the actual price level?",
          solution: "Y = YN + a × (P − PE)\n920 = 1,000 + 40 × (P − 100)\n40 × (P − 100) = −80 → P − 100 = −2\nP = 98 (below PE, so Y is below YN).",
        },
      ],
      diagrams: [srasEquation],
    },
    {
      title: "Why the SRAS curve might shift",
      points: [
        {
          term: "Everything that shifts LRAS shifts SRAS too",
          text: "Changes in labour, capital, natural resources or technology shift both curves.",
        },
        {
          term: "PE shifts SRAS",
          text: "If PE rises, workers and firms set higher wages. At each P, production is less profitable, Y falls, so SRAS shifts left. (A fall in PE shifts SRAS right.)",
        },
        {
          term: "Shifts in SRAS from costs",
          text: "An increase in costs such as oil prices shifts SRAS left (with LRAS assumed constant).",
        },
      ],
      table: [
        ["Event", "SRAS", "LRAS"],
        ["Rise in the expected price level PE", "Shifts left", "No change"],
        ["Fall in the expected price level PE", "Shifts right", "No change"],
        ["Increase in oil prices (costs)", "Shifts left", "Assumed constant"],
        ["Immigration, new capital, new resources, better technology", "Shifts right", "Shifts right"],
      ],
      diagrams: [srasShift],
    },
    {
      title: "The long-run equilibrium",
      points: [
        {
          term: "Long-run equilibrium",
          text: "Where AD, SRAS and LRAS intersect: PE = P, Y = YN, and unemployment is at its natural rate.",
        },
        {
          term: "Analysing a fluctuation (the lecture's steps)",
          text: "1. Decide which curve the event affects (AD or SRAS). 2. Decide the direction of the shift. 3. Find the new short-run equilibrium and the effect on P, Y and unemployment. 4. Show the transition to the new long-run equilibrium as PE adjusts and SRAS shifts.",
        },
      ],
      diagrams: [lrEq],
    },
    {
      title: "Causes of fluctuations: a shift in AD",
      intro: "Lecture example: a stock market crash.",
      points: [
        { term: "Step 1", text: "The crash affects consumption C, so it affects the AD curve." },
        { term: "Step 2", text: "C falls, so AD shifts left." },
        { term: "Step 3 (short run)", text: "Short-run equilibrium at B: P and Y are lower, and unemployment is higher." },
        {
          term: "Step 4 (long run)",
          text: "Over time, PE falls (people expect the lower price level), nominal wages and prices adjust down, and SRAS shifts right until the long-run equilibrium at C. Y and unemployment are back at their initial levels; P is lower.",
        },
        {
          term: "An increase in AD",
          text: "Works the same way in reverse: e.g. an increase in the money supply or government spending shifts AD right; in the short run P and Y rise; over time PE rises, wages rise, SRAS shifts left, and in the long run Y returns to YN at a permanently higher P.",
        },
      ],
      diagrams: [adLeftSR, adLeftLR],
      worked: [
        {
          problem: "(Problem Set 8 Q3) The central bank raises the money supply by 5%. Using the sticky-wage theory, compare nominal and real wages at A (initial long-run equilibrium), B (new short-run equilibrium) and C (new long-run equilibrium).",
          solution: "A → B: AD shifts right; P rises and Y rises above YN.\nB → C: PE rises, so new wage contracts set higher nominal wages; SRAS shifts left until Y = YN with P about 5% higher than at A.\nNominal wage: A = B (wages are sticky in the short run); C is higher than A (up by about 5%).\nReal wage (W ÷ P): at B lower than A (same W, higher P); at C the same as A (W and P both up by the same %).\nSo money has real effects in the short run but is neutral in the long run.",
        },
        {
          problem: "(Problem Set 8 Q9) Explain the short-run and long-run effects on P and Y of: (a) a sharp fall in the stock market; (b) higher government defence spending; (c) a technological improvement; (d) a recession overseas.",
          solution: "(a) C falls → AD left. SR: P ↓, Y ↓. LR: SRAS shifts right, Y back to YN, P lower.\n(b) G rises → AD right. SR: P ↑, Y ↑. LR: SRAS shifts left, Y back to YN, P higher.\n(c) Technology → LRAS and SRAS shift right. SR: P ↓, Y ↑. LR: Y higher (new YN), P lower.\n(d) Foreigners buy fewer of our goods → NX falls → AD left. Same as (a): SR P ↓, Y ↓; LR Y back to YN, P lower.",
        },
      ],
    },
    {
      title: "Causes of fluctuations: a shift in SRAS",
      intro: "Lecture example: an increase in oil prices (assume LRAS is constant).",
      points: [
        { term: "Step 1", text: "Higher oil prices increase costs, which shifts SRAS." },
        { term: "Step 2", text: "SRAS shifts left." },
        { term: "Step 3 (short run)", text: "Short-run equilibrium at B: P higher, Y lower, unemployment higher." },
        {
          term: "Stagflation",
          text: "A period of falling output and rising prices: the move from A to B.",
        },
        {
          term: "Step 4a: policymakers do nothing",
          text: "Low employment causes wages to fall, so SRAS shifts right until the long-run equilibrium is back at A (original P and Y).",
        },
        {
          term: "Step 4b: accommodating the shift",
          text: "Policymakers could use fiscal or monetary policy to increase AD and accommodate the AS shift: Y goes back to YN, but P is permanently higher.",
        },
      ],
      diagrams: [oilSR, oilAccommodate],
      table: [
        ["Shift", "Short run: P", "Short run: Y (and unemployment)", "Long run (no policy)"],
        ["AD left (e.g. stock market crash, pessimism)", "Falls", "Falls (unemployment rises)", "SRAS shifts right; Y = YN, P lower"],
        ["AD right (e.g. more money, higher G, optimism)", "Rises", "Rises (unemployment falls)", "SRAS shifts left; Y = YN, P higher"],
        ["SRAS left (e.g. oil price rise)", "Rises", "Falls (unemployment rises): stagflation", "Wages fall, SRAS shifts back right; back to original P and Y"],
        ["SRAS left + accommodation (AD right)", "Rises further", "Back to YN", "P permanently higher"],
      ],
    },
  ],

  // ================================================================ flashcards
  flashcards: [
    { id: "adas-c1", type: "concept", front: "The model that determines the equilibrium price level and equilibrium real GDP, used to explain short-run economic fluctuations.", back: "Model of aggregate demand and aggregate supply (AD–AS model)", why: "Its curves are AD, SRAS and LRAS; P is on the vertical axis and real GDP on the horizontal axis." },
    { id: "adas-c2", type: "concept", front: "Curve showing the quantity of all goods and services demanded in the economy at each price level.", back: "Aggregate-demand curve (AD)", why: "It slopes down because of the wealth, interest-rate and exchange-rate effects." },
    { id: "adas-c3", type: "concept", front: "A fall in P raises the real value of money, consumers feel wealthier and increase consumer spending.", back: "Wealth effect", why: "It links P to consumption C." },
    { id: "adas-c4", type: "concept", front: "A fall in P means fewer dollars are needed, people buy interest-bearing bonds, the interest rate falls and investment spending rises.", back: "Interest-rate effect", why: "It links P to investment I." },
    { id: "adas-c5", type: "concept", front: "A fall in the domestic P lowers the interest rate, investors buy foreign bonds, the currency depreciates and net exports rise.", back: "Exchange-rate effect", why: "It links P to net exports NX." },
    { id: "adas-c6", type: "concept", front: "The spending component that the wealth effect works through.", back: "Consumption (C)", why: "Lower P → real value of money up → consumers wealthier → C up." },
    { id: "adas-c7", type: "concept", front: "The spending component that the interest-rate effect works through.", back: "Investment (I)", why: "Lower P → lower interest rate → more spending on investment goods." },
    { id: "adas-c8", type: "concept", front: "The spending component that the exchange-rate effect works through.", back: "Net exports (NX)", why: "Lower P → lower interest rate → currency depreciates → NX up." },
    { id: "adas-c9", type: "concept", front: "What happens to a currency when its supply in the foreign-exchange market increases, as in the exchange-rate effect.", back: "Depreciation / It depreciates", why: "A cheaper currency stimulates net exports." },
    { id: "adas-c10", type: "concept", front: "Curve showing the total quantity of goods and services firms produce and sell at each price level; upward-sloping in the short run, vertical in the long run.", back: "Aggregate-supply curve (AS)", why: "The short-run version is SRAS; the long-run version is LRAS." },
    { id: "adas-c11", type: "concept", front: "The amount of output the economy produces when unemployment is at its natural rate.", back: "Natural level of output (YN)", why: "It is determined by labour, capital, natural resources and technology." },
    { id: "adas-c12", type: "concept", front: "Two other names for the natural level of output.", back: "Potential output / Full-employment output", why: "Both describe output when unemployment is at its natural rate." },
    { id: "adas-c13", type: "concept", front: "The vertical aggregate-supply curve at the natural level of output.", back: "Long-run aggregate-supply curve (LRAS)", why: "Vertical because a change in P does not change labour, capital, natural resources or technology." },
    { id: "adas-c14", type: "concept", front: "The upward-sloping aggregate-supply curve that applies over a period of 1–2 years.", back: "Short-run aggregate-supply curve (SRAS)", why: "Higher P raises the quantity supplied because of sticky wages, sticky prices or misperceptions." },
    { id: "adas-c15", type: "concept", front: "The length of the 'short run' over which the SRAS curve slopes upward.", back: "1–2 years", why: "Beyond that, the imperfections behind SRAS disappear and AS is vertical." },
    { id: "adas-c16", type: "concept", front: "Theory of SRAS: nominal wages adjust sluggishly because of labour contracts and social norms, and are set in advance on the expected price level.", back: "Sticky-wage theory", why: "If P > PE, revenue rises but labour cost does not, so firms produce more." },
    { id: "adas-c17", type: "concept", front: "Theory of SRAS: many prices adjust slowly because of menu costs, so firms with fixed, relatively low prices see higher demand.", back: "Sticky-price theory", why: "Firms without menu costs raise prices at once; those with menu costs wait and sell more." },
    { id: "adas-c18", type: "concept", front: "Theory of SRAS: firms confuse a change in the overall price level with a change in the relative price of their own product.", back: "Misperceptions theory", why: "A firm sees its price rise before realising all prices are rising, so it raises output." },
    { id: "adas-c19", type: "concept", front: "The costs of adjusting prices, e.g. printing new menus or the time required to change price tags.", back: "Menu costs", why: "They are the imperfection behind the sticky-price theory." },
    { id: "adas-c20", type: "concept", front: "The price level that workers and firms anticipate when they set nominal wages and prices in advance.", back: "Expected price level (PE)", why: "In the long run it equals the actual price level P." },
    { id: "adas-c21", type: "concept", front: "In Y = YN + a(P − PE), the positive number that measures how much output responds to unexpected changes in P.", back: "a", why: "The bigger a, the flatter the SRAS curve: output reacts more to price surprises." },
    { id: "adas-c22", type: "concept", front: "The aggregate-supply curve that shifts left when the expected price level rises.", back: "SRAS", why: "Higher PE → higher wages → production less profitable at each P → less output." },
    { id: "adas-c23", type: "concept", front: "The situation where AD, SRAS and LRAS intersect: P = PE, Y = YN and unemployment is at its natural rate.", back: "Long-run equilibrium", why: "The economy returns here after a shock once wages, prices and perceptions adjust." },
    { id: "adas-c24", type: "concept", front: "A period of falling output and rising prices.", back: "Stagflation", why: "Caused by a leftward shift of SRAS, e.g. an increase in oil prices." },
    { id: "adas-c25", type: "concept", front: "Using fiscal or monetary policy to increase AD after SRAS shifts left, so output returns to YN but the price level stays permanently higher.", back: "Accommodating the supply shift / Accommodation", why: "The alternative is to do nothing and wait for wages to fall." },
    { id: "adas-c26", type: "concept", front: "The idea that real variables are independent of nominal variables, which describes the long run but not the short run.", back: "Classical dichotomy", why: "It is why LRAS is vertical: P does not affect YN." },
    { id: "adas-c27", type: "concept", front: "The equation for aggregate demand in terms of spending components.", back: "Y = C + I + G + NX", why: "G is assumed fixed by policy; P affects C, I and NX." },

    { id: "adas-c28", type: "scenario", front: "The economy is in long-run equilibrium. The stock market crashes. What happens to P, Y and unemployment in the short run and the long run?", back: "SR: P and Y fall, unemployment rises. LR: Y and unemployment return to normal, P is lower.", why: "The crash lowers wealth so C falls and AD shifts left; the short-run equilibrium (B) is on SRAS₁ at lower P and Y. Over time PE falls, wages and prices adjust down, SRAS shifts right until the new long-run equilibrium (C) on LRAS at a lower P." },
    { id: "adas-c29", type: "scenario", front: "Firms become optimistic about future business conditions and invest heavily. What happens to P and Y in the short run and the long run?", back: "SR: P and Y rise. LR: Y back to YN, P higher.", why: "I rises, so AD shifts right: P and Y rise along SRAS. Over time PE rises, nominal wages rise, SRAS shifts left until Y = YN at a higher P. (New capital may also shift LRAS right in the long run.)" },
    { id: "adas-c30", type: "scenario", front: "Oil prices rise sharply and policymakers do nothing. What happens to P, Y and unemployment in the short run and in the long run?", back: "SR: stagflation — P up, Y down, unemployment up. LR: back to the original P and Y.", why: "Higher costs shift SRAS left (A → B). With no policy response, low employment causes wages to fall, so SRAS shifts back right until the economy is at A again." },
    { id: "adas-c31", type: "scenario", front: "After an oil-price rise shifts SRAS left, the central bank increases the money supply to raise AD. What is the long-run outcome?", back: "Output returns to YN, but the price level is permanently higher.", why: "This is accommodating the AS shift: AD shifts right to meet the new SRAS on LRAS, so Y is restored without waiting for wages to fall, at the cost of a higher P." },
    { id: "adas-c32", type: "scenario", front: "A large wave of immigration increases the labour force. Which curves shift and which way?", back: "LRAS and SRAS shift right.", why: "More labour raises the natural level of output YN; everything that shifts LRAS shifts SRAS too." },
    { id: "adas-c33", type: "scenario", front: "A severe hurricane destroys many factories. What happens to LRAS?", back: "LRAS shifts left (SRAS too).", why: "The capital stock K falls, lowering YN." },
    { id: "adas-c34", type: "scenario", front: "A new central bank chair is known for thinking inflation is not a major problem. People raise their expected price level. What happens to SRAS, P and Y (AD unchanged)?", back: "SRAS shifts left: P rises and Y falls.", why: "Higher PE → workers and firms agree higher nominal wages → production less profitable at each P → SRAS shifts left → higher P and lower output." },
    { id: "adas-c35", type: "scenario", front: "A recession overseas causes foreigners to buy fewer of our goods. What happens to P and Y in the short run and the long run?", back: "SR: P and Y fall. LR: Y back to YN, P lower.", why: "NX falls so AD shifts left; P and Y fall along SRAS. Over time PE falls, SRAS shifts right, and Y returns to YN at a lower P." },
    { id: "adas-c36", type: "scenario", front: "The government increases spending on national defence. What happens to P and Y in the short run and the long run?", back: "SR: P and Y rise. LR: Y back to YN, P higher.", why: "G rises so AD shifts right. In the long run PE and wages rise, SRAS shifts left, and only the price level stays higher." },
    { id: "adas-c37", type: "scenario", front: "A technological improvement raises productivity. What happens to P and Y?", back: "Y rises and P falls (in both the short and long run, with AD unchanged).", why: "Technology raises YN, so LRAS and SRAS both shift right; the new equilibrium on AD has higher output and a lower price level." },
    { id: "adas-c38", type: "scenario", front: "Households decide to save a larger share of their income. Which curve shifts and which way?", back: "AD shifts left.", why: "Saving more means consumption C falls at every price level, so AD shifts left: in the short run P and Y fall." },
    { id: "adas-c39", type: "scenario", front: "YN = 1,000, a = 50 and PE = 100. The actual price level is 104. How much output is supplied?", back: "Y = 1,200", why: "Y = YN + a(P − PE) = 1,000 + 50 × 4 = 1,200. P is above PE, so output is above the natural level." },
    { id: "adas-c40", type: "scenario", front: "The central bank raises the money supply by 5%. Under the sticky-wage theory, what happens to nominal and real wages in the short run and the long run?", back: "SR: nominal wage unchanged, real wage falls. LR: nominal wage up 5%, real wage back to its original level.", why: "Wages are sticky, so W stays put while P rises (real wage W/P falls). In the long run PE rises, wages rise in line with P, and money is neutral." },
    { id: "adas-c41", type: "scenario", front: "An economist says she can predict exactly when the next recession will start because recessions come every 7 years. Which fact about fluctuations contradicts her?", back: "Economic fluctuations are irregular and unpredictable (Fact 1).", why: "The other two facts: most macroeconomic quantities fluctuate together, and as output falls unemployment rises." },
    { id: "adas-c42", type: "scenario", front: "Real GDP falls sharply in a recession. What would you expect to happen to investment spending and to the unemployment rate?", back: "Investment falls too; unemployment rises.", why: "Fact 2: most macroeconomic quantities fluctuate together. Fact 3: as output falls, unemployment rises." },
    { id: "adas-c43", type: "scenario", front: "A government wants to raise the natural level of output. Which four things determine YN that it could try to increase?", back: "Labour, capital (physical and human), natural resources and technology.", why: "YN depends on these stocks and on technology, not on the price level, which is why LRAS is vertical." },
  ],

  // ================================================================ quiz
  quiz: [
    { id: "adas-q1", kind: "fill", sub: "Facts about fluctuations", prompt: "Fact 1: economic fluctuations are irregular and ____.", answers: [["unpredictable"]], explain: "They cannot be forecast from a regular cycle." },
    { id: "adas-q2", kind: "fill", sub: "Facts about fluctuations", prompt: "Fact 2: most macroeconomic quantities fluctuate ____.", answers: [["together"]], explain: "E.g. real GDP and real investment rise and fall together." },
    { id: "adas-q3", kind: "fill", sub: "Facts about fluctuations", prompt: "Fact 3: as output falls, ____ rises.", answers: [["unemployment", "the unemployment rate", "unemployment rate"]], explain: "Output and unemployment move in opposite directions." },
    { id: "adas-q4", kind: "fill", sub: "Short run vs long run", prompt: "The classical dichotomy and monetary neutrality describe the world in the ____ run, but not the short run.", answers: [["long"]], explain: "In the short run, nominal variables can affect real variables." },
    { id: "adas-q5", kind: "fill", sub: "Short run vs long run", prompt: "In the short run, changes in nominal variables like the money supply or P can affect ____ variables like Y or the unemployment rate.", answers: [["real"]], explain: "That is why we need the AD–AS model." },
    { id: "adas-q6", kind: "fill", sub: "AD–AS model", prompt: "The AD–AS model determines the equilibrium price level and equilibrium ____.", answers: [["output", "real GDP", "Y"]], explain: "Where AD crosses SRAS." },
    { id: "adas-q7", kind: "fill", sub: "AD curve", prompt: "The AD curve shows the quantity of all goods and services ____ in the economy at each price level.", answers: [["demanded"]], explain: "Aggregate demand = total quantity demanded." },
    { id: "adas-q8", kind: "fill", sub: "AD curve", prompt: "Aggregate demand: Y = C + I + ____ + NX.", answers: [["G", "government purchases", "government spending"]], explain: "To study the AD slope we assume G is fixed by government policy." },
    { id: "adas-q9", kind: "fill", sub: "Wealth effect", prompt: "Wealth effect: a fall in P increases the real value of ____, so consumers are wealthier.", answers: [["money"]], explain: "Consumers then increase consumer spending C." },
    { id: "adas-q10", kind: "fill", sub: "Wealth effect", prompt: "The wealth effect links the price level to ____ spending.", answers: [["consumer", "consumption", "C"]], explain: "P ↓ → wealthier → C ↑." },
    { id: "adas-q11", kind: "fill", sub: "Interest-rate effect", prompt: "Interest-rate effect: when P falls, people reduce money holdings by buying bonds, so the interest rate ____.", answers: [["falls", "decreases", "drops", "declines", "goes down", "fall", "decrease"]], explain: "A lower interest rate raises investment spending." },
    { id: "adas-q12", kind: "fill", sub: "Interest-rate effect", prompt: "The interest-rate effect increases spending on ____ goods.", answers: [["investment", "I"]], explain: "Lower interest rates encourage investment I." },
    { id: "adas-q13", kind: "fill", sub: "Exchange-rate effect", prompt: "Exchange-rate effect: when the US price level falls, the supply of US dollars in the foreign-exchange market rises and the dollar ____.", answers: [["depreciates", "depreciate", "falls in value", "weakens"]], explain: "Investors sell US bonds to buy foreign bonds." },
    { id: "adas-q14", kind: "fill", sub: "Exchange-rate effect", prompt: "A depreciating dollar stimulates US ____.", answers: [["net exports", "NX", "exports"]], explain: "Increasing the quantity of goods and services demanded." },
    { id: "adas-q15", kind: "fill", sub: "AD shifts", prompt: "A stock market boom raises consumption and shifts AD to the ____.", answers: [["right", "rightward"]], explain: "Changes in C shift AD." },
    { id: "adas-q16", kind: "fill", sub: "AD shifts", prompt: "A tax hike on households reduces consumption and shifts AD to the ____.", answers: [["left", "leftward"]], explain: "Tax hikes/cuts are listed under changes in C." },
    { id: "adas-q17", kind: "fill", sub: "AD shifts", prompt: "Pessimism about future business conditions reduces ____ spending and shifts AD left.", answers: [["investment", "I"]], explain: "Optimism/pessimism is a cause of changes in I." },
    { id: "adas-q18", kind: "fill", sub: "AD shifts", prompt: "A recession in countries that buy our exports reduces ____ and shifts AD left.", answers: [["net exports", "NX", "exports"]], explain: "Booms/recessions abroad change NX." },
    { id: "adas-q19", kind: "fill", sub: "AS curves", prompt: "The AS curve is upward-sloping in the short run and ____ in the long run.", answers: [["vertical"]], explain: "LRAS is vertical at YN." },
    { id: "adas-q20", kind: "fill", sub: "LRAS", prompt: "The natural level of output is the output produced when unemployment is at its ____ rate.", answers: [["natural"]], explain: "YN: the position of LRAS." },
    { id: "adas-q21", kind: "fill", sub: "LRAS", prompt: "The natural level of output is also called potential output or ____ output.", answers: [["full-employment", "full employment"]], explain: "All three names mean YN." },
    { id: "adas-q22", kind: "fill", sub: "LRAS", prompt: "YN is determined by the economy's stocks of labour, capital and natural resources and the level of ____.", answers: [["technology", "technological knowledge"]], explain: "None of these depends on P." },
    { id: "adas-q23", kind: "fill", sub: "LRAS", prompt: "LRAS is vertical because an increase in P does not affect YN, an application of the ____ dichotomy.", answers: [["classical"]], explain: "Real variables are independent of nominal variables in the long run." },
    { id: "adas-q24", kind: "fill", sub: "LRAS shifts", prompt: "A wave of immigration shifts LRAS to the ____.", answers: [["right", "rightward"]], explain: "More labour raises YN." },
    { id: "adas-q25", kind: "fill", sub: "LRAS shifts", prompt: "More generous unemployment insurance raises the natural rate of unemployment, shifting LRAS to the ____.", answers: [["left", "leftward"]], explain: "A higher natural u-rate lowers YN." },
    { id: "adas-q26", kind: "fill", sub: "LRAS shifts", prompt: "Factories destroyed by a hurricane reduce the stock of ____, shifting LRAS left.", answers: [["capital", "K", "physical capital"]], explain: "Changes in K or H shift LRAS." },
    { id: "adas-q27", kind: "fill", sub: "LRAS shifts", prompt: "The discovery of new mineral deposits is a change in ____ that shifts LRAS right.", answers: [["natural resources", "resources"]], explain: "So are less imported oil and changing weather patterns (leftward)." },
    { id: "adas-q28", kind: "fill", sub: "SRAS", prompt: "In the short run (a period of 1–____ years), an increase in P causes an increase in the quantity of goods and services supplied.", answers: [["2", "two"]], explain: "SRAS slopes upward over 1–2 years." },
    { id: "adas-q29", kind: "fill", sub: "SRAS", prompt: "If AS is vertical, fluctuations in AD do not cause fluctuations in output or ____.", answers: [["employment", "unemployment"]], explain: "Only P changes. If AS slopes up, AD shifts affect output and employment." },
    { id: "adas-q30", kind: "fill", sub: "Sticky-wage theory", prompt: "Sticky-wage theory: nominal wages adjust ____ in the short run, due to labour contracts and social norms.", answers: [["sluggishly", "slowly"]], explain: "Nominal wages are sticky." },
    { id: "adas-q31", kind: "fill", sub: "Sticky-wage theory", prompt: "Firms and workers set the nominal wage in advance based on the ____ price level.", answers: [["expected"]], explain: "PE, the expected price level." },
    { id: "adas-q32", kind: "fill", sub: "Sticky-wage theory", prompt: "Sticky-wage theory: if P > PE, revenue is higher but ____ cost is not, so firms increase output.", answers: [["labour", "labor", "wage"]], explain: "Production is more profitable." },
    { id: "adas-q33", kind: "fill", sub: "Sticky-price theory", prompt: "Sticky-price theory: many prices are sticky because of ____ costs.", answers: [["menu"]], explain: "The costs of adjusting prices." },
    { id: "adas-q34", kind: "fill", sub: "Sticky-price theory", prompt: "After an unexpected rise in the money supply, firms with menu costs keep relatively ____ prices, so demand for their products rises.", answers: [["low", "lower"]], explain: "They increase output and employment." },
    { id: "adas-q35", kind: "fill", sub: "Misperceptions theory", prompt: "Misperceptions theory: firms may confuse changes in P with changes in the ____ price of the products they sell.", answers: [["relative"]], explain: "A firm thinks its relative price is rising and increases output." },
    { id: "adas-q36", kind: "fill", sub: "SRAS equation", prompt: "In all three theories, Y = YN + a(P − ____).", answers: [["PE", "expected price level", "P E", "Pe"]], explain: "Y deviates from YN when P deviates from PE." },
    { id: "adas-q37", kind: "fill", sub: "SRAS equation", prompt: "In Y = YN + a(P − PE), the parameter a is ____ than zero.", answers: [["greater", "bigger", "larger", "more"]], explain: "a > 0 measures how much Y responds to unexpected changes in P." },
    { id: "adas-q38", kind: "fill", sub: "SRAS equation", prompt: "When the actual price level is below the expected price level, output is ____ than YN.", answers: [["less", "lower", "smaller", "below"]], explain: "P < PE → Y < YN." },
    { id: "adas-q39", kind: "fill", sub: "SRAS equation", prompt: "YN = 2,000, a = 100, PE = 100 and P = 103. Output supplied is Y = ____.", answers: [["2300", "2,300"]], explain: "Y = 2,000 + 100 × (103 − 100) = 2,300." },
    { id: "adas-q40", kind: "fill", sub: "SRAS equation", prompt: "YN = 1,000, a = 25, PE = 100 and output is 950. The actual price level is ____.", answers: [["98"]], explain: "950 = 1,000 + 25(P − 100) → P − 100 = −2 → P = 98." },
    { id: "adas-q41", kind: "fill", sub: "SRAS and LRAS", prompt: "Over time, sticky wages and prices become flexible and misperceptions are ____.", answers: [["corrected", "fixed"]], explain: "The imperfections are temporary." },
    { id: "adas-q42", kind: "fill", sub: "SRAS and LRAS", prompt: "In the long run, PE = ____, so Y = YN and the AS curve is vertical.", answers: [["P", "price level", "actual price level"]], explain: "No price surprises in the long run." },
    { id: "adas-q43", kind: "fill", sub: "SRAS shifts", prompt: "If PE rises, workers and firms set higher wages, production is less profitable at each P, and SRAS shifts ____.", answers: [["left", "leftward"]], explain: "A fall in PE shifts SRAS right." },
    { id: "adas-q44", kind: "fill", sub: "SRAS shifts", prompt: "Everything that shifts LRAS also shifts ____.", answers: [["SRAS", "short-run aggregate supply", "the SRAS curve"]], explain: "Labour, capital, natural resources and technology affect both." },
    { id: "adas-q45", kind: "fill", sub: "Long-run equilibrium", prompt: "In the long-run equilibrium, PE = P, Y = YN and unemployment is at its ____ rate.", answers: [["natural"]], explain: "AD, SRAS and LRAS meet at one point." },
    { id: "adas-q46", kind: "fill", sub: "AD shift", prompt: "After a stock market crash, in the short run P and Y are lower and unemployment is ____.", answers: [["higher", "rises", "up", "increases", "greater"]], explain: "AD shifts left; the economy moves down SRAS." },
    { id: "adas-q47", kind: "fill", sub: "AD shift", prompt: "After a fall in AD, over time PE falls and SRAS shifts ____ until the economy is back on LRAS.", answers: [["right", "rightward"]], explain: "Long-run equilibrium at a lower P with Y = YN." },
    { id: "adas-q48", kind: "fill", sub: "SRAS shift", prompt: "An increase in oil prices increases costs and shifts SRAS to the ____.", answers: [["left", "leftward"]], explain: "P rises and Y falls." },
    { id: "adas-q49", kind: "fill", sub: "SRAS shift", prompt: "A period of falling output and rising prices is called ____.", answers: [["stagflation"]], explain: "Caused by a leftward SRAS shift." },
    { id: "adas-q50", kind: "fill", sub: "SRAS shift", prompt: "If policymakers do nothing after SRAS shifts left, low employment causes ____ to fall, and SRAS shifts back right.", answers: [["wages", "wage", "nominal wages"]], explain: "The economy returns to its original long-run equilibrium." },
    { id: "adas-q51", kind: "fill", sub: "SRAS shift", prompt: "If policymakers accommodate the SRAS shift by increasing AD, Y goes back to YN but P is ____ higher.", answers: [["permanently"]], explain: "The cost of accommodation is a higher price level." },
    { id: "adas-q52", kind: "fill", sub: "Real wages", prompt: "A worker's nominal wage is stuck at $20 per hour by a contract while P rises from 1.00 to 1.25. The real wage falls from 20 to ____ units of output per hour.", answers: [["16"]], explain: "Real wage = W ÷ P = 20 ÷ 1.25 = 16. This is why sticky wages make higher P profitable." },

    { id: "adas-q53", kind: "mcq", sub: "AD slope", prompt: "A fall in the price level makes consumers feel wealthier, so they spend more. This is the:", options: ["Interest-rate effect", "Wealth effect", "Exchange-rate effect", "Misperceptions effect"], answer: 1, explain: "The wealth effect links P and C." },
    { id: "adas-q54", kind: "mcq", sub: "AD shifts", prompt: "Which event shifts the AD curve to the left?", options: ["A fall in the price level", "A boom in countries that buy our exports", "Households decide to save a larger share of their income", "A tax cut"], answer: 2, explain: "Saving more means lower C at each P. A fall in P is a movement along AD." },
    { id: "adas-q55", kind: "mcq", sub: "LRAS shifts", prompt: "Which event shifts the LRAS curve?", options: ["A stock market crash", "An increase in government defence spending", "A wave of immigration", "A rise in the expected price level"], answer: 2, explain: "Immigration changes labour and so YN. The others shift AD or only SRAS." },
    { id: "adas-q56", kind: "mcq", sub: "LRAS", prompt: "Why is the LRAS curve vertical?", options: ["Because economic forces do not affect long-run aggregate supply", "Because YN depends on labour, capital, natural resources and technology, none of which depends on P", "Because prices are sticky in the long run", "Because AD is horizontal in the long run"], answer: 1, explain: "An increase in P does not change the determinants of YN (classical dichotomy)." },
    { id: "adas-q57", kind: "mcq", sub: "SRAS theories", prompt: "Which of these is NOT one of the three theories of the upward-sloping SRAS curve?", options: ["Sticky-wage theory", "Sticky-price theory", "Misperceptions theory", "Wealth-effect theory"], answer: 3, explain: "The wealth effect explains the slope of AD, not SRAS." },
    { id: "adas-q58", kind: "mcq", sub: "SRAS shifts", prompt: "An increase in the expected price level:", options: ["Shifts SRAS left", "Shifts SRAS right", "Shifts LRAS left", "Shifts AD right"], answer: 0, explain: "Higher PE → higher wages → less profitable at each P → SRAS left." },
    { id: "adas-q59", kind: "mcq", sub: "SRAS shift", prompt: "In the short run, a sharp increase in oil prices causes:", options: ["Higher P and higher Y", "Lower P and lower Y", "Higher P and lower Y", "Lower P and higher Y"], answer: 2, explain: "SRAS shifts left: stagflation." },
    { id: "adas-q60", kind: "mcq", sub: "AD shift", prompt: "After a stock market crash, with no policy response, the new long-run equilibrium has:", options: ["Lower Y and lower P", "Y back at YN and a lower P", "Y back at YN and a higher P", "Lower Y and the original P"], answer: 1, explain: "PE falls, SRAS shifts right until Y = YN at a lower price level." },
    { id: "adas-q61", kind: "mcq", sub: "Slope of SRAS", prompt: "If the aggregate-supply curve were vertical, a rightward shift of AD would:", options: ["Raise output only", "Raise the price level only", "Raise both output and the price level", "Have no effect at all"], answer: 1, explain: "Along a vertical AS curve, AD shifts change only P, not output or employment." },
    { id: "adas-q62", kind: "mcq", sub: "Accommodation", prompt: "Policymakers accommodate a leftward shift in SRAS by increasing AD. The result is:", options: ["Y below YN and P back to its original level", "Y back at YN and P permanently higher", "Y above YN and P lower", "Y back at YN and P back to its original level"], answer: 1, explain: "Accommodation restores output at the cost of a permanently higher price level." },
  ],

  // ================================================================ exam
  exam: [
    // ---------------- Q1 calc
    {
      id: "adas-e1",
      section: "calc",
      sub: "SRAS equation",
      prompt: "In an economy the natural level of output is YN = 500, a = 20 and the expected price level is PE = 100. If the actual price level is 105, the quantity of output supplied in the short run is ______.",
      marks: 3,
      rubric: [
        { point: "States the formula: Y = YN + a(P − PE)", marks: 1 },
        { point: "Correct working: 500 + 20 × (105 − 100)", marks: 1 },
        { point: "Correct answer Y = 600", marks: 1 },
      ],
      model: "Y = YN + a(P − PE)\n= 500 + 20 × (105 − 100)\n= 500 + 100 = 600\nSince P > PE, output is above the natural level.",
      answer: "600",
      source: "Lecture 8",
    },
    {
      id: "adas-e2",
      section: "calc",
      sub: "SRAS equation",
      prompt: "The natural level of output is 800 and the expected price level is 100. When the actual price level is 110, firms supply 850 units of output. The value of a in Y = YN + a(P − PE) is ______.",
      marks: 3,
      rubric: [
        { point: "States the formula: Y = YN + a(P − PE)", marks: 1 },
        { point: "Correct working: 850 = 800 + a × (110 − 100), so 10a = 50", marks: 1 },
        { point: "Correct answer a = 5", marks: 1 },
      ],
      model: "Y = YN + a(P − PE)\n850 = 800 + a × (110 − 100)\n50 = 10a\na = 5",
      answer: "5",
      source: "Lecture 8",
    },
    {
      id: "adas-e3",
      section: "calc",
      sub: "SRAS equation",
      prompt: "The natural level of output is 1,000, a = 40 and the expected price level is 100. Output is observed to be 920. The actual price level is ______.",
      marks: 3,
      rubric: [
        { point: "States the formula: Y = YN + a(P − PE)", marks: 1 },
        { point: "Correct working: 920 = 1,000 + 40(P − 100), so P − 100 = −80 ÷ 40 = −2", marks: 1 },
        { point: "Correct answer P = 98", marks: 1 },
      ],
      model: "Y = YN + a(P − PE)\n920 = 1,000 + 40 × (P − 100)\n40 × (P − 100) = −80\nP − 100 = −2\nP = 98 (P is below PE, so Y is below YN)",
      answer: "98",
      source: "Lecture 8",
    },
    {
      id: "adas-e4",
      section: "calc",
      sub: "Sticky wages and real wages",
      prompt: "Under the sticky-wage theory, a worker's nominal wage is fixed at $30 per hour by a contract. The price level then rises unexpectedly from 1.0 to 1.2. The percentage fall in the worker's real wage is ______ (1 d.p.).",
      marks: 3,
      rubric: [
        { point: "States the formula: real wage = W ÷ P", marks: 1 },
        { point: "Correct working: 30 ÷ 1.0 = 30 and 30 ÷ 1.2 = 25; (25 − 30) ÷ 30 × 100", marks: 1 },
        { point: "Correct answer: falls by 16.7%", marks: 1 },
      ],
      model: "Real wage = W ÷ P\nBefore: 30 ÷ 1.0 = 30 units of output per hour\nAfter: 30 ÷ 1.2 = 25 units of output per hour\n% change = (25 − 30) ÷ 30 × 100 = −16.7%\nThe real wage falls by 16.7%, so production is more profitable and firms increase output (SRAS slopes upward).",
      answer: "16.7%",
      source: "Problem Set 8 Q3(e)",
    },

    // ---------------- Q2 short
    {
      id: "adas-e5",
      section: "short",
      sub: "Facts about fluctuations",
      prompt: "State the THREE key facts about economic fluctuations.",
      marks: 3,
      rubric: [
        { point: "Economic fluctuations are irregular and unpredictable", marks: 1 },
        { point: "Most macroeconomic quantities fluctuate together (e.g. real GDP and investment)", marks: 1 },
        { point: "As output falls, unemployment rises", marks: 1 },
      ],
      model: "First, economic fluctuations are irregular and unpredictable: recessions do not occur at regular intervals. Second, most macroeconomic quantities fluctuate together; for example, real investment spending falls when real GDP falls. Third, as output falls, unemployment rises.",
      source: "Lecture 8",
    },
    {
      id: "adas-e6",
      section: "short",
      sub: "AD slope",
      prompt: "Explain THREE reasons why the aggregate-demand curve slopes downward.",
      marks: 3,
      rubric: [
        { point: "Wealth effect: lower P raises the real value of money, consumers are wealthier, C rises", marks: 1 },
        { point: "Interest-rate effect: lower P means fewer dollars needed, people buy bonds, the interest rate falls, I rises", marks: 1 },
        { point: "Exchange-rate effect: lower P lowers the interest rate, investors buy foreign bonds, the currency depreciates, NX rise", marks: 1 },
      ],
      model: "Wealth effect: a fall in P increases the real value of money, so consumers are wealthier and consumer spending rises. Interest-rate effect: with a lower P, buying goods requires fewer dollars, so people buy interest-bearing assets such as bonds; the interest rate falls and investment spending rises. Exchange-rate effect: the lower interest rate leads investors to buy foreign bonds, increasing the supply of the domestic currency so it depreciates, which stimulates net exports. In each case a lower P raises the quantity of goods and services demanded.",
      source: "Problem Set 8 Q5(a)",
    },
    {
      id: "adas-e7",
      section: "short",
      sub: "LRAS shifts",
      prompt: "Explain whether each event increases, decreases or has no effect on long-run aggregate supply: (a) a wave of immigration; (b) a firm invents a new and more powerful computer chip; (c) a severe hurricane damages factories.",
      marks: 3,
      rubric: [
        { point: "(a) Increases LRAS (shifts right): immigration raises the labour force", marks: 1 },
        { point: "(b) Increases LRAS (shifts right): technological progress raises productivity", marks: 1 },
        { point: "(c) Decreases LRAS (shifts left): the capital stock falls", marks: 1 },
      ],
      model: "(a) A wave of immigration increases the quantity of labour, raising the natural level of output, so LRAS shifts right. (b) A more powerful computer chip is an improvement in technological knowledge that raises productivity, so LRAS shifts right. (c) A hurricane that damages factories reduces the stock of physical capital, lowering the natural level of output, so LRAS shifts left.",
      source: "Problem Set 8 Q2",
    },
    {
      id: "adas-e8",
      section: "short",
      sub: "Self-correction",
      prompt: "For each of the three theories of the upward-sloping SRAS curve, explain how the economy recovers from a recession and returns to long-run equilibrium without any policy intervention.",
      marks: 3,
      rubric: [
        { point: "Sticky-wage: as PE falls, nominal wages are renegotiated lower, production becomes more profitable, SRAS shifts right; speed depends on how quickly wages adjust (contracts, social norms)", marks: 1 },
        { point: "Sticky-price: firms with menu costs eventually lower their prices as PE falls, SRAS shifts right; speed depends on how quickly sticky prices are adjusted", marks: 1 },
        { point: "Misperceptions: firms realise the fall in their price reflected a fall in all prices and correct their misperceptions, SRAS shifts right; speed depends on how quickly misperceptions are corrected", marks: 1 },
      ],
      model: "In a recession P is below PE. Sticky-wage theory: over time PE falls and workers and firms renegotiate lower nominal wages, making production more profitable, so SRAS shifts right; the speed depends on how quickly sticky wages adjust (e.g. length of labour contracts). Sticky-price theory: firms with menu costs eventually adjust their prices down as PE falls, so SRAS shifts right; the speed depends on how sticky prices are. Misperceptions theory: firms come to realise that all prices have fallen, not just their relative price, so they correct their misperceptions and SRAS shifts right; the speed depends on how quickly misperceptions are corrected. In each case the economy returns to Y = YN at a lower price level.",
      source: "Problem Set 8 Q6",
    },
    {
      id: "adas-e9",
      section: "short",
      sub: "AD shifts",
      prompt: "During a slump, a government moves a public holiday so that the shopping period before a festive season is a week longer. Using the model of aggregate demand and aggregate supply, explain what the government might be trying to achieve.",
      marks: 3,
      rubric: [
        { point: "A longer shopping period is intended to raise consumer spending (C)", marks: 1 },
        { point: "Higher C shifts AD to the right", marks: 1 },
        { point: "In the short run output and employment rise (the price level rises), moving the economy back towards YN", marks: 1 },
      ],
      model: "The government is trying to increase consumer spending by giving households more time to shop. Higher consumption shifts the aggregate-demand curve to the right. In the short run this moves the economy up along SRAS, raising output and employment (and the price level), helping the economy recover towards its natural level of output.",
      source: "Problem Set 8 Q4",
    },
    {
      id: "adas-e10",
      section: "short",
      sub: "SRAS shifts",
      prompt: "The economy is in long-run equilibrium. A new central bank chair is appointed who is well known for believing that inflation is not a major problem. Explain the effect on the expected price level, nominal wages, SRAS, and the price level and output (holding AD constant).",
      marks: 3,
      rubric: [
        { point: "People expect higher inflation, so the expected price level PE rises; workers and firms agree higher nominal wages", marks: 1 },
        { point: "At each price level production is less profitable, so SRAS shifts left", marks: 1 },
        { point: "With AD constant, the price level rises and output falls", marks: 1 },
      ],
      model: "People expect the new chair to allow higher inflation, so the expected price level rises. Workers and firms therefore agree to higher nominal wages in new labour contracts, which makes producing goods and services less profitable at any price level. As a result the SRAS curve shifts left, and with aggregate demand constant the price level rises and output falls, so the appointment worsens economic performance.",
      source: "Problem Set 8 Q7",
    },
    {
      id: "adas-e11",
      section: "short",
      sub: "Money neutrality",
      prompt: "The central bank raises the money supply by 5 percent, starting from long-run equilibrium A. According to the sticky-wage theory, compare nominal and real wages at A with those at the new short-run equilibrium B and the new long-run equilibrium C. Is this consistent with money having real effects only in the short run?",
      marks: 3,
      rubric: [
        { point: "Nominal wages: same at B as at A (sticky); higher at C than at A (about 5% higher)", marks: 1 },
        { point: "Real wages: lower at B than at A (P higher, W unchanged); same at C as at A", marks: 1 },
        { point: "Yes: real wages (and output) change in the short run but return to their original levels in the long run, so money is neutral in the long run", marks: 1 },
      ],
      model: "Because nominal wages are sticky, the nominal wage at B is the same as at A, but by C PE has risen and new contracts raise nominal wages by about 5%. With P higher at B but W unchanged, the real wage at B is lower than at A, which is why firms produce more; at C both W and P are about 5% higher, so the real wage is the same as at A. This is consistent with money having real effects in the short run but being neutral in the long run.",
      source: "Problem Set 8 Q3(d)–(f)",
    },
    {
      id: "adas-e12",
      section: "short",
      sub: "Identifying shifts",
      prompt: "Explain whether each event shifts the AD curve or the SRAS curve, and in which direction: (a) households decide to save a larger share of their income; (b) orange groves suffer a prolonged period of below-freezing temperatures; (c) increased job opportunities overseas cause many workers to leave the country.",
      marks: 3,
      rubric: [
        { point: "(a) AD shifts left: higher saving means lower consumption C at each price level", marks: 1 },
        { point: "(b) SRAS shifts left: the freeze raises costs / reduces agricultural production", marks: 1 },
        { point: "(c) SRAS (and LRAS) shift left: the quantity of labour falls", marks: 1 },
      ],
      model: "(a) If households save more, consumption falls at every price level, so the AD curve shifts left, lowering P and Y in the short run. (b) A prolonged freeze damages agricultural production and raises costs, so the SRAS curve shifts left, raising P and lowering Y. (c) If many workers leave the country, the quantity of labour falls; this shifts LRAS left and, since everything that shifts LRAS also shifts SRAS, SRAS shifts left too.",
      source: "Problem Set 8 Q8",
    },

    // ---------------- Q3 tf
    {
      id: "adas-e13",
      section: "tf",
      sub: "AD slope",
      prompt: "The aggregate-demand curve slopes downward because it is the horizontal sum of the demand curves for individual goods.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "AD slopes down because a fall in P raises C (wealth effect) and I (interest-rate effect)", marks: 1 },
        { point: "and raises NX (exchange-rate effect); it is about how P affects C, I and NX, not adding up individual demand curves", marks: 1 },
      ],
      model: "False. The AD curve slopes downward because of how a change in the overall price level affects C, I and NX. A fall in P makes consumers wealthier (wealth effect), lowers the interest rate and raises investment (interest-rate effect), and causes the currency to depreciate, raising net exports (exchange-rate effect). These three effects, not a horizontal sum of individual demand curves, explain the slope.",
      source: "Problem Set 8 Q5(a)",
    },
    {
      id: "adas-e14",
      section: "tf",
      sub: "LRAS",
      prompt: "The long-run aggregate-supply curve is vertical because economic forces do not affect long-run aggregate supply.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "LRAS is vertical because YN depends on labour, capital, natural resources and technology, none of which depends on P (classical dichotomy)", marks: 1 },
        { point: "Economic forces such as immigration, investment in capital, discoveries of resources and technological progress do shift LRAS", marks: 1 },
      ],
      model: "False. LRAS is vertical because the natural level of output depends on the economy's labour, capital, natural resources and technology, and a change in the price level does not affect any of these (the classical dichotomy). But economic forces do affect long-run aggregate supply: immigration, investment in factories and human capital, new mineral discoveries and technological progress all shift LRAS. Vertical means LRAS does not depend on P, not that it never moves.",
      source: "Problem Set 8 Q5(b)",
    },
    {
      id: "adas-e15",
      section: "tf",
      sub: "Sticky-price theory",
      prompt: "If firms adjusted their prices every day, then the short-run aggregate-supply curve would be horizontal.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "The sticky-price theory says SRAS slopes up because menu costs stop some firms adjusting prices", marks: 1 },
        { point: "If prices were adjusted every day, prices would not be sticky, so SRAS would be steeper (closer to vertical like LRAS), not horizontal", marks: 1 },
      ],
      model: "False. In the sticky-price theory, SRAS slopes upward because menu costs make some prices sticky, so when P rises unexpectedly, firms with relatively low prices sell and produce more. If firms adjusted their prices every day, prices would not be sticky and this source of the upward slope would disappear. Output would respond less to changes in P, making SRAS steeper, closer to the vertical LRAS, rather than horizontal.",
      source: "Problem Set 8 Q5(c)",
    },
    {
      id: "adas-e16",
      section: "tf",
      sub: "LRAS",
      prompt: "Whenever the economy enters a recession, its long-run aggregate-supply curve shifts to the left.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "A recession is a short-run fluctuation caused by a leftward shift of AD or SRAS, with output temporarily below YN", marks: 1 },
        { point: "LRAS depends on labour, capital, natural resources and technology, which need not change; output returns to YN in the long run", marks: 1 },
      ],
      model: "False. Recessions are short-run fluctuations, usually caused by a fall in aggregate demand (e.g. a stock market crash) or a leftward shift in SRAS (e.g. higher oil prices), which push output below its natural level. LRAS is determined by labour, capital, natural resources and technology, which a recession need not change. Over time, as PE adjusts, the economy returns to the unchanged LRAS at YN.",
      source: "Problem Set 8 Q5(d)",
    },
    {
      id: "adas-e17",
      section: "tf",
      sub: "Slope of SRAS",
      prompt: "If the aggregate-supply curve is vertical, shifts in aggregate demand cause fluctuations in output and employment.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "With a vertical AS curve, output is fixed at YN whatever P is", marks: 1 },
        { point: "So AD shifts change only the price level; only an upward-sloping SRAS lets AD shifts affect output and employment", marks: 1 },
      ],
      model: "False. If the AS curve is vertical, the quantity of output supplied is YN at every price level. A shift in AD then only moves the economy up or down the vertical line, changing the price level but not output or employment. It is only because SRAS slopes upward in the short run that shifts in AD do affect output and employment.",
      source: "Lecture 8",
    },
    {
      id: "adas-e18",
      section: "tf",
      sub: "Long-run equilibrium",
      prompt: "In long-run equilibrium, the actual price level equals the expected price level and unemployment is at its natural rate.",
      tf: true,
      marks: 3,
      rubric: [
        { point: "States True", marks: 1 },
        { point: "Long-run equilibrium is where AD, SRAS and LRAS intersect, with PE = P", marks: 1 },
        { point: "From Y = YN + a(P − PE), PE = P means Y = YN, so unemployment is at its natural rate", marks: 1 },
      ],
      model: "True. In long-run equilibrium, AD, SRAS and LRAS all intersect at one point. There the expected price level equals the actual price level, so from Y = YN + a(P − PE), output equals the natural level YN. Since YN is the output produced when unemployment is at its natural rate, unemployment is at its natural rate.",
      source: "Lecture 8",
    },
    {
      id: "adas-e19",
      section: "tf",
      sub: "SRAS shift",
      prompt: "A sharp increase in oil prices can cause stagflation.",
      tf: true,
      marks: 3,
      rubric: [
        { point: "States True", marks: 1 },
        { point: "Higher oil prices raise costs, shifting SRAS left", marks: 1 },
        { point: "Along the AD curve, P rises while Y falls (unemployment rises): falling output with rising prices is stagflation", marks: 1 },
      ],
      model: "True. An increase in oil prices raises firms' costs, so the SRAS curve shifts left. The new short-run equilibrium has a higher price level and lower output, and unemployment rises. A period of falling output and rising prices is called stagflation.",
      source: "Lecture 8",
    },
    {
      id: "adas-e20",
      section: "tf",
      sub: "Accommodation",
      prompt: "If policymakers accommodate a leftward shift in SRAS by increasing aggregate demand, both output and the price level return to their original levels.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "Increasing AD (fiscal or monetary policy) brings output back to YN", marks: 1 },
        { point: "But the price level is permanently higher; P returns to its original level only if policymakers do nothing and wages fall", marks: 1 },
      ],
      model: "False. After SRAS shifts left, policymakers can use fiscal or monetary policy to increase AD and accommodate the shift. This brings output back to the natural level YN, but because AD has shifted right to meet the new SRAS, the price level is permanently higher. Only if policymakers do nothing, so that low employment pushes wages down and SRAS shifts back right, does the price level return to its original level.",
      source: "Lecture 8",
    },
    {
      id: "adas-e21",
      section: "tf",
      sub: "SRAS shifts",
      prompt: "An increase in the expected price level shifts the short-run aggregate-supply curve to the right.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "If PE rises, workers and firms set higher nominal wages", marks: 1 },
        { point: "At each P production is less profitable, so output supplied falls and SRAS shifts left", marks: 1 },
      ],
      model: "False. When the expected price level rises, workers and firms set higher nominal wages. At each actual price level, production is then less profitable, so firms supply less output. The SRAS curve therefore shifts to the left, not the right.",
      source: "Lecture 8",
    },

    // ---------------- Q4 diagram
    {
      id: "adas-e22",
      section: "diagram",
      sub: "AD shift: pessimism",
      prompt: "Suppose a wave of pessimism about the future causes households to cut their consumption spending. The economy starts in long-run equilibrium.",
      parts: [
        { label: "(a)", prompt: "Using a clearly labelled diagram of aggregate demand and aggregate supply, show the short-run effect on output and the price level.", marks: 5 },
        { label: "(b)", prompt: "Explain how the economy returns to long-run equilibrium if the government takes no action.", marks: 5 },
      ],
      marks: 10,
      rubric: [
        { point: "(a) Axes labelled: price level (P) and real GDP (Y); AD₁, SRAS₁ and LRAS drawn and labelled", marks: 1 },
        { point: "(a) Initial long-run equilibrium A where AD₁, SRAS₁ and LRAS intersect at YN and P₁", marks: 1 },
        { point: "(a) Lower consumption C shifts AD left (AD₁ → AD₂)", marks: 1 },
        { point: "(a) New short-run equilibrium B on SRAS₁ where AD₂ crosses it", marks: 1 },
        { point: "(a) Output falls (Y₂ < YN) and the price level falls (P₂ < P₁); unemployment rises", marks: 1 },
        { point: "(b) Output is below the natural rate and the actual price level is below the expected price level", marks: 1 },
        { point: "(b) Over time the expected price level falls and nominal wages/prices adjust downward (sticky wages and prices become flexible, misperceptions corrected)", marks: 1 },
        { point: "(b) Production becomes more profitable at each P, so SRAS shifts right (SRAS₁ → SRAS₂)", marks: 1 },
        { point: "(b) New long-run equilibrium C where AD₂ meets LRAS: output back at YN, unemployment back at its natural rate", marks: 1 },
        { point: "(b) The price level is permanently lower (P₃ < P₂ < P₁)", marks: 1 },
      ],
      model: "(a) The economy starts at A, where AD₁, SRAS₁ and LRAS intersect at the natural level of output YN and price level P₁. Pessimism causes households to cut consumption C, so aggregate demand falls and the AD curve shifts left from AD₁ to AD₂. The new short-run equilibrium is B, where AD₂ crosses SRAS₁. Output falls from YN to Y₂ and the price level falls from P₁ to P₂, so unemployment rises above its natural rate.\n(b) At B, output is below its natural rate and the actual price level is below what people expected. Over time the expected price level falls, so workers and firms agree to lower nominal wages and sticky prices are adjusted down (and misperceptions are corrected). With lower costs, production is more profitable at each price level, so the SRAS curve shifts right from SRAS₁ to SRAS₂. This continues until the economy reaches C, where AD₂ meets LRAS: output is back at YN and unemployment at its natural rate, but the price level is permanently lower at P₃.",
      diagram: [adLeftSR, adLeftLR],
      source: "Exam example",
    },
    {
      id: "adas-e23",
      section: "diagram",
      sub: "AD shift: money supply",
      prompt: "An economy is in long-run equilibrium at point A. The central bank then raises the money supply by 5 percent.",
      parts: [
        { label: "(a)", prompt: "Using a clearly labelled AD–AS diagram that includes both SRAS and LRAS, show what happens to output and the price level as the economy moves from A to the new short-run equilibrium B.", marks: 5 },
        { label: "(b)", prompt: "Show the new long-run equilibrium C. Explain what causes the economy to move from B to C, and what happens to nominal and real wages at C compared with A under the sticky-wage theory.", marks: 5 },
      ],
      marks: 10,
      rubric: [
        { point: "(a) Axes P and Y labelled; AD₁, SRAS₁ and LRAS drawn and labelled", marks: 1 },
        { point: "(a) Initial long-run equilibrium A on LRAS at YN and P₁", marks: 1 },
        { point: "(a) Higher money supply raises spending: AD shifts right (AD₁ → AD₂)", marks: 1 },
        { point: "(a) Short-run equilibrium B on SRAS₁", marks: 1 },
        { point: "(a) Output rises above YN and the price level rises", marks: 1 },
        { point: "(b) At B, P is above PE; over time PE rises and workers and firms set higher nominal wages", marks: 1 },
        { point: "(b) Production less profitable at each P, so SRAS shifts left (SRAS₁ → SRAS₂)", marks: 1 },
        { point: "(b) Long-run equilibrium C where AD₂ meets LRAS: Y back to YN, P higher than at B (about 5% above A)", marks: 1 },
        { point: "(b) Nominal wages at C higher than at A (by about 5%)", marks: 1 },
        { point: "(b) Real wages at C the same as at A: money is neutral in the long run", marks: 1 },
      ],
      model: "(a) The economy starts at A, where AD₁, SRAS₁ and LRAS intersect at YN and P₁. A 5% increase in the money supply raises spending, so AD shifts right from AD₁ to AD₂. The new short-run equilibrium is B on SRAS₁: output rises above YN to Y₂ and the price level rises to P₂.\n(b) At B the actual price level is above the expected price level. Over time people raise their expected price level, so workers and firms set higher nominal wages in new contracts; production becomes less profitable at each price level and SRAS shifts left from SRAS₁ to SRAS₂. The economy moves up AD₂ to C, where AD₂ meets LRAS: output is back at YN and the price level P₃ is about 5% higher than at A. Under the sticky-wage theory, nominal wages at C are about 5% higher than at A, while real wages (W ÷ P) at C are the same as at A, so money is neutral in the long run.",
      diagram: [adRightSR, adRightLR],
      source: "Problem Set 8 Q3",
    },
    {
      id: "adas-e24",
      section: "diagram",
      sub: "SRAS shift: oil prices",
      prompt: "An economy is in long-run equilibrium when there is a sharp increase in oil prices. Assume LRAS is unchanged.",
      parts: [
        { label: "(a)", prompt: "Using a clearly labelled AD–AS diagram, show the short-run effect on output, the price level and unemployment. What is this situation called?", marks: 5 },
        { label: "(b)", prompt: "Explain what happens in the long run if policymakers do nothing, and show the alternative outcome if policymakers accommodate the shift.", marks: 5 },
      ],
      marks: 10,
      rubric: [
        { point: "(a) Axes P and Y labelled; AD₁, SRAS₁ and LRAS with initial equilibrium A at YN, P₁", marks: 1 },
        { point: "(a) Higher oil prices raise costs: SRAS shifts left (SRAS₁ → SRAS₂)", marks: 1 },
        { point: "(a) New short-run equilibrium B on AD₁", marks: 1 },
        { point: "(a) Price level rises (P₂ > P₁), output falls (Y₂ < YN), unemployment rises", marks: 1 },
        { point: "(a) Names it stagflation: falling output and rising prices", marks: 1 },
        { point: "(b) Do nothing: low employment causes wages to fall", marks: 1 },
        { point: "(b) SRAS shifts back right until the economy returns to A (original P and Y)", marks: 1 },
        { point: "(b) Accommodate: fiscal or monetary policy increases AD (AD₁ → AD₂)", marks: 1 },
        { point: "(b) New equilibrium C where AD₂ meets SRAS₂ on LRAS: Y back to YN", marks: 1 },
        { point: "(b) But the price level is permanently higher (P₃ > P₂)", marks: 1 },
      ],
      model: "(a) The economy starts at A, where AD₁, SRAS₁ and LRAS intersect at YN and P₁. Higher oil prices increase firms' costs, so SRAS shifts left from SRAS₁ to SRAS₂. The short-run equilibrium moves along AD₁ to B: the price level rises to P₂, output falls to Y₂ and unemployment rises. This period of falling output and rising prices is called stagflation.\n(b) If policymakers do nothing, the low level of employment causes wages to fall over time. Lower wages make production more profitable, so SRAS shifts back to the right until the economy returns to its original long-run equilibrium A, with the original price level and output. Alternatively, policymakers could use fiscal or monetary policy to increase aggregate demand from AD₁ to AD₂, accommodating the shift: the economy moves to C, where AD₂ meets SRAS₂ on LRAS, so output returns to YN more quickly, but the price level is permanently higher at P₃.",
      diagram: [oilSR, oilAccommodate],
      source: "Lecture 8",
    },
    {
      id: "adas-e25",
      section: "diagram",
      sub: "AD shift: investment boom",
      prompt: "The economy is in long-run equilibrium. Firms become optimistic about future business conditions and invest heavily in new capital equipment.",
      parts: [
        { label: "(a)", prompt: "Draw an AD–AS diagram showing the short-run effect of this optimism. Label the new price level and real output, and explain in words why the aggregate quantity of output supplied changes.", marks: 5 },
        { label: "(b)", prompt: "Use your diagram to show the new long-run equilibrium (assume no change in LRAS). Explain why the aggregate quantity of output demanded changes between the short run and the long run.", marks: 5 },
      ],
      marks: 10,
      rubric: [
        { point: "(a) Axes P and Y labelled; AD₁, SRAS₁ and LRAS with initial equilibrium A at YN", marks: 1 },
        { point: "(a) Higher investment I shifts AD right (AD₁ → AD₂)", marks: 1 },
        { point: "(a) New short-run equilibrium B with higher price level P₂ and higher output Y₂ labelled", marks: 1 },
        { point: "(a) Quantity supplied rises because P rises above PE: e.g. sticky nominal wages mean production is more profitable", marks: 1 },
        { point: "(a) (or via sticky prices / misperceptions) firms increase output and employment, moving up along SRAS", marks: 1 },
        { point: "(b) Over time PE rises and nominal wages rise, so SRAS shifts left (SRAS₁ → SRAS₂)", marks: 1 },
        { point: "(b) New long-run equilibrium C where AD₂ meets LRAS: Y = YN, P₃ higher than P₂", marks: 1 },
        { point: "(b) Quantity of output demanded falls between B and C: a movement up along AD₂ because P rises", marks: 1 },
        { point: "(b) Explained by the wealth effect (higher P lowers real value of money and C) and the interest-rate effect (higher P raises interest rates and lowers I)", marks: 1 },
        { point: "(b) and the exchange-rate effect (currency appreciates, NX fall)", marks: 1 },
      ],
      model: "(a) The economy starts at A, where AD₁, SRAS₁ and LRAS intersect at YN. Optimism raises investment spending I, so AD shifts right from AD₁ to AD₂. The short-run equilibrium moves to B on SRAS₁, with a higher price level P₂ and higher real output Y₂. The quantity of output supplied rises because the price level is now above the expected price level: under the sticky-wage theory, nominal wages are fixed in advance, so revenue rises but labour cost does not, making production more profitable and firms increase output and employment (sticky prices and misperceptions give the same result).\n(b) Over time the expected price level rises, nominal wages and sticky prices adjust upward and misperceptions are corrected, so SRAS shifts left from SRAS₁ to SRAS₂. The new long-run equilibrium is C, where AD₂ meets LRAS: output returns to YN and the price level rises further to P₃. Between B and C the quantity of output demanded falls as the economy moves up along AD₂: the higher price level lowers the real value of money and consumption (wealth effect), raises interest rates and lowers investment (interest-rate effect), and causes the currency to appreciate so net exports fall (exchange-rate effect).",
      diagram: [adRightSR, adRightLR],
      source: "Problem Set 8 Q10",
    },
  ],
};

export default data;
