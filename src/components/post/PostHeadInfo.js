import React from "react";
import styled from "styled-components";

import PostItemHead from "../main/PostItemHead";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const Date = styled.div`
  color: lightgray;
  @media (max-width: 1100px) {
    text-align: end;
    margin-top: 15px;
  }
`;

const PostHeadInfo = ({ date, category, categoryColor, tags }) => {
  return (
    <Wrapper>
      <PostItemHead
        category={category}
        categoryColor={categoryColor}
        tags={tags}
      />
      <Date>Posted {date}</Date>
    </Wrapper>
  );
};

export default PostHeadInfo;
