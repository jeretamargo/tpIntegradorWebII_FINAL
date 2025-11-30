import React, { useEffect, useState,useContext } from "react";
import { useLocation } from "react-router-dom";
import type { Products } from "../api/interfaces/interfaces";
import ProductCard from "./ProductCard";
import { SearchContext } from "../context/SearchContext";

interface Props {
  products: Products[];
}

export function ProductList({ products }: Props) {
  const location = useLocation();
  const { searchText, setSearchText } = useContext(SearchContext);
  const [catId, setCatId] = useState("");
  const [tagId, setTagId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setCatId(params.get("cat") ?? "");
    setTagId(params.get("tag") ?? "");
  }, [location.search]);

  const productosBuscados = products.filter((prod) =>
    prod.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // Barra de búsqueda mobile
  function renderSearchBar() {
    return (
      <div className="w-full max-w-xl mx-auto mt-4 block md:hidden">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full p-3 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
        />
      </div>
    );
  }

  function renderByCat() {
    const productosFiltrados =
      catId === ""
        ? productosBuscados
        : productosBuscados.filter(
            (prod) => parseInt(catId) === prod.category.id
          );

    return (
      <section className="bg-gray-200">
        <div className="m-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Productos
            </h2>
          </header>

          {renderSearchBar()}

          <ul className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {productosFiltrados.map((producto: Products) => (
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

  function renderByTag() {
    const productosTagFiltrados =
      tagId === ""
        ? productosBuscados
        : productosBuscados.filter((prod) =>
            prod.tags?.some((t) => t.id === parseInt(tagId))
          );

    return (
      <section className="bg-gray-100">
        <div className="m-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Productos
            </h2>
          </header>

          {renderSearchBar()}

          <ul className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
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

  const page = location.pathname;

  if (page === "/" || page.endsWith("index.html")) return renderByTag();
  if (page === "/list") return renderByCat();

  return null;
}