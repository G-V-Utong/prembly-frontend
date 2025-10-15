import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../../data/products.json';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return <div className="p-8 text-center">Product not found.</div>;
  }

  return (
    <div className='p-8 w-screen'>
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 flex flex-col">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back
      </button>
      <img
        src={product.image}
        alt={product.name}
        className="w-64 h-64 object-cover rounded-lg mb-6 self-center"
      />
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="text-xl text-indigo-600 font-semibold mb-2">₦{product.price.toLocaleString()}</p>
      <p className="mb-4 text-gray-700">{product.description}</p>
      <div className="mb-4">
        <span className="font-semibold text-gray-600">Brand:</span> {product.brand} <br />
        <span className="font-semibold text-gray-600">Category:</span> {product.category}
      </div>
      {product.features && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-2">Features:</h4>
          <ul className="list-disc list-inside text-gray-700">
            {product.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={() => { try { toast.success(`${product.name} added to cart`); } catch (e) {} }}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow"
      >
        Add to Cart
      </button>
    </div>
    </div>
  );
}
