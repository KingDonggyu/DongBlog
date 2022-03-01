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
  border-right: 1px solid #d2d2d7;
  @media (max-width: 1100px) {
    position: static;
    width: 100%;
    height: 330px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 95%;
  width: 350px;
  padding: 0px 0 0 0;
  /* background: white; */
  /* border-radius: 15px;
  box-shadow: rgb(0 0 0 / 50%) 0px 2px 4px; */
  overflow-y: auto;
  @media (max-width: 1100px) {
    width: 90%;
  }
`;

const Label = styled.h3`
  margin: 10px 0px 10px 20px;
`

const SideBar = ({ posts, selectedTag, selectedCategory, profileImage }) => {
  const scrollBox = useRef(null);

  return (
    <Background>
      <Wrapper ref={scrollBox}>
        <Label>Profile</Label>
        <Introduction profileImage={profileImage} />
        {/* <ResponsiveArrow scrollBox={scrollBox} /> */}
        <Label>Category</Label>
        <CategoryList posts={posts} selectedCategory={selectedCategory} selectedTag={selectedTag} />
        <Label>Tag</Label>
        <TagList posts={posts} selectedTag={selectedTag} />
      </Wrapper>
    </Background>
  );
};

export default SideBar;
