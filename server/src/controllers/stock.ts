import { Request, Response } from "express";
import puppeteer from "puppeteer";

// To create a proper table for analysis
const cleanArray = (elArr: string[], isBS: boolean = false) => {
  let result: any = {};

  elArr.map((block, index) => {
    const colonAdded = block.replace(/\n|\t/g, ":");
    if (index === 0) {
      const dates = colonAdded
        .replace(`Breakdown:${isBS ? "" : "TTM"}`, "")
        .match(/.{1,10}/g) as string[];
      return isBS
        ? (result["Date"] = [...dates])
        : (result["Date"] = ["TTM", ...dates]);
    }
    // The index 0 must be the object name and the rest are array of string

    const split = colonAdded.split(/[:*]+/);
    result[split[0]] = split.slice(1);
  });
  return result;
};

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

  // Stock Price
  //   try {
  //     await page.goto(`https://ca.finance.yahoo.com/quote/${req.params.symbol}`, {
  //       waitUntil: "networkidle0",
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   const stockPrice = await page.evaluate(
  //     () =>
  //       (
  //         document.querySelectorAll(
  //           "#quote-summary > div > table > tbody > tr > td > span"
  //         )[1] as HTMLElement
  //       )?.innerText
  //   );

  //   console.log(stockPrice);

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

  const incomeStatementArr = cleanArray(els);
  console.log("INCOME STATEMENT", incomeStatementArr);

  //   // Balance Sheet
  //   try {
  //     await page.goto(
  //       `https://ca.finance.yahoo.com/quote/${req.params.symbol}/balance-sheet`,
  //       {
  //         waitUntil: "networkidle0",
  //       }
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   const financials__balanceSheet = await page.$x(
  //     "//div[contains(@class, 'D(tbr)')]"
  //   );

  //   els = await page.evaluate(
  //     (...financials__balanceSheet) =>
  //       financials__balanceSheet.map((e) => e.innerText),
  //     ...financials__balanceSheet
  //   );

  //   const balanceSheetArr = cleanArray(els, true);
  //   console.log("BALANCE SHEET", balanceSheetArr);

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

  // res.send({
  // console.log({
  //   EPS: {
  //     data: ,
  //     // Checks if the current EPS is positive
  //     isPositiveNumber: epsArr[2] ? epsArr[2] > 0 : epsArr[0] > 0,
  //     // Checks if the EPS is increasing each year
  //     isIncreasing:
  //       epsArr[0] < epsArr[1] && epsArr[1] < epsArr[2] && epsArr[2] < epsArr[3]
  //         ? true
  //         : false,
  //   },
  //   PERatio: {
  //     data: PERatio,
  //     isUndervalued: PERatio < 14,
  //     isOverValued: PERatio > 17,
  //   },
  //   IRatio: {
  //     data: financials.ICRatio,
  //     // Check if the IC ratio is 6 or higher
  //     isSixHigher: financials.ICRatio > 6,
  //     isOneToSix: financials.ICRatio < 6 && financials.ICRatio > 1,
  //   },
  //   RGrowth: {
  //     data: financials.Revenue.reverse(),
  //     // Check if Revenue is increasing
  //     isIncreasing:
  //       parseInt(financials.Revenue[0]) > parseInt(financials.Revenue[1]) &&
  //       parseInt(financials.Revenue[1]) > parseInt(financials.Revenue[2])
  //         ? true
  //         : false,
  //   },
  //   IncomeLoss: {
  //     data: financials.OILoss,
  //     isNegative:
  //       (financials.OILoss as any).charAt[1] &&
  //       (financials.OILoss as any).charAt[0] === "-"
  //         ? true
  //         : false,
  //   },
  //   PnetIncome: {
  //     data: financials.NIncome,
  //     isPositive:
  //       (financials.NIncome as any).charAt[1] &&
  //       (financials.NIncome as any).charAt[0] === "-"
  //         ? false
  //         : true,
  //   },
  //   TotalCash: {
  //     data: balanceSheet.TotalCash,
  //   },
  //   TotalAssets: {
  //     data: {
  //       assets: balanceSheet.TotalAssets,
  //       liabilities: balanceSheet.TotalLiabilities,
  //     },
  //     isPositiveAL:
  //       parseFloat(balanceSheet.TotalAssets) >
  //       parseFloat(balanceSheet.TotalLiabilities),
  //   },
  //   SHEquity: {
  //     data: balanceSheet.SHEquity,
  //     isIncreasing:
  //       parseFloat(balanceSheet.SHEquity[0]) >
  //         parseFloat(balanceSheet.SHEquity[1]) &&
  //       parseFloat(balanceSheet.SHEquity[1]) >
  //         parseFloat(balanceSheet.SHEquity[2])
  //         ? true
  //         : false,
  //   },
  //   LTD: {
  //     data: balanceSheet.LongTermDebt,
  //   },
  // });
};
