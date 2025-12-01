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
import CrudProvider from "./context/CrudContext";
import { SearchProvider } from "./context/SearchContext";
import "flowbite";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <div>
      <SearchProvider>
        <CartProvider>
          <CrudProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:catId" element={<Listado />} />
              <Route path="/product/:idProduct" element={<Ficha />} />
              <Route path="/admin" element={<CRUD />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CrudProvider>
        </CartProvider>
      </SearchProvider>
    </div>
  );
}

export default App;
