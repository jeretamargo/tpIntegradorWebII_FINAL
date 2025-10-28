import React from "react";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import { Listado } from "./pages/Listado";
import Ficha from "./pages/Ficha";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element= {<Home/>}/>
        <Route path="/product-id/:idProduct" element= {<Ficha/>}/>
      </Routes>
    </div>
  );
}

export default App;
