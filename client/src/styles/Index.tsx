import styled from "styled-components";
import { device } from "./device";

const Index__symbolContainer = styled.div`
  display: flex;
  background: #f9f7f8;
  justify-content: center;
  align-items: center;

  .info__container {
    display: flex;
    width: 85vh;
    padding: 0 2rem;
    justify-content: space-between;
    align-items: center;
  }

  .info__price {
    align-self: center;
    font-size: 3rem;

    @media ${device.tablet} {
      font-size: 2.5rem;
    }
  }
`;

const Index__symbol = styled.p`
  font-size: 3.5rem;
  @media ${device.tablet} {
    font-size: 3rem;
  }
`;

const Index__name = styled.p`
  font-size: 2rem;
  @media ${device.tablet} {
    font-size: 1.2rem;
  }
`;

const Index__optionsContainer = styled.div`
  display: flex;
  background: #f9f7f8;
  justify-content: center;
  padding: 1.5rem;

  @media ${device.tablet} {
    padding: 2rem 1rem;
  }
`;

const Index__optionsTable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60vw;

  @media ${device.laptop} {
    width: 80vw;
  }

  @media ${device.tablet} {
    width: 95vw;
  }
`;

const Index__optionsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background: #fff;
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: var(--chakra-shadows-base);
  border-radius: var(--chakra-radii-md);
  margin-bottom: 3rem;

  .css-1139cdo {
    @media ${device.tablet} {
      padding: 0 1rem;
    }
  }
`;

const Index__score = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    font-size: 4rem;
    font-weight: 500;
    letter-spacing: 0.3rem;
    text-align: center;
    font-style: italic;

    @media ${device.tablet} {
      font-size: 3rem;
    }
  }
`;

const Index__desc = styled.span`
  text-align: center;
  font-size: 2.3rem;
  color: #55575a;
  margin-left: 1rem;
  margin-right: 5px;
  font-weight: 500;

  @media ${device.tablet} {
    font-size: 1.9rem;
  }
`;

export {
  Index__symbolContainer,
  Index__optionsContainer,
  Index__optionsTable,
  Index__symbol,
  Index__name,
  Index__score,
  Index__desc,
  Index__optionsDiv,
};
