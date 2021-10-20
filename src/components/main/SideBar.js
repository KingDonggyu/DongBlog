import React, { useRef } from "react";
import styled from "styled-components";

import Introduction from "./Introduction";
import CategoryList from "./CategoryList";
import TagList from "./TagList";
import ResponsiveArrow from "./ResponsiveArrow";

const Background = styled.div`
  height: 100%;
  width: 400px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1100px) {
    position: static;
    width: 100%;
    height: 380px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  height: 90%;
  width: 350px;
  padding: 30px 0 0 0;
  background: #606163;
  border-radius: 7px;
  box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px;
  overflow-y: auto;
  @media (max-width: 1100px) {
    width: 90%;
  }
`;

const SideBar = ({ posts, selectedTag, selectedCategory, profileImage }) => {
  const scrollBox = useRef(null);

  return (
    <Background>
      <Wrapper ref={scrollBox}>
        <Introduction profileImage={profileImage} />
        <ResponsiveArrow scrollBox={scrollBox} />
        <CategoryList posts={posts} selectedCategory={selectedCategory} />
        <TagList posts={posts} selectedTag={selectedTag} />
      </Wrapper>
    </Background>
  );
};

export default SideBar;
