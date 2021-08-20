import React from "react";
import styled from "styled-components";

import GlobalStyle from "./GlobalStyle";
import Footer from "./Footer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Template = ({ children }) => {
  return (
    <Container>
      <GlobalStyle />
      {children}
      <Footer />
    </Container>
  );
};

export default Template;
