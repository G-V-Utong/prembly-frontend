import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#6584DB] border-t border-gray-200 py-6 text-center shadow-sm text-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <span className="text-sm text-center md:text-left">© {new Date().getFullYear()} Prembly Gadgets. All rights reserved.</span>
        <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-2 md:mt-0">
          <a href="/products" className=" hover:text-indigo-800 text-sm">Products</a>
          <a href="/cart" className=" hover:text-indigo-800 text-sm">Cart</a>
          <a href="https://github.com/G-V-Utong/prembly-frontend" target="_blank" rel="noopener noreferrer" className=" hover:text-indigo-800 text-sm">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
