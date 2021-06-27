import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Nprogress from "nprogress";
import { Box, Button } from "@chakra-ui/react";
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
        },
      },
    ],
  },
};

const Symbol: React.FC<SymbolProps> = ({ foundStock }) => {
  const router = useRouter();
  // TODO: Make this a constant array of objects that contains the name and description
  const [currentOptions, setCurrentOptions] = useState([
    "EPS",
    "ROI",
    "DEBT",
    "PERATIO",
    "IRATIO",
    "RGROWTH",
    "INCOMELOSS",
    "PNETINCOME",
    "CASH",
    "AL",
    "GI",
    "LD",
    "SHE",
    "CFC",
  ]) as any;
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState(null);

  const eps_data = {
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const onProcess = async () => {
    Nprogress.set(0.2);
    setIsLoading(true);

    // This get is getting the current price of the symbol
    // await axios
    //   .get(`http://localhost:3000/price/${router.query.symbol}`, {
    //     params: {
    //       currentOptions,
    //     },
    //   })
    //   .then((res) => {
    //     setPrice(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // This get is getting the results after analyzing the stock
    await axios
      .get(`http://localhost:3000/analyze/${router.query.symbol}`, {
        params: {
          currentOptions,
        },
      })
      .then((res) => {
        setPrice(res.data);
      })
      .catch((err) => {
        console.log(err);
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
          <CheckBox
            name="EPS"
            description="Positive number EPS(Earnings per share) and continued increase"
            currentOptions={currentOptions}
            setCurrentOptions={setCurrentOptions}
          />
          <Box p="0 2rem">
            <Line type="Line" data={eps_data} options={eps_linechart_options} />
          </Box>
          <CheckBox
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
          />
          <CheckBox
            name="PERATIO"
            description="Is the stock trading at a reasonable price? PE Ratio = Stock price/EPS. Must be 15 or less"
            currentOptions={currentOptions}
            setCurrentOptions={setCurrentOptions}
          />
          <CheckBox
            name="IRATIO"
            description="Interest coverage ratio of 6 or higher"
            currentOptions={currentOptions}
            setCurrentOptions={setCurrentOptions}
          />
          <CheckBox
            name="RGROWTH"
            description="Steady climb or revenue growth over the last 3 years"
            currentOptions={currentOptions}
            setCurrentOptions={setCurrentOptions}
          />
          <CheckBox
            name="INCOMELOSS"
            description="Positive operating income/loss"
            currentOptions={currentOptions}
            setCurrentOptions={setCurrentOptions}
          />
          <CheckBox
            name="PNETINCOME"
            description="Positive net income"
            currentOptions={currentOptions}
            setCurrentOptions={setCurrentOptions}
          />
          <CheckBox
            name="CASH"
            description="A lot of total cash"
            currentOptions={currentOptions}
            setCurrentOptions={setCurrentOptions}
          />
          <CheckBox
            name="AL"
            description="Higher assets than liabilities"
            currentOptions={currentOptions}
            setCurrentOptions={setCurrentOptions}
          />
          <CheckBox
            name="GI"
            description="Goodwill and intangible assets should be zero or small"
            currentOptions={currentOptions}
            setCurrentOptions={setCurrentOptions}
          />
          <CheckBox
            name="LD"
            description="Long term debt. Less is better"
            currentOptions={currentOptions}
            setCurrentOptions={setCurrentOptions}
          />
          <CheckBox
            name="SHE"
            description="Stock holder equity. Want this to see growth over the past 3 years"
            currentOptions={currentOptions}
            setCurrentOptions={setCurrentOptions}
          />
          <CheckBox
            name="CFC"
            description="Cash flow chart. They should be investing for themselves"
            currentOptions={currentOptions}
            setCurrentOptions={setCurrentOptions}
          />
        </Index__optionsTable>
      </Index__optionsContainer>
    </Layout>
  );
};

export default Symbol;
