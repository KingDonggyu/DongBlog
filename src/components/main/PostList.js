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

// const Background = styled.div`
//   height: 100%;
//   /* position: fixed; */
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const Wrapper = styled.div`
  /* width: 1030px; */
  /* height: 90%; */
  display: flex;
  flex-direction: column;
  padding: 25px;
  /* overflow-y: scroll; */
`;

const PostList = () => {
  return (
    // <Background>
      <Wrapper>
        <PostItem {...POST_ITEM_DATA} />
        <PostItem {...POST_ITEM_DATA} />
        <PostItem {...POST_ITEM_DATA} />
        <PostItem {...POST_ITEM_DATA} />
        <PostItem {...POST_ITEM_DATA} />
        <PostItem {...POST_ITEM_DATA} />
        <PostItem {...POST_ITEM_DATA} />
      </Wrapper>
    // </Background>
  );
};

export default PostList;
