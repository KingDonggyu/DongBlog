import React from "react";
import styled from "styled-components";

import PostItemHead from "../Main/PostItemHead";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Date = styled.div`
  color: lightgray;
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
