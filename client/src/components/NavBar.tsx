import React from "react";
import NextLink from "next/link";

import {
  Header,
  NavHeader,
  Nav__icon,
  Nav__logo,
  Nav__element,
  Nav__container,
} from "../styles/Header";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Header>
      <NavHeader>
        <Nav__container>
          <Nav__element role="navigation">
            <Nav__icon>
              <NextLink href="/login">
                <Nav__logo aria-current="page" target="_self" href="">
                  <img src="/logo.svg" alt="quickdiligence logo" />
                </Nav__logo>
              </NextLink>
            </Nav__icon>
          </Nav__element>
        </Nav__container>
      </NavHeader>
    </Header>
  );
};
