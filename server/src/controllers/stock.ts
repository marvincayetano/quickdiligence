import { Request, Response } from "express";
import puppeteer from "puppeteer";

// To create a proper table for analysis
const cleanArray = (elArr: string[]) => {
  console.log(elArr);
  return elArr.map((block, index) => {
    const colonAdded = block.replace(/\n|\t/g, ":");
    if (index === 0) {
      const dates = colonAdded
        .replace("Breakdown:TTM", "")
        .match(/.{1,10}/g) as string[];
      return ["Breakdown", "TTM", ...dates];
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

  // EPS
  try {
    await page.goto(
      //   `https://ca.finance.yahoo.com/quote/${req.params.symbol}/analysis`,
      `https://ca.finance.yahoo.com/quote/${req.params.symbol}/financials`,
      {
        waitUntil: "networkidle0",
      }
    );
  } catch (err) {
    console.log(err);
  }

  const tblAnalysis = await page.$x("//div[contains(@class, 'D(tbr)')]");
  const els = await page.evaluate(
    (...tblAnalysis) => tblAnalysis.map((e) => e.innerText),
    ...tblAnalysis
  );
  console.log(cleanArray(els));

  //   res.send({});
};
