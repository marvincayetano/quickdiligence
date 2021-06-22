import "../styles/styles.css";
import "../styles/custom.css";
import "nprogress/nprogress.css";
import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <ChakraProvider>
      <NavBar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
