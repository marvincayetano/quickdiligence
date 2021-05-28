import React, { useEffect, useState } from "react";
import { withUrqlClient } from "next-urql";
import Cookies from "universal-cookie";

import { Stack, Flex, Button } from "@chakra-ui/react";

import { Layout } from "../components/Layout";
import { useAnimalsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { AnimalContainer } from "../components/AnimalContainer";
import { OptionsContainer } from "../components/OptionsContainer";

const getBrowserCookies = () => {
  const cookies = new Cookies();
  // TODO: ADD THIS TO CONSTANTS
  const currentOptions = cookies.get("options");
  // TODO: Add options interface here
  const types: string[] = [];
  const locations: number[] = [];

  if (currentOptions !== undefined) {
    currentOptions.map((option: Object) => {
      if (option.category === "Type") types.push(option.title);
      if (option.category === "Location") locations.push(option.locationId);
    });
  }

  return [types, locations];
};

const Index = () => {
  const cookies = new Cookies();
  // TODO: Add options interface here

  const currentCookies = getBrowserCookies();

  const [variables, setVariables] = useState({
    limit: 10,
    type: currentCookies[0],
    location: currentCookies[1],
    // cursor: null as null | string,
  });

  console.log("INITIAL cookies", variables);

  const [options, setOptions] = useState(cookies.get("options") || []);
  useEffect(() => {
    cookies.set("options", options, { path: "/" });
    // TODO CURRENTLY: Requery here for new options
    // setVariables with new options
    // const type: string[] = [];
    // const location: number[] = [];

    // options.map((option) => {
    //   if (option.category === "Type") type.push(option.title);
    //   if (option.category === "Location") location.push(option.locationId);
    // });

    // console.log(options);
    // setVariables({ ...variables, type, location });
  }, [options]);

  const [isOptionsOpen, setIsOptionsOpen] = useState(true);
  // TODO: Find a way to refresh this
  const [{ data, error, fetching }] = useAnimalsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <Layout>
      <Flex justifyContent="flex-end" mb={5}>
        <Button
          rightIcon={isOptionsOpen ? <ArrowDownIcon /> : <ArrowUpIcon />}
          background="#FFF"
          variant="outline"
          size="sm"
          onClick={() => {
            setIsOptionsOpen(!isOptionsOpen);
          }}
        >
          options
        </Button>
      </Flex>
      {!isOptionsOpen === true && (
        <OptionsContainer options={options} setOptions={setOptions} />
      )}
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack alignItems="center" spacing={8}>
          {data!.animals.animals.map((animal) =>
            !animal
              ? null
              : AnimalContainer({
                  id: animal.id,
                  imgLink: animal.imgLink,
                  creatorId: animal.creator.id,
                  age: animal.age,
                  name: animal.name,
                  username: animal.creator.username,
                  gender: animal.gender,
                  color: animal.color,
                  status: animal.status,
                  descSnippet: animal.descSnippet,
                })
          )}
        </Stack>
      )}
      {data && data.animals.hasMore ? (
        <Flex>
          <Button
            m="auto"
            my={8}
            onClick={() => {
              setVariables({ ...variables, limit: variables.limit });
              //   setVariables({
              //     limit: variables.limit,
              //     cursor:
              //       data.animals.animals[data.animals.animals.length - 1]
              //         .createdAt,
              //   });
            }}
          >
            Load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
