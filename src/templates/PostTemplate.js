import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

import Template from "../components/common/Template";
import PostHead from "../components/post/PostHead";
import PostContent from "../components/post/PostContent";
import CommentWidget from "../components/post/CommentWidget";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 900px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  @media (max-width: 1100px) {
    width: 100%;
  }
`;

const PostTemplate = ({ data, location }) => {
  const {
    node: { html, frontmatter },
  } = data.allMarkdownRemark.edges[0];

  return (
    <Template
      title={frontmatter.title}
      description={frontmatter.title}
      url={location.href}
      image={frontmatter.thumbnail.publicURL}
    >
      <Container>
        <ContentWrapper>
          <PostHead {...frontmatter} />
          <PostContent html={html} />
          <CommentWidget />
        </ContentWrapper>
      </Container>
    </Template>
  );
};

export default PostTemplate;

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            date(formatString: "YYYY.MM.DD.")
            category
            categoryColor
            tags
            thumbnail {
              childImageSharp {
                fluid(fit: INSIDE, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
              publicURL
            }
          }
        }
      }
    }
  }
`;
