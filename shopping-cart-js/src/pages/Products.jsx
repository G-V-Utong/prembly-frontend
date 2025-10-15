import React from 'react'
import data from '../data/products.json'
import ProductCard from '../components/productCard.jsx'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice.js'

export default function Products() {
  const dispatch = useDispatch()

  return (
    <div className="container">
      <h2>Products</h2>
      <div className="grid">
        {data.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={(prod) => dispatch(addToCart(prod))} />
        ))}
      </div>
    </div>
  )
}
