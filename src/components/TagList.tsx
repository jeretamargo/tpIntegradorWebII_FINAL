import React from "react";
import type { Tag } from "../api/interfaces/interfaces";

// Importar imágenes directamente
import ofertaImg from "../assets/images/oferta-WEB.png";
import organicoImg from "../assets/images/organico-web.png";
import localImg from "../assets/images/producto-local.png";
import todosImg from "../assets/images/todos-web.png";

interface Props {
  tags: Tag[];
}

function TagList({ tags }: Props) {
  return (
    <>
      <section className="grid grid-cols-1  bg-gray-200">
        <div className=" mx-auto max-w-screen-xl px-2 py-4 sm:px-6 sm:py-12 lg:px-8 self-center grid  grid-cols-2  lg:grid-cols-4">
          {tags.map((tag) => {
            let imgSrc = "";
            if (tag.id === 24) imgSrc = ofertaImg;
            else if (tag.id === 25) imgSrc = organicoImg;
            else if (tag.id === 26) imgSrc = localImg;

            return (
              <a
                className="inline-block rounded-sm  text-sm font-medium text-black transition hover:scale-110  px-15"
                href={`http://localhost:5173/?tag=${tag.id}`}
                key={tag.id}
              >
                <img className="w-40" src={imgSrc} alt={tag.title}></img>
                <p className="place-self-center flex">{tag.title}</p>
              </a>
            );
          })}
          <a
            className="inline-block rounded-sm text-sm font-medium text-black transition hover:scale-110   px-15"
            href="http://localhost:5173/"
          >
            <img className="w-40 " src={todosImg} alt="Mostrar Todo"></img>
            <p className="place-self-center flex">Mostrar Todo</p>
          </a>
        </div>
      </section>
    </>
  );
}

export default TagList;
