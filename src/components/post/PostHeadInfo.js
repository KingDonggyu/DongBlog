import React from "react";
import styled from "styled-components";

import PostItemHead from "../main/PostItemHead";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  flex-direction: column;
  border-top: 2px solid #2e2e2e;
  margin-top: 20px;
`;

const Date = styled.div`
  color: darkgray;
  text-align: end;
  margin-top: 15px;
  margin-bottom: 20px;
`;

const PostHeadInfo = ({ date, category, categoryColor, tags }) => {
  return (
    <Wrapper>
      <Date>Posted {date}</Date>
      <PostItemHead
        category={category}
        categoryColor={categoryColor}
        tags={tags}
      />
    </Wrapper>
  );
};

export default PostHeadInfo;
