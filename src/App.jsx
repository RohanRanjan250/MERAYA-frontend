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
import ProductPage from "./pages/ProductPage";
import { initializeAuth, startSmartRefresh } from "./API/authUtils";
import { LandingProvider } from "./Context/LandingpageContext";
import OrderConfirmed from "./pages/OrderConfirmedPage";
import Unified from "./pages/UnifiedCheckoutPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import ContactUs from "./pages/ContactUs";
import TermsOfService from "./pages/TermsOfService";

function App() {
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    initializeAuth().finally(() => setAuthReady(true));
    // Start smart refresh (activity-based, only when needed)
    startSmartRefresh();
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
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />

          {/* Protected Routes */}
          <Route path="/myaccount/*" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Unified /></ProtectedRoute>} />
          <Route path="/unified" element={<ProtectedRoute><Unified /></ProtectedRoute>} />
          <Route path="/confirmed" element={<ProtectedRoute><OrderConfirmed /></ProtectedRoute>} />

          {/* Policy Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />

          {/* Contact Page */}
          <Route path="/contact" element={<ContactUs />} />

          {/* 404 Catch-all - Must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
