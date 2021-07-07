import React, { useState, useEffect, useRef } from "react";
import NextLink from "next/link";
import Nprogress from "nprogress";
import axios from "axios";

import { SearchIcon } from "@chakra-ui/icons";

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";

import {
  Header,
  NavHeader,
  Nav__icon,
  Nav__logo,
  Nav__search,
  Nav__element,
  Nav__support,
  Nav__listItem,
  Nav__container,
  Nav__listSuppBtn,
  Nav__searchInput,
} from "../styles/Header";
import { ModalList } from "./ModalList";

interface NavBarProps {
  setFoundStock: any;
}

export const NavBar: React.FC<NavBarProps> = ({ setFoundStock }) => {
  // This is for how long before search starts
  const DONE_TYPING_INTERVAL = 1900;

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const [stock, setStock] = useState("");
  const [stocks, setStocks] = useState<any[]>([]);
  //   useEffect(() => {}, [stocks]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  let typingTimer: any;

  const doneTyping = () => {
    if (stock.length > 0) {
      // Search for ticker here
      // Wait for 3 seconds before requesting to server
      axios
        // .get(`http://d.yimg.com/autoc.finance.yahoo.com/autoc?query={}&region=1&lang=en"`)
        .get(`http://${process.env.NEXT_PUBLIC_SERVER}/ticker/${stock}`)
        .then((res) => {
          setStocks(res.data);
          console.log("RESULTS", res.data);
        });

      onOpen();
    } else {
      onClose();
    }
    Nprogress.done();
  };

  return (
    <Header>
      <NavHeader>
        <Nav__container>
          <Nav__element role="navigation">
            <Nav__icon>
              <Nav__listItem>
                <NextLink href="">
                  <Nav__logo aria-current="page">
                    <img src="/logo.svg" alt="quickdiligence logo" />
                    <img
                      src="/logoMobile.svg"
                      className="mobileIcon"
                      style={{ display: "none" }}
                      alt="quickdiligence logo"
                    />
                  </Nav__logo>
                </NextLink>
              </Nav__listItem>
            </Nav__icon>
            <Nav__search>
              <Nav__listItem>
                <Nav__searchInput>
                  <input
                    type="text"
                    maxLength={64}
                    spellCheck="false"
                    ref={inputRef}
                    aria-autocomplete="list"
                    autoComplete="false"
                    placeholder="Search for the stock"
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => {
                      setStock(e.target.value);
                    }}
                    onKeyUp={() => {
                      Nprogress.set(0.4);
                      clearTimeout(typingTimer);
                      typingTimer = setTimeout(
                        doneTyping,
                        DONE_TYPING_INTERVAL
                      );
                    }}
                    onKeyDown={() => {
                      clearTimeout(typingTimer);
                    }}
                  />
                  <div>
                    <SearchIcon />
                  </div>
                  <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    trapFocus={false}
                    size="2xl"
                  >
                    <ModalContent>
                      <ModalBody>
                        <li>
                          {stocks.map((s) => (
                            <ModalList
                              key={s.symbol}
                              symbol={s.symbol}
                              name={s.name}
                              setFoundStock={setFoundStock}
                              setStocks={setStocks}
                              onClose={onClose}
                            />
                          ))}
                        </li>
                      </ModalBody>

                      <ModalFooter></ModalFooter>
                    </ModalContent>
                  </Modal>
                </Nav__searchInput>
              </Nav__listItem>
            </Nav__search>
            <Nav__support>
              <Nav__listSuppBtn>
                <a href="https://github.com/marvincayetano/quickdiligence">
                  <span>Github ♥️</span>
                </a>
              </Nav__listSuppBtn>
            </Nav__support>
          </Nav__element>
        </Nav__container>
      </NavHeader>
    </Header>
  );
};
