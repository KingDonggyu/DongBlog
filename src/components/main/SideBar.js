import React from "react";
import styled from "styled-components";
import { FaAngleDoubleDown } from "react-icons/fa";

import Introduction from "./Introduction";
import CategoryList from "./CategoryList";
import TagList from "./TagList";

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
    height: 350px;
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
  @media (max-width: 1100px) {
    width: 90%;
  }
`;

const ResponsiveArrow = styled.div`
  display: none;
  position: relative;
  text-align: center;
  top: 20px;
  margin-bottom: 30px;
  animation-duration: 1s;
  animation-name: slideDown;
  animation-iteration-count: infinite;
  @keyframes slideDown {
    to {
      top: 30px;
    }
  }
  @media (max-width: 1100px) {
    display: block;
  }
`;

const SideBar = ({ posts, selectedTag, selectedCategory, profileImage }) => {
  return (
    <Background>
      <Wrapper>
        <Introduction profileImage={profileImage} />
        <ResponsiveArrow>
          <FaAngleDoubleDown size="30" />
        </ResponsiveArrow>
        <CategoryList posts={posts} selectedCategory={selectedCategory} />
        <TagList posts={posts} selectedTag={selectedTag} />
      </Wrapper>
    </Background>
  );
};

export default SideBar;
