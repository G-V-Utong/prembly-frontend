import React from "react";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="w-[300px] p-2 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 flex flex-col group">
      <img
        className="h-48 w-48 object-cover self-center transition-transform duration-300 group-hover:scale-110"
        src={product.image}
        alt={product.name}
      />
      <div className="p-2 flex flex-col flex-1 justify-between">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {product.name}
        </h3>
        <p className="text-indigo-600 text-xl font-bold mb-4">
          ₦{product.price.toLocaleString()}
        </p>
        <div>
          <button
            onClick={() => onAdd(product)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
