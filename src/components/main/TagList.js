import React, { useMemo } from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import queryString from "query-string";

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

const TagList = ({ search, posts }) => {
  const parsed = queryString.parse(search);
  const selectedTag = typeof parsed.tag !== "string" || !parsed.category ? "All" : parsed.tag;
  const tagList = useMemo(() => posts.reduce(
    (list, {node:{frontmatter:{tags}}}) => {
      tags.forEach((tag) => { if (!list.includes(tag)) list.push(tag); });
      return list;
    }, ["All"]), []);

  return (
    <Wrapper>
      {tagList.map((name) => (
        <TagItem
          to={`/?tag=${name}`}
          active={name === selectedTag ? 1 : 0}
          key={name}
        >
          # {name}
        </TagItem>
      ))}
    </Wrapper>
  );
};

export default TagList;
