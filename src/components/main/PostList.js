import React, { useMemo } from "react";
import styled from "styled-components";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

import PostItem from "./PostItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const PostList = ({ posts, selectedTag, selectedCategory }) => {
  const { postList, containerRef } = useInfiniteScroll(
    posts,
    selectedTag,
    selectedCategory
  );

  return (
    <Wrapper ref={containerRef}>
      {postList.map(({ node: { id, fields: { slug }, frontmatter } }) => (
        <PostItem {...frontmatter} link={slug} key={id} />
      ))}
    </Wrapper>
  );
};

export default PostList;
