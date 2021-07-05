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

  const [foundStock, setFoundStock] = useState<FoundStockInterface>();
  useEffect(() => {
    console.log("FOUND", foundStock);
    if (foundStock) {
      Nprogress.set(0.2);
      const date = new Date();
      date.setDate(date.getDate() - 5);

      axios
        .get(
          `https://newsapi.org/v2/top-headlines?q=${
            // TODO: Change this to first name of the company
            foundStock.name.split(" ")[0]
          }&category=business&apiKey=${process.env.NEXT_PUBLIC_NEWSAPI_KEY}`
        )
        .then((result) => {
          setNews(result.data);
          console.log(result);
        })
        .catch((err) => {
          console.error(err);
        });

      // This get is getting the results after analyzing the stock
      axios
        .get(`http://localhost:3000/analyze/${foundStock.symbol}`)
        .then((res) => {
          setPrice(res.data.price);
          setAnalyzedData(res.data);
          console.log(res.data);
          Nprogress.done();
        })
        .catch((err) => {
          console.log(err);
          Nprogress.done();
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
              <Index__name style={{ alignSelf: "center", fontSize: "4.5rem" }}>
                {price && `$${price}`}
              </Index__name>
              <Index__score>
                <span>score</span>
                <span style={{ color: "green" }}>5/12</span>
              </Index__score>
            </div>
          </Index__symbolContainer>

          <Collapse in={analyzedData !== undefined} animateOpacity>
            <Index__optionsContainer>
              {analyzedData && <AnalyzeData analyzedData={analyzedData} />}
            </Index__optionsContainer>
          </Collapse>
          <Collapse in={news !== undefined} animateOpacity>
            <h1
              style={{
                textAlign: "center",
                paddingTop: "2rem",
                fontWeight: "bold",
              }}
            >
              Latest news
            </h1>
            <Index__optionsContainer>
              <Index__optionsTable style={{ width: "auto" }}>
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
