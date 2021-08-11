import React from "react";
import styled from "styled-components";

import Introduction from "./Introduction";
import CategoryList from "./CategoryList";
import TagList from "./TagList";

const CATEGORY_LIST = ["Web", "Language", "Mobile"];
const TAG_LIST = ["All", "React", "JavaScript", "webOS", "Python", "DB"];

const Wrapper = styled.div`
  color: white;
  height: 100%;
  width: 350px;
  background: linear-gradient(60deg, #29323c 0%, #606163 100%);
  position: fixed;
  left: 0;
`;

const SideBar = () => {
  return (
    <Wrapper>
      <Introduction />
      <CategoryList selectedcategory="Web" categoryList={CATEGORY_LIST} />
      <TagList selectedTag="All" tagList={TAG_LIST} />
    </Wrapper>
  );
};

export default SideBar;
