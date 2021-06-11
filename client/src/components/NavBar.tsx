import React from "react";
import NextLink from "next/link";

import {
  Header,
  NavHeader,
  Nav__icon,
  Nav__logo,
  Nav__element,
  Nav__support,
  Nav__listItem,
  Nav__container,
  Nav__listSuppBtn,
} from "../styles/Header";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
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
            <Nav__support>
              <Nav__listItem>
                <a href="">☾</a>
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
