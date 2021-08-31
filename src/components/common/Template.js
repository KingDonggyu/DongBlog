import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import GlobalStyle from "./GlobalStyle";
import Footer from "./Footer";
import Loading from "./Loading";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Template = ({ title, description, author, url, image, children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Container>
      <Helmet>
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={title} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content={author} />
        <meta name="twitter:creator" content={author} />

        <meta name="NaverBot" content="All" />
        <meta name="NaverBot" content="index,follow" />
        <meta name="Yeti" content="All" />
        <meta name="Yeti" content="index,follow" />

        <meta
          name="google-site-verification"
          content="f3Mya8LMc4Alx-vjefQkVS_N37dURfHeHWkzkc6unBk"
        />
        <meta
          name="naver-site-verification"
          content="74125e36a70f1d4271d8f0fa737eeb91ba7a4492"
        />

        <html lang="ko" />
      </Helmet>
      <GlobalStyle />
      {/* {loading ? (
        <Loading />
      ) : (
        <>
          {children}
          <Footer />
        </>
      )} */}
      {loading ? (
        <>
          {children}
          <Footer />
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default Template;
