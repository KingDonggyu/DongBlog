import React from "react";
import styled from "styled-components";

import PostItemHead from "./PostItemHead";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  color: white;
`;

const Title = styled.h2`
  @media (max-width: 1100px) {
    font-size: 15px;
  }
`;

const Date = styled.div`
  color: darkgray;
  text-align: right;
  @media (max-width: 1100px) {
    font-size: 10px;
  }
`;

const PostItemInfo = ({ title, date, category, categoryColor, tags }) => {
  return (
    <Wrapper>
      <PostItemHead
        category={category}
        categoryColor={categoryColor}
        tags={tags}
      />
      <Title>{title}</Title>
      <Date>Posted {date}</Date>
    </Wrapper>
  );
};

export default PostItemInfo;
