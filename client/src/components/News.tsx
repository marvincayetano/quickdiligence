import React from "react";
import styled from "styled-components";

import { Box, Image, Divider, Link } from "@chakra-ui/react";

export interface NewsInterface {
  source: { id: string; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface NewsProps {
  news: NewsInterface;
}

export const News: React.FC<NewsProps> = ({ news }) => {
  return (
    <News__container>
      <Box p="6" width="50%">
        <Box d="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="1rem"
            textTransform="uppercase"
            ml="2"
          >
            {news.source.name}
          </Box>
        </Box>

        <Link href={news.url} isExternal>
          <News__title>{news.title}</News__title>
        </Link>

        <Divider pb=".8rem" mb="1.2rem" />
        <Box isTruncated color="gray.600" fontSize="1.5rem">
          {news.content}
        </Box>
      </Box>
      <Image
        src={news.urlToImage}
        height="100%"
        maxW="40%"
        alignSelf="center"
      />
    </News__container>
  );
};

const News__title = styled.p`
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
`;

const News__container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: var(--chakra-shadows-base);
  border-radius: var(--chakra-radii-md);
  margin-bottom: 3rem;
`;
