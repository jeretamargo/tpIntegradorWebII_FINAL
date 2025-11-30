import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import type { CartItem, Tag } from "../../api/interfaces/interfaces";

interface Props {
  title: string;
  picture: string;
  description: string;
  price: number;
  productId: number;
  tags?: Tag[];
}

function ProductDetail({
  title,
  picture,
  description,
  price,
  productId,
  tags,
}: Props) {
  const { addItem,openCart } = useContext(CartContext);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-gray-200 shadow-lg rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Imagen */}
        <div className="flex justify-center items-center">
          <img
            src={`http://161.35.104.211:8000${picture}`}
            alt={title}
            className="rounded-3xl w-full object-cover"
          />
        </div>

        {/* Info derecha */}
        <div className="flex flex-col justify-between">
          
          {/* Título y precio */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {title}
            </h2>

            <span className="tracking-wider text-gray-800 font-bold text-3xl">
              $ {price * 1000}
            </span>

            {/* Tags con mismos colores que ProductCard */}
            <div className="mt-4 flex flex-wrap gap-2">
              {tags?.map((tag) => (
                <span
                  key={tag.id}
                  className={`py-1 px-4 text-white rounded-lg ${
                    tag.id === 24
                      ? "bg-red-500"
                      : tag.id === 25
                      ? "bg-green-500"
                      : tag.id === 26
                      ? "bg-orange-500"
                      : "bg-gray-500"
                  }`}
                >
                  {tag.id === 24
                    ? "Promo"
                    : tag.id === 25
                    ? "Orgánico"
                    : tag.id === 26
                    ? "Local"
                    : tag.name}
                </span>
              ))}
            </div>

            {/* Descripción */}
            <p className="text-gray-700 mt-6 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Botón agregar al carrito */}
          <button
            onClick={() =>{
              addItem({
                id: productId,
                name: title,
                price: price * 1000,
                picture: `http://161.35.104.211:8000${picture}`,
              } as CartItem);
                openCart();
              }}
            className="mt-8 w-full bg-gray-300 rounded-xl p-3 text-gray-800 font-bold
                       shadow-lg hover:scale-110 hover:cursor-pointer transition-all flex justify-center"
          >
            <img
              src="/src/assets/images/add-to-cart-icon.png"
              className="w-8 mr-2"
            />
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
