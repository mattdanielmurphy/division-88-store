import React, { useEffect, useState } from 'react'

const Checkout = ({ stripe, cart }) => {
  // Initialise Stripe.js with your publishable key.
  // You can find your key in the Dashboard:
  // https://dashboard.stripe.com/account/apikeys

  const redirectToCheckout = async event => {
    const { error } = await stripe.redirectToCheckout({
      items: cart.map(item => ({ sku: item.sku.id, quantity: item.quantity })),
      successUrl: `http://localhost:8000/payment-successful`,
      cancelUrl: `http://localhost:8000/`,
    })

    if (error) {
      console.error('Error:', error)
    }
  }

  return (
    <button onClick={redirectToCheckout} disabled={!cart.length}>
      {cart.length ? 'GO TO CHECKOUT' : 'CART IS EMPTY'}
    </button>
  )
}

export default Checkout
