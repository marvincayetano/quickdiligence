import "../styles/styles.css";
import "../styles/custom.css";
import "nprogress/nprogress.css";
import React, { useState } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import { Main } from "../components/Main";

const MyApp = ({ Component, pageProps }: any) => {
  const [foundStock, setFoundStock] = useState({});

  return (
    <ChakraProvider>
      {/* <NavBar setFoundStock={setFoundStock} /> */}
      <Main></Main>
      {/* <Component {...pageProps} foundStock={foundStock} /> */}
    </ChakraProvider>
  );
};

export default MyApp;
