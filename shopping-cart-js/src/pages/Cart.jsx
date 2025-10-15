import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartArray, selectCartTotal, increment, decrement, removeItem, clearCart } from '../redux/cartSlice.js'

export default function Cart() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartArray)
  const total = useSelector(selectCartTotal)

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
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
