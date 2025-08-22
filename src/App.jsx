import './App.css'
import React from "react";
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/SignupPage';
import Login from './pages/LoginPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App
