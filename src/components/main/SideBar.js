import React, { useRef } from "react";
import styled from "styled-components";

import Introduction from "./Introduction";
import CategoryList from "./CategoryList";
import TagList from "./TagList";
// import ResponsiveArrow from "./ResponsiveArrow";

const Background = styled.div`
  height: 100%;
  width: 400px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #d2d2d7;
  @media (max-width: 1100px) {
    position: static;
    width: 100%;
    height: auto;
    border-right: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 20px;
  overflow-y: auto;
  @media (max-width: 1100px) {
    overflow-y: hidden;
    overflow-x: auto;
    display: -webkit-inline-box;
    padding-bottom: 0;
    height: 300px;
  }
`;

const Label = styled.h3`
  margin: 10px 0px 10px 20px;
  @media (max-width: 1100px) {
    display: none;
  }
`

const SideBar = ({ posts, selectedTag, selectedCategory, profileImage }) => {
  const scrollBox = useRef(null);

  return (
    <Background>
      <Wrapper ref={scrollBox}>
        {/* <ResponsiveArrow scrollBox={scrollBox} /> */}
        <Label>Profile</Label>
        <Introduction profileImage={profileImage} />
        <Label>Category</Label>
        <CategoryList posts={posts} selectedCategory={selectedCategory} selectedTag={selectedTag} />
        <Label>Tag</Label>
        <TagList posts={posts} selectedTag={selectedTag} />
      </Wrapper>
    </Background>
  );
};

export default SideBar;
