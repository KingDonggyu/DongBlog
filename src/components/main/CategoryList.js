import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

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
  font-weight: ${({ active }) => (active ? "800" : "400")};
  cursor: pointer;
  &:hover {
    background-color: lightslategray;
  }
`;

const CategoryList = ({ selectedcategory, categoryList }) => {
  return (
    <Wrapper>
      {categoryList.map((name) => (
        <TagItem
          to={`/?tag=${name}`}
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
