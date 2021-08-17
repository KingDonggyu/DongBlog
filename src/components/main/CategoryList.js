import React, { useMemo } from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import queryString from "query-string";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const TagItem = styled(Link)`
  padding: 10px;
  padding-left: 30px;
  font-size: 18px;
  cursor: pointer;
  ${({ active }) =>
    active &&
    `
    font-weight: 800;
     background-color: gray;
  `};
  &:hover {
    background-color: gray;
  }
`;

const CategoryList = ({ categoryList, selectedcategory }) => {
  return (
    <Wrapper>
      {categoryList.map((name) => (
        <TagItem
          to={`/?category=${name}`}
          active={name === selectedcategory ? 1 : 0}
          key={name}
        >
          &#9654;&nbsp;&nbsp;&nbsp;{name}
        </TagItem>
      ))}
    </Wrapper>
  );
};

export default CategoryList;
