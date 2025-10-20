// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 
import Home from './pages/Home';
import Creator from './pages/Creator';
import BirthdayPage from './pages/BirthdayPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Creator />} />
        <Route path="/:birthdayId" element={<BirthdayPage />} /> 
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </div>
  );
}

export default App;