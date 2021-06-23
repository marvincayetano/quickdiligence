import React from "react";
import { CheckBox } from "../components/CheckBox";
import { Layout } from "../components/Layout";
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
        <Index__symbol>{foundStock.symbol}</Index__symbol>
        <Index__name>{foundStock.name}</Index__name>
      </Index__symbolContainer>
      <Index__optionsContainer>
        <Index__optionsTable>
          <CheckBox
            name="EPS"
            description={
              "Positive number EPS(Earnings per share) and continued increase"
            }
          />
          <CheckBox
            name="ROI"
            description={"Return on investment continued growth"}
          />
          <CheckBox
            name="DEBT"
            description={
              "DEBT payback time (Long term debt or free cash flow). Must be 3years or less"
            }
          />
        </Index__optionsTable>
      </Index__optionsContainer>
    </Layout>
  );
};

export default Symbol;
