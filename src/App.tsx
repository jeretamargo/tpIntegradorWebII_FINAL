import React from "react";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import { Listado } from "./pages/Listado";
import Ficha from "./pages/Ficha";
import { Route, Routes } from "react-router";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<Listado />} />
        <Route path="/product/:productId" element={<Ficha />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
