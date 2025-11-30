import React, { useState } from "react";
import type { Category } from "../api/interfaces/interfaces";

interface Props {
  categorias: Category[];
}

function CategoriesList({ categorias }: Props) {
  return (
    <>
      <section className=" flex  flex-wrap items-center justify-center bg-gray-200">
        <div className=" py-8 sm:px-6 sm:py-12 lg:px-8  ">
          <header>
            <h2 className="text-xl text-center py-8 font-bold text-gray-900 sm:text-3xl">
              Buscá por categorias
            </h2>
          </header>
          {categorias.map((cat) => {
            return (
              <a
                className="inline-block  rounded-full px-8  py-2 mx-5 text-sm text-center  font-medium text-black transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
                href={`http://localhost:5173/list?cat=${cat.id}`}
              >
                <img
                  className="w-40 rounded-full"
                  src={`https://ecommerce.fedegonzalez.com${cat.picture}`}
                ></img>
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
