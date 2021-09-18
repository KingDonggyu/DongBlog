import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const Category = styled(Link)`
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 3px 5px;
  font-weight: 700;
  height: max-content;
  ${({ color }) => `background-color: ${color};`}
  &:hover {
    color: black;
  }
  @media (max-width: 768px) {
    height: 20px;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const TagItem = styled(Link)`
  display: flex;
  align-items: center;
  border: 1px solid;
  border-radius: 4px;
  margin: 0 0 10px 10px;
  padding: 3px 5px;
  &:hover {
    color: black;
  }
  @media (max-width: 768px) {
    height: 20px;
  }
`;

const PostItemHead = ({ category, categoryColor, tags }) => {
  return (
    <Wrapper>
      <Category color={categoryColor} to={`/?category=${category}`}>
        {category}
      </Category>
      <TagList>
        {tags.map((tag) => (
          <TagItem key={tag} to={`/?tag=${tag}`}>
            # {tag}
          </TagItem>
        ))}
      </TagList>
    </Wrapper>
  );
};

export default PostItemHead;
