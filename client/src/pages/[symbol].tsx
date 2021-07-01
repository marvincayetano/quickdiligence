import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Nprogress from "nprogress";
import { Badge, Box, Button } from "@chakra-ui/react";
import { CheckBox } from "../components/CheckBox";
import { Layout } from "../components/Layout";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Line } from "react-chartjs-2";

import {
  Index__symbol,
  Index__name,
  Index__symbolContainer,
  Index__optionsContainer,
  Index__optionsTable,
} from "../styles/Index";
import { ResultContainer } from "../components/ResultContainer";

interface AnalyzedData {
  EPS: {
    data: [number];
    isPositiveNumber: boolean;
    isIncreasing: boolean;
  };
  PERatio: { data: [number]; isUndervalued: boolean; isOverValued: boolean };
  IRatio: { data: [number]; isSixHigher: boolean; isOneToSix: boolean };
  RGrowth: {
    data: [number];
    isIncreasing: boolean;
  };
  IncomeLoss: { data: string; isNegative: boolean };
  PnetIncome: { data: string; isPositive: boolean };
  TotalCash: { data: string };
  TotalAssets: {
    data: { assets: string; liabilities: string };
    isPositiveAL: boolean;
  };
  SHEquity: {
    data: [number];
    isIncreasing: boolean;
  };
  LTD: {
    data: string;
  };
}

interface SymbolProps {
  foundStock: any;
}

const eps_linechart_options = {
  plugins: {
    legend: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          callback: function (value: any, index: any, values: any) {
            return value / 1e6 + "M";
          },
        },
      },
    ],
  },
};

const createLineChartData = (
  labels: string[],
  data: [number],
  color: string
) => {
  return {
    labels: labels,
    datasets: [
      {
        data: data,
        fill: false,
        borderColor: "lightGray",
        pointBackgroundColor: color,
      },
    ],
  };
};

