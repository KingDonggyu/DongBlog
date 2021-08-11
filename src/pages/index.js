import React from "react";
import styled from "styled-components";

import GlobalStyle from "../components/common/GlobalStyle";
import Header from "../components/common/Header";
import SideBar from "../components/main/SideBar";
import PostList from "../components/main/PostList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  padding-left: 350px;
`;

const IndexPage = () => {
  return (
    <Container>
      <GlobalStyle />
      <SideBar />
      <Content>
        <PostList />
      </Content>
    </Container>
  );
};

export default IndexPage;
