import styled from "styled-components";

const Index__symbolContainer = styled.div`
  display: flex;
  background: #f9f7f8;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  .btn__analyze {
    padding-left: 2rem;

    button {
      font-size: 2rem;
      height: 4rem;
    }
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
`;

const Index__optionsTable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  width: 60vw;
  background: #fff;
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: var(--chakra-shadows-base);
  border-radius: var(--chakra-radii-md);
`;

export {
  Index__symbolContainer,
  Index__optionsContainer,
  Index__optionsTable,
  Index__symbol,
  Index__name,
};
