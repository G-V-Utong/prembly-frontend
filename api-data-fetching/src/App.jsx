import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Quotes from './pages/Quotes.jsx';
import Covid from './pages/Covid.jsx';
import RandomUsers from './pages/RandomUsers.jsx';

export default function App() {
  return (
    <div>
      
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Quotes />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/covid" element={<Covid />} />
          <Route path="/users" element={<RandomUsers />} />
        </Routes>
      </main>
      <footer className="footer">© {new Date().getFullYear()} API Data Fetching</footer>
    </div>
  );
}

  