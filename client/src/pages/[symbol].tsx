import React, { useState } from "react";

import Nprogress from "nprogress";
import { Button } from "@chakra-ui/react";
import { CheckBox } from "../components/CheckBox";
import { Layout } from "../components/Layout";
import { ArrowForwardIcon, ArrowUpIcon } from "@chakra-ui/icons";
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

const Symbol: React.FC<SymbolProps> = ({ foundStock }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onProcess = () => {
    Nprogress.start();
    setIsLoading(true);
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
          <Index__symbol>{foundStock.symbol}</Index__symbol>
          <Index__name>{foundStock.name}</Index__name>
          <Index__name>
            <ArrowUpIcon color="green" /> $14.45
          </Index__name>
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
          />
          <CheckBox
            name="ROI"
            description="Return on investment continued growth"
          />
          <CheckBox
            name="DEBT"
            description="DEBT payback time (Long term debt or free cash flow). Must be 3years or less"
          />
          <CheckBox
            name="PERATIO"
            description="Is the stock trading at a reasonable price? PE Ratio = Stock price/EPS. Must be 15 or less"
          />
          <CheckBox
            name="IRATIO"
            description="Interest coverage ratio of 6 or higher"
          />
          <CheckBox
            name="RGROWTH"
            description="Steady climb or revenue growth over the last 3 years"
          />
          <CheckBox
            name="INCOMELOSS"
            description="Positive operating income/loss"
          />
          <CheckBox name="PNETINCOME" description="Positive net income" />
          <CheckBox name="BSHEET" description="A lot of total cash" />
          <CheckBox name="AL" description="Higher assets than liabilities" />
          <CheckBox
            name="GI"
            description="Goodwill and intangible assets should be zero or small"
          />
          <CheckBox name="LD" description="Long term debt. Less is better" />
          <CheckBox
            name="SHE"
            description="Stock holder equity. Want this to see growth over the past 3 years"
          />
          <CheckBox
            name="CFC"
            description="Cash flow chart. They should be investing for themselves"
          />
        </Index__optionsTable>
      </Index__optionsContainer>
    </Layout>
  );
};

export default Symbol;
