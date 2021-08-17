import React from "react";
import styled from "styled-components";

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
  padding: 25px;
  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const PostList = ({ posts }) => {
  return (
    <Wrapper>
      {posts.map(({ node: { id, frontmatter } }) => (
        <PostItem {...frontmatter} key={id} />
      ))}
    </Wrapper>
  );
};

export default PostList;
