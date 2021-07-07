import React from "react";
import styled from "styled-components";
import { device } from "../styles/device";

export const ResultContainer: React.FC = ({ children }) => {
  return <Result__Container>{children}</Result__Container>;
};

const Result__Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  margin: 2rem 0;
  width: 100%;
  padding: 0 2rem;
  align-self: center;

  p {
    font-size: 2rem;
    font-weight: 500;
  }

  span {
    font-size: 1.6rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  @media ${device.tablet} {
    padding: 0 1rem;

    p {
      font-size: 1.5rem;
    }

    span {
      font-size: 1.3rem;
    }
  }
`;
