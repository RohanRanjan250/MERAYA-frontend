import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <GoogleOAuthProvider clientId="827579200433-t9v1emhvi6bbhku5009b1pt779aq3rv4.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  // </StrictMode> 
);
