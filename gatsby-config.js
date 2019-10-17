require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Division 88`,
    description: `Division 88 web store. Division 88 is a recording studio operating in Kensington Market, Toronto.`,
    author: `Division 88`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-stripe',
    'gatsby-plugin-sass',
    'gatsby-plugin-root-import',
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ['Sku'],
        secretKey: process.env.STRIPE_SECRET_KEY,
        downloadFiles: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#000`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
