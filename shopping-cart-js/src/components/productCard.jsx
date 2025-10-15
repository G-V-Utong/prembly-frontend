import React from 'react'

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card">
      <img className="card-img" src={product.image} alt={product.name} />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="price">${product.price.toFixed(2)}</p>
        <button onClick={() => onAdd(product)}>Add to Cart</button>
      </div>
    </div>
  )
}
