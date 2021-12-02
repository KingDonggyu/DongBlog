import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Category = styled(Link)`
  height: max-content;
  font-weight: 700;
  font-size: 20px;
  text-transform: uppercase;
  ${({ color }) => `color: ${color};`}
  &:after {
    content: "";
    display: block;
    ${({ color }) => `border-bottom: 3px solid ${color};`}
    width: 0;
  }
  &:after {
    left: 0;
  }
  &:hover:after {
    width: 100%;
  }
  &:after {
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  &:hover {
    ${({ color }) => `color: ${color};`}
  }
  @media (max-width: 768px) {
    height: 20px;
    font-size: 13px;
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
  font-size: 12px;
  font-weight: 300;
  &:hover {
    box-shadow: 0 0 3px #606163;
  }
  @media (max-width: 768px) {
    height: 20px;
    font-size: 10px;
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
