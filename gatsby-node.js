const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const categoryProductsTemplate = path.resolve(
    `src/templates/category-products.js`
  )
  const result = await graphql(
    `
      query loadPagesQuery {
        allStripeSku(sort: { fields: [price] }) {
          distinct(field: product___metadata___category)
          edges {
            node {
              currency
              id
              price
              product {
                name
                metadata {
                  category
                }
              }
            }
          }
        }
      }
    `
  )
  if (result.errors) throw result.errors

  const categories = result.data.allStripeSku.distinct

  for (const selectedCategory of categories) {
    const result = await graphql(
      `
        query loadPagesQuery($selectedCategory: String) {
          allStripeSku(
            sort: { fields: [price] }
            filter: {
              product: { metadata: { category: { eq: $selectedCategory } } }
            }
          ) {
            edges {
              node {
                currency
                id
                price
                product {
                  name
                  metadata {
                    category
                  }
                }
              }
            }
          }
        }
      `,
      { selectedCategory }
    )

    if (result.errors) throw result.errors

    const skus = result.data.allStripeSku.edges.map(({ node }) => node)

    skus.forEach((sku) => {
      createPage({
        path: `${selectedCategory.split(' ').join('-')}/${sku.name}`
      })
    })

    createPage({
      path: `${selectedCategory.split(' ').join('-')}`,
      component: categoryProductsTemplate,
      context: { categories: ['all', ...categories], selectedCategory, skus },
    })
  }

  createPage({
    path: '/',
    component: categoryProductsTemplate,
    context: {
      categories: ['all', ...categories],
      selectedCategory: 'all',
      skus: result.data.allStripeSku.edges.map(({ node }) => node),
    },
  })

  createPage({
    path: '/all',
    component: categoryProductsTemplate,
    context: {
      categories: ['all', ...categories],
      selectedCategory: 'all',
      skus: result.data.allStripeSku.edges.map(({ node }) => node),
    },
  })
}

// See: https://www.gatsbyjs.org/docs/node-apis/
