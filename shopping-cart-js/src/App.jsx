import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Products from './pages/Products.jsx';
import Cart from './pages/Cart.jsx';
import { useSelector } from 'react-redux';
import { selectCartCount } from './redux/cartSlice.js';

export default function App() {
  const count = useSelector(selectCartCount)
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <footer className="footer">© {new Date().getFullYear()} Shopping Cart (JS)</footer>
    </div>
  )
}
