import ProductDetail from "../components/layout/ProductDetail";
import { fetchProductByID } from "../api/fetch/products";
import React, { useEffect, useState } from "react";

import { useSearchParams } from "react-router";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import TagList from "../components/TagList";
import type { Category, Products, Tag } from "../api/interfaces/interfaces";
import cargaGif from "../assets/images/carga.gif";
import CartView from "../components/CartView";
import { useParams } from "react-router-dom";

interface Props {
  title: string;
  picture: string;
  description: string;
  price: number;
  productId: number;
  tags?: Tag[];
  category?: Category;
}

function Ficha() {
  const { idProduct } = useParams<{ idProduct: string }>();
  const [product, setProduct] = useState<Props | null>(null);
 // const [idProduct] = useSearchParams(); //useParams siempre devuelve string o undefined no olvidar que es un metodo ,por eso no funcionaba
  //const idP = idProduct.get("product-id");
  //const id: number = Number(idP);
  console.log(idProduct);
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

    async function loadProduct() {
      if (!idProduct) return;
      try {
         const id = parseInt(idProduct);
        const p = await fetchProductByID(id); //funcion de la carpeta fetch

        setProduct({
          title: p.title,
          picture: p.pictures[0], // suponiendo que pictures es un array
          description: p.description,
          price: p.price,
          productId: p.id,
          tags: p.tags,
           category: p.category,
        });
      } catch (error) {
        console.error(error);
      }
    }
    loadProduct();
  }, [idProduct]);
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <img src={cargaGif} />
        <p>Cargando Productos</p>
      </div>
    );
  } else {
    //... spread operator equivalente a esquibir las props
    return (
      <>
        <Header categories={categories}></Header>
        <CartView />
        <ProductDetail {...product} />
        <Footer></Footer>
      </>
    );
  }
}
export default Ficha;
