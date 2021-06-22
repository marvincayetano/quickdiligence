import React from "react";
import { withUrqlClient } from "next-urql";

import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";

import { Section } from "../styles/Main";

const Index = () => {
  return <Section></Section>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
