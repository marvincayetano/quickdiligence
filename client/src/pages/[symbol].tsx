import React from "react";
import { withUrqlClient } from "next-urql";

import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Index__symbol,
  Index__name,
  Index__symbolContainer,
} from "../styles/Index";

const Animal: NextPage = ({}) => {
  const router = useRouter();

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
        <Index__symbol>{router.query.symbol}</Index__symbol>
        <Index__name>{router.query.symbol}</Index__name>
      </Index__symbolContainer>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Animal);
