import React, { useMemo } from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const TagItem = styled(Link)`
  border: 1px white solid;
  border-radius: 4px;
  margin: 20px 20px 0 0;
  padding: 3px 5px;
  font-size: 14px;
  cursor: pointer;
  ${({ active }) =>
    active &&
    `
     background-color: white;
    color: black; 
  `};
  &:hover {
    background-color: white;
    color: black;
  }
`;

const TagList = ({ posts, selectedTag }) => {
  const tagList = useMemo(
    () =>
      posts.reduce(
        ( list, { node: { frontmatter: { tags } } } ) => {
          tags.forEach((tag) => {
            if (!list.includes(tag)) list.push(tag);
          });
          return list;
        }, []
      ), []
  );

  return (
    <Wrapper>
      {tagList.map((tag) => (
        <TagItem
          to={`/?tag=${tag}`}
          active={tag === selectedTag ? 1 : 0}
          key={tag}
        >
          # {tag}
        </TagItem>
      ))}
    </Wrapper>
  );
};

export default TagList;
