import React from "react";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import { Listado } from "./pages/Listado";
import Ficha from "./pages/Ficha";
import { Route, Routes } from "react-router";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./context/CartContext";
import CRUD from "./pages/CRUD";
import CrudProvider from "./components/CRUD/CrudContext";
import "flowbite";

function App() {
  return (
    <div>
      <CartProvider>
        <CrudProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<Listado />} />
            <Route path="/product" element={<Ficha />} />
            <Route path="/admin" element={<CRUD />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CrudProvider>
      </CartProvider>
    </div>
  );
}

export default App;
