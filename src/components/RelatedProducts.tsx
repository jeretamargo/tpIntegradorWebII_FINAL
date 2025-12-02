import React, { useEffect, useState , useContext} from "react";
import type { Category , Product, CartItem} from "../api/interfaces/interfaces";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Carousel } from 'flowbite-react';
import ProductCard from "./ProductCard";
import { CartContext } from "../context/CartContext";



interface Props {
  categoryId: number;
 
}

export default function RelatedProducts({ categoryId }: Props) {
 const [products, setProducts] = useState<Product[]>([]);//products array de objetos tipo Product
 const { addItem, openCart } = useContext(CartContext);

 useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`http://161.35.104.211:8000/products?category_id=${categoryId}`, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer jeremias01",
        },
      });
      const data: Product[] = await res.json();
      return data;
    }

     fetchProducts()
      .then((data) => setProducts(data))
      .catch(console.error);

},[categoryId]);

return (
  

  <section className="mt-8 bg-gray-100  px-4 py-6 sm:px-6 lg:px-8 w-full">
  <h2 className="text-xl font-semibold mb-4 text-center">
    Otras personas que vieron esto también compraron
  </h2>

  <div className="max-w-5xl mx-auto overflow-x-auto flex space-x-6 scroll-smooth snap-x snap-mandatory pb-4">
    {products.map((p) => (
      <Link
        key={p.id}
        to={`/product/${p.id}`}
        className="flex-shrink-0 w-64 snap-center"
      >
        <div className="bg-stone-100 rounded-2xl shadow-lg p-4 hover:scale-105 transition">
          <div className="flex justify-center items-center">
            <img
              src={`http://161.35.104.211:8000${p.pictures[0]}`}
              alt={p.title}
              className="rounded-2xl w-full h-40 object-cover"
            />
          </div>

          <div className="mt-2 flex flex-col justify-between h-36">
            <h3 className="text-lg font-semibold text-gray-800">{p.title}</h3>
            <span className="text-gray-800 font-bold text-xl mt-1">
              $ {p.price * 1000}
            </span>

            <button
              onClick={(e) => {
                e.preventDefault(); // evita la navegación
                e.stopPropagation(); // evita que el click se propague al Link
                addItem({
                  id: p.id,
                  name: p.title,
                  price: p.price * 1000,
                  picture: `http://161.35.104.211:8000${p.pictures[0]}`,
                  quantity: 1,
                });
                openCart();
              }}
              className="mt-2 w-full rounded-xl p-2 text-gray-800 font-bold
                         shadow hover:scale-105 transition flex justify-center items-center bg-blue-300 hover:bg-blue-200" 
            >
              Agregar
            </button>
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>
);


}
