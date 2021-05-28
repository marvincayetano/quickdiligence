import React from "react";
import NextLink from "next/link";
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";

import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";

import Logo from "../images/logo.svg";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  // data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
    //user is logged in
  } else {
    body = (
      <Flex alignItems="center">
        <NextLink href="/post-animal">
          <Button as={Link} mr={6}>
            create post
          </Button>
        </NextLink>
        <Box mr={6}>{data.me.username}</Box>
        <Button
          onClick={async () => {
            await logout();
            router.reload();
          }}
          isLoading={logoutFetching}
          variant="link"
          textColor="tomato"
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex
      zIndex={1}
      top={0}
      p={4}
      align="center"
      borderBottom="1px solid #ADAEB2"
    >
      <Flex flex={1} align="center" maxW={1200} m="auto">
        <NextLink href="/">
          <Link>
            <Flex alignItems="center">
              <Logo />
              <Heading textColor="#F8BD4B">pet detective</Heading>
            </Flex>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
