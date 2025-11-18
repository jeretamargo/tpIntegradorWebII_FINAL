import React, { useContext, useEffect, useState } from "react";
import type {
  Category,
  Products,
  Tag,
  ProdFormFields,
  CatFormFields,
} from "../../api/interfaces/interfaces";
import AddButton from "./AddButton";
import { CrudContext } from "./CrudContext";
import DeleteWarning from "./DeleteWarning";
import { useForm, type SubmitHandler } from "react-hook-form";

{
  /*este codigo es un quilombo barbaro*/
}

function Table() {
  const [arrayProducts, setProducts] = useState<Products[]>([]);
  const [arrayTags, setTags] = useState<Tag[]>([]);
  const [arrayCategories, setCategories] = useState<Category[]>([]);

  {
    /* metodos de react hook form para la carga de productos */
  }

  const { register: registerProd, handleSubmit: prodHandleSubmit } =
    useForm<ProdFormFields>();
  const onProdCreateSubmit: SubmitHandler<ProdFormFields> = (product) => {
    const parsedProduct = {
      ...product,
      price: Number(product.price),
      category_id: Number(product.category_id),
      /* tag_ids: product.tag_ids?.map((tag) => Number(tag)) ?? [], */

      tag_ids: product.tag_ids
        ? product.tag_ids?.map((tag) => Number(tag))
        : [],
    };

    uploadProduct(parsedProduct);
  };

  const onProdEditSubmit: SubmitHandler<ProdFormFields> = (product) => {
    const parsedProduct = {
      ...product,
      price: Number(product.price),
      category_id: Number(product.category_id),
      tag_ids: product.tag_ids
        ? product.tag_ids?.map((tag) => Number(tag))
        : [],
    };

    updateProduct(parsedProduct);
  };

  {
    /* metodos de react hook form para la carga de categorias */
  }

  const { register: registerCat, handleSubmit: catHandleSubmit } =
    useForm<CatFormFields>();
  const onCatCreateSubmit: SubmitHandler<CatFormFields> = (category) => {
    /* const parsedCategory = {
      ...product,
    }; */

    uploadCategory(category);
  };

  const onCatEditSubmit: SubmitHandler<CatFormFields> = (product) => {
    /*  const parsedCategory = {
      ...product,
    };
 */
    updateCategory(product);
  };

  {
    /*funciones y variables globales del context*/
  }

  const {
    ProductTabOpen,
    CategorieTabOpen,
    TagTabOpen,
    setIsWarningOpen,
    handleDeleteModal,
    isAddingProd,
    isAddingCat,
    isAddingTag,
    setIsAddingProd,
    setIsAddingCat,
    setIsAddingTag,
    editingProd,
    editingCat,
    editingTag,
    setEditingProd,
    setEditingCat,
    setEditingTag,
    uploadProduct,
    updateProduct,
    uploadCategory,
    updateCategory,
    deleteCategory,
  } = useContext(CrudContext);

  {
    /*fetchs*/
  }

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

  {
    /*empieza el render del componente tabla*/
  }

  {
    /*tabla productos*/
  }

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
                <th scope="col" className="px-6 py-3 ">
                  Descripción
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
            {/* si se quiere agregar un producto*/}
            <tbody>
              {isAddingProd && (
                <tr className="">
                  <td className="px-6 py-4 ">
                    {" "}
                    <label className="block">Nombre: </label>
                    <input
                      className=" border border-black rounded-sm"
                      type="text"
                      {...registerProd("title")}
                    ></input>
                  </td>
                  <td className="px-6 py-4 ">
                    <label className="block">Breve descripcion: </label>
                    <textarea
                      className="border border-black resize-none rounded-sm"
                      rows={2}
                      cols={25}
                      {...registerProd("description")}
                    ></textarea>
                  </td>
                  <td className="px-6 py-4">
                    {" "}
                    <input
                      className="border  border-black rounded-sm"
                      type="file"
                      {...registerProd("image")}
                    ></input>
                  </td>{" "}
                  <td className="px-6 py-4 text-gray-500">
                    <p>ID automatico</p>
                  </td>
                  <td className="px-6 py-4 flex flex-col">
                    {" "}
                    {arrayTags.map((tag: Tag) => {
                      return (
                        <div>
                          <input
                            type="checkbox"
                            id={tag.title}
                            value={tag.id}
                            {...registerProd("tag_ids")}
                          ></input>
                          <label form="vehicle1"> {tag.title}</label>
                        </div>
                      );
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <select id="categories" {...registerProd("category_id")}>
                      {arrayCategories.map((cat: Category) => {
                        return (
                          <option defaultValue={44} value={cat.id}>
                            {cat.title}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td className="px-6 py-4 ">
                    <label className="block">Valor:</label>
                    <input
                      className="border  border-black rounded-sm"
                      type="number"
                      {...registerProd("price")}
                    ></input>
                  </td>
                  <td className="px-6 py-4 ">
                    {" "}
                    <button className="px-2 cursor-pointer">
                      <img
                        src="src\assets\images\upload-crud.png"
                        className="flex w-8"
                        onClick={prodHandleSubmit(onProdCreateSubmit)}
                      ></img>
                    </button>
                    <button
                      className="px-2 cursor-pointer"
                      onClick={() => setIsAddingProd(false)}
                    >
                      <img
                        src="src\assets\images\cancel-crud.png"
                        className="flex w-8"
                      ></img>
                    </button>
                  </td>
                </tr>
              )}
              {/* render condicional si se quiere editar un producto y renderizado de los productos actuales*/}
              {arrayProducts.map((product: Products) => {
                if (editingProd === product.id) {
                  return (
                    <tr className="">
                      <td className="px-6 py-4 ">
                        {" "}
                        <label className="block">Nombre: </label>
                        <input
                          className=" border border-black rounded-sm"
                          type="text"
                          defaultValue={product.title}
                          {...registerProd("title")}
                        ></input>
                      </td>
                      <td className="px-6 py-4 ">
                        <label className="block">Breve descripcion: </label>
                        <textarea
                          className="border border-black resize-none rounded-sm"
                          rows={2}
                          cols={25}
                          defaultValue={product.description}
                          {...registerProd("description")}
                        ></textarea>
                      </td>
                      <td className="px-6 py-4">
                        {" "}
                        <input
                          className="border  border-black rounded-sm"
                          type="file"
                          {...registerProd("image")}
                        ></input>
                      </td>{" "}
                      <td className="px-6 py-4 text-gray-500">
                        <input
                          className=" border border-black  text-gray-400 rounded-sm"
                          type="number"
                          disabled={true}
                          defaultValue={product.id}
                          {...registerProd("id")}
                        ></input>
                      </td>
                      <td className="px-6 py-4 flex flex-col">
                        {" "}
                        {arrayTags.map((tag: Tag) => {
                          return (
                            <div>
                              <input
                                type="checkbox"
                                id={tag.title}
                                value={tag.id}
                                {...registerProd("tag_ids")}
                              ></input>
                              <label form={tag.title}> {tag.title}</label>
                            </div>
                          );
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          id="categories"
                          {...registerProd("category_id")}
                        >
                          {arrayCategories.map((cat: Category) => {
                            return (
                              <option defaultValue={44} value={cat.id}>
                                {cat.title}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td className="px-6 py-4 ">
                        <label className="block">Valor:</label>
                        <input
                          className="border  border-black rounded-sm"
                          type="number"
                          defaultValue={product.price}
                          {...registerProd("price")}
                        ></input>
                      </td>
                      <td className="px-6 py-4 ">
                        {" "}
                        <button className="px-2 cursor-pointer">
                          <img
                            src="src\assets\images\upload-crud.png"
                            className="flex w-8"
                            onClick={prodHandleSubmit(onProdEditSubmit)}
                          ></img>
                        </button>
                        <button
                          className="px-2 cursor-pointer"
                          onClick={() => setEditingProd(0)}
                        >
                          <img
                            src="src\assets\images\cancel-crud.png"
                            className="flex w-8"
                          ></img>
                        </button>
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr
                    className="odd:bg-white even:bg-gray-200 border-b  border-gray-200"
                    key={product.id}
                  >
                    <td className="px-6 py-4  ">{product.title}</td>
                    <td className="px-6 py-4  ">{product.description}</td>
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
                          onClick={() => setEditingProd(product.id)}
                        ></img>
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteModal({
                            type: "product",
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

  {
    /*si se quiere agregar una categoria*/
  }
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
                  Descripcion
                </th>
                <th scope="col" className="px-6 py-3">
                  Imagen
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
              {isAddingCat && (
                <tr className="">
                  <td className="px-6 py-4 ">
                    {" "}
                    <label className="block">Nombre: </label>
                    <input
                      className=" border border-black"
                      type="text"
                      {...registerCat("title")}
                    ></input>
                  </td>
                  <td className="px-6 py-4 ">
                    <label className="block">Breve descripcion: </label>
                    <textarea
                      className="border border-black resize-none rounded-sm"
                      rows={2}
                      cols={25}
                      {...registerCat("description")}
                    ></textarea>
                  </td>
                  <td className="px-6 py-4">
                    {" "}
                    <input
                      className="border  border-black"
                      type="file"
                      {...registerCat("image")}
                    ></input>
                  </td>{" "}
                  <td className="px-6 py-4 text-gray-500">
                    <p>ID automatico</p>
                  </td>
                  <td className="px-6 py-4 ">
                    {" "}
                    <button className="px-2 cursor-pointer">
                      <img
                        src="src\assets\images\upload-crud.png"
                        className="flex w-8"
                        onClick={catHandleSubmit(onCatCreateSubmit)}
                      ></img>
                    </button>
                    <button
                      className="px-2 cursor-pointer"
                      onClick={() => setIsAddingCat(false)}
                    >
                      <img
                        src="src\assets\images\cancel-crud.png"
                        className="flex w-8"
                      ></img>
                    </button>
                  </td>
                </tr>
              )}
              {/* render condicional si se quiere editar una categoria y renderizado de las categorias actuales*/}
              {arrayCategories.map((categorie: Category) => {
                if (editingCat === categorie.id) {
                  return (
                    <tr className="">
                      <td className="px-6 py-4 ">
                        {" "}
                        <label className="block">Nombre: </label>
                        <input
                          className=" border border-black"
                          type="text"
                          value={categorie.title}
                          {...registerCat("title")}
                        ></input>
                      </td>
                      <td className="px-6 py-4 ">
                        <label className="block">Breve descripcion: </label>
                        <textarea
                          className="border border-black resize-none rounded-sm"
                          rows={2}
                          cols={25}
                          value={categorie.description}
                          {...registerCat("description")}
                        ></textarea>
                      </td>
                      <td className="px-6 py-4">
                        {" "}
                        <input
                          className="border  border-black"
                          type="file"
                          {...registerCat("image")}
                        ></input>
                      </td>{" "}
                      <td className="px-6 py-4 text-gray-500">
                        <input
                          className=" border border-black  text-gray-400 rounded-sm"
                          type="number"
                          disabled={true}
                          defaultValue={categorie.id}
                          {...registerCat("id")}
                        ></input>
                      </td>
                      <td className="px-6 py-4 ">
                        {" "}
                        <button className="px-2 cursor-pointer">
                          <img
                            src="src\assets\images\upload-crud.png"
                            className="flex w-8"
                            onClick={catHandleSubmit(onCatEditSubmit)}
                          ></img>
                        </button>
                        <button
                          className="px-2 cursor-pointer"
                          onClick={() => setEditingCat(0)}
                        >
                          <img
                            src="src\assets\images\cancel-crud.png"
                            className="flex w-8"
                          ></img>
                        </button>
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr
                    className="odd:bg-white even:bg-gray-200 border-b  border-gray-200"
                    key={categorie.id}
                  >
                    <td className="px-6 py-4  ">{categorie.title}</td>
                    <td className="px-6 py-4">{categorie.description}</td>
                    <td className="px-6 py-4">
                      <img
                        src={`http://161.35.104.211:8000${categorie.picture}`}
                        className="object-contain max-h-30 max-w-30 min-h-[150px] min-w-[80px] m-auto"
                      />
                    </td>

                    <td className="px-6 py-4">{categorie.id}</td>

                    <td className="px-6 py-4">
                      <a href="#" className="px-2">
                        <img
                          src="src/assets/images/edit-crud.png"
                          className="flex w-8"
                          onClick={() => setEditingCat(categorie.id)}
                        ></img>
                      </a>
                      <button
                        onClick={() =>
                          handleDeleteModal({
                            type: "categorie",
                            title: categorie.title,
                            id: categorie.id,
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
              {isAddingTag && (
                <tr className="">
                  <td className="px-6 py-4 ">
                    {" "}
                    <label className="block">Nombre: </label>
                    <input
                      className=" border border-black"
                      type="text"
                      name="product_name"
                    ></input>
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    <p>ID automatico</p>
                  </td>
                  <td className="px-6 py-4 ">
                    {" "}
                    <button className="px-2 cursor-pointer">
                      <img
                        src="src\assets\images\upload-crud.png"
                        className="flex w-8"
                      ></img>
                    </button>
                    <button
                      className="px-2 cursor-pointer"
                      onClick={() => setIsAddingTag(false)}
                    >
                      <img
                        src="src\assets\images\cancel-crud.png"
                        className="flex w-8"
                      ></img>
                    </button>
                  </td>
                </tr>
              )}
              {arrayTags.map((tag: Tag) => {
                if (editingTag === tag.id) {
                  return (
                    <tr className="">
                      <td className="px-6 py-4 ">
                        {" "}
                        <label className="block">Nombre: </label>
                        <input
                          className=" border border-black"
                          type="text"
                          name="product_name"
                          value={tag.title}
                        ></input>
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        <p>ID automatico</p>
                      </td>
                      <td className="px-6 py-4 ">
                        {" "}
                        <button className="px-2 cursor-pointer">
                          <img
                            src="src\assets\images\upload-crud.png"
                            className="flex w-8"
                          ></img>
                        </button>
                        <button
                          className="px-2 cursor-pointer"
                          onClick={() => setEditingTag(0)}
                        >
                          <img
                            src="src\assets\images\cancel-crud.png"
                            className="flex w-8"
                          ></img>
                        </button>
                      </td>
                    </tr>
                  );
                }
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
                          onClick={() => setEditingTag(tag.id)}
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
