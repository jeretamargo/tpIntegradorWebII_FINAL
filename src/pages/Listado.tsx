import React, { useEffect, useState } from "react";
import type { Category, Products } from "../api/interfaces/interfaces";
import { fetchProducts } from "../api/fetch/products";
import Header from "../components/layout/Header";
import CategoriesList from "../components/CategoriesList";
import { ProductList } from "../components/ProductList";
import Footer from "../components/layout/Footer";
import cargaGif from "../assets/images/carga.gif";
import CartView from "../components/CartView";

export function Listado() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    async function fetchProducts(): Promise<Products[]> {
      try {
        const res = await fetch(`http://161.35.104.211:8000/products/`, {
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

    fetchProducts()
      .then((products) => setProducts(products))
      .catch((err) => console.error(err));
  });
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <img src={cargaGif} />
        <p>Cargando Productos</p>
      </div>
    );
  } else {
    return (
      <>
        <Header categories={categories}></Header>
        <CartView />
        <div className=" flex  flex-wrap items-center justify-center bg-gray-200">
          <CategoriesList categorias={categories}></CategoriesList>
        </div>
        <ProductList products={products}></ProductList>
        <Footer></Footer>
      </>
    );
  }
}
