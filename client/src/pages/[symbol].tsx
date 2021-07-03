import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { Button, Collapse } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Nprogress from "nprogress";

import {
  Index__symbol,
  Index__name,
  Index__symbolContainer,
  Index__optionsContainer,
  Index__optionsTable,
} from "../styles/Index";
import { AnalyzeData, AnalyzeDataInterface } from "../components/AnalyzeData";
import { News, NewsInterface } from "../components/News";

interface SymbolProps {
  foundStock: any;
}

const Symbol: React.FC<SymbolProps> = ({ foundStock }) => {
  const router = useRouter();
  // TODO: Make this a constant array of objects that contains the name and description
  const [analyzedData, setAnalyzedData] = useState<AnalyzeDataInterface>();
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState(null);
  const [news, setNews] = useState({} as any);
  useEffect(() => {
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

    // This get is getting the current price of the symbol
    axios
      .get(`http://localhost:3000/price/${router.query.symbol}`)
      .then((res) => {
        setPrice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [foundStock]);

  const onProcess = async () => {
    Nprogress.set(0.2);
    setIsLoading(true);

    // This get is getting the results after analyzing the stock
    await axios
      .get(`http://localhost:3000/analyze/${router.query.symbol}`)
      .then((res) => {
        setAnalyzedData(res.data);
        console.log(res.data);
        Nprogress.done();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        Nprogress.done();
      });
  };
  return (
    <Layout>
      <div
        style={{
          padding: "3rem 0px",
          display: "flex",
          justifyContent: "center",
          background: "#F9F7F8",
        }}
      ></div>
      <Index__symbolContainer>
        <div>
          <Index__symbol>{router.query.symbol}</Index__symbol>
          <Index__name>{foundStock.name}</Index__name>
          <Index__name>{price && `$${price}`}</Index__name>
        </div>
        <div className="btn__analyze">
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            size="lg"
            isLoading={isLoading}
            onClick={() => onProcess()}
          >
            Analyze
          </Button>
        </div>
      </Index__symbolContainer>

      <Collapse in={analyzedData !== undefined} animateOpacity>
        <Index__optionsContainer>
          {analyzedData && <AnalyzeData analyzedData={analyzedData} />}
        </Index__optionsContainer>
      </Collapse>
      <Collapse in={news !== undefined} animateOpacity>
        <Index__optionsContainer>
          <Index__optionsTable style={{ width: "auto" }}>
            {news.status === "ok" &&
              news.articles.map((n: NewsInterface) => (
                <News key={n.url} news={n} />
              ))}
          </Index__optionsTable>
        </Index__optionsContainer>
      </Collapse>
    </Layout>
  );
};

export default Symbol;
