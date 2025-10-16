import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import Products from './pages/Products.jsx';
// import Cart from './pages/Cart.jsx';
// import ProductDetail from './pages/[slug]/ProductDetail.jsx';
import { useSelector } from 'react-redux';
import { selectCartCount } from './redux/cartSlice.js';
import type { RootState } from './redux/store.js';

export default function App() {
  const count = useSelector((s: RootState) => selectCartCount(s as any))
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <main>
        <Routes>
          {/* <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} /> */}
        </Routes>
      </main>
    </div>
  )
}
