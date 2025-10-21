import React from "react";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import { Listado } from "./pages/Listado";
import Ficha from "./pages/Ficha";

function App() {
  return (
    <div>
      <Home></Home>
      <Ficha id={164}/>
    </div>
  );
}

export default App;
