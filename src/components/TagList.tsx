import React, { useEffect, useState } from "react";
import type { Tag } from "../api/interfaces/interfaces";
interface Props {
  tags: Tag[];
}

function TagList({ tags }: Props) {
  return (
    <>
      <section className="grid grid-cols-1  bg-gray-200">
        <div className=" mx-auto max-w-screen-xl px-2 py-4 sm:px-6 sm:py-12 lg:px-8 self-center grid  grid-cols-2  lg:grid-cols-4">
          {tags.map((tag) => {
            return (
              <a
                className="inline-block rounded-sm  text-sm   font-medium text-black transition hover:scale-110  px-15"
                href={`http://localhost:5173/?tag=${tag.id}`}
                key={tag.id}
              >
                <img
                  className="w-40"
                  src={
                    tag.id === 24
                      ? `src/assets/images/oferta-WEB.png`
                      : tag.id === 25
                      ? `src/assets/images/organico-web.png`
                      : tag.id === 26
                      ? `src/assets/images/producto-local.png`
                      : ``
                  }
                ></img>
                <p className="place-self-center flex">{tag.title}</p>
              </a>
            );
          })}
          <a
            className="inline-block rounded-sm text-sm   font-medium text-black transition hover:scale-110   px-15"
            href="http://localhost:5173/"
          >
            <img className="w-40 " src="src/assets/images/todos-web.png"></img>
            <p className="place-self-center flex">Mostrar Todo</p>
          </a>
        </div>
      </section>
    </>
  );
}

export default TagList;
