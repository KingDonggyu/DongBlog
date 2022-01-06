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
  border: 1px solid;
  border-radius: 4px;
  margin: 10px 10px 0 0;
  padding: 3px 5px;
  font-size: 10px;
  font-weight: 300;
  cursor: pointer;
  ${({ active }) =>
    active &&
    `box-shadow: 0 0 3px #606163;
    font-weight: 500; `};
  &:hover {
    box-shadow: 0 0 3px #606163;
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
