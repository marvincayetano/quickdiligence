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

  const epsArr = await page.$$eval(
    "table > tbody > tr:nth-child(5) > td",
    (lists) => {
      const contents = [];

      for (var i = 1; i <= 4; i++) {
        contents.push(lists[i].querySelector("span")?.innerText);
      }

      return contents;
    }
  );

  console.log(epsArr);

  //   const animals = await page.$$eval(".ResultsTable > tbody > tr", (lists) => {
  //     // lists has all the values inside of td
  //     // each list has 7 contents each
  //     const contents = [];
  //     for (var i = 1; i <= lists.length - 1; i++) {
  //       contents.push({
  //         imgLink: lists[i].querySelector("td:first-child > a > img").src,
  //         animalType: lists[i].querySelector("td:nth-child(2)")?.innerText,
  //         name: lists[i]
  //           .querySelector("td:nth-child(3)")
  //           ?.innerText.split("\n")[0],
  //         gender: lists[i].querySelector("td:nth-child(4)")?.innerText,
  //         color: lists[i].querySelector("td:nth-child(5)")?.innerText,
  //         description: lists[i].querySelector("td:nth-child(6)")?.innerText,
  //         age: lists[i].querySelector("td:last-child")?.innerText,
  //         status: "found",
  //       });
  //     }
  //     return contents;
  //   });
};
