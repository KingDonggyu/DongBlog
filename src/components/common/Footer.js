import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  display: grid;
  place-items: center;
  margin-top: auto;
  padding-bottom: 30px;
  font-size: 15px;
  /* text-align: center; */
  line-height: 1.5;
  color: #727272;
  @media (max-width: 1100px) {
    padding: 15px;
    font-size: 13px;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      Copyright © 2022 Kim DongGyu. All rights reserved.
    </FooterWrapper>
  );
};

export default Footer;
