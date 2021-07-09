import React, { useEffect, useState } from "react";
import axios from "axios";

import { Collapse } from "@chakra-ui/react";
import { Layout } from "./Layout";
import Nprogress from "nprogress";

import {
  Index__symbol,
  Index__name,
  Index__symbolContainer,
  Index__optionsContainer,
  Index__optionsTable,
  Index__score,
} from "../styles/Index";
import { AnalyzeData, AnalyzeDataInterface } from "./AnalyzeData";
import { News, NewsInterface } from "./News";
import { NavBar } from "./NavBar";

interface AnalyzeMainProps {}

interface FoundStockInterface {
  symbol: string;
  name: string;
}

const AnalyzeMain: React.FC<AnalyzeMainProps> = ({}) => {
  // TODO: Make this a constant array of objects that contains the name and description
  const [analyzedData, setAnalyzedData] = useState<AnalyzeDataInterface>();
  const [price, setPrice] = useState(null);
  const [news, setNews] = useState({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);

  const [foundStock, setFoundStock] = useState<FoundStockInterface>();
  useEffect(() => {
    if (foundStock) {
      setIsLoading(true);
      Nprogress.set(0.2);
      const date = new Date();
      date.setDate(date.getDate() - 5);
      setAnalyzedData(undefined);

      axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER}/news/${
            foundStock.name.split(" ")[0]
          }`
        )
        .then((result) => {
          console.log("NEWS", result);
          setNews(result.data);
        })
        .catch((err) => {
          console.error(err);
        });

      // This get is getting the results after analyzing the stock
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER}/analyze/${foundStock.symbol}`)
        .then((res) => {
          setPrice(res.data.price);
          let currentScore = 0;

          const {
            EPS,
            IRatio,
            IncomeLoss,
            PERatio,
            PnetIncome,
            RGrowth,
            SHEquity,
            TotalAssets,
          } = res.data;

          if (EPS.isIncreasing) {
            currentScore = currentScore + 0.5;
          }
          if (EPS.isPositiveNumber) {
            currentScore = currentScore + +0.5;
          }

          if (IRatio.isOneToSix) {
            currentScore = currentScore + 0.5;
          } else if (IRatio.isSixHigher) {
            currentScore = currentScore + 1;
          }

          if (!IncomeLoss.isNegative) {
            currentScore = currentScore + 1;
          }

          if (PERatio.data !== "N/A") {
            if (!PERatio.isOverValued) {
              currentScore = currentScore + 1;
            }
          }

          if (PnetIncome.isPositive) {
            currentScore = currentScore + 1;
          }

          if (RGrowth.isIncreasing) {
            currentScore = currentScore + 1;
          }

          if (SHEquity.isIncreasing) {
            currentScore = currentScore + 1;
          }

          if (TotalAssets.isPositiveAL) {
            currentScore = currentScore + 1;
          }

          setScore(currentScore);
          Nprogress.done();
          setIsLoading(false);
          setAnalyzedData(res.data);
        })
        .catch((err) => {
          Nprogress.done();
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [foundStock]);

  return (
    <Layout>
      <NavBar setFoundStock={setFoundStock} />
      {foundStock ? (
        <>
          <div
            style={{
              padding: "3rem 0px",
              display: "flex",
              justifyContent: "center",
              background: "#F9F7F8",
            }}
          ></div>
          <Index__symbolContainer>
            <div className="info__container">
              <div>
                <Index__symbol>{foundStock.symbol}</Index__symbol>
                <Index__name>{foundStock.name}</Index__name>
              </div>
              {!isLoading && (
                <>
                  <Index__score>
                    <span style={{ color: "green" }}>{score}/8</span>
                  </Index__score>
                  <p className="info__price">{`$${price}`}</p>
                </>
              )}
            </div>
          </Index__symbolContainer>

          {isLoading ? (
            <p
              className="some_gradient"
              style={{
                textAlign: "center",
                fontSize: "2rem",
                color: "var(--chakra-colors-green-500)",
              }}
            >
              Result is loading...
            </p>
          ) : (
            <Collapse in={analyzedData !== undefined} animateOpacity>
              <Index__optionsContainer>
                {analyzedData && <AnalyzeData analyzedData={analyzedData} />}
              </Index__optionsContainer>
            </Collapse>
          )}
          <Collapse in={news !== undefined} animateOpacity>
            <h1
              style={{
                textAlign: "center",
                paddingTop: "2rem",
                fontWeight: "bold",
              }}
            >
              {news && news.status === "ok" && news.articles.length > 0 && (
                <p>Latest news</p>
              )}
            </h1>
            <Index__optionsContainer>
              <Index__optionsTable>
                {news.status === "ok" &&
                  news.articles.map((n: NewsInterface) => (
                    <News key={n.url} news={n} />
                  ))}
              </Index__optionsTable>
            </Index__optionsContainer>
          </Collapse>
        </>
      ) : (
        <div></div>
      )}
    </Layout>
  );
};

export default AnalyzeMain;
