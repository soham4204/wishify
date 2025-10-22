// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 

import Home from './pages/Home';
import Creator from './pages/Creator';
import BirthdayPage from './pages/BirthdayPage';
import NotFound from './pages/NotFound';
import MainLayout from './components/layout/MainLayout'; // 1. Import layout

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* --- 2. Routes with Header/Footer --- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Creator />} />
        </Route>
        
        {/* --- 3. Full-screen routes --- */}
        <Route path="/:birthdayId" element={<BirthdayPage />} /> 
        <Route path="/preview" element={<BirthdayPage isPreview={true} />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </div>
  );
}

export default App;