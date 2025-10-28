import ProductDetail from "../components/layout/ProductDetail";
import { fetchProductByID } from "../api/fetch/products";
import React, { useEffect, useState } from "react";
import Home from "./Home";

interface Props {
  title: string;
  picture: string;
  description: string;
  price: number;
  productId: number;
}

function Ficha() {
  console.log("cargando ficha");
  const [id, setId] = useState("");
  const [product, setProduct] = useState<Props | null>(null);

  //  Leer el parámetro de la URL una sola vez o cuando cambie
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("product-id") ?? "";
    setId(productId);
  }, [window.location.search]);
console.log("producto recibido"+ id );
  //  Hacer el fetch solo si hay ID válido
  useEffect(() => {
    if (!id) return; // si no hay ID, no cargamos producto

    async function loadProduct() {
      try {
        const p = await fetchProductByID(Number(id));
        setProduct({
          title: p.title,
          picture: p.pictures[0],
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

  //  Render según el estado
  if (!id) return <Home />; // si no hay id en la URL, mostramos Home
  if (!product) return <p>Cargando...</p>; // mientras se carga
  return <ProductDetail {...product} />;
}

export default Ficha;
