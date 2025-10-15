import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartArray, selectCartTotal, increment, decrement, removeItem, clearCart } from '../redux/cartSlice.js'
import { ShoppingCart } from 'lucide-react';

export default function Cart() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartArray)
  const total = useSelector(selectCartTotal)
  const [footerOffset, setFooterOffset] = useState(0)

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return

    // Update function to set footer height when it's visible
    const onIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // When footer enters viewport, set offset to its height
          setFooterOffset(entry.boundingClientRect.height || footer.getBoundingClientRect().height)
        } else {
          setFooterOffset(0)
        }
      })
    }

    const observer = new IntersectionObserver(onIntersect, { root: null, threshold: 0 })
    observer.observe(footer)

    // Also update on resize in case footer height changes
    const onResize = () => {
      if (footer && footer.getBoundingClientRect) {
        // If footer is currently visible, keep offset updated
        const rect = footer.getBoundingClientRect()
        if (rect.top < window.innerHeight) setFooterOffset(rect.height)
      }
    }
    window.addEventListener('resize', onResize)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      {items.length === 0 ? (
        <div className="text-center py-16">
        <ShoppingCart className="w-24 h-24 mx-auto text-gray-400 mb-4" />
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500">Add some products to get started!</p>
      </div>
      ) : (
  <div className="cart-list space-y-6 pb-28">
          {items.map((it) => (
            <div key={it.id} className="flex flex-col md:flex-row items-start md:items-center bg-white rounded-lg shadow p-4 gap-4">
              <img src={it.image} alt={it.name} className="w-full max-w-[140px] h-36 object-cover rounded-lg border md:w-24 md:h-24" />
              <div className="flex-1 w-full">
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
                <div className="flex items-center justify-between md:justify-start md:gap-6">
                  <button
                    className="text-red-500 hover:text-red-700 text-sm font-medium underline"
                    onClick={() => dispatch(removeItem(it.id))}
                  >Remove</button>
                  <div className="ml-auto md:ml-0 text-right min-w-[80px]">
                    <span className="block text-gray-500 text-xs">Subtotal</span>
                    <span className="text-gray-800 font-bold">₦{(it.price * it.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div
            className="cart-summary fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg p-4 md:relative md:bg-white md:rounded-lg md:shadow md:p-6 md:mt-8 transition-all"
            style={footerOffset ? { bottom: `${footerOffset}px` } : undefined}
          >
            <div className="max-w-4xl mx-auto w-full flex flex-col md:flex-row md:items-center md:justify-between">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0 text-center md:text-left">Total: <span className="text-indigo-600">₦{total.toLocaleString()}</span></h3>
              <div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors w-full md:w-auto"
                  onClick={() => dispatch(clearCart())}
                >Clear Cart</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
