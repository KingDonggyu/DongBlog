import React from "react";
import styled from "styled-components";

import PostItem from "./PostItem";

const POST_ITEM_DATA = {
  title: "테스트",
  date: "2021.08.11",
  category: "Web",
  tags: ["React", "JavaScript"],
  summary: "테스트!테스트!테스트!원투쓰리포!",
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostList = () => {
  return (
    <Wrapper>
      <PostItem {...POST_ITEM_DATA} />
      <PostItem {...POST_ITEM_DATA} />
      <PostItem {...POST_ITEM_DATA} />
      <PostItem {...POST_ITEM_DATA} />
    </Wrapper>
  );
};

export default PostList;
