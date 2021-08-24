import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import GlobalStyle from "components/common/GlobalStyle";

const NotFoundPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
`;

const NotFoundText = styled.div`
  font-size: 150px;
  font-weight: 800;
  @media (max-width: 768px) {
    font-size: 100px;
  }
`;

const NotFoundDescription = styled.div`
  font-size: 25px;
  text-align: center;
  line-height: 1.3;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const GoToMainButton = styled(Link)`
  margin-top: 30px;
  font-size: 20px;
  text-decoration: underline;
  &:hover {
    color: lightgray;
    text-decoration: underline;
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundPageWrapper>
      <GlobalStyle />
      <NotFoundText>404</NotFoundText>
      <NotFoundDescription>
        죄송합니다. 찾을 수 없는 페이지입니다.
      </NotFoundDescription>
      <GoToMainButton to="/"> ➔ 메인으로</GoToMainButton>
    </NotFoundPageWrapper>
  );
};

export default NotFoundPage;
