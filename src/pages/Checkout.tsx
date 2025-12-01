import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Payfrom from "../components/Payfrom";

function Checkout() {
  return (
    <div>
      <Header></Header>
      <Payfrom></Payfrom>
      <Footer></Footer>
    </div>
  );
}

export default Checkout;
