import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  padding-left: 30px;
  display: flex;
  flex-wrap: wrap;
`;

const TagItem = styled(Link)`
  margin-right: 20px;
  padding: 5px 0;
  font-size: 18px;
  font-weight: ${({ active }) => (active ? '800' : '400')};
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }
`;

const TagList = ({ selectedTag, tagList }) => {
  return (
    <Wrapper>
      {tagList.map((name) => (
        <TagItem to={`/?tag=${name}`} active={name === selectedTag ? 1 : 0} key={name}>
          #{name}
        </TagItem>
      ))}
    </Wrapper>
  );
};

export default TagList;
