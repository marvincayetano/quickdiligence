import { Request, Response } from "express";
import puppeteer from "puppeteer";

export const getStockPrice = async (req: Request, res: Response) => {
  let browser = await puppeteer.launch();
  let page = await browser.newPage();

  try {
    await page.goto(`https://ca.finance.yahoo.com/quote/${req.params.symbol}`, {
      waitUntil: "networkidle0",
    });
  } catch (err) {
    console.log(err);
  }

  page
    .evaluate(
      () =>
        (
          document.querySelectorAll(
            "#quote-summary > div > table > tbody > tr > td > span"
          )[1] as HTMLElement
        )?.innerText
    )
    .then((result) => {
      res.send(result);
    });
};

export const getAnalyze = async (req: Request, res: Response) => {
  console.log("ANALYZE SYMBOL", req.params.symbol);

  let browser = await puppeteer.launch();
  let page = await browser.newPage();

  // EPS
  try {
    await page.goto(
      `https://ca.finance.yahoo.com/quote/${req.params.symbol}/analysis`,
      {
        waitUntil: "networkidle0",
      }
    );
  } catch (err) {
    console.log(err);
  }

  // epsArr contains the eps from the last 2 years and the future year eg. 2019 2020 2021 2022
  const epsArr = await page.$$eval(
    "table > tbody > tr:nth-child(5) > td",
    (lists) => {
      const contents = [];

      // TODO: Not all stocks have 4 years of eps history in yahoo finance
      for (var i = 1; i <= 4; i++) {
        contents.push(
          parseFloat(lists[i].querySelector("span")?.innerText as string)
        );
      }

      return contents;
    }
  );
  console.log("EPS", epsArr);

  // PE Ratio
  try {
    await page.goto(`https://ca.finance.yahoo.com/quote/${req.params.symbol}`, {
      waitUntil: "networkidle0",
    });
  } catch (err) {
    console.log(err);
  }

  // PERatio is for checking if the stock is over or under valued
  const PERatio = await page.$$eval(
    "div > table > tbody > tr > td",
    (lists) => {
      return parseFloat((lists[21] as HTMLElement).innerText);
    }
  );

  console.log("PERatio", PERatio);

  // Interest coverage ratio
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

  // Interest coverage ratio = EBIT / Interest expense
  // Anything below 1 is bad
  const ICRatio = await page.$$eval("div > span", (lists) => {
    return (
      parseFloat((lists[129] as HTMLElement).innerText) /
      parseFloat((lists[76] as HTMLElement).innerText)
    );
  });

  console.log("ICRatio", ICRatio);

  const returnObject = {
    EPS: {
      data: epsArr,
      // Checks if the current EPS is positive
      isPositiveNumber: epsArr[2] ? epsArr[2] > 0 : epsArr[0] > 0,
      // Checks if the EPS is increasing each year
      isIncreasing:
        epsArr[0] > epsArr[1] && epsArr[1] > epsArr[2] && epsArr[2] > epsArr[3]
          ? true
          : false,
    },
    PERatio: {
      data: PERatio,
      isUndervalued: PERatio < 14,
      isOverValued: PERatio > 17,
    },
    ICRatio: {
      data: ICRatio,
      // Check if the IC ratio is 6 or higher
      isSixHigher: ICRatio > 6,
    },
  };

  console.log(returnObject);
};
