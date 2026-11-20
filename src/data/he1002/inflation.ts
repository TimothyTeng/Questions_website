import type { Graph, TopicData } from "@/lib/he1002/types";

// Lecture 7: Money Growth and Inflation (+ Problem Set 7). Everything below comes from the slides / problem set.

// Money market: MD is drawn as value of money = 16 ÷ quantity, so MS = $1,000 (x = 4) gives 1/P = 1/2 (y = 4)
// and MS = $2,000 (x = 8) gives 1/P = 1/4 (y = 2). y = 8 × (1/P).
const MD_PTS: [number, number][] = [
  [2, 8],
  [2.67, 6],
  [4, 4],
  [5.33, 3],
  [8, 2],
  [9.5, 1.68],
];

const moneyEq: Graph = {
  title: "Money supply, money demand and the equilibrium price level",
  x: "Quantity of money",
  y: "Value of money, 1/P (P rises going down)",
  lines: [
    { label: "MS₁", pts: [[4, 0.5], [4, 9.5]], tone: 1 },
    { label: "MD", pts: MD_PTS },
  ],
  points: [{ on: ["MS₁", "MD"], label: "A", xTick: "$1,000", yTick: "1/2 (P = 2)" }],
  caption: "MS is vertical (fixed by the central bank); MD slopes down; the value of money (and so P) adjusts until quantity demanded equals MS.",
};

const moneyInjection: Graph = {
  title: "The effects of a monetary injection",
  x: "Quantity of money",
  y: "Value of money, 1/P (P rises going down)",
  lines: [
    { label: "MS₁", pts: [[4, 0.5], [4, 9.5]], tone: 3 },
    { label: "MS₂", pts: [[8, 0.5], [8, 9.5]], tone: 1 },
    { label: "MD", pts: MD_PTS },
  ],
  points: [
    { on: ["MS₁", "MD"], label: "A", xTick: "$1,000", yTick: "1/2 (P = 2)" },
    { on: ["MS₂", "MD"], label: "B", xTick: "$2,000", yTick: "1/4 (P = 4)" },
  ],
  arrows: [{ from: [4.3, 7], to: [7.7, 7] }],
  caption: "MS doubles from $1,000 to $2,000: the value of money falls from 1/2 to 1/4 and the price level rises from 2 to 4.",
};

// Problem Set 7 Q2: credit cards reduce money demand.
const MD1_PTS: [number, number][] = [
  [2.5, 8],
  [3.33, 6],
  [5, 4],
  [6.67, 3],
  [9, 2.22],
];
const MD2_PTS: [number, number][] = [
  [1.5, 8],
  [2, 6],
  [3, 4],
  [5, 2.4],
  [7, 1.71],
  [9, 1.33],
];

const creditA: Graph = {
  title: "(a) Money demand falls",
  x: "Quantity of money",
  y: "Value of money, 1/P (P rises going down)",
  lines: [
    { label: "MS", pts: [[5, 0.5], [5, 9.5]], tone: 1 },
    { label: "MD₁", pts: MD1_PTS, tone: 3 },
    { label: "MD₂", pts: MD2_PTS },
  ],
  points: [
    { on: ["MS", "MD₁"], label: "A", yTick: "(1/P)₁" },
    { on: ["MS", "MD₂"], label: "B", yTick: "(1/P)₂" },
  ],
  arrows: [{ from: [3.2, 6], to: [2.2, 6] }],
  caption: "People want to hold smaller money balances: MD shifts left, the value of money falls and the price level rises.",
};

const creditB: Graph = {
  title: "(b) The central bank cuts the money supply",
  x: "Quantity of money",
  y: "Value of money, 1/P (P rises going down)",
  lines: [
    { label: "MS₁", pts: [[5, 0.5], [5, 9.5]], tone: 3 },
    { label: "MS₂", pts: [[3, 0.5], [3, 9.5]], tone: 1 },
    { label: "MD₁", pts: MD1_PTS, tone: 3 },
    { label: "MD₂", pts: MD2_PTS },
  ],
  points: [
    { on: ["MS₁", "MD₁"], label: "A", yTick: "(1/P)₁" },
    { on: ["MS₁", "MD₂"], label: "B", yTick: "(1/P)₂" },
    { on: ["MS₂", "MD₂"], label: "C" },
  ],
  arrows: [{ from: [4.8, 1.2], to: [3.2, 1.2] }],
  caption: "Reducing MS by as much as MD fell keeps the value of money (and so P) at its original level: C is level with A.",
};

