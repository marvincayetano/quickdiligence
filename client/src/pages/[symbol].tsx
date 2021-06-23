import React from "react";
import { Layout } from "../components/Layout";
import {
  Index__symbol,
  Index__name,
  Index__symbolContainer,
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
    </Layout>
  );
};

export default Symbol;
