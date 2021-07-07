import React from "react";
import styled from "styled-components";
import NextLink from "next/link";

import { SearchIcon } from "@chakra-ui/icons";

import { device } from "../styles/device";
import { Nav__icon__main, Nav__logo, Nav__listItem } from "../styles/Header";

interface MainProps {
  setInputClick: any;
}

export const Main: React.FC<MainProps> = ({ setInputClick }) => {
  return (
    <Main__container>
      <Hero__container>
        <Nav__icon__main>
          <Nav__listItem>
            <NextLink href="">
              <Nav__logo aria-current="page">
                <img src="/logo.svg" alt="quickdiligence logo" />
              </Nav__logo>
            </NextLink>
          </Nav__listItem>
        </Nav__icon__main>
        <span color="gray.500">
          A quick stock analyzer for your next 💎 hanzzz
        </span>
        <Main__searchInput>
          <input
            type="text"
            spellCheck="false"
            aria-autocomplete="list"
            autoComplete="false"
            placeholder="Let's start a quick analyze"
            onClick={() => {
              setInputClick(true);
            }}
          />
          <div>
            <SearchIcon />
          </div>
        </Main__searchInput>
      </Hero__container>
    </Main__container>
  );
};

const Main__container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100vw;
  letter-spacing: 0.5px;
  font-weight: 400;
  text-align: center;

  @media ${device.tablet} {
    padding: 0 2.5rem;

    input {
      font-size: 2rem;
    }
  }
`;

const Hero__container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2.2rem;
`;

const Main__searchInput = styled.div`
  display: flex;
  -webkit-box-align: stretch;
  align-items: stretch;
  position: relative;
  color: #54575a;
  width: 100%;
  margin-top: 1rem;

  input {
    width: 100%;
    height: 5rem;
    padding-left: 5rem;
    font-weight: 500;
    outline: transparent solid 2px;
    outline-offset: 2px;
    background: #fff;
    padding-inline-end: var(--chakra-space-4);
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: var(--chakra-shadows-base);
    border-radius: var(--chakra-radii-md);
  }

  div {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: absolute;
    left: var(--chakra-space-7);
    height: 5rem;
    color: var(--chakra-colors-gray-400);
  }

  *,
  ::before,
  ::after {
    border-color: var(--chakra-colors-gray-200);
    overflow-wrap: break-word;
  }
  *,
  ::before,
  ::after {
    border-width: 0px;
    border-style: solid;
    box-sizing: border-box;
  }
`;
