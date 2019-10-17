import React, { useState, useEffect } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import SkuCard from './SkuCard'
import Modal from 'react-responsive-modal'

const Products = ({ cart, setCart, skus }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const closeModal = () => setModalOpen(false)
  const openModal = () => setModalOpen(true)

  const addToCart = newSku => {
    let itemExisted = false
    let updatedCart = cart.map(item => {
      if (newSku.id === item.sku.id) {
        itemExisted = true
        return { sku: item.sku, quantity: ++item.quantity }
      } else return item
    })

    if (!itemExisted)
      updatedCart = [...updatedCart, { sku: newSku, quantity: 1 }]

    setCart(updatedCart)
    // Store the cart in the localStorage.
    localStorage.setItem('stripe_checkout_items', JSON.stringify(updatedCart))
  }

  return (
    <div className="container">
      <Modal open={modalOpen} onClose={closeModal}>
        <h2>It's a modal!</h2>
        <button onClick={closeModal}>Continue</button>
        <button>Go to checkout</button>
      </Modal>
      {skus.map(sku => {
        if (!sku.attributes) sku.attributes = {}
        sku.attributes.name = sku.product.name
        return (
          <SkuCard key={sku.id} sku={sku} addToCart={() => addToCart(sku)} />
        )
      })}
    </div>
  )
}

export default Products

// <StaticQuery
//     query={graphql(
//       `
//         query SkusForProduct {
//           skus: allStripeSku(
//             sort: { fields: [price] }
//             filter: {
//               product: { metadata: { category: { eq: $selectedCategory } } }
//             }
//           ) {
//             edges {
//               node {
//                 id
//                 product {
//                   name
//                 }
//                 currency
//                 price
//               }
//             }
//           }
//         }
//       `,
//       { selectedCategory }
//     )}
//     render={({ skus }) => (
//       <div className="container">
//         <Modal open={modalOpen} onClose={closeModal}>
//           <h2>It's a modal!</h2>
//           <button onClick={closeModal}>Continue</button>
//           <button>Go to checkout</button>
//         </Modal>
//         {skus.edges.map(({ node: sku }) => {
//           if (!sku.attributes) sku.attributes = {}
//           sku.attributes.name = sku.product.name
//           return (
//             <SkuCard
//               key={sku.id}
//               sku={sku}
//               addToCart={() => addToCart(sku)}
//             />
//           )
//         })}
//       </div>
//     )}
//   />
