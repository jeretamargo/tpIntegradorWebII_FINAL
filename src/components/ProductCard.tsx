import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import type { CartItem, Tag } from "../api/interfaces/interfaces";
import { Link } from "react-router-dom";
import addToCartIcon from "../assets/images/add-to-cart-icon.png"; // <-- Importamos la imagen

interface Props {
  title: string;
  picture: string;
  description: string;
  price: number;
  productId: number;
  tags?: Tag[];
}

function ProductCard({
  title,
  picture,
  description,
  price,
  productId,
  tags,
}: Props) {
  const { addItem } = useContext(CartContext);

  return (
    <div className="relative">
      <button
        onClick={() =>
          addItem({
            id: productId,
            name: title,
            price: price,
            picture: picture,
          } as CartItem)
        }
        className="rounded-xl absolute cursor-pointer p-2 -top-3 -right-3 bg-gray-300 hover:scale-110 transition-all shadow-lg"
      >
        <img src={addToCartIcon} className="w-10" /> {/* <-- Usamos la importación */}
      </button>

      <div className="h-auto sm:min-h-120 w-auto grid grid-cols-2 sm:grid-cols-1 gap-4 rounded-xl bg-gray-200 shadow-lg px-4 hover:shadow-lg transition">
        <div className="h-auto overflow-hidden flex items-center justify-center">
          <Link
            to={`/product/${productId}`}
            className="group block overflow-hidden p-4"
          >
            <img src={picture} alt={title} className="m-auto rounded-3xl" />
          </Link>
        </div>

        <div className="pt-10 md:pt-3 flex flex-col sm:grid sm:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:underline group-hover:underline-offset-4">
              {title}
            </h3>
            <div className="flex flex-col gap-6 items-start">
              <span className="sr-only">Regular Price</span>
              <span className="tracking-wider text-gray-800 font-bold text-2xl">
                ${price}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start sm:w-fit gap-2 sm:gap-1 mt-12">
            {tags?.map((tag) => (
              <div
                key={tag.id}
                className={`py-1 my-1 px-5 ${
                  tag.id === 24
                    ? "bg-red-500"
                    : tag.id === 25
                    ? "bg-green-500"
                    : tag.id === 26
                    ? "bg-orange-500"
                    : ""
                } rounded-lg text-white`}
              >
                {tag.id === 24
                  ? "Promo"
                  : tag.id === 25
                  ? "Orgánico"
                  : tag.id === 26
                  ? "Local"
                  : ""}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
