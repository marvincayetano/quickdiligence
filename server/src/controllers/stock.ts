import { Request, Response } from "express";
import puppeteer from "puppeteer";

// To create a proper table for analysis
const cleanArray = (elArr: string[], isBS: boolean = false) => {
  console.log(elArr);
  return elArr.map((block, index) => {
    const colonAdded = block.replace(/\n|\t/g, ":");
    if (index === 0) {
      const dates = colonAdded
        .replace(`Breakdown:${isBS ? "" : "TTM"}`, "")
        .match(/.{1,10}/g) as string[];
      return isBS ? ["Breakdown", ...dates] : ["Breakdown", "TTM", ...dates];
    }

    return colonAdded.split(/[:*]+/);
  });
};

// Get the current stock price here
export const getStockPrice = async (req: Request, res: Response) => {};

// Analyze everything else here
// export const getAnalyze = async (req: Request, res: Response) => {
export const getAnalyze = async () => {
  //   console.log("ANALYZE SYMBOL", req.params.symbol);
  const req = {
    params: {
      symbol: "TSLA",
    },
  };

  let browser = await puppeteer.launch();
  const page = await browser.newPage();
  let els: any;

  //   // Income Statement
  //   try {
  //     await page.goto(
  //       //   `https://ca.finance.yahoo.com/quote/${req.params.symbol}/analysis`,
  //       `https://ca.finance.yahoo.com/quote/${req.params.symbol}/financials`,
  //       {
  //         waitUntil: "networkidle0",
  //       }
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   const financials__incomeStatement = await page.$x(
  //     "//div[contains(@class, 'D(tbr)')]"
  //   );
  //   els = await page.evaluate(
  //     (...financials__incomeStatement) =>
  //       financials__incomeStatement.map((e) => e.innerText),
  //     ...financials__incomeStatement
  //   );

  //   const incomeStatementArr = cleanArray(els);
  //   console.log("INCOME STATEMENT", incomeStatementArr);

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

  console.log(els);

  const balanceSheetArr = cleanArray(els, true);
  console.log("BALANCE SHEET", balanceSheetArr);
  //   res.send({});
};
