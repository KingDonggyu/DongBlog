module.exports = {
  siteMetadata: {
    title: `동 블로그`,
    description: `KingDonggyu의 개발 블로그`,
    author: `KingDonggyu`,
    siteUrl: `https://dongblog.netlify.app/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`, // Gatsby의 기본적인 이미지 처리 과정의 효율성을 이용해 더욱 높은 사용자 경험을 제공
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "동 블로그 by KingDonggyu",
        short_name: "동 블로그",
        start_url: "/",
        background_color: "#3c3c3c",
        theme_color: "#3c3c3c",
        display: "standalone",
        icon: "src/images/icon.png",
        crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: "https://dongblog.netlify.app/",
        stripQueryString: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/contents`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`, // 마크다운 문법을 HTML 형태로 변환해주어 띄워줄 수 있도록 해주는 핵심 라이브러리
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-smartypants", // 글 내에서 사용되는 여러 문장 부호들을 더 깔끔한 부호로 바꿔주는 기능을 제공
            options: {
              dashes: "oldschool",
            },
          },
          {
            resolve: "gatsby-remark-prismjs", // 문법 하이라이팅 역할을 담당하는 라이브러리 => 소스코드를 실제 IDE에서 보는 것처럼 변환해주는 기능을 제공
            options: {
              classPrefix: "language-",
            },
          },
          {
            resolve: "gatsby-remark-images", // 마크다운 문서 내에서의 이미지 사용을 최적화해주는 라이브러리
            options: {
              maxWidth: 768,
              quality: 100,
              withWebp: true,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files", // 마크다운 내에서 사용되는 이미지를 특정 디렉토리로 복사해주는 라이브러리
            options: {},
          },
          {
            resolve: "gatsby-remark-external-links", // 마크다운 내에서 사용되는 링크 태그의 target, rel 등의 속성을 지정해주는 기능을 제공
            options: {
              target: "_blank",
              rel: "nofollow",
            },
          },
          {
            resolve: "gatsby-plugin-robots-txt",
            options: {
              policy: [{ userAgent: "*", allow: "/" }],
            },
          },
        ],
      },
    },
  ],
};
