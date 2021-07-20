import styled from "styled-components";

export const Container = styled.div`
  margin: 64px;
  a {
    color: ${({ theme }) => theme.colors.blue};
  }
  .accent-line {
    background-image: url("./text-highlight.png");
    background-position: 50% 100%;
    background-size: contain;
    background-repeat: no-repeat;
  }
`;
export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const Title = styled.h1`
  text-align: center;
  max-width: 840px;
  margin-bottom: 48px;
  font-size: 76px;
  line-height: 1.05;
`;
export const Subtitle = styled.h3`
  text-align: center;
  font-size: 28px;
  line-height: 1;
  font-weight: 500;
  letter-spacing: -0.03em;
  margin: 16px 0;
`;
export const Paragraph = styled.p`
  text-align: center;
  max-width: 540px;
  margin-bottom: 48px;
  font-size: 24px;
  line-height: 1.4;
`;
