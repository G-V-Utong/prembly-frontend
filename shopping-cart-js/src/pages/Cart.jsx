import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartArray, selectCartTotal, increment, decrement, removeItem, clearCart } from '../redux/cartSlice.js'
import { ShoppingCart } from 'lucide-react';

export default function Cart() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartArray)
  const total = useSelector(selectCartTotal)

  return (
    <div className="container">
      {items.length === 0 ? (
        <div className="text-center py-16">
        <ShoppingCart className="w-24 h-24 mx-auto text-gray-400 mb-4" />
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500">Add some products to get started!</p>
      </div>
      ) : (
        <div className="cart-list">
          {items.map((it) => (
            <div key={it.id} className="cart-item">
              <img src={it.image} alt={it.name} />
              <div className="cart-details">
                <h4>{it.name}</h4>
                <p>${it.price.toFixed(2)}</p>
                <div className="qty">
                  <button onClick={() => dispatch(decrement(it.id))}>−</button>
                  <span>{it.quantity}</span>
                  <button onClick={() => dispatch(increment(it.id))}>+</button>
                </div>
                <button className="remove" onClick={() => dispatch(removeItem(it.id))}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="danger" onClick={() => dispatch(clearCart())}>Clear Cart</button>
          </div>
        </div>
      )}
    </div>
  )
}
