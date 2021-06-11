import "../styles/styles.css";
import "../styles/custom.css";
import { ChakraProvider } from "@chakra-ui/react";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
