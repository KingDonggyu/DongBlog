import React from "react";
import styled from "styled-components";

import GlobalStyle from "../components/common/GlobalStyle";
import SideBar from "../components/main/SideBar";

const Container = styled.div`
  height: 100%;
`;

const IndexPage = () => {
  return (
    <Container>
      <GlobalStyle />
      <SideBar />
    </Container>
  );
};

export default IndexPage;
