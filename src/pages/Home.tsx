import React, { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { ProductList } from "../components/ProductList";
import TagList from "../components/TagList";
import type { Products, Tag } from "../api/interfaces/interfaces";

function Home() {
  const [arrayProducts, setProducts] = useState<Products[]>([]);
  const [arrayTags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
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
    return <div>Cargando Productos</div>;
  } else {
    return (
      <>
        <Header></Header>
        <div className=" flex  flex-wrap items-center justify-center bg-gray-200">
          <TagList tags={arrayTags}></TagList>
        </div>
        <ProductList products={arrayProducts}></ProductList>
        <Footer></Footer>
      </>
    );
  }
}
export default Home;
