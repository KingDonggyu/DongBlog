import React from "react";
import { createGlobalStyle } from "styled-components";

const DefaultStyle = createGlobalStyle`
  * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
  }
  html, body, #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
  }
  a, a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
`;

const GlobalStyle = () => {
  return <DefaultStyle />;
};

export default GlobalStyle;
