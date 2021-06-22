import React from "react";
import {
  Nav__listItem,
  Nav__searchResult,
  Nav__searchResultContainer,
} from "../styles/Header";

interface ModalListProps {
  symbol: string;
  name: string;
}

export const ModalList: React.FC<ModalListProps> = ({ symbol, name }) => {
  return (
    <Nav__searchResultContainer style={{ marginTop: "1rem" }}>
      <Nav__listItem>
        <Nav__searchResult>
          <a href="">{symbol}</a>
          <a href="" style={{ fontSize: "1.5rem" }}>
            {name}
          </a>
        </Nav__searchResult>
      </Nav__listItem>
    </Nav__searchResultContainer>
  );
};
