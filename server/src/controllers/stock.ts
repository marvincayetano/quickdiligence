import { Request, Response } from "express";
import puppeteer from "puppeteer";

// To create a proper table for analysis
const cleanArray = (elArr: string[], isBS: boolean = false) => {
  let result: any = {};

  elArr.forEach((block, index) => {
    const colonAdded = block.replace(/\n|\t/g, ":");
    // The index 0 must be the object name and the rest are array of string
    if (index === 0) {
      const dates = colonAdded
        .replace(`Breakdown:${isBS ? "" : "TTM"}`, "")
        .match(/.{1,10}/g) as string[];
      isBS
        ? (result["Date"] = [...dates])
        : (result["Date"] = ["TTM", ...dates]);
    }

    const split = colonAdded.split(/[:*]+/);
    result[split[0]] = split.slice(1);
  });

  return result;
};

// To check if a specific data increasing
const isIncreasing = (dataArr: string[]) => {
  const isIncreasingArr: boolean[] = [];
  for (let i = dataArr.length - 1; i > 0; i--) {
    if (dataArr[i - 1] !== "-") {
      isIncreasingArr.push(parseFloat(dataArr[i]) < parseFloat(dataArr[i - 1]));
    }
  }

  // Positive number means true, negative means false
  let increasingNum = 0;
  isIncreasingArr.forEach((x) => {
    increasingNum += x ? 1 : -1;
  });

  return increasingNum;
};

// Analyze everything else here
export const getAnalyze = async (req: Request, res: Response) => {
  res.send({ hhaha: "GAGAG" });
  return;

  let browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  let els: any;

  // Stock Price
  try {
    await page.goto(`https://ca.finance.yahoo.com/quote/${req.params.symbol}`, {
      waitUntil: "networkidle0",
    });
  } catch (err) {
    console.log(err);
  }

  const price = await page.evaluate(
    () =>
      (
        document.querySelectorAll(
          "#quote-summary > div > table > tbody > tr > td > span"
        )[1] as HTMLElement
      )?.innerText
  );

  // PE Ratio
  // PERatio is for checking if the stock is over or under valued
  const quote = await page.$$eval("div > table > tbody > tr > td", (lists) => {
    return {
      PERatio: (lists[21] as HTMLElement).innerText,
      EPS: parseFloat((lists[23] as HTMLElement).innerText),
    };
  });

  // Income Statement
  try {
    await page.goto(
      `https://ca.finance.yahoo.com/quote/${req.params.symbol}/financials`,
      {
        waitUntil: "networkidle0",
      }
    );
  } catch (err) {
    console.log(err);
  }

  const financials__incomeStatement = await page.$x(
    "//div[contains(@class, 'D(tbr)')]"
  );
  els = await page.evaluate(
    (...financials__incomeStatement) =>
      financials__incomeStatement.map((e) => e.innerText),
    ...financials__incomeStatement
  );

  const incomeStatement = cleanArray(els);
  console.log("INCOME STATEMENT", incomeStatement);

  // Balance Sheet
  try {
    await page.goto(
      `https://ca.finance.yahoo.com/quote/${req.params.symbol}/balance-sheet`,
      {
        waitUntil: "networkidle0",
      }
    );
  } catch (err) {
    console.log(err);
  }

  const financials__balanceSheet = await page.$x(
    "//div[contains(@class, 'D(tbr)')]"
  );

  els = await page.evaluate(
    (...financials__balanceSheet) =>
      financials__balanceSheet.map((e) => e.innerText),
    ...financials__balanceSheet
  );

  const balanceSheetArr = cleanArray(els, true);
  console.log("BALANCE SHEET", balanceSheetArr);

  // Cash Flow
  //   try {
  //     await page.goto(
  //       `https://ca.finance.yahoo.com/quote/${req.params.symbol}/cash-flow`,
  //       {
  //         waitUntil: "networkidle0",
  //       }
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   const financials__cashFlow = await page.$x(
  //     "//div[contains(@class, 'D(tbr)')]"
  //   );
  //   els = await page.evaluate(
  //     (...financials__cashFlow) => financials__cashFlow.map((e) => e.innerText),
  //     ...financials__cashFlow
  //   );

  //   const cashFlowArr = cleanArray(els);
  //   console.log("INCOME STATEMENT", cashFlowArr);

  const InterestRatio =
    parseFloat(
      incomeStatement["EBITDA"][0] === "-"
        ? incomeStatement["EBITDA"][1]
        : incomeStatement["EBITDA"][0]
    ) / parseFloat(incomeStatement["Interest Expense"]);

  const EPSData =
    incomeStatement["Diluted EPS"][0] !== "-"
      ? incomeStatement["Diluted EPS"]
      : incomeStatement["Diluted EPS"].splice(1);

  browser.close();

  res.send({
    // Current stock price
    price,

    // epsArr contains the eps from the last 2 years and the future year eg. 2019 2020 2021 2022
    EPS: {
      data: EPSData,
      // Checks if the current EPS is positive
      isPositiveNumber: quote.EPS > 0,
      // Checks if the EPS is increasing each year
      isIncreasing: isIncreasing(EPSData) > 0,
    },
    // PERatio is for checking if the stock is over or under valued
    PERatio: {
      data: quote.PERatio ?? "N/A",
      isUndervalued: parseFloat(quote.PERatio) < 14,
      isOverValued: parseFloat(quote.PERatio) > 17,
    },
    // Interest coverage ratio = EBIT / Interest expense
    IRatio: {
      data: InterestRatio,
      // Check if the IC ratio is 6 or higher
      isSixHigher: InterestRatio > 6,
      isOneToSix: InterestRatio < 6 && InterestRatio > 1,
    },
    // Revenue growth
    RGrowth: {
      data: incomeStatement["Total Revenue"],
      // Check if Revenue is increasing
      // Positive number means true, negative means false
      isIncreasing: isIncreasing(incomeStatement["Total Revenue"]) > 0,
    },
    // Operating income loss shouldn't be negative
    IncomeLoss: {
      data: incomeStatement["Operating Income or Loss"],
      isNegative:
        incomeStatement["Operating Income or Loss"][0] !== "-" &&
        incomeStatement["Operating Income or Loss"][0].charAt(0) === "-",
    },
    // Positive Net Income
    PnetIncome: {
      data: incomeStatement["Net Income"],
      isPositive:
        incomeStatement["Net Income"][0] !== "-" &&
        incomeStatement["Net Income"][0].charAt(0) !== "-",
    },
    TotalCash: {
      data: balanceSheetArr["Total Cash"][0],
    },
    TotalAssets: {
      data: {
        assets: balanceSheetArr["Total Assets"][0],
        liabilities: balanceSheetArr["Total Liabilities"][0],
      },
      isPositiveAL:
        parseInt(balanceSheetArr["Total Assets"][0]) >
        parseInt(balanceSheetArr["Total Liabilities"][0]),
    },
    // Share holders quity
    SHEquity: {
      data: balanceSheetArr["Total stockholders' equity"],
      isIncreasing:
        isIncreasing(balanceSheetArr["Total stockholders' equity"]) > 0,
    },
    // Long term debt
    LTD: {
      data: balanceSheetArr["Long Term Debt"][0],
    },
  });
};
