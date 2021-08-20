import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

import Template from "../components/common/Template";
import PostHead from "../components/post/PostHead";
import PostContent from "../components/post/PostContent";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;
  margin-top: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);  
`;

const PostTemplate = ({ data: { allMarkdownRemark: { edges } } }) => {
  const { node: { html, frontmatter } } = edges[0];

  return (
    <Template>
      <Container>
        <Wrapper>
          <PostHead {...frontmatter} />
          <PostContent html={html} />
        </Wrapper>
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
            }
          }
        }
      }
    }
  }
`;
