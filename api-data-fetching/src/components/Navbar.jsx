import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 text-xl font-bold text-sky-700 tracking-tight">API Showcase</div>
          <div className="hidden md:flex space-x-6">
            <Link to="/quotes" className="text-gray-700 hover:text-sky-600 font-medium transition-colors">Quotes</Link>
            <Link to="/covid" className="text-gray-700 hover:text-sky-600 font-medium transition-colors">COVID Stats</Link>
            <Link to="/users" className="text-gray-700 hover:text-sky-600 font-medium transition-colors">Random Users</Link>
          </div>
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}

function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        className="md:hidden inline-flex items-center justify-center p-2 rounded text-gray-700 hover:text-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
        aria-label="Open main menu"
        onClick={() => setOpen((v) => !v)}
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50 md:hidden animate-fade-in">
          <div className="flex flex-col items-center py-4 space-y-2">
            <Link to="/quotes" className="text-gray-700 hover:text-sky-600 font-medium transition-colors w-full text-center py-2" onClick={() => setOpen(false)}>Quotes</Link>
            <Link to="/covid" className="text-gray-700 hover:text-sky-600 font-medium transition-colors w-full text-center py-2" onClick={() => setOpen(false)}>COVID Stats</Link>
            <Link to="/users" className="text-gray-700 hover:text-sky-600 font-medium transition-colors w-full text-center py-2" onClick={() => setOpen(false)}>Random Users</Link>
          </div>
        </div>
      )}
    </>
  );
}
