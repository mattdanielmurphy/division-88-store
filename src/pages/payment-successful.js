import React, { useEffect } from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const SecondPage = () => {
  useEffect(() => {
    localStorage.removeItem('stripe_checkout_items')
  }, [])
  return (
    <Layout>
      <SEO title="Payment Successful" />
      <h1>Payment Successful!</h1>
      <Link to="/">Shop again</Link>
    </Layout>
  )
}

export default SecondPage
