import React, { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { ProductList } from "../components/ProductList";
import TagList from "../components/TagList";
import type { Products, Tag, Category } from "../api/interfaces/interfaces";
import cargaGif from "../assets/images/carga.gif";
import CartView from "../components/CartView";
import Carousel from "../components/Carousel";

function Home() {
  const [arrayProducts, setProducts] = useState<Products[]>([]);
  const [arrayTags, setTags] = useState<Tag[]>([]);
  const [arrayCategories, setCategories] = useState<Category[]>([]);

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

    async function fetchTags(): Promise<Tag[]> {
      try {
        const res = await fetch("http://161.35.104.211:8000/tags", {
          headers: {
            accept: "application/json",
            Authorization: "Bearer jeremias01",
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {
        console.error(`Error cargando etiquetas: ", ${error}`);
        throw error;
      }
    }
    fetchTags()
      .then((tags) => setTags(tags))
      .catch((err) => console.error(err));

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

    fetchProducts()
      .then((products) => setProducts(products))
      .catch((err) => console.error(err));
  }, []);

  if (arrayProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <img src={cargaGif} />
        <p>Cargando Productos</p>
      </div>
    );
  } else {
    return (
      <>
        <Header categories={arrayCategories}></Header>
        <CartView />
        <Carousel></Carousel>

        <TagList tags={arrayTags}></TagList>
        <div className=" ">
          <ProductList products={arrayProducts}></ProductList>
        </div>
        <Footer></Footer>
      </>
    );
  }
}
export default Home;