const data: TopicData = {
  id: "inflation",

  // ================================================================ sections
  sections: [
    {
      title: "Big picture: what causes inflation in the long run?",
      intro: "The lecture answers three questions: what causes inflation in the long run, how inflation is like a tax, and what the costs of inflation are.",
      points: [
        {
          term: "Money supply and nominal variables",
          text: "In the long run the money supply affects nominal variables such as prices, the inflation rate and nominal interest rates.",
        },
        {
          term: "Money supply and real variables",
          text: "In the long run the money supply does not affect real variables such as real GDP, real wages and the real interest rate.",
        },
      ],
    },
    {
      title: "The price level and the value of money",
      points: [
        {
          term: "Price level (P)",
          text: "The number of dollars needed to buy a basket of goods and services. When P rises, people have to pay more for the goods and services they buy.",
          eg: "If the basket costs $2, P = 2.",
        },
        {
          term: "Value of money (1/P)",
          text: "The quantity of goods and services that can be bought with $1. A rise in the price level lowers the value of money, because each dollar in your wallet now buys a smaller quantity of goods and services.",
          eg: "If P = 2, $1 buys half a basket; if P rises to 4, $1 buys only a quarter of a basket.",
        },
        {
          term: "Inflation and the value of money",
          text: "Inflation drives up prices and drives down the value of money.",
        },
      ],
      formulas: [{ name: "Value of money", expr: "Value of money = 1 ÷ P", note: "P up → 1/P down" }],
      worked: [
        {
          problem: "The price level rises from 2 to 2.5. By what percentage does the value of money change?",
          solution: "Value of money = 1 ÷ P\nBefore: 1 ÷ 2 = 0.5\nAfter: 1 ÷ 2.5 = 0.4\n% change = (0.4 − 0.5) ÷ 0.5 × 100 = −20%\nThe value of money falls by 20%.",
        },
      ],
    },
    {
      title: "Money supply and money demand",
      intro: "The value of money is determined by the supply and demand of money.",
      points: [
        {
          term: "Money supply (MS) in the real world",
          text: "Influenced by the central bank, the banking system and consumers.",
        },
        {
          term: "Money supply in this model",
          text: "We assume the central bank precisely controls MS and sets it at some fixed amount, regardless of P, so the MS curve is vertical.",
        },
        {
          term: "Money demand (MD)",
          text: "How much wealth people want to hold in liquid form. It depends on P: an increase in P reduces the value of money, so more money is required to buy goods and services.",
          eg: "If prices double, you need to carry twice as much cash to buy the same groceries.",
        },
        {
          term: "Quantity of money demanded",
          text: "Negatively related to the value of money and positively related to P, other things equal. So the MD curve slopes downward when the vertical axis is the value of money (1/P).",
        },
        {
          term: "Money supply–demand diagram",
          text: "Horizontal axis: quantity of money. Left vertical axis: value of money, 1/P (high at the top). Right vertical axis: price level P, which runs the other way (low at the top, high at the bottom), because as the value of money rises the price level falls.",
        },
        {
          term: "Equilibrium price level",
          text: "P adjusts to equate the quantity of money demanded with the money supply. Where MS and MD cross gives the equilibrium value of money and the equilibrium price level.",
          eg: "Slide example: MS = $1,000 gives equilibrium value of money 1/2, so P = 2.",
        },
      ],
      diagrams: [moneyEq],
    },
    {
      title: "The effects of a monetary injection",
      points: [
        {
          term: "Monetary injection",
          text: "If the central bank increases the money supply, MS shifts right. Then the value of money falls and P rises.",
          eg: "Slide example: MS rises from $1,000 to $2,000; value of money falls from 1/2 to 1/4; P rises from 2 to 4.",
        },
        {
          term: "Excess supply of money",
          text: "Step 1 of the adjustment process: at the initial P, an increase in MS causes an excess supply of money.",
        },
        {
          term: "Getting rid of excess money",
          text: "Step 2: people spend their excess money on goods and services, or lend it to others, who spend it. Result: increased demand for goods and services.",
        },
        {
          term: "Prices must rise",
          text: "Step 3: the supply of goods does not increase, so prices must rise. As P rises, the quantity of money demanded increases because people are using more dollars for every transaction, until it equals the new MS.",
        },
      ],
      diagrams: [moneyInjection],
    },
    {
      title: "The quantity theory of money",
      points: [
        {
          term: "Quantity theory of money",
          text: "A theory asserting that the quantity of money available determines the price level, and that the growth rate in the quantity of money available determines the inflation rate.",
          eg: "Money supply grows 10% a year → prices grow about 10% a year (if velocity and output are unchanged).",
        },
        {
          term: "The key question",
          text: "How do changes in the quantity of money affect real variables, such as production, employment, wages and interest rates? This leads to nominal vs real variables and the classical dichotomy.",
        },
      ],
    },
    {
      title: "Nominal and real variables",
      points: [
        {
          term: "Nominal variables",
          text: "Variables measured in monetary units.",
          eg: "Nominal GDP, the nominal interest rate (rate of return measured in $), the nominal wage ($ per hour worked).",
        },
        {
          term: "Real variables",
          text: "Variables measured in physical units.",
          eg: "Real GDP, the real interest rate (measured in output), the real wage (measured in output).",
        },
        {
          term: "Relative price",
          text: "The price of one good in terms of another. Prices of goods are quoted in money, so they are nominal variables, but relative prices are measured in physical units, so they are real variables.",
          eg: "Smartphone $450, pizza $10 → relative price of a smartphone = 45 pizzas per smartphone.",
        },
        {
          term: "Real wage",
          text: "The price of labour relative to the price of output: W ÷ P, measured in units of output per hour.",
          eg: "W = $15/hour, P = $5 per unit of output → real wage = 3 units of output per hour.",
        },
      ],
      formulas: [
        { name: "Relative price of good A", expr: "Relative price = P of good A ÷ P of good B", note: "Units of good B per unit of good A (a real variable)" },
        { name: "Real wage", expr: "Real wage = W ÷ P", note: "Units of output per hour worked" },
      ],
      table: [
        ["", "Nominal variables", "Real variables"],
        ["Measured in", "Monetary units ($)", "Physical units (output, goods)"],
        ["Examples", "Nominal GDP, nominal interest rate, nominal wage, prices of goods", "Real GDP, real interest rate, real wage, relative prices"],
        ["Effect of money supply in the long run", "Affected (e.g. double when MS doubles)", "Unaffected"],
      ],
      worked: [
        {
          problem: "The price of a smartphone is $450 and the price of a pepperoni pizza is $10. What is the relative price of a smartphone?",
          solution: "Relative price = P smartphone ÷ P pizza\n= ($450 per smartphone) ÷ ($10 per pizza)\n= 45 pizzas per smartphone (a real variable).",
        },
        {
          problem: "The nominal wage is W = $15 per hour and the price level is P = 5 ($5 per unit of output). Find the real wage.",
          solution: "Real wage = W ÷ P\n= ($15 per hour) ÷ ($5 per unit of output)\n= 3 units of output per hour.",
        },
      ],
    },
    {
      title: "The classical dichotomy and the neutrality of money",
      points: [
        {
          term: "Classical dichotomy",
          text: "'Dichotomy' means division into two separate groups; 'classical' refers to the early economic thinkers. Real variables are independent of nominal variables: monetary developments affect nominal variables but not real variables.",
          eg: "If the central bank doubles the money supply, all nominal variables (including prices) double, but all real variables (including relative prices) remain unchanged.",
        },
        {
          term: "Monetary neutrality (neutrality of money)",
          text: "The proposition that changes in the money supply do not affect real variables. Doubling the money supply causes all nominal prices to double but no change to relative prices.",
        },
        {
          term: "Long run vs short run",
          text: "Most modern economists believe the classical dichotomy and neutrality of money describe the economy in the long run. Over short periods of time (1–2 years), monetary changes affect real variables.",
        },
      ],
    },
    {
      title: "Velocity and the quantity equation",
      points: [
        {
          term: "Quantity equation",
          text: "M × V = P × Y. An identity that relates the quantity of money (M) and the velocity of money (V) to the nominal value of output (P × Y). It provides a mathematical framework for understanding the quantity theory of money.",
        },
        {
          term: "Velocity of money (V)",
          text: "The rate at which money changes hands: the number of transactions in which the average dollar is used.",
          eg: "Nominal GDP $10 trillion with $500 billion of money → each dollar is used 20 times.",
        },
        {
          term: "Quantity theory in 5 steps",
          text: "1. V is relatively stable over time. 2. A change in M causes nominal GDP (P × Y) to change by the same percentage. 3. A change in M does not affect Y: money is neutral, Y is determined by technology and resources. 4. So P changes by the same percentage as P × Y and M. 5. Rapid money supply growth causes rapid inflation.",
        },
      ],
      formulas: [
        { name: "Quantity equation", expr: "M × V = P × Y", note: "P × Y = nominal GDP" },
        { name: "Velocity", expr: "V = (P × Y) ÷ M" },
        { name: "Money supply needed", expr: "M = (P × Y) ÷ V" },
        { name: "Price level", expr: "P = (M × V) ÷ Y = Nominal GDP ÷ Real GDP" },
      ],
      worked: [
        {
          problem: "(Problem Set 7 Q1) Money supply = $500 billion, nominal GDP = $10 trillion, real GDP = $5 trillion. (a) Find P and V. (b) V is constant and output rises 5% next year. If M is kept constant, what happens to nominal GDP and P? (c) What M keeps P stable? (d) What M gives 10% inflation?",
          solution: "(a) P = Nominal GDP ÷ Real GDP = 10 ÷ 5 = 2\nV = (P × Y) ÷ M = $10,000 billion ÷ $500 billion = 20\n(b) Next year Y = 5 × 1.05 = $5.25 trillion\nM × V = 500 × 20 = $10,000 billion, so nominal GDP stays $10 trillion\nP = 10 ÷ 5.25 = 1.90 (falls by about 4.8%)\n(c) Keep P = 2: M = (P × Y) ÷ V = (2 × 5.25 trillion) ÷ 20 = $0.525 trillion = $525 billion\n(d) 10% inflation: P = 2 × 1.1 = 2.2\nM = (2.2 × 5.25 trillion) ÷ 20 = $0.5775 trillion = $577.5 billion",
        },
        {
          problem: "(Problem Set 7 Q3) If velocity is constant, does zero inflation require zero money growth?",
          solution: "No. From M × V = P × Y with V constant and P constant, M must grow at the same rate as real output Y.\nIf M grew at zero while Y grew, P would fall.\nSo the money growth rate should equal the growth rate of real GDP.",
        },
      ],
    },
    {
      title: "The inflation tax",
      points: [
        {
          term: "Money creation to finance spending",
          text: "When tax revenue is inadequate and the government's ability to borrow is limited, the government may resort to money creation to finance its spending.",
        },
        {
          term: "Hyperinflation",
          text: "Excessive money creation is associated with hyperinflation.",
        },
        {
          term: "Inflation tax",
          text: "Similar to a tax on everyone who holds money: the government creates money to finance spending → the price level rises → the value of money falls. Thus money holders bear a cost similar to a tax.",
          eg: "Cash kept under the mattress buys less after the government prints money to pay its bills.",
        },
      ],
    },
    {
      title: "The Fisher effect",
      points: [
        {
          term: "Fisher effect",
          text: "When the expected inflation rate increases, the nominal interest rate increases by the same amount so that the real interest rate remains the same.",
          eg: "Real rate 3%: expected inflation 2% → nominal 5%; expected inflation 6% → nominal 9%.",
        },
        {
          term: "Faster money growth in the long run",
          text: "When the central bank (the Fed) increases the rate of money growth, the long-run result is a higher inflation rate and a higher nominal interest rate.",
        },
        {
          term: "Evidence",
          text: "The close relationship between nominal interest rates and inflation rates over time provides evidence supporting the Fisher effect.",
        },
      ],
      formulas: [
        { name: "Fisher relation", expr: "Nominal interest rate = Real interest rate + Inflation rate" },
        { name: "Real interest rate", expr: "Real interest rate = Nominal interest rate − Inflation rate" },
        {
          name: "After-tax real interest rate (Problem Set 7 Q6)",
          expr: "After-tax real rate = Nominal rate × (1 − tax rate) − Inflation rate",
          note: "Tax is charged on the nominal interest, not the real interest",
        },
      ],
      worked: [
        {
          problem: "(Problem Set 7 Q6) Tax rate 40%. Find the before-tax and after-tax real interest rates when (a) i = 10%, inflation = 5%; (b) i = 6%, inflation = 2%; (c) i = 4%, inflation = 1%.",
          solution: "Before-tax real = nominal − inflation; after-tax nominal = nominal × (1 − 0.4); after-tax real = after-tax nominal − inflation.\n(a) Before-tax real = 10 − 5 = 5%; after-tax nominal = 10 × 0.6 = 6%; after-tax real = 6 − 5 = 1%\n(b) Before-tax real = 6 − 2 = 4%; after-tax nominal = 3.6%; after-tax real = 3.6 − 2 = 1.6%\n(c) Before-tax real = 4 − 1 = 3%; after-tax nominal = 2.4%; after-tax real = 2.4 − 1 = 1.4%\nThe higher the inflation, the bigger the gap between before-tax and after-tax real rates: an inflation-induced tax distortion.",
        },
      ],
    },
    {
      title: "The inflation fallacy",
      points: [
        {
          term: "Inflation fallacy",
          text: "The common belief that 'inflation robs people of the purchasing power of their hard-earned dollars'.",
        },
        {
          term: "Why it is a fallacy",
          text: "When prices rise, buyers pay more but sellers get more, and workers earn more. Inflation does not in itself reduce people's real purchasing power: inflation causes the CPI and nominal wages to rise together over the long run.",
          eg: "If all prices and all wages rise by 10%, an hour of work buys exactly the same basket as before.",
        },
        {
          term: "Relative prices matter more (Problem Set 7 Q5)",
          text: "What makes a person better or worse off is the change in the relative price of what they sell compared with what they buy, not the overall inflation rate.",
          eg: "Bean farmer and rice farmer: if both prices double, inflation is 100% but neither is affected; if beans double while rice falls, the bean farmer gains and the rice farmer loses.",
        },
      ],
      worked: [
        {
          problem: "(Problem Set 7 Q5) Ben grows beans, Rita grows rice; both always consume equal amounts of each. In 2025 beans cost $1, rice $3. Find inflation in 2026 and who gains if 2026 prices are (a) beans $2, rice $6; (b) beans $2, rice $4; (c) beans $2, rice $1.50.",
          solution: "Use a basket of 1 bean + 1 rice: 2025 cost = $1 + $3 = $4. Inflation = (new cost − old cost) ÷ old cost × 100.\n(a) Cost $8 → inflation = (8 − 4) ÷ 4 × 100 = 100%. Both prices doubled, relative price unchanged: Ben and Rita unaffected.\n(b) Cost $6 → inflation = 50%. Beans doubled but rice rose only 33%: relative price of beans rose, Ben better off, Rita worse off.\n(c) Cost $3.50 → inflation = −12.5%. Beans rose, rice fell: Ben better off, Rita worse off.\n(d) The relative price of rice and beans matters more than the overall inflation rate.",
        },
      ],
    },
    {
      title: "The costs of inflation",
      intro: "Six costs: shoeleather costs, menu costs, relative-price variability and the misallocation of resources, inflation-induced tax distortions, confusion and inconvenience, arbitrary redistributions of wealth.",
      points: [
        {
          term: "1. Shoeleather costs",
          text: "Inflation is a tax on the holders of money; people avoid the inflation tax by holding less money (and going to the bank more often). Shoeleather costs are the resources wasted when inflation encourages people to reduce their money holdings. They can be substantial in countries with hyperinflation.",
          eg: "Withdrawing cash every day instead of once a week, wasting time and effort.",
        },
        {
          term: "2. Menu costs",
          text: "The costs of changing prices. Inflation increases the menu costs firms must bear: deciding on new prices, printing new price lists and catalogues, sending them to dealers and customers, advertising the new prices, and dealing with customer annoyance over price changes.",
          eg: "A café reprinting its menu every month.",
        },
        {
          term: "3. Relative-price variability and misallocation of resources",
          text: "Firms don't all raise prices at the same time, so relative prices can vary. The higher the inflation rate, the greater this swing in relative prices. It distorts consumer decisions, and markets are less able to allocate resources to their best use.",
        },
        {
          term: "4. Inflation-induced tax distortions",
          text: "Inflation makes nominal income grow faster than real income. Taxes are based on nominal income, and some are not adjusted for inflation, so inflation causes people to pay more taxes even when their real incomes don't increase.",
          eg: "Tax on nominal interest income: higher inflation lowers the after-tax real interest rate.",
        },
        {
          term: "5. Confusion and inconvenience",
          text: "Inflation changes the yardstick we use to measure transactions. This complicates long-range planning and the comparison of dollar amounts over time.",
        },
        {
          term: "6. Arbitrary redistributions of wealth",
          text: "Unexpected inflation redistributes wealth among debtors and creditors. High inflation is more variable and less predictable than low inflation, so arbitrary redistributions are frequent when inflation is high.",
          eg: "Inflation turns out higher than expected: a borrower repays a fixed-rate loan with dollars worth less, so the borrower gains and the lender loses.",
        },
      ],
      table: [
        ["Cost", "What it is", "Who/what bears it"],
        ["Shoeleather costs", "Resources wasted reducing money holdings", "Money holders (large in hyperinflation)"],
        ["Menu costs", "Costs of changing prices", "Firms"],
        ["Relative-price variability", "Prices rise at different times → relative prices swing", "Consumers and the allocation of resources"],
        ["Inflation-induced tax distortions", "Taxes on nominal income rise even if real income doesn't", "Taxpayers, e.g. savers"],
        ["Confusion and inconvenience", "The money yardstick keeps changing", "Long-range planning, comparisons over time"],
        ["Arbitrary redistributions of wealth", "Unexpected inflation shifts wealth between debtors and creditors", "Creditors lose, debtors gain (when inflation is higher than expected)"],
      ],
      worked: [
        {
          problem: "(Problem Set 7 Q8) People expect 3% inflation but prices rise 5%. Who is helped or hurt: (a) the government, (b) a homeowner with a fixed-rate mortgage, (c) a union worker in year 2 of a labour contract, (d) a college holding government bonds?",
          solution: "Unexpected inflation redistributes wealth from creditors to debtors.\n(a) The government is a debtor (it has issued bonds): helped, it repays with dollars worth less.\n(b) The fixed-rate homeowner is a debtor: helped, the real value of the mortgage repayments falls.\n(c) The union worker's nominal wage was fixed in the contract on expected inflation of 3%: hurt, the real wage is lower than expected.\n(d) The college is a creditor holding bonds with a fixed nominal return: hurt, its real return is lower than expected.",
        },
      ],
    },
  ],

  // ================================================================ flashcards
  flashcards: [
    { id: "inflation-c1", type: "concept", front: "The number of dollars needed to buy a basket of goods and services.", back: "Price level (P)", why: "If the basket costs $2, P = 2; when P rises people pay more for the same goods." },
    { id: "inflation-c2", type: "concept", front: "The quantity of goods and services that can be bought with $1; it equals 1/P.", back: "Value of money", why: "When P rises from 2 to 4, this falls from 1/2 to 1/4 of a basket." },
    { id: "inflation-c3", type: "concept", front: "How much wealth people want to hold in liquid form; it rises with the price level.", back: "Money demand (MD)", why: "Higher P means more money is required to buy the same goods and services." },
    { id: "inflation-c4", type: "concept", front: "In the lecture's model, the quantity of money that the central bank precisely controls and sets at a fixed amount, drawn as a vertical line.", back: "Money supply (MS)", why: "In the real world it is also influenced by the banking system and consumers." },
    { id: "inflation-c5", type: "concept", front: "A theory asserting that the quantity of money available determines the price level, and its growth rate determines the inflation rate.", back: "Quantity theory of money", why: "Rapid money supply growth causes rapid inflation." },
    { id: "inflation-c6", type: "concept", front: "Variables measured in monetary units, e.g. the wage in $ per hour.", back: "Nominal variables", why: "Nominal GDP, the nominal interest rate and the nominal wage are examples." },
    { id: "inflation-c7", type: "concept", front: "Variables measured in physical units, e.g. output per hour of work.", back: "Real variables", why: "Real GDP, the real interest rate and the real wage are examples." },
    { id: "inflation-c8", type: "concept", front: "The price of one good in terms of another, e.g. 45 pizzas per smartphone.", back: "Relative price", why: "Measured in physical units, so it is a real variable even though the underlying prices are nominal." },
    { id: "inflation-c9", type: "concept", front: "The price of labour relative to the price of output, calculated as W ÷ P.", back: "Real wage", why: "W = $15/hour and P = 5 gives 3 units of output per hour." },
    { id: "inflation-c10", type: "concept", front: "The idea, from early economic thinkers, that real variables are independent of nominal variables, so monetary developments affect only nominal variables.", back: "Classical dichotomy", why: "If the money supply doubles, all prices double but relative prices stay the same." },
    { id: "inflation-c11", type: "concept", front: "The proposition that changes in the money supply do not affect real variables.", back: "Monetary neutrality / Neutrality of money", why: "Most economists believe this holds in the long run, but not over 1–2 years." },
    { id: "inflation-c12", type: "concept", front: "The identity M × V = P × Y, relating money and velocity to the nominal value of output.", back: "Quantity equation", why: "It is the mathematical framework for the quantity theory of money." },
    { id: "inflation-c13", type: "concept", front: "The rate at which money changes hands; the number of transactions in which the average dollar is used.", back: "Velocity of money (V)", why: "V = (P × Y) ÷ M; the quantity theory assumes it is relatively stable." },
    { id: "inflation-c14", type: "concept", front: "The nominal value of output, written P × Y in the quantity equation.", back: "Nominal GDP", why: "With V stable, a change in M changes this by the same percentage." },
    { id: "inflation-c15", type: "concept", front: "Extremely high inflation that the lecture associates with excessive money creation.", back: "Hyperinflation", why: "Arises when governments that cannot tax or borrow enough print money to finance spending." },
    { id: "inflation-c16", type: "concept", front: "The cost borne by everyone who holds money when the government creates money to finance its spending.", back: "Inflation tax", why: "Money creation → P rises → value of money falls, so money holders lose as if taxed." },
    { id: "inflation-c17", type: "concept", front: "When expected inflation rises, the nominal interest rate rises by the same amount, leaving the real interest rate unchanged.", back: "Fisher effect", why: "Nominal interest rate = real interest rate + inflation rate." },
    { id: "inflation-c18", type: "concept", front: "The interest rate measured in dollars, i.e. the rate of return in money terms.", back: "Nominal interest rate", why: "It rises with faster money growth in the long run (Fisher effect)." },
    { id: "inflation-c19", type: "concept", front: "The interest rate measured in output: nominal interest rate minus the inflation rate.", back: "Real interest rate", why: "Money growth does not affect it in the long run." },
    { id: "inflation-c20", type: "concept", front: "The popular belief that inflation robs people of the purchasing power of their hard-earned dollars.", back: "Inflation fallacy", why: "When prices rise, sellers get more and workers earn more, so inflation in itself does not reduce real purchasing power." },
    { id: "inflation-c21", type: "concept", front: "Resources wasted when inflation encourages people to reduce their money holdings.", back: "Shoeleather costs", why: "People go to the bank more often to avoid the inflation tax; large under hyperinflation." },
    { id: "inflation-c22", type: "concept", front: "The costs of changing prices, e.g. printing new price lists and catalogues.", back: "Menu costs", why: "Inflation increases these costs, which firms must bear." },
    { id: "inflation-c23", type: "concept", front: "Cost of inflation arising because firms do not all raise prices at the same time, which distorts consumer decisions.", back: "Relative-price variability / Misallocation of resources", why: "The higher the inflation rate, the bigger the swing in relative prices." },
    { id: "inflation-c24", type: "concept", front: "Cost of inflation in which people pay more taxes even though their real incomes have not increased, because taxes are based on nominal income.", back: "Inflation-induced tax distortions", why: "Inflation makes nominal income grow faster than real income." },
    { id: "inflation-c25", type: "concept", front: "Cost of inflation arising because inflation changes the yardstick we use to measure transactions.", back: "Confusion and inconvenience", why: "It complicates long-range planning and comparing dollar amounts over time." },
    { id: "inflation-c26", type: "concept", front: "Cost of inflation in which unexpected inflation transfers wealth between debtors and creditors.", back: "Arbitrary redistributions of wealth", why: "Frequent when inflation is high because high inflation is more variable and less predictable." },
    { id: "inflation-c27", type: "concept", front: "The situation, at the initial price level, right after the central bank increases the money supply.", back: "Excess supply of money", why: "People spend or lend the extra money, demand for goods rises, and prices rise." },
    { id: "inflation-c28", type: "concept", front: "The wage measured in dollars per hour worked.", back: "Nominal wage (W)", why: "Divide by P to get the real wage." },

    { id: "inflation-c29", type: "scenario", front: "The central bank doubles the money supply. In the long run, what happens to the price level, nominal wages, real GDP and relative prices?", back: "P and nominal wages double; real GDP and relative prices are unchanged.", why: "Classical dichotomy / monetary neutrality: monetary changes affect nominal variables but not real variables in the long run. All nominal variables double; all real variables, including relative prices, stay the same." },
    { id: "inflation-c30", type: "scenario", front: "Credit cards become widely available so people hold smaller money balances. The central bank does nothing. What happens to the value of money and the price level?", back: "Money demand falls: the value of money falls and P rises.", why: "People want to hold less money, so MD shifts left. With MS fixed, the equilibrium value of money (1/P) falls, which means the price level rises." },
    { id: "inflation-c31", type: "scenario", front: "In the credit-card case above, the central bank wants to keep the price level stable. What should it do?", back: "Reduce the money supply.", why: "MD has shifted left; shifting MS left by the same amount restores the original value of money, so P is unchanged." },
    { id: "inflation-c32", type: "scenario", front: "The money supply is $400 billion and nominal GDP is $8 trillion. What is velocity?", back: "V = 20", why: "Quantity equation M × V = P × Y, so V = (P × Y) ÷ M = 8,000 ÷ 400 = 20: each dollar is used in 20 transactions." },
    { id: "inflation-c33", type: "scenario", front: "Velocity is stable and real output is fixed by technology and resources. The money supply grows 8% this year. What happens to the price level?", back: "P rises by 8% (8% inflation).", why: "Quantity theory: V stable, so P × Y rises 8%; money is neutral so Y is unchanged; therefore P rises by the same 8%." },
    { id: "inflation-c34", type: "scenario", front: "The real interest rate is 3% and expected inflation rises from 2% to 5%. What happens to the nominal interest rate?", back: "It rises from 5% to 8%.", why: "Fisher effect: nominal = real + inflation. The nominal rate rises by the same 3 points as expected inflation, so the real rate stays at 3%." },
    { id: "inflation-c35", type: "scenario", front: "A worker earns $30 per hour and the price level is 6 ($6 per unit of output). What is the real wage?", back: "5 units of output per hour", why: "Real wage = W ÷ P = ($30/hour) ÷ ($6/unit) = 5 units of output per hour — a real variable." },
    { id: "inflation-c36", type: "scenario", front: "A laptop costs $1,200 and a coffee costs $4. What is the relative price of a laptop? Is it nominal or real?", back: "300 coffees per laptop; a real variable.", why: "Relative price = P laptop ÷ P coffee = 1,200 ÷ 4 = 300. It is measured in physical units (coffees), so it is real." },
    { id: "inflation-c37", type: "scenario", front: "A government cannot raise enough taxes or borrow, so it prints money to pay its bills. Who bears the cost and how?", back: "Everyone who holds money, through the inflation tax.", why: "Money creation raises the price level, which lowers the value of money, so money holders lose purchasing power, a cost similar to a tax." },
    { id: "inflation-c38", type: "scenario", front: "During a hyperinflation, people rush to the bank every day to withdraw just enough cash for the day. Which cost of inflation is this?", back: "Shoeleather costs", why: "To avoid the inflation tax people hold less money, wasting time and resources on frequent trips to the bank." },
    { id: "inflation-c39", type: "scenario", front: "Inflation is expected to be 2% but turns out to be 6%. A household has a fixed-rate loan from a bank. Who gains and who loses?", back: "The borrower (household) gains; the lender (bank) loses.", why: "Arbitrary redistribution of wealth: unexpected inflation means the loan is repaid with dollars worth less than expected, moving wealth from creditor to debtor." },
    { id: "inflation-c40", type: "scenario", front: "Over ten years all prices and all nominal wages rise by 30%. A friend says inflation has made workers poorer. Are they right?", back: "No: real wages and purchasing power are unchanged.", why: "This is the inflation fallacy. When prices rise sellers get more and workers earn more; the CPI and nominal wages rise together in the long run." },
    { id: "inflation-c41", type: "scenario", front: "Inflation rises from 1% to 8%. A saver's nominal interest income is taxed and the tax is not adjusted for inflation. What happens to the saver's after-tax real return?", back: "It falls: the saver pays more tax even though real income has not risen.", why: "Inflation-induced tax distortion: the nominal interest rate rises with inflation (Fisher effect), tax is charged on the higher nominal interest, so after-tax real interest falls." },
    { id: "inflation-c42", type: "scenario", front: "Velocity is constant and real GDP grows 3% a year. The central bank wants zero inflation. What money growth rate should it choose?", back: "3% a year (equal to real GDP growth), not zero.", why: "From M × V = P × Y, with V and P constant, M must grow at the same rate as Y. Zero money growth would make P fall." },
  ],

  // ================================================================ quiz
  quiz: [
    { id: "inflation-q1", kind: "fill", sub: "Price level", prompt: "The price level, P, is the number of ____ needed to buy a basket of goods and services.", answers: [["dollars", "dollar", "money", "$"]], explain: "P = dollars needed to buy a basket of goods and services." },
    { id: "inflation-q2", kind: "fill", sub: "Value of money", prompt: "The value of money is the quantity of goods and services that can be bought with $1, and it is equal to 1 ÷ ____.", answers: [["P", "price level", "the price level"]], explain: "Value of money = 1/P." },
    { id: "inflation-q3", kind: "fill", sub: "Value of money", prompt: "When the price level rises, the value of money ____.", answers: [["falls", "decreases", "drops", "declines", "goes down", "fall", "decrease"]], explain: "Each dollar now buys a smaller quantity of goods and services." },
    { id: "inflation-q4", kind: "fill", sub: "Value of money", prompt: "If the price level is 4, the value of money is ____ (2 d.p.).", answers: [["0.25"]], explain: "Value of money = 1 ÷ P = 1 ÷ 4 = 0.25 of a basket per dollar." },
    { id: "inflation-q5", kind: "fill", sub: "Money demand", prompt: "Money demand is how much wealth people want to hold in ____ form.", answers: [["liquid"]], explain: "Money demand = desired holdings of wealth in liquid form." },
    { id: "inflation-q6", kind: "fill", sub: "Money demand", prompt: "Other things equal, the quantity of money demanded is ____ related to the value of money and positively related to P.", answers: [["negatively", "inversely", "negative"]], explain: "A higher value of money (lower P) means fewer dollars are needed for transactions." },
    { id: "inflation-q7", kind: "fill", sub: "Money supply", prompt: "In the model, the central bank sets MS at a fixed amount regardless of P, so the money supply curve is ____.", answers: [["vertical"]], explain: "MS does not depend on the value of money, so it is a vertical line." },
    { id: "inflation-q8", kind: "fill", sub: "Money market", prompt: "In the money market, the ____ adjusts to equate the quantity of money demanded with the money supply.", answers: [["price level", "P", "value of money"]], explain: "P (and so 1/P) adjusts until MD = MS, giving the equilibrium price level." },
    { id: "inflation-q9", kind: "fill", sub: "Money market", prompt: "In the money supply-demand diagram, the left vertical axis measures the value of money, 1/P, and the right vertical axis measures the ____.", answers: [["price level", "P"]], explain: "P runs the opposite way to 1/P: high value of money = low price level." },
    { id: "inflation-q10", kind: "fill", sub: "Monetary injection", prompt: "If the central bank increases the money supply, at the initial price level there is an excess ____ of money.", answers: [["supply"]], explain: "People hold more money than they want, so they spend or lend it." },
    { id: "inflation-q11", kind: "fill", sub: "Monetary injection", prompt: "People spend their excess money, raising the demand for goods and services. Because the supply of goods does not increase, ____ must rise.", answers: [["prices", "price", "the price level", "price level", "P"]], explain: "Higher P raises the quantity of money demanded until it equals the new money supply." },
    { id: "inflation-q12", kind: "fill", sub: "Monetary injection", prompt: "In the slide example, MS rises from $1,000 to $2,000 and the value of money falls from 1/2 to 1/4. The price level rises from 2 to ____.", answers: [["4"]], explain: "P = 1 ÷ (1/4) = 4." },
    { id: "inflation-q13", kind: "fill", sub: "Quantity theory", prompt: "The ____ theory of money asserts that the quantity of money available determines the price level.", answers: [["quantity"]], explain: "And the growth rate of the money supply determines the inflation rate." },
    { id: "inflation-q14", kind: "fill", sub: "Quantity theory", prompt: "According to the quantity theory, the growth rate in the quantity of money available determines the ____ rate.", answers: [["inflation"]], explain: "Rapid money growth causes rapid inflation." },
    { id: "inflation-q15", kind: "fill", sub: "Nominal vs real", prompt: "Variables measured in monetary units are called ____ variables.", answers: [["nominal"]], explain: "E.g. nominal GDP, nominal interest rate, nominal wage." },
    { id: "inflation-q16", kind: "fill", sub: "Nominal vs real", prompt: "Real variables are measured in ____ units.", answers: [["physical"]], explain: "E.g. real GDP, real interest rate (in output), real wage (in output)." },
    { id: "inflation-q17", kind: "fill", sub: "Nominal vs real", prompt: "The nominal interest rate is the rate of return measured in ____, while the real interest rate is measured in output.", answers: [["dollars", "dollar", "$", "money", "monetary units"]], explain: "Nominal = $ terms; real = output terms." },
    { id: "inflation-q18", kind: "fill", sub: "Relative price", prompt: "A smartphone costs $450 and a pizza costs $10. The relative price of a smartphone is ____ pizzas per smartphone.", answers: [["45"]], explain: "Relative price = 450 ÷ 10 = 45 pizzas per smartphone." },
    { id: "inflation-q19", kind: "fill", sub: "Relative price", prompt: "Relative prices are measured in physical units, so they are ____ variables.", answers: [["real"]], explain: "Prices of goods are nominal, but the price of one good in terms of another is real." },
    { id: "inflation-q20", kind: "fill", sub: "Real wage", prompt: "The real wage is calculated as ____ ÷ P.", answers: [["W", "nominal wage", "the nominal wage", "wage"]], explain: "Real wage = nominal wage ÷ price level." },
    { id: "inflation-q21", kind: "fill", sub: "Real wage", prompt: "The nominal wage is $15 per hour and P = 5. The real wage is ____ units of output per hour.", answers: [["3"]], explain: "Real wage = 15 ÷ 5 = 3 units of output per hour." },
    { id: "inflation-q22", kind: "fill", sub: "Classical dichotomy", prompt: "The ____ dichotomy says that real variables are independent of nominal variables.", answers: [["classical"]], explain: "'Classical' refers to the early economic thinkers; 'dichotomy' means division into two groups." },
    { id: "inflation-q23", kind: "fill", sub: "Classical dichotomy", prompt: "If the central bank doubles the money supply, all nominal variables, including prices, will ____.", answers: [["double", "doubled", "rise 100%", "increase twofold"]], explain: "Real variables, including relative prices, remain unchanged." },
    { id: "inflation-q24", kind: "fill", sub: "Monetary neutrality", prompt: "Monetary ____ is the proposition that changes in the money supply do not affect real variables.", answers: [["neutrality"]], explain: "Also called the neutrality of money." },
    { id: "inflation-q25", kind: "fill", sub: "Monetary neutrality", prompt: "Most modern economists believe the classical dichotomy and monetary neutrality describe the economy in the ____ run.", answers: [["long"]], explain: "Over short periods (1–2 years), monetary changes affect real variables." },
    { id: "inflation-q26", kind: "fill", sub: "Monetary neutrality", prompt: "Over short periods of time (about 1 to ____ years), monetary changes do affect real variables.", answers: [["2", "two"]], explain: "Neutrality is a long-run property." },
    { id: "inflation-q27", kind: "fill", sub: "Quantity equation", prompt: "The quantity equation is M × V = P × ____.", answers: [["Y", "real GDP", "output"]], explain: "P × Y is the nominal value of output (nominal GDP)." },
    { id: "inflation-q28", kind: "fill", sub: "Velocity", prompt: "V in the quantity equation is the ____ of money: the rate at which money changes hands.", answers: [["velocity"]], explain: "The number of transactions in which the average dollar is used." },
    { id: "inflation-q29", kind: "fill", sub: "Velocity", prompt: "The money supply is $500 billion and nominal GDP is $10 trillion. Velocity is ____.", answers: [["20"]], explain: "V = (P × Y) ÷ M = 10,000 ÷ 500 = 20." },
    { id: "inflation-q30", kind: "fill", sub: "Quantity equation", prompt: "Nominal GDP is $10 trillion and real GDP is $5 trillion. The price level is ____.", answers: [["2"]], explain: "P = nominal GDP ÷ real GDP = 10 ÷ 5 = 2." },
    { id: "inflation-q31", kind: "fill", sub: "Quantity theory", prompt: "Step 1 of the quantity theory: V is relatively ____ over time.", answers: [["stable", "constant"]], explain: "So a change in M changes nominal GDP by the same percentage." },
    { id: "inflation-q32", kind: "fill", sub: "Quantity theory", prompt: "Because money is neutral, a change in M does not affect ____, which is determined by technology and resources.", answers: [["Y", "real GDP", "output", "real output"]], explain: "So P must change by the same percentage as M." },
    { id: "inflation-q33", kind: "fill", sub: "Quantity theory", prompt: "Velocity and real output are constant and the money supply rises by 8%. The price level rises by ____%.", answers: [["8", "8%"]], explain: "M × V = P × Y: with V and Y fixed, P changes by the same percentage as M." },
    { id: "inflation-q34", kind: "fill", sub: "Quantity equation", prompt: "M = $500 billion, V = 20 (constant), and real GDP rises from $5 trillion to $5.25 trillion. If M is unchanged, the new price level is ____ (2 d.p.).", answers: [["1.90", "1.9"]], explain: "Nominal GDP = M × V = $10 trillion; P = 10 ÷ 5.25 = 1.90." },
    { id: "inflation-q35", kind: "fill", sub: "Quantity equation", prompt: "V = 20, real GDP next year = $5.25 trillion. To keep P at 2, the money supply must be $____ billion.", answers: [["525"]], explain: "M = (P × Y) ÷ V = (2 × 5,250) ÷ 20 = $525 billion." },
    { id: "inflation-q36", kind: "fill", sub: "Quantity equation", prompt: "V = 20, real GDP next year = $5.25 trillion, P this year = 2. For 10% inflation, the money supply must be $____ billion (1 d.p.).", answers: [["577.5"]], explain: "P = 2.2; M = (2.2 × 5,250) ÷ 20 = $577.5 billion." },
    { id: "inflation-q37", kind: "fill", sub: "Inflation tax", prompt: "When tax revenue is inadequate and borrowing is limited, the government may resort to money ____ to finance its spending.", answers: [["creation", "printing"]], explain: "This is the source of the inflation tax." },
    { id: "inflation-q38", kind: "fill", sub: "Inflation tax", prompt: "Excessive money creation is associated with ____.", answers: [["hyperinflation"]], explain: "Governments financing spending by printing money cause very high inflation." },
    { id: "inflation-q39", kind: "fill", sub: "Inflation tax", prompt: "The inflation tax is similar to a tax on everyone who holds ____.", answers: [["money", "cash"]], explain: "Money creation → P rises → value of money falls." },
    { id: "inflation-q40", kind: "fill", sub: "Fisher effect", prompt: "Nominal interest rate = real interest rate + ____ rate.", answers: [["inflation"]], explain: "The Fisher relation." },
    { id: "inflation-q41", kind: "fill", sub: "Fisher effect", prompt: "Under the Fisher effect, when expected inflation rises the nominal interest rate rises by the same amount, so the ____ interest rate remains the same.", answers: [["real"]], explain: "Money growth does not affect the real interest rate in the long run." },
    { id: "inflation-q42", kind: "fill", sub: "Fisher effect", prompt: "The nominal interest rate is 7% and inflation is 3%. The real interest rate is ____%.", answers: [["4", "4%"]], explain: "Real = nominal − inflation = 7 − 3 = 4%." },
    { id: "inflation-q43", kind: "fill", sub: "Fisher effect", prompt: "The real interest rate is 2%. After faster money growth, expected inflation rises to 6%. The nominal interest rate becomes ____%.", answers: [["8", "8%"]], explain: "Nominal = real + inflation = 2 + 6 = 8%." },
    { id: "inflation-q44", kind: "fill", sub: "After-tax real interest", prompt: "Tax rate 40%, nominal interest rate 10%, inflation 5%. The after-tax real interest rate is ____%.", answers: [["1", "1%"]], explain: "After-tax nominal = 10 × 0.6 = 6%; after-tax real = 6 − 5 = 1%." },
    { id: "inflation-q45", kind: "fill", sub: "After-tax real interest", prompt: "Tax rate 40%, nominal interest rate 6%, inflation 2%. The after-tax real interest rate is ____% (1 d.p.).", answers: [["1.6", "1.6%"]], explain: "After-tax nominal = 6 × 0.6 = 3.6%; after-tax real = 3.6 − 2 = 1.6%." },
    { id: "inflation-q46", kind: "fill", sub: "Inflation fallacy", prompt: "The inflation ____ is the belief that inflation robs people of the purchasing power of their hard-earned dollars.", answers: [["fallacy"]], explain: "When prices rise, sellers get more and workers earn more." },
    { id: "inflation-q47", kind: "fill", sub: "Inflation fallacy", prompt: "Over the long run, inflation causes the CPI and nominal ____ to rise together.", answers: [["wages", "wage", "incomes", "income"]], explain: "So inflation does not in itself reduce real purchasing power." },
    { id: "inflation-q48", kind: "fill", sub: "Costs of inflation", prompt: "____ costs are the resources wasted when inflation encourages people to reduce their money holdings.", answers: [["shoeleather", "shoe leather", "shoe-leather"]], explain: "People go to the bank more often; substantial under hyperinflation." },
    { id: "inflation-q49", kind: "fill", sub: "Costs of inflation", prompt: "____ costs are the costs of changing prices.", answers: [["menu"]], explain: "E.g. printing new price lists and catalogues, advertising new prices." },
    { id: "inflation-q50", kind: "fill", sub: "Costs of inflation", prompt: "Because firms don't all raise prices at the same time, the higher the inflation rate, the greater the swing in ____ prices.", answers: [["relative"]], explain: "This distorts consumer decisions and misallocates resources." },
    { id: "inflation-q51", kind: "fill", sub: "Costs of inflation", prompt: "Taxes are based on ____ income, so inflation causes people to pay more taxes even when their real incomes don't increase.", answers: [["nominal"]], explain: "Inflation-induced tax distortions." },
    { id: "inflation-q52", kind: "fill", sub: "Costs of inflation", prompt: "Inflation changes the ____ we use to measure transactions, causing confusion and inconvenience.", answers: [["yardstick"]], explain: "It complicates long-range planning and comparing dollar amounts over time." },
    { id: "inflation-q53", kind: "fill", sub: "Costs of inflation", prompt: "Unexpected inflation redistributes wealth among debtors and ____.", answers: [["creditors", "lenders", "creditor"]], explain: "Higher-than-expected inflation helps debtors and hurts creditors." },
    { id: "inflation-q54", kind: "fill", sub: "Costs of inflation", prompt: "Arbitrary redistributions are frequent when inflation is high, because high inflation is more variable and less ____ than low inflation.", answers: [["predictable"]], explain: "So unexpected inflation is more common at high inflation rates." },

    { id: "inflation-q55", kind: "mcq", sub: "Nominal vs real", prompt: "Which of the following is a real variable?", options: ["Nominal GDP", "The nominal wage", "The relative price of a smartphone in pizzas", "The nominal interest rate"], answer: 2, explain: "Relative prices are measured in physical units (pizzas per smartphone), so they are real." },
    { id: "inflation-q56", kind: "mcq", sub: "Monetary injection", prompt: "The central bank increases the money supply. In the money market diagram:", options: ["MD shifts right, the value of money rises and P falls", "MS shifts right, the value of money falls and P rises", "MS shifts right, the value of money rises and P falls", "MS shifts left, the value of money falls and P rises"], answer: 1, explain: "More money supplied at the same MD lowers 1/P, so the price level rises." },
    { id: "inflation-q57", kind: "mcq", sub: "Money demand", prompt: "Other things equal, an increase in the price level:", options: ["Reduces the quantity of money demanded", "Shifts the money supply curve left", "Increases the quantity of money demanded", "Raises the value of money"], answer: 2, explain: "Higher P means more money is required to buy goods and services." },
    { id: "inflation-q58", kind: "mcq", sub: "Quantity theory", prompt: "According to the quantity theory of money, rapid money supply growth causes:", options: ["Rapid growth in real GDP", "Rapid inflation", "A rise in velocity", "A fall in the nominal interest rate"], answer: 1, explain: "V is stable and Y is unaffected, so P grows at the same rate as M." },
    { id: "inflation-q59", kind: "mcq", sub: "Classical dichotomy", prompt: "According to the classical dichotomy, if the money supply doubles, in the long run:", options: ["Real GDP doubles", "Relative prices double", "Prices double and real GDP is unchanged", "Prices and real wages both double"], answer: 2, explain: "Nominal variables double; real variables, including relative prices and real wages, are unchanged." },
    { id: "inflation-q60", kind: "mcq", sub: "Inflation tax", prompt: "Who bears the inflation tax?", options: ["Only income-tax payers", "Everyone who holds money", "Only the government", "Only firms that face menu costs"], answer: 1, explain: "Money creation lowers the value of money, so money holders bear a cost similar to a tax." },
    { id: "inflation-q61", kind: "mcq", sub: "Fisher effect", prompt: "When the central bank increases the rate of money growth, the long-run result is:", options: ["Higher inflation and a higher real interest rate", "Higher inflation and a higher nominal interest rate", "Lower inflation and a lower nominal interest rate", "Higher real GDP and a higher nominal interest rate"], answer: 1, explain: "Fisher effect: nominal rate rises one-for-one with inflation; the real rate is unchanged." },
    { id: "inflation-q62", kind: "mcq", sub: "Costs of inflation", prompt: "A mail-order firm has to print and send new catalogues every time it changes its prices. This is an example of:", options: ["Shoeleather costs", "Menu costs", "Inflation-induced tax distortions", "Arbitrary redistributions of wealth"], answer: 1, explain: "Menu costs are the costs of changing prices." },
    { id: "inflation-q63", kind: "mcq", sub: "Costs of inflation", prompt: "Inflation turns out to be higher than people expected. Who is helped?", options: ["A bank that made fixed-rate loans", "A worker whose nominal wage was fixed in a contract", "A homeowner with a fixed-rate mortgage", "A college holding government bonds"], answer: 2, explain: "Unexpected inflation redistributes wealth from creditors to debtors; the homeowner is a debtor." },
    { id: "inflation-q64", kind: "mcq", sub: "Costs of inflation", prompt: "Which of the following is NOT one of the six costs of inflation in the lecture?", options: ["Shoeleather costs", "Confusion and inconvenience", "Relative-price variability", "A fall in real GDP in the long run"], answer: 3, explain: "In the long run money is neutral, so inflation from money growth does not reduce real GDP; the other three are costs listed in the lecture." },
  ],

  // ================================================================ exam
  exam: [
    // ---------------- Q1 calc
    {
      id: "inflation-e1",
      section: "calc",
      sub: "Velocity",
      prompt: "This year an economy's money supply is $500 billion, nominal GDP is $10 trillion and real GDP is $5 trillion. The velocity of money is ______.",
      marks: 3,
      rubric: [
        { point: "States the formula: V = (P × Y) ÷ M (from M × V = P × Y)", marks: 1 },
        { point: "Uses nominal GDP $10,000 billion and M $500 billion in consistent units", marks: 1 },
        { point: "Correct answer V = 20", marks: 1 },
      ],
      model: "Quantity equation: M × V = P × Y, so V = (P × Y) ÷ M\nP × Y = nominal GDP = $10 trillion = $10,000 billion\nV = 10,000 ÷ 500 = 20",
      answer: "20",
      source: "Problem Set 7 Q1(a)",
    },
    {
      id: "inflation-e2",
      section: "calc",
      sub: "Quantity equation",
      prompt: "Money supply = $500 billion, velocity = 20 (constant) and real GDP = $5 trillion. Next year real output rises by 5% and the central bank keeps the money supply constant. Next year's price level is ______ (2 d.p.).",
      marks: 3,
      rubric: [
        { point: "States the formula: P = (M × V) ÷ Y", marks: 1 },
        { point: "Correct working: nominal GDP = 500 × 20 = $10,000 billion; Y = 5 × 1.05 = $5.25 trillion", marks: 1 },
        { point: "Correct answer P = 1.90", marks: 1 },
      ],
      model: "M × V = P × Y, so P = (M × V) ÷ Y\nM × V = $500 billion × 20 = $10,000 billion = $10 trillion (nominal GDP unchanged)\nY next year = $5 trillion × 1.05 = $5.25 trillion\nP = 10 ÷ 5.25 = 1.90 (the price level falls from 2, by about 4.8%)",
      answer: "1.90",
      source: "Problem Set 7 Q1(b)",
    },
    {
      id: "inflation-e3",
      section: "calc",
      sub: "Quantity equation",
      prompt: "Velocity is constant at 20, the price level is 2 and real GDP will be $5.25 trillion next year. To keep the price level stable, the central bank should set next year's money supply at ______.",
      marks: 3,
      rubric: [
        { point: "States the formula: M = (P × Y) ÷ V", marks: 1 },
        { point: "Correct working: (2 × $5.25 trillion) ÷ 20", marks: 1 },
        { point: "Correct answer $525 billion ($0.525 trillion)", marks: 1 },
      ],
      model: "M × V = P × Y, so M = (P × Y) ÷ V\nM = (2 × $5.25 trillion) ÷ 20 = $10.5 trillion ÷ 20 = $0.525 trillion\nM = $525 billion",
      answer: "$525 billion",
      source: "Problem Set 7 Q1(c)",
    },
    {
      id: "inflation-e4",
      section: "calc",
      sub: "Quantity equation",
      prompt: "Velocity is constant at 20, this year's price level is 2 and real GDP will be $5.25 trillion next year. If the central bank wants inflation of 10 percent, next year's money supply should be ______ (1 d.p., in $ billion).",
      marks: 3,
      rubric: [
        { point: "States the formula: M = (P × Y) ÷ V", marks: 1 },
        { point: "Correct working: new P = 2 × 1.10 = 2.2; M = (2.2 × $5.25 trillion) ÷ 20", marks: 1 },
        { point: "Correct answer $577.5 billion", marks: 1 },
      ],
      model: "M × V = P × Y, so M = (P × Y) ÷ V\nTarget P = 2 × 1.10 = 2.2\nM = (2.2 × $5.25 trillion) ÷ 20 = $11.55 trillion ÷ 20 = $0.5775 trillion\nM = $577.5 billion",
      answer: "$577.5 billion",
      source: "Problem Set 7 Q1(d)",
    },
    {
      id: "inflation-e5",
      section: "calc",
      sub: "After-tax real interest",
      prompt: "The tax rate on interest income is 40 percent. The nominal interest rate is 10 percent and the inflation rate is 5 percent. The after-tax real interest rate is ______.",
      marks: 3,
      rubric: [
        { point: "States the formula: after-tax real rate = nominal rate × (1 − tax rate) − inflation rate", marks: 1 },
        { point: "Correct working: after-tax nominal = 10% × 0.6 = 6%", marks: 1 },
        { point: "Correct answer 1%", marks: 1 },
      ],
      model: "After-tax real interest rate = nominal rate × (1 − tax rate) − inflation rate\nAfter-tax nominal rate = 10% × (1 − 0.4) = 6%\nAfter-tax real rate = 6% − 5% = 1%\n(Before-tax real rate = 10% − 5% = 5%.)",
      answer: "1%",
      source: "Problem Set 7 Q6(a)",
    },
    {
      id: "inflation-e6",
      section: "calc",
      sub: "After-tax real interest",
      prompt: "The tax rate on interest income is 40 percent. The nominal interest rate is 6 percent and the inflation rate is 2 percent. The after-tax real interest rate is ______ (1 d.p.).",
      marks: 3,
      rubric: [
        { point: "States the formula: after-tax real rate = nominal rate × (1 − tax rate) − inflation rate", marks: 1 },
        { point: "Correct working: after-tax nominal = 6% × 0.6 = 3.6%", marks: 1 },
        { point: "Correct answer 1.6%", marks: 1 },
      ],
      model: "After-tax real interest rate = nominal rate × (1 − tax rate) − inflation rate\nAfter-tax nominal rate = 6% × (1 − 0.4) = 3.6%\nAfter-tax real rate = 3.6% − 2% = 1.6%\n(Before-tax real rate = 6% − 2% = 4%.)",
      answer: "1.6%",
      source: "Problem Set 7 Q6(b)",
    },
    {
      id: "inflation-e7",
      section: "calc",
      sub: "Fisher effect",
      prompt: "The real interest rate is 3 percent. The central bank raises the rate of money growth and expected inflation rises from 2 percent to 6 percent. According to the Fisher effect, the new nominal interest rate is ______.",
      marks: 3,
      rubric: [
        { point: "States the formula: nominal interest rate = real interest rate + inflation rate", marks: 1 },
        { point: "Recognises the real rate stays at 3% (nominal rises one-for-one with expected inflation): 3% + 6%", marks: 1 },
        { point: "Correct answer 9%", marks: 1 },
      ],
      model: "Fisher effect: nominal interest rate = real interest rate + inflation rate\nThe real rate is unaffected by money growth, so it stays at 3%.\nOld nominal rate = 3% + 2% = 5%\nNew nominal rate = 3% + 6% = 9%",
      answer: "9%",
      source: "Lecture 7",
    },
    {
      id: "inflation-e8",
      section: "calc",
      sub: "Real wage",
      prompt: "A worker's nominal wage is $24 per hour and the price level is 3 ($3 per unit of output). The real wage is ______.",
      marks: 3,
      rubric: [
        { point: "States the formula: real wage = W ÷ P", marks: 1 },
        { point: "Correct working: ($24 per hour) ÷ ($3 per unit of output)", marks: 1 },
        { point: "Correct answer 8 units of output per hour (with units)", marks: 1 },
      ],
      model: "Real wage = W ÷ P\n= ($24 per hour) ÷ ($3 per unit of output)\n= 8 units of output per hour",
      answer: "8 units of output per hour",
      source: "Lecture 7 (Example 2)",
    },
    {
      id: "inflation-e9",
      section: "calc",
      sub: "Inflation and relative prices",
      prompt: "An economy has two people who always consume equal amounts of beans and rice. In 2025 beans cost $1 and rice cost $3. In 2026 beans cost $2 and rice cost $4. The inflation rate in 2026 is ______.",
      marks: 3,
      rubric: [
        { point: "States the formula: inflation = (cost of basket in 2026 − cost in 2025) ÷ cost in 2025 × 100", marks: 1 },
        { point: "Correct working: basket of 1 bean + 1 rice costs $4 in 2025 and $6 in 2026", marks: 1 },
        { point: "Correct answer 50%", marks: 1 },
      ],
      model: "Inflation = (new cost of basket − old cost) ÷ old cost × 100\nBasket = 1 unit of beans + 1 unit of rice (equal amounts consumed)\n2025: $1 + $3 = $4; 2026: $2 + $4 = $6\nInflation = (6 − 4) ÷ 4 × 100 = 50%\n(The relative price of beans rose, so the bean farmer is better off and the rice farmer worse off.)",
      answer: "50%",
      source: "Problem Set 7 Q5(b)",
    },
    {
      id: "inflation-e10",
      section: "calc",
      sub: "Value of money",
      prompt: "The price level rises from 2 to 2.5. The percentage change in the value of money is ______.",
      marks: 3,
      rubric: [
        { point: "States the formula: value of money = 1 ÷ P", marks: 1 },
        { point: "Correct working: 1 ÷ 2 = 0.5 and 1 ÷ 2.5 = 0.4; (0.4 − 0.5) ÷ 0.5 × 100", marks: 1 },
        { point: "Correct answer −20% (falls by 20%)", marks: 1 },
      ],
      model: "Value of money = 1 ÷ P\nBefore: 1 ÷ 2 = 0.5; after: 1 ÷ 2.5 = 0.4\n% change = (0.4 − 0.5) ÷ 0.5 × 100 = −20%\nThe value of money falls by 20%.",
      answer: "−20%",
      source: "Lecture 7",
    },

    // ---------------- Q2 short
    {
      id: "inflation-e11",
      section: "short",
      sub: "Quantity theory",
      prompt: "Using the quantity equation, explain the quantity theory of money's conclusion that rapid money supply growth causes rapid inflation.",
      marks: 3,
      rubric: [
        { point: "States M × V = P × Y and that V is relatively stable, so a change in M changes nominal GDP (P × Y) by the same percentage", marks: 1 },
        { point: "Money is neutral: a change in M does not affect Y, which is determined by technology and resources", marks: 1 },
        { point: "So P changes by the same percentage as M: rapid money growth means rapid inflation", marks: 1 },
      ],
      model: "The quantity equation is M × V = P × Y, and velocity V is relatively stable over time, so a change in M causes nominal GDP (P × Y) to change by the same percentage. Money is neutral, so a change in M does not affect real output Y, which is determined by technology and resources. Therefore P must change by the same percentage as P × Y and M, so rapid money supply growth causes rapid inflation.",
      source: "Lecture 7",
    },
    {
      id: "inflation-e12",
      section: "short",
      sub: "Monetary injection",
      prompt: "Explain the adjustment process by which an increase in the money supply causes the price level to rise.",
      marks: 3,
      rubric: [
        { point: "At the initial price level the increase in MS creates an excess supply of money", marks: 1 },
        { point: "People get rid of the excess money by spending it or lending it to others who spend it, so demand for goods and services increases", marks: 1 },
        { point: "The supply of goods does not increase, so prices rise until the quantity of money demanded equals the new money supply", marks: 1 },
      ],
      model: "At the initial price level, an increase in the money supply creates an excess supply of money. People get rid of their excess money by spending it on goods and services or lending it to others who spend it, so the demand for goods and services increases. But the supply of goods does not increase, so prices must rise; as P rises, the quantity of money demanded increases because people use more dollars for every transaction, until money demand equals the new money supply.",
      source: "Lecture 7",
    },
    {
      id: "inflation-e13",
      section: "short",
      sub: "Quantity equation",
      prompt: "A central bank wants to achieve zero inflation. Assuming velocity is constant, does this require the rate of money growth to be zero? Explain.",
      marks: 3,
      rubric: [
        { point: "States No", marks: 1 },
        { point: "Uses M × V = P × Y: with V and P constant, M must grow at the same rate as Y", marks: 1 },
        { point: "Money growth should equal the growth rate of real output (zero money growth with rising Y would make P fall)", marks: 1 },
      ],
      model: "No. From the quantity equation M × V = P × Y, if V is constant and P is to stay constant, then M must grow at the same rate as real output Y. If real GDP is growing, zero money growth would make the price level fall. So the rate of money growth should equal the growth rate of real GDP.",
      source: "Problem Set 7 Q3",
    },
    {
      id: "inflation-e14",
      section: "short",
      sub: "Inflation tax",
      prompt: "A country's inflation rate increases sharply. What happens to the inflation tax on holders of money? Why is wealth in savings accounts not subject to this change, and how might savings-account holders still be hurt?",
      marks: 3,
      rubric: [
        { point: "The inflation tax on money holders increases: the value of money falls faster", marks: 1 },
        { point: "Savings accounts pay a nominal interest rate that rises with inflation (Fisher effect), so the real return is protected from the inflation tax", marks: 1 },
        { point: "But tax is based on nominal interest, so savers pay more tax and the after-tax real return falls (inflation-induced tax distortion)", marks: 1 },
      ],
      model: "Higher inflation increases the inflation tax on holders of money, because the value of money falls faster. Savings accounts pay interest, and by the Fisher effect the nominal interest rate rises with expected inflation, so the real interest rate (and real value of savings) is not eroded in the same way as cash. However, taxes are based on nominal interest income, so savers pay more tax even though their real income has not risen, which lowers the after-tax real interest rate.",
      source: "Problem Set 7 Q4",
    },
    {
      id: "inflation-e15",
      section: "short",
      sub: "Costs of inflation",
      prompt: "Name and explain THREE costs of inflation.",
      marks: 3,
      rubric: [
        { point: "First cost named and explained correctly (e.g. shoeleather costs: resources wasted when inflation encourages people to reduce money holdings)", marks: 1 },
        { point: "Second cost named and explained correctly (e.g. menu costs: costs of changing prices such as printing new price lists)", marks: 1 },
        { point: "Third cost named and explained correctly (e.g. inflation-induced tax distortions, relative-price variability, confusion and inconvenience, arbitrary redistributions of wealth)", marks: 1 },
      ],
      model: "Shoeleather costs: inflation is a tax on money holders, so people hold less money and go to the bank more often, wasting resources. Menu costs: firms bear the costs of changing prices, such as deciding on new prices and printing and sending new price lists and catalogues. Inflation-induced tax distortions: taxes are based on nominal income, so inflation makes people pay more tax even when their real incomes do not increase.",
      source: "Lecture 7",
    },
    {
      id: "inflation-e16",
      section: "short",
      sub: "Costs of inflation",
      prompt: "People expect inflation of 3 percent but prices actually rise by 5 percent. Explain how this unexpectedly high inflation affects (a) a homeowner with a fixed-rate mortgage, (b) a union worker in the second year of a labour contract, and (c) a college that has invested some of its endowment in government bonds.",
      marks: 3,
      rubric: [
        { point: "(a) Homeowner is a debtor: helped, repays the fixed nominal mortgage with dollars worth less than expected", marks: 1 },
        { point: "(b) Union worker: hurt, the nominal wage was fixed in the contract based on 3% expected inflation, so the real wage is lower than expected", marks: 1 },
        { point: "(c) College is a creditor: hurt, the fixed nominal return on the bonds gives a lower real return than expected", marks: 1 },
      ],
      model: "Unexpected inflation redistributes wealth from creditors to debtors. (a) The homeowner is a debtor, so is helped: the fixed-rate repayments are made with dollars worth less than expected. (b) The union worker is hurt: the nominal wage was set in the contract assuming 3% inflation, so with 5% inflation the real wage is lower than expected. (c) The college is a creditor holding bonds with a fixed nominal return, so it is hurt because its real return is lower than expected.",
      source: "Problem Set 7 Q8",
    },
    {
      id: "inflation-e17",
      section: "short",
      sub: "Functions of money",
      prompt: "Money serves three functions in the economy. Name them and explain how inflation affects money's ability to serve each function.",
      marks: 3,
      rubric: [
        { point: "Medium of exchange: still works, but inflation makes people hold less money (shoeleather costs), making money less convenient to use", marks: 1 },
        { point: "Unit of account: inflation changes the yardstick used to post prices and record debts, causing confusion and inconvenience", marks: 1 },
        { point: "Store of value: inflation reduces the value of money over time, so money transfers less purchasing power into the future (inflation tax)", marks: 1 },
      ],
      model: "As a medium of exchange, money still works under inflation, but people reduce their money holdings and go to the bank more often, wasting resources (shoeleather costs). As a unit of account, inflation changes the yardstick we use to post prices and record debts, causing confusion and inconvenience and complicating comparisons over time. As a store of value, inflation lowers the value of money (1/P), so money transfers less purchasing power from the present to the future; this is the inflation tax on money holders.",
      source: "Problem Set 7 Q7",
    },

    // ---------------- Q3 tf
    {
      id: "inflation-e18",
      section: "tf",
      sub: "Costs of inflation",
      prompt: "Inflation hurts borrowers and helps lenders, because borrowers must pay a higher rate of interest.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "Expected inflation is built into the nominal interest rate (Fisher effect), so the real interest rate, and the real burden on borrowers, is unchanged", marks: 1 },
        { point: "Unexpected inflation actually helps borrowers (debtors) and hurts lenders (creditors), since loans are repaid with dollars worth less", marks: 1 },
      ],
      model: "False. If inflation is expected, the nominal interest rate rises by the same amount (Fisher effect), so the real interest rate is unchanged and neither borrowers nor lenders gain. If inflation is unexpected, the nominal rate does not adjust, so borrowers repay with dollars that are worth less than expected. Unexpected inflation therefore redistributes wealth from lenders (creditors) to borrowers (debtors), the opposite of the statement.",
      source: "Problem Set 7 Q9(a)",
    },
    {
      id: "inflation-e19",
      section: "tf",
      sub: "Relative prices",
      prompt: "If prices change in a way that leaves the overall price level unchanged, then no one is made better or worse off.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "The overall price level can stay the same while relative prices change", marks: 1 },
        { point: "People who sell goods whose relative price rises are better off; those whose relative price falls (or who buy those goods) are worse off", marks: 1 },
      ],
      model: "False. Even if the overall price level is unchanged, relative prices can change: some prices rise while others fall. A person who sells a good whose relative price rises gains purchasing power over other goods, while a person selling a good whose relative price falls loses. What matters for individuals is the relative price of what they sell compared with what they buy, not the overall inflation rate.",
      source: "Problem Set 7 Q9(b)",
    },
    {
      id: "inflation-e20",
      section: "tf",
      sub: "Inflation fallacy",
      prompt: "Inflation does not reduce the purchasing power of most workers.",
      tf: true,
      marks: 3,
      rubric: [
        { point: "States True", marks: 1 },
        { point: "When prices rise, sellers get more and workers earn more: nominal incomes rise with prices", marks: 1 },
        { point: "Over the long run the CPI and nominal wages rise together, so inflation in itself does not reduce real purchasing power (the 'inflation fallacy')", marks: 1 },
      ],
      model: "True. The belief that inflation robs people of their purchasing power is the inflation fallacy. When prices rise, buyers pay more but sellers get more, so workers earn more as nominal wages rise. Over the long run inflation causes the CPI and nominal wages to rise together, so inflation does not in itself reduce workers' real purchasing power.",
      source: "Problem Set 7 Q9(c)",
    },
    {
      id: "inflation-e21",
      section: "tf",
      sub: "Classical dichotomy",
      prompt: "If the central bank doubles the money supply, real GDP will double in the long run.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "Classical dichotomy / monetary neutrality: changes in the money supply affect nominal variables but not real variables in the long run", marks: 1 },
        { point: "Doubling MS doubles the price level and other nominal variables; real GDP (determined by technology and resources) is unchanged", marks: 1 },
      ],
      model: "False. According to the classical dichotomy and monetary neutrality, which describe the economy in the long run, changes in the money supply affect nominal variables but not real variables. If the money supply doubles, all nominal variables, including the price level and nominal GDP, double. Real GDP is determined by technology and resources and remains unchanged.",
      source: "Lecture 7",
    },
    {
      id: "inflation-e22",
      section: "tf",
      sub: "Fisher effect",
      prompt: "An increase in the rate of money growth raises the real interest rate in the long run.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "Faster money growth raises inflation, and by the Fisher effect the nominal interest rate rises by the same amount", marks: 1 },
        { point: "So the real interest rate (nominal − inflation) is unchanged; money growth does not affect real variables in the long run", marks: 1 },
      ],
      model: "False. When the central bank increases the rate of money growth, the long-run result is a higher inflation rate. By the Fisher effect, the nominal interest rate rises by the same amount as expected inflation. Since nominal interest rate = real interest rate + inflation rate, the real interest rate remains the same.",
      source: "Lecture 7",
    },
    {
      id: "inflation-e23",
      section: "tf",
      sub: "Value of money",
      prompt: "A rise in the price level increases the value of money.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "The value of money is 1/P, the quantity of goods and services $1 can buy", marks: 1 },
        { point: "A higher P means each dollar buys a smaller quantity, so the value of money falls", marks: 1 },
      ],
      model: "False. The value of money is measured as 1/P, the quantity of goods and services that can be bought with $1. When the price level rises, each dollar buys a smaller quantity of goods and services. So a rise in the price level lowers the value of money: inflation drives up prices and drives down the value of money.",
      source: "Lecture 7",
    },
    {
      id: "inflation-e24",
      section: "tf",
      sub: "Monetary neutrality",
      prompt: "Most economists believe that monetary changes have no effect on real variables even over periods of one to two years.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "Most economists believe the classical dichotomy and monetary neutrality describe the economy in the long run", marks: 1 },
        { point: "Over short periods (1–2 years), monetary changes do affect real variables", marks: 1 },
      ],
      model: "False. Monetary neutrality is the proposition that changes in the money supply do not affect real variables. Most modern economists believe the classical dichotomy and monetary neutrality describe the economy in the long run. Over short periods of time, around 1–2 years, monetary changes do affect real variables such as output and employment.",
      source: "Lecture 7",
    },
    {
      id: "inflation-e25",
      section: "tf",
      sub: "Costs of inflation",
      prompt: "Inflation can cause people to pay more taxes even when their real incomes do not increase.",
      tf: true,
      marks: 3,
      rubric: [
        { point: "States True", marks: 1 },
        { point: "Inflation makes nominal income grow faster than real income", marks: 1 },
        { point: "Taxes are based on nominal income and some are not adjusted for inflation, so tax paid rises with no rise in real income (inflation-induced tax distortion)", marks: 1 },
      ],
      model: "True. This is the inflation-induced tax distortion. Inflation makes nominal income grow faster than real income. Because taxes are based on nominal income, and some are not adjusted for inflation, people pay more taxes even when their real incomes don't increase; for example, tax on nominal interest income lowers the after-tax real interest rate more when inflation is high.",
      source: "Lecture 7",
    },
    {
      id: "inflation-e26",
      section: "tf",
      sub: "Costs of inflation",
      prompt: "Shoeleather costs are negligible in countries experiencing hyperinflation.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "Shoeleather costs are the resources wasted when inflation encourages people to reduce their money holdings (e.g. going to the bank more often)", marks: 1 },
        { point: "The higher the inflation, the stronger the incentive to avoid the inflation tax, so these costs can be substantial under hyperinflation", marks: 1 },
      ],
      model: "False. Inflation acts as a tax on holders of money, so people try to avoid it by holding less money and going to the bank more often. Shoeleather costs are the resources wasted when inflation encourages people to reduce their money holdings. Under hyperinflation the incentive to hold little money is very strong, so shoeleather costs can be substantial, not negligible.",
      source: "Lecture 7",
    },

    // ---------------- Q4 diagram
    {
      id: "inflation-e27",
      section: "diagram",
      sub: "Money market",
      prompt: "Changes in bank regulations expand the availability of credit cards, so people can hold smaller money balances. The money market starts in equilibrium.",
      parts: [
        { label: "(a)", prompt: "Using a clearly labelled money supply–demand diagram, show how this event affects money demand, the value of money and the price level if the central bank does not respond.", marks: 5 },
        { label: "(b)", prompt: "If the central bank wants to keep the price level stable, what should it do? Show this on your diagram and explain.", marks: 5 },
      ],
      marks: 10,
      rubric: [
        { point: "(a) Axes labelled: quantity of money (horizontal), value of money 1/P (vertical; P on the inverted axis)", marks: 1 },
        { point: "(a) Vertical MS curve and downward-sloping MD₁ with initial equilibrium A", marks: 1 },
        { point: "(a) MD shifts left (MD₁ → MD₂) because people want to hold less money", marks: 1 },
        { point: "(a) New equilibrium B at a lower value of money", marks: 1 },
        { point: "(a) States the price level rises", marks: 1 },
        { point: "(b) The central bank should reduce the money supply", marks: 1 },
        { point: "(b) MS shifts left (MS₁ → MS₂) by the same amount as the fall in money demand", marks: 1 },
        { point: "(b) New equilibrium C at the original value of money", marks: 1 },
        { point: "(b) Price level unchanged (stable)", marks: 1 },
        { point: "(b) Explanation: with less money supplied, there is no excess supply of money at the original P, so no extra spending pushes prices up", marks: 1 },
      ],
      model: "(a) In the money market the money supply MS is vertical because the central bank fixes it, and money demand MD slopes downward against the value of money (1/P). Initially equilibrium is at A. Credit cards let people hold smaller money balances, so money demand falls: MD shifts left from MD₁ to MD₂. At the original value of money there is now an excess supply of money, so people spend it, and the value of money falls to B. A lower value of money means the price level rises.\n(b) To keep the price level stable, the central bank should reduce the money supply. MS shifts left from MS₁ to MS₂ by the same amount as the fall in money demand, so the new equilibrium C is at the original value of money. With no excess supply of money, there is no extra spending to push up prices, so the price level stays at its original level.",
      diagram: [creditA, creditB],
      source: "Problem Set 7 Q2",
    },
    {
      id: "inflation-e28",
      section: "diagram",
      sub: "Monetary injection",
      prompt: "The central bank doubles the money supply. The money market starts in equilibrium with a price level of 2.",
      parts: [
        { label: "(a)", prompt: "Using a clearly labelled money supply–demand diagram, show the effect on the value of money and the price level.", marks: 5 },
        { label: "(b)", prompt: "Explain the adjustment process that moves the economy to the new equilibrium, and explain what happens to real GDP and relative prices in the long run.", marks: 5 },
      ],
      marks: 10,
      rubric: [
        { point: "(a) Axes labelled: quantity of money; value of money 1/P (with P on the inverted axis)", marks: 1 },
        { point: "(a) Vertical MS₁ and downward-sloping MD with initial equilibrium A (1/P = 1/2, P = 2)", marks: 1 },
        { point: "(a) MS shifts right from MS₁ to MS₂", marks: 1 },
        { point: "(a) New equilibrium B at a lower value of money", marks: 1 },
        { point: "(a) States the value of money falls (to 1/4) and the price level rises (to 4)", marks: 1 },
        { point: "(b) At the initial P there is an excess supply of money", marks: 1 },
        { point: "(b) People spend or lend the excess money, so demand for goods and services rises", marks: 1 },
        { point: "(b) Supply of goods does not increase, so prices rise and the quantity of money demanded rises until it equals the new MS", marks: 1 },
        { point: "(b) Classical dichotomy / monetary neutrality: in the long run real GDP is unchanged", marks: 1 },
        { point: "(b) All nominal variables double, but relative prices (real variables) are unchanged", marks: 1 },
      ],
      model: "(a) MS is vertical at the amount set by the central bank and MD slopes downward against the value of money. Initially MS₁ and MD cross at A, where the value of money is 1/2 and P = 2. Doubling the money supply shifts MS right to MS₂. The new equilibrium is B, where the value of money has fallen to 1/4, so the price level has risen to 4.\n(b) At the initial price level, the increase in MS creates an excess supply of money. People get rid of it by spending it on goods and services or lending it to others who spend it, so demand for goods and services rises. Since the supply of goods does not increase, prices rise, and the quantity of money demanded increases until it equals the new money supply. By the classical dichotomy and monetary neutrality, in the long run this only affects nominal variables: all prices double, but real GDP and relative prices are unchanged.",
      diagram: [moneyInjection],
      source: "Lecture 7",
    },
  ],
};

export default data;
