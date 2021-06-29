import React from 'react'
import styled from 'styled-components';

export const ResultContainer: React.FC = ({ children }) => {
        return (
                <Result__Container>
                    {children}
                </Result__Container>
        );
}

const Result__Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    margin-bottom: 4rem;
`;