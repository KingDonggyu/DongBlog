import React, { useMemo } from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const CategoryItem = styled(Link)`
  padding: 10px;
  padding-left: 30px;
  font-size: 14px;
  cursor: pointer;
  &:hover { background-color: #737272; }
  ${({ active }) =>
    active &&
    `font-weight: 800;
     background-color: gray;`
  };
`;

const CategoryList = ({ posts, selectedCategory, selectedTag }) => {
  const categoryList = useMemo(
    () =>
      posts.reduce(
        ( list, { node: { frontmatter: { category } } } ) => {
          if (list[category] === undefined) list[category] = 1;
          else list[category]++;
          list['All']++;
          return list;
        }, { All: 0 }
      ), []
  );

  return (
    <Wrapper>
      {Object.entries(categoryList).map(([name, count]) => (
        <CategoryItem
          to={name === "All" ? `/` : `/?category=${name}`}
          active={name === selectedCategory && selectedTag === "All" ? 1 : 0}
          key={name}
        >
          &#9654;&nbsp;&nbsp;&nbsp;{name}&nbsp;&nbsp;({count})
        </CategoryItem>
      ))}
    </Wrapper>
  );
};

export default CategoryList;
