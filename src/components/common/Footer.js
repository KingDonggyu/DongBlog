import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  display: grid;
  place-items: center;
  margin-top: auto;
  padding: 30px 0;
  font-size: 15px;
  text-align: center;
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
      © 2022 Developer KimDonggyu.
      <br />E-mail: dgkim69166916@gmail.com
    </FooterWrapper>
  );
};

export default Footer;
