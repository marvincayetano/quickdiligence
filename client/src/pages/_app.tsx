import "../styles/styles.css";
import "../styles/custom.css";
import "nprogress/nprogress.css";
import React, { useState } from "react";
import Head from "next/head";

import { ChakraProvider, Collapse } from "@chakra-ui/react";
import { Main } from "../components/Main";
import AnalyzeMain from "../components/AnalyzeMain";

const MyApp = ({}: any) => {
  const [inputClick, setInputClick] = useState(false);

  return (
    <ChakraProvider>
      <Head>
        <title>QuickDiligence</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      {inputClick && <AnalyzeMain />}
      <Collapse in={!inputClick} animateOpacity>
        {!inputClick && <Main setInputClick={setInputClick} />}
      </Collapse>
    </ChakraProvider>
  );
};

export default MyApp;
