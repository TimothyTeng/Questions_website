import type { Graph, TopicData } from "@/lib/he1002/types";

// Lecture 12 — A Macroeconomic Theory of the Open Economy (practice: Problem Set 12).

const R = "Real interest rate (r)";
const LFX = "Loanable funds";
const NCOX = "Net capital outflow (NCO)";
const EY = "Real exchange rate (E)";
const DOL = "Quantity of dollars";

// ---------- basic panels
const lfBasic: Graph = {
  title: "The market for loanable funds",
  x: LFX,
  y: R,
  lines: [
    { label: "S = saving", pts: [[1, 1.5], [9, 8.5]] },
    { label: "D = I + NCO", pts: [[1, 8.5], [9, 1.5]], tone: 1 },
  ],
  points: [{ on: ["S = saving", "D = I + NCO"], label: "E", xTick: "LF₁", yTick: "r₁" }],
  caption: "Supply comes from national saving; demand comes from domestic investment plus NCO. r adjusts to balance the two.",
};

const ncoBasic: Graph = {
  title: "How NCO depends on the real interest rate",
  x: NCOX,
  y: R,
  lines: [{ label: "NCO", pts: [[1, 9], [9, 1]] }],
  points: [
    { at: [4, 6], label: "A", xTick: "NCO₁", yTick: "r₁" },
    { at: [6, 4], label: "B", xTick: "NCO₂", yTick: "r₂" },
  ],
  arrows: [{ from: [4.6, 6.1], to: [5.9, 4.8] }],
  caption: "A fall in r (r₁ to r₂) makes domestic assets less attractive relative to foreign assets, so NCO rises (NCO₁ to NCO₂).",
};

const fxBasic: Graph = {
  title: "The market for foreign-currency exchange",
  x: DOL,
  y: EY,
  lines: [
    { label: "Supply of dollars (from NCO)", pts: [[5, 0.5], [5, 9.5]] },
    { label: "Demand for dollars (for NX)", pts: [[1, 9], [9, 1]], tone: 1 },
  ],
  points: [{ on: ["Supply of dollars (from NCO)", "Demand for dollars (for NX)"], label: "E", yTick: "E₁" }],
  caption: "The supply of dollars is vertical because E does not affect S or I, and so does not affect NCO. E adjusts to balance supply and demand for dollars.",
};

// ---------- budget deficit (Example 1)
const lfDeficit: Graph = {
  title: "Loanable funds",
  x: LFX,
  y: R,
  lines: [
    { label: "S₁", pts: [[1, 1.5], [9, 8.5]], tone: 3 },
    { label: "S₂", pts: [[0, 3], [7, 9.5]] },
    { label: "D₁", pts: [[1, 8.5], [9, 1.5]], tone: 1 },
  ],
  points: [
    { on: ["S₁", "D₁"], label: "A", yTick: "r₁" },
    { on: ["S₂", "D₁"], label: "B", yTick: "r₂" },
  ],
  arrows: [{ from: [7, 7], to: [4.6, 7] }],
  caption: "The budget deficit reduces national saving: supply of loanable funds shifts left and r rises from r₁ to r₂.",
};

const ncoDeficit: Graph = {
  title: "Net capital outflow",
  x: NCOX,
  y: R,
  lines: [{ label: "NCO", pts: [[1, 9], [9, 1]] }],
  points: [
    { at: [5, 5], label: "A", xTick: "NCO₁", yTick: "r₁" },
    { at: [3.72, 6.28], label: "B", xTick: "NCO₂", yTick: "r₂" },
  ],
  arrows: [{ from: [5.2, 5.4], to: [4.2, 6.4] }],
  caption: "The higher r makes domestic bonds more attractive relative to foreign bonds, so NCO falls from NCO₁ to NCO₂ (a movement along the NCO curve).",
};

const fxDeficit: Graph = {
  title: "Market for foreign-currency exchange",
  x: DOL,
  y: EY,
  lines: [
    { label: "S₁ = NCO₁", pts: [[5, 0.5], [5, 9.5]], tone: 3 },
    { label: "S₂ = NCO₂", pts: [[3.7, 0.5], [3.7, 9.5]] },
    { label: "D = NX", pts: [[1, 9], [9, 1]], tone: 1 },
  ],
  points: [
    { on: ["S₁ = NCO₁", "D = NX"], label: "A", yTick: "E₁" },
    { on: ["S₂ = NCO₂", "D = NX"], label: "B", yTick: "E₂" },
  ],
  arrows: [{ from: [5, 8.5], to: [3.7, 8.5] }],
  caption: "Lower NCO reduces the supply of dollars: E rises (appreciates) from E₁ to E₂ and NX falls to equal the lower NCO.",
};

// ---------- import quota (Example 3)
const lfQuota: Graph = {
  title: "Loanable funds",
  x: LFX,
  y: R,
  lines: [
    { label: "S", pts: [[1, 1.5], [9, 8.5]] },
    { label: "D", pts: [[1, 8.5], [9, 1.5]], tone: 1 },
  ],
  points: [{ on: ["S", "D"], label: "A", yTick: "r₁" }],
  caption: "An import quota does not affect saving or investment: no curve shifts and r stays at r₁.",
};

const ncoQuota: Graph = {
  title: "Net capital outflow",
  x: NCOX,
  y: R,
  lines: [{ label: "NCO", pts: [[1, 9], [9, 1]] }],
  points: [{ at: [5, 5], label: "A", xTick: "NCO₁", yTick: "r₁" }],
  caption: "With r unchanged, NCO is unchanged (recall NCO = S − I).",
};

const fxQuota: Graph = {
  title: "Market for foreign-currency exchange",
  x: DOL,
  y: EY,
  lines: [
    { label: "S = NCO", pts: [[5, 0.5], [5, 9.5]] },
    { label: "D₁", pts: [[1, 8], [8, 1]], tone: 3 },
    { label: "D₂", pts: [[2.5, 9], [9.5, 2]], tone: 1 },
  ],
  points: [
    { on: ["S = NCO", "D₁"], label: "A", yTick: "E₁" },
    { on: ["S = NCO", "D₂"], label: "B", yTick: "E₂" },
  ],
  arrows: [{ from: [6.5, 2.5], to: [8, 3.5] }],
  caption: "At each E, car imports fall and NX rises, so demand for dollars shifts right. With supply fixed, E rises from E₁ to E₂ and NX returns to its original level.",
};

// ---------- capital flight from Mexico
const lfFlight: Graph = {
  title: "Loanable funds (Mexico)",
  x: LFX,
  y: R,
  lines: [
    { label: "S₁", pts: [[1, 1.5], [9, 8.5]] },
    { label: "D₁", pts: [[1, 8.5], [9, 1.5]], tone: 3 },
    { label: "D₂", pts: [[2.5, 9.5], [10, 2.5]], tone: 1 },
  ],
  points: [
    { on: ["S₁", "D₁"], label: "A", yTick: "r₁" },
    { on: ["S₁", "D₂"], label: "B", yTick: "r₂" },
  ],
  arrows: [{ from: [6.9, 3.4], to: [8.9, 3.4] }],
  caption: "NCO rises at each r, so demand for loanable funds (I + NCO) shifts right and r rises from r₁ to r₂.",
};

const ncoFlight: Graph = {
  title: "Net capital outflow (Mexico)",
  x: NCOX,
  y: R,
  lines: [
    { label: "NCO₁", pts: [[1, 9], [9, 1]], tone: 3 },
    { label: "NCO₂", pts: [[2.5, 9.5], [10, 2]] },
  ],
  points: [
    { at: [5, 5], label: "A", xTick: "NCO₁", yTick: "r₁" },
    { at: [5.95, 6.05], label: "B", xTick: "NCO₂", yTick: "r₂" },
  ],
  arrows: [{ from: [3.6, 6.5], to: [5.3, 6.5] }],
  caption: "Investors sell Mexican assets and pull out their capital: the NCO curve shifts right; equilibrium r and NCO both increase.",
};

const fxFlight: Graph = {
  title: "Market for foreign-currency exchange (pesos)",
  x: "Quantity of pesos",
  y: "Real exchange rate of the peso (E)",
  lines: [
    { label: "S₁ = NCO₁", pts: [[5, 0.5], [5, 9.5]], tone: 3 },
    { label: "S₂ = NCO₂", pts: [[6.5, 0.5], [6.5, 9.5]] },
    { label: "D₁", pts: [[1, 9], [9, 1]], tone: 1 },
  ],
  points: [
    { on: ["S₁ = NCO₁", "D₁"], label: "A", yTick: "E₁" },
    { on: ["S₂ = NCO₂", "D₁"], label: "B", yTick: "E₂" },
  ],
  arrows: [{ from: [5, 8.5], to: [6.5, 8.5] }],
  caption: "Higher NCO increases the supply of pesos: the real exchange rate of the peso falls from E₁ to E₂ (the peso depreciates).",
};

// ---------- fall in demand for dollars (Problem Set 12 Q3 / Q4)
const fxDemandFall: Graph = {
  title: "Fall in the demand for dollars",
  x: DOL,
  y: EY,
  lines: [
    { label: "S = NCO", pts: [[5, 0.5], [5, 9.5]] },
    { label: "D₁", pts: [[2.5, 9], [9.5, 2]], tone: 3 },
    { label: "D₂", pts: [[1, 8], [8, 1]], tone: 1 },
  ],
  points: [
    { on: ["S = NCO", "D₁"], label: "A", yTick: "E₁" },
    { on: ["S = NCO", "D₂"], label: "B", yTick: "E₂" },
  ],
  arrows: [{ from: [8.4, 3], to: [6.1, 3] }],
  caption: "Net exports fall at every E, so demand for dollars shifts left; S, I and NCO are unchanged, so E falls and NX returns to its original level.",
};

