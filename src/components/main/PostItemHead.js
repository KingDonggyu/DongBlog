import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 3px 5px;
  font-weight: 700;
  ${({color}) => `background-color: ${color};`}
`;

const TagList = styled.div`
  display: flex;
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid;
  border-radius: 4px;
  margin-left: 10px;
  padding: 3px 5px;
`;

const PostItemHead = ({ category, categoryColor, tags }) => {
  return (
    <Wrapper>
      <Category color={categoryColor}>{category}</Category>
      <TagList>
        {tags.map((tag) => (
          <TagItem key={tag}># {tag}</TagItem>
        ))}
      </TagList>
    </Wrapper>
  );
};

export default PostItemHead;
