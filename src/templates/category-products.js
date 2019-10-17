import React, { useEffect, useState } from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Products from 'src/components/Products/Products'
import Cart from 'src/components/Cart'
import CategoryNav from 'src/components/CategoryNav'

const Store = ({ pageContext }) => {
  const { categories, selectedCategory, skus } = pageContext
  console.log(pageContext)
  const [cart, setCart] = useState([])
  const [stripe, setStripe] = useState()

  useEffect(() => {
    const stripe = window.Stripe(process.env.GATSBY_STRIPE_PUBLIC_KEY, {
      betas: ['checkout_beta_4'],
    })
    setStripe(stripe)

    const existingCart = JSON.parse(localStorage.getItem('stripe_checkout_items'))
    if (existingCart && existingCart.length) setCart(existingCart)
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
      <Products skus={skus} cart={cart} setCart={setCart} stripe={stripe} />
    </Layout>
  )
}

export default Store
