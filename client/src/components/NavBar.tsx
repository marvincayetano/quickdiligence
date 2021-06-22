import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import Nprogress from "nprogress";
import axios from "axios";

import { MoonIcon, SearchIcon } from "@chakra-ui/icons";

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

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  // This is for how long before search starts
  const DONE_TYPING_INTERVAL = 3000;

  const [stock, setStock] = useState("");
  const [stocks, setStocks] = useState<any[]>([]);
  useEffect(() => {}, [stocks]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  let typingTimer: any;

  const doneTyping = () => {
    if (stock.length > 0) {
      // Search for ticker here
      // Wait for 3 seconds before requesting to server
      axios
        .get(`https://ticker-2e1ica8b9.now.sh/keyword/${stock}`)
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
                  <Nav__logo aria-current="page" target="_self" href="">
                    <img src="/logo.svg" alt="quickdiligence logo" />
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
                    aria-autocomplete="list"
                    autoComplete="false"
                    placeholder="Search for the stock"
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
              <Nav__listItem>
                <a href="">
                  <MoonIcon />
                </a>
              </Nav__listItem>
              <Nav__listSuppBtn>
                <a href="">
                  <span>♥️</span> Support️
                </a>
              </Nav__listSuppBtn>
            </Nav__support>
          </Nav__element>
        </Nav__container>
      </NavHeader>
    </Header>
  );
};