const Symbol: React.FC<SymbolProps> = ({ foundStock }) => {
  const router = useRouter();
  // TODO: Make this a constant array of objects that contains the name and description
  const [analyzedData, setAnalyzedData] = useState<AnalyzedData>();
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
        <Index__optionsTable>
          <CheckBox description="Positive number EPS(earnings-per-share) and continued increase" />
          <Box p="0 2rem">
            {analyzedData && (
              <Line
                type="Line"
                height={95}
                data={() => {
                  const currentYear = new Date().getFullYear();
                  const labels = analyzedData?.EPS.data.map((_, i) => {
                    return (currentYear - i).toString();
                  });
                  return createLineChartData(
                    labels.reverse(),
                    analyzedData?.EPS.data,
                    analyzedData?.EPS.isIncreasing ? "green" : "red"
                  );
                }}
                options={eps_linechart_options}
              />
            )}
          </Box>
          {analyzedData && (
            <ResultContainer>
              EPS is &nbsp;
              {analyzedData.EPS.isPositiveNumber ? (
                <Badge colorScheme="green">positive</Badge>
              ) : (
                <Badge colorScheme="red">negative</Badge>
              )}
              &nbsp; and is &nbsp;
              {analyzedData.EPS.isIncreasing ? (
                <Badge colorScheme="green">increasing</Badge>
              ) : (
                <Badge colorScheme="red">not increasing</Badge>
              )}
            </ResultContainer>
          )}
          {/* <CheckBox
            name="ROI"
            description="Return on investment continued growth"
            currentOptions={currentOptions}
            setCurrentOptions={setCurrentOptions}
          />
          <CheckBox
            name="DEBT"
            description="DEBT payback time (Long term debt or free cash flow). Must be 3years or less"
            currentOptions={currentOptions}
            setCurrentOptions={setCurrentOptions}
          /> */}
          <CheckBox description="Is the stock trading at a reasonable price? PE Ratio = Stock price/EPS. Must be 15 or less" />
          <ResultContainer>
            PE Ratio of &nbsp;
            <p>{analyzedData && ` x${analyzedData.PERatio.data}`}</p>
            is &nbsp;
            {analyzedData &&
              (analyzedData.PERatio.isOverValued ? (
                <Badge colorScheme="red">Overvalued</Badge>
              ) : (
                <Badge colorScheme="green">Good</Badge>
              ))}
          </ResultContainer>
          <CheckBox description="Interest coverage ratio of 6 or higher" />
          <ResultContainer>
            Interest coverage ratio of &nbsp;
            <p>{analyzedData && `${analyzedData.IRatio.data}`}</p>
            is &nbsp;
            {analyzedData &&
              (analyzedData.IRatio.isSixHigher ? (
                <Badge colorScheme="green">Very Good</Badge>
              ) : analyzedData.IRatio.isOneToSix ? (
                <Badge colorScheme="yellow">Good</Badge>
              ) : (
                <Badge colorScheme="green">Bad</Badge>
              ))}
          </ResultContainer>
          <CheckBox description="Steady climb or revenue growth over the last 3 years" />
          <Box p="0 2rem">
            {analyzedData && (
              <Line
                type="Line"
                height={95}
                data={() => {
                  const currentYear = new Date().getFullYear();
                  const labels = analyzedData?.RGrowth.data.map((_, i) => {
                    return (currentYear - i).toString();
                  });
                  return createLineChartData(
                    labels.reverse(),
                    analyzedData?.RGrowth.data,
                    analyzedData?.EPS.isIncreasing ? "green" : "red"
                  );
                }}
                options={eps_linechart_options}
              />
            )}
          </Box>
          {analyzedData && (
            <ResultContainer>
              Revenue growth is &nbsp;
              {analyzedData.RGrowth.isIncreasing ? (
                <Badge colorScheme="green">increasing</Badge>
              ) : (
                <Badge colorScheme="red">not increasing</Badge>
              )}
            </ResultContainer>
          )}
          <CheckBox description="Positive operating income/loss" />
          <ResultContainer>
            Operating income of $
            <p>{analyzedData && `${analyzedData.IncomeLoss.data}`}</p>
            is &nbsp;
            {analyzedData &&
              (analyzedData.IncomeLoss.isNegative ? (
                <Badge colorScheme="red">Bad</Badge>
              ) : (
                <Badge colorScheme="green">Good</Badge>
              ))}
          </ResultContainer>
          <CheckBox description="Positive net income" />
          <ResultContainer>
            Net income of $
            <p>{analyzedData && `${analyzedData.PnetIncome.data}`}</p>
            is &nbsp;{" "}
            {analyzedData &&
              (analyzedData.PnetIncome.isPositive ? (
                <Badge colorScheme="green">Good</Badge>
              ) : (
                <Badge colorScheme="red">Bad</Badge>
              ))}
          </ResultContainer>
          <CheckBox description="A lot of total cash" />
          <ResultContainer>
            Total cash of $
            <p>{analyzedData && `${analyzedData.TotalCash.data}`}</p>
          </ResultContainer>
          <CheckBox description="Higher assets than liabilities" />
          <ResultContainer>
            Assets of &nbsp;
            <p>{analyzedData && `${analyzedData.TotalAssets.data.assets}`}</p>
            and Liabilities of &nbsp;
            <p>
              {analyzedData && `${analyzedData.TotalAssets.data.liabilities}`}
            </p>
            is &nbsp;
            {analyzedData &&
              (analyzedData.TotalAssets.isPositiveAL ? (
                <Badge colorScheme="green">Good</Badge>
              ) : (
                <Badge colorScheme="red">Bad</Badge>
              ))}
          </ResultContainer>
          {/* <CheckBox
            name="GWIA"
            description="Goodwill and intangible assets should be 0 or less"
            currentOptions={currentOptions}
            setCurrentOptions={setCurrentOptions}
          /> */}
          <CheckBox description="Long term debt. Less is better" />
          <ResultContainer>
            Long-term debt of &nbsp;
            <p>{analyzedData && `$${analyzedData.LTD.data}`}</p>
          </ResultContainer>
          <CheckBox description="Stock holder equity. Want this to see growth over the past 3 years" />
          <Box p="0 2rem">
            {analyzedData && (
              <Line
                type="Line"
                height={95}
                data={() => {
                  const currentYear = new Date().getFullYear();
                  const labels = analyzedData?.SHEquity.data.map((_, i) => {
                    return (currentYear - i).toString();
                  });
                  return createLineChartData(
                    labels.reverse(),
                    analyzedData?.SHEquity.data,
                    analyzedData?.SHEquity.isIncreasing ? "green" : "red"
                  );
                }}
                options={eps_linechart_options}
              />
            )}
          </Box>
          {analyzedData && (
            <ResultContainer>
              Revenue growth is &nbsp;
              {
                // TODO: Remove after test && There should always be data
                analyzedData.SHEquity.isIncreasing ? (
                  <Badge colorScheme="green">increasing</Badge>
                ) : (
                  <Badge colorScheme="red">not increasing</Badge>
                )
              }
            </ResultContainer>
          )}
        </Index__optionsTable>
      </Index__optionsContainer>
    </Layout>
  );
};

export default Symbol;
