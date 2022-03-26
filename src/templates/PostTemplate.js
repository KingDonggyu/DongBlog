import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

import Template from "../components/common/Template";
import PostHead from "../components/post/PostHead";
import PostContent from "../components/post/PostContent";
import PostNavigation from "../components/post/PostNavigation";
import CommentWidget from "../components/post/CommentWidget";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  width: 1030px;
  padding: 0 50px 50px 50px;
  border-radius: 15px;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
  margin-top: 30px;
  @media (max-width: 1100px) {
    width: 100%;
    padding: 0;
  }
`;

const PostTemplate = ({ data, pageContext, location }) => {
  const {
    node: { id, html, frontmatter },
  } = data.allMarkdownRemark.edges[0];

  const { previous, next } = pageContext;

  return (
    <Template
      title={frontmatter.title}
      description={frontmatter.title}
      author={frontmatter.author}
      url={location.href}
    >
      <Container>
        <ContentWrapper>
          <PostHead {...frontmatter} />
          <PostContent html={html} />
          <PostNavigation previous={next} next={previous} />
          <CommentWidget url={location.href} id={id} tile={frontmatter.title} />
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
          id
          html
          frontmatter {
            title
            date(formatString: "YYYY.MM.DD.")
            category
            categoryColor
            tags
          }
        }
      }
    }
  }
`;
