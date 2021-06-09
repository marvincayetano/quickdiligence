import React from "react";
import NextLink from "next/link";

import Logo from "../images/logo.svg";
import {
  Header,
  NavHeader,
  Nav__container,
  Nav__element,
  Nav__icon,
} from "../styles/Header";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Header>
      <NavHeader>
        <Nav__container>
          <Nav__element role="navigation">
            <Nav__icon></Nav__icon>
          </Nav__element>
        </Nav__container>
      </NavHeader>
    </Header>
  );
};
