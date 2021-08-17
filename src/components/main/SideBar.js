import React from "react";
import styled from "styled-components";

import Introduction from "./Introduction";
import CategoryList from "./CategoryList";
import TagList from "./TagList";

const CATEGORY_LIST = ["Web", "Language", "Mobile"];
const TAG_LIST = ["All", "React", "JavaScript", "webOS", "Python", "DB"];

const Background = styled.div`
  height: 100%;
  width: 400px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    position: static;
    width: 100%;
    height: 280px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  height: 90%;
  width: 350px;
  padding: 30px 0;
  background: #606163;
  border-radius: 7px;
  box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px;
  overflow-y: scroll;
`;

const SideBar = ({ profileImage, search, posts }) => {
  return (
    <Background>
      <Wrapper>
        <Introduction profileImage={profileImage} />
        <CategoryList selectedcategory="Web" categoryList={CATEGORY_LIST} />
        <TagList search={search} posts={posts} />
      </Wrapper>
    </Background>
  );
};

export default SideBar;
