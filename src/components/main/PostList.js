import React, { useMemo } from "react";
import styled from "styled-components";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

import PostItem from "./PostItem";

const POST_ITEM_DATA = {
  title: "테스트",
  date: "2021.08.11",
  category: "Web",
  tags: ["React", "JavaScript"],
  thumbnail:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png",
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 13px;
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
