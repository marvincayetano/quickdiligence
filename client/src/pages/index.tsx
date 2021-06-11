import React from "react";
import { withUrqlClient } from "next-urql";

import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";

import { Section } from "../styles/Main";

const Index = () => {
  return (
    <Layout>
      <Section></Section>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
