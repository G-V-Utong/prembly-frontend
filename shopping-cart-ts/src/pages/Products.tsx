import React from 'react'
import data from '../data/products.json'
import ProductCard from '../components/productCard.js'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice.js'


export default function Products() {
  const dispatch = useDispatch()

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-stretch">
        {data.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={(prod) => dispatch(addToCart(prod))} />
        ))}
      </div>
    </div>
  )
}
