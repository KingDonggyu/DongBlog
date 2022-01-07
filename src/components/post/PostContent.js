import React from "react";
import styled from "styled-components";

const MarkdownRenderer = styled.div`
  // Renderer Style
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 50px 30px;
  word-break: break-all;

  // Markdown Style
  line-height: 1.5;
  font-size: 16px;
  font-weight: 400;
  color: rgb(55, 53, 47);

  // Apply Padding Attribute to All Elements
  p {
    padding: 5px 0;
  }

  // Adjust Heading Element Style
  h1,
  h2,
  h3 {
    font-weight: 700;
    margin-bottom: 10px;
  }

  * + h1 {
    margin-top: 80px;
  }

  * + h2,
  * + h3 {
    margin-top: 30px;
  }

  hr + h1,
  hr + h2,
  hr + h3 {
    margin-top: 0;
  }

  h1 {
    font-size: 30px;
  }

  h2 {
    font-size: 25px;
  }

  h3 {
    font-size: 20px;
  }

  // Adjust Quotation Element Style
  blockquote {
    margin: 30px 0;
    padding: 5px 15px;
    background-color: aliceblue;
    font-weight: 700;
  }

  blockquote > blockquote {
    margin: 0;
    padding: 5px 15px;
    background-color: aliceblue;
    font-weight: 400;
  }

  // Adjust List Element Style
  ol,
  ul {
    margin-left: 20px;
    padding: 10px 0;
  }

  // Adjust Horizontal Rule style
  hr {
    border: 1px solid #000000;
    margin: 10px 0 50px 0;
    border-color: gray;
  }

  // Adjust Link Element Style
  a {
    color: #4263eb;
    text-decoration: underline;
  }

  // Adjust Code Style
  pre[class*="language-"] {
    margin: 10px 0;
    padding: 15px;
    font-size: 15px;
    tab-size: 2;
    ::-webkit-scrollbar-thumb {
      background: #313131;
      border-radius: 3px;
    }
    code[class*="language-"] {
      background: #272822;
      color: white;
    }
  }

  code[class*="language-"] {
    background: #272822;
    color: white;
    tab-size: 2;
    padding: 0.2em 0.4em;
    font-size: 85%;
    font-family: Menlo, Consolas, Courier, monospace;
    text-shadow: none !important;
  }

  img {
    max-width: 100%;
  }

  // Markdown Responsive Design
  @media (max-width: 1100px) {
    width: 100%;
    padding: 80px 20px;
    line-height: 1.6;
    font-size: 14px;

    h1 {
      font-size: 23px;
    }

    h2 {
      font-size: 20px;
    }

    h3 {
      font-size: 17px;
    }

    hr {
      margin: 50px 0;
    }
  }
`;

const PostContent = ({ html }) => {
  return <MarkdownRenderer dangerouslySetInnerHTML={{ __html: html }} />;
};

export default PostContent;
