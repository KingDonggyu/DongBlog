import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  display: grid;
  place-items: center;
  padding: 30px 0;
  font-size: 15px;
  /* text-align: center; */
  line-height: 1.5;
  color: #727272;
  @media (max-width: 1100px) {
    padding: 15px 0;
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
