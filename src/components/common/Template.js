import React, { useState, useLayoutEffect } from "react";
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

  useLayoutEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Container>
      <Helmet>
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="url" content={url} />
        <meta name="image" content={image} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        
        {/* Open Graph data */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={title} />

        {/* Meta Data for Facebook */}
        <meta property="fb:app_id" content="+01027026916"/>
        <meta property="fb:admins" content="100007368672009" />

        {/* Meta Data for Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="@KingDonggyu" />
        <meta name="twitter:creator" content="@KingDonggyu" />

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

        <link rel="alternate" hreflang="x-default" href={url} />
        <link rel="alternate" hreflang="ko" href={url} />

        <html lang="ko" />
      </Helmet>
      <GlobalStyle />
      {loading ? (
        <Loading />
      ) : (
        <>
          {children}
          <Footer />
        </>
      )}
    </Container>
  );
};

export default Template;
