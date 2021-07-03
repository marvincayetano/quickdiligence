import React from "react";

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
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      maxH="sm"
      maxW="80vh"
      d="flex"
      p="1.5rem"
    >
      <Box p="6" maxW="70%">
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
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            fontSize="l"
          >
            {news.title}
          </Box>
        </Link>

        <Divider pb=".8rem" mb="1.2rem" />
        <Box isTruncated color="gray.600" fontSize="1.5rem">
          {news.content}
        </Box>
      </Box>
      <Image
        src={news.urlToImage}
        height="100%"
        maxW="30%"
        alignSelf="center"
      />
    </Box>
  );
};
