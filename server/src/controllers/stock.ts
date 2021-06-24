import { Request, Response } from "express";
import puppeteer from "puppeteer";

const scrapePrice = async (symbol: string) => {
  let browser = await puppeteer.launch();
  let page = await browser.newPage();

  try {
    await page.goto(`https://ca.finance.yahoo.com/quote/${symbol}`, {
      waitUntil: "networkidle0",
    });
  } catch (err) {
    console.log(err);
  }

  console.log("bout to page eval");
  const currentPrice = async () =>
    await page.evaluate(
      () =>
        (
          document.querySelectorAll(
            "#quote-summary > div > table > tbody > tr > td > span"
          )[1] as HTMLElement
        )?.innerText
    );

  console.log("current price", await currentPrice());
};

export const getStockPrice = (req: Request, res: Response) => {
  console.log("PRICE", req.params);
};

export const getAnalyze = (req: Request, res: Response) => {
  console.log("ANALYZE SYMBOL", req.params.symbol);
  scrapePrice(req.params.symbol);

  //   console.log("ANALYZE OPTIONS", req.query.currentOptions);
};
