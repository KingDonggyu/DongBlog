const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  const output = getConfig().output || {};

  actions.setWebpackConfig({
    output,
    resolve: {
      alias: {
        components: path.resolve(__dirname, "src/components"),
        utils: path.resolve(__dirname, "src/utils"),
        hooks: path.resolve(__dirname, "src/hooks"),
      },
    },
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({ name: "slug", node, value });
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const queryAllMarkdownData = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (queryAllMarkdownData.errors) {
    reporter.panicOnBuild(`Error while running query`);
    return;
  }

  const PostTemplateComponent = path.resolve(
    __dirname,
    "src/templates/PostTemplate.js"
  );

  const generatePostPage = ({
    // slug 데이터를 통해 페이지를 생성해주는 함수
    node: {
      fields: { slug },
    },
  }) => {
    const pageOtions = {
      path: slug,
      component: PostTemplateComponent,
      context: { slug },
    };

    createPage(pageOtions);
  };

  queryAllMarkdownData.data.allMarkdownRemark.edges.forEach(generatePostPage);
};
