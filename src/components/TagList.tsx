import React, { useEffect, useState } from "react";
import type { Tag } from "../api/interfaces/interfaces";
interface Props {
  tags: Tag[];
}

function TagList({ tags }: Props) {
  return (
    <>
      <section className=" flex  flex-wrap items-center justify-center">
        <div className=" mx-auto max-w-screen-xl px-2 py-4 sm:px-6 sm:py-12 lg:px-8 ">
          <header className="inline">
            <h2 className="text-xl text-center  py-8 font-bold text-gray-900 sm:text-3xl">
              Buscá por Tags
            </h2>
          </header>

          {tags.map((tag) => {
            return (
              <a
                className="inline-block rounded-sm bg-blue-800 px-8  py-2 mx-5 text-sm   font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
                href={`http://localhost:5173/index.html?tag=${tag.id}`}
              >
                {tag.title}
              </a>
            );
          })}
          <a
            className="inline-block rounded-sm bg-blue-800 px-8  py-2 mx-5 text-sm   font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
            href="http://localhost:5173/index.html"
          >
            Mostrar Todo
          </a>
        </div>
      </section>
    </>
  );
}

export default TagList;
