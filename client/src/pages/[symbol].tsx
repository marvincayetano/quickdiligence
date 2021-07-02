import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { Button } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Nprogress from "nprogress";

import {
  Index__symbol,
  Index__name,
  Index__symbolContainer,
  Index__optionsContainer,
} from "../styles/Index";
import { AnalyzeData, AnalyzedDataInterface } from "../components/AnalyzeData";

interface SymbolProps {
  foundStock: any;
}

const Symbol: React.FC<SymbolProps> = ({ foundStock }) => {
  const router = useRouter();
  // TODO: Make this a constant array of objects that contains the name and description
  const [analyzedData, setAnalyzedData] = useState<AnalyzedDataInterface>();
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState(null);
  const [news, setNews] = useState({} as any);
  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() - 5);
    console.log(router.query.symbol);

    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country="us"&q=${
          // TODO: Change this to first name of the company
          router.query.symbol
        }&category=business&apiKey=${
          process.env.NEXT_PUBLIC_NEWSAPI_KEY
        }&from=${date.toISOString().split("T")[0]}&sortBy=publishedAt`
      )
      .then((result) => {
        setNews(result);
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onProcess = async () => {
    Nprogress.set(0.2);
    setIsLoading(true);

    // This get is getting the current price of the symbol
    await axios
      .get(`http://localhost:3000/price/${router.query.symbol}`)
      .then((res) => {
        setPrice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

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

      <Index__optionsContainer>
        {analyzedData && <AnalyzeData analyzedData={analyzedData} />}
      </Index__optionsContainer>
    </Layout>
  );
};

export default Symbol;
