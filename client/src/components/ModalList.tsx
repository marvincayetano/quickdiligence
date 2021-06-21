import React from "react";
import {
  Nav__listItem,
  Nav__searchResult,
  Nav__searchResultContainer,
} from "../styles/Header";

interface ModalListProps {}

export const ModalList: React.FC<ModalListProps> = ({}) => {
  return (
    <Nav__searchResultContainer>
      <Nav__listItem>
        <Nav__searchResult>
          <a href="">A.TSX Alphabet</a>
        </Nav__searchResult>
        {/* <div>👀</div> */}
      </Nav__listItem>
    </Nav__searchResultContainer>
  );
};
