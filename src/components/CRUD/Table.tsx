import React, { useEffect, useState } from "react";
import type { Category, Products, Tag } from "../../api/interfaces/interfaces";

function Table() {
  const [arrayProducts, setProducts] = useState<Products[]>([]);
  const [arrayTags, setTags] = useState<Tag[]>([]);
  const [arrayCategories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories(): Promise<Category[]> {
      try {
        const res = await fetch(`http://161.35.104.211:8000/categories/`, {
          headers: {
            accept: "application/json",
            Authorization: "Bearer jeremias01",
          },
        });

        const data = await res.json();
        return data;
      } catch (error) {
        console.error(`Error cargando productos: ", ${error}`);

        throw error;
      }
    }
    fetchCategories()
      .then((categories) => setCategories(categories))
      .catch((err) => console.error(err));

    async function fetchTags(): Promise<Tag[]> {
      try {
        const res = await fetch("http://161.35.104.211:8000/tags", {
          headers: {
            accept: "application/json",
            Authorization: "Bearer jeremias01",
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {
        console.error(`Error cargando etiquetas: ", ${error}`);
        throw error;
      }
    }
    fetchTags()
      .then((tags) => setTags(tags))
      .catch((err) => console.error(err));

    async function fetchProducts(): Promise<Products[]> {
      try {
        const res = await fetch(`http://161.35.104.211:8000/products/`, {
          headers: {
            accept: "application/json",
            Authorization: "Bearer jeremias01",
          },
        });

        const data = await res.json();
        return data;
      } catch (error) {
        console.error(`Error cargando productos: ", ${error}`);

        throw error;
      }
    }

    fetchProducts()
      .then((products) => setProducts(products))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-black">
          <thead className="text-xs text-black uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Producto
              </th>
              <th scope="col" className="px-6 py-3">
                Imagen
              </th>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Tag
              </th>
              <th scope="col" className="px-6 py-3">
                Categoría
              </th>
              <th scope="col" className="px-6 py-3">
                Precio
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {arrayProducts.map((product: Products) => {
              return (
                <tr className="odd:bg-white even:bg-gray-200 border-b  border-gray-200">
                  <td className="px-6 py-4  ">{product.title}</td>
                  <td className="px-6 py-4">
                    <img
                      src={`http://161.35.104.211:8000${product.pictures[0]}`}
                      className="object-contain max-h-30 max-w-30 min-h-[150px] min-w-[80px] m-auto"
                    />
                  </td>
                  <td className="px-6 py-4">{product.id}</td>
                  <td className="px-6 py-4">tag</td>
                  <td className="px-6 py-4">{product.category_id}</td>
                  <td className="px-6 py-4">{product.price * 1000}</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-2"
                    >
                      Editar
                    </a>
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Eliminar
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
