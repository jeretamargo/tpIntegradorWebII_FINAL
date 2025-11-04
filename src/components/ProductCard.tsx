import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import type { CartItem } from "../api/interfaces/interfaces";
interface Props {
  title: string;
  picture: string;
  description: string;
  price: number;
  productId: number;
}

function ProductCard({ title, picture, description, price, productId }: Props) {
  const { addItem } = useContext(CartContext);
  return (
    <div className="sm:h-[480px] h-[300px] grid grid-cols-2 sm:grid-cols-1 gap-4 rounded-xl bg-white shadow-md p-4 hover:shadow-lg transition">
      <div className="sm:h-[200px] h-[300px] overflow-hidden flex items-center justify-center py-6">
        <a href="#" className="group block overflow-hidden w-full h-full">
          <img
            src={picture}
            alt={title}
            className="object-contain max-h-full max-w-full min-h-[150px] min-w-[80px] m-auto"
          />
        </a>
      </div>
      <div>
        <a
          href={`http://localhost:5173/product?product-id=${productId}`}
          className="group block overflow-hidden"
        >
          <div className="h-[40px] relative bg-white pt-3">
            <h3 className="text-sm font-semibold text-gray-800 group-hover:underline group-hover:underline-offset-4">
              {title}
            </h3>
          </div>
        </a>
        <div className="mt-2 flex flex-col gap-6 items-start">
          <span className="sr-only"> Regular Price </span>
          <span className="tracking-wider text-gray-800 font-bold text-xl">
            $ {price}
          </span>
        </div>
        <div className="mt-2 flex flex-col gap-6 items-start h-20">
          <p className="flex-grow">{description}</p>
        </div>
        <div className="mt-2 flex flex-row gap-4 m-3 items-center">
          <a
            className="flex-1 text-grow hover:underline"
            href={`http://localhost:5173/product?product-id=${productId}`}
          >
            Ver mas
          </a>
          <button
            onClick={() =>
              addItem({
                id: productId,
                name: title,
                price: price,
                picture: picture,
              } as CartItem)
            }
            className="inline-flex items-center rounded-full border border-indigo-600 p-3 text-indigo-600 hover:bg-indigo-300 hover:text-white focus:ring-3 focus:outline-hidden cursor-pointer"
          >
            <span className="sr-only"> Add To Cart </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 32 32"
              className="w-5 h-5"
            >
              <g>
                <g
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="4.1"
                >
                  <g fill="#002cba">
                    <path
                      d="M3 2.014a1 1 0 0 0 0 2h1.18l2.644 13.244A3.018 3.018 0 0 0 5 20.014c0 1.644 1.355 3 3 3h17a1 1 0 0 0 0-2H8c-.571 0-1-.429-1-1a.97.97 0 0 1 .924-.993.95.95 0 0 0 .078.018l18-.025a1 1 0 0 0 .986-.846l1.73-11a1 1 0 0 0-.988-1.154H6.62l-.64-3.198A1 1 0 0 0 5 2.014zm4.018 6H26.56l-1.416 9c-5.443.005-10.885 0-16.33 0zM9 24.014c-1.645 0-3 1.355-3 3s1.355 3 3 3 3-1.355 3-3-1.355-3-3-3zm0 2c.564 0 1 .436 1 1s-.436 1-1 1-1-.436-1-1 .436-1 1-1zM23 24.014c-1.645 0-3 1.355-3 3s1.355 3 3 3 3-1.355 3-3-1.355-3-3-3zm0 2c.564 0 1 .436 1 1s-.436 1-1 1-1-.436-1-1 .436-1 1-1z"
                      fill="#002cba"
                      opacity="1"
                      data-original="#002cba"
                    ></path>
                  </g>
                  <path
                    fill="#00c89f"
                    d="M11 10.014a1 1 0 0 0-1 1 1 1 0 0 0 1 1h12a1 1 0 0 0 1-1 1 1 0 0 0-1-1zM13 13.014a1 1 0 0 0-1 1 1 1 0 0 0 1 1h8a1 1 0 0 0 1-1 1 1 0 0 0-1-1z"
                    opacity="1"
                    data-original="#00c89f"
                  ></path>
                </g>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
