import React, { useEffect, useState } from "react";
import type { Category } from "../api/interfaces/interfaces";
import { Link, useParams, useSearchParams } from "react-router-dom";
interface Props {
  categorias: Category[];
}

function CategoriesList({ categorias }: Props) {
  const [selectedCat, setSelectedCat] = useState<Category>();

  const [searchParams] = useSearchParams();
  const param_cat_id = "";

  useEffect(() => {
    const param_cat_id = searchParams.get("cat");
    setSelectedCat(
      categorias.find((cat) => cat.id.toString() === param_cat_id)
    );
  });

  return (
    <>
      <section className="bg-gray-200">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h1 className="text-xl text-center py-8 font-bold text-gray-900 sm:text-3xl">
              Buscá por categorías
            </h1>
            <h2 className="text-xl text-center py-8 font-bold text-blue-700 sm:text-2xl">
              {selectedCat?.title}
            </h2>
          </header>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
            {categorias.map((cat) => (
              <li key={cat.id} className="w-full flex justify-center">
                <Link
                  to={`/category/${cat.id}`}
                  className="inline-block w-full text-center rounded-sm bg-[#2892d7] px-4 py-2 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
                >
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default CategoriesList;
