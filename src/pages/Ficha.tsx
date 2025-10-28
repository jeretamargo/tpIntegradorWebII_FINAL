import ProductDetail from "../components/layout/ProductDetail";
import { fetchProductByID } from "../api/fetch/products";
import React, { useEffect, useState } from "react";
import Home from "./Home";
import { useParams } from "react-router";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import TagList from "../components/TagList";
import type { Products, Tag } from "../api/interfaces/interfaces";

interface Props {
  title: string;
  picture: string;
  description: string;
  price: number;
  productId: number;
}

function Ficha() {
  const [product, setProduct] = useState<Props | null>(null);
  const { idProduct } = useParams(); //useParams siempre devuelve string o undefined no olvidar que es un metodo ,por eso no funcionaba
  const id: number = Number(idProduct);
  console.log(idProduct);

  useEffect(() => {
    async function loadProduct() {
      try {
        const p = await fetchProductByID(id); //funcion de la carpeta fetch

        setProduct({
          title: p.title,
          picture: p.pictures[0], // suponiendo que pictures es un array
          description: p.description,
          price: p.price,
          productId: p.id,
        });
      } catch (error) {
        console.error(error);
      }
    }
    loadProduct();
  }, [id]);

  if (!product) return <p>Cargando...</p>;
  //... spread operator equivalente a esquibir las props
  return (
    <>
      <Header></Header>
      <ProductDetail {...product} />
      <Footer></Footer>
    </>
  );
}

export default Ficha;
