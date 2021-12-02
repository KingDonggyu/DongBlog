import React from "react";
import styled from "styled-components";

import PostItemHead from "./PostItemHead";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 1.5em;
  font-weight: 400;
  @media (max-width: 1100px) {
    font-size: 15px;
    margin: 7px 0 15px 0;
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
