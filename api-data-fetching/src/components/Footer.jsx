import React from "react";

export default function Footer() {
  return (
    <footer className="w-screen bg-gray-900 text-gray-100 py-6 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <span className="text-sm font-medium">© {new Date().getFullYear()} API Data Fetching</span>
        <span className="text-xs text-gray-400 mt-2 md:mt-0">Built with React, Tailwind CSS & Chart.js</span>
      </div>
    </footer>
  );
}
