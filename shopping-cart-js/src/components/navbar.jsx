import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Home, Package, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = Object.values(cartItems).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const isActive = (path) => {
    return location.pathname === path;
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link
            to="/products"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            onClick={closeMobileMenu}
          >
            <Package className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-800">
              Prembly Gadgets
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/products"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive("/products") || isActive("/")
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Products</span>
            </Link>

            <Link
              to="/cart"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors relative ${
                isActive("/cart")
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/products"
              onClick={closeMobileMenu}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                isActive("/products") || isActive("/")
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Products</span>
            </Link>

            <Link
              to="/cart"
              onClick={closeMobileMenu}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors relative ${
                isActive("/cart")
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Cart</span>
              {totalItems > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
