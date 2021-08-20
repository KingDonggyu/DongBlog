import React from "react";
import styled from "styled-components";

import PostItemHead from "../main/PostItemHead";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Category = styled.span``;

const Tag = styled.span``;

const Date = styled.div``;

const PostHeadInfo = ({ date, category, categoryColor, tags }) => {
  return (
    <Wrapper>
      <PostItemHead category={category} categoryColor={categoryColor} tags={tags} />
      <Date>{date}</Date>
    </Wrapper>
  );
};

export default PostHeadInfo;
