/* import { StrictMode } from "react"; */
import { createRoot } from "react-dom/client";
import "./styles/styles.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "flowbite";

// IMPORTS IMPORTANTES
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="TU_CLIENT_ID">
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);