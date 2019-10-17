import React, { useEffect, useState } from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Products from 'src/components/Products/Products'
import Cart from 'src/components/Cart'
import CategoryNav from 'src/components/CategoryNav'

const Store = ({ pageContext }) => {
  const { categories, selectedCategory, sku } = pageContext
  console.log(pageContext)
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('stripe_checkout_items')) || []
  )
  const [stripe, setStripe] = useState()

  useEffect(() => {
    const stripe = window.Stripe(process.env.GATSBY_STRIPE_PUBLIC_KEY, {
      betas: ['checkout_beta_4'],
    })
    setStripe(stripe)
  }, [])

  return (
    <Layout>
      <SEO title="Store" />
      <h1>{selectedCategory || 'All products'}</h1>
      <Cart cart={cart} setCart={setCart} stripe={stripe} />
      <CategoryNav
        categories={categories}
        selectedCategory={selectedCategory}
      />
      <div>{JSON.stringify(sku)}</div>
    </Layout>
  )
}

export default Store
