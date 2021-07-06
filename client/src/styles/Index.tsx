import styled from "styled-components";

const Index__symbolContainer = styled.div`
  display: flex;
  background: #f9f7f8;
  justify-content: center;
  align-items: center;

  .info__container {
    display: flex;
    width: 85vh;
    justify-content: space-between;
  }
`;

const Index__symbol = styled.p`
  font-size: 3.5rem;
`;

const Index__name = styled.p`
  font-size: 2rem;
`;

const Index__optionsContainer = styled.div`
  display: flex;
  padding: 2rem;
  background: #f9f7f8;
  justify-content: center;
  padding: 1.5rem;
`;

const Index__optionsTable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 60vw;
`;

const Index__optionsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  width: 100%;
  background: #fff;
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: var(--chakra-shadows-base);
  border-radius: var(--chakra-radii-md);
  margin-bottom: 3rem;
`;

const Index__score = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: 0.3rem;
    text-align: center;
  }
`;

export {
  Index__symbolContainer,
  Index__optionsContainer,
  Index__optionsTable,
  Index__symbol,
  Index__name,
  Index__score,
  Index__optionsDiv,
};
