import React, { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { ProductList } from "../components/ProductList";
import TagList from "../components/TagList";
import type { Products, Tag, Category } from "../api/interfaces/interfaces";
import cargaGif from "../assets/images/carga.gif";
import CartView from "../components/CartView";
import Carousel from "../components/Carousel";
import CategoriesList from "../components/CategoriesList";

export function Listado() {
  const [products, setProducts] = useState<Products[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories(): Promise<Category[]> {
      const res = await fetch(`http://161.35.104.211:8000/categories/`, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer jeremias01",
        },
      });
      const data = await res.json();
      return data;
    }

    async function fetchTags(): Promise<Tag[]> {
      const res = await fetch("http://161.35.104.211:8000/tags", {
        headers: {
          accept: "application/json",
          Authorization: "Bearer jeremias01",
        },
      });
      const data = await res.json();
      return data;
    }

    async function fetchProducts(): Promise<Products[]> {
      const res = await fetch(`http://161.35.104.211:8000/products/`, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer jeremias01",
        },
      });
      const data = await res.json();
      return data;
    }

    fetchCategories().then((data) => setCategories(data)).catch(console.error);
    fetchTags().then((data) => setTags(data)).catch(console.error);
    fetchProducts().then((data) => setProducts(data)).catch(console.error);
  }, []);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <img src={cargaGif} />
        <p>Cargando Productos</p>
      </div>
    );
  }

  return (
    <>
      <Header categories={categories} />
      <CartView />
      <Carousel />

      {/* Lista de tags igual que home */}
      <TagList tags={tags} />
     
      {/* Productos */}
      <ProductList products={products} />

      <Footer />
    </>
  );
}