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
    <Nav__searchResultContainer>
      <Nav__listItem>
        <Nav__searchResult>
          <a href="">{symbol}</a>
          <a href="">{name}</a>
        </Nav__searchResult>
      </Nav__listItem>
    </Nav__searchResultContainer>
  );
};
