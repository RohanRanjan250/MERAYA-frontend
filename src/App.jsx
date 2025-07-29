import './App.css'
import React from "react";
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Landing />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App
