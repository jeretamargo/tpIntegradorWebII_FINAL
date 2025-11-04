import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import type { CartItem } from "../api/interfaces/interfaces";

function CartView() {
  const {
    isOpen,
    toggleCart,
    productos,
    removeItem,
    addItem,
    totalQuantity,

    emptyCart,
    totalVal,
  } = useContext(CartContext);
  if (isOpen) {
    return (
      <>
        <div
          className="fixed w-screen max-w-full sm:max-w-sm shadow-2xl z-51 bg-gray-500 px-4 py-8 sm:px-6 lg:px-8 right-0 top-0 h-full transform transition-transform duration-300 ease-in-out max-h-screen"
          aria-modal="true"
          role="dialog"
          /*  tabindex="-1" */
        >
          <button
            onClick={toggleCart}
            className="absolute end-4 top-4 text-white transition-all hover:scale-110 cursor-pointer"
          >
            <span className="sr-only">Close cart</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <p className="font-bold text-white">Lista de Productos:</p>
          <hr className="text-white mt-4" />
          <div className="mt-4 space-y-6 flex flex-col overflow-y-auto overflow-x-hidden max-h-8/12">
            {productos.length === 0 ? (
              <p className="text-white text-center">
                No hay productos en el carrito
              </p>
            ) : (
              productos.map((item) => (
                <li className="list-none flex flex-row text-white">
                  <img
                    src={item.picture}
                    className="h-12 flex align-middle shadow-2xs rounded-full"
                  />
                  <div className="self-center grid grid-cols-4 justify-between items-center w-full max-w-full">
                    <p className="text-sm col-span-2 mx-2">{item.name}</p>

                    <div>
                      <p className="font-bold text-sm col-span-1">
                        X${item.quantity}
                      </p>

                      <p className="font-bold text-green-500 text-sm col-span-1">
                        ${item.price * item.quantity}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 col-span-1">
                      <button
                        type="button"
                        onClick={() =>
                          removeItem({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            picture: item.picture,
                            quantity: item.quantity,
                          } as CartItem)
                        }
                        className="size-10 leading-10 text-white transition hover:opacity-75  cursor-pointer"
                      >
                        -
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          addItem({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            picture: item.picture,
                            quantity: item.quantity,
                          } as CartItem)
                        }
                        className="size-10 leading-10 text-white transition hover:opacity-75 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </div>

          <hr className="text-white my-4" />
          <div className="mb-4">
            <span className="font-bold text-white">
              Valor Total:
              <span className="text-green-500 font-bold">${totalVal}</span>
            </span>
          </div>
          <div className="space-y-4 text-center">
            <button className="inline rounded-sm bg-green-500 px-5 py-3 text-sm text-gray-100 transition hover:bg-green-600 cursor-pointer">
              Finalizar Compra
            </button>
            <button
              onClick={emptyCart}
              className="inline rounded-sm bg-red-500 px-5 py-3 text-sm text-gray-100 transition hover:bg-red-600 cursor-pointer"
            >
              Vaciar Carrito
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default CartView;
