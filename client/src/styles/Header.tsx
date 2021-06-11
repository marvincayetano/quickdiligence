import styled from "styled-components";

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

  @media (max-width: 960px) {
    height: 6.5rem;
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

const Nav__icon = styled(Nav__list)`
  justify-content: flex-start;
`;

const Nav__support = styled(Nav__list)`
  justify-content: flex-end;
  a {
    text-decoration: none;
  }
`;

const Nav__listItem = styled.li`
  display: inline-block;
  flex: 0 0 auto;
  font-weight: 600;
`;

const Nav__listSuppBtn = styled.li`
  padding-left: 2rem;
  a {
    color: #fff;
    padding-left: 3.2rem;
    padding-right: 3.2rem;
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
    line-height: 1.4;
    font-weight: 700;
    border-style: none;
    border-radius: 9999px;
    background-color: #fab131;

    span {
      color: #f05024;
    }
  }
`;

const Nav__itemLink = styled.a`
  color: #54575a;
  text-decoration: none;
`;

const Nav__logo = styled(Nav__itemLink)`
  display: block;

  &:img {
    max-height: 2.6rem;
    max-width: 100%;
    height: auto;
    border: 0;
  }
`;

export {
  Header,
  NavHeader,
  Nav__icon,
  Nav__logo,
  Nav__element,
  Nav__support,
  Nav__listItem,
  Nav__container,
  Nav__listSuppBtn,
};
