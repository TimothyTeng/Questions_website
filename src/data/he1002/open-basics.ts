import type { TopicData } from "@/lib/he1002/types";

// Lecture 11 — Open-Economy Macroeconomics: Basic Concepts (practice: Problem Set 11).

const data: TopicData = {
  id: "open-basics",

  // ---------------------------------------------------------------- content
  sections: [
    {
      title: "Why trade? Closed vs open economies",
      intro:
        "The U.S. has bought more from the world than it sells for over 40 years. Is that a problem? Keep the question in mind: it is answered after the saving–investment identity.",
      points: [
        {
          term: "Benefits of international trade",
          text: "Trade allows people to focus on what they do best and to consume goods and services from around the world.",
        },
        {
          term: "Comparative advantage",
          text: "Trade can raise living standards in all countries by allowing each country to specialise in producing the goods and services for which it has a comparative advantage.",
        },
        {
          term: "Closed economy",
          text: "An economy that does not interact with other economies in the world.",
        },
        {
          term: "Open economy",
          text: "An economy that interacts freely with other economies around the world: it buys and sells goods and services in world product markets, and buys and sells capital assets such as stocks and bonds in world financial markets.",
          eg: "Two flows to track: goods and services (exports/imports) and financial assets (net capital outflow).",
        },
      ],
    },
    {
      title: "The flow of goods: exports, imports, net exports",
      points: [
        { term: "Exports", text: "Goods and services that are produced domestically and sold abroad.", eg: "Students in Paris pay to watch a Hollywood movie: a U.S. export." },
        { term: "Imports", text: "Goods and services that are produced abroad and sold domestically.", eg: "Your uncle in the U.S. buys a new Audi: a U.S. import." },
        { term: "Net exports (NX) / trade balance", text: "The value of a country's exports minus the value of its imports." },
        { term: "Trade surplus", text: "NX > 0: exports are greater than imports, so the country sells more goods and services abroad than it buys from other countries." },
        { term: "Trade deficit", text: "NX < 0: imports are greater than exports, so the country sells fewer goods and services abroad than it buys from other countries." },
        { term: "Balanced trade", text: "Exports = imports, so NX = 0." },
        {
          term: "Increasing openness",
          text: "The lecture's chart of U.S. imports and exports shows the U.S. economy becoming increasingly open over time.",
        },
      ],
      formulas: [{ name: "Net exports (trade balance)", expr: "NX = Value of exports − Value of imports" }],
      table: [
        ["Situation", "Condition", "Meaning"],
        ["Trade surplus", "NX > 0", "Exports > imports"],
        ["Balanced trade", "NX = 0", "Exports = imports"],
        ["Trade deficit", "NX < 0", "Exports < imports"],
      ],
      worked: [
        {
          problem:
            "(Problem Set 11 Q1) How do these affect U.S. exports, imports and net exports? (a) An American art professor spends the summer touring museums in Europe. (b) Students in Paris flock to see the latest Hollywood movie. (c) Your uncle buys a new Audi. (d) The student bookstore at Oxford University in England sells a copy of a U.S. textbook. (e) A Canadian citizen shops at a store in northern Vermont to avoid Canadian sales taxes.",
          solution:
            "(a) The professor buys services produced abroad: imports increase, exports unchanged, NX decreases.\n(b) Foreigners buy a U.S.-made service: exports increase, imports unchanged, NX increases.\n(c) An Audi is made abroad and sold in the U.S.: imports increase, NX decreases.\n(d) A U.S.-produced good sold abroad: exports increase, NX increases.\n(e) A foreigner buys goods produced in the U.S.: exports increase, NX increases.",
        },
      ],
    },
    {
      title: "Factors that influence net exports",
      intro: "Factors that might influence a country's exports, imports and net exports:",
      points: [
        { term: "Tastes", text: "Consumers' tastes for foreign and domestic goods." },
        { term: "Prices", text: "Prices of goods at home and abroad." },
        { term: "Exchange rates", text: "The rate at which currencies (and so goods) trade for one another." },
        { term: "Incomes", text: "Incomes of consumers at home and abroad." },
        { term: "Transportation costs", text: "The cost of moving goods between countries." },
        { term: "Government policies", text: "Government policies toward international trade." },
      ],
    },
    {
      title: "The flow of financial resources: net capital outflow",
      points: [
        {
          term: "Net capital outflow (NCO) / net foreign investment",
          text: "The purchase of foreign assets by domestic residents minus the purchase of domestic assets by foreigners. NCO measures the imbalance in a country's trade in assets.",
        },
        {
          term: "Foreign direct investment (FDI)",
          text: "Domestic residents own and run the business abroad. The investor's role is active (manages the operation); more likely done by a corporation.",
          eg: "A U.S. cell phone company establishes an office in the Czech Republic.",
        },
        {
          term: "Foreign portfolio investment (FPI)",
          text: "Domestic residents buy foreign stocks or bonds, but do not run the firm. The investor's role is passive (just holds financial assets); more likely done by an individual investor.",
          eg: "A U.S. pension fund buys shares in Harrods of London.",
        },
        {
          term: "Capital outflow (NCO > 0)",
          text: "Domestic purchases of foreign assets exceed foreign purchases of domestic assets.",
        },
        {
          term: "Capital inflow (NCO < 0)",
          text: "Foreign purchases of domestic assets exceed domestic purchases of foreign assets.",
        },
      ],
      formulas: [
        {
          name: "Net capital outflow",
          expr: "NCO = Purchases of foreign assets by domestic residents − Purchases of domestic assets by foreigners",
        },
      ],
      table: [
        ["", "Foreign direct investment", "Foreign portfolio investment"],
        ["Definition", "Domestic residents own and run the business abroad", "Domestic residents buy foreign stocks or bonds but do not run the firm"],
        ["Investor's role", "Active: manages the operation", "Passive: just holds financial assets"],
        ["Example", "Opening a retail store or building a factory abroad", "Buying stock or bonds of a foreign company"],
        ["More likely by", "A corporation", "An individual investor"],
      ],
      worked: [
        {
          problem:
            "(Problem Set 11 Q4) Effect on U.S. NCO, and FDI or FPI? (a) A U.S. cell phone company establishes an office in the Czech Republic. (b) Harrods of London sells stock to the General Motors pension fund. (c) Honda expands its factory in Marysville, Ohio. (d) A Fidelity mutual fund sells its Toyota stock to a French investor.",
          solution:
            "(a) A U.S. firm acquires capital abroad: NCO increases; FDI.\n(b) A U.S. fund buys a foreign asset: NCO increases; FPI.\n(c) A foreign firm acquires capital in the U.S.: NCO decreases; FDI.\n(d) A U.S. fund sells a foreign asset: NCO decreases; FPI.",
        },
      ],
    },
    {
      title: "Variables that influence NCO",
      points: [
        { term: "Foreign real interest rates", text: "Real interest rates paid on foreign assets." },
        { term: "Domestic real interest rates", text: "Real interest rates paid on domestic assets." },
        { term: "Perceived risks", text: "Perceived economic and political risks of holding foreign assets." },
        { term: "Government policies", text: "Government policies affecting foreign ownership of domestic assets." },
      ],
    },
    {
      title: "The equality of NX and NCO",
      points: [
        {
          term: "NX = NCO (an accounting identity)",
          text: "Every international transaction is a swap (goods for assets, or assets for assets), so anything that changes NX changes NCO by the same amount.",
        },
        {
          term: "A foreigner buys a U.S. good",
          text: "U.S. exports and NX increase. The foreigner pays with currency or assets, so the U.S. acquires some foreign assets, causing NCO to rise.",
        },
        {
          term: "A U.S. citizen buys foreign goods",
          text: "U.S. imports rise and NX falls. The U.S. buyer pays with U.S. dollars or assets, so the other country acquires U.S. assets, causing U.S. NCO to fall.",
        },
      ],
      formulas: [{ name: "Identity", expr: "NX = NCO" }],
      table: [
        ["Kiara (U.S.) sells a website to Sophia (Germany) for 5,000 euros, then…", "NX", "NCO", "Why"],
        ["A. Keeps the 5,000 euros at home", "Rises 5,000", "Rises 5,000", "A U.S. resident now holds a foreign asset: euros"],
        ["B. Buys 5,000 euros of German stock", "Rises 5,000", "Rises 5,000", "A U.S. resident now holds a foreign asset: German shares"],
        ["C. Spends 5,000 euros on German shoes", "No change", "No change", "The shoe import offsets the website export; no assets change hands"],
        ["D. Exchanges the 5,000 euros for dollars", "Rises 5,000", "Rises 5,000", "The U.S. bank now holds the euros (a foreign asset); any later change in NX is matched by NCO"],
      ],
      worked: [
        {
          problem:
            "(Problem Set 11 Q2) Is each transaction in U.S. NX or U.S. NCO, and does it rise or fall? (a) An American buys a Sony TV. (b) An American buys a share of Sony stock. (c) The Sony pension fund buys a bond from the U.S. Treasury. (d) A worker at a Sony plant in Japan buys Georgia peaches from an American farmer.",
          solution:
            "(a) Net exports, decrease (U.S. imports rise).\n(b) Net capital outflow, increase (a U.S. resident buys a foreign asset).\n(c) Net capital outflow, decrease (a foreigner buys a U.S. asset).\n(d) Net exports, increase (U.S. exports rise).",
        },
      ],
    },
    {
      title: "Saving, investment and net capital outflow",
      points: [
        {
          term: "Saving = domestic investment + net capital outflow",
          text: "Each dollar saved funds capital at home (I) or buys assets abroad (NCO).",
        },
        {
          term: "Trade deficit",
          text: "NX < 0, Y < C + I + G, NCO < 0 and S < I: a net capital inflow — the country sells assets abroad to pay for its extra imports.",
        },
        { term: "Balanced trade", text: "NX = 0, Y = C + I + G, NCO = 0 and S = I." },
        {
          term: "Trade surplus",
          text: "NX > 0, Y > C + I + G, NCO > 0 and S > I: a net capital outflow — the country uses the foreign currency it earns to buy foreign assets.",
        },
      ],
      formulas: [
        { name: "Open-economy GDP", expr: "Y = C + I + G + NX" },
        { name: "National saving", expr: "S = Y − C − G" },
        { name: "Subtract C and G from both sides", expr: "Y − C − G = I + NX, so S = I + NX" },
        { name: "Saving–investment identity (open economy)", expr: "S = I + NCO", note: "Because NX = NCO. Rearranged: NCO = S − I." },
      ],
      table: [
        ["", "Trade deficit", "Balanced trade", "Trade surplus"],
        ["Exports vs imports", "Exports < Imports", "Exports = Imports", "Exports > Imports"],
        ["Net exports", "NX < 0", "NX = 0", "NX > 0"],
        ["Output vs spending", "Y < C + I + G", "Y = C + I + G", "Y > C + I + G"],
        ["Net capital outflow", "NCO < 0 (net capital inflow)", "NCO = 0", "NCO > 0 (net capital outflow)"],
        ["Saving vs investment", "S < I", "S = I", "S > I"],
      ],
      worked: [
        {
          problem: "An economy has Y = $20,000bn, C = $13,000bn, G = $3,500bn and domestic investment I = $4,000bn. Find national saving, NCO and NX.",
          solution:
            "S = Y − C − G = 20,000 − 13,000 − 3,500 = $3,500bn\nS = I + NCO, so NCO = S − I = 3,500 − 4,000 = −$500bn (a net capital inflow)\nNX = NCO = −$500bn: a trade deficit, with S < I.",
        },
      ],
    },
    {
      title: "Is the U.S. trade deficit a national problem?",
      points: [
        {
          term: "It depends on why saving fell short of investment",
          text: "The extra capital stock from the 1990s investment boom may well yield large returns. The fall in saving of the 1980s and 2000s, while not desirable, at least did not depress domestic investment, since firms could borrow from abroad.",
        },
        {
          term: "Good or bad debt",
          text: "A country, like a person, can go into debt for good reasons or bad ones.",
        },
        {
          term: "Symptom, not necessarily a problem",
          text: "A trade deficit is not necessarily a problem, but might be a symptom of a problem, such as low national saving, excessive government borrowing or unsustainable consumption.",
        },
        {
          term: "U.S. saving, investment and NCO, 1960–2024",
          text: "The lecture's chart plots U.S. domestic investment, national saving and net capital outflow; when saving falls below investment, NCO becomes negative.",
        },
      ],
    },
    {
      title: "The nominal exchange rate",
      points: [
        {
          term: "Nominal exchange rate (e)",
          text: "The rate at which a person can trade the currency of one country for the currency of another.",
        },
        {
          term: "Convention",
          text: "All exchange rates are expressed as foreign currency per unit of domestic currency.",
          eg: "Per US$1 (16 Oct 2026): 1.42 Canadian dollars, 0.89 euro, 158.00 yen, 18.50 Mexican pesos, 1.28 Singapore dollars.",
        },
        {
          term: "Appreciation (strengthening)",
          text: "An increase in the value of a currency, as measured by the amount of foreign currency it can buy.",
          eg: "The dollar goes from 150 to 160 yen per dollar.",
        },
        {
          term: "Depreciation (weakening)",
          text: "A decrease in the value of a currency, as measured by the amount of foreign currency it can buy.",
          eg: "The dollar goes from 160 to 150 yen per dollar.",
        },
      ],
      table: [
        ["If the U.S. dollar appreciates…", "Happy or unhappy?", "Why"],
        ["Dutch pension funds holding U.S. government bonds", "Happy", "Each dollar of interest and principal converts into more euros"],
        ["U.S. manufacturing industries", "Unhappy", "U.S. goods cost more in foreign currency: exports fall and imports compete harder"],
        ["Australian tourists planning a U.S. trip", "Unhappy", "Each Australian dollar buys fewer U.S. dollars, so the trip costs more"],
        ["A U.S. firm buying property overseas", "Happy", "Each dollar buys more foreign currency, so the property costs fewer dollars"],
      ],
    },
    {
      title: "The real exchange rate",
      points: [
        {
          term: "Real exchange rate",
          text: "The rate at which a person can trade the goods and services of one country for the goods and services of another.",
        },
        {
          term: "For the economy as a whole",
          text: "The real exchange rate is the price of a domestic basket of goods relative to the price of a foreign basket of goods, with P = domestic price level (e.g. the Consumer Price Index) and P* = foreign price level.",
        },
        {
          term: "Real appreciation and NX",
          text: "If the U.S. real exchange rate appreciates, U.S. goods become more expensive relative to foreign goods, so U.S. exports fall, imports rise and NX falls.",
        },
      ],
      formulas: [
        {
          name: "Real exchange rate",
          expr: "Real exchange rate = e × P ÷ P*",
          note: "e = nominal exchange rate (foreign currency per unit of domestic currency); P = domestic price (in domestic currency); P* = foreign price (in foreign currency).",
        },
      ],
      worked: [
        {
          problem: "(Lecture example) A Big Mac costs $4 in the U.S. and 380 yen in Japan. The exchange rate is 110 yen per dollar. Compute the real exchange rate.",
          solution:
            "e × P = price in yen of a U.S. Big Mac = 110 × 4 = 440 yen\nReal exchange rate = e × P ÷ P* = 440 ÷ 380 = 1.16 Japanese Big Macs per U.S. Big Mac\nOne U.S. Big Mac has the purchasing power of 1.16 Japanese Big Macs: Japanese Big Macs are relatively cheap and U.S. Big Macs relatively expensive.",
        },
        {
          problem:
            "(Problem Set 11 Q6) What happens to the U.S. real exchange rate? (a) e unchanged, prices rise faster in the U.S. than abroad. (b) e unchanged, prices rise faster abroad. (c) e declines, prices unchanged everywhere. (d) e declines and prices rise faster abroad.",
          solution:
            "Use real exchange rate = e × P ÷ P*.\n(a) Rises: P rises relative to P*, so U.S. goods become relatively more expensive.\n(b) Falls: P* rises relative to P, so U.S. goods become relatively cheaper.\n(c) Falls: e falls while P and P* are constant.\n(d) Falls: e falls and P ÷ P* also falls, so both push the real exchange rate down.",
        },
      ],
    },
    {
      title: "Purchasing-power parity and the law of one price",
      points: [
        {
          term: "Purchasing-power parity (PPP)",
          text: "A theory of exchange rates that says a unit of any given currency should be able to buy the same quantity of goods in all countries.",
        },
        { term: "Law of one price", text: "A good should sell for the same price in all locations. PPP is based on it." },
        {
          term: "Arbitrage",
          text: "Taking advantage of price differences for the same item in different markets.",
          eg: "Buying coffee beans where they are cheap and selling them where they are dear.",
        },
        {
          term: "PPP in words",
          text: "A currency must have the same purchasing power in all countries: a U.S. dollar must buy the same quantity of goods in the U.S. and Japan, and a yen must buy the same quantity of goods in Japan and the U.S. A unit of a currency must have the same real value in every country.",
        },
      ],
      worked: [
        {
          problem:
            "(Lecture example) Coffee beans sell for $4 per pound in Seattle and $5 per pound in Boston, and can be costlessly transported. How do the two markets reach equilibrium?",
          solution:
            "There is an arbitrage opportunity: buy coffee in Seattle and sell it in Boston for a quick profit.\nSeattle: increased demand drives the price up.\nBoston: increased supply drives the price down.\nThis continues until the two prices are equal (the law of one price).",
        },
      ],
    },
    {
      title: "Implications of PPP",
      points: [
        {
          term: "Deriving the PPP exchange rate",
          text: "At home, $1 buys 1/P goods. Abroad, $1 converts to e units of foreign currency, which buy e/P* goods. PPP sets these equal: 1/P = e/P*, so e = P*/P.",
        },
        {
          term: "Real exchange rate under PPP",
          text: "The real exchange rate e × P ÷ P* = 1 and cannot change.",
        },
        {
          term: "Nominal exchange rate reflects price levels",
          text: "Under PPP the nominal exchange rate must reflect the price levels in the two countries, so nominal exchange rates change when price levels change.",
        },
        {
          term: "Printing money",
          text: "When a central bank prints large quantities of money, that money loses value both in terms of the goods and services it can buy (the domestic price level rises) and in terms of the amount of other currencies it can buy (the currency depreciates).",
          eg: "If inflation in Mexico is higher than in the U.S., P* rises faster than P, so e (pesos per $) rises: the peso depreciates against the dollar.",
        },
      ],
      formulas: [
        { name: "PPP condition", expr: "1 ÷ P = e ÷ P*" },
        { name: "PPP nominal exchange rate", expr: "e = P* ÷ P", note: "Foreign currency per unit of domestic currency = foreign price ÷ domestic price." },
        { name: "Real exchange rate under PPP", expr: "e × P ÷ P* = 1" },
        { name: "Rule of 70 (used in Problem Set 11 Q9)", expr: "Years to double ≈ 70 ÷ growth rate (%)" },
        { name: "Fisher effect (used in Problem Set 11 Q9)", expr: "Nominal interest rate = Real interest rate + Inflation" },
      ],
      worked: [
        {
          problem:
            "(Problem Set 11 Q7) A can of soda costs $1.25 in the U.S. and 25 pesos in Mexico. What is the peso–dollar exchange rate under PPP? If a monetary expansion doubles all Mexican prices so a soda costs 50 pesos, what happens?",
          solution:
            "e = P* ÷ P = 25 ÷ 1.25 = 20 pesos per dollar.\nAfter Mexican prices double: e = 50 ÷ 1.25 = 40 pesos per dollar.\nThe exchange rate doubles: the peso depreciates (each dollar buys twice as many pesos), exactly offsetting the doubling of Mexican prices.",
        },
        {
          problem:
            "(Problem Set 11 Q9) PPP holds between Ectenia and Wiknam, where the only good is Spam. A can costs 4 dollars in Ectenia and 24 pesos in Wiknam. (a) Exchange rate? (b) Inflation will be 3.5% a year in Ectenia and 7% a year in Wiknam for 20 years: price of Spam and exchange rate then? (c) Which country has the higher nominal interest rate? (d) Problem with borrowing in the low-rate country and investing in the high-rate one?",
          solution:
            "(a) e = 24 ÷ 4 = 6 Wiknamian pesos per Ectenian dollar.\n(b) Rule of 70: Ectenian prices double every 70 ÷ 3.5 = 20 years, so Spam costs 4 × 2 = 8 dollars. Wiknamian prices double every 70 ÷ 7 = 10 years (twice in 20 years), so Spam costs 24 × 4 = 96 pesos. e = 96 ÷ 8 = 12 pesos per dollar: it doubles and the peso depreciates.\n(c) Wiknam. By the Fisher effect, nominal rate = real rate + inflation; with similar real rates, Wiknam's nominal rate is about 3.5 percentage points higher.\n(d) It ignores the exchange rate: under PPP the peso depreciates about 3.5% a year, so the extra peso interest converts back into fewer dollars. Profits need a difference in real, not nominal, interest rates.",
        },
      ],
    },
    {
      title: "Limitations and usefulness of PPP",
      points: [
        {
          term: "Limitation 1: goods not easily traded",
          text: "Many goods are not easily traded, so price differences on such goods cannot be arbitraged away.",
        },
        {
          term: "Limitation 2: imperfect substitutes",
          text: "Even tradable goods are not always perfect substitutes when they are produced in different countries; price differences reflect taste differences.",
        },
        {
          term: "Where PPP works well",
          text: "Large and persistent movements in nominal exchange rates typically reflect changes in price levels at home and abroad.",
          eg: "German hyperinflation, 1921–1924: the exchange rate (U.S. cents per mark) collapsed in step with the rise in German prices.",
        },
        {
          term: "Big Mac inputs",
          text: "A Big Mac contains tradable inputs (beef, potatoes, packaging, machinery) and non-tradable inputs (local labour, restaurant rent, utilities). PPP works best when countries have similar costs for the non-tradable components.",
        },
      ],
      formulas: [
        { name: "Predicted (PPP) exchange rate", expr: "Predicted e = P* ÷ P (local currency per U.S. dollar)" },
        { name: "Price in U.S. dollars at market rates", expr: "Price in $ = Local price ÷ Actual exchange rate" },
      ],
      table: [
        ["Country", "Big Mac price", "Predicted e (P* ÷ $5.69)", "Actual e", "Big Mac in US$"],
        ["Chile", "4,290 pesos", "754 pesos/$", "945 pesos/$", "$4.54"],
        ["Hungary", "1,420 forints", "249.6 forints/$", "364 forints/$", "$3.90"],
        ["Czech Republic", "109 korunas", "19.2 korunas/$", "23.5 korunas/$", "$4.64"],
        ["Brazil", "23.9 real", "4.20 real/$", "5.65 real/$", "$4.23"],
        ["Canada", "7.62 C$", "1.34 C$/$", "1.38 C$/$", "$5.52"],
        ["United States", "$5.69", "—", "—", "$5.69"],
      ],
      worked: [
        {
          problem:
            "(Problem Set 11 Q8) A Big Mac costs $5.69 in the U.S., 4,290 pesos in Chile and 7.62 C$ in Canada. Actual rates: 945 pesos/$ and 1.38 C$/$. (a) Predicted peso–dollar rate? (b) Predicted and actual Chilean pesos per Canadian dollar? (c) How well does PPP do?",
          solution:
            "(a) Predicted e = 4,290 ÷ 5.69 ≈ 754 pesos per dollar (actual 945).\n(b) Predicted = 4,290 ÷ 7.62 ≈ 563 Chilean pesos per C$. Actual = 945 ÷ 1.38 ≈ 685 pesos per C$. The actual rate is above the prediction: the peso is undervalued against the C$, so a Big Mac is cheaper in Chile (4,290 ÷ 945 ≈ $4.54) than in Canada (7.62 ÷ 1.38 ≈ $5.52) at market exchange rates.\n(c) Reasonably well: Canada's prediction (1.34) is very close to the actual 1.38, but for Chile, Hungary, Brazil and the Czech Republic the gaps are much larger.",
        },
      ],
    },
  ],

  // ---------------------------------------------------------------- flashcards
  flashcards: [
    { id: "open-basics-c1", type: "concept", front: "An economy that does not interact with other economies in the world.", back: "Closed economy", why: "The opposite is an open economy, which trades goods and assets with the world." },
    { id: "open-basics-c2", type: "concept", front: "An economy that interacts freely with other economies, buying and selling goods and services in world product markets and capital assets in world financial markets.", back: "Open economy", why: "It has two international flows: goods and services, and financial assets such as stocks and bonds." },
    { id: "open-basics-c3", type: "concept", front: "Goods and services that are produced domestically and sold abroad.", back: "Exports", why: "E.g. students in Paris watching a Hollywood movie is a U.S. export." },
    { id: "open-basics-c4", type: "concept", front: "Goods and services that are produced abroad and sold domestically.", back: "Imports", why: "E.g. an American buying a Sony TV is a U.S. import." },
    { id: "open-basics-c5", type: "concept", front: "The value of a country's exports minus the value of its imports (also called the trade balance).", back: "Net exports / NX", why: "NX > 0 is a surplus, NX < 0 a deficit, NX = 0 balanced trade." },
    { id: "open-basics-c6", type: "concept", front: "The situation when exports are greater than imports, so NX > 0.", back: "Trade surplus", why: "The country sells more goods and services abroad than it buys from other countries." },
    { id: "open-basics-c7", type: "concept", front: "The situation when imports are greater than exports, so NX < 0.", back: "Trade deficit", why: "The country sells fewer goods and services abroad than it buys; the U.S. has been in this position for over 40 years." },
    { id: "open-basics-c8", type: "concept", front: "The situation when exports exactly equal imports.", back: "Balanced trade", why: "NX = 0, so NCO = 0 and S = I." },
    { id: "open-basics-c9", type: "concept", front: "The purchase of foreign assets by domestic residents minus the purchase of domestic assets by foreigners.", back: "Net capital outflow / NCO / net foreign investment", why: "It measures the imbalance in a country's trade in assets." },
    { id: "open-basics-c10", type: "concept", front: "Investment abroad in which domestic residents own and run the business.", back: "Foreign direct investment / FDI", why: "Active role, more likely by a corporation, e.g. building a factory abroad." },
    { id: "open-basics-c11", type: "concept", front: "Investment abroad in which domestic residents buy foreign stocks or bonds but do not run the firm.", back: "Foreign portfolio investment / FPI", why: "Passive role, more likely by an individual investor." },
    { id: "open-basics-c12", type: "concept", front: "The name for NCO > 0, when domestic purchases of foreign assets exceed foreign purchases of domestic assets.", back: "Capital outflow", why: "A country with a trade surplus has a net capital outflow." },
    { id: "open-basics-c13", type: "concept", front: "The name for NCO < 0, when foreign purchases of domestic assets exceed domestic purchases of foreign assets.", back: "Capital inflow", why: "A country with a trade deficit sells assets abroad to pay for its extra imports." },
    { id: "open-basics-c14", type: "concept", front: "The accounting identity that holds because every international transaction is a swap of goods for assets or assets for assets.", back: "NX = NCO", why: "Anything that changes net exports changes net capital outflow by the same amount." },
    { id: "open-basics-c15", type: "concept", front: "The open-economy identity saying saving equals domestic investment plus net capital outflow.", back: "S = I + NCO", why: "Each dollar saved funds capital at home or buys assets abroad." },
    { id: "open-basics-c16", type: "concept", front: "Y − C − G: income left after consumption and government purchases.", back: "National saving", why: "In an open economy it equals I + NX, and so I + NCO." },
    { id: "open-basics-c17", type: "concept", front: "The rate at which a person can trade the currency of one country for the currency of another.", back: "Nominal exchange rate", why: "Expressed as foreign currency per unit of domestic currency, e.g. 158 yen per US$1." },
    { id: "open-basics-c18", type: "concept", front: "An increase in the value of a currency as measured by the amount of foreign currency it can buy.", back: "Appreciation / strengthening", why: "E.g. the dollar moving from 150 to 160 yen per dollar." },
    { id: "open-basics-c19", type: "concept", front: "A decrease in the value of a currency as measured by the amount of foreign currency it can buy.", back: "Depreciation / weakening", why: "E.g. the peso when Mexico's central bank prints large quantities of money." },
    { id: "open-basics-c20", type: "concept", front: "The rate at which a person can trade the goods and services of one country for the goods and services of another; equals e × P ÷ P*.", back: "Real exchange rate", why: "In the Big Mac example it was 1.16 Japanese Big Macs per U.S. Big Mac." },
    { id: "open-basics-c21", type: "concept", front: "A theory of exchange rates saying a unit of any given currency should be able to buy the same quantity of goods in all countries.", back: "Purchasing-power parity / PPP", why: "It implies e = P* ÷ P and a real exchange rate of 1." },
    { id: "open-basics-c22", type: "concept", front: "The principle that a good should sell for the same price in all locations.", back: "Law of one price", why: "Purchasing-power parity is based on it." },
    { id: "open-basics-c23", type: "concept", front: "Taking advantage of price differences for the same item in different markets.", back: "Arbitrage", why: "Buying coffee at $4 in Seattle to sell at $5 in Boston pushes the two prices together." },
    { id: "open-basics-c24", type: "concept", front: "What trade lets each country specialise in, raising living standards in all countries: producing the goods for which it has this.", back: "Comparative advantage", why: "One of the benefits of international trade in the lecture introduction." },
    { id: "open-basics-c25", type: "concept", front: "The first limitation of PPP: price differences on these goods cannot be arbitraged away.", back: "Goods not easily traded / non-tradable goods", why: "E.g. the local labour and rent that go into a Big Mac." },
    { id: "open-basics-c26", type: "concept", front: "The second limitation of PPP: even tradable goods produced in different countries are not always these, so price differences reflect taste differences.", back: "Perfect substitutes", why: "E.g. buyers may not see a car made in one country as identical to one made in another." },
    { id: "open-basics-c27", type: "concept", front: "The 1921–1924 episode the lecture uses to show PPP works well for large and persistent exchange-rate movements.", back: "German hyperinflation", why: "The exchange rate moved in step with the huge rise in German prices." },
    { id: "open-basics-c28", type: "concept", front: "Under PPP, the value of the real exchange rate, which cannot change.", back: "One / 1", why: "With e = P* ÷ P, e × P ÷ P* = 1." },
    { id: "open-basics-c29", type: "concept", front: "The quick rule used in Problem Set 11 to find how long a price level takes to double: divide 70 by the growth rate.", back: "Rule of 70", why: "Prices growing 7% a year double every 70 ÷ 7 = 10 years." },
    { id: "open-basics-c30", type: "concept", front: "The relationship nominal interest rate = real interest rate + inflation, used to compare two countries' nominal interest rates.", back: "Fisher effect", why: "With similar real rates, the higher-inflation country has the higher nominal rate." },

    { id: "open-basics-c31", type: "scenario", front: "A Japanese firm buys shares in a U.S. company. What happens to U.S. NCO, and what type of investment is it?", back: "U.S. NCO falls; foreign portfolio investment", why: "NCO = domestic purchases of foreign assets − foreign purchases of domestic assets. A foreigner buying a U.S. asset raises the second term, so NCO falls (a capital inflow). Buying shares without running the firm is portfolio investment." },
    { id: "open-basics-c32", type: "scenario", front: "An American art professor spends the summer touring museums in Europe. What happens to U.S. exports, imports and NX?", back: "Imports rise, exports unchanged, NX falls", why: "She buys services produced abroad, which are U.S. imports. NX = exports − imports, so NX decreases." },
    { id: "open-basics-c33", type: "scenario", front: "A Canadian citizen shops at a store in northern Vermont to avoid Canadian sales taxes. What happens to U.S. NX?", back: "U.S. exports rise, so NX rises", why: "Goods produced in the U.S. are sold to a foreigner: an export, even though the sale happens in the U.S." },
    { id: "open-basics-c34", type: "scenario", front: "A U.S. cell phone company establishes an office in the Czech Republic. Effect on U.S. NCO, and FDI or FPI?", back: "NCO rises; foreign direct investment", why: "A U.S. firm acquires capital abroad, raising domestic purchases of foreign assets. It owns and runs the business, so it is direct investment." },
    { id: "open-basics-c35", type: "scenario", front: "A Fidelity (U.S.) mutual fund sells its Toyota stock to a French investor. What happens to U.S. NCO?", back: "NCO falls (portfolio investment)", why: "A U.S. fund sells a foreign asset, reducing U.S. holdings of foreign assets, so net capital outflow decreases. Holding shares without running the firm is portfolio investment." },
    { id: "open-basics-c36", type: "scenario", front: "A U.S. designer sells a website to a German buyer for 5,000 euros and swaps the euros for dollars at a U.S. bank. What happens to U.S. NX and NCO?", back: "Both rise by 5,000 euros", why: "The website is an export, so NX rises. The U.S. bank now holds the 5,000 euros (a foreign asset), so NCO rises by the same amount: NX = NCO." },
    { id: "open-basics-c37", type: "scenario", front: "The same designer spends her 5,000 euros on German shoes instead. What happens to U.S. NX and NCO?", back: "No change in either", why: "The shoe import offsets the website export, so NX is unchanged; no assets change hands, so NCO is unchanged." },
    { id: "open-basics-c38", type: "scenario", front: "A country saves $400bn and invests $300bn at home. What are its NCO and NX, and does it have a trade surplus or deficit?", back: "NCO = NX = $100bn; trade surplus", why: "S = I + NCO, so NCO = 400 − 300 = 100. NX = NCO = 100 > 0, a trade surplus: the country uses the foreign currency it earns to buy foreign assets." },
    { id: "open-basics-c39", type: "scenario", front: "The U.S. nominal exchange rate is unchanged but prices rise faster abroad than in the U.S. What happens to the U.S. real exchange rate?", back: "It falls", why: "Real exchange rate = e × P ÷ P*. With e constant and P* rising relative to P, the ratio falls: U.S. goods become relatively cheaper." },
    { id: "open-basics-c40", type: "scenario", front: "A coffee costs $5 in the U.S. and 600 yen in Japan; the exchange rate is 150 yen per dollar. What is the real exchange rate?", back: "1.25", why: "e × P = 150 × 5 = 750 yen; real exchange rate = 750 ÷ 600 = 1.25 Japanese coffees per U.S. coffee, so U.S. coffee is relatively expensive." },
    { id: "open-basics-c41", type: "scenario", front: "A soda costs $2 in the U.S. and 30 pesos in Mexico. If PPP holds, what is the exchange rate in pesos per dollar?", back: "15 pesos per dollar", why: "Under PPP e = P* ÷ P = 30 ÷ 2 = 15, so $1 buys the same amount of soda in both countries." },
    { id: "open-basics-c42", type: "scenario", front: "Inflation in Mexico is higher than in the U.S. According to PPP, what happens to the peso?", back: "The peso depreciates (pesos per $ rises)", why: "Under PPP e = P* ÷ P. P* (Mexican prices) rises faster than P, so e in pesos per dollar rises: each dollar buys more pesos." },
    { id: "open-basics-c43", type: "scenario", front: "The U.S. dollar appreciates. Would an Australian tourist planning a U.S. trip be happy or unhappy?", back: "Unhappy", why: "Each Australian dollar buys fewer U.S. dollars, so the trip becomes more expensive." },
  ],

  // ---------------------------------------------------------------- quiz
  quiz: [
    { id: "open-basics-q1", kind: "fill", sub: "Open vs closed", prompt: "An economy that does not interact with other economies in the world is a ____ economy.", answers: [["closed"]], explain: "A closed economy has no international trade in goods or assets." },
    { id: "open-basics-q2", kind: "fill", sub: "Open vs closed", prompt: "An economy that interacts freely with other economies around the world is an ____ economy.", answers: [["open"]], explain: "An open economy buys and sells goods in world product markets and assets in world financial markets." },
    { id: "open-basics-q3", kind: "fill", sub: "Open vs closed", prompt: "An open economy buys and sells capital assets such as stocks and bonds in world ____ markets.", answers: [["financial"]], explain: "Goods are traded in world product markets; assets in world financial markets." },
    { id: "open-basics-q4", kind: "fill", sub: "Benefits of trade", prompt: "Trade can raise living standards by letting each country specialise in producing the goods for which it has a ____.", answers: [["comparative advantage"]], explain: "Specialising by comparative advantage is the lecture's reason trade benefits all countries." },
    { id: "open-basics-q5", kind: "fill", sub: "Flow of goods", prompt: "Goods and services that are produced domestically and sold abroad are called ____.", answers: [["exports", "export"]], explain: "Exports are produced at home and sold to foreigners." },
    { id: "open-basics-q6", kind: "fill", sub: "Flow of goods", prompt: "Goods and services that are produced abroad and sold domestically are called ____.", answers: [["imports", "import"]], explain: "Imports are produced abroad and bought by domestic residents." },
    { id: "open-basics-q7", kind: "fill", sub: "Flow of goods", prompt: "Net exports, also called the ____, equal the value of exports minus the value of imports.", answers: [["trade balance", "balance of trade"]], explain: "NX = exports − imports is the trade balance." },
    { id: "open-basics-q8", kind: "fill", sub: "Trade surplus/deficit", prompt: "When exports are greater than imports (NX > 0), the country has a trade ____.", answers: [["surplus"]], explain: "It sells more goods and services abroad than it buys." },
    { id: "open-basics-q9", kind: "fill", sub: "Trade surplus/deficit", prompt: "When imports are greater than exports (NX < 0), the country has a trade ____.", answers: [["deficit"]], explain: "It sells fewer goods and services abroad than it buys." },
    { id: "open-basics-q10", kind: "fill", sub: "Trade surplus/deficit", prompt: "When exports equal imports, the country has ____ trade.", answers: [["balanced"]], explain: "Balanced trade means NX = 0." },
    { id: "open-basics-q11", kind: "fill", sub: "Net exports", prompt: "A country exports $640 billion and imports $710 billion of goods and services. Its net exports are $____ billion.", answers: [["-70"]], explain: "NX = 640 − 710 = −70: a trade deficit of $70 billion." },
    { id: "open-basics-q12", kind: "fill", sub: "Factors influencing NX", prompt: "Factors influencing NX include tastes, prices at home and abroad, exchange rates, incomes at home and abroad, ____ costs, and government policies toward international trade.", answers: [["transportation", "transport"]], explain: "The lecture lists six factors; transportation costs is one of them." },
    { id: "open-basics-q13", kind: "fill", sub: "Factors influencing NX", prompt: "One factor influencing net exports is the ____ of consumers at home and abroad.", answers: [["incomes", "income"]], explain: "Incomes at home and abroad affect how much people buy of foreign and domestic goods." },
    { id: "open-basics-q14", kind: "fill", sub: "Net capital outflow", prompt: "Net capital outflow is also called net ____ investment.", answers: [["foreign"]], explain: "NCO = net foreign investment." },
    { id: "open-basics-q15", kind: "fill", sub: "Net capital outflow", prompt: "NCO = purchases of foreign assets by domestic residents minus purchases of ____ assets by foreigners.", answers: [["domestic"]], explain: "NCO measures the imbalance in a country's trade in assets." },
    { id: "open-basics-q16", kind: "fill", sub: "FDI vs FPI", prompt: "When domestic residents own and run a business abroad, it is foreign ____ investment.", answers: [["direct"]], explain: "Foreign direct investment: active management, usually by a corporation." },
    { id: "open-basics-q17", kind: "fill", sub: "FDI vs FPI", prompt: "When domestic residents buy foreign stocks or bonds but do not run the firm, it is foreign ____ investment.", answers: [["portfolio"]], explain: "Foreign portfolio investment: passive holding, usually by individual investors." },
    { id: "open-basics-q18", kind: "fill", sub: "FDI vs FPI", prompt: "Foreign portfolio investment is more likely to be done by an individual investor, while foreign direct investment is more likely to be done by a ____.", answers: [["corporation", "company", "firm"]], explain: "Problem Set 11 Q3: FDI (opening a store or factory abroad) is typically a corporation." },
    { id: "open-basics-q19", kind: "fill", sub: "Capital inflow/outflow", prompt: "When NCO > 0 the country has a capital ____.", answers: [["outflow"]], explain: "Domestic purchases of foreign assets exceed foreign purchases of domestic assets." },
    { id: "open-basics-q20", kind: "fill", sub: "Capital inflow/outflow", prompt: "When NCO < 0 the country has a capital ____.", answers: [["inflow"]], explain: "Foreign purchases of domestic assets exceed domestic purchases of foreign assets." },
    { id: "open-basics-q21", kind: "fill", sub: "Net capital outflow", prompt: "Domestic residents buy $300 billion of foreign assets and foreigners buy $450 billion of domestic assets. NCO = $____ billion.", answers: [["-150"]], explain: "NCO = 300 − 450 = −150: a net capital inflow." },
    { id: "open-basics-q22", kind: "fill", sub: "Variables influencing NCO", prompt: "NCO depends on real interest rates on foreign and domestic assets, the perceived economic and political ____ of holding foreign assets, and policies on foreign ownership of domestic assets.", answers: [["risks", "risk"]], explain: "These are the four variables that influence NCO." },
    { id: "open-basics-q23", kind: "fill", sub: "NX = NCO", prompt: "NX = NCO is an accounting ____.", answers: [["identity"]], explain: "It holds by definition, because every international transaction is a swap." },
    { id: "open-basics-q24", kind: "fill", sub: "NX = NCO", prompt: "Every international transaction is a ____: goods for assets, or assets for assets.", answers: [["swap", "exchange"]], explain: "So anything that changes NX changes NCO by the same amount." },
    { id: "open-basics-q25", kind: "fill", sub: "NX = NCO", prompt: "When a foreigner buys a U.S. good and pays with currency, U.S. NX rises and U.S. NCO ____.", answers: [["rises", "rise", "increases", "increase", "goes up"]], explain: "The U.S. acquires foreign assets (the currency), so NCO rises by the same amount as NX." },
    { id: "open-basics-q26", kind: "fill", sub: "NX = NCO", prompt: "When a U.S. citizen buys foreign goods, U.S. NX falls and U.S. NCO ____ because the other country acquires U.S. assets.", answers: [["falls", "fall", "decreases", "decrease", "goes down"]], explain: "The seller now holds dollars or other U.S. assets, so U.S. NCO falls." },
    { id: "open-basics-q27", kind: "fill", sub: "NX = NCO", prompt: "A U.S. web designer is paid 5,000 euros by a German client and buys 5,000 euros of German stock. U.S. NCO rises by ____ euros.", answers: [["5000", "5,000"]], explain: "She now holds a foreign asset (German shares); NX and NCO both rise by 5,000." },
    { id: "open-basics-q28", kind: "fill", sub: "NX = NCO", prompt: "If instead she spends the 5,000 euros on German shoes, the change in U.S. NX is ____ euros.", answers: [["0", "zero"]], explain: "The shoe import offsets the website export, and no assets change hands." },
    { id: "open-basics-q29", kind: "fill", sub: "Saving and investment", prompt: "In an open economy, Y = C + I + G + ____.", answers: [["NX", "net exports"]], explain: "GDP is spent on consumption, investment, government purchases and net exports." },
    { id: "open-basics-q30", kind: "fill", sub: "Saving and investment", prompt: "National saving is S = Y − C − ____.", answers: [["G", "government purchases", "government spending"]], explain: "Saving is income left after consumption and government purchases." },
    { id: "open-basics-q31", kind: "fill", sub: "Saving and investment", prompt: "Since S = I + NX and NX = NCO, saving = domestic investment + ____.", answers: [["NCO", "net capital outflow"]], explain: "S = I + NCO: each dollar saved funds capital at home or buys assets abroad." },
    { id: "open-basics-q32", kind: "fill", sub: "Saving and investment", prompt: "A country's national saving is $3.5 trillion and domestic investment is $3.9 trillion. Its NCO is $____ trillion.", answers: [["-0.4"]], explain: "NCO = S − I = 3.5 − 3.9 = −0.4: a net capital inflow (and NX = −0.4, a trade deficit)." },
    { id: "open-basics-q33", kind: "fill", sub: "Saving and investment", prompt: "Y = 1,000, C = 650, G = 200 and I = 120. Net exports NX = ____.", answers: [["30"]], explain: "S = 1,000 − 650 − 200 = 150; NCO = S − I = 30; NX = NCO = 30." },
    { id: "open-basics-q34", kind: "fill", sub: "Trade, saving and capital flows", prompt: "A country with a trade deficit has national saving that is ____ than domestic investment.", answers: [["less", "lower", "smaller"]], explain: "Trade deficit: NX < 0, NCO < 0, so S < I." },
    { id: "open-basics-q35", kind: "fill", sub: "Trade, saving and capital flows", prompt: "With a trade surplus, output Y is ____ than domestic spending C + I + G.", answers: [["greater", "more", "larger", "bigger", "higher"]], explain: "NX > 0 means Y > C + I + G." },
    { id: "open-basics-q36", kind: "fill", sub: "Trade deficit a problem?", prompt: "A trade deficit is not necessarily a problem, but might be a ____ of a problem such as low national saving.", answers: [["symptom", "sign"]], explain: "Other possible underlying problems: excessive government borrowing or unsustainable consumption." },
    { id: "open-basics-q37", kind: "fill", sub: "Nominal exchange rate", prompt: "The rate at which a person can trade the currency of one country for the currency of another is the ____ exchange rate.", answers: [["nominal"]], explain: "E.g. 1.28 Singapore dollars per US$1." },
    { id: "open-basics-q38", kind: "fill", sub: "Nominal exchange rate", prompt: "In this course all exchange rates are expressed as ____ currency per unit of domestic currency.", answers: [["foreign"]], explain: "E.g. for the U.S., yen per dollar." },
    { id: "open-basics-q39", kind: "fill", sub: "Appreciation/depreciation", prompt: "An increase in the value of a currency, measured by the amount of foreign currency it can buy, is called ____.", answers: [["appreciation", "strengthening"]], explain: "The currency strengthens: it buys more foreign currency." },
    { id: "open-basics-q40", kind: "fill", sub: "Appreciation/depreciation", prompt: "A decrease in the value of a currency, measured by the amount of foreign currency it can buy, is called ____.", answers: [["depreciation", "weakening"]], explain: "The currency weakens: it buys less foreign currency." },
    { id: "open-basics-q41", kind: "fill", sub: "Real exchange rate", prompt: "The rate at which a person can trade the goods and services of one country for those of another is the ____ exchange rate.", answers: [["real"]], explain: "Real exchange rate = e × P ÷ P*." },
    { id: "open-basics-q42", kind: "fill", sub: "Real exchange rate", prompt: "Real exchange rate = e × P ÷ ____, where the blank is the foreign price.", answers: [["P*", "foreign price", "foreign price level"]], explain: "e = foreign currency per unit of domestic currency, P = domestic price, P* = foreign price." },
    { id: "open-basics-q43", kind: "fill", sub: "Real exchange rate", prompt: "A burger costs $5 in the U.S. and 450 yen in Japan; e = 135 yen per dollar. The real exchange rate is ____ (2 d.p.).", answers: [["1.50"]], explain: "e × P = 135 × 5 = 675 yen; 675 ÷ 450 = 1.50 Japanese burgers per U.S. burger." },
    { id: "open-basics-q44", kind: "fill", sub: "Real exchange rate", prompt: "A Big Mac costs $4 in the U.S. and 380 yen in Japan, with 110 yen per dollar. The real exchange rate is ____ (2 d.p.).", answers: [["1.16"]], explain: "110 × 4 = 440 yen; 440 ÷ 380 = 1.16 Japanese Big Macs per U.S. Big Mac (lecture example)." },
    { id: "open-basics-q45", kind: "fill", sub: "Real exchange rate", prompt: "If the U.S. real exchange rate appreciates, U.S. exports fall, imports rise and NX ____.", answers: [["falls", "fall", "decreases", "decrease"]], explain: "U.S. goods become more expensive relative to foreign goods." },
    { id: "open-basics-q46", kind: "fill", sub: "PPP", prompt: "The theory that a unit of any given currency should be able to buy the same quantity of goods in all countries is ____.", answers: [["purchasing-power parity", "purchasing power parity", "PPP"]], explain: "PPP is a theory of exchange rates." },
    { id: "open-basics-q47", kind: "fill", sub: "PPP", prompt: "PPP is based on the law of ____ price.", answers: [["one"]], explain: "The law of one price: a good should sell for the same price in all locations." },
    { id: "open-basics-q48", kind: "fill", sub: "PPP", prompt: "Taking advantage of price differences for the same item in different markets is called ____.", answers: [["arbitrage"]], explain: "Arbitrage pushes prices in different markets together." },
    { id: "open-basics-q49", kind: "fill", sub: "PPP", prompt: "Coffee sells for $4 in Seattle and $5 in Boston. Arbitrage raises demand in Seattle, driving its price ____.", answers: [["up", "higher"]], explain: "Boston's extra supply drives its price down, until the two prices are equal." },
    { id: "open-basics-q50", kind: "fill", sub: "Implications of PPP", prompt: "Under PPP, 1/P = e/P*, so the nominal exchange rate e equals the foreign price level ____ by the domestic price level.", answers: [["divided"]], explain: "e = P* ÷ P." },
    { id: "open-basics-q51", kind: "fill", sub: "Implications of PPP", prompt: "Under PPP the real exchange rate always equals ____.", answers: [["1", "one"]], explain: "With e = P* ÷ P, e × P ÷ P* = 1 and cannot change." },
    { id: "open-basics-q52", kind: "fill", sub: "Implications of PPP", prompt: "A soda costs $2 in the U.S. and 36 pesos in Mexico. If PPP holds, the exchange rate is ____ pesos per dollar.", answers: [["18"]], explain: "e = P* ÷ P = 36 ÷ 2 = 18 pesos per dollar." },
    { id: "open-basics-q53", kind: "fill", sub: "Implications of PPP", prompt: "When a central bank prints large quantities of money, the domestic price level rises and the currency ____.", answers: [["depreciates", "depreciate", "weakens", "falls"]], explain: "The money loses value in goods and in other currencies." },
    { id: "open-basics-q54", kind: "fill", sub: "Limitations of PPP", prompt: "PPP does not always hold because many goods are not easily ____, so their price differences cannot be arbitraged away.", answers: [["traded", "tradable", "tradeable"]], explain: "First limitation of PPP." },
    { id: "open-basics-q55", kind: "fill", sub: "Limitations of PPP", prompt: "Even tradable goods are not always perfect ____ when produced in different countries, so price differences reflect taste differences.", answers: [["substitutes"]], explain: "Second limitation of PPP." },

    { id: "open-basics-q56", kind: "mcq", sub: "NX vs NCO", prompt: "Which transaction increases U.S. net capital outflow?", options: ["An American buys a Sony TV", "An American buys a share of Sony stock", "The Sony pension fund buys a U.S. Treasury bond", "A Sony worker in Japan buys Georgia peaches"], answer: 1, explain: "A U.S. resident buying a foreign asset raises NCO. The TV and peaches affect NX; the pension fund lowers NCO." },
    { id: "open-basics-q57", kind: "mcq", sub: "FDI vs FPI", prompt: "Which is an example of U.S. foreign direct investment?", options: ["A U.S. retiree buys bonds issued by a German firm", "A U.S. pension fund buys shares in Harrods of London", "A U.S. cell phone company opens an office in the Czech Republic", "A French investor buys Toyota stock from a U.S. fund"], answer: 2, explain: "FDI: domestic residents own and run the business abroad." },
    { id: "open-basics-q58", kind: "mcq", sub: "Trade, saving and capital flows", prompt: "A country runs a trade deficit. Which must be true?", options: ["NCO > 0 and S > I", "NCO < 0 and S < I", "NCO = 0 and S = I", "NCO < 0 and S > I"], answer: 1, explain: "NX = NCO < 0 (net capital inflow), and S = I + NCO gives S < I." },
    { id: "open-basics-q59", kind: "mcq", sub: "Variables influencing NCO", prompt: "Which is NOT one of the lecture's variables that influence NCO?", options: ["Real interest rates paid on foreign assets", "Perceived political risks of holding foreign assets", "Transportation costs", "Government policies affecting foreign ownership of domestic assets"], answer: 2, explain: "Transportation costs are a factor influencing net exports, not NCO." },
    { id: "open-basics-q60", kind: "mcq", sub: "Real exchange rate", prompt: "The U.S. nominal exchange rate declines while prices in the U.S. and abroad are unchanged. The U.S. real exchange rate:", options: ["Rises", "Falls", "Is unchanged", "Could rise or fall"], answer: 1, explain: "Real exchange rate = e × P ÷ P*; e falls with P and P* constant (Problem Set 11 Q6c)." },
    { id: "open-basics-q61", kind: "mcq", sub: "Implications of PPP", prompt: "PPP holds and a monetary expansion doubles all prices in Mexico while U.S. prices are unchanged. The peso–dollar exchange rate (pesos per dollar):", options: ["Halves", "Is unchanged", "Doubles", "Rises by 50%"], answer: 2, explain: "e = P* ÷ P, so doubling P* doubles e: the peso depreciates (Problem Set 11 Q7)." },
    { id: "open-basics-q62", kind: "mcq", sub: "Appreciation", prompt: "Which group would be UNHAPPY if the U.S. dollar appreciated?", options: ["Dutch pension funds holding U.S. government bonds", "A U.S. firm buying property overseas", "U.S. manufacturing industries", "None of these"], answer: 2, explain: "U.S. goods become more expensive in foreign currency, so exports fall and imports compete harder." },
    { id: "open-basics-q63", kind: "mcq", sub: "Limitations of PPP", prompt: "Which is a reason PPP does not always hold?", options: ["Many goods are not easily traded", "Every international transaction is a swap", "Central banks never print money", "NX always equals NCO"], answer: 0, explain: "Price differences on non-traded goods cannot be arbitraged away." },
    { id: "open-basics-q64", kind: "mcq", sub: "NX = NCO", prompt: "A U.S. designer sells a website to a German for 5,000 euros and exchanges the euros for dollars at a U.S. bank. Then:", options: ["NX rises, NCO unchanged", "NX unchanged, NCO rises", "NX and NCO both rise by 5,000 euros", "NX and NCO are both unchanged"], answer: 2, explain: "The bank holds the euros, a foreign asset; NX = NCO in every case." },
    { id: "open-basics-q65", kind: "mcq", sub: "FDI vs FPI", prompt: "Honda expands its factory in Marysville, Ohio. For the U.S. this:", options: ["Raises NCO; portfolio investment", "Lowers NCO; direct investment", "Raises NX; direct investment", "Lowers NCO; portfolio investment"], answer: 1, explain: "A foreign firm acquires capital in the U.S. (foreign purchase of a domestic asset) that it runs: FDI, NCO falls." },
  ],

  // ---------------------------------------------------------------- exam
  exam: [
    {
      id: "open-basics-e1",
      section: "calc",
      sub: "Real exchange rate",
      prompt: "A cup of coffee costs $5 in the United States and 600 yen in Japan. The nominal exchange rate is 150 yen per dollar. The U.S. real exchange rate is ______________ (2 d.p.).",
      marks: 3,
      rubric: [
        { point: "States the formula: real exchange rate = e × P ÷ P*", marks: 1 },
        { point: "Correct working: e × P = 150 × 5 = 750 yen; 750 ÷ 600", marks: 1 },
        { point: "Correct answer 1.25 (Japanese coffees per U.S. coffee)", marks: 1 },
      ],
      model: "Real exchange rate = e × P ÷ P*\ne × P = 150 yen per $ × $5 = 750 yen per U.S. coffee\nReal exchange rate = 750 ÷ 600 = 1.25 Japanese coffees per U.S. coffee.",
      answer: "1.25",
      source: "Lecture 11 (Big Mac example)",
    },
    {
      id: "open-basics-e2",
      section: "calc",
      sub: "Real exchange rate",
      prompt: "A Big Mac costs $4 in the United States and 380 yen in Japan. The exchange rate is 110 yen per dollar. The real exchange rate is ______________ Japanese Big Macs per U.S. Big Mac (2 d.p.).",
      marks: 3,
      rubric: [
        { point: "States the formula: real exchange rate = e × P ÷ P*", marks: 1 },
        { point: "Correct working: e × P = 110 × 4 = 440 yen; 440 ÷ 380", marks: 1 },
        { point: "Correct answer 1.16", marks: 1 },
      ],
      model: "Real exchange rate = e × P ÷ P*\ne × P = 110 × 4 = 440 yen per U.S. Big Mac\nReal exchange rate = 440 ÷ 380 = 1.16 Japanese Big Macs per U.S. Big Mac (U.S. Big Macs are relatively expensive).",
      answer: "1.16",
      source: "Lecture 11 Example 2",
    },
    {
      id: "open-basics-e3",
      section: "calc",
      sub: "PPP exchange rate",
      prompt: "A can of soda costs $1.25 in the United States and 25 pesos in Mexico. If purchasing-power parity holds, the peso–dollar exchange rate is ______________ pesos per dollar.",
      marks: 3,
      rubric: [
        { point: "States the formula: under PPP, e = P* ÷ P", marks: 1 },
        { point: "Correct working: 25 ÷ 1.25", marks: 1 },
        { point: "Correct answer 20 pesos per dollar", marks: 1 },
      ],
      model: "Under PPP, e = P* ÷ P (foreign price ÷ domestic price)\ne = 25 pesos ÷ $1.25 = 20 pesos per dollar.",
      answer: "20 pesos per dollar",
      source: "Problem Set 11 Q7",
    },
    {
      id: "open-basics-e4",
      section: "calc",
      sub: "PPP exchange rate",
      prompt: "A Big Mac costs $5.69 in the United States and 4,290 pesos in Chile. The exchange rate predicted by purchasing-power parity is ______________ Chilean pesos per U.S. dollar (nearest whole number).",
      marks: 3,
      rubric: [
        { point: "States the formula: predicted e = P* ÷ P", marks: 1 },
        { point: "Correct working: 4,290 ÷ 5.69", marks: 1 },
        { point: "Correct answer 754 pesos per dollar", marks: 1 },
      ],
      model: "Predicted exchange rate (PPP): e = P* ÷ P\ne = 4,290 ÷ 5.69 = 753.95 ≈ 754 pesos per dollar (the actual rate in the problem set was 945 pesos per dollar).",
      answer: "754 pesos per dollar",
      source: "Problem Set 11 Q8(a)",
    },
    {
      id: "open-basics-e5",
      section: "calc",
      sub: "PPP cross rate",
      prompt: "A Big Mac costs 4,290 pesos in Chile and 7.62 Canadian dollars in Canada. According to purchasing-power parity, the predicted exchange rate is ______________ Chilean pesos per Canadian dollar (nearest whole number).",
      marks: 3,
      rubric: [
        { point: "States the formula: predicted e = P* ÷ P (Chilean price ÷ Canadian price)", marks: 1 },
        { point: "Correct working: 4,290 ÷ 7.62", marks: 1 },
        { point: "Correct answer 563 pesos per C$", marks: 1 },
      ],
      model: "Under PPP, e = P* ÷ P, with Canada as the domestic country and Chile as the foreign country\ne = 4,290 ÷ 7.62 = 562.99 ≈ 563 Chilean pesos per Canadian dollar.\n(The actual rate, 945 ÷ 1.38 ≈ 685, is above this, so the peso is undervalued against the C$.)",
      answer: "563 pesos per C$",
      source: "Problem Set 11 Q8(b)",
    },
    {
      id: "open-basics-e6",
      section: "calc",
      sub: "PPP with inflation",
      prompt: "PPP holds between Ectenia and Wiknam, where the only good is Spam. Spam costs 4 dollars in Ectenia and 24 pesos in Wiknam. Over 20 years inflation is 3.5% a year in Ectenia and 7% a year in Wiknam. Using the rule of 70, the exchange rate in 20 years is ______________ pesos per dollar.",
      marks: 3,
      rubric: [
        { point: "States the formulas: years to double = 70 ÷ growth rate, and e = P* ÷ P", marks: 1 },
        { point: "Correct working: Ectenian prices double once (70 ÷ 3.5 = 20) so Spam = 8 dollars; Wiknamian prices double twice (70 ÷ 7 = 10) so Spam = 96 pesos", marks: 1 },
        { point: "Correct answer 12 pesos per dollar (up from 6: the peso depreciates)", marks: 1 },
      ],
      model: "Rule of 70: years to double = 70 ÷ growth rate; PPP: e = P* ÷ P\nEctenia: 70 ÷ 3.5 = 20 years, so Spam = 4 × 2 = 8 dollars\nWiknam: 70 ÷ 7 = 10 years, doubles twice, so Spam = 24 × 4 = 96 pesos\ne = 96 ÷ 8 = 12 pesos per dollar (today 24 ÷ 4 = 6, so the rate doubles and the peso depreciates).",
      answer: "12 pesos per dollar",
      source: "Problem Set 11 Q9(b)",
    },
    {
      id: "open-basics-e7",
      section: "calc",
      sub: "Net capital outflow",
      prompt: "In a year, domestic residents buy $800 billion of foreign assets and foreigners buy $1,100 billion of domestic assets. The country's net capital outflow is ______________ and its net exports are ______________.",
      marks: 3,
      rubric: [
        { point: "States the formula: NCO = purchases of foreign assets by domestic residents − purchases of domestic assets by foreigners", marks: 1 },
        { point: "Correct working: 800 − 1,100 = −300, and uses NX = NCO", marks: 1 },
        { point: "Correct answer NCO = NX = −$300 billion (capital inflow, trade deficit)", marks: 1 },
      ],
      model: "NCO = purchases of foreign assets by domestic residents − purchases of domestic assets by foreigners\nNCO = 800 − 1,100 = −$300 billion (a net capital inflow)\nNX = NCO, so NX = −$300 billion: a trade deficit of $300 billion.",
      answer: "NCO = NX = −$300 billion",
      source: "Lecture 11",
    },
    {
      id: "open-basics-e8",
      section: "calc",
      sub: "S = I + NCO",
      prompt: "An open economy has GDP of $20,000 billion, consumption of $13,000 billion, government purchases of $3,500 billion and domestic investment of $4,000 billion. Its net capital outflow is ______________.",
      marks: 3,
      rubric: [
        { point: "States the formulas: S = Y − C − G and S = I + NCO", marks: 1 },
        { point: "Correct working: S = 20,000 − 13,000 − 3,500 = 3,500; NCO = 3,500 − 4,000", marks: 1 },
        { point: "Correct answer NCO = −$500 billion (net capital inflow)", marks: 1 },
      ],
      model: "S = Y − C − G = 20,000 − 13,000 − 3,500 = $3,500 billion\nS = I + NCO, so NCO = S − I = 3,500 − 4,000 = −$500 billion.\nSaving falls short of investment, so there is a net capital inflow (and NX = −$500 billion, a trade deficit).",
      answer: "−$500 billion",
      source: "Lecture 11",
    },
    {
      id: "open-basics-e9",
      section: "calc",
      sub: "Net exports",
      prompt: "A country's national saving is $600 billion and domestic investment is $450 billion. Its exports are $1,000 billion. Its imports are ______________.",
      marks: 3,
      rubric: [
        { point: "States the formulas: S = I + NCO, NX = NCO and NX = exports − imports", marks: 1 },
        { point: "Correct working: NCO = 600 − 450 = 150 = NX; imports = 1,000 − 150", marks: 1 },
        { point: "Correct answer $850 billion", marks: 1 },
      ],
      model: "S = I + NCO, so NCO = 600 − 450 = $150 billion\nNX = NCO = $150 billion\nNX = exports − imports, so imports = 1,000 − 150 = $850 billion (a trade surplus).",
      answer: "$850 billion",
      source: "Lecture 11",
    },
    {
      id: "open-basics-e10",
      section: "calc",
      sub: "Price in US dollars",
      prompt: "A Big Mac costs 7.62 Canadian dollars in Canada and the actual exchange rate is 1.38 C$ per U.S. dollar. The price of a Canadian Big Mac in U.S. dollars is ______________ (2 d.p.).",
      marks: 3,
      rubric: [
        { point: "States the formula: price in $ = local price ÷ actual exchange rate", marks: 1 },
        { point: "Correct working: 7.62 ÷ 1.38", marks: 1 },
        { point: "Correct answer $5.52", marks: 1 },
      ],
      model: "Price in US$ = local price ÷ exchange rate (local currency per $)\n= 7.62 ÷ 1.38 = $5.52\n(Close to the U.S. price of $5.69, consistent with PPP working reasonably well for Canada.)",
      answer: "$5.52",
      source: "Problem Set 11 Q8(c)",
    },

    {
      id: "open-basics-e11",
      section: "short",
      sub: "FDI vs FPI",
      prompt: "Describe the difference between foreign direct investment and foreign portfolio investment. Who is more likely to engage in each?",
      marks: 3,
      rubric: [
        { point: "FDI: domestic residents own and run the business abroad (active role), e.g. building a factory abroad", marks: 1 },
        { point: "FPI: domestic residents buy foreign stocks or bonds but do not run the firm (passive role)", marks: 1 },
        { point: "FDI is more likely by a corporation; FPI is more likely by an individual investor", marks: 1 },
      ],
      model: "Foreign direct investment is when domestic residents own and run a business abroad, such as opening a retail store or building a factory; the investor plays an active, managing role. Foreign portfolio investment is when domestic residents buy foreign stocks or bonds but do not run the firm; the investor just holds the financial assets. A corporation is more likely to engage in foreign direct investment, while an individual investor is more likely to engage in foreign portfolio investment.",
      source: "Problem Set 11 Q3",
    },
    {
      id: "open-basics-e12",
      section: "short",
      sub: "NX = NCO",
      prompt: "Explain why net exports must always equal net capital outflow, using an example of a foreigner buying a domestic good.",
      marks: 3,
      rubric: [
        { point: "NX = NCO is an accounting identity: every international transaction is a swap (goods for assets or assets for assets)", marks: 1 },
        { point: "Example: a foreigner buys a U.S. good, so U.S. exports and NX rise", marks: 1 },
        { point: "The foreigner pays with currency or assets, so the U.S. acquires foreign assets and NCO rises by the same amount", marks: 1 },
      ],
      model: "NX = NCO is an accounting identity because every international transaction is a swap of goods for assets or assets for assets, so anything that changes NX changes NCO by the same amount. For example, when a foreigner buys a U.S.-made good, U.S. exports and net exports rise. The foreigner pays with foreign currency or other assets, so a U.S. resident now holds a foreign asset and U.S. net capital outflow rises by exactly the same amount.",
      source: "Lecture 11",
    },
    {
      id: "open-basics-e13",
      section: "short",
      sub: "Factors influencing NX",
      prompt: "Give THREE factors that might influence a country's exports, imports and net exports.",
      marks: 3,
      rubric: [
        { point: "Any one of: consumers' tastes for foreign and domestic goods; prices of goods at home and abroad", marks: 1 },
        { point: "A second factor, e.g. exchange rates; incomes of consumers at home and abroad", marks: 1 },
        { point: "A third factor, e.g. transportation costs; government policies toward international trade", marks: 1 },
      ],
      model: "First, consumers' tastes for foreign and domestic goods: if domestic consumers prefer foreign goods, imports rise and net exports fall. Second, exchange rates and the prices of goods at home and abroad: if domestic goods become relatively more expensive, exports fall and imports rise. Third, government policies toward international trade (and transportation costs), which change how easy it is to buy goods from other countries. (Incomes of consumers at home and abroad would also earn the mark.)",
      source: "Lecture 11",
    },
    {
      id: "open-basics-e14",
      section: "short",
      sub: "Variables influencing NCO",
      prompt: "Give THREE variables that influence a country's net capital outflow.",
      marks: 3,
      rubric: [
        { point: "Real interest rates paid on foreign assets (or on domestic assets)", marks: 1 },
        { point: "Perceived economic and political risks of holding foreign assets", marks: 1 },
        { point: "Government policies affecting foreign ownership of domestic assets", marks: 1 },
      ],
      model: "First, the real interest rates paid on foreign assets compared with the real interest rates paid on domestic assets: higher returns abroad encourage residents to buy foreign assets. Second, the perceived economic and political risks of holding foreign assets, which discourage buying them. Third, government policies affecting foreign ownership of domestic assets, which change how much foreigners can buy at home.",
      source: "Lecture 11",
    },
    {
      id: "open-basics-e15",
      section: "short",
      sub: "Trade deficit a problem?",
      prompt: "The U.S. has bought more from the world than it sells for over 40 years. Is a trade deficit necessarily a national problem? Explain.",
      marks: 3,
      rubric: [
        { point: "A trade deficit means S < I: it depends on why saving fell short of investment", marks: 1 },
        { point: "Good reason: borrowing abroad to fund an investment boom (e.g. the 1990s) may yield large returns; like a person, a country can go into debt for good or bad reasons", marks: 1 },
        { point: "It is not necessarily a problem but may be a symptom of one, e.g. low national saving, excessive government borrowing or unsustainable consumption", marks: 1 },
      ],
      model: "Not necessarily. A trade deficit means national saving is less than domestic investment, so whether it is a problem depends on why saving fell short. If the deficit funds an investment boom, as in the 1990s, the extra capital stock may well yield large returns; a country, like a person, can go into debt for good reasons. A trade deficit is not necessarily a problem, but it might be a symptom of one, such as low national saving, excessive government borrowing or unsustainable consumption.",
      source: "Lecture 11",
    },
    {
      id: "open-basics-e16",
      section: "short",
      sub: "Limitations of PPP",
      prompt: "Explain TWO reasons why the theory of purchasing-power parity does not always hold in practice, and state when it does work well.",
      marks: 3,
      rubric: [
        { point: "Many goods are not easily traded, so their price differences cannot be arbitraged away", marks: 1 },
        { point: "Tradable goods made in different countries are not always perfect substitutes, so price differences reflect taste differences", marks: 1 },
        { point: "PPP works well for large and persistent movements in nominal exchange rates, which reflect price-level changes (e.g. German hyperinflation)", marks: 1 },
      ],
      model: "First, many goods are not easily traded, so price differences on these goods cannot be arbitraged away. Second, even tradable goods are not always perfect substitutes when produced in different countries, so price differences can reflect differences in tastes. PPP does work well in explaining large and persistent movements in nominal exchange rates, which typically reflect changes in price levels at home and abroad, as in the German hyperinflation of 1921–1924.",
      source: "Lecture 11",
    },
    {
      id: "open-basics-e17",
      section: "short",
      sub: "Appreciation",
      prompt: "Would each group be happy or unhappy if the U.S. dollar appreciated? (a) Dutch pension funds holding U.S. government bonds (b) U.S. manufacturing industries (c) Australian tourists planning a trip to the United States. Explain.",
      marks: 3,
      rubric: [
        { point: "(a) Happy: each dollar of interest and principal converts into more euros", marks: 1 },
        { point: "(b) Unhappy: U.S. goods become more expensive in foreign currency, so exports fall and imports compete harder", marks: 1 },
        { point: "(c) Unhappy: each Australian dollar buys fewer U.S. dollars, so the trip costs more", marks: 1 },
      ],
      model: "(a) Dutch pension funds are happy, because each dollar of interest and principal they receive now converts into more euros. (b) U.S. manufacturers are unhappy, because their goods become more expensive in foreign currency, so exports fall and imports compete harder in the U.S. (c) Australian tourists are unhappy, because each Australian dollar buys fewer U.S. dollars, making the trip more expensive.",
      source: "Problem Set 11 Q5",
    },
    {
      id: "open-basics-e18",
      section: "short",
      sub: "PPP and interest rates",
      prompt: "PPP holds. Country A has 3.5% inflation and Country B has 7% inflation, with similar real interest rates. A friend suggests borrowing in A (low nominal interest rate) and investing in B (high nominal interest rate) to profit from the difference. Explain the problem with this idea.",
      marks: 3,
      rubric: [
        { point: "B's nominal rate is higher only because of higher inflation (Fisher effect: nominal = real + inflation)", marks: 1 },
        { point: "Under PPP, B's currency depreciates against A's by about the inflation differential (about 3.5% a year)", marks: 1 },
        { point: "The extra interest converts back into less of A's currency, offsetting the gain; profit would need a difference in real interest rates", marks: 1 },
      ],
      model: "By the Fisher effect, B's nominal interest rate is about 3.5 percentage points higher only because its inflation is higher. The scheme ignores the exchange rate: under PPP, B's currency depreciates against A's by about 3.5% a year, the inflation differential. The extra interest earned in B's currency therefore converts back into less of A's currency, which offsets the nominal interest-rate differential, so there is no real gain; a profit would require a difference in real interest rates.",
      source: "Problem Set 11 Q9(c)–(d)",
    },

    {
      id: "open-basics-e19",
      section: "tf",
      sub: "NX vs NCO",
      prompt: "When an American buys a share of Sony stock, U.S. net exports fall.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: no goods or services change hands, so NX is unaffected", marks: 1 },
        { point: "Buying a foreign share is purchase of a foreign asset by a domestic resident", marks: 1 },
        { point: "So it is included in U.S. net capital outflow, which increases (portfolio investment)", marks: 1 },
      ],
      model: "False. Buying a share of Sony stock is not a purchase of goods or services, so it does not affect U.S. exports, imports or net exports. It is a purchase of a foreign asset by a U.S. resident, which is foreign portfolio investment. It therefore increases U.S. net capital outflow, not net exports.",
      source: "Problem Set 11 Q2(b)",
    },
    {
      id: "open-basics-e20",
      section: "tf",
      sub: "Trade, saving and capital flows",
      prompt: "A country with a trade deficit must have national saving less than domestic investment.",
      tf: true,
      marks: 3,
      rubric: [
        { point: "States True", marks: 1 },
        { point: "Trade deficit means NX < 0, and NX = NCO so NCO < 0 (a net capital inflow)", marks: 1 },
        { point: "S = I + NCO with NCO < 0 gives S < I: the country sells assets abroad to finance the extra investment/imports", marks: 1 },
      ],
      model: "True. A trade deficit means NX < 0, and since NX = NCO, net capital outflow is also negative: a net capital inflow. National saving equals domestic investment plus net capital outflow (S = I + NCO), so with NCO < 0, saving must be less than investment. The country sells assets abroad to pay for its extra imports.",
      source: "Lecture 11",
    },
    {
      id: "open-basics-e21",
      section: "tf",
      sub: "Real exchange rate",
      prompt: "If the U.S. nominal exchange rate is unchanged but prices rise faster in the United States than abroad, the U.S. real exchange rate falls.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: the real exchange rate rises", marks: 1 },
        { point: "Uses real exchange rate = e × P ÷ P*", marks: 1 },
        { point: "e is constant and P rises relative to P*, so the ratio rises and U.S. goods become relatively more expensive", marks: 1 },
      ],
      model: "False. The real exchange rate equals e × P ÷ P*. With e unchanged and U.S. prices P rising faster than foreign prices P*, the ratio rises. U.S. goods become relatively more expensive compared with foreign goods, so the U.S. real exchange rate rises (appreciates).",
      source: "Problem Set 11 Q6(a)",
    },
    {
      id: "open-basics-e22",
      section: "tf",
      sub: "Implications of PPP",
      prompt: "If purchasing-power parity holds, the real exchange rate is always equal to 1.",
      tf: true,
      marks: 3,
      rubric: [
        { point: "States True", marks: 1 },
        { point: "Under PPP, $1 buys the same goods at home and abroad: 1/P = e/P*, so e = P*/P", marks: 1 },
        { point: "Substituting gives e × P ÷ P* = 1, which cannot change; the nominal rate adjusts to price levels", marks: 1 },
      ],
      model: "True. PPP says a dollar must buy the same quantity of goods at home (1/P) as abroad, where it converts into e units of foreign currency that buy e/P* goods. Setting 1/P = e/P* gives e = P*/P. Substituting into the real exchange rate gives e × P ÷ P* = 1, so the real exchange rate is 1 and cannot change; only the nominal rate moves with price levels.",
      source: "Lecture 11",
    },
    {
      id: "open-basics-e23",
      section: "tf",
      sub: "Money and the exchange rate",
      prompt: "When a central bank prints large quantities of money, its currency appreciates.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: the currency depreciates", marks: 1 },
        { point: "The money loses value in terms of goods and services: the domestic price level rises", marks: 1 },
        { point: "Under PPP e = P*/P, so higher P lowers e; the money also buys less foreign currency (e.g. high Mexican inflation makes the peso depreciate)", marks: 1 },
      ],
      model: "False. When a central bank prints large quantities of money, the money loses value both in the goods and services it can buy, so the domestic price level rises, and in the amount of other currencies it can buy. Under PPP the nominal exchange rate e = P*/P, so a higher domestic price level lowers e: the currency depreciates. For example, if Mexican inflation is higher than U.S. inflation, the peso depreciates against the dollar.",
      source: "Lecture 11",
    },
    {
      id: "open-basics-e24",
      section: "tf",
      sub: "NX = NCO",
      prompt: "A U.S. designer sells a website to a German buyer for 5,000 euros and spends the euros on German shoes. U.S. net exports and net capital outflow both rise by 5,000 euros.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: neither NX nor NCO changes", marks: 1 },
        { point: "The website is an export but the shoes are an import of equal value, so NX is unchanged", marks: 1 },
        { point: "No assets change hands, so NCO is unchanged; NX = NCO still holds", marks: 1 },
      ],
      model: "False. The website sold to Germany is a U.S. export, but the German shoes are a U.S. import of the same value, so they offset each other and net exports are unchanged. Because the designer ends up holding no foreign assets, no assets change hands and net capital outflow is also unchanged. NX = NCO still holds, with both changes equal to zero.",
      source: "Lecture 11 Example 1",
    },
    {
      id: "open-basics-e25",
      section: "tf",
      sub: "Real exchange rate",
      prompt: "An appreciation of the U.S. real exchange rate increases U.S. net exports.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: NX falls", marks: 1 },
        { point: "A real appreciation makes U.S. goods more expensive relative to foreign goods", marks: 1 },
        { point: "So U.S. exports fall and imports rise, reducing NX", marks: 1 },
      ],
      model: "False. The real exchange rate is the price of a domestic basket of goods relative to a foreign basket. If it appreciates, U.S. goods become more expensive relative to foreign goods. Foreigners buy fewer U.S. exports and Americans buy more imports, so U.S. net exports fall.",
      source: "Lecture 11",
    },
    {
      id: "open-basics-e26",
      section: "tf",
      sub: "FDI and NCO",
      prompt: "Honda expanding its factory in Marysville, Ohio increases U.S. net capital outflow.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: U.S. NCO decreases", marks: 1 },
        { point: "A foreign firm acquires capital in the U.S.: a purchase of a domestic asset by a foreigner, which is subtracted in NCO", marks: 1 },
        { point: "Honda owns and runs the factory, so it is foreign direct investment (a capital inflow for the U.S.)", marks: 1 },
      ],
      model: "False. NCO equals purchases of foreign assets by domestic residents minus purchases of domestic assets by foreigners. Honda, a foreign firm, acquiring more capital in the U.S. is a foreign purchase of a domestic asset, so U.S. net capital outflow decreases. Because Honda owns and runs the factory, it is foreign direct investment.",
      source: "Problem Set 11 Q4(c)",
    },
    {
      id: "open-basics-e27",
      section: "tf",
      sub: "Law of one price",
      prompt: "If coffee beans sell for $4 per pound in Seattle and $5 per pound in Boston and can be transported costlessly, the price difference will persist.",
      tf: false,
      marks: 3,
      rubric: [
        { point: "States False: the prices converge", marks: 1 },
        { point: "Arbitrage: buy in Seattle and sell in Boston for a quick profit", marks: 1 },
        { point: "Higher demand raises the Seattle price, higher supply lowers the Boston price, until they are equal (law of one price)", marks: 1 },
      ],
      model: "False. The price gap creates an arbitrage opportunity: traders make a quick profit by buying coffee in Seattle and selling it in Boston. The increased demand in Seattle drives the price there up, while the increased supply in Boston drives the price there down. This continues until the two prices are equal, as the law of one price predicts.",
      source: "Lecture 11 Example 3",
    },
  ],
};

export default data;