const data: TopicData = {
  id: "open-theory",

  // ---------------------------------------------------------------- content
  sections: [
    {
      title: "The open-economy model: assumptions and two markets",
      intro: "Questions: in an open economy, what determines the real interest rate and the real exchange rate? How are the two markets connected? How do budget deficits and other policies affect the interest rate, the exchange rate and the trade balance?",
      points: [
        {
          term: "Assumption 1: GDP is given",
          text: "Real GDP is determined by the factors of production and the available technology.",
        },
        {
          term: "Assumption 2: the price level is given",
          text: "The price level adjusts to bring the supply and demand for money into balance.",
        },
        {
          term: "What the model does",
          text: "It highlights the forces that determine the economy's trade balance and exchange rate, by looking simultaneously at two related markets: the market for loanable funds and the market for foreign-currency exchange.",
        },
      ],
    },
    {
      title: "The market for loanable funds",
      points: [
        {
          term: "Supply of loanable funds",
          text: "Comes from national saving (S).",
        },
        {
          term: "Demand for loanable funds",
          text: "Comes from domestic investment (I) and net capital outflow (NCO).",
        },
        {
          term: "Net outflow of capital (NCO > 0)",
          text: "Net purchase of capital overseas adds to the demand for domestically generated loanable funds.",
        },
        {
          term: "Net inflow of capital (NCO < 0)",
          text: "Capital resources coming from abroad reduce the demand for domestically generated loanable funds.",
        },
        {
          term: "Shape of the curves",
          text: "Both I and NCO depend negatively on r, so the demand curve (D = I + NCO) is downward-sloping. The real interest rate r adjusts to balance supply and demand in the loanable funds market.",
        },
      ],
      formulas: [
        { name: "Open-economy saving identity", expr: "S = I + NCO", note: "Saving = Domestic investment + Net capital outflow" },
        { name: "Demand for loanable funds", expr: "D = I + NCO" },
      ],
      diagrams: [lfBasic],
    },
    {
      title: "How NCO depends on the real interest rate",
      points: [
        {
          term: "Real interest rate (r)",
          text: "The real return on domestic assets.",
        },
        {
          term: "A fall in r",
          text: "Makes domestic assets less attractive relative to foreign assets: people in the U.S. purchase more foreign assets and people abroad purchase fewer U.S. assets, so NCO rises.",
        },
        {
          term: "NCO curve",
          text: "Downward-sloping against r: a higher real interest rate means lower net capital outflow.",
        },
      ],
      diagrams: [ncoBasic],
    },
    {
      title: "Linking the two graphs: a budget deficit (Example 1)",
      intro: "Suppose the government runs a budget deficit (previously, the budget was balanced). What happens to the real interest rate and net capital outflow?",
      points: [
        {
          term: "Rule for using the two graphs",
          text: "The loanable funds market determines r (left graph); then this value of r determines NCO (right graph).",
        },
        {
          term: "Effect of the deficit",
          text: "The budget deficit reduces national saving and the supply of loanable funds, which drives up r. The higher r makes U.S. bonds more attractive relative to foreign bonds, which reduces NCO.",
        },
      ],
      diagrams: [lfDeficit, ncoDeficit],
    },
    {
      title: "The market for foreign-currency exchange",
      points: [
        {
          term: "Market for foreign-currency exchange",
          text: "The market where U.S. dollars are traded in exchange for foreign currencies. It rests on the identity NCO = NX.",
        },
        {
          term: "Demand for dollars = NX",
          text: "Foreigners need dollars to buy U.S. net exports. NX equals foreign demand for dollars to buy U.S. exports minus U.S. supply of dollars to buy imports, so NX is the net demand for dollars.",
        },
        {
          term: "Supply of dollars = NCO",
          text: "U.S. residents sell dollars to obtain the foreign currency they need to buy foreign assets. NCO equals U.S. supply of dollars to buy foreign assets minus foreign demand for dollars to buy U.S. assets, so NCO is the net supply of dollars.",
        },
        {
          term: "U.S. real exchange rate (E)",
          text: "Measures the quantity of foreign goods and services that trade for one unit of U.S. goods and services. E is the real value of a dollar in the market for foreign-currency exchange, and it balances supply and demand in that market.",
        },
        {
          term: "Downward-sloping demand for dollars",
          text: "An increase in E makes U.S. goods more expensive to foreigners and reduces the quantity of dollars demanded to buy those goods.",
        },
        {
          term: "Vertical supply of dollars",
          text: "An increase in E has no effect on S or I, so it does not affect NCO or the supply of dollars.",
        },
      ],
      formulas: [
        { name: "Identity linking the markets", expr: "NCO = NX", note: "Supply of dollars (NCO) = Demand for dollars (NX)" },
      ],
      diagrams: [fxBasic],
      worked: [
        {
          problem: "(Example 2A) Shemar, a U.S. resident and business owner, buys cars made in Germany. What happens in the market for foreign-currency exchange?",
          solution:
            "NX is the net demand for dollars (foreign demand for dollars to buy U.S. exports minus U.S. supply of dollars to buy imports).\nThe increase in imports reduces NX.\nSo the demand for dollars decreases.",
        },
        {
          problem: "(Example 2B) Alexandra, a French restaurant owner, buys shares in a California winery. What happens in the market for foreign-currency exchange?",
          solution:
            "NCO is the net supply of dollars (U.S. supply of dollars to buy foreign assets minus foreign demand for dollars to buy U.S. assets).\nThe increase in capital inflow reduces NCO.\nSo the supply of dollars decreases.",
        },
      ],
    },
    {
      title: "The effects of a budget deficit",
      points: [
        {
          term: "Chain of effects",
          text: "National saving falls, so the supply of loanable funds falls; the real interest rate rises; domestic investment and net capital outflow both fall; the real exchange rate appreciates (E increases); net exports fall (the trade deficit increases).",
        },
        {
          term: "The connection between r and E",
          text: "Anything that increases r will reduce NCO and the supply of dollars in the foreign exchange market, so the real exchange rate appreciates. The LF market determines r; this r determines NCO; this NCO determines the supply of dollars.",
        },
        {
          term: "Rising foreign debt",
          text: "As foreigners acquire more domestic assets, the country's debt to the rest of the world increases. Due to many years of budget and trade deficits, the U.S. is now the world's largest debtor nation.",
        },
        {
          term: "Twin deficits",
          text: "The lecture's 1960–2022 chart shows that U.S. net exports and the U.S. federal budget deficit often move in opposite directions: a larger budget deficit goes with lower net exports.",
        },
      ],
      formulas: [
        { name: "Net debt to the rest of the world", expr: "Net debt = Value of foreign-owned domestic assets − Value of domestically owned foreign assets" },
      ],
      table: [
        ["International investment position of the U.S. (end of Q2 2026)", "Value"],
        ["Value of U.S.-owned foreign assets", "$46.97 trillion"],
        ["Value of foreign-owned U.S. assets", "$69.39 trillion"],
        ["U.S. net debt to the rest of the world", "$22.42 trillion"],
      ],
      diagrams: [lfDeficit, ncoDeficit, fxDeficit],
    },
    {
      title: "Trade policy: an import quota (Example 3)",
      intro: "Suppose the government uses import quotas on cars imported from Japan, to protect jobs in the domestic auto industry.",
      points: [
        {
          term: "Trade policy",
          text: "Government policy that directly influences the quantity of goods and services a country imports or exports.",
        },
        { term: "Tariff", text: "A tax on imported goods." },
        { term: "Import quota", text: "A limit on the quantity of imports." },
        {
          term: "Arguments for restricting trade",
          text: "To save jobs in domestic industry, and to reduce the trade deficit.",
        },
        {
          term: "r and NCO",
          text: "An import quota does not affect saving or investment, so it does not affect NCO (recall NCO = S − I). r is unchanged.",
        },
        {
          term: "E",
          text: "Since NCO is unchanged, the supply-of-dollars curve does not shift. At each E, imports of cars fall, so net exports rise and the demand for dollars shifts right. At E₁ there is excess demand, so E rises to restore equilibrium.",
        },
        {
          term: "NX: nothing happens",
          text: "If E stayed at E₁, NX would rise, but the quota does not affect NCO, so the quantity of dollars supplied is fixed. Since NX must equal NCO, E rises enough to keep NX at its original level: restricting imports does not reduce the trade deficit.",
        },
        {
          term: "Jobs",
          text: "The quota reduces imports of Japanese autos, so U.S. consumers buy more U.S. autos and U.S. automakers hire more workers. But E rises, reducing foreign demand for U.S. exports, so export industries contract and lay off workers. The quota saves jobs in the auto industry but destroys jobs in U.S. export industries.",
        },
      ],
      formulas: [{ name: "Why NX cannot change", expr: "NX = NCO = S − I", note: "A policy that leaves S and I unchanged cannot change NX." }],
      diagrams: [lfQuota, ncoQuota, fxQuota],
    },
    {
      title: "Political instability and capital flight",
      intro: "1994: political instability in Mexico made world financial markets nervous. People worried about the safety of the Mexican assets they owned, sold many of these assets and pulled their capital out of Mexico.",
      points: [
        {
          term: "Capital flight",
          text: "A large and sudden reduction in the demand for assets located in a country.",
        },
        {
          term: "Loanable funds and NCO",
          text: "As foreign investors sell their assets and pull out their capital, NCO increases at each value of r. Demand for LF = I + NCO, so the increase in NCO increases demand for LF. The equilibrium values of r and NCO both increase.",
        },
        {
          term: "Foreign-currency exchange",
          text: "The increase in NCO causes an increase in the supply of pesos in the foreign exchange market, so the real exchange rate of the peso falls (the peso depreciates).",
        },
      ],
      diagrams: [lfFlight, ncoFlight, fxFlight],
    },
    {
      title: "Capital flows from China",
      points: [
        {
          term: "China's accumulation of foreign assets",
          text: "China accumulated foreign (including U.S.) assets: from 2000 to 2014 they increased from $160 billion to about $4 trillion, including U.S. government bonds.",
        },
        {
          term: "Results in the U.S. (2000–2014)",
          text: "Appreciation of the dollar relative to the Chinese renminbi, higher U.S. imports from China, and a larger U.S. trade deficit. The inflow of capital reduced U.S. interest rates, increasing investment in the U.S. economy.",
        },
        {
          term: "Since 2014",
          text: "China's reserves fell to about $3.2 trillion (end-2024).",
        },
      ],
    },
    {
      title: "Applying the model: other policies and events",
      intro: "Method: decide whether the event shifts saving/investment (loanable funds), the NCO curve, or only the demand for dollars (NX); then follow r → NCO → supply of dollars → E, remembering NX = NCO.",
      points: [
        {
          term: "Shocks to the demand for dollars only",
          text: "Anything that changes NX at a given E without changing S, I or the NCO curve (product quality, tastes, quotas, removing import restrictions, a budget-neutral export subsidy) only moves E. NX stays equal to the unchanged NCO.",
        },
        {
          term: "Shocks to loanable funds",
          text: "Anything that changes saving or investment (a budget deficit, an investment tax credit) changes r, which changes NCO, the supply of dollars, E and NX.",
        },
        {
          term: "Shocks to the NCO curve",
          text: "Anything that changes the attractiveness of domestic vs foreign assets at a given r (capital flight, higher foreign interest rates) shifts NCO and so both the demand for loanable funds and the supply of dollars.",
        },
      ],
      table: [
        ["Event", "Curve that shifts first", "r", "NCO", "E", "NX"],
        ["Budget deficit", "S of loanable funds left", "Rises", "Falls", "Rises", "Falls"],
        ["Investment tax credit (PS12 Q2)", "D of loanable funds right", "Rises", "Falls", "Rises", "Falls"],
        ["Import quota / tariff", "D for dollars right", "No change", "No change", "Rises", "No change"],
        ["Decline in U.S. product quality (PS12 Q3)", "D for dollars left", "No change", "No change", "Falls", "No change"],
        ["U.S. removes import restrictions (PS12 Q4)", "D for dollars left", "No change", "No change", "Falls", "No change"],
        ["French taste for California wine (PS12 Q5)", "D for dollars right", "No change", "No change", "Rises", "No change"],
        ["Export subsidy, budget-neutral (PS12 Q6)", "D for dollars right", "No change", "No change", "Rises", "No change"],
        ["Export subsidy, deficit-financed (PS12 Q7)", "D for dollars right and S of LF left", "Rises", "Falls", "Rises", "Falls"],
        ["European real interest rates rise (PS12 Q8)", "U.S. NCO curve right", "Rises", "Rises", "Falls", "Rises"],
        ["Capital flight (from the country)", "NCO curve right", "Rises", "Rises", "Falls", "Rises"],
      ],
      diagrams: [fxDemandFall],
      worked: [
        {
          problem:
            "(Problem Set 12 Q1) Japan generally runs a significant trade surplus. Is this most related to (a) high foreign demand for Japanese goods, (b) low Japanese demand for foreign goods, (c) a high Japanese saving rate relative to Japanese investment, or (d) structural barriers against imports into Japan?",
          solution:
            "(c). In an open economy S − I = NCO = NX. Japan saves more than it invests at home, so the extra saving flows abroad as NCO > 0, and since NX = NCO Japan runs an equally large trade surplus.\nThe other three only shift the demand for yen in the foreign-currency market: they raise Japan's real exchange rate, which adjusts to keep NX equal to NCO, so NX is unchanged.",
        },
        {
          problem:
            "(Problem Set 12 Q2) Congress considers an investment tax credit, which subsidises domestic investment. (a) Effects on national saving, investment, NCO, r, E and the trade balance? (b) Why might large exporters oppose it?",
          solution:
            "(a) Desired investment rises at every r, so demand for loanable funds shifts right and r rises. National saving increases (movement up the supply curve) and domestic investment increases. The higher r makes U.S. assets more attractive, so NCO falls. Lower NCO reduces the supply of dollars, so E rises. Since NX = NCO, NX falls: the trade balance moves toward deficit.\n(b) The dollar appreciates in real terms, making U.S. goods more expensive relative to foreign goods, so foreigners buy fewer U.S. exports and exporters expect lower sales and profits.",
        },
        {
          problem:
            "(Problem Set 12 Q3) The popular press claims the 1980s U.S. trade deficit came from a decline in the relative quality of U.S. products. (a) Effect on NX at a given exchange rate? (b) Effect on E and the trade balance? (c) Is the claim consistent with the model, and does the quality decline affect the U.S. standard of living?",
          solution:
            "(a) Foreigners buy fewer U.S. goods and Americans buy more foreign goods, so NX falls at every E: the demand for dollars shifts left.\n(b) S, I, r and NCO (the supply of dollars) do not change. E falls, and NX returns to its original level, equal to NCO.\n(c) Not consistent: the model predicts a lower real exchange rate, not a larger trade deficit, because the trade balance equals NCO = S − I. The 1980s deficit is explained by the budget deficit reducing national saving. The standard of living does fall: with a lower E, each unit of U.S. goods sold abroad buys fewer foreign goods, so Americans receive fewer imports for a given amount of domestic output.",
        },
        {
          problem:
            "(Problem Set 12 Q4) Why would U.S. export industries benefit from a reduction in U.S. restrictions on imports, even if other countries kept their trade barriers?",
          solution:
            "Removing import restrictions raises imports and lowers NX at every E, so the demand for dollars shifts left.\nS, I and so NCO are unaffected, so the supply of dollars is unchanged and E falls.\nThe cheaper dollar makes U.S. goods cheaper abroad, so exports rise. NX = NCO is unchanged: imports and exports both increase by the same amount.",
        },
        {
          problem:
            "(Problem Set 12 Q5) The French suddenly develop a strong taste for California wines. What happens to (a) the demand for dollars, (b) the value of the dollar, (c) U.S. net exports?",
          solution:
            "(a) The French need dollars to buy California wine, so the demand for dollars increases at every E.\n(b) The real exchange rate rises.\n(c) Unchanged. NCO (the supply of dollars) does not change and NX = NCO; higher wine exports are offset by fewer other exports and more imports as the dollar appreciates.",
        },
        {
          problem:
            "(Problem Set 12 Q6) A senator says that instead of tariffs and quotas, subsidising U.S. exports will reduce the trade deficit by increasing competitiveness. Do you agree?",
          solution:
            "An export subsidy raises NX at every E, so the demand for dollars shifts right and E rises.\nThe appreciation increases imports and reduces other exports, exactly offsetting the initial increase in exports. NCO is unchanged, so NX = NCO is unchanged.\nDisagree: the trade deficit is determined by S − I. To reduce it, the U.S. must raise national saving (e.g. cut the budget deficit).",
        },
        {
          problem:
            "(Problem Set 12 Q7) The U.S. subsidises agricultural exports without raising taxes or cutting other spending. What happens to national saving, investment, NCO, r, E and the trade balance, and to imports, exports and NX?",
          solution:
            "Trade effect: the subsidy raises NX at every E, so the demand for dollars shifts right and E rises.\nBudget effect: the subsidy raises the budget deficit, so public and national saving fall; the supply of loanable funds shifts left and r rises.\nThe higher r reduces investment and NCO, so the supply of dollars shifts left and E rises further.\nSummary: national saving, investment and NCO fall; r and E rise; the trade balance moves toward deficit. Imports increase (the dollar appreciates twice); exports may rise or fall (the subsidy raises them, the appreciation lowers them); NX falls because NX = NCO and NCO has fallen.",
        },
        {
          problem:
            "(Problem Set 12 Q8) Real interest rates increase across Europe. How does this affect U.S. NCO, U.S. net exports, the U.S. real interest rate and the U.S. real exchange rate?",
          solution:
            "European assets become more attractive, so U.S. NCO rises at every U.S. interest rate (the NCO curve shifts right).\nSince NX = NCO, U.S. net exports rise.\nHigher NCO raises the demand for loanable funds (I + NCO), so the U.S. real interest rate rises.\nMore NCO increases the supply of dollars, so the real exchange rate falls.",
        },
      ],
    },
    {
      title: "How responsive are NCO and exports? (Problem Set 12 Q9)",
      intro: "Suppose Americans decide to increase their saving.",
      points: [
        {
          term: "NCO highly responsive to r",
          text: "Small effect on domestic investment. Higher saving lowers r, but because NCO is very responsive, even a small fall in r causes a large rise in NCO. Most of the extra saving flows abroad and r falls only a little, so domestic investment rises by only a small amount.",
        },
        {
          term: "Exports fairly unresponsive to E",
          text: "Large effect on the real exchange rate. Higher NCO raises the supply of dollars, which lowers E, and NX must rise to match NCO. If exports barely respond to E, the demand for dollars is steep, so it takes a large depreciation to raise NX enough.",
        },
      ],
    },
  ],

  // ---------------------------------------------------------------- flashcards
  flashcards: [
    { id: "open-theory-c1", type: "concept", front: "In the open-economy model, the market where national saving is supplied and domestic investment plus net capital outflow is demanded.", back: "Market for loanable funds / loanable funds market", why: "The real interest rate adjusts to balance it; it is one of the two markets the model looks at." },
    { id: "open-theory-c2", type: "concept", front: "The market where U.S. dollars are traded for foreign currencies, with NX as demand and NCO as supply.", back: "Market for foreign-currency exchange / foreign exchange market", why: "The real exchange rate E adjusts to balance it." },
    { id: "open-theory-c3", type: "concept", front: "In the open-economy model, the source of the supply of loanable funds.", back: "National saving / S", why: "S = I + NCO: saving is supplied, investment and net capital outflow are demanded." },
    { id: "open-theory-c4", type: "concept", front: "In the open-economy model, the two sources of demand for loanable funds.", back: "Domestic investment and net capital outflow / I + NCO", why: "Both depend negatively on r, so the demand curve slopes down." },
    { id: "open-theory-c5", type: "concept", front: "When NCO > 0: the net purchase of capital overseas that adds to the demand for domestically generated loanable funds.", back: "Net outflow of capital / capital outflow", why: "Buying assets abroad uses domestic saving just as domestic investment does." },
    { id: "open-theory-c6", type: "concept", front: "When NCO < 0: capital resources coming from abroad that reduce the demand for domestically generated loanable funds.", back: "Net inflow of capital / capital inflow", why: "E.g. China's purchases of U.S. bonds reduced U.S. interest rates." },
    { id: "open-theory-c7", type: "concept", front: "The real return on domestic assets, which adjusts to balance the loanable funds market.", back: "Real interest rate / r", why: "A fall in it makes domestic assets less attractive, so NCO rises." },
    { id: "open-theory-c8", type: "concept", front: "The variable that links the loanable funds market to the market for foreign-currency exchange.", back: "Net capital outflow / NCO", why: "r from the LF market determines NCO, and NCO is the supply of dollars." },
    { id: "open-theory-c9", type: "concept", front: "In the market for foreign-currency exchange, what the demand for dollars comes from: foreigners need dollars to buy these.", back: "Net exports / NX", why: "NX is the net demand for dollars." },
    { id: "open-theory-c10", type: "concept", front: "In the market for foreign-currency exchange, what the supply of dollars comes from: U.S. residents sell dollars to buy foreign assets.", back: "Net capital outflow / NCO", why: "NCO is the net supply of dollars." },
    { id: "open-theory-c11", type: "concept", front: "The quantity of foreign goods and services that trade for one unit of U.S. goods and services: the real value of a dollar in the foreign exchange market.", back: "Real exchange rate / E", why: "E adjusts to balance supply and demand for dollars." },
    { id: "open-theory-c12", type: "concept", front: "Shape of the supply-of-dollars curve, because a change in E has no effect on S or I and so none on NCO.", back: "Vertical", why: "Only events that change NCO shift it." },
    { id: "open-theory-c13", type: "concept", front: "Shape of the demand curve for loanable funds, because both I and NCO depend negatively on r.", back: "Downward-sloping", why: "A higher r lowers both investment and net capital outflow." },
    { id: "open-theory-c14", type: "concept", front: "Government policy that directly influences the quantity of goods and services a country imports or exports.", back: "Trade policy", why: "Examples are tariffs and import quotas." },
    { id: "open-theory-c15", type: "concept", front: "A tax on imported goods.", back: "Tariff", why: "A type of trade policy." },
    { id: "open-theory-c16", type: "concept", front: "A limit on the quantity of imports.", back: "Import quota", why: "E.g. limiting cars imported from Japan to protect domestic auto jobs." },
    { id: "open-theory-c17", type: "concept", front: "A large and sudden reduction in the demand for assets located in a country.", back: "Capital flight", why: "E.g. Mexico in 1994 after political instability." },
    { id: "open-theory-c18", type: "concept", front: "The pattern where a country's budget deficit and trade deficit go together, so net exports and the budget deficit often move in opposite directions.", back: "Twin deficits", why: "A budget deficit lowers saving, so NCO and therefore NX fall." },
    { id: "open-theory-c19", type: "concept", front: "The description of the U.S. after many years of budget and trade deficits left foreign-owned U.S. assets far above U.S.-owned foreign assets.", back: "World's largest debtor nation", why: "U.S. net debt to the rest of the world was $22.42 trillion at the end of Q2 2026." },
    { id: "open-theory-c20", type: "concept", front: "Value of foreign-owned domestic assets minus value of domestically owned foreign assets.", back: "Net debt to the rest of the world", why: "It increases as foreigners acquire more domestic assets, e.g. during budget and trade deficits." },
    { id: "open-theory-c21", type: "concept", front: "The two things the open-economy model takes as given.", back: "Real GDP and the price level", why: "GDP is set by factors of production and technology; the price level by money supply and demand." },
    { id: "open-theory-c22", type: "concept", front: "A policy that subsidises domestic investment, raising desired investment at every interest rate.", back: "Investment tax credit", why: "It raises r, lowers NCO, appreciates the dollar and reduces NX (Problem Set 12 Q2)." },
    { id: "open-theory-c23", type: "concept", front: "A payment that raises net exports at every real exchange rate; if budget-neutral it appreciates the dollar and leaves NX unchanged.", back: "Export subsidy", why: "Problem Set 12 Q6: the trade deficit is set by S − I, not by competitiveness." },
    { id: "open-theory-c24", type: "concept", front: "The two variables that national saving minus domestic investment (S − I) equals in an open economy.", back: "NCO and NX", why: "So only events that change S or I can change the trade balance." },
    { id: "open-theory-c25", type: "concept", front: "The variable that adjusts to balance supply and demand for dollars, rising whenever the demand for dollars rises with supply fixed.", back: "Real exchange rate / E", why: "E.g. an import quota raises demand for dollars, so E rises." },
    { id: "open-theory-c26", type: "concept", front: "The direction NCO moves when the domestic real interest rate falls.", back: "Rises / increases", why: "Domestic assets become less attractive: residents buy more foreign assets and foreigners buy fewer domestic ones." },

    { id: "open-theory-c27", type: "scenario", front: "A government with a balanced budget starts running a budget deficit. What happens to r, NCO, E and NX?", back: "r rises, NCO falls, E rises (appreciates), NX falls", why: "National saving falls, so supply of loanable funds shifts left and r rises. Higher r makes domestic bonds more attractive, so NCO falls. Lower NCO reduces the supply of dollars, so E rises. NX = NCO, so NX falls: the trade deficit increases." },
    { id: "open-theory-c28", type: "scenario", front: "The government imposes import quotas on Japanese cars. What happens to r, NCO, E and NX?", back: "r and NCO unchanged; E rises; NX unchanged", why: "The quota does not affect S or I, so r and NCO (= S − I) do not change. At each E, imports fall and NX rises, so demand for dollars shifts right and E rises. With the supply of dollars fixed, E rises until NX is back at NCO." },
    { id: "open-theory-c29", type: "scenario", front: "Does an import quota on cars save U.S. jobs?", back: "Saves auto jobs but destroys export jobs", why: "Consumers buy more U.S. cars, so automakers hire. But E rises, reducing foreign demand for U.S. exports, so export industries lay off workers." },
    { id: "open-theory-c30", type: "scenario", front: "Political instability makes investors sell a country's assets and pull out their capital. What happens to its r, NCO and currency?", back: "r rises, NCO rises, the currency depreciates", why: "Capital flight: NCO rises at each r, so demand for loanable funds (I + NCO) shifts right and r rises. Higher NCO increases the supply of the currency, so its real exchange rate falls." },
    { id: "open-theory-c31", type: "scenario", front: "Congress passes an investment tax credit. What happens to r, NCO, E and the trade balance?", back: "r rises, NCO falls, E rises, NX falls (toward deficit)", why: "Investment demand rises, so demand for loanable funds shifts right and r rises. Higher r reduces NCO, so the supply of dollars falls and E rises. NX = NCO, so NX falls." },
    { id: "open-theory-c32", type: "scenario", front: "The relative quality of U.S. products declines. What happens to the U.S. real exchange rate and trade balance?", back: "E falls; NX unchanged", why: "NX falls at every E, so demand for dollars shifts left. S, I, r and NCO are unchanged, so E falls until NX returns to its original level, equal to NCO." },
    { id: "open-theory-c33", type: "scenario", front: "The U.S. removes its import restrictions while other countries keep theirs. What happens to U.S. export industries?", back: "They benefit: E falls so exports rise", why: "Imports rise and NX falls at every E, so demand for dollars shifts left and E falls. Cheaper U.S. goods abroad raise exports; NX = NCO is unchanged as imports and exports both rise." },
    { id: "open-theory-c34", type: "scenario", front: "The French suddenly develop a strong taste for California wines. What happens to the demand for dollars, E and U.S. NX?", back: "Demand for dollars rises, E rises, NX unchanged", why: "The French need dollars to buy the wine, so demand shifts right and E rises. NCO (supply of dollars) is unchanged and NX = NCO, so higher wine exports are offset by fewer other exports and more imports." },
    { id: "open-theory-c35", type: "scenario", front: "The government subsidises exports while keeping its budget unchanged. Does the trade deficit shrink?", back: "No: E rises, NX unchanged", why: "Demand for dollars shifts right and E rises, which raises imports and cuts other exports. NCO = S − I is unchanged, so NX = NCO is unchanged." },
    { id: "open-theory-c36", type: "scenario", front: "The government subsidises agricultural exports without raising taxes or cutting other spending. What happens to NX?", back: "NX falls (toward deficit)", why: "The subsidy raises the budget deficit, cutting national saving: r rises, NCO falls. Since NX = NCO, NX falls even though the subsidy first raised demand for dollars. E rises for both reasons." },
    { id: "open-theory-c37", type: "scenario", front: "Real interest rates rise across Europe. What happens to U.S. NCO, NX, r and E?", back: "NCO rises, NX rises, r rises, E falls", why: "European assets become more attractive, so U.S. NCO rises at every U.S. rate. Demand for loanable funds (I + NCO) rises, so r rises. More NCO raises the supply of dollars, so E falls. NX = NCO rises." },
    { id: "open-theory-c38", type: "scenario", front: "Americans decide to save more and U.S. NCO is highly responsive to r. Will domestic investment rise a lot or a little?", back: "A little (small effect)", why: "Higher saving lowers r, but a small fall in r causes a large rise in NCO, so most extra saving flows abroad and r falls only a little." },
    { id: "open-theory-c39", type: "scenario", front: "Americans save more and U.S. exports are fairly unresponsive to the real exchange rate. Will E change a lot or a little?", back: "A lot (large depreciation)", why: "Higher NCO raises the supply of dollars and NX must rise to match. A steep demand for dollars means E must fall a lot to raise NX enough." },
    { id: "open-theory-c40", type: "scenario", front: "A U.S. business owner buys cars made in Germany. What happens in the market for foreign-currency exchange?", back: "The demand for dollars decreases", why: "NX is the net demand for dollars. Higher imports reduce NX, so the demand for dollars falls." },
    { id: "open-theory-c41", type: "scenario", front: "A French restaurant owner buys shares in a California winery. What happens in the market for foreign-currency exchange?", back: "The supply of dollars decreases", why: "NCO is the net supply of dollars. A foreign purchase of a U.S. asset is a capital inflow that reduces NCO, so the supply of dollars falls." },
    { id: "open-theory-c42", type: "scenario", front: "A country saves far more than it invests at home. What kind of trade balance should it have, and why?", back: "A trade surplus, because S − I = NCO = NX > 0", why: "Extra saving flows abroad as NCO > 0, and since NX = NCO the country runs an equal trade surplus (Problem Set 12 Q1, Japan)." },
    { id: "open-theory-c43", type: "scenario", front: "A foreign government buys large amounts of U.S. assets, including government bonds. What happens to the dollar, the U.S. trade deficit and U.S. interest rates?", back: "Dollar appreciates, trade deficit grows, U.S. interest rates fall", why: "Capital inflow lowers U.S. NCO, reducing the supply of dollars so the dollar appreciates; NX = NCO falls; the inflow of funds reduces U.S. interest rates and raises investment, as with China in 2000–2014." },
  ],

  // ---------------------------------------------------------------- quiz
  quiz: [
    { id: "open-theory-q1", kind: "fill", sub: "Model assumptions", prompt: "The open-economy model assumes the economy's real ____ is given, determined by factors of production and available technology.", answers: [["GDP", "output", "real GDP"]], explain: "Assumption 1: GDP is given." },
    { id: "open-theory-q2", kind: "fill", sub: "Model assumptions", prompt: "The model assumes the economy's ____ level is given, adjusting to balance the supply and demand for money.", answers: [["price"]], explain: "Assumption 2: the price level is given." },
    { id: "open-theory-q3", kind: "fill", sub: "Model assumptions", prompt: "The model looks simultaneously at the market for loanable funds and the market for foreign-currency ____.", answers: [["exchange"]], explain: "These two related markets determine r, E and the trade balance." },
    { id: "open-theory-q4", kind: "fill", sub: "Loanable funds", prompt: "In an open economy, S = I + ____.", answers: [["NCO", "net capital outflow"]], explain: "Saving = domestic investment + net capital outflow." },
    { id: "open-theory-q5", kind: "fill", sub: "Loanable funds", prompt: "The supply of loanable funds comes from national ____.", answers: [["saving", "savings"]], explain: "S supplies loanable funds." },
    { id: "open-theory-q6", kind: "fill", sub: "Loanable funds", prompt: "The demand for loanable funds comes from domestic investment and ____.", answers: [["net capital outflow", "NCO"]], explain: "D = I + NCO." },
    { id: "open-theory-q7", kind: "fill", sub: "Loanable funds", prompt: "When NCO > 0, the net purchase of capital overseas ____ to the demand for domestically generated loanable funds.", answers: [["adds"]], explain: "A net outflow of capital uses domestic saving." },
    { id: "open-theory-q8", kind: "fill", sub: "Loanable funds", prompt: "When NCO < 0, capital resources coming from abroad ____ the demand for domestically generated loanable funds.", answers: [["reduce", "reduces", "lower", "decrease"]], explain: "A net inflow of capital means less of the domestic funds are demanded." },
    { id: "open-theory-q9", kind: "fill", sub: "NCO and r", prompt: "The real interest rate r is the real return on ____ assets.", answers: [["domestic"]], explain: "That is why r affects how attractive domestic assets are relative to foreign ones." },
    { id: "open-theory-q10", kind: "fill", sub: "NCO and r", prompt: "A fall in r makes domestic assets ____ attractive relative to foreign assets.", answers: [["less"]], explain: "So U.S. residents buy more foreign assets and foreigners buy fewer U.S. assets." },
    { id: "open-theory-q11", kind: "fill", sub: "NCO and r", prompt: "When the domestic real interest rate falls, net capital outflow ____.", answers: [["rises", "rise", "increases", "increase"]], explain: "The NCO curve slopes down against r." },
    { id: "open-theory-q12", kind: "fill", sub: "Loanable funds", prompt: "Both I and NCO depend ____ on r, so the demand curve for loanable funds is downward-sloping.", answers: [["negatively", "inversely"]], explain: "A higher r lowers both investment and net capital outflow." },
    { id: "open-theory-q13", kind: "fill", sub: "Loanable funds", prompt: "The ____ adjusts to balance supply and demand in the loanable funds market.", answers: [["real interest rate", "interest rate", "r"]], explain: "r is the price in the LF market." },
    { id: "open-theory-q14", kind: "fill", sub: "Linking the markets", prompt: "The loanable funds market determines r, and this value of r then determines ____.", answers: [["NCO", "net capital outflow"]], explain: "Left graph (LF) gives r; right graph (NCO curve) gives NCO at that r." },
    { id: "open-theory-q15", kind: "fill", sub: "Budget deficit", prompt: "A budget deficit reduces national saving and the ____ of loanable funds, which drives up r.", answers: [["supply"]], explain: "The supply curve of loanable funds shifts left." },
    { id: "open-theory-q16", kind: "fill", sub: "Budget deficit", prompt: "After a budget deficit, the higher r makes domestic bonds more attractive relative to foreign bonds, which ____ NCO.", answers: [["reduces", "reduce", "lowers", "decreases"]], explain: "A movement along the NCO curve to a lower NCO." },
    { id: "open-theory-q17", kind: "fill", sub: "Foreign-currency exchange", prompt: "The market for foreign-currency exchange rests on the identity NCO = ____.", answers: [["NX", "net exports"]], explain: "Supply of dollars (NCO) equals demand for dollars (NX)." },
    { id: "open-theory-q18", kind: "fill", sub: "Foreign-currency exchange", prompt: "NX is the ____ for dollars, because foreigners need dollars to buy U.S. net exports.", answers: [["demand"]], explain: "NX is the net demand for dollars." },
    { id: "open-theory-q19", kind: "fill", sub: "Foreign-currency exchange", prompt: "NCO is the ____ of dollars, because U.S. residents sell dollars to obtain the foreign currency needed to buy foreign assets.", answers: [["supply"]], explain: "NCO is the net supply of dollars." },
    { id: "open-theory-q20", kind: "fill", sub: "Real exchange rate", prompt: "The U.S. real exchange rate E measures the quantity of ____ goods and services that trade for one unit of U.S. goods and services.", answers: [["foreign"]], explain: "E is the real value of a dollar in the foreign exchange market." },
    { id: "open-theory-q21", kind: "fill", sub: "Real exchange rate", prompt: "An increase in E makes U.S. goods more ____ to foreigners, reducing the quantity of dollars demanded.", answers: [["expensive", "costly"]], explain: "So the demand for dollars slopes down against E." },
    { id: "open-theory-q22", kind: "fill", sub: "Real exchange rate", prompt: "An increase in E has no effect on S or I, so it does not affect NCO; the supply-of-dollars curve is therefore ____.", answers: [["vertical"]], explain: "Only a change in NCO shifts the supply of dollars." },
    { id: "open-theory-q23", kind: "fill", sub: "Foreign-currency exchange", prompt: "A U.S. business owner buys cars made in Germany. U.S. NX falls, so the demand for dollars ____.", answers: [["decreases", "decrease", "falls", "fall"]], explain: "Example 2A: higher imports reduce NX, the net demand for dollars." },
    { id: "open-theory-q24", kind: "fill", sub: "Foreign-currency exchange", prompt: "A French restaurant owner buys shares in a California winery. U.S. NCO falls, so the supply of dollars ____.", answers: [["decreases", "decrease", "falls", "fall"]], explain: "Example 2B: the capital inflow reduces NCO, the net supply of dollars." },
    { id: "open-theory-q25", kind: "fill", sub: "Budget deficit", prompt: "With a budget deficit, domestic investment and net capital outflow both ____.", answers: [["fall", "falls", "decrease", "decline"]], explain: "Higher r reduces both I and NCO." },
    { id: "open-theory-q26", kind: "fill", sub: "Budget deficit", prompt: "With a budget deficit, the real exchange rate ____ because the supply of dollars falls.", answers: [["appreciates", "rises", "increases"]], explain: "Lower NCO shifts the vertical supply of dollars left, so E rises." },
    { id: "open-theory-q27", kind: "fill", sub: "Budget deficit", prompt: "With a budget deficit, net exports fall, so the trade deficit ____.", answers: [["increases", "rises", "grows", "widens"]], explain: "NX = NCO, and NCO has fallen." },
    { id: "open-theory-q28", kind: "fill", sub: "Budget deficit", prompt: "Anything that increases r will reduce NCO and the ____ of dollars, so the real exchange rate appreciates.", answers: [["supply"]], explain: "The connection between r and E." },
    { id: "open-theory-q29", kind: "fill", sub: "Foreign debt", prompt: "As foreigners acquire more domestic assets, the country's ____ to the rest of the world increases.", answers: [["debt"]], explain: "One other effect of a budget deficit." },
    { id: "open-theory-q30", kind: "fill", sub: "Foreign debt", prompt: "After many years of budget and trade deficits, the U.S. is now the world's largest ____ nation.", answers: [["debtor"]], explain: "Foreign-owned U.S. assets exceed U.S.-owned foreign assets." },
    { id: "open-theory-q31", kind: "fill", sub: "Foreign debt", prompt: "U.S.-owned foreign assets are $46.97 trillion and foreign-owned U.S. assets are $69.39 trillion. U.S. net debt to the rest of the world is $____ trillion (2 d.p.).", answers: [["22.42"]], explain: "69.39 − 46.97 = 22.42." },
    { id: "open-theory-q32", kind: "fill", sub: "Twin deficits", prompt: "In the twin deficits chart, net exports and the budget deficit often move in ____ directions.", answers: [["opposite"]], explain: "A bigger budget deficit goes with lower net exports." },
    { id: "open-theory-q33", kind: "fill", sub: "Trade policy", prompt: "Government policy that directly influences the quantity of goods and services a country imports or exports is ____ policy.", answers: [["trade"]], explain: "Tariffs and import quotas are examples." },
    { id: "open-theory-q34", kind: "fill", sub: "Trade policy", prompt: "A tax on imported goods is called a ____.", answers: [["tariff"]], explain: "One kind of trade policy." },
    { id: "open-theory-q35", kind: "fill", sub: "Trade policy", prompt: "A limit on the quantity of imports is called an import ____.", answers: [["quota"]], explain: "E.g. a quota on cars imported from Japan." },
    { id: "open-theory-q36", kind: "fill", sub: "Trade policy", prompt: "Arguments for restricting trade: to save jobs in domestic industry and to reduce the trade ____.", answers: [["deficit"]], explain: "The model shows quotas do not achieve the second aim." },
    { id: "open-theory-q37", kind: "fill", sub: "Import quota", prompt: "An import quota does not affect saving or investment, so it does not affect ____.", answers: [["NCO", "net capital outflow"]], explain: "NCO = S − I." },
    { id: "open-theory-q38", kind: "fill", sub: "Import quota", prompt: "With an import quota, at each E imports fall and NX rises, so the demand for dollars shifts to the ____.", answers: [["right"]], explain: "At the old E₁ there is excess demand for dollars, so E rises." },
    { id: "open-theory-q39", kind: "fill", sub: "Import quota", prompt: "Because NCO is unchanged and NX = NCO, an import quota leaves net exports ____.", answers: [["unchanged", "the same", "constant", "unaffected"]], explain: "E rises enough to keep NX at its original level." },
    { id: "open-theory-q40", kind: "fill", sub: "Import quota", prompt: "The import quota saves jobs in the auto industry but destroys jobs in U.S. ____ industries.", answers: [["export", "exporting", "exports"]], explain: "Higher E reduces foreign demand for U.S. exports." },
    { id: "open-theory-q41", kind: "fill", sub: "Capital flight", prompt: "A large and sudden reduction in the demand for assets located in a country is called capital ____.", answers: [["flight"]], explain: "E.g. Mexico in 1994." },
    { id: "open-theory-q42", kind: "fill", sub: "Capital flight", prompt: "With capital flight, NCO increases at each r, so the demand for loanable funds ____.", answers: [["increases", "rises", "increase", "rise"]], explain: "Demand for LF = I + NCO shifts right." },
    { id: "open-theory-q43", kind: "fill", sub: "Capital flight", prompt: "With capital flight, the equilibrium values of r and NCO both ____.", answers: [["increase", "rise", "increases", "rises"]], explain: "The NCO curve and LF demand both shift right." },
    { id: "open-theory-q44", kind: "fill", sub: "Capital flight", prompt: "Capital flight from Mexico increases the supply of pesos, so the peso ____.", answers: [["depreciates", "falls", "weakens"]], explain: "The real exchange rate of the peso falls." },
    { id: "open-theory-q45", kind: "fill", sub: "Capital flows from China", prompt: "China's accumulation of U.S. assets in 2000–2014 led to ____ of the dollar relative to the renminbi.", answers: [["appreciation"]], explain: "It also brought higher U.S. imports from China and a larger U.S. trade deficit." },
    { id: "open-theory-q46", kind: "fill", sub: "Capital flows from China", prompt: "The inflow of capital from China ____ U.S. interest rates, increasing investment in the U.S. economy.", answers: [["reduced", "lowered", "decreased"]], explain: "A capital inflow adds to the funds available in the U.S." },
    { id: "open-theory-q47", kind: "fill", sub: "S − I = NX", prompt: "A country's national saving is $500 billion and domestic investment is $420 billion. Its net exports are $____ billion.", answers: [["80"]], explain: "NX = NCO = S − I = 500 − 420 = 80." },
    { id: "open-theory-q48", kind: "fill", sub: "S − I = NX", prompt: "Japan's large trade surplus is best explained by a high Japanese ____ rate relative to Japanese investment.", answers: [["saving", "savings"]], explain: "Problem Set 12 Q1: S − I = NCO = NX." },
    { id: "open-theory-q49", kind: "fill", sub: "Other policies", prompt: "An investment tax credit shifts loanable funds demand right; r rises and NCO ____.", answers: [["falls", "decreases", "fall", "decrease"]], explain: "Higher r makes U.S. assets more attractive (Problem Set 12 Q2)." },
    { id: "open-theory-q50", kind: "fill", sub: "Other policies", prompt: "A budget-neutral export subsidy raises E and leaves U.S. net exports ____.", answers: [["unchanged", "the same", "constant", "unaffected"]], explain: "NCO is unchanged, so NX = NCO is unchanged (Problem Set 12 Q6)." },
    { id: "open-theory-q51", kind: "fill", sub: "Other policies", prompt: "When real interest rates rise across Europe, U.S. NCO rises and the U.S. real exchange rate ____.", answers: [["falls", "decreases", "depreciates", "fall"]], explain: "More NCO increases the supply of dollars (Problem Set 12 Q8)." },
    { id: "open-theory-q52", kind: "fill", sub: "Responsiveness", prompt: "If U.S. NCO is highly responsive to r, an increase in U.S. saving has a ____ effect on domestic investment.", answers: [["small"]], explain: "Most of the extra saving flows abroad and r falls only a little." },
    { id: "open-theory-q53", kind: "fill", sub: "Responsiveness", prompt: "If U.S. exports are fairly unresponsive to E, an increase in U.S. saving has a ____ effect on the real exchange rate.", answers: [["large", "big"]], explain: "A steep demand for dollars needs a large depreciation to raise NX to match NCO." },

    { id: "open-theory-q54", kind: "mcq", sub: "S − I = NX", prompt: "Japan generally runs a significant trade surplus. This is most related to:", options: ["High foreign demand for Japanese goods", "Low Japanese demand for foreign goods", "A high Japanese saving rate relative to Japanese investment", "Structural barriers against imports into Japan"], answer: 2, explain: "S − I = NCO = NX. The other options only shift demand for yen and change the real exchange rate, not NX." },
    { id: "open-theory-q55", kind: "mcq", sub: "Budget deficit", prompt: "A government budget deficit causes:", options: ["r rises, NCO rises, E falls, NX rises", "r rises, NCO falls, E rises, NX falls", "r falls, NCO rises, E falls, NX rises", "r unchanged, NCO unchanged, E rises, NX unchanged"], answer: 1, explain: "Lower saving raises r; higher r lowers NCO and the supply of dollars; E rises; NX = NCO falls." },
    { id: "open-theory-q56", kind: "mcq", sub: "Import quota", prompt: "An import quota on cars affects U.S. net exports by:", options: ["Increasing them, since imports fall", "Decreasing them, since the dollar depreciates", "Leaving them unchanged, since E rises and NCO is unchanged", "Increasing them, since NCO rises"], answer: 2, explain: "NX must equal NCO = S − I, which the quota does not change." },
    { id: "open-theory-q57", kind: "mcq", sub: "Capital flight", prompt: "Capital flight from Mexico causes Mexico's:", options: ["Real interest rate to fall and the peso to appreciate", "Real interest rate to rise and the peso to depreciate", "Real interest rate to rise and the peso to appreciate", "NCO to fall and the peso to depreciate"], answer: 1, explain: "NCO rises at each r: LF demand rises (r up) and the supply of pesos rises (peso depreciates)." },
    { id: "open-theory-q58", kind: "mcq", sub: "Foreign-currency exchange", prompt: "In the market for foreign-currency exchange, the supply of dollars comes from:", options: ["Net exports", "Net capital outflow", "National saving", "Domestic investment"], answer: 1, explain: "U.S. residents sell dollars to buy foreign assets: NCO is the supply of dollars." },
    { id: "open-theory-q59", kind: "mcq", sub: "Loanable funds", prompt: "Why does the demand for loanable funds slope downward in the open-economy model?", options: ["Saving rises with r", "Both I and NCO depend negatively on r", "NX rises with r", "E falls when r rises"], answer: 1, explain: "Demand = I + NCO, and both fall as r rises." },
    { id: "open-theory-q60", kind: "mcq", sub: "Other policies", prompt: "A decline in the relative quality of U.S. products would:", options: ["Raise the U.S. trade deficit and leave E unchanged", "Lower E and leave NX unchanged", "Raise E and lower NX", "Raise r and lower NCO"], answer: 1, explain: "Demand for dollars shifts left; S, I and NCO are unchanged, so only E falls (Problem Set 12 Q3)." },
    { id: "open-theory-q61", kind: "mcq", sub: "Other policies", prompt: "An investment tax credit would make which group most unhappy?", options: ["Domestic savers", "Large U.S. exporters", "Foreign buyers of U.S. bonds", "U.S. importers"], answer: 1, explain: "The dollar appreciates in real terms, making U.S. exports more expensive (Problem Set 12 Q2b)." },
    { id: "open-theory-q62", kind: "mcq", sub: "Other policies", prompt: "The U.S. subsidises agricultural exports without raising taxes or cutting spending. The U.S. trade balance:", options: ["Moves toward surplus", "Is unchanged", "Moves toward deficit", "Cannot be determined"], answer: 2, explain: "The higher budget deficit lowers saving, raising r and lowering NCO; NX = NCO falls (Problem Set 12 Q7)." },
    { id: "open-theory-q63", kind: "mcq", sub: "Other policies", prompt: "Real interest rates rise across Europe. For the U.S.:", options: ["NCO falls, r falls, E rises", "NCO rises, r rises, E falls", "NCO rises, r falls, E rises", "NCO unchanged, r unchanged, E falls"], answer: 1, explain: "The NCO curve shifts right: LF demand rises (r up) and the supply of dollars rises (E down) (Problem Set 12 Q8)." },
  ],

  // ---------------------------------------------------------------- exam
  exam: [
    {
      id: "open-theory-e1",
      section: "calc",
      sub: "S − I = NCO = NX",
      prompt: "A country's national saving is $4,000 billion and its domestic investment is $3,400 billion. Its trade balance (net exports) is ______________.",
      marks: 3,
      rubric: [
        { point: "States the formulas: S = I + NCO and NX = NCO", marks: 1 },
        { point: "Correct working: NCO = 4,000 − 3,400 = 600 = NX", marks: 1 },
        { point: "Correct answer: NX = $600 billion (a trade surplus)", marks: 1 },
      ],
      model: "S = I + NCO, so NCO = S − I = 4,000 − 3,400 = $600 billion\nNX = NCO = $600 billion\nThe country runs a trade surplus of $600 billion because it saves more than it invests at home.",
      answer: "$600 billion",
      source: "Problem Set 12 Q1",
    },
    {
      id: "open-theory-e2",
      section: "calc",
      sub: "Net foreign debt",
      prompt: "At the end of Q2 2026 the value of U.S.-owned foreign assets was $46.97 trillion and the value of foreign-owned U.S. assets was $69.39 trillion. U.S. net debt to the rest of the world is ______________.",
      marks: 3,
      rubric: [
        { point: "States the formula: net debt = value of foreign-owned U.S. assets − value of U.S.-owned foreign assets", marks: 1 },
        { point: "Correct working: 69.39 − 46.97", marks: 1 },
        { point: "Correct answer $22.42 trillion", marks: 1 },
      ],
      model: "Net debt to the rest of the world = value of foreign-owned U.S. assets − value of U.S.-owned foreign assets\n= 69.39 − 46.97 = $22.42 trillion\n(The U.S. is the world's largest debtor nation after many years of budget and trade deficits.)",
      answer: "$22.42 trillion",
      source: "Lecture 12",
    },
    {
      id: "open-theory-e3",
      section: "calc",
      sub: "Budget deficit and NX",
      prompt: "Before a budget deficit, national saving is $3,000 billion and domestic investment is $2,800 billion. After the deficit, the new equilibrium has national saving of $2,850 billion and domestic investment of $2,750 billion. The change in net exports is ______________.",
      marks: 3,
      rubric: [
        { point: "States the formulas: NCO = S − I and NX = NCO", marks: 1 },
        { point: "Correct working: before NCO = 3,000 − 2,800 = 200; after NCO = 2,850 − 2,750 = 100", marks: 1 },
        { point: "Correct answer: NX falls by $100 billion (from 200 to 100)", marks: 1 },
      ],
      model: "NCO = S − I and NX = NCO\nBefore: NCO = 3,000 − 2,800 = $200 billion, so NX = $200 billion\nAfter: NCO = 2,850 − 2,750 = $100 billion, so NX = $100 billion\nChange in NX = 100 − 200 = −$100 billion: the deficit lowers NCO and so lowers net exports.",
      answer: "−$100 billion",
      source: "Lecture 12",
    },
    {
      id: "open-theory-e4",
      section: "calc",
      sub: "NX = NCO",
      prompt: "A country exports $2,000 billion of goods and services. Foreigners buy $900 billion of its assets while its residents buy $600 billion of foreign assets. Its imports are ______________.",
      marks: 3,
      rubric: [
        { point: "States the formulas: NCO = purchases of foreign assets by residents − purchases of domestic assets by foreigners; NX = NCO; NX = exports − imports", marks: 1 },
        { point: "Correct working: NCO = 600 − 900 = −300 = NX; imports = 2,000 − (−300)", marks: 1 },
        { point: "Correct answer $2,300 billion", marks: 1 },
      ],
      model: "NCO = 600 − 900 = −$300 billion (a net capital inflow)\nNX = NCO = −$300 billion\nNX = exports − imports, so imports = exports − NX = 2,000 + 300 = $2,300 billion (a trade deficit).",
      answer: "$2,300 billion",
      source: "Lecture 12",
    },

    {
      id: "open-theory-e5",
      section: "short",
      sub: "S − I = NX",
      prompt: "Japan generally runs a significant trade surplus. Explain why this is most related to a high Japanese saving rate relative to Japanese investment, rather than high foreign demand for Japanese goods.",
      marks: 3,
      rubric: [
        { point: "In an open economy S − I = NCO = NX", marks: 1 },
        { point: "Japan saves more than it invests, so the extra saving flows abroad as NCO > 0, and NX = NCO gives an equal trade surplus", marks: 1 },
        { point: "High foreign demand only shifts the demand for yen: the real exchange rate rises, keeping NX equal to NCO, so NX is unchanged", marks: 1 },
      ],
      model: "In an open economy, national saving minus domestic investment equals net capital outflow, which equals net exports (S − I = NCO = NX). Because Japan saves more than it invests at home, the extra saving flows abroad as a positive net capital outflow, and since NX = NCO Japan must run an equally large trade surplus. High foreign demand for Japanese goods only shifts the demand for yen in the foreign-currency market; Japan's real exchange rate rises to keep net exports equal to NCO, so it does not change the surplus.",
      source: "Problem Set 12 Q1",
    },
    {
      id: "open-theory-e6",
      section: "short",
      sub: "Investment tax credit",
      prompt: "Congress is considering an investment tax credit, which subsidises domestic investment. Explain why representatives of several large exporters might oppose the policy.",
      marks: 3,
      rubric: [
        { point: "Investment demand rises, so demand for loanable funds shifts right and r rises", marks: 1 },
        { point: "Higher r reduces NCO and the supply of dollars, so the real exchange rate rises (dollar appreciates)", marks: 1 },
        { point: "U.S. goods become more expensive relative to foreign goods, so exports fall and exporters expect lower sales and profits", marks: 1 },
      ],
      model: "The credit raises desired investment at every interest rate, so the demand for loanable funds shifts right and the real interest rate rises. The higher interest rate makes U.S. assets more attractive, so net capital outflow and the supply of dollars fall, and the real exchange rate rises. The dollar's real appreciation makes U.S. goods more expensive relative to foreign goods, so foreigners buy fewer U.S. exports and exporters expect lower sales and profits.",
      source: "Problem Set 12 Q2(b)",
    },
    {
      id: "open-theory-e7",
      section: "short",
      sub: "Product quality",
      prompt: "The popular press claimed the rise in the 1980s U.S. trade deficit came from a decline in the relative quality of U.S. products. Is this claim consistent with the open-economy model? Does such a decline affect the U.S. standard of living?",
      marks: 3,
      rubric: [
        { point: "Lower quality reduces NX at every E, shifting the demand for dollars left; S, I and NCO unchanged, so E falls rather than the trade deficit rising", marks: 1 },
        { point: "Not consistent: the trade balance equals NCO = S − I (set by saving and investment); the 1980s deficit is explained by the budget deficit reducing national saving", marks: 1 },
        { point: "Standard of living falls: with lower E each unit of U.S. goods sold abroad buys fewer foreign goods", marks: 1 },
      ],
      model: "A decline in quality reduces net exports at every real exchange rate, shifting the demand for dollars left, but saving, investment and NCO are unchanged, so the real exchange rate falls and net exports return to their original level. The claim is therefore not consistent with the model: the trade balance equals NCO = S − I, so it is set by saving and investment, and the 1980s deficit is explained by the budget deficit reducing national saving. The standard of living does fall, because with a lower real exchange rate each unit of U.S. goods sold abroad buys fewer foreign goods.",
      source: "Problem Set 12 Q3(c)",
    },
    {
      id: "open-theory-e8",
      section: "short",
      sub: "Removing import restrictions",
      prompt: "Explain why U.S. export industries would benefit from a reduction in U.S. restrictions on imports, even if other countries did not reduce their trade barriers.",
      marks: 3,
      rubric: [
        { point: "Removing restrictions raises imports and lowers NX at every E, so the demand for dollars shifts left", marks: 1 },
        { point: "S, I and so NCO are unaffected, so the supply of dollars is unchanged and the real exchange rate falls", marks: 1 },
        { point: "The cheaper dollar makes U.S. goods cheaper abroad, so exports rise (imports and exports both rise; NX = NCO unchanged)", marks: 1 },
      ],
      model: "Removing import restrictions raises imports and lowers net exports at every real exchange rate, so the demand for dollars shifts left. Saving, investment and therefore NCO are unaffected, so the supply of dollars does not change and the real exchange rate falls. The cheaper dollar makes U.S. goods cheaper abroad, so exports rise; NX = NCO is unchanged because imports and exports both increase by the same amount, so export industries gain even if other countries keep their barriers.",
      source: "Problem Set 12 Q4",
    },
    {
      id: "open-theory-e9",
      section: "short",
      sub: "Import quota and jobs",
      prompt: "The government imposes import quotas on cars from Japan to protect jobs in the domestic auto industry. Does the policy save U.S. jobs? Explain.",
      marks: 3,
      rubric: [
        { point: "The quota reduces imports of Japanese cars, so U.S. consumers buy more U.S. cars and automakers hire more workers: auto jobs are saved", marks: 1 },
        { point: "But NX rises at each E, so demand for dollars shifts right and the real exchange rate rises (NCO unchanged)", marks: 1 },
        { point: "Higher E reduces foreign demand for U.S. exports, so export industries contract and lay off workers: jobs are destroyed there", marks: 1 },
      ],
      model: "The quota reduces imports of Japanese cars, so U.S. consumers buy more U.S. cars and U.S. automakers hire more workers, saving jobs in the auto industry. However, the quota raises net exports at every real exchange rate, shifting the demand for dollars right, and since NCO is unchanged the real exchange rate rises. The higher real exchange rate reduces foreign demand for U.S. exports, so export industries contract and lay off workers: the quota saves auto jobs but destroys jobs in U.S. export industries.",
      source: "Lecture 12 Example 3",
    },
    {
      id: "open-theory-e10",
      section: "short",
      sub: "Responsiveness of NCO",
      prompt: "Suppose Americans decide to increase their saving. If U.S. net capital outflow is highly responsive to the real interest rate, will this have a large or small effect on U.S. domestic investment? Explain.",
      marks: 3,
      rubric: [
        { point: "States a small effect on domestic investment", marks: 1 },
        { point: "Higher saving shifts supply of loanable funds right and lowers r; because NCO is very responsive, a small fall in r causes a large rise in NCO", marks: 1 },
        { point: "Most of the extra saving flows abroad and r falls only a little, so investment rises only a little", marks: 1 },
      ],
      model: "The effect on domestic investment is small. Higher saving increases the supply of loanable funds and lowers the real interest rate. Because NCO is very responsive to r, even a small fall in r causes a large rise in net capital outflow, so most of the extra saving flows abroad. The real interest rate therefore falls only a little, and domestic investment rises by only a small amount.",
      source: "Problem Set 12 Q9(a)",
    },
    {
      id: "open-theory-e11",
      section: "short",
      sub: "Responsiveness of exports",
      prompt: "Suppose Americans increase their saving. If U.S. exports are fairly unresponsive to the real exchange rate, will this have a large or small effect on the U.S. real exchange rate? Explain.",
      marks: 3,
      rubric: [
        { point: "States a large effect on the real exchange rate", marks: 1 },
        { point: "Higher saving lowers r and raises NCO, which raises the supply of dollars and lowers E; NX must rise to match NCO", marks: 1 },
        { point: "If exports barely respond to E, the demand for dollars is steep, so a large depreciation is needed to raise NX enough", marks: 1 },
      ],
      model: "The effect on the real exchange rate is large. Higher saving lowers the real interest rate and raises net capital outflow, which increases the supply of dollars and lowers the real exchange rate, and net exports must rise to match the higher NCO. If exports barely respond to the exchange rate, the demand for dollars is steep, so it takes a large depreciation to raise net exports enough.",
      source: "Problem Set 12 Q9(b)",
    },
    {
      id: "open-theory-e12",
      section: "short",
      sub: "Foreign-currency exchange",
      prompt: "In the market for foreign-currency exchange, explain where the demand for and supply of dollars come from, and why the supply curve is vertical.",
      marks: 3,
      rubric: [
        { point: "Demand for dollars comes from NX: foreigners need dollars to buy U.S. net exports", marks: 1 },
        { point: "Supply of dollars comes from NCO: U.S. residents sell dollars to obtain foreign currency to buy foreign assets", marks: 1 },
        { point: "Vertical because a change in E has no effect on S or I, so it does not affect NCO (which is set by r in the LF market)", marks: 1 },
      ],
      model: "The demand for dollars comes from net exports, because foreigners need dollars to buy U.S. net exports; a higher real exchange rate makes U.S. goods more expensive, so the demand curve slopes down. The supply of dollars comes from net capital outflow, because U.S. residents sell dollars to obtain the foreign currency they need to buy foreign assets. The supply curve is vertical because a change in the real exchange rate has no effect on saving or investment, so it does not affect NCO, which is determined by the real interest rate in the loanable funds market.",
      source: "Lecture 12",
    },

    {
      id: "open-theory-e13",
      section: "tf",
      sub: "Import quota",
      prompt: "An import quota reduces a country's trade deficit.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: NX is unchanged", marks: 1 },
        { point: "The quota does not affect saving or investment, so NCO (= S − I) and the supply of dollars are unchanged", marks: 1 },
        { point: "Higher NX at each E shifts demand for dollars right, so E rises until NX returns to equal NCO", marks: 1 },
      ],
      model: "False. An import quota does not affect national saving or domestic investment, so net capital outflow (NCO = S − I) and the supply of dollars are unchanged. Because imports fall at every real exchange rate, the demand for dollars shifts right and the real exchange rate rises. The appreciation reduces exports and raises other imports until net exports return to their original level, since NX must equal NCO, so the trade deficit is not reduced.",
      source: "Lecture 12 Example 3",
    },
    {
      id: "open-theory-e14",
      section: "tf",
      sub: "Budget deficit",
      prompt: "A government budget deficit causes the real exchange rate to appreciate and net exports to fall.",
      tf: true,
      marks: 3,
      rubric: [
        { point: "States True", marks: 1 },
        { point: "The deficit reduces national saving and the supply of loanable funds, raising r, which reduces NCO", marks: 1 },
        { point: "Lower NCO reduces the supply of dollars, so E rises; NX = NCO, so NX falls (trade deficit increases)", marks: 1 },
      ],
      model: "True. A budget deficit reduces national saving, so the supply of loanable funds falls and the real interest rate rises. The higher interest rate makes domestic assets more attractive, so net capital outflow falls, reducing the supply of dollars in the foreign-currency market. The real exchange rate therefore appreciates, and since NX = NCO, net exports fall and the trade deficit increases.",
      source: "Lecture 12",
    },
    {
      id: "open-theory-e15",
      section: "tf",
      sub: "Capital flight",
      prompt: "Capital flight from a country raises its real interest rate and causes its currency to depreciate.",
      tf: true,
      marks: 3,
      rubric: [
        { point: "States True", marks: 1 },
        { point: "Investors sell the country's assets, so NCO rises at each r; demand for loanable funds (I + NCO) rises, raising r", marks: 1 },
        { point: "Higher NCO increases the supply of the currency in the foreign exchange market, so its real exchange rate falls (e.g. Mexico 1994)", marks: 1 },
      ],
      model: "True. Capital flight is a large and sudden reduction in the demand for a country's assets: as investors sell assets and pull out capital, NCO increases at each interest rate. Since demand for loanable funds equals I + NCO, demand rises and the real interest rate rises. The higher NCO also increases the supply of the currency in the foreign exchange market, so the real exchange rate falls and the currency depreciates, as the peso did in Mexico in 1994.",
      source: "Lecture 12",
    },
    {
      id: "open-theory-e16",
      section: "tf",
      sub: "Supply of dollars",
      prompt: "An increase in the U.S. real exchange rate reduces U.S. net capital outflow and therefore the supply of dollars.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "An increase in E has no effect on saving or investment, so it does not affect NCO", marks: 1 },
        { point: "The supply of dollars (NCO) is vertical; NCO depends on r from the loanable funds market. A higher E instead reduces the quantity of dollars demanded (NX)", marks: 1 },
      ],
      model: "False. An increase in the real exchange rate has no effect on national saving or domestic investment, so it does not affect net capital outflow or the supply of dollars; that is why the supply curve is vertical. NCO is determined by the real interest rate in the loanable funds market. What a higher E does change is the demand side: it makes U.S. goods more expensive to foreigners and reduces the quantity of dollars demanded for net exports.",
      source: "Lecture 12",
    },
    {
      id: "open-theory-e17",
      section: "tf",
      sub: "Product quality",
      prompt: "A decline in the relative quality of U.S. products increases the U.S. trade deficit.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: the trade balance is unchanged", marks: 1 },
        { point: "NX falls at every E, so the demand for dollars shifts left and the real exchange rate falls", marks: 1 },
        { point: "S, I and NCO are unchanged and NX = NCO = S − I, so NX returns to its original level", marks: 1 },
      ],
      model: "False. Lower quality means foreigners buy fewer U.S. goods and Americans buy more foreign goods, so net exports fall at every real exchange rate and the demand for dollars shifts left. Saving, investment, the interest rate and NCO do not change, so the supply of dollars is unchanged and the real exchange rate falls. Because NX = NCO = S − I, net exports return to their original level; the decline lowers the real exchange rate, not the trade balance.",
      source: "Problem Set 12 Q3",
    },
    {
      id: "open-theory-e18",
      section: "tf",
      sub: "Export subsidy",
      prompt: "Subsidising U.S. exports, without changing the government budget balance, will reduce the U.S. trade deficit.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: NX is unchanged", marks: 1 },
        { point: "The subsidy raises NX at every E, so the demand for dollars shifts right and E rises; the appreciation raises imports and reduces other exports", marks: 1 },
        { point: "NCO = S − I is unchanged, so NX = NCO is unchanged; reducing the deficit needs higher national saving", marks: 1 },
      ],
      model: "False. An export subsidy raises net exports at every real exchange rate, so the demand for dollars shifts right and the real exchange rate rises. The appreciation increases imports and reduces other exports, exactly offsetting the initial rise in exports. Because the subsidy does not change saving or investment, NCO is unchanged and NX = NCO is unchanged; to reduce the trade deficit, the U.S. would need to raise national saving, for example by cutting the budget deficit.",
      source: "Problem Set 12 Q6",
    },
    {
      id: "open-theory-e19",
      section: "tf",
      sub: "Foreign interest rates",
      prompt: "An increase in real interest rates across Europe increases U.S. net exports.",
      tf: true,
      marks: 3,
      rubric: [
        { point: "States True", marks: 1 },
        { point: "European assets become more attractive, so U.S. NCO rises at every U.S. interest rate", marks: 1 },
        { point: "Since NX = NCO, U.S. net exports rise; the higher supply of dollars lowers E (and higher LF demand raises the U.S. r)", marks: 1 },
      ],
      model: "True. Higher European real interest rates make European assets more attractive, so U.S. net capital outflow rises at every level of the U.S. interest rate. The extra NCO raises the supply of dollars, so the U.S. real exchange rate falls, which makes U.S. goods cheaper. Since NX = NCO, U.S. net exports rise; the higher NCO also raises the demand for loanable funds, so the U.S. real interest rate rises.",
      source: "Problem Set 12 Q8",
    },
    {
      id: "open-theory-e20",
      section: "tf",
      sub: "Investment tax credit",
      prompt: "An investment tax credit increases U.S. net capital outflow.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: NCO falls", marks: 1 },
        { point: "The credit raises investment demand, shifting the demand for loanable funds right, so r rises", marks: 1 },
        { point: "Higher r makes U.S. assets more attractive, so NCO falls (and so E rises and NX falls)", marks: 1 },
      ],
      model: "False. An investment tax credit raises desired investment at every interest rate, so the demand for loanable funds shifts right and the real interest rate rises. The higher real interest rate makes U.S. assets more attractive relative to foreign assets, so net capital outflow falls. The lower NCO reduces the supply of dollars, so the real exchange rate rises and net exports fall.",
      source: "Problem Set 12 Q2",
    },
    {
      id: "open-theory-e21",
      section: "tf",
      sub: "NCO and r",
      prompt: "A fall in the U.S. real interest rate causes Americans to buy fewer foreign assets, so U.S. net capital outflow falls.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: NCO rises", marks: 1 },
        { point: "r is the real return on domestic assets; a fall makes domestic assets less attractive relative to foreign assets", marks: 1 },
        { point: "Americans buy more foreign assets and foreigners buy fewer U.S. assets, so NCO rises (NCO curve slopes down)", marks: 1 },
      ],
      model: "False. The real interest rate is the real return on domestic assets, so a fall in r makes U.S. assets less attractive relative to foreign assets. People in the U.S. therefore purchase more foreign assets, and people abroad purchase fewer U.S. assets. Both effects raise U.S. net capital outflow, which is why the NCO curve slopes downward against r.",
      source: "Lecture 12",
    },

    {
      id: "open-theory-e22",
      section: "diagram",
      sub: "Budget deficit",
      prompt: "Suppose the government of an open economy, which previously had a balanced budget, starts running a budget deficit.",
      parts: [
        { label: "(a)", prompt: "Using clearly labelled diagrams of the market for loanable funds and of net capital outflow, show the effect of the budget deficit on the real interest rate, domestic investment and net capital outflow.", marks: 5 },
        { label: "(b)", prompt: "Using a clearly labelled diagram of the market for foreign-currency exchange, show the effect on the real exchange rate and net exports. Explain how the two diagrams in (a) and (b) are linked.", marks: 5 },
      ],
      marks: 10,
      rubric: [
        { point: "(a) Loanable funds diagram correctly labelled (r on the vertical axis, loanable funds on the horizontal, S = saving upward-sloping, D = I + NCO downward-sloping) with initial equilibrium r₁", marks: 1 },
        { point: "(a) Budget deficit reduces national saving: supply curve shifts left from S₁ to S₂", marks: 1 },
        { point: "(a) Real interest rate rises from r₁ to r₂; domestic investment falls", marks: 1 },
        { point: "(a) NCO diagram correctly labelled with a downward-sloping NCO curve against r", marks: 1 },
        { point: "(a) Higher r moves along the NCO curve: NCO falls from NCO₁ to NCO₂ because domestic bonds become more attractive than foreign bonds", marks: 1 },
        { point: "(b) Foreign-currency exchange diagram correctly labelled (E on the vertical axis, quantity of dollars on the horizontal, vertical S = NCO, downward-sloping D = NX) with initial E₁", marks: 1 },
        { point: "(b) Lower NCO reduces the supply of dollars: vertical supply shifts left from S₁ = NCO₁ to S₂ = NCO₂", marks: 1 },
        { point: "(b) Real exchange rate rises (appreciates) from E₁ to E₂", marks: 1 },
        { point: "(b) Net exports fall to equal the lower NCO: the trade deficit increases", marks: 1 },
        { point: "(b) Link explained: the LF market determines r, r determines NCO, and NCO is the supply of dollars in the foreign exchange market (NX = NCO)", marks: 1 },
      ],
      model:
        "(a) In the loanable funds market, supply comes from national saving and demand from domestic investment plus net capital outflow (D = I + NCO). A budget deficit reduces national saving, so the supply of loanable funds shifts left from S₁ to S₂. The real interest rate rises from r₁ to r₂ and the quantity of domestic investment falls. In the NCO diagram, the higher real interest rate makes domestic bonds more attractive relative to foreign bonds, so domestic residents buy fewer foreign assets and foreigners buy more domestic assets: NCO falls from NCO₁ to NCO₂, a movement along the downward-sloping NCO curve.\n\n(b) In the market for foreign-currency exchange, the supply of dollars comes from NCO and is vertical, and the demand for dollars comes from NX and slopes down. The fall in NCO shifts the supply of dollars left from S₁ = NCO₁ to S₂ = NCO₂. The real exchange rate rises (appreciates) from E₁ to E₂, which makes domestic goods more expensive relative to foreign goods, so net exports fall to the new, lower level of NCO and the trade deficit increases. The diagrams are linked because the loanable funds market determines r, this r determines NCO, and this NCO determines the supply of dollars; NX = NCO throughout. As foreigners acquire more domestic assets, the country's debt to the rest of the world also increases.",
      diagram: [lfDeficit, ncoDeficit, fxDeficit],
      source: "Lecture 12 Example 1",
    },
    {
      id: "open-theory-e23",
      section: "diagram",
      sub: "Trade policy",
      prompt: "Suppose the government imposes import quotas on cars imported from Japan in order to protect jobs in the domestic auto industry.",
      parts: [
        { label: "(a)", prompt: "Using clearly labelled diagrams of the market for loanable funds and of net capital outflow, explain what happens to the real interest rate and net capital outflow.", marks: 5 },
        { label: "(b)", prompt: "Using a clearly labelled diagram of the market for foreign-currency exchange, show what happens to the real exchange rate and net exports. Does the policy save U.S. jobs?", marks: 5 },
      ],
      marks: 10,
      rubric: [
        { point: "(a) Loanable funds diagram correctly labelled (r vs loanable funds, S and D = I + NCO) with equilibrium r₁", marks: 1 },
        { point: "(a) States that the quota does not affect national saving or domestic investment", marks: 1 },
        { point: "(a) So neither curve shifts and the real interest rate stays at r₁", marks: 1 },
        { point: "(a) NCO diagram labelled; with r unchanged, NCO stays at NCO₁", marks: 1 },
        { point: "(a) Explains NCO = S − I is unchanged, so the supply of dollars will not change", marks: 1 },
        { point: "(b) Foreign-currency exchange diagram labelled (E vs dollars, vertical S = NCO, D₁ = NX) with initial E₁", marks: 1 },
        { point: "(b) At each E car imports fall and NX rises: demand for dollars shifts right from D₁ to D₂", marks: 1 },
        { point: "(b) Excess demand at E₁, so E rises to E₂ (supply of dollars unchanged)", marks: 1 },
        { point: "(b) NX is unchanged: E rises until NX returns to equal the unchanged NCO, so the trade deficit is not reduced", marks: 1 },
        { point: "(b) Jobs: auto-industry jobs are saved, but the higher E reduces exports, so jobs are destroyed in export industries", marks: 1 },
      ],
      model:
        "(a) An import quota does not affect national saving or domestic investment. In the loanable funds market, neither the supply curve (S) nor the demand curve (D = I + NCO) shifts, so the real interest rate stays at r₁. In the NCO diagram, with r unchanged at r₁, net capital outflow stays at NCO₁. This follows from NCO = S − I: since neither S nor I changes, NCO cannot change, so the supply of dollars in the foreign exchange market is fixed.\n\n(b) In the market for foreign-currency exchange, since NCO is unchanged the vertical supply curve S = NCO does not shift. At each real exchange rate, imports of cars fall, so net exports rise and the demand for dollars shifts right from D₁ to D₂. At E₁ there is excess demand for dollars, so the real exchange rate rises to E₂. Net exports do not change: if E stayed at E₁, NX would rise, but because the quantity of dollars supplied (NCO) is fixed and NX must equal NCO, E rises enough to keep NX at its original level. So the quota does not reduce the trade deficit. It saves jobs in the auto industry, because consumers buy more U.S. cars, but the higher E reduces foreign demand for U.S. exports, so export industries contract and lay off workers.",
      diagram: [lfQuota, ncoQuota, fxQuota],
      source: "Lecture 12 Example 3",
    },
    {
      id: "open-theory-e24",
      section: "diagram",
      sub: "Capital flight",
      prompt: "In 1994, political instability in Mexico made world financial markets nervous. People worried about the safety of Mexican assets, sold many of them and pulled their capital out of Mexico.",
      parts: [
        { label: "(a)", prompt: "Using clearly labelled diagrams of Mexico's market for loanable funds and of Mexico's net capital outflow, show the effect of this capital flight on Mexico's real interest rate and net capital outflow.", marks: 5 },
        { label: "(b)", prompt: "Using a clearly labelled diagram of the market for foreign-currency exchange (for pesos), show the effect on the real exchange rate of the peso and on Mexico's net exports.", marks: 5 },
      ],
      marks: 10,
      rubric: [
        { point: "(a) Loanable funds diagram correctly labelled (r vs loanable funds, S, D₁ = I + NCO) with initial r₁", marks: 1 },
        { point: "(a) Capital flight: NCO increases at each value of r, so the NCO curve shifts right from NCO₁ to NCO₂", marks: 1 },
        { point: "(a) Since demand for LF = I + NCO, demand for loanable funds shifts right from D₁ to D₂", marks: 1 },
        { point: "(a) Real interest rate rises from r₁ to r₂", marks: 1 },
        { point: "(a) Equilibrium NCO increases (shown on the new NCO curve at r₂)", marks: 1 },
        { point: "(b) Foreign-currency exchange diagram correctly labelled (E of the peso vs quantity of pesos, vertical S = NCO, downward-sloping D) with initial E₁", marks: 1 },
        { point: "(b) Higher NCO increases the supply of pesos: vertical supply shifts right from S₁ = NCO₁ to S₂ = NCO₂", marks: 1 },
        { point: "(b) Real exchange rate of the peso falls from E₁ to E₂: the peso depreciates", marks: 1 },
        { point: "(b) Since NX = NCO and NCO has risen, Mexico's net exports rise (the cheaper peso makes Mexican goods cheaper abroad)", marks: 1 },
        { point: "(b) Defines capital flight as a large and sudden reduction in the demand for assets located in a country", marks: 1 },
      ],
      model:
        "(a) Capital flight is a large and sudden reduction in the demand for assets located in a country. As investors sell Mexican assets and pull out their capital, Mexico's NCO increases at each value of the real interest rate, so the NCO curve shifts right from NCO₁ to NCO₂. Because the demand for loanable funds equals I + NCO, the increase in NCO shifts the demand for loanable funds right from D₁ to D₂. The real interest rate rises from r₁ to r₂, and the equilibrium values of both r and NCO increase.\n\n(b) In the market for foreign-currency exchange for pesos, the supply of pesos comes from NCO and is vertical. The increase in NCO shifts the supply of pesos right from S₁ = NCO₁ to S₂ = NCO₂. With demand unchanged, the real exchange rate of the peso falls from E₁ to E₂: the peso depreciates. Since NX = NCO and NCO has risen, Mexico's net exports rise, as the cheaper peso makes Mexican goods cheaper relative to foreign goods.",
      diagram: [lfFlight, ncoFlight, fxFlight],
      source: "Lecture 12 (capital flight from Mexico)",
    },
  ],
};

export default data;
