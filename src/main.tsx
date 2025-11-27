/* import { StrictMode } from "react"; */
import { createRoot } from "react-dom/client";
import "./styles/styles.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartContext } from "./context/CartContext";
import "flowbite";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
