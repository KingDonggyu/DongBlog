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

// Transform Markdown File to page
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  // Get All Markdown File
  const queryAllMarkdownData = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  // Hadle Errors
  if (queryAllMarkdownData.errors) {
    reporter.panicOnBuild(`Error while running query`);
    return;
  }

  // Import Template Files
  const PostTemplateComponent = path.resolve(
    __dirname,
    "src/templates/PostTemplate.js"
  );
  
  // Create Pages Through Markdown Files 
  const posts = queryAllMarkdownData.data.allMarkdownRemark.edges

  posts.forEach((edge, index) => {
    const slug = edge.node.fields.slug;
    const next = index == posts.length - 1 ? null : posts[index + 1].node;
    const previous = index == 0 ? null : posts[index - 1].node;

    const pageOtions = {
      path: slug,
      component: PostTemplateComponent,
      context: { 
        slug, 
        next,
        previous,
      },
    };
    
    createPage(pageOtions);
  });
};
