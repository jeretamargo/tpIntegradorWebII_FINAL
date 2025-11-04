import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import type { Category } from "../api/interfaces/interfaces";
import CartView from "../components/CartView";

function NotFound() {
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
  });
  return (
    <>
      <Header categories={categories}></Header>
      <CartView />
      <main className="grid min-h-full place-items-center bg-gray-200 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-black">404</h1>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-black sm:text-7xl">
            Página no encontrada
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-black sm:text-xl/8">
            No encontramos lo que buscabas
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="http://localhost:5173/"
              className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-black shadow-xs hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              Volver al Home
            </a>
            <a href="#" className="text-sm font-semibold text-black">
              Contactar con el soporte <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>

      <Footer></Footer>
    </>
  );
}

export default NotFound;
