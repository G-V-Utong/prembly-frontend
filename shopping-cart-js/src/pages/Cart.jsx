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
        <div className="cart-list space-y-6">
          {items.map((it) => (
            <div key={it.id} className="flex items-center bg-white rounded-lg shadow p-4 gap-4">
              <img src={it.image} alt={it.name} className="w-24 h-24 object-cover rounded-lg border" />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">{it.name}</h4>
                <p className="text-indigo-600 font-bold mb-2">₦{it.price.toLocaleString()}</p>
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() => dispatch(decrement(it.id))}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-lg font-bold hover:bg-gray-300"
                  >−</button>
                  <span className="px-3 py-1 bg-gray-100 rounded text-gray-700 font-medium">{it.quantity}</span>
                  <button
                    onClick={() => dispatch(increment(it.id))}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-lg font-bold hover:bg-gray-300"
                  >+</button>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 text-sm font-medium underline"
                  onClick={() => dispatch(removeItem(it.id))}
                >Remove</button>
              </div>
              <div className="text-right min-w-[80px]">
                <span className="block text-gray-500 text-xs">Subtotal</span>
                <span className="text-gray-800 font-bold">₦{(it.price * it.quantity).toLocaleString()}</span>
              </div>
            </div>
          ))}
          <div className="cart-summary bg-white rounded-lg shadow p-6 mt-8 flex flex-col items-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Total: <span className="text-indigo-600">₦{total.toLocaleString()}</span></h3>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors"
              onClick={() => dispatch(clearCart())}
            >Clear Cart</button>
          </div>
        </div>
      )}
    </div>
  )
}
