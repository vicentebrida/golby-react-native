import styled from 'styled-components';

const Container = styled.View`
    flex: 1;
    alignItems: center;
    justifyContent: center;
    backgroundColor: #000000;
`;

const Card = styled.View`
    position: absolute;
    width: 343px;
    height: 454px;
    left: 9px;
    top: 48px;

    background: #000000;
    border: 1px solid #FFFFFF;
    border-radius: 14px;
`;

export { Container, Card };