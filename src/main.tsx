import { createRoot } from "react-dom/client";
import "./styles/styles.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "flowbite";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="53553105654-shc93t2fqmu61shnk2fnsl27tocbc4ap.apps.googleusercontent.com">
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);