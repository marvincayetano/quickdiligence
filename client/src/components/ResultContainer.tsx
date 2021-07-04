import React from "react";
import styled from "styled-components";

export const ResultContainer: React.FC = ({ children }) => {
  return <Result__Container>{children}</Result__Container>;
};

const Result__Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  margin-bottom: 4rem;
  border-bottom: 1px solid var(--chakra-colors-gray-200);
  margin-top: 2rem;
  width: 100%;
  align-self: center;

  p {
    padding-right: 1rem;
    font-size: "2rem";
    font-weight: 600;
  }

  span {
    font-size: 1.3rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;
