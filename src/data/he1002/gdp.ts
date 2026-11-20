import type { TopicData } from "@/lib/he1002/types";

// Lecture 1 "Measuring a Nation's Income" + Problem Set 1 (with answer guide) + HE1002 exam examples.

const data: TopicData = {
  id: "gdp",

  // ------------------------------------------------------------------ content
  sections: [
    {
      title: "Micro vs macro and national accounting",
      intro: "Macroeconomics looks at the economy as a whole. National accounting is how we measure it.",
      points: [
        { term: "Microeconomics", text: "The study of how households and firms make decisions and interact in markets." },
        { term: "Macroeconomics", text: "The study of economy-wide phenomena, including economic growth, inflation and unemployment." },
        {
          term: "Origins of national accounting",
          text: "The lecture traces national accounting back to Sir William Petty (17th-century London) and to Simon Kuznets (Great Depression era).",
        },
        {
          term: "System of National Accounts (SNA)",
          text: "The national accounting framework developed by the United Nations after WWII. It records goods and services produced; wages, profits, rent and interest; household spending; investment in factories, machinery and housing; government consumption expenditure; exports and imports; national savings, etc.",
        },
      ],
    },
    {
      title: "GDP: output = income = expenditure",
      points: [
        {
          term: "Gross domestic product (GDP)",
          text: "Measures the total output of the economy. It also measures the total income of everyone in the economy and the total expenditure on the economy's output of goods and services.",
        },
        {
          term: "Income equals expenditure",
          text: "For the economy as a whole, income equals expenditure because every dollar a buyer spends is a dollar of income for the seller.",
          eg: "You pay a hairdresser $20: that is $20 of spending for you and $20 of income for the hairdresser.",
        },
      ],
    },
    {
      title: "The circular-flow diagram",
      intro: "A simple depiction of the macroeconomy that illustrates GDP as spending, revenue, factor payments and income.",
      points: [
        { term: "Households", text: "Own the factors of production and sell or rent them to firms for income; buy and consume goods and services." },
        { term: "Firms", text: "Buy or hire factors of production and use them to produce goods and services; sell goods and services." },
        {
          term: "Markets for goods and services",
          text: "Firms sell goods and services here and households buy them. Households' spending (= GDP) becomes firms' revenue (= GDP).",
        },
        {
          term: "Markets for factors of production",
          text: "Households supply labour, land and capital to firms. Firms pay wages, rent and profit (= GDP), which becomes households' income (= GDP).",
        },
        {
          term: "What the simple diagram omits",
          text: "The government (collects taxes, buys goods and services); the financial system (matches savers' supply of funds with borrowers' demand for loans); the foreign sector (trades goods and services, financial assets and currencies with the country's residents).",
        },
        {
          term: "Extended circular flow",
          text: "The fuller diagram adds these sectors: households pay net taxes and receive public goods while the government buys goods and services from firms; household and corporate savings flow into the financial sector, which lends (borrowings) to fund firms' investment and can absorb a government budget surplus or fund government borrowing; the foreign sector buys exports and supplies imports.",
        },
      ],
      table: [
        ["Market", "Real flow", "Money flow (each = GDP)"],
        ["Goods and services", "Goods and services: firms → households", "Spending by households → revenue of firms"],
        ["Factors of production", "Labour, land, capital: households → firms", "Wages, rent and profit from firms → income of households"],
      ],
    },
    {
      title: "The definition of GDP, phrase by phrase",
      intro: "GDP is the market value of all final goods and services produced within a country in a given period.",
      points: [
        {
          term: "Market value",
          text: "Goods are valued at their market prices, so all goods are measured in the same units (e.g. dollars). Things that don't have a market value are excluded.",
          eg: "Housework you do for yourself is not in GDP.",
        },
        {
          term: "All",
          text: "GDP includes all items produced in the economy and sold legally in markets. It excludes most items produced and sold illicitly, and most items produced and consumed at home.",
        },
        { term: "Final goods", text: "Goods intended for the end user." },
        {
          term: "Intermediate goods",
          text: "Goods used as components or ingredients in the production of other goods. GDP only includes final goods because they already embody the value of the intermediate goods used in their production.",
          eg: "Flour sold to a baker is intermediate; the bread sold to consumers is final.",
        },
        {
          term: "Goods and services",
          text: "GDP includes tangible goods (food, mountain bikes, beer) and intangible services (dry cleaning, concerts, haircuts).",
        },
        {
          term: "Produced",
          text: "GDP includes currently produced goods, not goods produced in the past. Counting resold used goods would double-count goods sold more than once, overstating production and making GDP a less informative measure of well-being.",
          eg: "Buying an old Victorian house from another family is not in GDP.",
        },
        {
          term: "Within a country",
          text: "GDP measures the value of production that occurs within a country's borders, whether done by its own citizens or by foreigners located there.",
        },
        { term: "In a given period", text: "GDP measures production within a specific interval of time, usually a year or a quarter (3 months)." },
      ],
    },
    {
      title: "Value added",
      intro: "From Problem Set 1 Q8: GDP can also be calculated as the sum of value added by all producers.",
      points: [
        {
          term: "Value added",
          text: "The value of a producer's output minus the value of the intermediate goods that the producer buys to make the output.",
        },
        {
          term: "Sum of value added = GDP",
          text: "Adding up every producer's value added gives the market value of the final good, which is GDP. This avoids counting intermediate goods twice.",
        },
      ],
      formulas: [{ name: "Value added", expr: "Value added = value of producer's output − value of intermediate goods bought" }],
      worked: [
        {
          problem:
            "A farmer sells wheat to a miller for $100. The miller sells flour to a baker for $150. The baker sells bread to consumers for $180. Find GDP and each producer's value added. (Problem Set 1 Q8)",
          solution:
            "GDP = market value of the final good (bread) = $180\nFarmer: $100 − $0 = $100\nMiller: $150 − $100 = $50\nBaker: $180 − $150 = $30\nTotal value added = $100 + $50 + $30 = $180 = GDP",
        },
      ],
    },
    {
      title: "The components of GDP",
      intro: "GDP is total spending, split into four components that add up to GDP (Y).",
      points: [
        {
          term: "Consumption (C)",
          text: "Spending by households on goods and services. Excludes purchases of new housing.",
          eg: "A haircut, a new refrigerator, a bottle of wine.",
        },
        {
          term: "Housing in C",
          text: "For renters, C includes rent payments. For homeowners, C includes the imputed rental value of the house, but not the purchase price or mortgage payments.",
        },
        {
          term: "Investment (I)",
          text: "Spending on goods that will be used in the future to produce more goods. 'Investment' does not mean the purchase of financial assets like stocks and bonds.",
        },
        { term: "Business capital", text: "Business structures, equipment and intellectual property products (part of I).", eg: "Honda expanding its factory." },
        { term: "Residential capital", text: "A landlord's apartment building; a homeowner's personal residence (part of I).", eg: "Hiring a contractor to build a new house." },
        {
          term: "Inventory accumulations",
          text: "Goods produced but not yet sold (part of I). When a good is later sold from inventory, C rises and I falls, so GDP is unchanged.",
        },
        {
          term: "Government purchases (G)",
          text: "Spending on the goods and services purchased by the government.",
          eg: "A state government hiring workers to repave a highway.",
        },
        {
          term: "Transfer payments",
          text: "Payments such as Social Security or unemployment insurance benefits. They are excluded from G because they are not purchases of goods and services: nothing is produced, so there is no contribution to GDP.",
        },
        { term: "Net exports (NX)", text: "Exports minus imports." },
        { term: "Exports", text: "Foreign spending on the economy's goods and services." },
        {
          term: "Imports",
          text: "The portions of C, I and G that are spent on goods and services produced abroad. Buying an imported good raises C (or I or G) and lowers NX by the same amount, so GDP is unchanged.",
          eg: "Buying French wine: C rises, NX falls.",
        },
      ],
      formulas: [
        { name: "Expenditure identity", expr: "Y = C + I + G + NX" },
        { name: "Net exports", expr: "NX = Exports − Imports" },
      ],
      table: [
        ["U.S. GDP 2024", "$ billions", "% of GDP", "Per person"],
        ["Y (GDP)", "29,179", "100.0", "$85,767"],
        ["C", "19,826", "68", "$58,276"],
        ["I", "5,273", "18", "$15,499"],
        ["G", "4,989", "17", "$14,664"],
        ["NX", "(909)", "(3.0)", "($2,671)"],
      ],
      worked: [
        {
          problem: "Classify each transaction into C, I, G, NX or 'not in GDP'. (Problem Set 1 Q1)",
          solution:
            "New refrigerator from a domestic manufacturer → C\nHiring a local contractor to build a new house → I\nBuying an old Victorian house from another family → Not in GDP (not currently produced)\nPaying for a haircut → C\nFord sells a Mustang from its inventory to a family → C rises, I falls\nFord makes a Focus and sells it to Avis, the car-rental company → I\nA state hires workers to repave a highway → G\nGovernment sends a Social Security cheque → Not in GDP (transfer payment)\nYour parents buy French wine → C rises, NX falls\nHonda expands its factory in Ohio → I (in U.S. GDP)",
        },
      ],
    },
    {
      title: "Nominal versus real GDP",
      points: [
        { term: "Nominal GDP", text: "The production of goods and services valued at current prices. Not corrected for inflation." },
        { term: "Real GDP", text: "The production of goods and services valued at constant prices (base year). Corrected for inflation." },
        { term: "Base year", text: "The year whose prices are used to value output in every year. For the base year, nominal GDP = real GDP." },
        {
          term: "What each change reflects",
          text: "The change in nominal GDP reflects changes in both prices and quantities. The change in real GDP is how much GDP would change if prices were constant (zero inflation), so it reflects only changes in quantities.",
        },
        {
          term: "Real GDP and well-being",
          text: "Economic well-being rises when real GDP rises. If only prices rise while output is unchanged, nominal GDP rises but real GDP does not (Problem Set 1 Q5c).",
        },
      ],
      formulas: [
        { name: "Nominal GDP", expr: "Nominal GDP = Σ (current-year price × current-year quantity)" },
        { name: "Real GDP", expr: "Real GDP = Σ (base-year price × current-year quantity)" },
      ],
      table: [
        ["Year", "Pizza P", "Pizza Q", "Chocolate P", "Chocolate Q", "Nominal GDP", "Real GDP (2025 prices)"],
        ["2025", "$15", "300", "$2.50", "1,000", "$7,000", "$7,000"],
        ["2026", "$16", "400", "$3.00", "1,200", "$10,000", "$9,000"],
        ["2027", "$17", "500", "$3.50", "1,300", "$13,050", "$10,750"],
      ],
      worked: [
        {
          problem: "Lecture Example 1A–1C: using the table, compute nominal GDP, real GDP (base year 2025) and their growth.",
          solution:
            "Nominal 2025 = $15 × 300 + $2.50 × 1,000 = $7,000\nNominal 2026 = $16 × 400 + $3.00 × 1,200 = $10,000 (+42.9%)\nNominal 2027 = $17 × 500 + $3.50 × 1,300 = $13,050 (+30.5%)\nReal 2025 = $15 × 300 + $2.50 × 1,000 = $7,000\nReal 2026 = $15 × 400 + $2.50 × 1,200 = $9,000 (+28.6%)\nReal 2027 = $15 × 500 + $2.50 × 1,300 = $10,750 (+19.4%)\nNominal GDP grows faster because it includes price increases; real GDP growth reflects quantities only.",
        },
      ],
      diagrams: [
        {
          title: "Nominal and real GDP over time",
          x: "Time (years)",
          y: "GDP ($)",
          lines: [
            { label: "Real GDP", pts: [[1, 3], [9, 7]], tone: 1 },
            { label: "Nominal GDP", pts: [[1, 1.8], [9, 9]] },
          ],
          points: [{ on: ["Real GDP", "Nominal GDP"], label: "Base year", xTick: "Base year" }],
          caption: "Nominal GDP equals real GDP in the base year; with rising prices, nominal GDP grows faster than real GDP.",
        },
      ],
    },
    {
      title: "The GDP deflator",
      points: [
        {
          term: "GDP deflator",
          text: "100 × nominal GDP ÷ real GDP. A measure of the price level: it measures the current level of prices relative to the level of prices in the base year.",
        },
        { term: "Deflator in the base year", text: "In the base year, real GDP = nominal GDP, so the GDP deflator = 100." },
        {
          term: "Inflation rate (from the deflator)",
          text: "The economy's inflation rate is the percentage increase in the GDP deflator from one year to the next.",
        },
      ],
      formulas: [
        { name: "GDP deflator", expr: "GDP deflator = Nominal GDP ÷ Real GDP × 100" },
        { name: "Real GDP from the deflator", expr: "Real GDP = Nominal GDP ÷ GDP deflator × 100" },
        { name: "Nominal GDP from the deflator", expr: "Nominal GDP = GDP deflator × Real GDP ÷ 100" },
        { name: "Inflation rate", expr: "Inflation rate = (Deflator₂ − Deflator₁) ÷ Deflator₁ × 100%" },
      ],
      worked: [
        {
          problem: "Lecture Example 1D: nominal GDP $7,000, $10,000, $13,050 and real GDP $7,000, $9,000, $10,750 (2025–2027). Find the deflator and inflation rate.",
          solution:
            "2025: 100 × 7,000 ÷ 7,000 = 100\n2026: 100 × 10,000 ÷ 9,000 = 111.1 → inflation = (111.1 − 100) ÷ 100 = 11.1%\n2027: 100 × 13,050 ÷ 10,750 = 121.4 → inflation = (121.4 − 111.1) ÷ 111.1 = 9.3%",
        },
        {
          problem: "Problem Set 1 Q2 (base year 2010): fill in the missing values.",
          solution:
            "1980: deflator = 1,200 ÷ 3,000 × 100 = 40\n1990: nominal = 60 × 5,000 ÷ 100 = 3,000\n2000: real = 6,000 ÷ 100 × 100 = 6,000\n2010 (base year): real = nominal = 8,000, deflator = 100\n2020: real = 15,000 ÷ 200 × 100 = 7,500\n2030: nominal = 300 × 10,000 ÷ 100 = 30,000\n2040: deflator = 50,000 ÷ 20,000 × 100 = 250",
        },
        {
          problem:
            "Problem Set 1 Q5: milk $1 (100 qts) and honey $2 (50 qts) in 2026; milk $1 (200), honey $2 (100) in 2027; milk $2 (200), honey $4 (100) in 2028. Base year 2026.",
          solution:
            "Nominal: 2026 = $200; 2027 = $400; 2028 = 2×200 + 4×100 = $800\nReal (2026 prices): 2026 = $200; 2027 = $400; 2028 = 1×200 + 2×100 = $400\nDeflator: 100, 100, 200\n2027: nominal +100%, real +100%, deflator 0% (prices unchanged)\n2028: nominal +100%, real 0% (output unchanged), deflator +100%\nWell-being rose more in 2027, because real GDP rose then but not in 2028.",
        },
      ],
    },
    {
      title: "Growth rates",
      points: [
        { term: "Growth rate of real GDP", text: "The percentage change in real GDP; it reflects the change in quantities produced." },
        {
          term: "Compound annual growth rate (CAGR)",
          text: "Assumes the variable grew at a constant compounded rate each year. With GDP₀ = X and growth g, GDPₙ = X(1 + g)ᴺ, so g = (GDPₙ ÷ GDP₀)^(1/N) − 1.",
        },
        {
          term: "Nominal vs real growth",
          text: "The growth rate of nominal GDP is higher than that of real GDP because of inflation.",
        },
      ],
      formulas: [
        { name: "Growth rate", expr: "Growth rate = (Real GDP₂ − Real GDP₁) ÷ Real GDP₁ × 100%" },
        { name: "CAGR", expr: "Growth rate = 100 × [(X_final ÷ X_initial)^(1/N) − 1], N = number of years" },
      ],
      worked: [
        {
          problem:
            "Problem Set 1 Q6: an economy produces only chocolate bars: 3 bars at $4 (Year 1), 4 at $5 (Year 2), 5 at $6 (Year 3). Year 1 is the base year.",
          solution:
            "Nominal GDP: $12, $20, $30\nReal GDP (Year 1 prices): $12, $16, $20\nDeflator: 100, 125, 150\nReal GDP growth Year 2→3 = (20 − 16) ÷ 16 × 100 = 25% (= % change in quantity of bars)\nInflation Year 2→3 = (150 − 125) ÷ 125 × 100 = 20% (= % change in the price of bars)",
        },
        {
          problem: "Problem Set 1 Q7: U.S. nominal GDP was $12,217b in 2004 and $29,179b in 2024; the deflator (base 2017) was 79.1 and 125.2. N = 20.",
          solution:
            "Nominal GDP growth = 100 × [(29,179 ÷ 12,217)^0.05 − 1] ≈ 4.4% a year (4.45%; the answer guide rounds to 4.5%)\nDeflator growth = 100 × [(125.2 ÷ 79.1)^0.05 − 1] = 2.3%\nReal GDP 2004 = 12,217 ÷ (79.1 ÷ 100) = $15,445b\nReal GDP 2024 = 29,179 ÷ (125.2 ÷ 100) = $23,306b\nReal GDP growth = 100 × [(23,306 ÷ 15,445)^0.05 − 1] = 2.1%\nNominal growth > real growth because of inflation.",
        },
      ],
    },
    {
      title: "GDP, GNP, NNP and other income measures",
      intro: "From Problem Set 1 Q11 (Barry the Barber): stepping down from GDP to disposable personal income.",
      points: [
        { term: "GDP vs GNP", text: "GDP measures production within a country's borders, regardless of who owns the factors of production." },
        { term: "Gross national product (GNP)", text: "Measures production by a country's residents, regardless of where the production occurs." },
        { term: "Depreciation", text: "The value of capital (equipment, structures) used up in production, also called capital consumption." },
        {
          term: "Net national product (NNP)",
          text: "The value of final goods and services produced by a country's residents after accounting for depreciation (capital consumption).",
        },
        {
          term: "National income",
          text: "The sum of all income earned by the factors of production (wages to labour, rent to land, interest to capital and profit to entrepreneurship) in producing the economy's output.",
        },
        {
          term: "Personal income",
          text: "The income actually received by households and individuals, as opposed to income earned by factors of production in the process of production.",
        },
        { term: "Disposable personal income (DPI)", text: "The income households actually get to keep and use, after all personal taxes are paid." },
      ],
      formulas: [
        { name: "NNP", expr: "NNP = GNP − Depreciation" },
        { name: "GDP by income", expr: "GDP = Factor incomes (national income) + Depreciation + Indirect business taxes (net of subsidies)" },
        { name: "National income", expr: "National income = NNP − Indirect business (sales) taxes" },
        {
          name: "Personal income",
          expr: "Personal income = National income − Retained earnings − Corporate income tax − Social insurance contributions + Transfer payments",
        },
        { name: "Disposable personal income", expr: "DPI = Personal income − Personal income taxes" },
      ],
      table: [
        ["Step", "Measure", "What's removed", "Barry's amount"],
        ["—", "GDP", "—", "$400"],
        ["− Depreciation", "NNP", "Value used up in production", "$350"],
        ["− Indirect (sales) taxes", "National income", "Value not paid to factors of production", "$320"],
        ["− Retained earnings", "Personal income", "Income earned but not received", "$220"],
        ["− Personal income tax", "Disposable personal income", "Taxes owed by the individual", "$150"],
      ],
      worked: [
        {
          problem:
            "Barry collects $400 for haircuts. Equipment depreciates by $50. Of the remaining $350 he pays $30 sales tax, takes home $220 in wages and retains $100 for new equipment. He pays $70 income tax on his $220. Find his contribution to each measure. (Problem Set 1 Q11)",
          solution:
            "GDP = $400 (amount collected)\nNo foreign earnings or foreign-owned factors, so GNP = GDP\nNNP = $400 − $50 = $350\nNational income = $350 − $30 = $320\nPersonal income = $320 − $100 retained = $220\nDisposable personal income = $220 − $70 = $150",
        },
      ],
    },
    {
      title: "GDP and economic well-being",
      points: [
        { term: "Real GDP per capita", text: "The main indicator of the average person's standard of living. But GDP is not a perfect measure of well-being." },
        {
          term: "What GDP does not measure",
          text: "The quality of the environment; leisure time; non-market activity (child-care a parent provides at home, volunteer work); an equitable distribution of income.",
        },
        {
          term: "Why we still care about GDP",
          text: "A large GDP enables a country to afford better schools, a cleaner environment, health care, etc. Many indicators of the quality of life are positively correlated with GDP. GDP is a good measure of economic well-being for most, but not all, purposes.",
        },
        {
          term: "Cross-country evidence",
          text: "The lecture's charts of 12 countries show that countries with higher real gross national income (GNI) per person tend to have higher life expectancy, more average years of schooling and a smaller percentage of the population living in extreme poverty.",
        },
        {
          term: "Home production and comparisons",
          text: "Food produced and consumed at home is not in GDP. In countries like India people produce and consume more at home than in the United States, so GDP per person differs by more than the two countries' economic well-being (Problem Set 1 Q9).",
        },
        {
          term: "Women in the labour force",
          text: "The rise in women's labour-force participation increased GDP (more people working, more production). A measure that also counted time working in the home and leisure would rise by less than GDP, because that home time and leisure fell (Problem Set 1 Q10). Other aspects (self-esteem, financial freedom, work stress, time with family) would be quite difficult to measure.",
        },
      ],
    },
  ],

  // ------------------------------------------------------------------ flashcards
  flashcards: [
    { id: "gdp-c1", type: "concept", front: "The study of economy-wide phenomena, including economic growth, inflation and unemployment.", back: "Macroeconomics", why: "Contrast with microeconomics, which studies how households and firms make decisions and interact in markets." },
    { id: "gdp-c2", type: "concept", front: "The study of how households and firms make decisions and interact in markets.", back: "Microeconomics", why: "Macroeconomics instead looks at the economy as a whole." },
    { id: "gdp-c3", type: "concept", front: "The national accounting framework developed by the United Nations after WWII.", back: "System of National Accounts / SNA", why: "It records production, incomes, household spending, investment, government consumption, exports and imports, and national savings." },
    { id: "gdp-c4", type: "concept", front: "The market value of all final goods and services produced within a country in a given period.", back: "Gross domestic product / GDP", why: "It measures total output, total income and total expenditure at the same time." },
    { id: "gdp-c5", type: "concept", front: "A simple depiction of the macroeconomy that illustrates GDP as spending, revenue, factor payments and income.", back: "Circular-flow diagram", why: "Households and firms trade in the markets for goods and services and the markets for factors of production." },
    { id: "gdp-c6", type: "concept", front: "Goods intended for the end user; the only goods counted directly in GDP.", back: "Final goods", why: "They already embody the value of the intermediate goods used to make them." },
    { id: "gdp-c7", type: "concept", front: "Goods used as components or ingredients in the production of other goods.", back: "Intermediate goods", why: "Flour sold to a baker is one; counting it as well as the bread would double-count." },
    { id: "gdp-c8", type: "concept", front: "Spending by households on goods and services, excluding purchases of new housing.", back: "Consumption / C", why: "It includes renters' rent and homeowners' imputed rent." },
    { id: "gdp-c9", type: "concept", front: "Spending on goods that will be used in the future to produce more goods.", back: "Investment / I", why: "It covers business capital, residential capital and inventory accumulations, not stocks and bonds." },
    { id: "gdp-c10", type: "concept", front: "Goods produced but not yet sold, counted as part of investment.", back: "Inventory accumulations / Inventory", why: "When they are later sold to a household, C rises and I falls, leaving GDP unchanged." },
    { id: "gdp-c11", type: "concept", front: "Business structures, equipment and intellectual property products.", back: "Business capital", why: "One of the three parts of investment, e.g. a firm expanding its factory." },
    { id: "gdp-c12", type: "concept", front: "A landlord's apartment building or a homeowner's personal residence, counted in investment.", back: "Residential capital", why: "This is why a newly built house is investment, not consumption." },
    { id: "gdp-c13", type: "concept", front: "Spending on the goods and services purchased by the government.", back: "Government purchases / G", why: "Repaving a highway counts; Social Security cheques do not." },
    { id: "gdp-c14", type: "concept", front: "Government payments such as Social Security or unemployment insurance benefits that are not purchases of goods or services.", back: "Transfer payments", why: "Nothing is produced in exchange, so they are excluded from G and from GDP." },
    { id: "gdp-c15", type: "concept", front: "Exports minus imports.", back: "Net exports / NX", why: "The fourth component in Y = C + I + G + NX; it was negative for the U.S. in 2024." },
    { id: "gdp-c16", type: "concept", front: "Foreign spending on the economy's goods and services.", back: "Exports", why: "They add to NX and hence to GDP." },
    { id: "gdp-c17", type: "concept", front: "The portions of C, I and G that are spent on goods and services produced abroad.", back: "Imports", why: "They are subtracted in NX so that GDP only counts domestic production." },
    { id: "gdp-c18", type: "concept", front: "The production of goods and services valued at current prices; not corrected for inflation.", back: "Nominal GDP", why: "Its change reflects changes in both prices and quantities." },
    { id: "gdp-c19", type: "concept", front: "The production of goods and services valued at constant (base-year) prices; corrected for inflation.", back: "Real GDP", why: "Its change reflects only changes in quantities." },
    { id: "gdp-c20", type: "concept", front: "The year whose prices are used to value output for real GDP, in which nominal GDP equals real GDP.", back: "Base year", why: "The GDP deflator (and the CPI) equals 100 in this year." },
    { id: "gdp-c21", type: "concept", front: "100 × nominal GDP ÷ real GDP; measures the current level of prices relative to the base year.", back: "GDP deflator", why: "A measure of the price level; its percentage change gives the inflation rate." },
    { id: "gdp-c22", type: "concept", front: "The percentage increase in the GDP deflator from one year to the next.", back: "Inflation rate", why: "E.g. deflator 125 → 150 gives (150 − 125) ÷ 125 = 20%." },
    { id: "gdp-c23", type: "concept", front: "The main indicator of the average person's standard of living.", back: "Real GDP per capita / Real GDP per person", why: "It is useful but imperfect: it leaves out leisure, the environment, non-market activity and income distribution." },
    { id: "gdp-c24", type: "concept", front: "The value of a producer's output minus the value of the intermediate goods that the producer buys to make it.", back: "Value added", why: "Summing it over all producers gives GDP." },
    { id: "gdp-c25", type: "concept", front: "Measures production by a country's residents, regardless of where the production occurs.", back: "Gross national product / GNP", why: "GDP instead measures production within the borders, regardless of who owns the factors." },
    { id: "gdp-c26", type: "concept", front: "The value of final goods and services produced by a country's residents after accounting for depreciation.", back: "Net national product / NNP", why: "NNP = GNP − depreciation." },
    { id: "gdp-c27", type: "concept", front: "The value of capital used up in production (capital consumption).", back: "Depreciation", why: "Subtracted from GNP to get NNP." },
    { id: "gdp-c28", type: "concept", front: "The sum of all income earned by the factors of production: wages, rent, interest and profit.", back: "National income", why: "National income = NNP − indirect business (sales) taxes." },
    { id: "gdp-c29", type: "concept", front: "The income actually received by households and individuals, as opposed to income earned by factors of production.", back: "Personal income", why: "It removes retained earnings, corporate income tax and social insurance contributions, and adds transfer payments." },
    { id: "gdp-c30", type: "concept", front: "The income households actually get to keep and use after all personal taxes are paid.", back: "Disposable personal income / DPI", why: "DPI = personal income − personal income taxes." },
    { id: "gdp-c31", type: "concept", front: "A growth rate that assumes the variable grew at a constant compounded rate each year.", back: "Compound annual growth rate / CAGR", why: "Growth rate = 100 × [(X_final ÷ X_initial)^(1/N) − 1]." },
    {
      id: "gdp-s1", type: "scenario",
      front: "A Singapore-owned firm runs a factory in Malaysia. Is the factory's output counted in Singapore's GDP or Singapore's GNP?",
      back: "Singapore's GNP (it is in Malaysia's GDP)",
      why: "GDP counts production within a country's borders whoever does it, so the output is in Malaysia's GDP. GNP counts production by a country's residents wherever it occurs, so it is in Singapore's GNP.",
    },
    {
      id: "gdp-s2", type: "scenario",
      front: "A Japanese citizen works in a Singapore restaurant for a year. Is her output part of Singapore's GDP?",
      back: "Yes",
      why: "GDP measures production within a country's borders, whether done by its own citizens or by foreigners located there.",
    },
    {
      id: "gdp-s3", type: "scenario",
      front: "A household buys newly issued shares in a company. Which GDP component rises?",
      back: "None: not included in GDP",
      why: "In GDP, investment means spending on goods used to produce more goods (capital, housing, inventories). Buying stocks or bonds is a purchase of financial assets, not investment.",
    },
    {
      id: "gdp-s4", type: "scenario",
      front: "You buy a five-year-old car from your neighbour. How does this affect this year's GDP?",
      back: "No effect",
      why: "GDP counts currently produced goods only. The car was counted when it was produced; counting the resale would double-count it.",
    },
    {
      id: "gdp-s5", type: "scenario",
      front: "A phone maker produces 1,000 phones this year but sells none of them until next year. How is this year's production counted?",
      back: "As investment (inventory accumulation)",
      why: "Goods produced but not yet sold are inventory accumulations, part of I. Next year, when households buy them, C rises and I falls, so next year's GDP is unchanged by the sale.",
    },
    {
      id: "gdp-s6", type: "scenario",
      front: "A car dealer sells a car from last year's inventory to a family. What happens to C, I and GDP?",
      back: "C rises, I falls, GDP unchanged",
      why: "The family's purchase is consumption. The car leaves inventory, so inventory investment falls by the same amount. No new production happened this year (Problem Set 1 Q1, Ford Mustang).",
    },
    {
      id: "gdp-s7", type: "scenario",
      front: "The government increases unemployment insurance benefits by $1 billion. What happens to G?",
      back: "G is unchanged",
      why: "Unemployment benefits are transfer payments. They are not purchases of goods and services, so nothing is produced and they are excluded from G.",
    },
    {
      id: "gdp-s8", type: "scenario",
      front: "A Singapore household buys a $100 bottle of French wine. What happens to C, NX and Singapore's GDP?",
      back: "C +$100, NX −$100, GDP unchanged",
      why: "Imports are the parts of C, I and G spent on foreign goods. The purchase is counted in C and subtracted in NX, so it adds nothing to domestic production.",
    },
    {
      id: "gdp-s9", type: "scenario",
      front: "From one year to the next every price doubles but every quantity stays the same. What happens to nominal GDP, real GDP and the GDP deflator?",
      back: "Nominal GDP doubles, real GDP unchanged, deflator doubles",
      why: "Nominal GDP uses current prices, so it rises with prices. Real GDP uses base-year prices, so it only changes with quantities. Deflator = nominal ÷ real × 100 doubles (like 2028 in Problem Set 1 Q5).",
    },
    {
      id: "gdp-s10", type: "scenario",
      front: "Nominal GDP is $600 billion and real GDP is $500 billion. What is the GDP deflator?",
      back: "120",
      why: "GDP deflator = nominal ÷ real × 100 = 600 ÷ 500 × 100 = 120: prices are 20% above the base year.",
    },
    {
      id: "gdp-s11", type: "scenario",
      front: "A tree farmer sells timber to a furniture maker for $300, who sells a table to a household for $500. What is GDP and the furniture maker's value added?",
      back: "GDP $500; value added $200",
      why: "GDP counts only the final good (the table, $500). Value added = output − intermediate goods = $500 − $300 = $200; farmer's $300 + maker's $200 = $500 = GDP.",
    },
    {
      id: "gdp-s12", type: "scenario",
      front: "A parent stops paying a childcare centre and looks after the child at home instead. What happens to measured GDP, and does well-being fall by as much?",
      back: "GDP falls; well-being falls by less (or not at all)",
      why: "Paid childcare is a market service in GDP. Child-care a parent provides at home is non-market activity, which GDP does not measure, so GDP understates the value still being produced.",
    },
    {
      id: "gdp-s13", type: "scenario",
      front: "A café earns $1,000 in a day; its equipment depreciates by $80 and it pays $50 in sales tax. Assuming GDP = GNP, what are NNP and national income?",
      back: "NNP $920; national income $870",
      why: "NNP = GNP − depreciation = $1,000 − $80 = $920. National income = NNP − indirect (sales) taxes = $920 − $50 = $870.",
    },
    {
      id: "gdp-s14", type: "scenario",
      front: "A carmaker buys $5,000 of steel and uses it to build a car sold to a household for $20,000. How much does this add to GDP?",
      back: "$20,000",
      why: "The steel is an intermediate good; its value is embodied in the final car. Only the final good's market value ($20,000) is counted.",
    },
  ],

  // ------------------------------------------------------------------ quiz
  quiz: [
    { id: "gdp-q1", kind: "fill", sub: "Macro basics", prompt: "____ is the study of economy-wide phenomena, including economic growth, inflation and unemployment.", answers: [["Macroeconomics", "Macro"]], explain: "Microeconomics studies households and firms; macroeconomics studies the whole economy." },
    { id: "gdp-q2", kind: "fill", sub: "Macro basics", prompt: "The national accounting framework developed by the United Nations after WWII is the System of ____ (SNA).", answers: [["National Accounts"]], explain: "SNA = System of National Accounts." },
    { id: "gdp-q3", kind: "fill", sub: "GDP & circular flow", prompt: "For the economy as a whole, income equals expenditure because every dollar a buyer spends is a dollar of ____ for the seller.", answers: [["income"]], explain: "This is why GDP measures both total income and total expenditure." },
    { id: "gdp-q4", kind: "fill", sub: "GDP & circular flow", prompt: "In the circular-flow diagram, households own the ____ and sell or rent them to firms for income.", answers: [["factors of production", "factors", "labour land and capital"]], explain: "Labour, land and capital are sold or rented in the markets for factors of production." },
    { id: "gdp-q5", kind: "fill", sub: "GDP & circular flow", prompt: "In the circular-flow diagram, firms pay wages, rent and ____ to households in return for factors of production.", answers: [["profit", "profits"]], explain: "Wages, rent and profit (= GDP) become households' income (= GDP)." },
    { id: "gdp-q6", kind: "fill", sub: "GDP & circular flow", prompt: "The simple circular-flow diagram omits the government, the financial system and the ____ sector.", answers: [["foreign"]], explain: "The foreign sector trades goods, services, financial assets and currencies with residents." },
    { id: "gdp-q7", kind: "fill", sub: "GDP definition", prompt: "GDP is the ____ value of all final goods and services produced within a country in a given period.", answers: [["market"]], explain: "Goods are valued at market prices so everything is in the same units." },
    { id: "gdp-q8", kind: "fill", sub: "GDP definition", prompt: "Things that don't have a market value, such as ____ you do for yourself, are excluded from GDP.", answers: [["housework", "house work", "household chores", "chores"]], explain: "No market price, so no market value to count." },
    { id: "gdp-q9", kind: "fill", sub: "GDP definition", prompt: "GDP excludes most items produced and sold ____, and most items produced and consumed at home.", answers: [["illicitly", "illegally"]], explain: "GDP includes items produced and sold legally in markets." },
    { id: "gdp-q10", kind: "fill", sub: "GDP definition", prompt: "____ goods are used as components or ingredients in the production of other goods.", answers: [["Intermediate"]], explain: "Final goods are intended for the end user." },
    { id: "gdp-q11", kind: "fill", sub: "GDP definition", prompt: "GDP only includes final goods because they already ____ the value of the intermediate goods used in their production.", answers: [["embody", "include", "contain"]], explain: "Counting intermediate goods too would double-count them." },
    { id: "gdp-q12", kind: "fill", sub: "GDP definition", prompt: "GDP includes currently produced goods, not goods produced in the ____.", answers: [["past"]], explain: "Used goods were counted in the year they were produced." },
    { id: "gdp-q13", kind: "fill", sub: "GDP definition", prompt: "GDP measures production within a country's ____, whether done by its own citizens or by foreigners located there.", answers: [["borders", "border"]], explain: "That is the 'domestic' in gross domestic product." },
    { id: "gdp-q14", kind: "fill", sub: "GDP definition", prompt: "GDP is measured over a specific interval of time, usually a year or a ____ (3 months).", answers: [["quarter"]], explain: "'In a given period' in the definition." },
    { id: "gdp-q15", kind: "fill", sub: "GDP definition", prompt: "Including resold used goods in GDP would ____ goods that were sold more than once, overstating production.", answers: [["double-count", "double count", "count twice"]], explain: "Problem Set 1 Q4: double-counting makes GDP less informative about well-being." },
    { id: "gdp-q16", kind: "fill", sub: "Value added", prompt: "____ is the value of a producer's output minus the value of the intermediate goods the producer buys to make it.", answers: [["Value added"]], explain: "Summing it over all producers gives GDP." },
    { id: "gdp-q17", kind: "fill", sub: "Value added", prompt: "A farmer sells wheat to a miller for $100, the miller sells flour to a baker for $150, and the baker sells bread to consumers for $180. The miller's value added is $____.", answers: [["50"]], explain: "$150 − $100 = $50." },
    { id: "gdp-q18", kind: "fill", sub: "Value added", prompt: "In the same wheat–flour–bread chain, GDP is $____.", answers: [["180"]], explain: "Market value of the final good = sum of value added = 100 + 50 + 30 = $180." },
    { id: "gdp-q19", kind: "fill", sub: "Components of GDP", prompt: "The expenditure identity is Y = C + I + G + ____.", answers: [["NX", "net exports"]], explain: "Consumption, investment, government purchases and net exports add up to GDP." },
    { id: "gdp-q20", kind: "fill", sub: "Components of GDP", prompt: "Consumption is spending by households on goods and services, excluding purchases of new ____.", answers: [["housing", "houses", "homes"]], explain: "New housing is residential investment." },
    { id: "gdp-q21", kind: "fill", sub: "Components of GDP", prompt: "For homeowners, consumption includes the ____ rental value of the house, but not the purchase price or mortgage payments.", answers: [["imputed"]], explain: "For renters, C includes their rent payments." },
    { id: "gdp-q22", kind: "fill", sub: "Components of GDP", prompt: "Investment consists of business capital, residential capital and ____ accumulations.", answers: [["inventory", "inventories"]], explain: "Inventory = goods produced but not yet sold." },
    { id: "gdp-q23", kind: "fill", sub: "Components of GDP", prompt: "Business capital consists of business structures, equipment and ____ property products.", answers: [["intellectual"]], explain: "These are all goods used to produce more goods in future." },
    { id: "gdp-q24", kind: "fill", sub: "Components of GDP", prompt: "In GDP accounting, investment does not mean the purchase of ____ assets like stocks and bonds.", answers: [["financial"]], explain: "Buying shares is not spending on newly produced goods." },
    { id: "gdp-q25", kind: "fill", sub: "Components of GDP", prompt: "Government purchases exclude ____ payments such as Social Security or unemployment insurance benefits.", answers: [["transfer"]], explain: "They are not purchases of goods and services." },
    { id: "gdp-q26", kind: "fill", sub: "Components of GDP", prompt: "Imports are the portions of C, I and G that are spent on goods and services produced ____.", answers: [["abroad", "overseas", "in other countries", "in foreign countries"]], explain: "They are subtracted in NX = exports − imports." },
    { id: "gdp-q27", kind: "fill", sub: "Components of GDP", prompt: "C = $600b, I = $200b, G = $250b, exports = $150b and imports = $180b. GDP = $____b.", answers: [["1020", "1,020"]], explain: "Y = 600 + 200 + 250 + (150 − 180) = $1,020b." },
    { id: "gdp-q28", kind: "fill", sub: "Components of GDP", prompt: "In U.S. GDP for 2024, the largest component, about 68% of GDP, was ____.", answers: [["consumption", "C"]], explain: "C 68%, I 18%, G 17%, NX −3%." },
    { id: "gdp-q29", kind: "fill", sub: "Components of GDP", prompt: "A state government hiring workers to repave a highway is counted in ____.", answers: [["government purchases", "G", "government spending"]], explain: "It buys a service (road repair) that is produced." },
    { id: "gdp-q30", kind: "fill", sub: "Components of GDP", prompt: "When Ford sells a car from its inventory to a family, C rises and ____ falls, so GDP is unchanged.", answers: [["investment", "I", "inventory investment"]], explain: "The car was counted as inventory investment when it was produced." },
    { id: "gdp-q31", kind: "fill", sub: "Nominal vs real GDP", prompt: "____ GDP values production at current prices and is not corrected for inflation.", answers: [["Nominal"]], explain: "Real GDP uses constant base-year prices." },
    { id: "gdp-q32", kind: "fill", sub: "Nominal vs real GDP", prompt: "Real GDP values production at the constant prices of the ____ year.", answers: [["base"]], explain: "This removes the effect of price changes." },
    { id: "gdp-q33", kind: "fill", sub: "Nominal vs real GDP", prompt: "In the base year, nominal GDP ____ real GDP.", answers: [["equals", "equal", "is equal to", "is the same as", "="]], explain: "Current prices and base-year prices are the same in that year." },
    { id: "gdp-q34", kind: "fill", sub: "Nominal vs real GDP", prompt: "In 2026 an economy produces 400 pizzas at $16 and 1,200 chocolates at $3. Nominal GDP = $____.", answers: [["10000", "10,000"]], explain: "$16 × 400 + $3 × 1,200 = $6,400 + $3,600 = $10,000." },
    { id: "gdp-q35", kind: "fill", sub: "Nominal vs real GDP", prompt: "Using 2025 prices (pizza $15, chocolate $2.50), real GDP for 400 pizzas and 1,200 chocolates = $____.", answers: [["9000", "9,000"]], explain: "$15 × 400 + $2.50 × 1,200 = $6,000 + $3,000 = $9,000." },
    { id: "gdp-q36", kind: "fill", sub: "Nominal vs real GDP", prompt: "The change in real GDP reflects only changes in ____, because prices are held constant.", answers: [["quantities", "quantity", "output", "quantities produced", "quantity produced"]], explain: "Nominal GDP changes reflect both prices and quantities." },
    { id: "gdp-q37", kind: "fill", sub: "GDP deflator", prompt: "GDP deflator = 100 × nominal GDP ÷ ____.", answers: [["real GDP", "real"]], explain: "It measures current prices relative to base-year prices." },
    { id: "gdp-q38", kind: "fill", sub: "GDP deflator", prompt: "In the base year, the GDP deflator always equals ____.", answers: [["100"]], explain: "Nominal = real, so 100 × 1 = 100." },
    { id: "gdp-q39", kind: "fill", sub: "GDP deflator", prompt: "Nominal GDP is $13,050 and real GDP is $10,750. The GDP deflator is ____ (1 d.p.).", answers: [["121.4"]], explain: "100 × 13,050 ÷ 10,750 = 121.4." },
    { id: "gdp-q40", kind: "fill", sub: "GDP deflator", prompt: "The GDP deflator rises from 111.1 to 121.4. The inflation rate is ____% (1 d.p.).", answers: [["9.3", "9.3%"]], explain: "(121.4 − 111.1) ÷ 111.1 × 100 = 9.3%." },
    { id: "gdp-q41", kind: "fill", sub: "GDP deflator", prompt: "Real GDP is $5,000 and the GDP deflator is 60. Nominal GDP is $____.", answers: [["3000", "3,000"]], explain: "Nominal = deflator × real ÷ 100 = 60 × 5,000 ÷ 100 = $3,000." },
    { id: "gdp-q42", kind: "fill", sub: "GDP deflator", prompt: "Nominal GDP is $15,000 and the GDP deflator is 200. Real GDP is $____.", answers: [["7500", "7,500"]], explain: "Real = nominal ÷ deflator × 100 = 15,000 ÷ 200 × 100 = $7,500." },
    { id: "gdp-q43", kind: "fill", sub: "Growth rates", prompt: "Real GDP rises from $16 to $20. The growth rate of real GDP is ____%.", answers: [["25", "25%"]], explain: "(20 − 16) ÷ 16 × 100 = 25%." },
    { id: "gdp-q44", kind: "fill", sub: "Growth rates", prompt: "In the CAGR formula 100 × [(X_final ÷ X_initial)^(1/N) − 1], N is the number of ____.", answers: [["years", "periods"]], explain: "CAGR assumes a constant compounded growth rate each year." },
    { id: "gdp-q45", kind: "fill", sub: "Growth rates", prompt: "The GDP deflator rose from 79.1 to 125.2 over 20 years. Its compound annual growth rate is ____% (1 d.p.).", answers: [["2.3", "2.3%"]], explain: "100 × [(125.2 ÷ 79.1)^(1/20) − 1] = 2.3%." },
    { id: "gdp-q46", kind: "fill", sub: "Growth rates", prompt: "Nominal GDP grows faster than real GDP because of ____.", answers: [["inflation", "rising prices", "price increases"]], explain: "Nominal growth includes price increases; real growth does not." },
    { id: "gdp-q47", kind: "fill", sub: "Income measures", prompt: "____ measures production by a country's residents, regardless of where the production occurs.", answers: [["GNP", "Gross national product"]], explain: "GDP measures production within the borders, regardless of who owns the factors." },
    { id: "gdp-q48", kind: "fill", sub: "Income measures", prompt: "Net national product = GNP − ____.", answers: [["depreciation", "capital consumption"]], explain: "NNP accounts for capital used up in production." },
    { id: "gdp-q49", kind: "fill", sub: "Income measures", prompt: "National income = NNP − indirect business (____) taxes.", answers: [["sales"]], explain: "Barry: $350 − $30 sales tax = $320." },
    { id: "gdp-q50", kind: "fill", sub: "Income measures", prompt: "Personal income = national income − retained earnings − corporate income tax − social insurance contributions + ____ payments.", answers: [["transfer"]], explain: "Personal income is income actually received by households." },
    { id: "gdp-q51", kind: "fill", sub: "Income measures", prompt: "Barry's personal income is $220 and he pays $70 in income tax. His disposable personal income is $____.", answers: [["150"]], explain: "DPI = personal income − personal income taxes = $220 − $70 = $150." },
    { id: "gdp-q52", kind: "fill", sub: "GDP and well-being", prompt: "Real GDP per ____ is the main indicator of the average person's standard of living.", answers: [["capita", "person", "head"]], explain: "But it is not a perfect measure of well-being." },
    { id: "gdp-q53", kind: "fill", sub: "GDP and well-being", prompt: "GDP does not measure the quality of the environment, ____ time, non-market activity, or an equitable distribution of income.", answers: [["leisure"]], explain: "These matter for well-being but are not in GDP." },
    { id: "gdp-q54", kind: "fill", sub: "GDP and well-being", prompt: "Child-care a parent provides at home and volunteer work are examples of ____ activity that GDP leaves out.", answers: [["non-market", "nonmarket", "non market"]], explain: "They are not sold in markets, so they have no market value." },
    {
      id: "gdp-q55", kind: "mcq", sub: "Components of GDP",
      prompt: "Which of these transactions is NOT included in this year's GDP?",
      options: ["Paying a hairdresser for a haircut", "Hiring a contractor to build a new house", "Buying an old Victorian house from another family", "A state government repaving a highway"],
      answer: 2,
      explain: "The old house was produced in the past; GDP only counts currently produced goods.",
    },
    {
      id: "gdp-q56", kind: "mcq", sub: "Components of GDP",
      prompt: "Ford manufactures a Focus and sells it to Avis, the car-rental company. This is counted as:",
      options: ["Consumption", "Investment", "Government purchases", "Not included in GDP"],
      answer: 1,
      explain: "Avis is a business buying equipment (a car) to produce rental services in future: business capital.",
    },
    {
      id: "gdp-q57", kind: "mcq", sub: "Components of GDP",
      prompt: "Your parents buy a bottle of French wine. What happens in U.S. GDP accounting?",
      options: ["C rises and GDP rises", "NX rises and GDP rises", "C rises, NX falls, GDP unchanged", "Nothing is recorded"],
      answer: 2,
      explain: "The wine is counted in C and, as an import, subtracted in NX.",
    },
    {
      id: "gdp-q58", kind: "mcq", sub: "Components of GDP",
      prompt: "Which of the following is part of investment (I) in GDP?",
      options: ["A household buying shares in a company", "Goods produced this year but not yet sold", "Unemployment insurance benefits", "A household buying a second-hand car"],
      answer: 1,
      explain: "Inventory accumulations are part of investment.",
    },
    {
      id: "gdp-q59", kind: "mcq", sub: "GDP & circular flow",
      prompt: "Which of these is NOT omitted from the simple circular-flow diagram?",
      options: ["The government", "The financial system", "The foreign sector", "The markets for factors of production"],
      answer: 3,
      explain: "The simple diagram has households, firms and the two markets; it omits government, finance and the foreign sector.",
    },
    {
      id: "gdp-q60", kind: "mcq", sub: "Nominal vs real GDP",
      prompt: "From 2027 to 2028, all prices double and all quantities stay the same. Which grows by 0%?",
      options: ["Nominal GDP", "Real GDP", "The GDP deflator", "None of them"],
      answer: 1,
      explain: "Real GDP only changes with quantities; nominal GDP and the deflator both double (Problem Set 1 Q5).",
    },
    {
      id: "gdp-q61", kind: "mcq", sub: "Growth rates",
      prompt: "An economy produces only chocolate bars. Quantity rises from 4 to 5 and the price from $5 to $6. The growth rate of real GDP equals:",
      options: ["The % change in the price of bars (20%)", "The % change in the quantity of bars (25%)", "The % change in nominal GDP (50%)", "Zero"],
      answer: 1,
      explain: "Real GDP holds prices constant, so it grows at the % change in quantity: (5 − 4) ÷ 4 = 25%.",
    },
    {
      id: "gdp-q62", kind: "mcq", sub: "Income measures",
      prompt: "Barry collects $400 for haircuts and his equipment depreciates by $50. With no foreign activity, his contribution to NNP is:",
      options: ["$400", "$350", "$320", "$220"],
      answer: 1,
      explain: "GDP = GNP = $400; NNP = $400 − $50 depreciation = $350.",
    },
    {
      id: "gdp-q63", kind: "mcq", sub: "GDP and well-being",
      prompt: "Women's labour-force participation rose sharply. Compared with GDP, a well-being measure that counts home work and leisure would:",
      options: ["Rise by more than GDP", "Rise by less than GDP", "Rise by exactly as much as GDP", "Fall while GDP falls"],
      answer: 1,
      explain: "GDP rose as more people worked, but time working at home and leisure fell (Problem Set 1 Q10).",
    },
    {
      id: "gdp-q64", kind: "mcq", sub: "GDP and well-being",
      prompt: "Why might GDP per person overstate the gap in well-being between the United States and India?",
      options: [
        "India's GDP counts imports twice",
        "More food is produced and consumed at home in India, which GDP excludes",
        "U.S. GDP includes transfer payments",
        "India uses a different base year",
      ],
      answer: 1,
      explain: "Non-market home production is left out of GDP, and it is a bigger share of activity in India (Problem Set 1 Q9).",
    },
  ],

  // ------------------------------------------------------------------ exam
  exam: [
    // ---------- calc
    {
      id: "gdp-e1", section: "calc", sub: "GDP deflator", source: "Problem Set 1 Q2",
      prompt: "In 1980, an economy's nominal GDP was $1,200 and its real GDP (in base-year dollars) was $3,000. Calculate the GDP deflator for 1980.",
      marks: 3,
      rubric: [
        { point: "States the formula: GDP deflator = nominal GDP ÷ real GDP × 100", marks: 1 },
        { point: "Correct working: 1,200 ÷ 3,000 × 100", marks: 1 },
        { point: "Correct answer: 40", marks: 1 },
      ],
      model: "GDP deflator = Nominal GDP ÷ Real GDP × 100\n= 1,200 ÷ 3,000 × 100\n= 40",
      answer: "40",
    },
    {
      id: "gdp-e2", section: "calc", sub: "GDP deflator", source: "Problem Set 1 Q2",
      prompt: "In 1990, real GDP was $5,000 (in base-year dollars) and the GDP deflator was 60. Calculate nominal GDP in 1990.",
      marks: 3,
      rubric: [
        { point: "States the formula: nominal GDP = GDP deflator × real GDP ÷ 100", marks: 1 },
        { point: "Correct working: 60 × 5,000 ÷ 100", marks: 1 },
        { point: "Correct answer: $3,000", marks: 1 },
      ],
      model: "GDP deflator = Nominal GDP ÷ Real GDP × 100, so Nominal GDP = GDP deflator × Real GDP ÷ 100\n= 60 × 5,000 ÷ 100\n= $3,000",
      answer: "$3,000",
    },
    {
      id: "gdp-e3", section: "calc", sub: "GDP deflator", source: "Problem Set 1 Q2",
      prompt: "In 2020, nominal GDP was $15,000 and the GDP deflator (base year 2010) was 200. Calculate real GDP in 2010 dollars.",
      marks: 3,
      rubric: [
        { point: "States the formula: real GDP = nominal GDP ÷ GDP deflator × 100", marks: 1 },
        { point: "Correct working: 15,000 ÷ 200 × 100", marks: 1 },
        { point: "Correct answer: $7,500", marks: 1 },
      ],
      model: "Real GDP = Nominal GDP ÷ GDP deflator × 100\n= 15,000 ÷ 200 × 100\n= $7,500 (in 2010 dollars)",
      answer: "$7,500",
    },
    {
      id: "gdp-e4", section: "calc", sub: "Nominal vs real GDP", source: "Lecture 1 Example 1B",
      prompt: "An economy produces pizza and chocolate. In 2027 it produces 500 pizzas at $17 each and 1,300 chocolates at $3.50 each. In the base year 2025, a pizza cost $15 and a chocolate $2.50. Calculate real GDP in 2027.",
      marks: 3,
      rubric: [
        { point: "States the formula: real GDP = Σ (base-year price × current-year quantity)", marks: 1 },
        { point: "Correct working: $15 × 500 + $2.50 × 1,300 = $7,500 + $3,250", marks: 1 },
        { point: "Correct answer: $10,750", marks: 1 },
      ],
      model: "Real GDP = Σ (base-year price × current-year quantity)\n= $15 × 500 + $2.50 × 1,300\n= $7,500 + $3,250\n= $10,750",
      answer: "$10,750",
    },
    {
      id: "gdp-e5", section: "calc", sub: "Growth rates", source: "Problem Set 1 Q6",
      prompt: "An economy produces only chocolate bars. In Year 2 it produces 4 bars at $5 each and in Year 3 it produces 5 bars at $6 each. Year 1 (price $4) is the base year. Calculate the growth rate of real GDP from Year 2 to Year 3.",
      marks: 3,
      rubric: [
        { point: "States the formula: growth rate = (real GDP₃ − real GDP₂) ÷ real GDP₂ × 100", marks: 1 },
        { point: "Correct working: real GDP in Year 1 prices = 4 × $4 = $16 and 5 × $4 = $20; (20 − 16) ÷ 16 × 100", marks: 1 },
        { point: "Correct answer: 25%", marks: 1 },
      ],
      model: "Real GDP (Year 1 prices): Year 2 = 4 × $4 = $16; Year 3 = 5 × $4 = $20\nGrowth rate = (Real GDP₃ − Real GDP₂) ÷ Real GDP₂ × 100\n= (20 − 16) ÷ 16 × 100\n= 25%",
      answer: "25%",
    },
    {
      id: "gdp-e6", section: "calc", sub: "GDP deflator", source: "Problem Set 1 Q6",
      prompt: "In the chocolate-bar economy, the GDP deflator is 125 in Year 2 and 150 in Year 3. Calculate the inflation rate from Year 2 to Year 3.",
      marks: 3,
      rubric: [
        { point: "States the formula: inflation rate = (deflator₃ − deflator₂) ÷ deflator₂ × 100", marks: 1 },
        { point: "Correct working: (150 − 125) ÷ 125 × 100", marks: 1 },
        { point: "Correct answer: 20%", marks: 1 },
      ],
      model: "Inflation rate = (Deflator₃ − Deflator₂) ÷ Deflator₂ × 100\n= (150 − 125) ÷ 125 × 100\n= 20%",
      answer: "20%",
    },
    {
      id: "gdp-e7", section: "calc", sub: "Growth rates", source: "Problem Set 1 Q7",
      prompt: "A country's GDP deflator was 79.1 in 2004 and 125.2 in 2024. Calculate the compound annual growth rate of the GDP deflator over this period (1 d.p.).",
      marks: 3,
      rubric: [
        { point: "States the formula: growth rate = 100 × [(X_final ÷ X_initial)^(1/N) − 1]", marks: 1 },
        { point: "Correct working: N = 20; 100 × [(125.2 ÷ 79.1)^(1/20) − 1] = 100 × [(1.5828)^0.05 − 1]", marks: 1 },
        { point: "Correct answer: 2.3% per year", marks: 1 },
      ],
      model: "CAGR = 100 × [(X_final ÷ X_initial)^(1/N) − 1], N = 2024 − 2004 = 20\n= 100 × [(125.2 ÷ 79.1)^0.05 − 1]\n= 100 × [1.5828^0.05 − 1]\n= 100 × (1.0232 − 1)\n= 2.3% per year",
      answer: "2.3%",
    },
    {
      id: "gdp-e8", section: "calc", sub: "Components of GDP",
      prompt: "In an economy, consumption is $600b, investment is $200b, government purchases are $250b, exports are $150b and imports are $180b. Calculate GDP.",
      marks: 3,
      rubric: [
        { point: "States the formula: Y = C + I + G + NX, with NX = exports − imports", marks: 1 },
        { point: "Correct working: NX = 150 − 180 = −30; Y = 600 + 200 + 250 − 30", marks: 1 },
        { point: "Correct answer: $1,020b", marks: 1 },
      ],
      model: "Y = C + I + G + NX, NX = Exports − Imports\nNX = 150 − 180 = −$30b\nY = 600 + 200 + 250 + (−30)\n= $1,020b",
      answer: "$1,020b",
    },
    {
      id: "gdp-e9", section: "calc", sub: "Income measures", source: "Problem Set 1 Q11",
      prompt: "Barry the Barber collects $400 for haircuts in a day. His equipment depreciates by $50 and he pays $30 in sales taxes. There are no foreign earnings or foreign-owned factors. Calculate Barry's contribution to national income.",
      marks: 3,
      rubric: [
        { point: "States the formulas: NNP = GNP − depreciation and national income = NNP − indirect business (sales) taxes", marks: 1 },
        { point: "Correct working: GDP = GNP = $400; NNP = 400 − 50 = $350; 350 − 30", marks: 1 },
        { point: "Correct answer: $320", marks: 1 },
      ],
      model: "No foreign activity, so GNP = GDP = $400\nNNP = GNP − Depreciation = $400 − $50 = $350\nNational income = NNP − Sales taxes = $350 − $30\n= $320",
      answer: "$320",
    },
    {
      id: "gdp-e10", section: "calc", sub: "Income measures",
      prompt: "An economy's national income is $900b. Retained earnings are $60b, corporate income tax is $40b, social insurance contributions are $50b and transfer payments are $70b. Personal income taxes are $120b. Calculate disposable personal income.",
      marks: 3,
      rubric: [
        { point: "States the formulas: PI = NI − retained earnings − corporate income tax − social insurance contributions + transfer payments; DPI = PI − personal income taxes", marks: 1 },
        { point: "Correct working: PI = 900 − 60 − 40 − 50 + 70 = $820b; DPI = 820 − 120", marks: 1 },
        { point: "Correct answer: $700b", marks: 1 },
      ],
      model: "Personal income = NI − Retained earnings − Corporate income tax − Social insurance contributions + Transfer payments\n= 900 − 60 − 40 − 50 + 70 = $820b\nDisposable personal income = PI − Personal income taxes\n= 820 − 120\n= $700b",
      answer: "$700b",
    },

    // ---------- short
    {
      id: "gdp-e11", section: "short", sub: "GDP and well-being", source: "Exam example",
      prompt: "Real GDP per person is often used to compare living standards across countries. Give THREE reasons why it is an imperfect measure of well-being.",
      marks: 3,
      rubric: [
        { point: "First reason, e.g. GDP does not measure leisure time (people working longer hours raises GDP but may lower well-being)", marks: 1 },
        { point: "Second reason, e.g. GDP excludes non-market activity such as child-care a parent provides at home or volunteer work", marks: 1 },
        { point: "Third reason, e.g. GDP does not measure the quality of the environment, or does not show whether income is equitably distributed", marks: 1 },
      ],
      model:
        "First, GDP does not measure leisure time, so a country whose people work longer hours shows a higher GDP even though they may not be better off. Second, GDP excludes non-market activity such as child-care a parent provides at home and volunteer work, so countries where more is produced at home look poorer than they are. Third, GDP does not measure the quality of the environment or whether income is equitably distributed, so pollution or a very unequal distribution are not reflected. GDP is still a good measure of well-being for most, but not all, purposes.",
    },
    {
      id: "gdp-e12", section: "short", sub: "Components of GDP", source: "Problem Set 1 Q3",
      prompt: "The government purchases component of GDP does not include spending on transfer payments such as Social Security. Thinking about the definition of GDP, explain why transfer payments are excluded.",
      marks: 3,
      rubric: [
        { point: "GDP is the market value of final goods and services produced", marks: 1 },
        { point: "Transfer payments (e.g. Social Security, unemployment benefits) are not purchases of goods and services", marks: 1 },
        { point: "Nothing is produced in exchange, so there is no contribution to GDP / counting them would overstate production", marks: 1 },
      ],
      model:
        "GDP measures the market value of all final goods and services produced in a country in a given period, and G counts spending on goods and services purchased by the government. A transfer payment such as a Social Security cheque or unemployment insurance benefit is not a purchase of a good or service. Since nothing is produced in exchange for the payment, it adds nothing to the economy's output, so it is excluded from G and from GDP.",
    },
    {
      id: "gdp-e13", section: "short", sub: "GDP definition", source: "Problem Set 1 Q4",
      prompt: "GDP does not include the value of used goods that are resold. Why would including such transactions make GDP a less informative measure of economic well-being?",
      marks: 3,
      rubric: [
        { point: "GDP counts only currently produced goods; used goods were counted when first produced", marks: 1 },
        { point: "Including resales would double-count goods sold more than once", marks: 1 },
        { point: "This would overstate the value of production, making GDP less informative about well-being", marks: 1 },
      ],
      model:
        "GDP includes only goods produced in the current period; a used good was already counted in GDP in the year it was produced. If resales were included, a good sold more than once would be double-counted. This would overstate the value of production in the economy, so GDP would be a less informative measure of economic well-being.",
    },
    {
      id: "gdp-e14", section: "short", sub: "Value added",
      prompt: "Explain why GDP includes only final goods and not intermediate goods, and describe another way of calculating GDP that gives the same answer.",
      marks: 3,
      rubric: [
        { point: "Final goods are for the end user; intermediate goods are components or ingredients of other goods", marks: 1 },
        { point: "The final good's value already embodies the intermediate goods, so counting both would double-count", marks: 1 },
        { point: "GDP can also be calculated as the sum of value added (output − intermediate goods bought) by all producers", marks: 1 },
      ],
      model:
        "Final goods are intended for the end user, while intermediate goods are used as components or ingredients in producing other goods. The market value of a final good already embodies the value of the intermediate goods used to make it, so counting both would double-count them. Alternatively, GDP can be calculated by summing the value added of every producer, where value added is the value of output minus the intermediate goods bought; e.g. $100 (farmer) + $50 (miller) + $30 (baker) = $180, the value of the bread.",
    },
    {
      id: "gdp-e15", section: "short", sub: "Nominal vs real GDP", source: "Problem Set 1 Q5",
      prompt: "Distinguish between nominal and real GDP, and explain why real GDP is the better measure of changes in economic well-being.",
      marks: 3,
      rubric: [
        { point: "Nominal GDP values output at current prices (not corrected for inflation)", marks: 1 },
        { point: "Real GDP values output at constant base-year prices (corrected for inflation)", marks: 1 },
        { point: "Changes in nominal GDP reflect prices and quantities; real GDP changes reflect only quantities produced, which is what matters for well-being", marks: 1 },
      ],
      model:
        "Nominal GDP is the production of goods and services valued at current prices, so it is not corrected for inflation. Real GDP values production at constant base-year prices, so it is corrected for inflation. A rise in nominal GDP may simply be due to higher prices, whereas a rise in real GDP reflects only an increase in the quantities produced. Since well-being depends on the goods and services actually available, real GDP is the better measure; e.g. if prices double with output unchanged, nominal GDP doubles but well-being has not risen.",
    },
    {
      id: "gdp-e16", section: "short", sub: "GDP and well-being", source: "Problem Set 1 Q9",
      prompt: "Goods and services not sold in markets, such as food produced and consumed at home, are generally not included in GDP. How might this make GDP per person misleading when comparing economic well-being in the United States and India?",
      marks: 3,
      rubric: [
        { point: "GDP excludes non-market home production because it has no market value", marks: 1 },
        { point: "People in India produce and consume relatively more at home than people in the United States", marks: 1 },
        { point: "So India's GDP per person understates its well-being, and the GDP gap is larger than the gap in well-being", marks: 1 },
      ],
      model:
        "GDP only counts goods and services sold in markets, so food produced and consumed at home is left out. In countries like India, people produce and consume more food at home than in the United States. As a result, India's GDP per person understates its true output, and GDP per person in the two countries differs by more than their actual economic well-being.",
    },
    {
      id: "gdp-e17", section: "short", sub: "GDP and well-being", source: "Problem Set 1 Q10",
      prompt: "The participation of women in the labour force has risen dramatically. Explain how this affected GDP, and how a measure of well-being that includes time spent working in the home and leisure would change compared with GDP.",
      marks: 3,
      rubric: [
        { point: "GDP rises because more people are working and production increases", marks: 1 },
        { point: "Time spent working in the home and leisure falls; these are not counted in GDP", marks: 1 },
        { point: "So the broader well-being measure rises by less than GDP", marks: 1 },
      ],
      model:
        "As more women joined the labour force, more people were working and producing goods and services sold in markets, so GDP increased. However, this reduced the time spent working in the home and taking leisure, which GDP does not count. A measure of well-being that includes home work and leisure would therefore rise by less than GDP.",
    },
    {
      id: "gdp-e18", section: "short", sub: "GDP & circular flow",
      prompt: "Using the circular-flow diagram, explain why GDP measures both the total income and the total expenditure of an economy.",
      marks: 3,
      rubric: [
        { point: "Households spend on goods and services in the markets for goods and services; this spending is firms' revenue", marks: 1 },
        { point: "Firms pay wages, rent and profit for factors of production, which become households' income", marks: 1 },
        { point: "Every dollar a buyer spends is a dollar of income for the seller, so for the whole economy income = expenditure = GDP", marks: 1 },
      ],
      model:
        "In the circular-flow diagram, households buy goods and services from firms in the markets for goods and services, so their spending becomes firms' revenue. Firms use that revenue to pay wages, rent and profit to households for the labour, land and capital bought in the markets for factors of production, and this becomes households' income. Because every dollar a buyer spends is a dollar of income for the seller, for the economy as a whole total expenditure equals total income, and both equal GDP.",
    },

    // ---------- tf
    {
      id: "gdp-e19", section: "tf", sub: "Components of GDP", source: "Exam example",
      prompt: "When a household buys newly issued shares in a company, investment in GDP increases.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: buying shares is a purchase of a financial asset, not investment in GDP", marks: 1 },
        { point: "Investment in GDP is spending on goods used in future to produce more goods (business capital, residential capital, inventories)", marks: 1 },
        { point: "No new good or service is produced by the share purchase, so GDP/I is unchanged (only if the firm spends the funds on new capital would I rise)", marks: 1 },
      ],
      model:
        "False. In GDP accounting, investment is spending on goods that will be used in the future to produce more goods: business capital, residential capital and inventory accumulations. 'Investment' does not mean the purchase of financial assets like stocks and bonds. Buying newly issued shares does not itself involve the production of any good or service, so investment and GDP do not change; I would only rise if the firm used the funds to buy, say, new equipment.",
    },
    {
      id: "gdp-e20", section: "tf", sub: "Components of GDP", source: "Problem Set 1 Q1",
      prompt: "A family's purchase of a newly built house is counted as consumption in GDP.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: it is counted as investment", marks: 1 },
        { point: "Consumption excludes purchases of new housing", marks: 1 },
        { point: "A homeowner's personal residence is residential capital, part of investment (C only includes the imputed rental value)", marks: 1 },
      ],
      model:
        "False. Consumption is household spending on goods and services but explicitly excludes purchases of new housing. A newly built house is residential capital, which is part of investment. For homeowners, consumption only includes the imputed rental value of the house each year, not the purchase price or mortgage payments.",
    },
    {
      id: "gdp-e21", section: "tf", sub: "Nominal vs real GDP",
      prompt: "In the base year, nominal GDP equals real GDP and the GDP deflator equals 100.",
      tf: true,
      marks: 3,
      rubric: [
        { point: "States True", marks: 1 },
        { point: "Nominal GDP uses current prices; real GDP uses base-year prices, which are the same in the base year, so nominal = real", marks: 1 },
        { point: "GDP deflator = nominal ÷ real × 100 = 100", marks: 1 },
      ],
      model:
        "True. Nominal GDP values output at current prices and real GDP values it at constant base-year prices. In the base year, current prices are the base-year prices, so nominal GDP equals real GDP. The GDP deflator = nominal GDP ÷ real GDP × 100 = 1 × 100 = 100.",
    },
    {
      id: "gdp-e22", section: "tf", sub: "Components of GDP", source: "Problem Set 1 Q1",
      prompt: "When a Singapore household buys an imported car, Singapore's GDP falls because imports are subtracted from GDP.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: GDP is unchanged", marks: 1 },
        { point: "The car purchase is counted in consumption (C rises)", marks: 1 },
        { point: "Imports are the parts of C, I and G spent on foreign goods, so NX falls by the same amount and the two cancel", marks: 1 },
      ],
      model:
        "False. The household's purchase of the car is consumption, so C rises by the price of the car. Because the car was produced abroad it is also an import, and imports are the portions of C, I and G spent on foreign goods, so NX falls by the same amount. The two effects cancel, leaving GDP unchanged, which is correct since no domestic production took place.",
    },
    {
      id: "gdp-e23", section: "tf", sub: "Nominal vs real GDP",
      prompt: "If nominal GDP rises by 10%, the quantity of goods and services produced must have risen.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "Nominal GDP is valued at current prices, so its change reflects both prices and quantities", marks: 1 },
        { point: "The rise could be entirely due to higher prices with real GDP (quantities) unchanged or even falling; real GDP must be checked", marks: 1 },
      ],
      model:
        "False. Nominal GDP values output at current prices, so a change in nominal GDP reflects changes in both prices and quantities. A 10% rise could be due entirely to inflation, with the quantity of output unchanged or even lower, as in 2028 of the milk-and-honey example where nominal GDP doubled while real GDP did not change. Only real GDP, valued at constant base-year prices, shows the change in quantities.",
    },
    {
      id: "gdp-e24", section: "tf", sub: "GDP definition",
      prompt: "The output of a foreign-owned factory located in Singapore is included in Singapore's GDP.",
      tf: true,
      marks: 3,
      rubric: [
        { point: "States True", marks: 1 },
        { point: "GDP measures production within a country's borders, whether by its own citizens or by foreigners located there", marks: 1 },
        { point: "Contrast: it would be in the owners' country's GNP (production by residents wherever it occurs), not Singapore's GNP", marks: 1 },
      ],
      model:
        "True. GDP measures the value of production that occurs within a country's borders, whether done by its own citizens or by foreigners located there. The factory produces in Singapore, so its output is in Singapore's GDP. It is GNP, which measures production by a country's residents regardless of where it occurs, that would count it for the owners' home country instead.",
    },
    {
      id: "gdp-e25", section: "tf", sub: "Components of GDP", source: "Problem Set 1 Q1",
      prompt: "An increase in Social Security payments increases government purchases and therefore GDP.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "Social Security payments are transfer payments, excluded from G", marks: 1 },
        { point: "They are not purchases of goods and services; nothing is produced, so GDP does not rise", marks: 1 },
      ],
      model:
        "False. Government purchases are spending on goods and services purchased by the government. Social Security payments are transfer payments, which are excluded from G because they are not purchases of goods and services. Since nothing is produced in exchange, they add nothing to GDP.",
    },
    {
      id: "gdp-e26", section: "tf", sub: "Value added", source: "Problem Set 1 Q8",
      prompt: "GDP can be calculated by adding up the value added of every producer in the economy.",
      tf: true,
      marks: 3,
      rubric: [
        { point: "States True", marks: 1 },
        { point: "Value added = value of a producer's output − value of intermediate goods it buys", marks: 1 },
        { point: "Summing value added counts each stage once and equals the market value of final goods, e.g. 100 + 50 + 30 = $180 = value of bread", marks: 1 },
      ],
      model:
        "True. Value added is the value of a producer's output minus the value of the intermediate goods it buys. Summing value added across all producers counts each stage of production once, so the total equals the market value of the final goods. For example, a farmer ($100), a miller ($150 − $100 = $50) and a baker ($180 − $150 = $30) add $180 in total, which equals the value of the bread sold to consumers, i.e. GDP.",
    },
    {
      id: "gdp-e27", section: "tf", sub: "GDP and well-being",
      prompt: "A rise in real GDP per person always means that people in the country are better off.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: real GDP per person is the main indicator of living standards but is not a perfect measure of well-being", marks: 1 },
        { point: "GDP does not measure leisure, non-market activity or the quality of the environment", marks: 1 },
        { point: "GDP does not measure the distribution of income; so real GDP per person could rise while well-being does not (e.g. longer working hours, more pollution)", marks: 1 },
      ],
      model:
        "False. Real GDP per person is the main indicator of the average person's standard of living, but GDP is not a perfect measure of well-being. It does not measure leisure time, non-market activity such as home child-care and volunteer work, the quality of the environment, or whether income is equitably distributed. Real GDP per person could therefore rise because people work longer hours or pollute more, without people being better off.",
    },
  ],
};

export default data;
