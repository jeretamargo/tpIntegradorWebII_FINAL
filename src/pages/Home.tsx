import React, { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { ProductList } from "../components/layout/ProductList";
import TagList from "../components/layout/TagList";
import type { Products } from "../api/interfaces/interfaces";

function Home() {
  const [products, setProducts] = useState<Products[]>([]);
  const [tags, setTags] = useState();

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

    fetchProducts()
      .then((products) => setProducts(products))
      .catch((err) => console.error(err));
  }, []);
  if (products.length === 0) {
    return <div>Cargando Productos</div>;
  } else {
    return (
      <>
        <Header></Header>
        <div className=" flex  flex-wrap items-center justify-center bg-gray-200">
          <TagList></TagList>
        </div>
        <ProductList products={products}></ProductList>
        <Footer></Footer>
      </>
    );
  }
}
export default Home;
