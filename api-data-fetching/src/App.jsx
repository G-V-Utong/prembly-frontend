import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <nav className="navbar">
        <div className="brand">API Showcase</div>
        <div className="nav-links">
          <Link to="/quotes">Quotes</Link>
          <Link to="/covid">COVID Stats</Link>
          <Link to="/users">Random Users</Link>
        </div>
      </nav>
      <main className="container">
        <Routes>
          {/* <Route path="/" element={<Quotes />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/covid" element={<Covid />} />
          <Route path="/users" element={<RandomUsers />} /> */}
        </Routes>
      </main>
      <footer className="footer">© {new Date().getFullYear()} API Data Fetching</footer>
    </div>
  )
}