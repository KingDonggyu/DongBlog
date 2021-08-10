import React from "react";
import styled from "styled-components";

import Introduction from "./Introduction";
// import CategoryList from "./CategoryList";
// import TagList from "./TagList";

const Background = styled.div`
  height: 100%;
  width: 300px;
  background-color: #606163;    
`;
const SideBarWrapper = styled.div``;

const SideBar = () => {
  return (
    <Background>
      <SideBarWrapper>
        <Introduction />
        {/* <CategoryList />
        <TagList /> */}
      </SideBarWrapper>
    </Background>
  );
};

export default SideBar;
