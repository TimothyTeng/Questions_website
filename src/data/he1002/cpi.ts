import type { TopicData } from "@/lib/he1002/types";

// Lecture 2 "Measuring the Cost of Living" + Problem Set 2 (with answer guide).

const data: TopicData = {
  id: "cpi",

  // ------------------------------------------------------------------ content
  sections: [
    {
      title: "The consumer price index and related indices",
      points: [
        {
          term: "Consumer price index (CPI)",
          text: "A measure of the overall cost of the goods and services bought by a typical consumer. Used to monitor changes in the cost of living over time.",
        },
        { term: "Core CPI", text: "A measure of the overall cost of consumer goods and services excluding food and energy." },
        { term: "Producer price index (PPI)", text: "A measure of the cost of a basket of goods and services sold by domestic firms." },
      ],
    },
    {
      title: "How the CPI is calculated",
      intro: "Five steps (in the U.S. the work is done by the Bureau of Labor Statistics, BLS).",
      points: [
        {
          term: "1. Fix the basket",
          text: "The BLS surveys consumers to find the basket of goods and services bought by the typical consumer. The lecture shows a typical basket and Singapore's CPI basket.",
        },
        { term: "2. Find the prices", text: "The BLS collects data on the prices of all the goods in the basket." },
        { term: "3. Compute the basket's cost", text: "Use the prices to compute the total cost of the (same) basket in each year." },
        {
          term: "4. Choose a base year and compute the CPI",
          text: "Designate one year as the base year (benchmark). CPI = basket's cost in current year ÷ basket's cost in base year × 100, so the CPI is 100 in the base year.",
        },
        { term: "5. Compute the inflation rate", text: "The inflation rate is the percentage change in the CPI from the preceding period." },
        {
          term: "Finding prices from spending",
          text: "If you know total spending and quantity bought, price per unit = spending ÷ quantity (Problem Set 2 Q1).",
          eg: "$200 spent on 100 heads of cauliflower → $2 a head.",
        },
      ],
      formulas: [
        { name: "Cost of the basket", expr: "Cost of basket = Σ (fixed basket quantity × current-year price)" },
        { name: "CPI", expr: "CPI = Basket's cost in current year ÷ Basket's cost in base year × 100" },
        { name: "Inflation rate", expr: "Inflation rate = (CPI this year − CPI last year) ÷ CPI last year × 100%" },
        { name: "Price per unit", expr: "Price = Total spending ÷ Quantity bought" },
        { name: "Percentage change in a price", expr: "% change = (New price − Old price) ÷ Old price × 100%" },
      ],
      table: [
        ["Year", "Price of pizza", "Price of shirt", "Cost of basket (10 pizzas, 5 shirts)", "CPI (2025 = 100)", "Inflation"],
        ["2025", "$12", "$18", "$12 × 10 + $18 × 5 = $210", "100", "—"],
        ["2026", "$14", "$20", "$14 × 10 + $20 × 5 = $240", "114.3", "14.3%"],
        ["2027", "$16", "$22", "$16 × 10 + $22 × 5 = $270", "128.6", "12.5%"],
      ],
      worked: [
        {
          problem: "Lecture Example 1: basket = 10 pizzas and 5 shirts; prices as in the table; base year 2025. Compute the CPI and inflation.",
          solution:
            "2025: 100 × ($210 ÷ $210) = 100\n2026: 100 × ($240 ÷ $210) = 114.3 → inflation = (114.3 − 100) ÷ 100 × 100 = 14.3%\n2027: 100 × ($270 ÷ $210) = 128.6 → inflation = (128.6 − 114.3) ÷ 114.3 × 100 = 12.5%",
        },
        {
          problem:
            "Problem Set 2 Q1 (Vegopia): in 2026 residents spend $200 on 100 cauliflower, $75 on 50 broccoli, $50 on 500 carrots; in 2027 $225 on 75 cauliflower, $120 on 80 broccoli, $100 on 500 carrots. Base year 2026.",
          solution:
            "Prices 2026: cauliflower $2, broccoli $1.50, carrots $0.10\nPrices 2027: cauliflower $3, broccoli $1.50, carrots $0.20\nBasket (2026 quantities): 100 cauliflower, 50 broccoli, 500 carrots\nCost 2026 = 100 × $2 + 50 × $1.50 + 500 × $0.10 = $325\nCost 2027 = 100 × $3 + 50 × $1.50 + 500 × $0.20 = $475\nCPI 2026 = 325 ÷ 325 × 100 = 100; CPI 2027 = 475 ÷ 325 × 100 ≈ 146\nInflation 2027 = (146 − 100) ÷ 100 × 100 = 46%",
        },
        {
          problem:
            "Problem Set 2 Q2: basket of 100 tennis balls, 100 golf balls, 200 bottles of Gatorade. Prices 2026: $2, $4, $1; 2027: $2, $6, $2. Find each price change and the change in the price level.",
          solution:
            "Tennis balls: (2 − 2) ÷ 2 = 0%; golf balls: (6 − 4) ÷ 4 = 50%; Gatorade: (2 − 1) ÷ 1 = 100%\nCost 2026 = 100 × 2 + 100 × 4 + 200 × 1 = $800\nCost 2027 = 100 × 2 + 100 × 6 + 200 × 2 = $1,200\nCPI: 100 and 1,200 ÷ 800 × 100 = 150 → price level up 50%",
        },
      ],
    },
    {
      title: "Problems with the CPI",
      intro: "All three problems mean the CPI overstates increases in the cost of living.",
      points: [
        {
          term: "Substitution bias",
          text: "Over time some prices rise faster than others. Consumers substitute toward goods that become relatively cheaper, mitigating the effects of price increases. The CPI misses this substitution because it uses a fixed basket of goods.",
          eg: "Buying more PCs after their price falls; using more fuel-efficient cars after petrol prices rise.",
        },
        {
          term: "Introduction of new goods",
          text: "New goods increase variety and allow consumers to find products that more closely meet their needs; in effect, dollars become more valuable. The CPI misses this effect because it uses a fixed basket of goods.",
          eg: "The invention of cell phones; Gatorade introducing new flavours.",
        },
        {
          term: "Unmeasured quality change",
          text: "Improvements in the quality of goods in the basket increase the value of each dollar. The BLS tries to account for quality changes but probably misses some, as quality is hard to measure.",
          eg: "Airbags in cars; more scoops of raisins in each package of Raisin Bran; a bigger Gatorade bottle at the same price.",
        },
        {
          term: "Adjusting for quality",
          text: "If a product improves (e.g. a bigger bottle), its price should be adjusted, for example by comparing the price per ml. This lowers the estimated inflation rate because consumers are getting more per bottle (Problem Set 2 Q2c).",
        },
      ],
      table: [
        ["Problem", "What the fixed-basket CPI misses", "Example (Problem Set 2 Q5)"],
        ["Substitution bias", "Consumers switching to relatively cheaper goods", "More PC purchases after their price falls; more fuel-efficient cars after petrol prices rise"],
        ["Introduction of new goods", "Greater variety makes dollars more valuable", "The invention of cell phones"],
        ["Unmeasured quality change", "Better quality raises the value of each dollar", "Airbags in cars; more raisins per box of Raisin Bran"],
      ],
    },
    {
      title: "GDP deflator vs CPI",
      intro: "Both measure the price level; the lecture charts the two measures of inflation from 1965 to 2025.",
      points: [
        { term: "Imported consumer goods", text: "Included in the CPI but excluded from the GDP deflator." },
        { term: "Capital goods", text: "Excluded from the CPI but included in the GDP deflator (if produced domestically)." },
        {
          term: "The basket",
          text: "CPI: a fixed basket, the prices of all goods and services bought by consumers. GDP deflator: the prices of all goods and services currently produced domestically, so its basket changes with current production patterns.",
        },
        {
          term: "Why the two inflation rates differ",
          text: "Because the CPI uses a fixed basket while the GDP deflator uses a changing basket reflecting current production, they can give different inflation rates for the same data (Problem Set 2 Q4).",
        },
      ],
      table: [
        ["", "CPI", "GDP deflator"],
        ["Imported consumer goods", "Included", "Excluded"],
        ["Domestically produced capital goods", "Excluded", "Included"],
        ["Basket", "Fixed: goods and services bought by consumers", "Changing: all goods and services currently produced domestically"],
      ],
      worked: [
        {
          problem:
            "Problem Set 2 Q4: 2026: 10 karaoke machines at $40 and 6 voice lessons at $50. 2027: 12 machines at $60 and 10 lessons at $60. Base year 2026. Compare the CPI method (basket fixed at 5 machines and 3 lessons) and the GDP-deflator method.",
          solution:
            "CPI method: cost 2026 = 5 × $40 + 3 × $50 = $350; cost 2027 = 5 × $60 + 3 × $60 = $480\nCPI 2027 = 480 ÷ 350 × 100 = 137.14 → inflation 37.14%\nDeflator method: nominal 2026 = 10 × 40 + 6 × 50 = $700; nominal 2027 = 12 × 60 + 10 × 60 = $1,320\nReal 2027 (2026 prices) = 12 × 40 + 10 × 50 = $980\nDeflator 2027 = 1,320 ÷ 980 × 100 = 134.69 → inflation 34.69%\nNot the same: the CPI uses a fixed basket; the deflator uses a changing basket that reflects current production.",
        },
      ],
    },
    {
      title: "Comparing dollar figures from different times",
      points: [
        {
          term: "Why correct for inflation",
          text: "Inflation makes it harder to compare dollar amounts from different times. Convert an old amount into today's dollars using the ratio of price levels (e.g. the CPI).",
        },
      ],
      formulas: [{ name: "Today's dollars", expr: "Amount in today's dollars = Amount in year T dollars × (Price level today ÷ Price level in year T)" }],
      worked: [
        {
          problem: "Lecture Example 2: great-grandpa earned $310 a month in 1963. CPI in 1963 = 30.9; CPI in 2026 = 324.1. What is this in 2026 dollars?",
          solution: "Amount in 2026 dollars = $310 × (324.1 ÷ 30.9)\n= $310 × 10.4887\n= $3,251.49 a month",
        },
      ],
    },
    {
      title: "Purchasing power: prices versus wages",
      intro: "From Problem Set 2 Q6: whether people are better off depends on prices relative to incomes, not on prices alone.",
      points: [
        {
          term: "Purchasing power over a good",
          text: "Compare how long a worker must work to buy a good: minutes of work = price ÷ (hourly wage ÷ 60). If wages rise by a larger percentage than the price, purchasing power in terms of that good rises.",
        },
      ],
      formulas: [
        { name: "Work time to buy a good", expr: "Minutes of work = Price ÷ (Hourly wage ÷ 60)" },
        { name: "Percentage change", expr: "% change = (New − Old) ÷ Old × 100%" },
      ],
      worked: [
        {
          problem:
            "Problem Set 2 Q6: a dozen eggs cost $0.88 in 1980 and $2.52 in 2024. The average hourly wage was $6.57 in 1980 and $29.64 in 2024.",
          solution:
            "Egg price rise = (2.52 − 0.88) ÷ 0.88 × 100 ≈ 186%\nWage rise = (29.64 − 6.57) ÷ 6.57 × 100 ≈ 351%\nMinutes of work for a dozen eggs: 1980 = 0.88 ÷ (6.57 ÷ 60) = 8.0 min; 2024 = 2.52 ÷ (29.64 ÷ 60) = 5.1 min\nPurchasing power in terms of eggs rose: wages rose faster than egg prices, so less work time is needed.",
        },
      ],
    },
    {
      title: "Indexation",
      points: [
        { term: "Indexation", text: "The automatic correction by law or contract of a dollar amount for the effects of inflation." },
        {
          term: "Uses of CPI indexation",
          text: "The increase in the CPI automatically determines the COLA (cost-of-living allowance) in many multi-year labour contracts, and adjustments in Social Security payments and federal income tax brackets.",
        },
        {
          term: "Indexing with an upward-biased CPI",
          text: "If the CPI overstates actual inflation, CPI-indexed Social Security benefits rise faster than the true cost of living, so senior citizens' purchasing power and standard of living improve each year (Problem Set 2 Q7a).",
        },
        {
          term: "A senior-specific price index",
          text: "Older people consume more healthcare, whose costs have risen faster than overall inflation. To check whether they are better off: build a price index for seniors that gives greater weight to healthcare and other goods they buy more often, then compare its increase with the general CPI. If the general CPI rises faster, seniors are better off; otherwise they are worse off (Problem Set 2 Q7b).",
        },
      ],
    },
    {
      title: "Real and nominal interest rates",
      intro: "The lecture charts U.S. real and nominal interest rates from 1965 to 2025.",
      points: [
        { term: "Nominal interest rate", text: "The interest rate not corrected for inflation: the rate of growth in the dollar value of a deposit or debt." },
        { term: "Real interest rate", text: "The interest rate corrected for inflation: the rate of growth in the purchasing power of a deposit or debt." },
        {
          term: "Negative real interest rate",
          text: "If inflation is above the nominal interest rate, the real interest rate is negative: the deposit's dollar value grows but its purchasing power falls.",
          eg: "4% nominal with 6% inflation → real rate −2%.",
        },
      ],
      formulas: [{ name: "Real interest rate", expr: "Real interest rate = Nominal interest rate − Inflation rate" }],
      worked: [
        {
          problem:
            "Lecture Example 3: Amir deposits a $1,000 bonus for one year at a nominal interest rate of 9%. Inflation that year is 3.5%. Can he buy more or fewer goods at the end of the year, and by how much?",
          solution: "Real interest rate = Nominal interest rate − Inflation rate\n= 9.0% − 3.5% = 5.5%\nMore: the purchasing power of the $1,000 deposit has grown by 5.5%.",
        },
      ],
    },
    {
      title: "Unexpected inflation: borrowers and lenders",
      intro: "From Problem Set 2 Q8.",
      points: [
        {
          term: "Real rate lower than expected",
          text: "If a borrower and lender agree on a nominal interest rate and inflation turns out higher than they both expected, the real interest rate on the loan is lower than expected.",
        },
        {
          term: "Who gains and who loses",
          text: "The lender loses and the borrower gains, because the borrower repays the loan with dollars that are worth less than was expected.",
          eg: "Homeowners with 1960s fixed-rate mortgages gained from the unexpectedly high inflation of the 1970s; the banks that lent them the money were harmed.",
        },
      ],
      table: [
        ["Inflation turns out…", "Real interest rate vs expected", "Borrower", "Lender"],
        ["Higher than expected", "Lower", "Gains", "Loses"],
      ],
    },
  ],

  // ------------------------------------------------------------------ flashcards
  flashcards: [
    { id: "cpi-c1", type: "concept", front: "A measure of the overall cost of the goods and services bought by a typical consumer.", back: "Consumer price index / CPI", why: "It is used to monitor changes in the cost of living over time." },
    { id: "cpi-c2", type: "concept", front: "A measure of the overall cost of consumer goods and services excluding food and energy.", back: "Core CPI", why: "It leaves out food and energy from the consumer basket." },
    { id: "cpi-c3", type: "concept", front: "A measure of the cost of a basket of goods and services sold by domestic firms.", back: "Producer price index / PPI", why: "The CPI is about what consumers buy; this index is about what domestic firms sell." },
    { id: "cpi-c4", type: "concept", front: "The U.S. agency that surveys consumers to fix the basket and collects the prices of the goods in it.", back: "Bureau of Labor Statistics / BLS", why: "It carries out the steps of computing the CPI." },
    { id: "cpi-c5", type: "concept", front: "The fixed set of goods and services bought by the typical consumer, whose cost the CPI tracks.", back: "Basket / Market basket", why: "Step 1 of the CPI is to fix it, e.g. 10 pizzas and 5 shirts in the lecture example." },
    { id: "cpi-c6", type: "concept", front: "The year designated as the benchmark for the CPI, in which the index equals 100.", back: "Base year", why: "CPI = basket's cost in current year ÷ basket's cost in this year × 100." },
    { id: "cpi-c7", type: "concept", front: "The percentage change in the CPI from the preceding period.", back: "Inflation rate", why: "(CPI this year − CPI last year) ÷ CPI last year × 100%." },
    { id: "cpi-c8", type: "concept", front: "What the CPI is used to monitor changes in over time.", back: "Cost of living", why: "The CPI tracks what it costs a typical consumer to buy the same basket." },
    { id: "cpi-c9", type: "concept", front: "Consumers switch toward goods that have become relatively cheaper, but a fixed-basket index misses this.", back: "Substitution bias", why: "It makes the CPI overstate increases in the cost of living." },
    { id: "cpi-c10", type: "concept", front: "Greater variety lets consumers find products that more closely meet their needs, making dollars more valuable; a fixed basket misses it.", back: "Introduction of new goods", why: "E.g. the invention of cell phones; the CPI overstates the rise in the cost of living." },
    { id: "cpi-c11", type: "concept", front: "Improvements in the goods in the basket raise the value of each dollar, but are hard for the BLS to measure fully.", back: "Unmeasured quality change", why: "E.g. airbags in cars; the CPI overstates the rise in the cost of living." },
    { id: "cpi-c12", type: "concept", front: "The price index that includes imported consumer goods but excludes capital goods.", back: "CPI", why: "It covers everything consumers buy, wherever it is produced." },
    { id: "cpi-c13", type: "concept", front: "The price index that includes domestically produced capital goods but excludes imported consumer goods.", back: "GDP deflator", why: "It covers all goods and services currently produced domestically." },
    { id: "cpi-c14", type: "concept", front: "A price measure whose 'basket' changes each year to reflect current production patterns.", back: "GDP deflator", why: "The CPI instead uses a fixed basket, so the two can give different inflation rates." },
    { id: "cpi-c15", type: "concept", front: "The automatic correction by law or contract of a dollar amount for the effects of inflation.", back: "Indexation", why: "E.g. Social Security payments and federal income tax brackets adjust with the CPI." },
    { id: "cpi-c16", type: "concept", front: "A payment in many multi-year labour contracts that is automatically determined by the increase in the CPI.", back: "COLA / Cost-of-living allowance", why: "An example of indexation in a contract." },
    { id: "cpi-c17", type: "concept", front: "The interest rate not corrected for inflation; the rate of growth in the dollar value of a deposit or debt.", back: "Nominal interest rate", why: "Subtract inflation from it to get the real interest rate." },
    { id: "cpi-c18", type: "concept", front: "The interest rate corrected for inflation; the rate of growth in the purchasing power of a deposit or debt.", back: "Real interest rate", why: "Real interest rate = nominal interest rate − inflation rate." },
    { id: "cpi-c19", type: "concept", front: "What the real interest rate measures the growth of: the amount of goods a deposit can actually buy.", back: "Purchasing power", why: "In Example 3, a 5.5% real rate means Amir's deposit can buy 5.5% more goods." },
    { id: "cpi-c20", type: "concept", front: "Amount in year T dollars × (price level today ÷ price level in year T).", back: "Amount in today's dollars", why: "Used to compare dollar figures from different times, e.g. great-grandpa's 1963 salary." },
    { id: "cpi-c21", type: "concept", front: "Basket's cost in current year ÷ basket's cost in base year × 100.", back: "CPI / Consumer price index", why: "Step 4 of computing the CPI." },
    { id: "cpi-c22", type: "concept", front: "The direction in which substitution bias, new goods and unmeasured quality change bias the CPI's measure of the cost of living.", back: "Overstates / Upward", why: "All three make the CPI overstate increases in the cost of living." },
    {
      id: "cpi-s1", type: "scenario",
      front: "The price of beef rises sharply and consumers switch to chicken. Which CPI problem does this illustrate, and in which direction does it bias the CPI?",
      back: "Substitution bias; CPI overstates the rise in the cost of living",
      why: "Consumers substitute toward the relatively cheaper good, softening the price rise. The CPI's fixed basket still assumes the old amount of beef is bought.",
    },
    {
      id: "cpi-s2", type: "scenario",
      front: "Cars now come with airbags at the same price as before. Which CPI problem does this illustrate?",
      back: "Unmeasured quality change",
      why: "Quality improved so each dollar buys more value, but quality is hard to measure, so the CPI may miss it and overstate inflation (Problem Set 2 Q5).",
    },
    {
      id: "cpi-s3", type: "scenario",
      front: "A brand-new type of device is invented and widely bought. Which CPI problem does this illustrate?",
      back: "Introduction of new goods",
      why: "New goods increase variety and make dollars more valuable; the fixed basket misses this, so the CPI overstates the rise in the cost of living.",
    },
    {
      id: "cpi-s4", type: "scenario",
      front: "The fixed basket costs $400 in the base year and $460 this year. What is this year's CPI?",
      back: "115",
      why: "CPI = 460 ÷ 400 × 100 = 115.",
    },
    {
      id: "cpi-s5", type: "scenario",
      front: "The CPI rises from 120 last year to 126 this year. What is the inflation rate?",
      back: "5%",
      why: "Inflation = (126 − 120) ÷ 120 × 100 = 5%.",
    },
    {
      id: "cpi-s6", type: "scenario",
      front: "The price of cars imported from Germany rises. Which rises more: the CPI or the GDP deflator?",
      back: "The CPI",
      why: "Imported consumer goods are included in the CPI but excluded from the GDP deflator, which only covers goods produced domestically.",
    },
    {
      id: "cpi-s7", type: "scenario",
      front: "The price of machinery made at home and sold to local factories rises. Which index picks this up: the CPI or the GDP deflator?",
      back: "The GDP deflator",
      why: "Capital goods are excluded from the CPI (consumers don't buy them) but included in the GDP deflator if produced domestically.",
    },
    {
      id: "cpi-s8", type: "scenario",
      front: "Your savings account pays 4% nominal interest while inflation is 6%. What is the real interest rate, and what happens to your purchasing power?",
      back: "−2%; purchasing power falls by 2%",
      why: "Real interest rate = nominal − inflation = 4% − 6% = −2%. The dollar value grows, but prices grow faster, so the deposit buys less.",
    },
    {
      id: "cpi-s9", type: "scenario",
      front: "A borrower and lender agree a fixed nominal interest rate. Inflation turns out higher than both expected. Who gains and who loses?",
      back: "Borrower gains, lender loses",
      why: "The real interest rate (nominal − inflation) is lower than expected, so the borrower repays with dollars worth less than expected (Problem Set 2 Q8).",
    },
    {
      id: "cpi-s10", type: "scenario",
      front: "Your grandmother earned $500 a month when the CPI was 50. Today the CPI is 200. What is her salary in today's dollars?",
      back: "$2,000",
      why: "Amount today = $500 × (200 ÷ 50) = $500 × 4 = $2,000.",
    },
    {
      id: "cpi-s11", type: "scenario",
      front: "Social Security benefits rise each year with the CPI, but the CPI overstates true inflation. If retirees buy the same basket as everyone else, what happens to their standard of living?",
      back: "It improves each year",
      why: "Benefits grow faster than the true cost of living, so retirees' purchasing power rises over time (Problem Set 2 Q7a).",
    },
    {
      id: "cpi-s12", type: "scenario",
      front: "Since 1980 the price of a good has risen 100% while the hourly wage has risen 200%. Did workers' purchasing power in terms of that good rise or fall?",
      back: "Rose",
      why: "Wages rose by a larger percentage than the price, so fewer minutes of work are needed to buy the good (like eggs in Problem Set 2 Q6).",
    },
    {
      id: "cpi-s13", type: "scenario",
      front: "A drink's price is unchanged but the bottle gets bigger. Should this affect the measured inflation rate?",
      back: "Yes: adjust the price for size, lowering measured inflation",
      why: "Consumers get more product for the listed price. Compare the price per ml; the effective price fell, so inflation is lower than the listed prices suggest (Problem Set 2 Q2c).",
    },
    {
      id: "cpi-s14", type: "scenario",
      front: "With the same data, a CPI-style index shows 37% inflation but a GDP-deflator-style index shows 35%. Why can they differ?",
      back: "Fixed basket vs changing basket",
      why: "The CPI holds the basket fixed, while the GDP deflator uses current production quantities, so the weights on each price differ (Problem Set 2 Q4).",
    },
  ],

  // ------------------------------------------------------------------ quiz
  quiz: [
    { id: "cpi-q1", kind: "fill", sub: "Price indices", prompt: "The ____ is a measure of the overall cost of the goods and services bought by a typical consumer.", answers: [["consumer price index", "CPI"]], explain: "It is used to monitor changes in the cost of living." },
    { id: "cpi-q2", kind: "fill", sub: "Price indices", prompt: "The CPI is used to monitor changes in the ____ over time.", answers: [["cost of living"]], explain: "It tracks the cost of the typical consumer's basket." },
    { id: "cpi-q3", kind: "fill", sub: "Price indices", prompt: "____ CPI measures the overall cost of consumer goods and services excluding food and energy.", answers: [["Core"]], explain: "Core CPI leaves out food and energy." },
    { id: "cpi-q4", kind: "fill", sub: "Price indices", prompt: "The ____ price index measures the cost of a basket of goods and services sold by domestic firms.", answers: [["producer", "PPI"]], explain: "PPI = producer price index." },
    { id: "cpi-q5", kind: "fill", sub: "Computing the CPI", prompt: "Step 1 in computing the CPI is to fix the ____ of goods and services bought by the typical consumer.", answers: [["basket", "market basket"]], explain: "The same basket is priced every year." },
    { id: "cpi-q6", kind: "fill", sub: "Computing the CPI", prompt: "In the U.S., the ____ surveys consumers and collects data on the prices of all the goods in the basket.", answers: [["Bureau of Labor Statistics", "BLS"]], explain: "BLS = Bureau of Labor Statistics." },
    { id: "cpi-q7", kind: "fill", sub: "Computing the CPI", prompt: "CPI = basket's cost in current year ÷ basket's cost in ____ year × 100.", answers: [["base"]], explain: "The base year is the benchmark, so its CPI is 100." },
    { id: "cpi-q8", kind: "fill", sub: "Computing the CPI", prompt: "In the base year, the CPI equals ____.", answers: [["100"]], explain: "Cost ÷ same cost × 100 = 100." },
    { id: "cpi-q9", kind: "fill", sub: "Computing the CPI", prompt: "The ____ is the percentage change in the CPI from the preceding period.", answers: [["inflation rate", "inflation", "rate of inflation"]], explain: "Step 5 of computing the CPI." },
    { id: "cpi-q10", kind: "fill", sub: "Computing the CPI", prompt: "Inflation rate = (CPI this year − CPI last year) ÷ ____ × 100%.", answers: [["CPI last year", "last year's CPI", "CPI of last year"]], explain: "Always divide by the earlier year's CPI." },
    { id: "cpi-q11", kind: "fill", sub: "Computing the CPI", prompt: "The basket is 10 pizzas and 5 shirts. A pizza costs $12 and a shirt $18. The cost of the basket is $____.", answers: [["210"]], explain: "$12 × 10 + $18 × 5 = $120 + $90 = $210." },
    { id: "cpi-q12", kind: "fill", sub: "Computing the CPI", prompt: "The basket costs $210 in the base year and $240 this year. This year's CPI is ____ (1 d.p.).", answers: [["114.3"]], explain: "240 ÷ 210 × 100 = 114.3." },
    { id: "cpi-q13", kind: "fill", sub: "Computing the CPI", prompt: "The CPI rises from 114.3 to 128.6. The inflation rate is ____% (1 d.p.).", answers: [["12.5", "12.5%"]], explain: "(128.6 − 114.3) ÷ 114.3 × 100 = 12.5%." },
    { id: "cpi-q14", kind: "fill", sub: "Computing the CPI", prompt: "Vegopians spend $225 on 75 heads of cauliflower. The price of a head of cauliflower is $____.", answers: [["3"]], explain: "Price = spending ÷ quantity = 225 ÷ 75 = $3." },
    { id: "cpi-q15", kind: "fill", sub: "Computing the CPI", prompt: "The Vegopia basket costs $325 in 2026 (base year) and $475 in 2027. The 2027 CPI is ____ (nearest whole number).", answers: [["146"]], explain: "475 ÷ 325 × 100 = 146.2 ≈ 146." },
    { id: "cpi-q16", kind: "fill", sub: "Computing the CPI", prompt: "The CPI rises from 100 to 146. The inflation rate is ____%.", answers: [["46", "46%"]], explain: "(146 − 100) ÷ 100 × 100 = 46%." },
    { id: "cpi-q17", kind: "fill", sub: "Computing the CPI", prompt: "A basket of sports goods costs $800 in the base year and $1,200 the next year. The CPI in the second year is ____.", answers: [["150"]], explain: "1,200 ÷ 800 × 100 = 150, so the price level rose 50%." },
    { id: "cpi-q18", kind: "fill", sub: "Computing the CPI", prompt: "The price of golf balls rises from $4 to $6. The percentage change in price is ____%.", answers: [["50", "50%"]], explain: "(6 − 4) ÷ 4 × 100 = 50%." },
    { id: "cpi-q19", kind: "fill", sub: "Problems with the CPI", prompt: "____ bias: consumers substitute toward goods that have become relatively cheaper, which a fixed basket misses.", answers: [["Substitution"]], explain: "It makes the CPI overstate the rise in the cost of living." },
    { id: "cpi-q20", kind: "fill", sub: "Problems with the CPI", prompt: "The introduction of new goods increases ____, allowing consumers to find products that more closely meet their needs.", answers: [["variety", "choice"]], explain: "In effect, dollars become more valuable." },
    { id: "cpi-q21", kind: "fill", sub: "Problems with the CPI", prompt: "Unmeasured ____ change: improvements in goods increase the value of each dollar but are hard to measure.", answers: [["quality"]], explain: "The BLS tries to account for it but probably misses some." },
    { id: "cpi-q22", kind: "fill", sub: "Problems with the CPI", prompt: "The CPI misses substitution and the introduction of new goods because it uses a ____ basket of goods.", answers: [["fixed"]], explain: "The basket does not change when consumers' buying changes." },
    { id: "cpi-q23", kind: "fill", sub: "Problems with the CPI", prompt: "Because of substitution bias, new goods and unmeasured quality change, the CPI ____ increases in the cost of living.", answers: [["overstates", "overestimates", "exaggerates"]], explain: "All three problems bias the CPI upward." },
    { id: "cpi-q24", kind: "fill", sub: "Problems with the CPI", prompt: "The invention of cell phones illustrates the CPI problem called the introduction of ____.", answers: [["new goods"]], explain: "Problem Set 2 Q5." },
    { id: "cpi-q25", kind: "fill", sub: "Problems with the CPI", prompt: "More scoops of raisins in each package of Raisin Bran illustrates unmeasured ____ change.", answers: [["quality"]], explain: "Consumers get more for the same price (Problem Set 2 Q5)." },
    { id: "cpi-q26", kind: "fill", sub: "Problems with the CPI", prompt: "Greater use of fuel-efficient cars after petrol prices increase illustrates ____ bias.", answers: [["substitution"]], explain: "Consumers substitute away from the good whose cost rose (Problem Set 2 Q5)." },
    { id: "cpi-q27", kind: "fill", sub: "Problems with the CPI", prompt: "If a Gatorade bottle gets bigger, its price should be adjusted, for example by comparing the price per ____.", answers: [["ml", "millilitre", "milliliter", "unit of volume"]], explain: "This lowers the estimated inflation rate (Problem Set 2 Q2c)." },
    { id: "cpi-q28", kind: "fill", sub: "CPI vs GDP deflator", prompt: "Imported consumer goods are included in the CPI but excluded from the ____.", answers: [["GDP deflator", "deflator"]], explain: "The deflator only covers goods produced domestically." },
    { id: "cpi-q29", kind: "fill", sub: "CPI vs GDP deflator", prompt: "____ goods are excluded from the CPI but included in the GDP deflator if produced domestically.", answers: [["Capital"]], explain: "Consumers don't buy capital goods, so they are not in the CPI basket." },
    { id: "cpi-q30", kind: "fill", sub: "CPI vs GDP deflator", prompt: "The CPI uses a fixed basket, whereas the GDP deflator uses the prices of all goods and services currently ____ domestically.", answers: [["produced"]], explain: "So the deflator's basket changes with current production patterns." },
    { id: "cpi-q31", kind: "fill", sub: "CPI vs GDP deflator", prompt: "A basket of 5 karaoke machines and 3 voice lessons costs $350 in 2026 and $480 in 2027. The 2027 CPI (base 2026) is ____ (2 d.p.).", answers: [["137.14"]], explain: "480 ÷ 350 × 100 = 137.14, so inflation is 37.14%." },
    { id: "cpi-q32", kind: "fill", sub: "CPI vs GDP deflator", prompt: "Nominal GDP in 2027 is $1,320 and real GDP (2026 prices) is $980. The GDP deflator is ____ (2 d.p.).", answers: [["134.69"]], explain: "1,320 ÷ 980 × 100 = 134.69, so inflation is 34.69%." },
    { id: "cpi-q33", kind: "fill", sub: "Comparing dollar figures", prompt: "Amount in today's dollars = amount in year T dollars × (price level today ÷ price level in year ____).", answers: [["T"]], explain: "Scale the old amount up by how much prices have risen since year T." },
    { id: "cpi-q34", kind: "fill", sub: "Comparing dollar figures", prompt: "Great-grandpa earned $310 a month in 1963 (CPI 30.9). With the 2026 CPI at 324.1, that is $____ in 2026 dollars (2 d.p.).", answers: [["3251.49", "3,251.49"]], explain: "$310 × 324.1 ÷ 30.9 = $3,251.49." },
    { id: "cpi-q35", kind: "fill", sub: "Comparing dollar figures", prompt: "A meal cost $5 when the CPI was 40. Today the CPI is 200. In today's dollars the meal cost $____.", answers: [["25"]], explain: "$5 × 200 ÷ 40 = $25." },
    { id: "cpi-q36", kind: "fill", sub: "Comparing dollar figures", prompt: "Eggs cost $0.88 a dozen and the wage is $6.57 an hour. A worker must work ____ minutes to buy a dozen eggs (1 d.p.).", answers: [["8.0", "8"]], explain: "0.88 ÷ (6.57 ÷ 60) = 8.0 minutes." },
    { id: "cpi-q37", kind: "fill", sub: "Comparing dollar figures", prompt: "Egg prices rose from $0.88 to $2.52. That is a rise of ____% (nearest whole number).", answers: [["186", "186%"]], explain: "(2.52 − 0.88) ÷ 0.88 × 100 = 186%." },
    { id: "cpi-q38", kind: "fill", sub: "Indexation", prompt: "____ is the automatic correction by law or contract of a dollar amount for the effects of inflation.", answers: [["Indexation"]], explain: "E.g. COLAs, Social Security payments and tax brackets." },
    { id: "cpi-q39", kind: "fill", sub: "Indexation", prompt: "Many multi-year labour contracts include a COLA, short for cost-of-living ____.", answers: [["allowance", "adjustment"]], explain: "The CPI increase automatically determines it." },
    { id: "cpi-q40", kind: "fill", sub: "Indexation", prompt: "Increases in the CPI automatically adjust Social Security payments and federal income tax ____.", answers: [["brackets"]], explain: "Examples of indexation by law." },
    { id: "cpi-q41", kind: "fill", sub: "Indexation", prompt: "If the CPI overstates inflation, CPI-indexed benefits make senior citizens' purchasing power ____ over time.", answers: [["rise", "increase", "grow", "improve"]], explain: "Benefits grow faster than the true cost of living (Problem Set 2 Q7)." },
    { id: "cpi-q42", kind: "fill", sub: "Interest rates", prompt: "The ____ interest rate is not corrected for inflation; it is the rate of growth in the dollar value of a deposit or debt.", answers: [["nominal"]], explain: "The real interest rate is corrected for inflation." },
    { id: "cpi-q43", kind: "fill", sub: "Interest rates", prompt: "The real interest rate is the rate of growth in the ____ of a deposit or debt.", answers: [["purchasing power"]], explain: "It is corrected for inflation." },
    { id: "cpi-q44", kind: "fill", sub: "Interest rates", prompt: "Real interest rate = nominal interest rate − ____.", answers: [["inflation rate", "inflation", "rate of inflation"]], explain: "Example 3: 9% − 3.5% = 5.5%." },
    { id: "cpi-q45", kind: "fill", sub: "Interest rates", prompt: "Amir's deposit earns a 9% nominal interest rate while inflation is 3.5%. The real interest rate is ____% (1 d.p.).", answers: [["5.5", "5.5%"]], explain: "9.0% − 3.5% = 5.5%: his purchasing power grows 5.5%." },
    { id: "cpi-q46", kind: "fill", sub: "Interest rates", prompt: "A deposit earns 4% nominal interest while inflation is 6%. The real interest rate is ____%.", answers: [["-2", "-2%"]], explain: "4% − 6% = −2%: purchasing power falls." },
    { id: "cpi-q47", kind: "fill", sub: "Interest rates", prompt: "If inflation turns out higher than expected, the real interest rate on a fixed nominal-rate loan is ____ than expected.", answers: [["lower", "less", "smaller"]], explain: "Real = nominal − inflation, and inflation is higher." },
    { id: "cpi-q48", kind: "fill", sub: "Interest rates", prompt: "Unexpectedly high inflation makes the ____ gain, because the loan is repaid with dollars worth less than expected.", answers: [["borrower", "borrowers", "debtor"]], explain: "The lender loses (Problem Set 2 Q8)." },
    {
      id: "cpi-q49", kind: "mcq", sub: "Price indices",
      prompt: "Which price measure excludes food and energy?",
      options: ["CPI", "Core CPI", "PPI", "GDP deflator"],
      answer: 1,
      explain: "Core CPI is the overall cost of consumer goods and services excluding food and energy.",
    },
    {
      id: "cpi-q50", kind: "mcq", sub: "Problems with the CPI",
      prompt: "Increased personal computer purchases in response to a decline in their price illustrate which CPI problem?",
      options: ["Introduction of new goods", "Unmeasured quality change", "Substitution bias", "Indexation"],
      answer: 2,
      explain: "Consumers substitute toward the good that has become relatively cheaper (Problem Set 2 Q5).",
    },
    {
      id: "cpi-q51", kind: "mcq", sub: "Problems with the CPI",
      prompt: "Substitution bias, the introduction of new goods and unmeasured quality change all cause the CPI to:",
      options: ["Understate increases in the cost of living", "Overstate increases in the cost of living", "Measure the cost of living exactly", "Ignore imported goods"],
      answer: 1,
      explain: "Each makes dollars worth more than the fixed-basket CPI assumes.",
    },
    {
      id: "cpi-q52", kind: "mcq", sub: "CPI vs GDP deflator",
      prompt: "The price of cars imported from Japan rises. What happens?",
      options: ["Both the CPI and GDP deflator rise equally", "The CPI rises; the GDP deflator is unaffected", "The GDP deflator rises; the CPI is unaffected", "Neither changes"],
      answer: 1,
      explain: "Imported consumer goods are in the CPI but excluded from the GDP deflator.",
    },
    {
      id: "cpi-q53", kind: "mcq", sub: "CPI vs GDP deflator",
      prompt: "The price of domestically produced industrial machinery sold to firms rises. What happens?",
      options: ["The CPI rises; the GDP deflator is unaffected", "The GDP deflator rises; the CPI is unaffected", "Both rise equally", "Neither changes"],
      answer: 1,
      explain: "Capital goods are excluded from the CPI but included in the GDP deflator if produced domestically.",
    },
    {
      id: "cpi-q54", kind: "mcq", sub: "CPI vs GDP deflator",
      prompt: "Using the same data, the CPI method gives 37.14% inflation and the GDP-deflator method gives 34.69%. Why?",
      options: [
        "The CPI uses a fixed basket; the deflator uses a changing basket reflecting current production",
        "The CPI includes capital goods",
        "The deflator includes imported consumer goods",
        "They use different base years",
      ],
      answer: 0,
      explain: "Problem Set 2 Q4c.",
    },
    {
      id: "cpi-q55", kind: "mcq", sub: "Comparing dollar figures",
      prompt: "From 1980 to 2024 the price of eggs rose about 186% and the hourly wage rose about 351%. Workers' purchasing power in terms of eggs:",
      options: ["Fell, because eggs became more expensive", "Rose, because wages rose faster than egg prices", "Was unchanged", "Cannot be determined without the CPI"],
      answer: 1,
      explain: "Minutes of work for a dozen eggs fell from 8.0 to 5.1 (Problem Set 2 Q6).",
    },
    {
      id: "cpi-q56", kind: "mcq", sub: "Interest rates",
      prompt: "Amir deposits $1,000 for a year at 9% nominal interest; inflation is 3.5%. At the end of the year he can buy:",
      options: ["9% more goods", "5.5% more goods", "3.5% fewer goods", "12.5% more goods"],
      answer: 1,
      explain: "Real interest rate = 9% − 3.5% = 5.5%, the growth in purchasing power.",
    },
    {
      id: "cpi-q57", kind: "mcq", sub: "Interest rates",
      prompt: "Inflation in the 1970s was much higher than expected. Homeowners with fixed-rate mortgages taken out in the 1960s:",
      options: ["Were harmed, while banks benefited", "Benefited, while the banks that lent to them were harmed", "Were unaffected", "Paid a higher real interest rate than expected"],
      answer: 1,
      explain: "The real interest rate was lower than expected, so borrowers gained and lenders lost (Problem Set 2 Q8c).",
    },
    {
      id: "cpi-q58", kind: "mcq", sub: "Indexation",
      prompt: "Older people consume more healthcare, whose costs rise faster than overall inflation. How could you check whether CPI-indexed benefits leave them better off?",
      options: [
        "Use the core CPI instead",
        "Build a senior-specific price index weighting healthcare more and compare its increase with the general CPI",
        "Compare nominal and real GDP",
        "Use the producer price index",
      ],
      answer: 1,
      explain: "If the general CPI rises faster than the seniors' index, seniors are better off; otherwise worse off (Problem Set 2 Q7b).",
    },
  ],

  // ------------------------------------------------------------------ exam
  exam: [
    // ---------- calc
    {
      id: "cpi-e1", section: "calc", sub: "Computing the CPI", source: "Problem Set 2 Q1",
      prompt:
        "The residents of Vegopia spend all their income on vegetables. In 2026 they buy 100 heads of cauliflower at $2, 50 bunches of broccoli at $1.50 and 500 carrots at $0.10. In 2027 the prices are $3, $1.50 and $0.20. Using 2026 as the base year (and the 2026 quantities as the basket), calculate the CPI for 2027 (nearest whole number).",
      marks: 3,
      rubric: [
        { point: "States the formula: CPI = basket's cost in current year ÷ basket's cost in base year × 100", marks: 1 },
        { point: "Correct working: cost 2026 = 200 + 75 + 50 = $325; cost 2027 = 300 + 75 + 100 = $475; 475 ÷ 325 × 100", marks: 1 },
        { point: "Correct answer: 146", marks: 1 },
      ],
      model:
        "CPI = Basket's cost in current year ÷ Basket's cost in base year × 100\nCost 2026 = 100 × $2 + 50 × $1.50 + 500 × $0.10 = $325\nCost 2027 = 100 × $3 + 50 × $1.50 + 500 × $0.20 = $475\nCPI 2027 = 475 ÷ 325 × 100 = 146",
      answer: "146",
    },
    {
      id: "cpi-e2", section: "calc", sub: "Computing the CPI", source: "Problem Set 2 Q2",
      prompt:
        "A consumer buys 100 tennis balls, 100 golf balls and 200 bottles of Gatorade. In 2026 the prices are $2, $4 and $1; in 2027 they are $2, $6 and $2. Using a method similar to the CPI (base year 2026), calculate the percentage change in the price level.",
      marks: 3,
      rubric: [
        { point: "States the formulas: CPI = cost of basket in current year ÷ cost in base year × 100; % change = (CPI₂ − CPI₁) ÷ CPI₁ × 100", marks: 1 },
        { point: "Correct working: cost 2026 = $800; cost 2027 = $1,200; CPI 2027 = 150", marks: 1 },
        { point: "Correct answer: 50%", marks: 1 },
      ],
      model:
        "Cost 2026 = 100 × $2 + 100 × $4 + 200 × $1 = $800\nCost 2027 = 100 × $2 + 100 × $6 + 200 × $2 = $1,200\nCPI = Cost in current year ÷ Cost in base year × 100: 2026 = 100; 2027 = 1,200 ÷ 800 × 100 = 150\n% change in price level = (150 − 100) ÷ 100 × 100 = 50%",
      answer: "50%",
    },
    {
      id: "cpi-e3", section: "calc", sub: "CPI vs GDP deflator", source: "Problem Set 2 Q4",
      prompt:
        "In 2026 a karaoke machine costs $40 and a voice lesson $50; in 2027 they cost $60 and $60. Using a method similar to the CPI with the basket fixed at 5 karaoke machines and 3 voice lessons (base year 2026), calculate the inflation rate for 2027 (2 d.p.).",
      marks: 3,
      rubric: [
        { point: "States the formulas: CPI = cost of basket in current year ÷ cost in base year × 100; inflation = (CPI₂ − CPI₁) ÷ CPI₁ × 100", marks: 1 },
        { point: "Correct working: cost 2026 = 5 × 40 + 3 × 50 = $350; cost 2027 = 5 × 60 + 3 × 60 = $480; CPI = 137.14", marks: 1 },
        { point: "Correct answer: 37.14%", marks: 1 },
      ],
      model:
        "Cost 2026 = 5 × $40 + 3 × $50 = $350\nCost 2027 = 5 × $60 + 3 × $60 = $480\nCPI 2027 = 480 ÷ 350 × 100 = 137.14 (CPI 2026 = 100)\nInflation = (137.14 − 100) ÷ 100 × 100 = 37.14%",
      answer: "37.14%",
    },
    {
      id: "cpi-e4", section: "calc", sub: "CPI vs GDP deflator", source: "Problem Set 2 Q4",
      prompt:
        "An economy produces 10 karaoke machines at $40 and 6 voice lessons at $50 in 2026, and 12 machines at $60 and 10 lessons at $60 in 2027. Using a method similar to the GDP deflator (base year 2026), calculate the inflation rate for 2027 (2 d.p.).",
      marks: 3,
      rubric: [
        { point: "States the formula: GDP deflator = nominal GDP ÷ real GDP × 100 (and inflation = % change in the deflator)", marks: 1 },
        { point: "Correct working: nominal 2027 = 720 + 600 = $1,320; real 2027 = 12 × 40 + 10 × 50 = $980; deflator = 134.69 (2026 = 100)", marks: 1 },
        { point: "Correct answer: 34.69%", marks: 1 },
      ],
      model:
        "GDP deflator = Nominal GDP ÷ Real GDP × 100\n2026: nominal = real = 10 × 40 + 6 × 50 = $700 → deflator 100\n2027: nominal = 12 × 60 + 10 × 60 = $1,320; real (2026 prices) = 12 × 40 + 10 × 50 = $980\nDeflator 2027 = 1,320 ÷ 980 × 100 = 134.69\nInflation = (134.69 − 100) ÷ 100 × 100 = 34.69%",
      answer: "34.69%",
    },
    {
      id: "cpi-e5", section: "calc", sub: "Comparing dollar figures", source: "Lecture 2 Example 2",
      prompt: "Your great-grandpa earned $310 a month as a car mechanic in 1963. The CPI was 30.9 in 1963 and 324.1 in 2026. Calculate his monthly earnings in 2026 dollars (2 d.p.).",
      marks: 3,
      rubric: [
        { point: "States the formula: amount in today's dollars = amount in year T dollars × (price level today ÷ price level in year T)", marks: 1 },
        { point: "Correct working: $310 × 324.1 ÷ 30.9", marks: 1 },
        { point: "Correct answer: $3,251.49", marks: 1 },
      ],
      model: "Amount in today's dollars = Amount in year T dollars × (Price level today ÷ Price level in year T)\n= $310 × (324.1 ÷ 30.9)\n= $310 × 10.4887\n= $3,251.49",
      answer: "$3,251.49",
    },
    {
      id: "cpi-e6", section: "calc", sub: "Interest rates", source: "Lecture 2 Example 3",
      prompt: "Amir deposits a $1,000 bonus in his savings account for one year. The nominal interest rate is 9% and inflation during the year is 3.5%. Calculate the real interest rate and state what happens to his purchasing power.",
      marks: 3,
      rubric: [
        { point: "States the formula: real interest rate = nominal interest rate − inflation rate", marks: 1 },
        { point: "Correct working: 9.0% − 3.5%", marks: 1 },
        { point: "Correct answer: 5.5%; purchasing power of the deposit grows by 5.5% (he can buy more goods)", marks: 1 },
      ],
      model: "Real interest rate = Nominal interest rate − Inflation rate\n= 9.0% − 3.5%\n= 5.5%\nThe purchasing power of his $1,000 deposit grows by 5.5%, so he can buy more goods.",
      answer: "5.5%",
    },
    {
      id: "cpi-e7", section: "calc", sub: "Comparing dollar figures", source: "Problem Set 2 Q6",
      prompt: "In January 2024 a dozen eggs cost $2.52 and the average hourly wage was $29.64. Calculate how many minutes a worker had to work to earn enough to buy a dozen eggs (1 d.p.).",
      marks: 3,
      rubric: [
        { point: "States the formula: minutes of work = price ÷ (hourly wage ÷ 60)", marks: 1 },
        { point: "Correct working: wage per minute = 29.64 ÷ 60 = $0.494; 2.52 ÷ 0.494", marks: 1 },
        { point: "Correct answer: 5.1 minutes", marks: 1 },
      ],
      model: "Minutes of work = Price ÷ (Hourly wage ÷ 60)\nWage per minute = $29.64 ÷ 60 = $0.494\nMinutes = $2.52 ÷ $0.494\n= 5.1 minutes",
      answer: "5.1 minutes",
    },
    {
      id: "cpi-e8", section: "calc", sub: "Comparing dollar figures", source: "Problem Set 2 Q6",
      prompt: "The average hourly wage for production workers was $6.57 in January 1980 and $29.64 in January 2024. Calculate the percentage rise in the wage (1 d.p.).",
      marks: 3,
      rubric: [
        { point: "States the formula: % change = (new − old) ÷ old × 100", marks: 1 },
        { point: "Correct working: (29.64 − 6.57) ÷ 6.57 × 100 = 23.07 ÷ 6.57 × 100", marks: 1 },
        { point: "Correct answer: 351.1%", marks: 1 },
      ],
      model: "% change = (New − Old) ÷ Old × 100\n= (29.64 − 6.57) ÷ 6.57 × 100\n= 23.07 ÷ 6.57 × 100\n= 351.1%",
      answer: "351.1%",
    },
    {
      id: "cpi-e9", section: "calc", sub: "Computing the CPI", source: "Lecture 2 Example 1",
      prompt: "The market basket is 10 pizzas and 5 shirts. In 2026 a pizza costs $14 and a shirt $20; in 2027 a pizza costs $16 and a shirt $22. The base year is 2025, when the basket cost $210. Calculate the inflation rate in 2027 (1 d.p.).",
      marks: 3,
      rubric: [
        { point: "States the formulas: CPI = cost in current year ÷ cost in base year × 100; inflation = (CPI this year − CPI last year) ÷ CPI last year × 100", marks: 1 },
        { point: "Correct working: cost 2026 = $240, cost 2027 = $270; CPI 2026 = 114.3, CPI 2027 = 128.6; (128.6 − 114.3) ÷ 114.3 × 100", marks: 1 },
        { point: "Correct answer: 12.5%", marks: 1 },
      ],
      model:
        "Cost 2026 = $14 × 10 + $20 × 5 = $240; Cost 2027 = $16 × 10 + $22 × 5 = $270\nCPI = Cost in current year ÷ Cost in base year × 100\nCPI 2026 = 240 ÷ 210 × 100 = 114.3; CPI 2027 = 270 ÷ 210 × 100 = 128.6\nInflation 2027 = (128.6 − 114.3) ÷ 114.3 × 100 = 12.5%",
      answer: "12.5%",
    },
    {
      id: "cpi-e10", section: "calc", sub: "Comparing dollar figures",
      prompt: "A worker earned $2,000 a month in 2010, when the CPI was 80. The CPI today is 120. Calculate the 2010 salary in today's dollars.",
      marks: 3,
      rubric: [
        { point: "States the formula: amount in today's dollars = amount in year T dollars × (price level today ÷ price level in year T)", marks: 1 },
        { point: "Correct working: $2,000 × 120 ÷ 80 = $2,000 × 1.5", marks: 1 },
        { point: "Correct answer: $3,000", marks: 1 },
      ],
      model: "Amount in today's dollars = Amount in year T dollars × (Price level today ÷ Price level in year T)\n= $2,000 × (120 ÷ 80)\n= $2,000 × 1.5\n= $3,000",
      answer: "$3,000",
    },

    // ---------- short
    {
      id: "cpi-e11", section: "short", sub: "Problems with the CPI",
      prompt: "Explain THREE problems with the CPI as a measure of the cost of living.",
      marks: 3,
      rubric: [
        { point: "Substitution bias: consumers switch toward relatively cheaper goods, which a fixed basket misses", marks: 1 },
        { point: "Introduction of new goods: more variety makes dollars more valuable, which a fixed basket misses", marks: 1 },
        { point: "Unmeasured quality change: quality improvements raise the value of each dollar but are hard to measure; all three make the CPI overstate increases in the cost of living", marks: 1 },
      ],
      model:
        "First, substitution bias: when some prices rise faster than others, consumers substitute toward goods that have become relatively cheaper, but the CPI uses a fixed basket and misses this. Second, the introduction of new goods increases variety and lets consumers find products that better meet their needs, making dollars more valuable, which the fixed basket also misses. Third, unmeasured quality change: improvements in quality raise the value of each dollar, but quality is hard to measure, so some is missed. All three cause the CPI to overstate increases in the cost of living.",
    },
    {
      id: "cpi-e12", section: "short", sub: "CPI vs GDP deflator",
      prompt: "Explain THREE differences between the CPI and the GDP deflator as measures of the price level.",
      marks: 3,
      rubric: [
        { point: "Imported consumer goods are included in the CPI but excluded from the GDP deflator", marks: 1 },
        { point: "Capital goods are excluded from the CPI but included in the GDP deflator if produced domestically", marks: 1 },
        { point: "The CPI uses a fixed basket of goods bought by consumers; the GDP deflator uses the prices of all goods and services currently produced domestically (a changing basket)", marks: 1 },
      ],
      model:
        "First, imported consumer goods are included in the CPI, since consumers buy them, but excluded from the GDP deflator, which only covers domestic production. Second, capital goods are excluded from the CPI but included in the GDP deflator if they are produced domestically. Third, the CPI prices a fixed basket of goods and services bought by consumers, while the GDP deflator uses the prices of all goods and services currently produced domestically, so its basket changes with current production.",
    },
    {
      id: "cpi-e13", section: "short", sub: "CPI vs GDP deflator", source: "Problem Set 2 Q4",
      prompt: "Using the same price and quantity data, a CPI-style calculation gives 37.14% inflation but a GDP-deflator-style calculation gives 34.69%. Explain why the two methods give different answers.",
      marks: 3,
      rubric: [
        { point: "The CPI uses a fixed basket (base-period quantities)", marks: 1 },
        { point: "The GDP deflator uses a changing basket that reflects current production patterns (current quantities)", marks: 1 },
        { point: "Because quantities changed between years, the two methods weight the price changes differently, so the inflation rates differ", marks: 1 },
      ],
      model:
        "The two methods are not the same because they weight prices using different baskets. The CPI uses a fixed basket, here 5 karaoke machines and 3 voice lessons, regardless of what is bought later. The GDP deflator uses a changing basket that reflects current production patterns, here the 2027 quantities. Since quantities changed between the years, each price change gets a different weight, giving 37.14% versus 34.69%.",
    },
    {
      id: "cpi-e14", section: "short", sub: "Problems with the CPI", source: "Problem Set 2 Q2",
      prompt: "The price of a bottle of Gatorade doubled from 2026 to 2027. Explain how learning that (i) the bottle increased in size, and (ii) Gatorade introduced new flavours in 2027 should affect your calculation of the inflation rate.",
      marks: 3,
      rubric: [
        { point: "(i) A larger bottle means more product for the listed price, so the price rise does not fully reflect inflation", marks: 1 },
        { point: "(i) Adjust the price for size, e.g. compare price per ml, which lowers the estimated inflation rate", marks: 1 },
        { point: "(ii) Greater variety raises consumers' well-being; the standard CPI does not capture it, so it overstates inflation, and accounting for it lowers the estimate", marks: 1 },
      ],
      model:
        "(i) A larger bottle means consumers receive more Gatorade for the listed price, so the price increase does not fully reflect inflation. The price should be adjusted for the change in size, for example by comparing the price per ml, which lowers the estimated inflation rate. (ii) New flavours increase product variety, which tends to enhance consumers' well-being; a standard CPI does not fully capture this, so it may overstate inflation, and accounting for it would lower the estimate.",
    },
    {
      id: "cpi-e15", section: "short", sub: "Indexation", source: "Problem Set 2 Q7",
      prompt: "Social Security benefits are increased each year in proportion to the increase in the CPI, even though most economists believe the CPI overstates actual inflation. If older people consume the same basket as everyone else, does this improve their standard of living each year? Explain.",
      marks: 3,
      rubric: [
        { point: "Yes: benefits are indexed to the CPI, which overstates true inflation", marks: 1 },
        { point: "So benefits rise faster than the true cost of living", marks: 1 },
        { point: "Seniors' purchasing power rises over time; they can buy more goods and services each year, improving their standard of living", marks: 1 },
      ],
      model:
        "Yes. Because Social Security benefits are indexed to the CPI and the CPI overstates actual inflation, benefits rise faster than the true cost of living each year. As a result, the purchasing power of senior citizens increases over time. They can buy more goods and services each year, giving a gradual improvement in their standard of living.",
    },
    {
      id: "cpi-e16", section: "short", sub: "Indexation", source: "Problem Set 2 Q7",
      prompt: "Older people consume more healthcare than younger people, and healthcare costs have risen faster than overall inflation. Describe how you would determine whether older people with CPI-indexed benefits are actually better off from year to year.",
      marks: 3,
      rubric: [
        { point: "Construct a price index specifically for senior citizens, giving greater weight to healthcare and other goods they buy more often", marks: 1 },
        { point: "Compare the rate of increase of this senior-specific index with that of the general CPI", marks: 1 },
        { point: "If the general CPI rises faster, seniors are better off (purchasing power rose); otherwise they are worse off", marks: 1 },
      ],
      model:
        "First, construct a cost-of-living index specifically for senior citizens, giving greater weight to healthcare and the other goods and services older people buy more often. Second, compare the rate of increase of this senior-specific index with the rate of increase of the general CPI, to which benefits are indexed. If the general CPI rises faster than the seniors' index, their benefits outpace their own cost of living and they are better off; otherwise they are worse off.",
    },
    {
      id: "cpi-e17", section: "short", sub: "Interest rates", source: "Problem Set 2 Q8",
      prompt: "A borrower and a lender agree on the nominal interest rate on a loan. Inflation then turns out higher than both expected. Explain the effect on the real interest rate and on the borrower and the lender.",
      marks: 3,
      rubric: [
        { point: "Real interest rate = nominal − inflation, so with higher inflation the real rate is lower than expected", marks: 1 },
        { point: "The borrower gains: the loan is repaid with dollars worth less than expected", marks: 1 },
        { point: "The lender loses: the purchasing power of the repayment is lower than expected", marks: 1 },
      ],
      model:
        "The real interest rate equals the nominal interest rate minus the inflation rate. With the nominal rate fixed and inflation higher than expected, the real interest rate is lower than expected. The borrower gains because the loan is repaid with dollars that are worth less than was expected. The lender loses because the purchasing power of what is repaid is lower than expected, e.g. banks that made fixed-rate mortgages in the 1960s were harmed by the high inflation of the 1970s.",
    },
    {
      id: "cpi-e18", section: "short", sub: "Indexation",
      prompt: "What is indexation? Give TWO examples of how the CPI is used for indexation.",
      marks: 3,
      rubric: [
        { point: "Indexation is the automatic correction by law or contract of a dollar amount for the effects of inflation", marks: 1 },
        { point: "Example 1, e.g. the CPI increase determines the COLA (cost-of-living allowance) in many multi-year labour contracts", marks: 1 },
        { point: "Example 2, e.g. adjustments in Social Security payments or federal income tax brackets", marks: 1 },
      ],
      model:
        "Indexation is the automatic correction, by law or contract, of a dollar amount for the effects of inflation. For example, the increase in the CPI automatically determines the cost-of-living allowance (COLA) in many multi-year labour contracts. It also automatically determines adjustments in Social Security payments and in federal income tax brackets.",
    },

    // ---------- tf
    {
      id: "cpi-e19", section: "tf", sub: "Problems with the CPI",
      prompt: "Because the CPI uses a fixed basket of goods, it understates increases in the cost of living.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: the CPI overstates increases in the cost of living", marks: 1 },
        { point: "Substitution bias: the fixed basket misses consumers switching to relatively cheaper goods", marks: 1 },
        { point: "New goods (and unmeasured quality change) make dollars more valuable, which the fixed basket misses", marks: 1 },
      ],
      model:
        "False. The fixed basket causes the CPI to overstate, not understate, increases in the cost of living. With substitution bias, consumers switch toward goods that have become relatively cheaper, softening the effect of price rises, but the fixed basket ignores this. Similarly, the introduction of new goods increases variety and makes dollars more valuable, which a fixed basket misses, and unmeasured quality change has the same upward bias.",
    },
    {
      id: "cpi-e20", section: "tf", sub: "CPI vs GDP deflator",
      prompt: "A rise in the price of imported consumer goods raises the CPI but not the GDP deflator.",
      tf: true,
      marks: 3,
      rubric: [
        { point: "States True", marks: 1 },
        { point: "The CPI covers goods and services bought by consumers, including imported ones", marks: 1 },
        { point: "The GDP deflator only covers goods and services currently produced domestically, so imports are excluded", marks: 1 },
      ],
      model:
        "True. The CPI measures the cost of a fixed basket of goods and services bought by the typical consumer, and imported consumer goods are part of that basket. The GDP deflator measures the prices of goods and services currently produced domestically, so imported goods are excluded from it. Therefore a rise in the price of imported consumer goods raises the CPI but not the GDP deflator.",
    },
    {
      id: "cpi-e21", section: "tf", sub: "CPI vs GDP deflator",
      prompt: "A rise in the price of domestically produced machinery bought by firms will raise the CPI.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "Machinery bought by firms is a capital good, which is excluded from the CPI basket of consumer goods", marks: 1 },
        { point: "It is included in the GDP deflator (produced domestically), so the deflator rises instead", marks: 1 },
      ],
      model:
        "False. Machinery bought by firms is a capital good, not part of the basket of goods and services bought by the typical consumer, so it is excluded from the CPI. Because it is produced domestically, it is included in the GDP deflator. The price rise would therefore show up in the GDP deflator but not in the CPI.",
    },
    {
      id: "cpi-e22", section: "tf", sub: "Interest rates",
      prompt: "If the nominal interest rate on a savings deposit is 5% and inflation is 7%, the purchasing power of the deposit rises over the year.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "Real interest rate = nominal − inflation = 5% − 7% = −2%", marks: 1 },
        { point: "The real rate is the growth in purchasing power, so purchasing power falls by about 2% even though the dollar value rises by 5%", marks: 1 },
      ],
      model:
        "False. The real interest rate is the nominal interest rate minus the inflation rate: 5% − 7% = −2%. The nominal rate measures growth in the dollar value of the deposit, which rises by 5%, but the real rate measures growth in its purchasing power. Since prices rise faster than the deposit, its purchasing power falls by 2%.",
    },
    {
      id: "cpi-e23", section: "tf", sub: "Interest rates", source: "Problem Set 2 Q8",
      prompt: "When inflation turns out higher than expected, people who borrowed at a fixed nominal interest rate gain at the expense of lenders.",
      tf: true,
      marks: 3,
      rubric: [
        { point: "States True", marks: 1 },
        { point: "Real interest rate = nominal − inflation, so higher-than-expected inflation makes the real rate lower than expected", marks: 1 },
        { point: "Borrowers repay with dollars worth less than expected, so they gain and lenders lose (e.g. 1960s fixed-rate mortgages in the 1970s)", marks: 1 },
      ],
      model:
        "True. The real interest rate equals the nominal rate minus inflation, so if inflation is higher than expected while the nominal rate is fixed, the real interest rate is lower than expected. Borrowers repay the loan with dollars that are worth less than expected, so they gain, while lenders receive less purchasing power and lose. For example, homeowners with fixed-rate mortgages from the 1960s benefited from the unexpectedly high inflation of the 1970s, while the lending banks were harmed.",
    },
    {
      id: "cpi-e24", section: "tf", sub: "Price indices",
      prompt: "Core CPI is the CPI with food and energy prices given extra weight.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False", marks: 1 },
        { point: "Core CPI measures the overall cost of consumer goods and services excluding food and energy", marks: 1 },
        { point: "Contrast with the CPI, which covers all goods and services bought by a typical consumer (including food and energy)", marks: 1 },
      ],
      model:
        "False. Core CPI is a measure of the overall cost of consumer goods and services excluding food and energy, so food and energy get no weight at all. The ordinary CPI measures the overall cost of all goods and services bought by a typical consumer, including food and energy. Core CPI is therefore the CPI with food and energy removed, not emphasised.",
    },
    {
      id: "cpi-e25", section: "tf", sub: "Comparing dollar figures", source: "Problem Set 2 Q6",
      prompt: "If the price of eggs rose by 186% while wages rose by 351%, workers' purchasing power in terms of eggs fell because eggs became more expensive.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: purchasing power in terms of eggs rose", marks: 1 },
        { point: "Wages rose by a larger percentage than the price of eggs", marks: 1 },
        { point: "Work time needed for a dozen eggs fell (e.g. from about 8.0 to 5.1 minutes)", marks: 1 },
      ],
      model:
        "False. What matters for purchasing power is the price of eggs relative to wages, not the dollar price alone. Wages rose by about 351%, much more than the 186% rise in egg prices. As a result, the time a worker needed to work to buy a dozen eggs fell from about 8.0 minutes in 1980 to 5.1 minutes in 2024, so purchasing power in terms of eggs rose.",
    },
    {
      id: "cpi-e26", section: "tf", sub: "Computing the CPI",
      prompt: "In the base year, the CPI is equal to 100.",
      tf: true,
      marks: 3,
      rubric: [
        { point: "States True", marks: 1 },
        { point: "CPI = basket's cost in current year ÷ basket's cost in base year × 100", marks: 1 },
        { point: "In the base year the numerator and denominator are the same cost, so CPI = 1 × 100 = 100; other years are measured relative to this benchmark", marks: 1 },
      ],
      model:
        "True. The CPI is calculated as the basket's cost in the current year divided by the basket's cost in the base year, multiplied by 100. In the base year, the current-year cost and base-year cost are the same, so the CPI = 1 × 100 = 100. The base year acts as the benchmark against which the cost of the basket in other years is compared.",
    },
    {
      id: "cpi-e27", section: "tf", sub: "Problems with the CPI", source: "Problem Set 2 Q5",
      prompt: "Increased personal computer purchases after a fall in their price is an example of the CPI problem called unmeasured quality change.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: it illustrates substitution bias", marks: 1 },
        { point: "Consumers substitute toward goods that have become relatively cheaper", marks: 1 },
        { point: "The fixed-basket CPI misses this substitution, so it overstates the rise in the cost of living (quality change is about better goods, e.g. airbags)", marks: 1 },
      ],
      model:
        "False. Buying more personal computers after their price falls is an example of substitution bias. Consumers substitute toward goods that have become relatively cheaper, which mitigates the effect of price increases on their cost of living. Because the CPI uses a fixed basket it misses this, and so overstates increases in the cost of living. Unmeasured quality change refers instead to improvements in the goods themselves, such as airbags in cars.",
    },
  ],
};

export default data;
