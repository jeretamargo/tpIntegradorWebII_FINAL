import React, { useContext } from "react";
import { CrudContext } from "./CrudContext";
import type { JSX } from "react/jsx-runtime";

function DeleteWarning() {
  const { selectedProduct, isWarningOpen, setIsWarningOpen, deleteProduct } =
    useContext(CrudContext);
  if (isWarningOpen) {
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
          </div>

          <div className="mt-4">
            <p className="text-pretty text-gray-700">
              Esta por borrar el producto {selectedProduct.title}
            </p>
          </div>

          <footer className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
              onClick={() => setIsWarningOpen(false)}
            >
              Cancelar
            </button>

            <button
              type="button"
              className="rounded bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 cursor-pointer"
              onClick={() => deleteProduct(selectedProduct.id)}
            >
              Borrar
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

export default DeleteWarning;
