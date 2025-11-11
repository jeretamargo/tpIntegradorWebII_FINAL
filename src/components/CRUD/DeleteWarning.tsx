import React, { useContext } from "react";
import CrudContext from "./CrudContext";
import type { JSX } from "react/jsx-runtime";

interface Props {
  title: string;
  id: string;
}

function DeleteWarning({ title, id }: Props) {
  const { ProductTabOpen, CategorieTabOpen, TagTabOpen } =
    useContext(CrudContext);
  return (
    <div
      className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <h2
            id="modalTitle"
            className="text-xl font-bold text-gray-900 sm:text-2xl"
          >
            Borrar
          </h2>

          <button
            type="button"
            className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div className="mt-4">
          <p className="text-pretty text-gray-700">
            Esta por borrar el producto {title}
          </p>
        </div>

        <footer className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            Cancelar
          </button>

          <button
            type="button"
            className="rounded bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
          >
            Borrar
          </button>
        </footer>
      </div>
    </div>
  );
}

export default DeleteWarning;
