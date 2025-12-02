import React, { useContext, useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Payfrom from "../components/Payfrom";
import type { Category } from "../api/interfaces/interfaces";
import CartView from "../components/CartView";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    async function fetchCategories(): Promise<Category[]> {
      try {
        const res = await fetch(`http://161.35.104.211:8000/categories/`, {
          headers: {
            accept: "application/json",
            Authorization: "Bearer jeremias01",
          },
        });

        const data = await res.json();
        return data;
      } catch (error) {
        console.error(`Error cargando productos: ", ${error}`);

        throw error;
      }
    }
    fetchCategories()
      .then((categories) => setCategories(categories))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <Header categories={categories}></Header>
      <CartView></CartView>
      <Payfrom></Payfrom>
      <Footer></Footer>
    </div>
  );
}

export default Checkout;
