import { Routes, Route, Link } from 'react-router-dom';
import Products from './pages/Products.jsx';
import Cart from './pages/Cart.jsx';
import { useSelector } from 'react-redux';
import { selectCartCount } from './redux/cartSlice.js';

export default function App() {
  const count = useSelector(selectCartCount)
  return (
    <div>
      <nav className="navbar">
        <Link to="/products" className="brand">Shop</Link>
        <div className="nav-links">
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart ({count})</Link>
        </div>
      </nav>
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
