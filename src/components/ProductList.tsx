import React, { useEffect, useState } from "react";
import type { Products } from "../api/interfaces/interfaces";
import ProductCard from "./ProductCard";

interface Props {
  products: Products[];
}

export function ProductList({ products }: Props) {
  const [catId, setCatId] = useState("");
  const [tagId, setTagId] = useState("");
  const page = window.location.pathname;

  //los set de states nunca van dentro de returns, hay que colocarlos en use state, sino provacarian renders infinitos, necesitamos que estos parametros cambien solo si cambia la barra de busqueda que mostrara ids de categorias o tags
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("cat") ?? "";
    const tag = params.get("tag") ?? "";
    setCatId(categoria);
    setTagId(tag);
  }, [window.location.search]);

  function renderByCat() {
    if (catId == "") {
      console.log("renderizando por categorias");
      return (
        <section className="bg-gray-200 ">
          <div className="m-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 bg-gray-200">
            <header>
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Productos
              </h2>
            </header>
            <ul className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
              {products.map((producto: Products) => {
                return (
                  <ProductCard
                    key={producto.id}
                    title={producto.title}
                    picture={`"http://161.35.104.211:8000"${producto.pictures[0]}`}
                    price={producto.price * 1000}
                    description="{producto.description}"
                    productId={producto.id}
                    tags={producto.tags}
                  ></ProductCard>
                );
              })}
            </ul>
          </div>
        </section>
      );
    } else {
      const filteredProducts = products.filter((prod) => {
        return parseInt(catId) == prod.category.id;
      });
      return (
        <section className="bg-gray-200">
          <div className="m-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 bg-gray-200 ">
            <header>
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Productos
              </h2>
            </header>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 p lg:grid-cols-6 ">
              {filteredProducts.map((producto: Products) => {
                return (
                  <ProductCard
                    key={producto.id}
                    title={producto.title}
                    picture={`http://161.35.104.211:8000${producto.pictures[0]}`}
                    price={producto.price * 1000}
                    description={producto.description}
                    productId={producto.id}
                    tags={producto.tags}
                  ></ProductCard>
                );
              })}
            </ul>
          </div>
        </section>
      );
    }
  }
  function renderByTag() {
    console.log("renderizando por tags");

    if (tagId == "") {
      return (
        <section className="">
          <div className="m-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 bg-gray-100">
            <header>
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Productos
              </h2>
            </header>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3 p lg:grid-cols-6 ">
              {products.map((producto: Products) => {
                return (
                  <ProductCard
                    key={producto.id}
                    title={producto.title}
                    picture={`http://161.35.104.211:8000${producto.pictures[0]}`}
                    price={producto.price * 1000}
                    description={producto.description}
                    productId={producto.id}
                    tags={producto.tags}
                  ></ProductCard>
                );
              })}
            </ul>
          </div>
        </section>
      );
    } else {
      const taggedProducts = products.filter((prod) => {
        return prod.tags?.length;
      });

      const filteredProducts = taggedProducts.filter((prod) => {
        console.log(prod.tags?.[0].id);
        if (prod.tags?.length == 1) {
          return parseInt(tagId) == prod.tags?.[0].id;
        }
        if (prod.tags?.length > 1) {
          return (
            parseInt(tagId) == prod.tags?.[0].id ||
            parseInt(tagId) == prod.tags?.[1].id
          );
        }
      });

      console.log(tagId);
      console.log(filteredProducts);
      return (
        <section>
          <div className="m-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <header>
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Productos
              </h2>
            </header>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 p lg:grid-cols-6 ">
              {filteredProducts.map((producto: Products) => {
                return (
                  <ProductCard
                    key={producto.id}
                    title={producto.title}
                    picture={`http://161.35.104.211:8000${producto.pictures[0]}`}
                    price={producto.price * 1000}
                    description={producto.description}
                    productId={producto.id}
                    tags={producto.tags}
                  ></ProductCard>
                );
              })}
            </ul>
          </div>
        </section>
      );
    }
  }

  if (page == "/" || page.endsWith("index.html")) {
    console.log("dentro del if de tags");
    return renderByTag();
  }
  if (page == "/list") {
    console.log("dentro del if de categorias");
    return renderByCat();
  }
  return;
}
