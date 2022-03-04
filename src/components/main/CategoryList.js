import React, { useMemo } from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 15px;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
  padding: 20px 0;
  margin: 0px 10px 30px 10px;
  background: white;
`;

const CategoryItem = styled(Link)`
  width: fit-content;
  padding: 10px;
  padding-left: 30px;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
  &:after {
    content: "";
    display: block;
    border-bottom: 2px solid black;
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
  ${({ active }) =>
    active &&
    `font-weight: 700;
    &:after {
      width: 100%;
    }`
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
          •&nbsp;&nbsp;&nbsp;{name}&nbsp;&nbsp;
          <span style={{fontSize: '10px'}}>{count}</span>
        </CategoryItem>
      ))}
    </Wrapper>
  );
};

export default CategoryList;
