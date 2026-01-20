import "./App.css";
import { React, useEffect, useState } from "react";
import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { ToastProvider } from "./Context/ToastContext";
import Landing from "./pages/Landing";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import Profile from "./pages/ProfilePage";
import Wishlist from "./pages/WishlistPage";
import AllProductsPage from "./pages/AllProductsPage";
import WalletPage from "./pages/WalletPage";
// import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
// import Checkout from "./pages/CheckoutPage";
import { setupInterceptors } from "./API/interceptor";
import { initializeAuth } from "./API/authUtils";
import { LandingProvider } from "./Context/LandingpageContext";
// import CartSummary from "./pages/CartSummaryPage";
import OrderConfirmed from "./pages/OrderConfirmedPage";
import Unified from "./pages/UnifiedCheckoutPage";

function App() {
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    setupInterceptors(); // setup interceptor first
    initializeAuth().finally(() => setAuthReady(true));
  }, []);

  if (!authReady) return <div>Loading...</div>;
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LandingProvider>
                <Landing />
              </LandingProvider>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myaccount/*" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/confirmed" element={<OrderConfirmed />} />
          <Route path="/unified" element={<Unified />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
