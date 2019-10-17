import React, { useEffect, useState, cloneElement } from 'react'
import Checkout from './checkout.js'

const Cart = ({ children, stripe, cart, setCart }) => {
  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.map(item => (
        <div className="item-in-cart">
          <div className="price">${item.sku.price}</div>
          <div className="name">{item.sku.product.name}</div>
          <div className="quantity">{item.quantity}</div>
        </div>
      ))}
      <Checkout cart={cart} stripe={stripe} />
    </div>
  )
}

export default Cart
