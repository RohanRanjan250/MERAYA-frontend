import './App.css'
import React from "react";
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/home" element={<Landing />} />
        </Routes>
      </Router>
  );
}

export default App
