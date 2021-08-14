import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  background-color: red;
  border-radius: 4px;
  padding: 3px 8px;
  font-weight: 700;
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

const PostItemHeader = ({ category, tags }) => {
  return (
    <Wrapper>
      <Category>{category}</Category>
      <TagList>
        {tags.map((name) => (
          <TagItem key={name}># {name}</TagItem>
        ))}
      </TagList>
    </Wrapper>
  );
};

export default PostItemHeader;
