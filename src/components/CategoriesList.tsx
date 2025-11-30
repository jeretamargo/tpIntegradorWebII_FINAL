import React, { useState } from "react";
import type { Category } from "../api/interfaces/interfaces";

interface Props {
  categorias: Category[];
}

function CategoriesList({ categorias }: Props) {
  return (
    <>
      <section className="bg-gray-200">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl text-center py-8 font-bold text-gray-900 sm:text-3xl">
              Buscá por categorías
            </h2>
          </header>
          {categorias.map((cat) => {
            return (
              <a
                key={cat.id}
                href={`http://localhost:5173/list?cat=${cat.id}`}
                className="inline-block rounded-sm px-8 py-2 mx-5 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-none"
                style={{ backgroundColor: "#2892d7" }} // ← color fijo
              >
                {cat.title}
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default CategoriesList;
