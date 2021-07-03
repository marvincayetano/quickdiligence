import "../styles/styles.css";
import "../styles/custom.css";
import "nprogress/nprogress.css";
import React, { useState } from "react";

import { ChakraProvider, Collapse } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import { Main } from "../components/Main";

const MyApp = ({ Component, pageProps }: any) => {
  const [foundStock, setFoundStock] = useState({});
  const [inputClick, setInputClick] = useState(false);

  return (
    <ChakraProvider>
      // TODO: This colapse is the problem apparently
      <Collapse in={inputClick} animateOpacity>
        {inputClick && <NavBar setFoundStock={setFoundStock} />}
      </Collapse>
      <Collapse in={!inputClick} animateOpacity>
        {!inputClick && <Main setInputClick={setInputClick} />}
      </Collapse>
      <Component {...pageProps} foundStock={foundStock} />
    </ChakraProvider>
  );
};

export default MyApp;
