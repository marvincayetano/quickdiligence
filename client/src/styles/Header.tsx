import styled from "styled-components";
import { device } from "./device";

const Header = styled.div`
  position: relative;
  z-index: 20;
  flex: 0 0 auto;
  padding-bottom: 6.4rem;
`;

const NavHeader = styled.header`
  position: fixed;
  width: 100%;
`;

const Nav__container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 7.5rem;
  background: #fff;
  transition: box-shadow 0.7s cubic-bezier(0.19, 1, 0.4, 1);

  @media ${device.laptop} {
    height: 6.5rem;
  }

  @media ${device.tablet} {
    padding: 0 1rem;
  }
`;

const Nav__element = styled.div`
  display: inline-flex;
  width: 100%;
  max-width: 1680px;
  margin: 0 auto;
  padding: 0 16px;
`;

const Nav__list = styled.ul`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Nav__icon__main = styled(Nav__list)`
  justify-content: flex-start;
`;

const Nav__icon = styled(Nav__list)`
  justify-content: flex-start;

  img {
    @media ${device.laptop} {
      display: none;
    }
  }

  .mobileIcon {
    @media ${device.laptop} {
      display: block !important;
      max-height: 6rem;
      max-width: 100%;
      min-width: 80%;
      height: auto;
      border: 0;
      vertical-align: middle;
    }
  }
`;

const Nav__search = styled(Nav__list)`
  justify-content: center;

  li {
    flex: 1 0 auto;
  }
`;

const Nav__support = styled(Nav__list)`
  justify-content: flex-end;
  a {
    text-decoration: none;
  }

  @media ${device.tablet} {
    display: none;
  }
`;

const Nav__listItem = styled.li`
  display: inline-block;
  flex: 0 0 auto;
  font-weight: 600;

  &:hover {
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgb(0 0 0 / 0%);
    background: var(--chakra-colors-green-200);
  }
`;

const Nav__listSuppBtn = styled.li`
  padding-left: 2rem;
  a {
    color: #f05024;
    padding-left: 2.2rem;
    padding-right: 2.2rem;
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
    line-height: 1.4;
    font-weight: 700;
    border-style: none;
    border-radius: 9999px;
    background-color: #fff;
    border-color: var(--chakra-colors-gray-200);
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-radius: var(--chakra-radii-md);

    span {
      color: #f05024;
    }
  }
`;

const Nav__logo = styled.div`
  display: block;

  &:img {
    max-height: 2.6rem;
    max-width: 100%;
    min-width: 70%;
    height: auto;
    border: 0;
  }
`;

const Nav__searchResultContainer = styled(Nav__search)`
  outline: transparent solid 2px;
  outline-offset: 2px;
  background: #fff;
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: var(--chakra-shadows-base);
  border-radius: var(--chakra-radii-md);
`;

const Nav__searchInput = styled.div`
  display: flex;
  -webkit-box-align: stretch;
  align-items: stretch;
  position: relative;
  color: #54575a;

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

const Nav__searchResult = styled.div`
  display: flex;
  align-items: center;
  height: 5rem;
  padding-left: 2rem;
  color: #54575a;

  a {
    flex: 1;
    font-weight: 500;
  }
`;
// TODO: USE VAR FOR COLORS AND MEDIA QUERIES

export {
  Header,
  NavHeader,
  Nav__icon,
  Nav__icon__main,
  Nav__logo,
  Nav__search,
  Nav__element,
  Nav__support,
  Nav__listItem,
  Nav__container,
  Nav__listSuppBtn,
  Nav__searchInput,
  Nav__searchResult,
  Nav__searchResultContainer,
};
