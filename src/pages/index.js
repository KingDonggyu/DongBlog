import React from "react";
import styled from "styled-components";

import GlobalStyle from "../components/common/GlobalStyle";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SideBar from "../components/main/SideBar";
import PostList from "../components/main/PostList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Content = styled.div`
  padding-left: 400px;
  padding-right: 25px;
`;

const IndexPage = () => {
  return (
    <Container>
      <GlobalStyle />
      <SideBar />
      <Content>
        {/* <Header /> */}
        <PostList />
        <Footer />
      </Content>
    </Container>
  );
};

export default IndexPage;
