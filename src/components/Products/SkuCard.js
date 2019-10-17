import React, { useState } from 'react'
import styled from 'styled-components'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 5px 5px 25px 0 rgba(46, 61, 73, 0.2);
  background-color: #222;
  border-radius: 6px;
  max-width: 300px;
`

const formatPrice = (amount, currency) => {
  let price = (amount / 100).toFixed(2)
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })
  return numberFormat.format(price)
}

const SkuCard = ({ sku, addToCart }) => {
  return (
    <Card>
      <h4>{sku.attributes.name}</h4>
      <p>Price: {formatPrice(sku.price, sku.currency)}</p>
      <button onClick={addToCart}>'Add to cart'</button>
    </Card>
  )
}

export default SkuCard
