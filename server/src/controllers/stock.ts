import { Request, Response } from "express";
// import puppeteer from "puppeteer";

export const getStockPrice = (req: Request, res: Response) => {
  console.log("PRICE", req.params);
};

export const getAnalyze = (req: Request, res: Response) => {
  console.log("ANALYZE", req.params);
};
