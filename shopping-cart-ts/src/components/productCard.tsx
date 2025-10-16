import React from "react";
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { type Product } from "../../utils/types";

export default function ProductCard({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }) {
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 flex flex-col group">
      <Link to={`/products/${product.slug}`} className="no-underline text-inherit flex flex-col">
        <div className="w-full overflow-hidden rounded-md">
          <img
            className="w-48 h-48 object-cover mx-auto transition-transform duration-300 group-hover:scale-110"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="p-2 flex flex-col flex-1 justify-between">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-blue-600 text-xl font-bold mb-4">
            ₦{product.price.toLocaleString()}
          </p>
        </div>
      </Link>
      <div className="mt-2">
        <button
          type="button"
          onClick={() => {
            onAdd(product);
            try { toast.success(`${product.name} added to cart`); } catch (e) {}
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-colors w-full sm:w-auto"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
