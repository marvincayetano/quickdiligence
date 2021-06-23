import React from "react";

import { useRouter } from "next/router";
import {
  Nav__listItem,
  Nav__searchResult,
  Nav__searchResultContainer,
} from "../styles/Header";

interface ModalListProps {
  symbol: string;
  name: string;
  setFoundStock: any;
  onClose: any;
}

export const ModalList: React.FC<ModalListProps> = ({
  symbol,
  name,
  setFoundStock,
  onClose,
}) => {
  const router = useRouter();

  const onClick = (e: any) => {
    e.preventDefault();
    setFoundStock({ symbol, name });
    router.push(`/${symbol}`);
    onClose();
  };

  return (
    <Nav__searchResultContainer style={{ marginTop: "1rem" }}>
      <Nav__listItem>
        <Nav__searchResult>
          <a
            href="#"
            onClick={(e) => {
              onClick(e);
            }}
          >
            {symbol}
          </a>
          <a
            href="#"
            onClick={(e) => {
              onClick(e);
            }}
            style={{ fontSize: "1.5rem" }}
          >
            {name}
          </a>
        </Nav__searchResult>
      </Nav__listItem>
    </Nav__searchResultContainer>
  );
};
