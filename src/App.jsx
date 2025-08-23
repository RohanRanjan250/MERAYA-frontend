import './App.css'
import React from "react";
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/SignupPage';
import Login from './pages/LoginPage';
import Profile from './pages/ProfilePage';
import Wishlist from './pages/WishlistPage';
import ProductCard from './UI/ProductCard';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} /> 
          <Route path="/product" element={<ProductCard />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App
