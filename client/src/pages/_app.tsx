import "../styles/styles.css";
import "../styles/custom.css";
import "nprogress/nprogress.css";
import React, { useState } from "react";

import { ChakraProvider, Collapse } from "@chakra-ui/react";
import { Main } from "../components/Main";
import AnalyzeMain from "../components/AnalyzeMain";

const MyApp = ({}: any) => {
  const [inputClick, setInputClick] = useState(false);

  return (
    <ChakraProvider>
      {inputClick && <AnalyzeMain />}
      <Collapse in={!inputClick} animateOpacity>
        {!inputClick && <Main setInputClick={setInputClick} />}
      </Collapse>
    </ChakraProvider>
  );
};

export default MyApp;
