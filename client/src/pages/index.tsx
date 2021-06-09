import React from "react";
import { withUrqlClient } from "next-urql";

import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  return (
    <Layout>
      <h1>hahha</h1>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
