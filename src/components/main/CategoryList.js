import React, { useMemo } from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const CategoryItem = styled(Link)`
  padding: 10px;
  padding-left: 30px;
  font-size: 18px;
  cursor: pointer;
  &:hover { background-color: #737272; }
  ${({ active }) =>
    active &&
    `font-weight: 800;
     background-color: gray;`
  };
`;

const CategoryList = ({ posts, selectedCategory }) => {
  const categoryList = useMemo(
    () =>
      posts.reduce(
        ( list, { node: { frontmatter: { category } } } ) => {
          if (!list.includes(category)) list.push(category);
          return list;
        }, ["All"]
      ), []
  );

  return (
    <Wrapper>
      {categoryList.map((category) => (
        <CategoryItem
          to={category === "All" ? `/` : `/?category=${category}`}
          active={category === selectedCategory ? 1 : 0}
          key={category}
        >
          &#9654;&nbsp;&nbsp;&nbsp;{category}
        </CategoryItem>
      ))}
    </Wrapper>
  );
};

export default CategoryList;
