import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";

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
  @media (max-width: 768px) {
    padding: 0 !important;
  }
`;

const IndexPage = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges;
  return (
    <Container>
      <GlobalStyle />
      <SideBar
        profileImage={data.file.childImageSharp.fluid}
        search={location.search}
        posts={posts}
      />
      <Content>
        {/* <Header /> */}
        <PostList posts={posts} />
        <Footer />
      </Content>
    </Container>
  );
};

export default IndexPage;

export const queryPostList = graphql`
  query queryPostList {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY.MM.DD.")
            category
            tags
            thumbnail {
              childImageSharp {
                fluid(
                  maxWidth: 150
                  maxHeight: 150
                  fit: INSIDE
                  quality: 100
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        fluid(maxWidth: 130, maxHeight: 130, fit: INSIDE, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
