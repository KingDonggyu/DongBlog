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
  @media (max-width: 1100px) {
    padding: 0 !important;
  }
`;

const IndexPage = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges;
  const { publicURL, childImageSharp } = data.file;
  const { title, description, author, siteUrl } = data.site.siteMetadata;
  const parsed = queryString.parse(location.search);

  const selectedTag =
    typeof parsed.tag !== "string" || !parsed.tag ? "All" : parsed.tag;
  const selectedCategory =
    typeof parsed.category !== "string" || !parsed.category
      ? "All"
      : parsed.category;

  return (
    <Template
      title={title}
      description={description}
      author={author}
      url={siteUrl}
      image={publicURL}
    >
      <SideBar
        posts={posts}
        selectedTag={selectedTag}
        selectedCategory={selectedCategory}
        profileImage={childImageSharp.fluid}
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
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
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
      publicURL
      childImageSharp {
        fluid(maxWidth: 130, maxHeight: 130, fit: INSIDE, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
