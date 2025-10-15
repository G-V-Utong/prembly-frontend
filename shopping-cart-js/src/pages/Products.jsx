import React from 'react'
import data from '../data/products.json'
import ProductCard from '../components/productCard.jsx'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice.js'
import { Link } from 'react-router-dom';

export default function Products() {
  const dispatch = useDispatch()

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Products</h2>
      <div className="flex gap-6 flex-wrap justify-center">
        {data.map((p) => (
          <Link key={p.id} to={`/products/${p.slug}`} className="hover:no-underline">
            <ProductCard product={p} onAdd={(prod) => dispatch(addToCart(prod))} />
          </Link>
        ))}
      </div>
    </div>
  )
}
