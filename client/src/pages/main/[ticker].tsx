import React from "react";
import { withUrqlClient } from "next-urql";

import { createUrqlClient } from "../../utils/createUrqlClient";
import { Layout } from "../../components/Layout";
import { Box, Heading } from "@chakra-ui/react";
import { useGetAnimalFromUrl } from "../../utils/useGetAnimalFromUrl";
import { EditDeleteButton } from "../../components/EditDeleteButton";

const Animal = ({}) => {
  const [{ data, error, fetching }] = useGetAnimalFromUrl();

  if (fetching) {
    return <Layout>loading...</Layout>;
  }

  if (!data?.animal) {
    return (
      <Layout>
        <Box>could not find animal info</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading mb={4}>{data.animal.name}</Heading>
      {data.animal.description}
      <EditDeleteButton
        id={data.animal.id}
        creatorId={data.animal.creator.id}
      />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Animal);
