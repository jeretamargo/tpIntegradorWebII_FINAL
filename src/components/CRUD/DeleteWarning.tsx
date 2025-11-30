import React, { useContext } from "react";
import { CrudContext } from "../../context/CrudContext";
import type { JSX } from "react/jsx-runtime";

function DeleteWarning() {
  const {
    selectedItem,
    isWarningOpen,
    setIsWarningOpen,
    deleteProduct,
    deleteCategory,
    deleteTag,
  } = useContext(CrudContext);
  if (isWarningOpen) {
    if (selectedItem.type === "product") {
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
                Atención
              </h2>
            </div>

            <div className="mt-4">
              <p className="text-pretty text-gray-700">
                Esta por borrar el producto: {selectedItem.title}
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
                onClick={() => deleteProduct(selectedItem.id)}
              >
                Borrar
              </button>
            </footer>
          </div>
        </div>
      );
    } else if (selectedItem.type === "categorie") {
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
                Atención
              </h2>
            </div>

            <div className="mt-4">
              <p className="text-pretty text-gray-700">
                Esta por borrar la categoria: {selectedItem.title}
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
                onClick={() => deleteCategory(selectedItem.id)}
              >
                Borrar
              </button>
            </footer>
          </div>
        </div>
      );
    } else if (selectedItem.type === "tag") {
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
                Atención
              </h2>
            </div>

            <div className="mt-4">
              <p className="text-pretty text-gray-700">
                Esta por borrar el tag: {selectedItem.title}
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
                onClick={() => deleteTag(selectedItem.id)}
              >
                Borrar
              </button>
            </footer>
          </div>
        </div>
      );
    }
  }
}

export default DeleteWarning;
