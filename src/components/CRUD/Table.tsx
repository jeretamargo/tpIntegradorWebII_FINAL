import React, { useContext, useEffect, useState } from "react";
import type { Category, Products, Tag } from "../../api/interfaces/interfaces";
import AddButton from "./AddButton";
import { CrudContext } from "./CrudContext";
import DeleteWarning from "./DeleteWarning";

function Table() {
  const [arrayProducts, setProducts] = useState<Products[]>([]);
  const [arrayTags, setTags] = useState<Tag[]>([]);
  const [arrayCategories, setCategories] = useState<Category[]>([]);

  const {
    ProductTabOpen,
    CategorieTabOpen,
    TagTabOpen,
    setSelectedProduct,
    setIsWarningOpen,
    handleDeleteModal,
  } = useContext(CrudContext);

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

  if (ProductTabOpen)
    return (
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right text-black  ">
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
                  <tr
                    className="odd:bg-white even:bg-gray-200 border-b  border-gray-200"
                    key={product.id}
                  >
                    <td className="px-6 py-4  ">{product.title}</td>
                    <td className="px-6 py-4">
                      <img
                        src={`http://161.35.104.211:8000${product.pictures[0]}`}
                        className="object-contain max-h-30 max-w-30 min-h-[150px] min-w-[80px] m-auto"
                      />
                    </td>
                    <td className="px-6 py-4">{product.id}</td>
                    <td className="px-6 py-4">
                      {product.tags?.map((tag) => (
                        <p
                          className={`py-2 font-bold ${
                            tag.id === 25
                              ? " text-green-500"
                              : tag.id === 24
                              ? " text-orange-500"
                              : "text-blue-500"
                          }`}
                        >
                          {tag.title}
                        </p>
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      {arrayCategories.map((cat) =>
                        cat.id === product.category_id ? cat.title : ""
                      )}
                    </td>
                    <td className="px-6 py-4">${product.price * 1000}</td>
                    <td className="px-6 py-4">
                      <button className="px-2 cursor-pointer">
                        <img
                          src="src/assets/images/edit-crud.png"
                          className="flex w-8"
                        ></img>
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteModal({
                            title: product.title,
                            id: product.id,
                          })
                        }
                        className="px-2 cursor-pointer"
                      >
                        <img
                          src="src/assets/images/delete-crud.png"
                          className="flex w-8"
                          onClick={() => setIsWarningOpen(true)}
                        ></img>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  if (CategorieTabOpen)
    return (
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right text-black  ">
            <thead className="text-xs text-black uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 ">
                  Categoría
                </th>
                <th scope="col" className="px-6 py-3">
                  Imagen
                </th>
                <th scope="col" className="px-6 py-3">
                  Descripcion
                </th>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {arrayCategories.map((categorie: Category) => {
                return (
                  <tr
                    className="odd:bg-white even:bg-gray-200 border-b  border-gray-200"
                    key={categorie.id}
                  >
                    <td className="px-6 py-4  ">{categorie.title}</td>
                    <td className="px-6 py-4">
                      <img
                        src={`http://161.35.104.211:8000${categorie.picture}`}
                        className="object-contain max-h-30 max-w-30 min-h-[150px] min-w-[80px] m-auto"
                      />
                    </td>
                    <td className="px-6 py-4">{categorie.description}</td>
                    <td className="px-6 py-4">{categorie.id}</td>

                    <td className="px-6 py-4">
                      <a href="#" className="px-2">
                        <img
                          src="src/assets/images/edit-crud.png"
                          className="flex w-8"
                        ></img>
                      </a>
                      <a href="#" className="px-2">
                        <img
                          src="src/assets/images/delete-crud.png"
                          className="flex w-8"
                        ></img>
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
  if (TagTabOpen) {
    return (
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right text-black  ">
            <thead className="text-xs text-black uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 ">
                  Tag
                </th>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {arrayTags.map((tag: Tag) => {
                return (
                  <tr
                    className="odd:bg-white even:bg-gray-200 border-b  border-gray-200"
                    key={tag.id}
                  >
                    <td className="px-6 py-4  ">{tag.title}</td>

                    <td className="px-6 py-4">{tag.id}</td>

                    <td className="px-6 py-4">
                      <a href="#" className=" px-2">
                        <img
                          src="src/assets/images/edit-crud.png"
                          className="flex w-8"
                        ></img>
                      </a>
                      <a href="#" className="px-2">
                        <img
                          src="src/assets/images/delete-crud.png"
                          className="flex w-8"
                        ></img>
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
}

export default Table;
