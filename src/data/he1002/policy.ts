import type { Graph, TopicData } from "@/lib/he1002/types";

// Lecture 9: The Influence of Monetary and Fiscal Policy on Aggregate Demand (+ Problem Set 9).

const MX = "Quantity of money (M)";
const MY = "Interest rate (r)";
const AX = "Real GDP (Y)";
const AY = "Price level (P)";

const mmEq: Graph = {
  x: MX,
  y: MY,
  lines: [
    { label: "MS", pts: [[5, 0.5], [5, 9.5]], tone: 1 },
    { label: "MD", pts: [[1, 9], [9, 1]] },
  ],
  points: [{ on: ["MS", "MD"], label: "E", xTick: "M (fixed by central bank)", yTick: "r*" }],
  caption: "MS is vertical (fixed by the central bank); MD slopes downward; r* balances the supply of and demand for money.",
};

const mmAdjust: Graph = {
  x: MX,
  y: MY,
  lines: [
    { label: "MS", pts: [[5, 0.5], [5, 9.5]], tone: 1 },
    { label: "MD", pts: [[1, 9], [9, 1]] },
  ],
  points: [
    { on: ["MS", "MD"], label: "E", yTick: "r*" },
    { at: [5, 3], label: "Ms", yTick: "r₂" },
    { at: [7, 3], label: "Md" },
  ],
  arrows: [{ from: [2, 3.2], to: [2, 4.8] }],
  caption: "At r₂ < r*, quantity of money demanded exceeds quantity supplied; people sell bonds, bond issuers offer higher rates, and r rises toward r*.",
};

const mmPriceFall: Graph = {
  title: "Money market",
  x: MX,
  y: MY,
  lines: [
    { label: "MS", pts: [[5, 0.5], [5, 9.5]], tone: 1 },
    { label: "MD₁", pts: [[1, 9], [9, 1]], tone: 3 },
    { label: "MD₂", pts: [[0.5, 7], [7, 0.5]] },
  ],
  points: [
    { on: ["MS", "MD₁"], label: "A", yTick: "r₁" },
    { on: ["MS", "MD₂"], label: "B", yTick: "r₂" },
  ],
  arrows: [{ from: [7, 3], to: [5.6, 1.9] }],
  caption: "A fall in P reduces money demand (MD₁ to MD₂), which lowers r from r₁ to r₂.",
};

const adSlope: Graph = {
  title: "Aggregate demand",
  x: AX,
  y: AY,
  lines: [{ label: "AD", pts: [[1, 9], [9, 1]] }],
  points: [
    { at: [4, 6], label: "A", xTick: "Y₁", yTick: "P₁" },
    { at: [6, 4], label: "B", xTick: "Y₂", yTick: "P₂" },
  ],
  caption: "The lower r raises investment and the quantity of goods and services demanded: a movement along a downward-sloping AD curve.",
};

const mmContract: Graph = {
  title: "Money market",
  x: MX,
  y: MY,
  lines: [
    { label: "MS₁", pts: [[5, 0.5], [5, 9.5]], tone: 3 },
    { label: "MS₂", pts: [[3, 0.5], [3, 9.5]] },
    { label: "MD", pts: [[1, 9], [9, 1]] },
  ],
  points: [
    { on: ["MS₁", "MD"], label: "A", yTick: "r₁" },
    { on: ["MS₂", "MD"], label: "B", yTick: "r₂" },
  ],
  arrows: [{ from: [4.8, 8], to: [3.2, 8] }],
  caption: "Selling bonds reduces the money supply (MS₁ to MS₂) and raises r from r₁ to r₂.",
};

const adContract: Graph = {
  title: "Aggregate demand",
  x: AX,
  y: AY,
  lines: [
    { label: "AD₁", pts: [[1, 9], [9, 1]], tone: 3 },
    { label: "AD₂", pts: [[0.5, 7.5], [7.5, 0.5]] },
  ],
  points: [
    { at: [5, 5], label: "A", xTick: "Y₁", yTick: "P₁" },
    { at: [3, 5], label: "B", xTick: "Y₂" },
  ],
  arrows: [{ from: [6.5, 3.5], to: [5, 3] }],
  caption: "The higher r reduces the quantity of goods and services demanded at every price level: AD shifts left from AD₁ to AD₂.",
};

const mmExpand: Graph = {
  title: "Money market",
  x: MX,
  y: MY,
  lines: [
    { label: "MS₁", pts: [[5, 0.5], [5, 9.5]], tone: 3 },
    { label: "MS₂", pts: [[7, 0.5], [7, 9.5]] },
    { label: "MD", pts: [[1, 9], [9, 1]] },
  ],
  points: [
    { on: ["MS₁", "MD"], label: "A", yTick: "r₁" },
    { on: ["MS₂", "MD"], label: "B", yTick: "r₂" },
  ],
  arrows: [{ from: [5.2, 8], to: [6.8, 8] }],
  caption: "An open-market purchase of bonds increases the money supply (MS₁ to MS₂); with MD unchanged, r falls from r₁ to r₂.",
};

const mmMDdown: Graph = {
  x: MX,
  y: MY,
  lines: [
    { label: "MS", pts: [[5, 0.5], [5, 9.5]], tone: 1 },
    { label: "MD₁", pts: [[1, 9], [9, 1]], tone: 3 },
    { label: "MD₂", pts: [[0.5, 7.5], [7.5, 0.5]] },
  ],
  points: [
    { on: ["MS", "MD₁"], label: "A", yTick: "r₁" },
    { on: ["MS", "MD₂"], label: "B", yTick: "r₂" },
  ],
  arrows: [{ from: [7, 3], to: [6, 2] }],
  caption: "Money demand falls (MD₁ to MD₂) with MS unchanged, so r falls from r₁ to r₂.",
};

const mmMDup: Graph = {
  title: "Money market",
  x: MX,
  y: MY,
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
  caption: "Money demand rises (MD₁ to MD₂) with MS fixed, so r rises from r₁ to r₂.",
};

const mmStabilise: Graph = {
  title: "Money market",
  x: MX,
  y: MY,
  lines: [
    { label: "MS₁", pts: [[5, 0.5], [5, 9.5]], tone: 3 },
    { label: "MS₂", pts: [[7, 0.5], [7, 9.5]] },
    { label: "MD₁", pts: [[1, 9], [9, 1]], tone: 3 },
    { label: "MD₂", pts: [[3, 9], [9.5, 2.5]] },
  ],
  points: [
    { on: ["MS₁", "MD₁"], label: "A", yTick: "r₁" },
    { on: ["MS₁", "MD₂"], label: "B", yTick: "r₂" },
    { on: ["MS₂", "MD₂"], label: "C" },
  ],
  arrows: [{ from: [5.2, 1.5], to: [6.8, 1.5] }],
  caption: "MD rises to MD₂; if the central bank buys bonds and raises MS to MS₂, r stays at r₁ (point C) and AD is unchanged.",
};

const adMultiplier: Graph = {
  x: AX,
  y: AY,
  lines: [
    { label: "AD₁", pts: [[0.5, 7.5], [7.5, 0.5]], tone: 3 },
    { label: "AD₂", pts: [[1, 8.5], [8.5, 1]], tone: 2, dashed: true },
    { label: "AD₃", pts: [[3, 9], [9, 3]] },
  ],
  points: [
    { at: [3, 5], xTick: "Y₁", yTick: "P₁" },
    { at: [4.5, 5], xTick: "Y₂" },
    { at: [7, 5], xTick: "Y₃" },
  ],
  arrows: [
    { from: [3, 5.5], to: [4.3, 5.5] },
    { from: [4.8, 5.5], to: [6.7, 5.5] },
  ],
  caption: "A $2b rise in G first shifts AD by $2b (AD₁ to AD₂); higher income raises C, shifting AD further right to AD₃ (multiplier effect).",
};

const mmCrowd: Graph = {
  title: "Money market",
  x: MX,
  y: MY,
  lines: [
    { label: "MS", pts: [[5, 0.5], [5, 9.5]], tone: 1 },
    { label: "MD₁", pts: [[1, 9], [9, 1]], tone: 3 },
    { label: "MD₂", pts: [[3, 9.5], [9.5, 3]] },
  ],
  points: [
    { on: ["MS", "MD₁"], label: "A", yTick: "r₁" },
    { on: ["MS", "MD₂"], label: "B", yTick: "r₂" },
  ],
  arrows: [{ from: [7, 3], to: [8, 4.5] }],
  caption: "Higher Y raises money demand (MD₁ to MD₂); with MS fixed, r rises from r₁ to r₂.",
};

const adCrowd: Graph = {
  title: "Aggregate demand",
  x: AX,
  y: AY,
  lines: [
    { label: "AD₁", pts: [[0.5, 7.5], [7.5, 0.5]], tone: 3 },
    { label: "AD₂", pts: [[3, 9], [9, 3]], tone: 2, dashed: true },
    { label: "AD₃", pts: [[1.5, 9], [9, 1.5]] },
  ],
  points: [
    { at: [3, 5], xTick: "Y₁", yTick: "P₁" },
    { at: [5.5, 5], xTick: "Y₃" },
    { at: [7, 5], xTick: "Y₂" },
  ],
  arrows: [
    { from: [3.2, 5.5], to: [6.8, 5.5] },
    { from: [7, 4.5], to: [5.7, 4.5] },
  ],
  caption: "G shifts AD from AD₁ toward AD₂, but the higher r reduces investment, so AD only reaches AD₃ (crowding-out effect).",
};

const adasRecession: Graph = {
  title: "AD–AS",
  x: AX,
  y: AY,
  lines: [
    { label: "LRAS", pts: [[5, 0.5], [5, 9.5]], tone: 1 },
    { label: "SRAS", pts: [[1, 2], [9, 8]] },
    { label: "AD₁", pts: [[0.5, 7.5], [7.5, 0.5]], tone: 3 },
    { label: "AD₂", pts: [[1, 9], [9, 1]] },
  ],
  points: [
    { on: ["AD₁", "SRAS"], label: "A", xTick: "Y₁", yTick: "P₁" },
    { on: ["AD₂", "SRAS"], label: "B", xTick: "Yₙ", yTick: "P₂" },
  ],
  arrows: [{ from: [6, 1.6], to: [7, 2.4] }],
  caption: "A is a recession (Y₁ below Yₙ). The open-market purchase lowers r, AD shifts right to AD₂ and output rises to Yₙ at B, with P rising from P₁ to P₂.",
};

const adasLongRun: Graph = {
  title: "AD–AS",
  x: AX,
  y: AY,
  lines: [
    { label: "LRAS", pts: [[5, 0.5], [5, 9.5]], tone: 1 },
    { label: "SRAS₁", pts: [[1, 2], [9, 8]], tone: 3 },
    { label: "SRAS₂", pts: [[0.5, 3.625], [8, 9.25]] },
    { label: "AD₁", pts: [[1, 9], [9, 1]], tone: 3 },
    { label: "AD₂", pts: [[3, 9], [9.5, 2.5]] },
  ],
  points: [
    { on: ["AD₁", "SRAS₁"], label: "A", xTick: "Yₙ", yTick: "P₁" },
    { on: ["AD₂", "SRAS₁"], label: "B", xTick: "Y₂", yTick: "P₂" },
    { on: ["AD₂", "SRAS₂"], label: "C", yTick: "P₃" },
  ],
  arrows: [{ from: [7.5, 6.9], to: [6.7, 7.6] }],
  caption: "Monetary expansion: A to B in the short run (Y and P rise); SRAS shifts left over time, B to C: output back at Yₙ, P higher.",
};

