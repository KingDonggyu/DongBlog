import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import queryString from "query-string";

import Template from "../components/common/Template";
import SideBar from "../components/main/SideBar";
import PostList from "../components/main/PostList";


const Content = styled.div`
  padding-left: 400px;
  padding-right: 25px;
  @media (max-width: 768px) {
    padding: 0 !important;
  }
`;

const IndexPage = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges;
  const parsed = queryString.parse(location.search);
  const selectedTag =
    typeof parsed.tag !== "string" || !parsed.tag ? "All" : parsed.tag;
  const selectedCategory =
    typeof parsed.category !== "string" || !parsed.category
      ? "All"
      : parsed.category;

  return (
    <Template>
      <SideBar
        posts={posts}
        selectedTag={selectedTag}
        selectedCategory={selectedCategory}
        profileImage={data.file.childImageSharp.fluid}
      />
      <Content>
        <PostList
          posts={posts}
          selectedTag={selectedTag}
          selectedCategory={selectedCategory}
        />
      </Content>
    </Template>
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
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY.MM.DD.")
            category
            categoryColor
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
