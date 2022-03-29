import React, { useMemo } from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  border-radius: 15px;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
  padding: 20px 20px;
  margin: 0px 10px;
  background: white;
  @media (max-width: 1100px) {
    width: 380px;
    box-sizing: content-box;
    margin: 10px 20px;
  }
`;

const TagItem = styled(Link)`
  border: 1px solid;
  border-radius: 4px;
  margin: 10px 10px 0 0;
  padding: 3px 5px;
  font-size: 10px;
  font-weight: 300;
  color: #868e96;
  cursor: pointer;
  height: fit-content;
  ${({ active }) =>
    active && `
    color: black;
    `
    };
  &:hover {
    color: black;
  }
`;

const TagList = ({ posts, selectedTag }) => {
  const tagList = useMemo(
    () => posts.reduce(
      ( list, { node: { frontmatter: { tags } } } ) => {
        tags.forEach((tag) => {
          if (!list.includes(tag)) list.push(tag);
        });
        return list;
      }, []
    ), []
  );

  tagList.sort();

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
