import React, { useEffect, useState } from "react";
import type { Products } from "../api/interfaces/interfaces";
import ProductCard from "./ProductCard";

interface Props {
  products: Products[];
}

export function ProductList({ products }: Props) {
  const [catId, setCatId] = useState("");
  const [tagId, setTagId] = useState("");
  const [searchText, setSearchText] = useState(""); // ← BÚSQUEDA
  const page = window.location.pathname;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("cat") ?? "";
    const tag = params.get("tag") ?? "";
    setCatId(categoria);
    setTagId(tag);
  }, [window.location.search]);

  // -----------------------------
  // FILTRO DE BUSQUEDA
  // -----------------------------
  const productosBuscados = products.filter((prod) =>
    prod.title.toLowerCase().includes(searchText.toLowerCase())
  );

  function renderSearchBar() {
    return (
      <div className="w-full max-w-xl mx-auto mt-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full p-3 border border-gray-400 rounded-lg shadow-sm 
                     focus:outline-none focus:ring focus:ring-indigo-300"
        />
      </div>
    );
  }

  // -----------------------------
  // RENDER POR CATEGORÍA
  // -----------------------------
  function renderByCat() {
    const productosFiltrados =
      catId === ""
        ? productosBuscados
        : productosBuscados.filter(
            (prod) => parseInt(catId) === prod.category.id
          );

    return (
      <section className="bg-gray-200 ">
        <div className="m-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 bg-gray-200">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Productos
            </h2>
          </header>

          {renderSearchBar()}

         <ul className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
  {productosFiltrados.map((producto: Products) => (
     <li className="w-full sm:w-80 md:w-96 mx-auto" key={producto.id}>
    <ProductCard
      key={producto.id}
      title={producto.title}
      picture={`http://161.35.104.211:8000${producto.pictures[0]}`}
      price={producto.price * 1000}
      description={producto.description}
      productId={producto.id}
      tags={producto.tags}
    />
    </li>
  ))}
</ul>
        </div>
      </section>
    );
  }

  // -----------------------------
  // RENDER POR TAG
  // -----------------------------
  function renderByTag() {
    const productosTagFiltrados =
      tagId === ""
        ? productosBuscados
        : productosBuscados.filter((prod) => {
            if (prod.tags?.length === 1) {
              return parseInt(tagId) === prod.tags[0].id;
            }
            if (prod.tags?.length > 1) {
              return (
                parseInt(tagId) === prod.tags[0].id ||
                parseInt(tagId) === prod.tags[1].id
              );
            }
          });

    return (
      <section className="">
        <div className="m-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 bg-gray-100">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Productos
            </h2>
          </header>

          {renderSearchBar()}

          <ul className="mt-8 grid gap-4 sm:grid-cols-3 p lg:grid-cols-6 ">
            {productosTagFiltrados.map((producto: Products) => (
              <ProductCard
                key={producto.id}
                title={producto.title}
                picture={`http://161.35.104.211:8000${producto.pictures[0]}`}
                price={producto.price * 1000}
                description={producto.description}
                productId={producto.id}
                tags={producto.tags}
              />
            ))}
          </ul>
        </div>
      </section>
    );
  }

  // -----------------------------
  // SELECTOR DE RENDER
  // -----------------------------
  if (page === "/" || page.endsWith("index.html")) {
    return renderByTag();
  }

  if (page === "/list") {
    return renderByCat();
  }

  return null;
}