const data: TopicData = {
  id: "policy",

  // ------------------------------------------------------------------ content
  sections: [
    {
      title: "Monetary policy and fiscal policy",
      intro: "Two sets of policy tools can shift aggregate demand.",
      points: [
        {
          term: "Monetary policy",
          text: "The central bank's control of the money supply and interest rates. Main tools: open-market operations and the interest rate it pays on reserves.",
          eg: "The central bank buys government bonds to add money to the economy.",
        },
        {
          term: "Fiscal policy",
          text: "The government's choices about the levels of government spending (G) and taxation (T).",
          eg: "The government raises spending on roads or cuts income taxes.",
        },
        {
          term: "Why AD slopes downward (recap)",
          text: "Three reasons: the wealth effect, the interest-rate effect and the exchange-rate effect. The interest-rate effect is the most important of these for the U.S. economy, and the theory of liquidity preference explains it.",
        },
      ],
    },
    {
      title: "The theory of liquidity preference",
      intro: "Keynes's theory of how the interest rate is determined in the short run.",
      points: [
        {
          term: "Theory of liquidity preference",
          text: "According to Keynes, the interest rate (r) adjusts to balance the supply of and demand for money.",
        },
        {
          term: "Nominal vs real interest rate",
          text: "Assume the expected rate of inflation is constant (reasonable in the short run). Then the nominal and real rates differ by a constant (expected inflation), so a change in 'the interest rate' means a change in both the real and nominal rates.",
        },
      ],
    },
    {
      title: "Money supply (MS)",
      points: [
        {
          term: "Money supply",
          text: "Assumed fixed by the central bank; it does not depend on the interest rate, so the MS curve is vertical.",
        },
        {
          term: "Tools to change MS",
          text: "Open-market operations; changing the interest rate it pays on reserves; changing reserve requirements; changing the discount rate.",
        },
        {
          term: "Open-market purchase",
          text: "The central bank buys bonds and pays with newly created money, so MS shifts right (Problem Set 9). Selling bonds shifts MS left.",
        },
        {
          term: "Lower interest on reserves",
          text: "Holding reserves is less attractive, so banks hold fewer excess reserves and lend out more: MS increases (Problem Set 9).",
        },
      ],
    },
    {
      title: "Money demand (MD)",
      points: [
        {
          term: "Money demand",
          text: "Reflects how much wealth people want to hold as money for the purpose of making purchases.",
        },
        {
          term: "Money vs bonds",
          text: "Assume household wealth includes only two assets: money (liquid but pays no interest) and bonds (pay interest but not as liquid).",
        },
        {
          term: "Downward-sloping MD",
          text: "An increase in the interest rate raises the cost of holding money and thus reduces the quantity of money demanded.",
          eg: "If bonds pay 8% instead of 2%, keeping cash in your wallet costs you more interest, so you hold less.",
        },
        {
          term: "What shifts MD",
          text: "Money demand depends on Y, P and r. A rise in real income (Y) means households want to buy more, so they need more money; a rise in the price level (P) means each good costs more, so they need more money. A rise in Y or P shifts MD right; a change in r is a movement along MD.",
        },
        {
          term: "Other MD shifters (Problem Set 9)",
          text: "Credit cards reducing cash held: MD shifts left. Holding more money for holiday shopping or because payment systems fail: MD shifts right. Paying interest on checking deposits lowers the opportunity cost of holding money: MD shifts right.",
        },
      ],
    },
    {
      title: "Equilibrium in the money market",
      points: [
        {
          term: "Equilibrium interest rate (r*)",
          text: "The interest rate at which the vertical MS curve crosses the downward-sloping MD curve.",
        },
        {
          term: "Adjustment if r < r*",
          text: "Quantity of money demanded exceeds quantity supplied; people reduce their bond holdings to obtain more money; bond issuers have to offer higher interest rates to attract buyers; interest rates rise toward r*.",
        },
        {
          term: "Adjustment if r > r*",
          text: "There is an excess supply of money, so people use it to buy interest-bearing assets and the interest rate falls until people are willing to hold the money (Problem Set 9).",
        },
      ],
      diagrams: [mmEq, mmAdjust],
    },
    {
      title: "The interest-rate effect and the slope of AD",
      points: [
        {
          term: "Interest-rate effect",
          text: "A fall in P reduces money demand, which lowers r. A fall in r increases investment (I) and the quantity of goods and services demanded (Y). So a lower P means a higher quantity of output demanded: AD slopes downward.",
        },
      ],
      formulas: [{ name: "Interest-rate effect chain", expr: "P ↓ → MD ↓ → r ↓ → I ↑ → quantity of Y demanded ↑" }],
      diagrams: [mmPriceFall, adSlope],
    },
    {
      title: "Monetary policy shifts AD",
      points: [
        {
          term: "Contractionary monetary policy",
          text: "The central bank decreases the money supply by selling government bonds in open-market operations; the interest rate rises to balance MS and MD; households and firms respond to the higher r by reducing spending and investment; AD shifts left.",
        },
        {
          term: "Expansionary monetary policy",
          text: "The central bank buys government bonds, increasing MS; r falls; the lower cost of borrowing raises investment and interest-sensitive spending (e.g. housing, cars); AD shifts right (Problem Set 9).",
        },
        {
          term: "Short run vs long run (Problem Set 9)",
          text: "In the short run a monetary expansion lowers r and raises output: money has real effects. In the long run, as output above its natural level bids up wages and prices, SRAS shifts left, output returns to its natural level and the only lasting effect is a higher price level (rising roughly in proportion to the money supply): money is neutral in the long run.",
        },
      ],
      formulas: [
        { name: "Monetary contraction", expr: "Sell bonds → MS ↓ → r ↑ → C and I ↓ → AD shifts left" },
        { name: "Monetary expansion", expr: "Buy bonds → MS ↑ → r ↓ → I ↑ → AD shifts right" },
      ],
      diagrams: [mmContract, adContract, adasLongRun],
    },
    {
      title: "Interest-rate targets",
      points: [
        {
          term: "Why target an interest rate?",
          text: "The money supply is hard to measure with sufficient precision and money demand fluctuates over time, which leads to fluctuations in interest rates, AD and output.",
        },
        {
          term: "Federal funds rate",
          text: "The interest rate the Fed targets. The Fed accommodates the day-to-day shifts in MD by adjusting MS accordingly.",
        },
        {
          term: "Two descriptions of one policy",
          text: "Monetary policy can be described either in terms of the money supply or in terms of the interest rate.",
        },
      ],
    },
    {
      title: "The zero lower bound",
      points: [
        {
          term: "Liquidity trap",
          text: "If interest rates have already fallen to around zero, monetary policy may no longer be effective, since nominal interest rates cannot be reduced further; aggregate demand, production and employment may be 'trapped' at low levels.",
        },
        {
          term: "Zero lower bound",
          text: "The floor of around zero for nominal interest rates. The federal funds rate sat near zero in 2008–2015 and 2020–2022.",
        },
        {
          term: "Forward guidance",
          text: "The central bank commits to keeping interest rates low in the future, which lowers long-term rates and raises expected inflation.",
        },
        {
          term: "Quantitative easing",
          text: "The central bank buys longer-term government bonds and mortgage-backed securities (guaranteed by government or government-sponsored agencies).",
        },
        {
          text: "Both tools were used by the Fed during the Great Recession and the coronavirus recession: the central bank still has tools to expand the economy at the zero lower bound.",
        },
      ],
    },
    {
      title: "Fiscal policy and the multiplier effect",
      points: [
        {
          term: "Fiscal policy and AD",
          text: "Setting G and T. An increase in G and/or a decrease in T shifts AD right; a decrease in G and/or an increase in T shifts AD left.",
        },
        {
          term: "Example: $2b of military trucks",
          text: "G rises by $2b, so AD first shifts right by $2b. Oshkosh's revenue rises $2b and is paid to workers (wages) and owners (profits, dividends). They are also consumers and spend part of the extra income, so C rises and AD rises further.",
        },
        {
          term: "Multiplier effect",
          text: "The additional shifts in AD that result when expansionary fiscal policy increases income and thereby increases consumer spending.",
        },
        {
          term: "Marginal propensity to consume (MPC)",
          text: "The fraction of extra income that households consume rather than save. The size of the multiplier effect depends on how much consumers respond to increases in income.",
          eg: "If MPC = 0.8 and income rises $100, C rises $80.",
        },
        {
          term: "Spending multiplier",
          text: "Each $1 rise in G raises C by MPC × $1, then MPC² × $1, then MPC³ × $1, … The bigger the MPC, the bigger the multiplier.",
        },
        {
          term: "Other applications",
          text: "Each $1 increase in G can generate more than a $1 increase in AD. The same is true for a change in any other component of GDP (C, I, NX): e.g. a boom abroad raises demand for our exports (NX), incomes rise, C rises, and AD shifts right by more than the initial rise in NX.",
        },
      ],
      formulas: [
        { name: "Marginal propensity to consume", expr: "MPC = ΔC ÷ ΔY" },
        { name: "Spending multiplier (series)", expr: "Multiplier = 1 + MPC + MPC² + MPC³ + …" },
        { name: "Spending multiplier", expr: "Multiplier = 1 ÷ (1 − MPC)" },
        { name: "Change in AD (multiplier only)", expr: "ΔAD = Multiplier × ΔG" },
      ],
      worked: [
        {
          problem: "The government increases spending by $2 billion and MPC = 0.8. What is the initial change in AD, and the total change in AD?",
          solution: "Initially AD rises by $2 billion.\nSpending multiplier = 1 ÷ (1 − 0.8) = 5\nIncrease in AD = 5 × $2 billion = $10 billion",
        },
        {
          problem: "An increase in G of $10 billion raises the total demand for goods and services by $30 billion. Ignoring crowding out, what is the MPC? (Problem Set 9)",
          solution: "Multiplier = $30b ÷ $10b = 3\n3 = 1 ÷ (1 − MPC) → 1 − MPC = 1/3\nMPC = 2/3 ≈ 0.67",
        },
        {
          problem: "Output is $400 billion below its natural level. The central bank holds r constant (no crowding out), MPC = 4/5 and P is fixed. How must G change? (Problem Set 9)",
          solution: "Multiplier = 1 ÷ (1 − 4/5) = 5\nWith P fixed, SRAS is horizontal, so a $1 rise in AD raises output by $1.\nΔG = $400b ÷ 5 = $80 billion increase",
        },
      ],
      diagrams: [adMultiplier],
    },
    {
      title: "The crowding-out effect",
      points: [
        {
          term: "Crowding-out effect",
          text: "The offset in aggregate demand that results when expansionary fiscal policy raises the interest rate and thereby reduces investment spending, which reduces the net increase in AD.",
        },
        {
          term: "Mechanism",
          text: "Higher G raises Y; higher Y increases money demand; with MS fixed, r rises; the higher r reduces investment, so AD shifts right by less.",
        },
        {
          term: "Net effect",
          text: "An increase in G of $2 billion could raise AD by more or less than $2 billion, depending on the sizes of the multiplier and crowding-out effects.",
        },
        {
          term: "Central bank response (Problem Set 9)",
          text: "If the central bank holds the money supply constant, r rises and crowding out occurs. If it keeps r fixed, it must increase MS to meet the higher money demand, so there is no crowding out and the full multiplier applies: the effect of G on AD is larger.",
        },
        {
          term: "Accelerator effect (Problem Set 9)",
          text: "The idea that higher output (or higher expected sales) induces firms to invest more in capital goods. Expansionary fiscal policy is more likely to raise investment when the accelerator is large and when the interest sensitivity of investment is small (weaker crowding out).",
        },
      ],
      formulas: [
        { name: "Crowding-out chain", expr: "G ↑ → Y ↑ → MD ↑ → r ↑ → I ↓" },
        { name: "Accelerator chain", expr: "G ↑ → Y ↑ → I ↑" },
      ],
      table: [
        ["Central bank response to higher G", "Interest rate", "Crowding out", "Effect on AD"],
        ["Holds money supply constant", "Rises", "Yes: I falls", "Smaller"],
        ["Holds interest rate fixed (raises MS)", "Unchanged", "None", "Larger: full multiplier"],
      ],
      diagrams: [mmCrowd, adCrowd],
    },
    {
      title: "Changes in taxes",
      points: [
        {
          term: "Tax cut",
          text: "Increases households' take-home pay; households spend a portion of this extra income, shifting AD right. The size of the shift is affected by the multiplier and crowding-out effects.",
        },
        {
          term: "Households' perception",
          text: "Another determinant of the size of the AD shift. A permanent tax cut has a large impact on AD; a temporary tax cut has a small impact.",
        },
        {
          term: "Why (Problem Set 9)",
          text: "Households base spending on their long-term (permanent) income. A permanent tax cut adds substantially to lifetime resources, so consumption rises a lot; a one-year cut adds only a little, so households save much of it.",
        },
      ],
    },
    {
      title: "The debate over stabilisation policy",
      points: [
        {
          term: "Animal spirits",
          text: "Keynes: waves of pessimism and optimism among households and firms that shift aggregate demand and cause fluctuations in output and employment. If policymakers do nothing, these fluctuations destabilise businesses, workers and consumers.",
        },
        {
          term: "Case for active stabilisation policy",
          text: "Government should use policy to reduce fluctuations: when GDP falls below its natural rate, use expansionary monetary or fiscal policy to prevent or reduce a recession; when GDP rises above its natural rate, use contractionary policy to prevent or reduce an inflationary boom.",
        },
        {
          term: "Lag of monetary policy",
          text: "Firms make investment plans in advance, so I takes time to respond to changes in r. Most economists believe it takes at least 6 months for monetary policy to affect output and employment.",
        },
        {
          term: "Lag of fiscal policy",
          text: "Changes in G and T require legislation (in the U.S., acts of Congress), and the legislative process can take months or years.",
        },
        {
          term: "Case against active stabilisation policy",
          text: "Because of these long lags, policies may destabilise the economy rather than help it: by the time they affect AD, the economy's condition may have changed. Critics say policymakers should focus on long-run goals like economic growth and low inflation rather than trying to fine-tune the economy.",
        },
        {
          term: "Automatic stabilisers",
          text: "Changes in fiscal policy that stimulate aggregate demand when the economy goes into a recession, without policymakers taking any deliberate action, so they avoid long lags.",
          eg: "In a recession, income tax collections fall as incomes fall (T ↓) and unemployment insurance and welfare payments rise (G ↑).",
        },
      ],
      table: [
        ["", "Case for active policy", "Case against active policy"],
        ["Source of fluctuations", "Animal spirits shift AD", "Policy itself may add instability"],
        ["Prescription", "Expansionary in recession, contractionary in boom", "Focus on long-run growth and low inflation"],
        ["Key concern", "Fluctuations hurt businesses, workers, consumers", "Long lags: ≥6 months (monetary), months–years (fiscal)"],
      ],
    },
    {
      title: "A simple model of AD (Problem Set 9)",
      intro: "Problem Set 9 Q11 uses equations to combine fiscal and monetary policy.",
      points: [
        { term: "Y = C + I + G", text: "Equilibrium condition for a closed economy: output equals the sum of consumption, investment and government purchases." },
        { term: "C = 100 + 0.75(Y − T)", text: "Consumption function: consumption depends on disposable income (Y − T). The MPC is the coefficient on disposable income (0.75)." },
        { term: "I = 500 − 50r", text: "Investment function: investment falls as the interest rate rises." },
        { term: "G = 125, T = 100", text: "Government purchases and taxes are fixed by fiscal policy." },
      ],
      worked: [
        {
          problem: "Y = C + I + G, C = 100 + 0.75(Y − T), I = 500 − 50r, G = 125, T = 100, full-employment GDP = 2,000. (c) If r = 4, solve for GDP. (d) What change in G restores full employment? (e) What r restores full employment?",
          solution: "(c) Y = 100 + 0.75(Y − 100) + 500 − 50(4) + 125\nY = 100 + 0.75Y − 75 + 500 − 200 + 125 = 450 + 0.75Y\n0.25Y = 450 → Y = 1,800 (200 below full employment: a recessionary gap)\n(d) Multiplier = 1 ÷ (1 − 0.75) = 4; ΔG = 200 ÷ 4 = 50, so G rises from 125 to 175\n(e) 2,000 = 100 + 0.75(2,000 − 100) + 500 − 50r + 125 = 2,150 − 50r\n50r = 150 → r = 3: the interest rate must fall by 1 percentage point",
        },
      ],
    },
  ],

  // ------------------------------------------------------------------ flashcards
  flashcards: [
    { id: "policy-c1", type: "concept", front: "The central bank's control of the money supply and interest rates.", back: "Monetary policy", why: "Its main tools are open-market operations and the interest rate paid on reserves." },
    { id: "policy-c2", type: "concept", front: "The government's choices about the levels of spending (G) and taxation (T).", back: "Fiscal policy", why: "An increase in G or a decrease in T shifts AD to the right." },
    { id: "policy-c3", type: "concept", front: "Keynes's theory that the interest rate adjusts to balance the supply of and demand for money.", back: "Theory of liquidity preference / Liquidity preference", why: "It explains the interest-rate effect and how monetary policy affects AD." },
    { id: "policy-c4", type: "concept", front: "Of the three reasons the AD curve slopes downward, the one the lecture calls most important for the U.S. economy.", back: "Interest-rate effect", why: "A lower P reduces money demand, lowers r and raises investment." },
    { id: "policy-c5", type: "concept", front: "In the money market diagram, this curve is vertical because it is fixed by the central bank and does not depend on r.", back: "Money supply (MS)", why: "Only the central bank's tools shift it, not changes in r." },
    { id: "policy-c6", type: "concept", front: "How much wealth people want to hold as money for the purpose of making purchases.", back: "Money demand (MD)", why: "It slopes downward because a higher r raises the cost of holding money." },
    { id: "policy-c7", type: "concept", front: "The asset in the liquidity preference model that is liquid but pays no interest.", back: "Money", why: "Its opposite is bonds, which pay interest but are less liquid." },
    { id: "policy-c8", type: "concept", front: "The asset in the liquidity preference model that pays interest but is not as liquid.", back: "Bonds", why: "When people want more money they sell bonds; when they have excess money they buy them." },
    { id: "policy-c9", type: "concept", front: "The variable whose rise increases the cost of holding money and so reduces the quantity of money demanded.", back: "Interest rate (r)", why: "A change in r is a movement along the MD curve, not a shift." },
    { id: "policy-c10", type: "concept", front: "The two variables (besides r) that influence money demand and shift the MD curve right when they rise.", back: "Real income and price level (Y and P)", why: "More income or higher prices mean households need more money for purchases." },
    { id: "policy-c11", type: "concept", front: "The central bank buying or selling government bonds to change the money supply.", back: "Open-market operations", why: "Buying bonds adds money (reserves) to the economy; selling bonds removes it." },
    { id: "policy-c12", type: "concept", front: "Besides open-market operations and interest on reserves, the two other tools the central bank can use to change MS.", back: "Reserve requirements and discount rate", why: "All four tools are listed under the theory of liquidity preference." },
    { id: "policy-c13", type: "concept", front: "The interest rate the Fed targets, adjusting MS to accommodate day-to-day shifts in money demand.", back: "Federal funds rate", why: "Targeting r avoids fluctuations caused by imprecise MS measurement and shifting MD." },
    { id: "policy-c14", type: "concept", front: "A situation where interest rates are already around zero, so monetary policy may no longer be effective and AD, production and employment may be stuck at low levels.", back: "Liquidity trap", why: "Nominal interest rates cannot be reduced further below about zero." },
    { id: "policy-c15", type: "concept", front: "The floor of about zero below which nominal interest rates cannot be reduced.", back: "Zero lower bound", why: "The federal funds rate sat near this floor in 2008–2015 and 2020–2022." },
    { id: "policy-c16", type: "concept", front: "The central bank commits to keeping interest rates low in the future, lowering long-term rates and raising expected inflation.", back: "Forward guidance", why: "One of two tools still available at the zero lower bound." },
    { id: "policy-c17", type: "concept", front: "The central bank buys longer-term government bonds and mortgage-backed securities.", back: "Quantitative easing (QE)", why: "Used by the Fed in the Great Recession and the coronavirus recession." },
    { id: "policy-c18", type: "concept", front: "The additional shifts in AD that result when expansionary fiscal policy increases income and thereby increases consumer spending.", back: "Multiplier effect", why: "A $2b rise in G raises incomes, which raises C, so AD shifts by more than $2b." },
    { id: "policy-c19", type: "concept", front: "The fraction of extra income that households consume rather than save.", back: "Marginal propensity to consume (MPC)", why: "If it is 0.8 and income rises $100, consumption rises $80." },
    { id: "policy-c20", type: "concept", front: "1 ÷ (1 − MPC), or 1 + MPC + MPC² + MPC³ + …", back: "Spending multiplier / Multiplier", why: "With MPC = 0.8 it equals 5: each $1 of G raises AD by $5." },
    { id: "policy-c21", type: "concept", front: "The offset in AD that results when expansionary fiscal policy raises the interest rate and thereby reduces investment spending.", back: "Crowding-out effect", why: "It works against the multiplier effect, reducing the net increase in AD." },
    { id: "policy-c22", type: "concept", front: "Keynes's term for waves of pessimism and optimism among households and firms that shift AD.", back: "Animal spirits", why: "Proponents of active policy argue government should offset these swings." },
    { id: "policy-c23", type: "concept", front: "Using expansionary policy when GDP is below its natural rate and contractionary policy when it is above, to reduce fluctuations.", back: "Active stabilisation policy / Stabilization policy", why: "Critics argue long lags may make it destabilising." },
    { id: "policy-c24", type: "concept", front: "Policy used when GDP rises above its natural rate to prevent or reduce an inflationary boom.", back: "Contractionary policy", why: "E.g. selling bonds to raise r, or cutting G." },
    { id: "policy-c25", type: "concept", front: "Changes in fiscal policy that stimulate AD in a recession without policymakers taking any deliberate action.", back: "Automatic stabilisers / Automatic stabilizers", why: "Income tax collections fall and unemployment insurance rises in a recession, avoiding long lags." },
    { id: "policy-c26", type: "concept", front: "The idea that higher output (or higher expected sales) induces firms to invest more in capital goods.", back: "Accelerator effect", why: "From Problem Set 9: it pushes investment up while crowding out pushes it down." },
    { id: "policy-c27", type: "concept", front: "The proposition that money changes only the price level, not output, in the long run.", back: "Monetary neutrality / Money is neutral", why: "Problem Set 9: money has real effects in the short run but is neutral in the long run." },
    { id: "policy-s1", type: "scenario", front: "The central bank's bond traders buy bonds in open-market operations. What happens to MS, MD and the interest rate?", back: "MS rises, MD unchanged, r falls", why: "The central bank pays for the bonds with newly created money, so MS shifts right. With MD unchanged, the new intersection is at a lower r." },
    { id: "policy-s2", type: "scenario", front: "Greater credit-card availability reduces the amount of cash people want to hold. What happens to MS, MD and r?", back: "MS unchanged, MD falls, r falls", why: "At every interest rate people want less money, so MD shifts left along a vertical MS; the equilibrium r falls." },
    { id: "policy-s3", type: "scenario", front: "The central bank reduces the interest rate it pays on reserves. What happens to MS and r?", back: "MS rises, r falls", why: "Holding reserves is less attractive, so banks hold fewer excess reserves and lend more. MS shifts right and r falls (MD unchanged)." },
    { id: "policy-s4", type: "scenario", front: "A wave of optimism boosts business investment and expands AD. The central bank does not respond. What happens in the money market?", back: "MD rises, r rises (MS unchanged)", why: "Higher AD raises income and the price level, so people need more money for transactions. MD shifts right against a fixed MS, raising r." },
    { id: "policy-s5", type: "scenario", front: "The price level falls. Trace the interest-rate effect through to the quantity of output demanded.", back: "MD falls, r falls, I rises, quantity of Y demanded rises", why: "Lower P means less money is needed for purchases, so MD shifts left and r falls. Lower r raises investment: a movement down along the AD curve." },
    { id: "policy-s6", type: "scenario", front: "The interest rate is below its equilibrium level r*. Describe how the money market adjusts.", back: "r rises toward r*", why: "Quantity of money demanded exceeds quantity supplied, so people sell bonds to get money; bond issuers must offer higher interest rates to attract buyers, so r rises." },
    { id: "policy-s7", type: "scenario", front: "The central bank sells government bonds. Trace the effect on r, spending and AD.", back: "r rises, C and I fall, AD shifts left", why: "Selling bonds reduces MS; r rises to balance MS and MD; households and firms cut spending and investment, so AD shifts left (contractionary monetary policy)." },
    { id: "policy-s8", type: "scenario", front: "The government spends an extra $2 billion and MPC = 0.8. Ignoring crowding out, by how much does AD shift?", back: "$10 billion", why: "Spending multiplier = 1 ÷ (1 − 0.8) = 5, so ΔAD = 5 × $2b = $10b." },
    { id: "policy-s9", type: "scenario", front: "Economists see a $10b rise in G raise total demand by $30b. Ignoring crowding out, what MPC do they infer? Would allowing for crowding out make the estimate larger or smaller?", back: "MPC = 2/3; larger", why: "Multiplier = 30 ÷ 10 = 3 = 1 ÷ (1 − MPC), so MPC = 2/3. The $30b is net of crowding out, so the pure multiplier must exceed 3, implying MPC above 2/3." },
    { id: "policy-s10", type: "scenario", front: "Output is $400b below natural, MPC = 4/5, the central bank holds r constant and P is fixed. How must G change?", back: "Increase G by $80 billion", why: "Multiplier = 1 ÷ (1 − 0.8) = 5 with no crowding out; with fixed P, AD changes fully become output changes, so ΔG = 400 ÷ 5 = 80." },
    { id: "policy-s11", type: "scenario", front: "G rises. Will AD rise more if the central bank holds MS constant or holds r fixed?", back: "If it holds r fixed", why: "Higher income raises MD. With MS constant, r rises and crowds out investment; with r fixed, the central bank raises MS, so there is no crowding out and the full multiplier applies." },
    { id: "policy-s12", type: "scenario", front: "Households receive either a one-year tax cut or a permanent tax cut of the same size. Which has the greater impact on AD?", back: "The permanent tax cut", why: "Households base spending on long-term income. A permanent cut adds much more to lifetime resources, so C and AD rise more; a temporary cut is largely saved." },
    { id: "policy-s13", type: "scenario", front: "A computer virus disrupts ATMs so people want more cash. The central bank wants to keep AD stable. What should it do?", back: "Increase MS by buying government bonds", why: "MD rises, which would raise r and cut AD. Buying bonds raises MS just enough to keep r unchanged, so AD does not change." },
    { id: "policy-s14", type: "scenario", front: "A boom abroad raises demand for our exports by $1b. Does AD shift by more or less than $1b (ignoring crowding out)?", back: "More than $1b", why: "The multiplier applies to any component of GDP: higher NX raises incomes, which raises C, shifting AD further right." },
    { id: "policy-s15", type: "scenario", front: "Interest rates are near zero and the economy is in recession. Name two tools the central bank can still use.", back: "Forward guidance and quantitative easing", why: "Commit to low future rates to lower long-term rates; buy long-term bonds and mortgage-backed securities. Both were used in the Great Recession." },
  ],

  // ------------------------------------------------------------------ quiz
  quiz: [
    { id: "policy-q1", kind: "fill", sub: "Policy types", prompt: "The central bank's control of the money supply and interest rates is called ____ policy.", answers: [["monetary"]], explain: "Monetary policy: main tools are open-market operations and the interest rate on reserves." },
    { id: "policy-q2", kind: "fill", sub: "Policy types", prompt: "The government's choices about the levels of spending (G) and taxation (T) are called ____ policy.", answers: [["fiscal"]], explain: "Fiscal policy sets G and T." },
    { id: "policy-q3", kind: "fill", sub: "Policy types", prompt: "The two main tools of monetary policy are open-market operations and the interest rate the central bank pays on ____.", answers: [["reserves", "bank reserves"]], explain: "Lowering the interest rate on reserves encourages banks to lend more, raising MS." },
    { id: "policy-q4", kind: "fill", sub: "Slope of AD", prompt: "Of the wealth, interest-rate and exchange-rate effects, the ____ effect is the most important for the U.S. economy.", answers: [["interest-rate", "interest rate"]], explain: "The theory of liquidity preference explains this effect." },
    { id: "policy-q5", kind: "fill", sub: "Liquidity preference", prompt: "According to Keynes's theory of ____, the interest rate adjusts to balance the supply of and demand for money.", answers: [["liquidity preference"]], explain: "The theory of liquidity preference determines r in the short run." },
    { id: "policy-q6", kind: "fill", sub: "Liquidity preference", prompt: "Because expected ____ is assumed constant in the short run, the nominal and real interest rates move together.", answers: [["inflation", "inflation rate"]], explain: "Nominal and real rates differ by a constant (expected inflation), so a change in 'the interest rate' changes both." },
    { id: "policy-q7", kind: "fill", sub: "Money supply", prompt: "The money-supply curve is ____ because MS is fixed by the central bank and does not depend on the interest rate.", answers: [["vertical"]], explain: "Changes in r do not affect MS." },
    { id: "policy-q8", kind: "fill", sub: "Money supply", prompt: "The four tools for changing MS are open-market operations, the interest rate on reserves, reserve requirements and the ____ rate.", answers: [["discount"]], explain: "All four are listed in the lecture under the theory of liquidity preference." },
    { id: "policy-q9", kind: "fill", sub: "Money demand", prompt: "In the model, household wealth is held as money (liquid, no interest) or ____ (pay interest, less liquid).", answers: [["bonds", "bond"]], explain: "This two-asset choice is why r is the cost of holding money." },
    { id: "policy-q10", kind: "fill", sub: "Money demand", prompt: "An increase in the interest rate raises the ____ of holding money, reducing the quantity of money demanded.", answers: [["cost", "opportunity cost"]], explain: "Money pays no interest, so a higher r means more interest given up." },
    { id: "policy-q11", kind: "fill", sub: "Money demand", prompt: "Because a higher r reduces the quantity of money demanded, the MD curve slopes ____.", answers: [["downward", "down", "downwards"]], explain: "A fall in r increases the quantity of money demanded." },
    { id: "policy-q12", kind: "fill", sub: "Money demand", prompt: "A rise in real income or the price level shifts the MD curve to the ____.", answers: [["right"]], explain: "Households need more money to make their purchases." },
    { id: "policy-q13", kind: "fill", sub: "Money demand", prompt: "A change in the interest rate causes a ____ along the MD curve, not a shift.", answers: [["movement"]], explain: "Only Y, P (and other non-r factors) shift MD." },
    { id: "policy-q14", kind: "fill", sub: "Money market equilibrium", prompt: "If r is below r*, the quantity of money demanded ____ the quantity supplied.", answers: [["exceeds", "is greater than", "is more than", "is higher than"]], explain: "This excess demand for money pushes r up." },
    { id: "policy-q15", kind: "fill", sub: "Money market equilibrium", prompt: "When r is below r*, people reduce their ____ holdings to obtain more money, and bond issuers must offer higher interest rates.", answers: [["bond", "bonds"]], explain: "Selling bonds pushes interest rates up toward r*." },
    { id: "policy-q16", kind: "fill", sub: "Interest-rate effect", prompt: "A fall in the price level reduces money demand, which ____ the interest rate.", answers: [["lowers", "reduces", "decreases"]], explain: "MD shifts left along a vertical MS." },
    { id: "policy-q17", kind: "fill", sub: "Interest-rate effect", prompt: "A fall in r increases ____ spending, raising the quantity of goods and services demanded.", answers: [["investment"]], explain: "This links the money market to the downward slope of AD." },
    { id: "policy-q18", kind: "fill", sub: "Monetary policy and AD", prompt: "To decrease the money supply, the central bank ____ government bonds in open-market operations.", answers: [["sells"]], explain: "Selling bonds takes money out of the economy." },
    { id: "policy-q19", kind: "fill", sub: "Monetary policy and AD", prompt: "A reduction in the money supply raises r and shifts the AD curve to the ____.", answers: [["left"]], explain: "Households and firms reduce spending and investment at the higher r." },
    { id: "policy-q20", kind: "fill", sub: "Monetary policy and AD", prompt: "In the long run, a monetary expansion leaves output at its natural level and only raises the price level: money is ____ in the long run.", answers: [["neutral"]], explain: "Problem Set 9: money has real effects in the short run but is neutral in the long run." },
    { id: "policy-q21", kind: "fill", sub: "Interest-rate targets", prompt: "The Fed's monetary policy targets the ____ rate.", answers: [["federal funds", "fed funds"]], explain: "It accommodates day-to-day shifts in MD by adjusting MS." },
    { id: "policy-q22", kind: "fill", sub: "Interest-rate targets", prompt: "One reason to target an interest rate is that money demand ____ over time.", answers: [["fluctuates", "shifts", "changes"]], explain: "MS is also hard to measure precisely; both cause fluctuations in r, AD and output." },
    { id: "policy-q23", kind: "fill", sub: "Zero lower bound", prompt: "When interest rates have already fallen to around zero and monetary policy may no longer be effective, the economy is in a ____.", answers: [["liquidity trap"]], explain: "AD, production and employment may be 'trapped' at low levels." },
    { id: "policy-q24", kind: "fill", sub: "Zero lower bound", prompt: "The fact that nominal interest rates cannot be reduced below about zero is called the ____.", answers: [["zero lower bound", "ZLB"]], explain: "The federal funds rate sat near zero in 2008–2015 and 2020–2022." },
    { id: "policy-q25", kind: "fill", sub: "Zero lower bound", prompt: "A central bank commitment to keep interest rates low in the future is called ____.", answers: [["forward guidance"]], explain: "It lowers long-term rates and raises expected inflation." },
    { id: "policy-q26", kind: "fill", sub: "Zero lower bound", prompt: "Buying longer-term government bonds and mortgage-backed securities is called ____.", answers: [["quantitative easing", "QE"]], explain: "Used by the Fed in the Great Recession and the coronavirus recession." },
    { id: "policy-q27", kind: "fill", sub: "Fiscal policy and AD", prompt: "An increase in G and/or a ____ in T shifts AD to the right.", answers: [["decrease", "cut", "fall", "reduction"]], explain: "Lower taxes raise take-home pay and spending." },
    { id: "policy-q28", kind: "fill", sub: "Multiplier effect", prompt: "The additional shifts in AD that result when expansionary fiscal policy raises income and consumer spending are called the ____ effect.", answers: [["multiplier"]], explain: "Higher income raises C, shifting AD further right." },
    { id: "policy-q29", kind: "fill", sub: "MPC", prompt: "The fraction of extra income that households consume rather than save is the marginal propensity to ____.", answers: [["consume"]], explain: "MPC = ΔC ÷ ΔY." },
    { id: "policy-q30", kind: "fill", sub: "MPC", prompt: "If MPC = 0.8 and income rises by $100, consumption rises by $____.", answers: [["80"]], explain: "ΔC = MPC × ΔY = 0.8 × 100 = 80." },
    { id: "policy-q31", kind: "fill", sub: "Spending multiplier", prompt: "Spending multiplier = 1 ÷ (1 − ____).", answers: [["MPC", "marginal propensity to consume"]], explain: "It is the sum 1 + MPC + MPC² + MPC³ + …" },
    { id: "policy-q32", kind: "fill", sub: "Spending multiplier", prompt: "The bigger the MPC, the ____ the multiplier.", answers: [["bigger", "larger", "greater"]], explain: "Each round of spending is a larger fraction of the last." },
    { id: "policy-q33", kind: "fill", sub: "Spending multiplier", prompt: "If MPC = 0.75, the spending multiplier is ____.", answers: [["4"]], explain: "1 ÷ (1 − 0.75) = 1 ÷ 0.25 = 4." },
    { id: "policy-q34", kind: "fill", sub: "Spending multiplier", prompt: "If MPC = 0.6, the spending multiplier is ____ (1 d.p.).", answers: [["2.5"]], explain: "1 ÷ (1 − 0.6) = 1 ÷ 0.4 = 2.5." },
    { id: "policy-q35", kind: "fill", sub: "Spending multiplier", prompt: "If the spending multiplier is 5, the MPC is ____ (1 d.p.).", answers: [["0.8"]], explain: "5 = 1 ÷ (1 − MPC) → 1 − MPC = 0.2 → MPC = 0.8." },
    { id: "policy-q36", kind: "fill", sub: "Change in AD", prompt: "G rises by $2 billion and MPC = 0.8. Ignoring crowding out, AD increases by $____ billion.", answers: [["10"]], explain: "Multiplier = 1 ÷ 0.2 = 5; 5 × $2b = $10b." },
    { id: "policy-q37", kind: "fill", sub: "Change in AD", prompt: "G rises by $30 billion and MPC = 0.6. Ignoring crowding out, AD increases by $____ billion.", answers: [["75"]], explain: "Multiplier = 1 ÷ 0.4 = 2.5; 2.5 × $30b = $75b." },
    { id: "policy-q38", kind: "fill", sub: "Multiplier applications", prompt: "The multiplier effect also applies to changes in C, I and ____, e.g. a boom abroad that raises demand for our exports.", answers: [["NX", "net exports"]], explain: "Any component of GDP sets off the same income–consumption rounds." },
    { id: "policy-q39", kind: "fill", sub: "Crowding out", prompt: "The offset in AD that results when expansionary fiscal policy raises r and reduces investment is the ____ effect.", answers: [["crowding-out", "crowding out"]], explain: "It reduces the net increase in AD." },
    { id: "policy-q40", kind: "fill", sub: "Crowding out", prompt: "In crowding out, higher income increases money ____, which raises the interest rate.", answers: [["demand"]], explain: "G ↑ → Y ↑ → MD ↑ → r ↑ → I ↓." },
    { id: "policy-q41", kind: "fill", sub: "Crowding out", prompt: "Government spending raises AD by more if the central bank holds the ____ fixed rather than holding the money supply constant.", answers: [["interest rate", "r"]], explain: "Holding r fixed means raising MS, so there is no crowding out (Problem Set 9)." },
    { id: "policy-q42", kind: "fill", sub: "Accelerator", prompt: "The idea that higher output induces firms to invest more in capital goods is the ____ effect.", answers: [["accelerator"]], explain: "Problem Set 9: it works opposite to crowding out." },
    { id: "policy-q43", kind: "fill", sub: "Accelerator", prompt: "Expansionary fiscal policy is more likely to raise investment when the interest sensitivity of investment is ____.", answers: [["small", "low"]], explain: "Then the rise in r crowds out little investment." },
    { id: "policy-q44", kind: "fill", sub: "Taxes", prompt: "A ____ tax cut has a larger impact on AD than a temporary one.", answers: [["permanent"]], explain: "It adds more to households' lifetime resources." },
    { id: "policy-q45", kind: "fill", sub: "Stabilisation debate", prompt: "Keynes called the waves of pessimism and optimism that shift AD '____'.", answers: [["animal spirits"]], explain: "They cause fluctuations in output and employment." },
    { id: "policy-q46", kind: "fill", sub: "Stabilisation debate", prompt: "When GDP falls below its natural rate, proponents of active policy use ____ monetary or fiscal policy.", answers: [["expansionary"]], explain: "To prevent or reduce a recession." },
    { id: "policy-q47", kind: "fill", sub: "Stabilisation debate", prompt: "When GDP rises above its natural rate, proponents use ____ policy to prevent an inflationary boom.", answers: [["contractionary"]], explain: "E.g. raising r or cutting G." },
    { id: "policy-q48", kind: "fill", sub: "Stabilisation debate", prompt: "Most economists believe it takes at least ____ months for monetary policy to affect output and employment.", answers: [["6", "six"]], explain: "Firms make investment plans in advance." },
    { id: "policy-q49", kind: "fill", sub: "Stabilisation debate", prompt: "Critics of active policy say policymakers should focus on long-run goals like economic growth and low ____.", answers: [["inflation"]], explain: "Rather than trying to fine-tune the economy." },
    { id: "policy-q50", kind: "fill", sub: "Automatic stabilisers", prompt: "Changes in fiscal policy that stimulate AD in a recession without deliberate action are called automatic ____.", answers: [["stabilizers", "stabilisers"]], explain: "They avoid the long lags of discretionary policy." },
    { id: "policy-q51", kind: "fill", sub: "Automatic stabilisers", prompt: "During a recession, income tax collections ____ as incomes fall.", answers: [["fall", "decrease", "drop"]], explain: "And unemployment insurance and welfare payments rise." },
    { id: "policy-q52", kind: "fill", sub: "Problem Set 9", prompt: "A $10b rise in G raises total demand by $30b. Ignoring crowding out, the MPC is ____ (2 d.p.).", answers: [["0.67", "2/3"]], explain: "Multiplier = 3 = 1 ÷ (1 − MPC) → MPC = 2/3 ≈ 0.67." },
    { id: "policy-q53", kind: "fill", sub: "Problem Set 9", prompt: "Output is $400b below natural, MPC = 4/5, no crowding out, P fixed. G must rise by $____ billion.", answers: [["80"]], explain: "Multiplier = 5; 400 ÷ 5 = 80." },
    { id: "policy-q54", kind: "fill", sub: "Problem Set 9", prompt: "Y = C + I + G, C = 100 + 0.75(Y − T), I = 500 − 50r, G = 125, T = 100, r = 4. Equilibrium GDP = ____.", answers: [["1800", "1,800"]], explain: "Y = 450 + 0.75Y → 0.25Y = 450 → Y = 1,800." },
    { id: "policy-q55", kind: "fill", sub: "Problem Set 9", prompt: "In the same economy (full employment 2,000), with G = 125 the interest rate that restores full employment is ____%.", answers: [["3"]], explain: "2,000 = 2,150 − 50r → r = 3." },
    { id: "policy-q56", kind: "mcq", sub: "Money market", prompt: "The central bank buys bonds in open-market operations. What happens in the money market?", options: ["MS shifts right; r falls", "MS shifts left; r rises", "MD shifts right; r rises", "MD shifts left; r falls"], answer: 0, explain: "It pays with newly created money, so MS rises; MD is unchanged, so r falls." },
    { id: "policy-q57", kind: "mcq", sub: "Money market", prompt: "Which of these shifts the money-demand curve to the right?", options: ["A fall in the interest rate", "A rise in the price level", "An open-market purchase", "Greater credit-card availability"], answer: 1, explain: "Higher P means more money is needed for the same purchases. A change in r is a movement along MD." },
    { id: "policy-q58", kind: "mcq", sub: "Money market", prompt: "Households decide to hold more money for holiday shopping. With MS unchanged:", options: ["MD falls and r falls", "MS rises and r falls", "MD rises and r rises", "Nothing changes"], answer: 2, explain: "MD shifts right against a vertical MS, so r rises (Problem Set 9)." },
    { id: "policy-q59", kind: "mcq", sub: "Money market", prompt: "Banks were allowed to pay interest on checking deposits. If the central bank kept MS constant, what would have happened?", options: ["MD falls, r falls, AD rises", "MD rises, r rises, AD and output fall", "MS rises, r falls, AD rises", "MD rises, r falls, AD rises"], answer: 1, explain: "The opportunity cost of holding money falls, so MD rises; with fixed MS, r rises and AD and output fall (Problem Set 9)." },
    { id: "policy-q60", kind: "mcq", sub: "Interest-rate targets", prompt: "Which is a reason given for targeting an interest rate rather than the money supply?", options: ["Interest rates cannot change", "MS is hard to measure precisely and MD fluctuates", "Money demand is perfectly stable", "Fiscal policy controls the money supply"], answer: 1, explain: "These cause fluctuations in r, AD and output, so the Fed targets the federal funds rate." },
    { id: "policy-q61", kind: "mcq", sub: "Zero lower bound", prompt: "Which pair of tools can the central bank still use at the zero lower bound?", options: ["Forward guidance and quantitative easing", "Raising taxes and cutting G", "Raising reserve requirements and selling bonds", "Automatic stabilisers and tariffs"], answer: 0, explain: "Both were used by the Fed in the Great Recession and coronavirus recession." },
    { id: "policy-q62", kind: "mcq", sub: "Multiplier vs crowding out", prompt: "A $2b increase in G will raise AD by:", options: ["Exactly $2b", "Always more than $2b", "Always less than $2b", "More or less than $2b, depending on the multiplier and crowding-out effects"], answer: 3, explain: "The multiplier enlarges the shift; crowding out reduces it." },
    { id: "policy-q63", kind: "mcq", sub: "Accelerator", prompt: "Expansionary fiscal policy is MOST likely to raise investment in the short run when:", options: ["The accelerator is small and investment is very interest-sensitive", "The accelerator is large and investment is not very interest-sensitive", "The accelerator is small and investment is not interest-sensitive", "The accelerator is large and investment is very interest-sensitive"], answer: 1, explain: "A large accelerator raises I strongly; low interest sensitivity weakens crowding out (Problem Set 9)." },
    { id: "policy-q64", kind: "mcq", sub: "Automatic stabilisers", prompt: "Which is an example of an automatic stabiliser in a recession?", options: ["Congress passes a new spending bill", "The central bank buys bonds", "Unemployment insurance payments rise", "The central bank announces forward guidance"], answer: 2, explain: "It happens without deliberate action, so it avoids long lags." },
    { id: "policy-q65", kind: "mcq", sub: "Stabilisation debate", prompt: "The main argument against active stabilisation policy in the lecture is that:", options: ["Policy has no effect on AD", "Long lags mean policy may take effect after conditions have changed", "Animal spirits never shift AD", "The multiplier is always less than 1"], answer: 1, explain: "Monetary policy takes at least 6 months; fiscal policy needs legislation that can take months or years." },
  ],

  // ------------------------------------------------------------------ exam
  exam: [
    // ---- calc
    {
      id: "policy-e1", section: "calc", sub: "Spending multiplier", source: "Lecture 9 Example 3",
      prompt: "The government increases spending by $2 billion. If the MPC is 0.8, calculate the total change in aggregate demand (ignore crowding out).",
      marks: 3,
      rubric: [
        { point: "States the formula: multiplier = 1 ÷ (1 − MPC), ΔAD = multiplier × ΔG", marks: 1 },
        { point: "Correct working: 1 ÷ (1 − 0.8) = 5; 5 × $2b", marks: 1 },
        { point: "Correct answer: AD rises by $10 billion", marks: 1 },
      ],
      model: "Multiplier = 1 ÷ (1 − MPC) = 1 ÷ (1 − 0.8) = 1 ÷ 0.2 = 5\nΔAD = multiplier × ΔG = 5 × $2 billion = $10 billion\nAD initially rises by $2b, and in total by $10 billion.",
      answer: "$10 billion",
    },
    {
      id: "policy-e2", section: "calc", sub: "MPC from the multiplier", source: "Problem Set 9 Q7",
      prompt: "Economists observe that an increase in government spending of $10 billion raises the total demand for goods and services by $30 billion. Ignoring crowding out, estimate the MPC (2 d.p.).",
      marks: 3,
      rubric: [
        { point: "States multiplier = ΔAD ÷ ΔG and multiplier = 1 ÷ (1 − MPC)", marks: 1 },
        { point: "Correct working: 30 ÷ 10 = 3; 3 = 1 ÷ (1 − MPC) → 1 − MPC = 1/3", marks: 1 },
        { point: "Correct answer: MPC = 2/3 ≈ 0.67", marks: 1 },
      ],
      model: "Multiplier = ΔAD ÷ ΔG = $30b ÷ $10b = 3\nWith no crowding out, multiplier = 1 ÷ (1 − MPC)\n3 = 1 ÷ (1 − MPC) → 1 − MPC = 1/3 → MPC = 2/3 ≈ 0.67",
      answer: "0.67",
    },
    {
      id: "policy-e3", section: "calc", sub: "Closing a recessionary gap", source: "Problem Set 9 Q8",
      prompt: "An economy is producing $400 billion less than the natural level of output. The central bank holds the interest rate constant (no crowding out), the MPC is 4/5 and the price level is fixed in the short run. By how much must government spending change to close the gap?",
      marks: 3,
      rubric: [
        { point: "States the formula: multiplier = 1 ÷ (1 − MPC); ΔG = required ΔY ÷ multiplier", marks: 1 },
        { point: "Correct working: 1 ÷ (1 − 4/5) = 5; $400b ÷ 5", marks: 1 },
        { point: "Correct answer: G must increase by $80 billion", marks: 1 },
      ],
      model: "Multiplier = 1 ÷ (1 − MPC) = 1 ÷ (1 − 0.8) = 5\nWith P fixed, SRAS is horizontal, so each $1 rise in AD raises output by $1.\nΔG = $400b ÷ 5 = $80 billion (an increase).",
      answer: "Increase G by $80 billion",
    },
    {
      id: "policy-e4", section: "calc", sub: "Equilibrium GDP", source: "Problem Set 9 Q11(c)",
      prompt: "An economy is described by Y = C + I + G, C = 100 + 0.75(Y − T), I = 500 − 50r, G = 125 and T = 100. The central bank keeps r = 4. Solve for GDP.",
      marks: 3,
      rubric: [
        { point: "States the equilibrium condition Y = C + I + G with the equations substituted", marks: 1 },
        { point: "Correct working: Y = 100 + 0.75(Y − 100) + 500 − 200 + 125 = 450 + 0.75Y", marks: 1 },
        { point: "Correct answer: Y = 1,800", marks: 1 },
      ],
      model: "Y = C + I + G\nY = 100 + 0.75(Y − 100) + 500 − 50(4) + 125\nY = 100 + 0.75Y − 75 + 500 − 200 + 125 = 450 + 0.75Y\n0.25Y = 450 → Y = 1,800",
      answer: "1,800",
    },
    {
      id: "policy-e5", section: "calc", sub: "Required change in G", source: "Problem Set 9 Q11(d)",
      prompt: "In the economy C = 100 + 0.75(Y − T), I = 500 − 50r, G = 125, T = 100, r = 4, GDP is 1,800 and full-employment GDP is 2,000. Assuming no change in monetary policy, what change in government purchases restores full employment?",
      marks: 3,
      rubric: [
        { point: "States the formula: multiplier = 1 ÷ (1 − MPC); ΔG = ΔY ÷ multiplier", marks: 1 },
        { point: "Correct working: multiplier = 1 ÷ 0.25 = 4; ΔY = 200; 200 ÷ 4", marks: 1 },
        { point: "Correct answer: G rises by 50 (from 125 to 175)", marks: 1 },
      ],
      model: "MPC = 0.75, so multiplier = 1 ÷ (1 − 0.75) = 4\nRequired ΔY = 2,000 − 1,800 = 200\nΔG = 200 ÷ 4 = 50, so G rises from 125 to 175.",
      answer: "+50 (G = 175)",
    },
    {
      id: "policy-e6", section: "calc", sub: "Required change in r", source: "Problem Set 9 Q11(e)",
      prompt: "In the economy Y = C + I + G, C = 100 + 0.75(Y − T), I = 500 − 50r, G = 125, T = 100, full-employment GDP is 2,000. Assuming no change in fiscal policy, what interest rate restores full employment?",
      marks: 3,
      rubric: [
        { point: "States Y = C + I + G with Y set to 2,000", marks: 1 },
        { point: "Correct working: 2,000 = 100 + 0.75(1,900) + 500 − 50r + 125 = 2,150 − 50r", marks: 1 },
        { point: "Correct answer: r = 3% (a cut of 1 percentage point from 4%)", marks: 1 },
      ],
      model: "Y = C + I + G with Y = 2,000:\n2,000 = 100 + 0.75(2,000 − 100) + 500 − 50r + 125\n2,000 = 100 + 1,425 + 625 − 50r = 2,150 − 50r\n50r = 150 → r = 3\nThe interest rate must fall by 1 percentage point, from 4% to 3%.",
      answer: "3%",
    },
    {
      id: "policy-e7", section: "calc", sub: "Spending multiplier", source: "New (Lecture 9 style)",
      prompt: "The MPC is 0.6. The government raises its purchases by $30 billion. Ignoring crowding out, calculate the total increase in aggregate demand.",
      marks: 3,
      rubric: [
        { point: "States the formula: multiplier = 1 ÷ (1 − MPC); ΔAD = multiplier × ΔG", marks: 1 },
        { point: "Correct working: 1 ÷ 0.4 = 2.5; 2.5 × $30b", marks: 1 },
        { point: "Correct answer: $75 billion", marks: 1 },
      ],
      model: "Multiplier = 1 ÷ (1 − 0.6) = 1 ÷ 0.4 = 2.5\nΔAD = 2.5 × $30 billion = $75 billion",
      answer: "$75 billion",
    },
    {
      id: "policy-e8", section: "calc", sub: "Multiplier and NX", source: "New (Lecture 9 style)",
      prompt: "A boom abroad raises demand for a country's exports by $4 billion. The MPC is 0.75. Ignoring crowding out, by how much does aggregate demand shift right?",
      marks: 3,
      rubric: [
        { point: "States that the multiplier applies to NX: ΔAD = [1 ÷ (1 − MPC)] × ΔNX", marks: 1 },
        { point: "Correct working: 1 ÷ 0.25 = 4; 4 × $4b", marks: 1 },
        { point: "Correct answer: $16 billion", marks: 1 },
      ],
      model: "The multiplier effect applies to any component of GDP, including NX.\nMultiplier = 1 ÷ (1 − 0.75) = 4\nΔAD = 4 × $4 billion = $16 billion",
      answer: "$16 billion",
    },
    {
      id: "policy-e9", section: "calc", sub: "Closing a recessionary gap", source: "New (Problem Set 9 Q8 style)",
      prompt: "Output is $300 billion below its natural level. The central bank holds the interest rate constant so there is no crowding out, the price level is fixed and the MPC is 0.8. By how much must government purchases change?",
      marks: 3,
      rubric: [
        { point: "States the formula: multiplier = 1 ÷ (1 − MPC); ΔG = gap ÷ multiplier", marks: 1 },
        { point: "Correct working: 1 ÷ 0.2 = 5; $300b ÷ 5", marks: 1 },
        { point: "Correct answer: increase G by $60 billion", marks: 1 },
      ],
      model: "Multiplier = 1 ÷ (1 − 0.8) = 5\nΔG = $300b ÷ 5 = $60 billion increase",
      answer: "Increase G by $60 billion",
    },
    {
      id: "policy-e10", section: "calc", sub: "MPC and consumption", source: "New (Lecture 9 style)",
      prompt: "The spending multiplier in an economy is 4. Households' incomes rise by $200. Calculate the MPC and the resulting first-round increase in consumption.",
      marks: 3,
      rubric: [
        { point: "States multiplier = 1 ÷ (1 − MPC) and ΔC = MPC × ΔY", marks: 1 },
        { point: "Correct working: 4 = 1 ÷ (1 − MPC) → MPC = 0.75; 0.75 × $200", marks: 1 },
        { point: "Correct answer: MPC = 0.75, ΔC = $150", marks: 1 },
      ],
      model: "Multiplier = 1 ÷ (1 − MPC) → 4 = 1 ÷ (1 − MPC) → 1 − MPC = 0.25 → MPC = 0.75\nΔC = MPC × ΔY = 0.75 × $200 = $150",
      answer: "MPC = 0.75; C rises $150",
    },

    // ---- short
    {
      id: "policy-e11", section: "short", sub: "Interest-rate effect",
      source: "Lecture 9",
      prompt: "Using the theory of liquidity preference, explain why the aggregate-demand curve slopes downward.",
      marks: 3,
      rubric: [
        { point: "A fall in P reduces money demand (less money needed to buy the same goods), shifting MD left", marks: 1 },
        { point: "With MS fixed, the equilibrium interest rate falls", marks: 1 },
        { point: "The lower r increases investment, so the quantity of goods and services demanded rises: a negative P–Y relationship", marks: 1 },
      ],
      model: "When the price level falls, each good costs less, so households need less money and the money-demand curve shifts left. With the money supply fixed by the central bank, the interest rate falls to restore equilibrium in the money market. A lower interest rate increases investment spending, so the quantity of goods and services demanded rises. Thus a lower P is associated with a higher quantity of output demanded: the interest-rate effect makes AD slope downward.",
    },
    {
      id: "policy-e12", section: "short", sub: "Tax cuts", source: "Problem Set 9 Q4",
      prompt: "Consider a tax cut that lasts only one year and a tax cut expected to be permanent. Which will stimulate greater consumer spending and have a greater impact on aggregate demand? Explain.",
      marks: 3,
      rubric: [
        { point: "The permanent tax cut stimulates greater spending and has the greater impact on AD", marks: 1 },
        { point: "Households base spending on long-term (permanent) income; a permanent cut adds substantially to lifetime resources", marks: 1 },
        { point: "A one-year cut adds only a little, so much is saved and C rises only slightly; so the AD shift is smaller", marks: 1 },
      ],
      model: "The permanent tax cut will stimulate greater consumer spending. Households base their spending on their long-term income, not just this year's income. A permanent tax cut adds substantially to lifetime resources, so households raise consumption substantially, while a one-year cut adds only a little, so households save much of it. Because the permanent cut raises consumer spending by more, it shifts the AD curve further to the right.",
    },
    {
      id: "policy-e13", section: "short", sub: "Crowding out", source: "Problem Set 9 Q9",
      prompt: "Suppose government spending increases. Would the effect on aggregate demand be larger if the central bank held the money supply constant or if it committed to maintaining a fixed interest rate? Explain.",
      marks: 3,
      rubric: [
        { point: "Larger if the central bank keeps the interest rate fixed", marks: 1 },
        { point: "Higher G raises income and money demand; with MS constant, r rises and crowds out investment, partly offsetting the AD increase", marks: 1 },
        { point: "With r fixed, the central bank raises MS to meet higher MD, so no crowding out and the full multiplier applies", marks: 1 },
      ],
      model: "The effect is larger if the central bank maintains a fixed interest rate. Higher government spending raises income, which increases money demand. If the money supply is held constant, the interest rate rises, crowding out investment and partly offsetting the rise in aggregate demand. If the interest rate is held fixed, the central bank must increase the money supply to meet the higher money demand, so there is no crowding out and the full multiplier effect applies.",
    },
    {
      id: "policy-e14", section: "short", sub: "Interest-rate targets", source: "Lecture 9",
      prompt: "Why might a central bank target an interest rate rather than the money supply? Explain how the Fed implements this.",
      marks: 3,
      rubric: [
        { point: "The money supply is hard to measure with sufficient precision", marks: 1 },
        { point: "Money demand fluctuates over time, causing fluctuations in interest rates, AD and output", marks: 1 },
        { point: "The Fed targets the federal funds rate, accommodating day-to-day shifts in MD by adjusting MS", marks: 1 },
      ],
      model: "The money supply is hard to measure with sufficient precision, and money demand fluctuates over time. With a fixed money supply, these shifts in money demand would cause fluctuations in interest rates, aggregate demand and output. The Fed therefore targets the federal funds rate and accommodates the day-to-day shifts in money demand by adjusting the money supply accordingly. Monetary policy can thus be described in terms of either the money supply or the interest rate.",
    },
    {
      id: "policy-e15", section: "short", sub: "Zero lower bound", source: "Lecture 9",
      prompt: "What is a liquidity trap, and what tools can a central bank still use to expand the economy at the zero lower bound?",
      marks: 3,
      rubric: [
        { point: "Liquidity trap: interest rates are around zero, so monetary policy may no longer be effective as nominal rates cannot fall further; AD, production and employment may be trapped low", marks: 1 },
        { point: "Forward guidance: committing to keep rates low in future, lowering long-term rates and raising expected inflation", marks: 1 },
        { point: "Quantitative easing: buying longer-term government bonds and mortgage-backed securities", marks: 1 },
      ],
      model: "A liquidity trap occurs when interest rates have already fallen to around zero, so monetary policy may no longer be effective because nominal interest rates cannot be reduced further; AD, production and employment may be trapped at low levels. The central bank can still use forward guidance, committing to keep interest rates low in the future, which lowers long-term rates and raises expected inflation. It can also use quantitative easing, buying longer-term government bonds and mortgage-backed securities. The Fed used both in the Great Recession and the coronavirus recession.",
    },
    {
      id: "policy-e16", section: "short", sub: "Stabilisation debate", source: "Lecture 9",
      prompt: "Explain the case against active stabilisation policy.",
      marks: 3,
      rubric: [
        { point: "Monetary policy works with a long lag: investment plans are made in advance; at least 6 months to affect output", marks: 1 },
        { point: "Fiscal policy works with a long lag: changes in G and T need legislation that can take months or years", marks: 1 },
        { point: "By the time policy affects AD, conditions may have changed, so policy may destabilise; focus on long-run goals (growth, low inflation)", marks: 1 },
      ],
      model: "Monetary policy affects the economy with a long lag because firms make investment plans in advance; most economists believe it takes at least 6 months to affect output and employment. Fiscal policy also has a long lag because changes in G and T require legislation, which can take months or years. Because of these lags, by the time policies affect aggregate demand the economy's condition may have changed, so active policy may destabilise rather than help. Critics argue policymakers should focus on long-run goals like economic growth and low inflation instead of fine-tuning the economy.",
    },
    {
      id: "policy-e17", section: "short", sub: "Automatic stabilisers", source: "Lecture 9",
      prompt: "What are automatic stabilisers? Give two examples and explain why they avoid a key weakness of active stabilisation policy.",
      marks: 3,
      rubric: [
        { point: "Definition: changes in fiscal policy that stimulate AD in a recession without deliberate policy action", marks: 1 },
        { point: "Two examples: income tax collections fall as incomes fall; unemployment insurance and welfare payments rise", marks: 1 },
        { point: "Because no legislation/deliberate action is needed, they avoid long lags", marks: 1 },
      ],
      model: "Automatic stabilisers are changes in fiscal policy that stimulate aggregate demand when the economy goes into a recession, without policymakers taking any deliberate action. For example, in a recession income tax collections fall as incomes fall, and unemployment insurance and welfare payments rise. Because they happen automatically, they avoid the long lags of active policy, such as the months or years needed to pass legislation.",
    },
    {
      id: "policy-e18", section: "short", sub: "Accelerator vs crowding out", source: "Problem Set 9 Q10",
      prompt: "Is expansionary fiscal policy more likely to raise investment in the short run when (a) the investment accelerator is large or small, and (b) the interest sensitivity of investment is large or small? Explain.",
      marks: 3,
      rubric: [
        { point: "(a) When the accelerator is large: higher output and sales lead firms to raise investment a lot (G ↑ → Y ↑ → I ↑)", marks: 1 },
        { point: "(b) When interest sensitivity is small", marks: 1 },
        { point: "Explains crowding out: G ↑ → Y ↑ → MD ↑ → r ↑ → I ↓; if investment is insensitive to r, this effect is weak", marks: 1 },
      ],
      model: "(a) When the accelerator is large: expansionary fiscal policy raises output and sales, and a large accelerator means firms respond with a big increase in investment. (b) When the interest sensitivity of investment is small: higher output raises money demand and the interest rate. If investment is highly sensitive to r, even a small rise in r crowds out a lot of investment; if it is insensitive, the crowding-out effect is weak, so investment is more likely to rise overall.",
    },

    // ---- tf
    {
      id: "policy-e19", section: "tf", sub: "Open-market operations", source: "Problem Set 9 Q1",
      prompt: "When the central bank buys bonds in open-market operations, the equilibrium interest rate rises.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: the interest rate falls", marks: 1 },
        { point: "The central bank pays with newly created money, so MS shifts right; MD is unchanged", marks: 1 },
        { point: "At the old r there is an excess supply of money, so people buy interest-bearing assets and r falls", marks: 1 },
      ],
      model: "False. When the central bank buys bonds it pays for them with newly created money, so the money-supply curve shifts right while money demand is unchanged. At the original interest rate there is now an excess supply of money, so people use it to buy interest-bearing assets. The interest rate falls until people are willing to hold the extra money.",
    },
    {
      id: "policy-e20", section: "tf", sub: "Money demand", source: "Lecture 9",
      prompt: "A rise in the interest rate shifts the money-demand curve to the left.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: a change in r is a movement along MD, not a shift", marks: 1 },
        { point: "A higher r raises the cost of holding money, reducing the quantity of money demanded", marks: 1 },
        { point: "MD shifts only when other variables change, e.g. a rise in Y or P shifts MD right", marks: 1 },
      ],
      model: "False. A rise in the interest rate raises the cost of holding money (money pays no interest, bonds do), so the quantity of money demanded falls. This is a movement along the downward-sloping money-demand curve, not a shift. The MD curve shifts only when other variables change; for example, a rise in real income or the price level shifts MD to the right.",
    },
    {
      id: "policy-e21", section: "tf", sub: "Multiplier and crowding out", source: "Lecture 9",
      prompt: "A $2 billion increase in government purchases always shifts aggregate demand right by exactly $2 billion.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: the shift can be more or less than $2b", marks: 1 },
        { point: "Multiplier effect: higher income raises consumer spending, shifting AD further right", marks: 1 },
        { point: "Crowding-out effect: higher Y raises MD and r, reducing investment and offsetting part of the shift", marks: 1 },
      ],
      model: "False. Through the multiplier effect, the $2b of spending raises incomes, which raises consumer spending and shifts AD further right. Through the crowding-out effect, the higher income raises money demand and the interest rate, which reduces investment and offsets part of the increase. The total shift may be more or less than $2b, depending on the sizes of these two effects.",
    },
    {
      id: "policy-e22", section: "tf", sub: "Crowding out and MPC", source: "Problem Set 9 Q7(b)",
      prompt: "If economists who estimated the MPC from an observed multiplier now allow for crowding out, their estimate of the MPC will be larger.",
      tf: true,
      marks: 3,
      rubric: [
        { point: "States True", marks: 1 },
        { point: "The observed rise in demand is the net effect: the multiplier effect minus investment crowded out by higher r", marks: 1 },
        { point: "So the multiplier effect alone must be larger than observed, implying a larger MPC", marks: 1 },
      ],
      model: "True. The observed increase in demand is the net effect of the multiplier effect minus the investment crowded out by the higher interest rate. So the multiplier effect on its own must be larger than the observed ratio. Since multiplier = 1 ÷ (1 − MPC), a larger multiplier implies a larger MPC (e.g. above 2/3 if the observed multiplier was 3).",
    },
    {
      id: "policy-e23", section: "tf", sub: "Zero lower bound", source: "Lecture 9",
      prompt: "Once interest rates reach the zero lower bound, the central bank has no remaining tools to expand the economy.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: the central bank still has tools", marks: 1 },
        { point: "Forward guidance: commit to keeping rates low, lowering long-term rates and raising expected inflation", marks: 1 },
        { point: "Quantitative easing: buy long-term government bonds and mortgage-backed securities", marks: 1 },
      ],
      model: "False. At the zero lower bound ordinary interest-rate cuts may stop working because nominal rates cannot fall further, but the central bank still has tools. With forward guidance it commits to keeping interest rates low in the future, which lowers long-term rates and raises expected inflation. With quantitative easing it buys longer-term government bonds and mortgage-backed securities. The Fed used both in the Great Recession and coronavirus recession.",
    },
    {
      id: "policy-e24", section: "tf", sub: "Tax cuts", source: "Problem Set 9 Q4",
      prompt: "A permanent tax cut has a larger impact on aggregate demand than a temporary tax cut of the same size.",
      tf: true,
      marks: 3,
      rubric: [
        { point: "States True", marks: 1 },
        { point: "Households' perception matters: they base spending on long-term income", marks: 1 },
        { point: "A permanent cut adds much more to lifetime resources so C rises more; a temporary cut is mostly saved", marks: 1 },
      ],
      model: "True. Households' perception of a tax change affects how much AD shifts. Households base spending on their long-term income, so a permanent tax cut, which adds substantially to their lifetime resources, raises consumption a lot. A temporary cut adds only a little, so much of it is saved, and AD shifts by less.",
    },
    {
      id: "policy-e25", section: "tf", sub: "Automatic stabilisers", source: "Lecture 9",
      prompt: "Automatic stabilisers suffer from long lags because they require new legislation.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "Automatic stabilisers occur without policymakers taking deliberate action, so they avoid long lags", marks: 1 },
        { point: "Example: in a recession, income tax collections fall and unemployment insurance/welfare payments rise automatically", marks: 1 },
      ],
      model: "False. Automatic stabilisers are changes in fiscal policy that stimulate AD in a recession without policymakers taking any deliberate action, so they avoid the long lags of legislation. For example, as incomes fall, income tax collections fall, and unemployment insurance and welfare payments rise. It is active fiscal policy, which needs legislation, that suffers from long lags.",
    },
    {
      id: "policy-e26", section: "tf", sub: "Money neutrality", source: "Problem Set 9 Q2",
      prompt: "An expansion of the money supply raises output both in the short run and in the long run.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: output rises only in the short run", marks: 1 },
        { point: "Short run: higher MS lowers r, raises investment, AD shifts right, output rises (money has real effects)", marks: 1 },
        { point: "Long run: output above natural level bids up wages and prices, SRAS shifts left, output returns to natural level; only P is higher (money is neutral)", marks: 1 },
      ],
      model: "False. In the short run a monetary expansion lowers the interest rate, raises investment and shifts AD right, so output rises: money has real effects. But with output above its natural level, wages and prices are bid up over time and the SRAS curve shifts left. Output returns to its natural level and the only lasting effect is a higher price level, so money is neutral in the long run.",
    },
    {
      id: "policy-e27", section: "tf", sub: "Stabilising AD", source: "Problem Set 9 Q3",
      prompt: "If people want to hold more cash and the central bank raises the money supply enough to keep the interest rate unchanged, aggregate demand will not change.",
      tf: true,
      marks: 3,
      rubric: [
        { point: "States True", marks: 1 },
        { point: "Higher money demand with fixed MS would raise r, reducing investment and AD", marks: 1 },
        { point: "Raising MS (e.g. by buying bonds) just enough keeps r unchanged, so investment and AD are unchanged", marks: 1 },
      ],
      model: "True. An increase in money demand with a fixed money supply would raise the interest rate, reducing investment and interest-sensitive consumption, so AD would fall. If the central bank instead increases the money supply, for example by buying government bonds, just enough to keep r at its original level, investment is unaffected. Aggregate demand therefore does not change.",
    },

    // ---- diagram
    {
      id: "policy-e28", section: "diagram", sub: "Open-market purchase in a recession", source: "Problem Set 9 Q5",
      prompt: "The economy is in a recession with high unemployment and low output. The central bank decides to use an open-market operation to restore output to its natural level.",
      parts: [
        { label: "(a)", prompt: "Identify the open-market operation and use a clearly labelled money-market diagram to show its effect on the interest rate.", marks: 5 },
        { label: "(b)", prompt: "Using a clearly labelled AD–AS diagram (with AD, SRAS and LRAS), show the initial recession and the effect of the policy on output and the price level. Explain in words.", marks: 5 },
      ],
      marks: 10,
      rubric: [
        { point: "(a) Identifies an open-market purchase (central bank buys government bonds), increasing MS", marks: 1 },
        { point: "(a) Axes labelled interest rate (r) and quantity of money (M); vertical MS and downward-sloping MD", marks: 1 },
        { point: "(a) Initial equilibrium r₁ at MS₁ = MD", marks: 1 },
        { point: "(a) MS shifts right to MS₂ with MD unchanged", marks: 1 },
        { point: "(a) New equilibrium: r falls to r₂", marks: 1 },
        { point: "(b) Axes P and Y; AD, SRAS and vertical LRAS at Yₙ correctly drawn", marks: 1 },
        { point: "(b) Initial equilibrium A where AD₁ meets SRAS, to the left of LRAS (Y₁ < Yₙ: recessionary gap)", marks: 1 },
        { point: "(b) AD shifts right to AD₂", marks: 1 },
        { point: "(b) New equilibrium B: output rises to Yₙ and price level rises from P₁ to P₂", marks: 1 },
        { point: "(b) Explanation: lower r reduces the cost of borrowing so investment and interest-sensitive consumption rise", marks: 1 },
      ],
      model: "(a) The central bank should buy government bonds (an open-market purchase), which increases the money supply. In the money market, MS shifts right from MS₁ to MS₂. With money demand unchanged, the interest rate falls from r₁ to r₂.\n(b) Initially the short-run equilibrium A, where AD₁ meets SRAS, lies to the left of LRAS: output Y₁ is below its natural level Yₙ and unemployment is above its natural rate. The lower interest rate reduces the cost of borrowing, so investment and interest-sensitive consumption (e.g. housing, cars) increase. AD shifts right from AD₁ to AD₂. The economy moves from A to B: output rises to its natural level Yₙ, closing the recessionary gap, and the price level rises from P₁ to P₂.",
      diagram: [mmExpand, adasRecession],
    },
    {
      id: "policy-e29", section: "diagram", sub: "Money demand shock", source: "Problem Set 9 Q3",
      prompt: "A computer virus disables automatic teller machines and disrupts online payment systems, so people want to keep more cash on hand, increasing the demand for money.",
      parts: [
        { label: "(a)", prompt: "Assume the central bank does not change the money supply. Using a clearly labelled money-market diagram, show what happens to the interest rate, and explain what happens to aggregate demand.", marks: 5 },
        { label: "(b)", prompt: "If the central bank instead wants to stabilise aggregate demand, how should it change the money supply, and what open-market operation achieves this? Show this on your diagram.", marks: 5 },
      ],
      marks: 10,
      rubric: [
        { point: "(a) Axes labelled r and M; vertical MS and downward-sloping MD", marks: 1 },
        { point: "(a) Initial equilibrium at r₁", marks: 1 },
        { point: "(a) MD shifts right from MD₁ to MD₂", marks: 1 },
        { point: "(a) With MS fixed, r rises from r₁ to r₂", marks: 1 },
        { point: "(a) Higher r reduces investment and interest-sensitive consumption, so AD falls (shifts left)", marks: 1 },
        { point: "(b) The central bank should increase the money supply", marks: 1 },
        { point: "(b) MS shifts right from MS₁ to MS₂", marks: 1 },
        { point: "(b) Just enough to keep r at its original level r₁ (point C)", marks: 1 },
        { point: "(b) It should buy government bonds; paying for them adds money (bank reserves)", marks: 1 },
        { point: "(b) With r unchanged, investment and AD do not change", marks: 1 },
      ],
      model: "(a) The money-demand curve shifts right from MD₁ to MD₂. With the money supply fixed at MS₁, the interest rate rises from r₁ to r₂ (point B). The higher interest rate reduces investment and interest-sensitive consumption, so aggregate demand falls: the AD curve shifts left.\n(b) To stabilise AD, the central bank should increase the money supply from MS₁ to MS₂, just enough to keep the interest rate at r₁ (point C). Using open-market operations, it should buy government bonds; paying for the bonds adds money (bank reserves) to the economy. Because the interest rate is unchanged, investment is unaffected and aggregate demand does not change.",
      diagram: [mmStabilise],
    },
    {
      id: "policy-e30", section: "diagram", sub: "Multiplier and crowding out", source: "Lecture 9 Examples 2 and 4",
      prompt: "The government buys $2 billion of military trucks. The MPC is positive and the central bank holds the money supply constant.",
      parts: [
        { label: "(a)", prompt: "Using a clearly labelled aggregate-demand diagram, show the initial effect of the purchase and the multiplier effect. Explain why AD shifts by more than $2 billion.", marks: 5 },
        { label: "(b)", prompt: "Using a clearly labelled money-market diagram, show the crowding-out effect and explain how it changes the final shift in AD.", marks: 5 },
      ],
      marks: 10,
      rubric: [
        { point: "(a) Axes P and Y; initial AD₁", marks: 1 },
        { point: "(a) AD first shifts right by $2b (AD₁ to AD₂) because G rises by $2b", marks: 1 },
        { point: "(a) Revenue is paid as wages and profits; recipients spend part of the extra income (MPC), so C rises", marks: 1 },
        { point: "(a) AD shifts further right (to AD₃), so total shift exceeds $2b", marks: 1 },
        { point: "(a) Names the multiplier effect and/or multiplier = 1 ÷ (1 − MPC)", marks: 1 },
        { point: "(b) Axes r and M; vertical MS, downward-sloping MD₁; initial r₁", marks: 1 },
        { point: "(b) Higher Y raises money demand: MD shifts right to MD₂", marks: 1 },
        { point: "(b) With MS fixed, r rises to r₂", marks: 1 },
        { point: "(b) Higher r reduces investment spending", marks: 1 },
        { point: "(b) This crowding-out effect offsets part of the AD shift; the final shift may be more or less than $2b", marks: 1 },
      ],
      model: "(a) Because G rises by $2 billion, AD initially shifts right by $2 billion, from AD₁ to AD₂. The firm's extra revenue is paid to workers as wages and to owners as profits. These people are also consumers and spend a portion (the MPC) of their extra income, so consumption rises and AD shifts further right. This multiplier effect means the total shift exceeds $2 billion; the multiplier is 1 ÷ (1 − MPC).\n(b) The higher income increases money demand, shifting MD right from MD₁ to MD₂. With the money supply fixed, the interest rate rises from r₁ to r₂. The higher interest rate reduces investment spending, which offsets part of the increase in AD: this is the crowding-out effect. AD therefore ends up to the left of AD₃, where the multiplier alone would have put it; the final shift may be more or less than $2 billion depending on the sizes of the two effects.",
      diagram: [adMultiplier, mmCrowd],
    },
  ],
};

export default data;
