import React, { useContext, useEffect, useState } from "react";
import type {
  Category,
  Products,
  Tag,
  ProdFormFields,
  CatFormFields,
} from "../../api/interfaces/interfaces";
import AddButton from "./AddButton";
import { CrudContext } from "../../context/CrudContext";
import DeleteWarning from "./DeleteWarning";
import { useForm, type SubmitHandler } from "react-hook-form";
import Loading from "../Loading";
import { PaginationContext } from "../../context/PaginationContext";
import Pagination from "../Pagination";

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

  const {
    register: registerProd,
    handleSubmit: prodHandleSubmit,
    reset: resetProd,
  } = useForm<ProdFormFields>();
  const onProdCreateSubmit: SubmitHandler<ProdFormFields> = (product) => {
    const parsedProduct = {
      ...product,
      price: Number(product.price),
      category_id: Number(product.category_id),
      /* tag_ids: product.tag_ids?.map((tag) => Number(tag)) ?? [], */

      tag_ids: product.tag_ids ? product.tag_ids.map((tag) => Number(tag)) : [],
    };

    uploadProduct(parsedProduct);
  };

  const onProdEditSubmit: SubmitHandler<ProdFormFields> = (product) => {
    const rawTags = product.tag_ids ?? product["tag_ids"] ?? [];
    const parsedProduct = {
      ...product,
      price: Number(product.price),
      category_id: Number(product.category_id),
      tag_ids: Array.isArray(rawTags)
        ? rawTags.map((t) => Number(t))
        : [Number(rawTags)],
    };

    updateProduct(parsedProduct);
  };

  {
    /* metodos de react hook form para la carga de categorias */
  }

  const {
    register: registerCat,
    handleSubmit: catHandleSubmit,
    reset: resetCat,
  } = useForm<CatFormFields>();
  const onCatCreateSubmit: SubmitHandler<CatFormFields> = (category) => {
    /* const parsedCategory = {
      ...product,
    }; */

    uploadCategory(category);
  };

  const onCatEditSubmit: SubmitHandler<CatFormFields> = (category) => {
    /*  const parsedCategory = {
      ...product,
    };
 */
    updateCategory(category);
  };

  {
    /* metodos de react hook form para la carga de tags */
  }

  const {
    register: registerTag,
    handleSubmit: tagHandleSubmit,
    reset: resetTag,
  } = useForm<CatFormFields>();
  const onTagCreateSubmit: SubmitHandler<CatFormFields> = (tag) => {
    /* const parsedCategory = {
      ...product,
    }; */

    uploadTag(tag);
  };

  const onTagEditSubmit: SubmitHandler<CatFormFields> = (tag) => {
    /*  const parsedCategory = {
      ...product,
    };
 */
    updateTag(tag);
  };

  function handleEditProd(id: number) {
    resetProd();
    setEditingProd(id);
  }

  function handleEditCat(id: number) {
    resetCat();
    setEditingCat(id);
  }

  function handleEditTag(id: number) {
    resetTag();
    setEditingTag(id);
  }

  function handleCancelEdit() {
    resetProd();
    resetCat();
    resetTag();
    setEditingCat(0);
    setEditingProd(0);
    setEditingTag(0);
  }

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
    updateTag,
    uploadTag,
  } = useContext(CrudContext);

  const { pagination } = useContext(PaginationContext);
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
        const res = await fetch(
          `http://161.35.104.211:8000/products/${pagination}`,
          {
            headers: {
              accept: "application/json",
              Authorization: "Bearer jeremias01",
            },
          }
        );

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
  }, [editingProd, editingCat, editingTag, pagination]);

  {
    /*empieza el render del componente tabla*/
  }

  {
    /*tabla productos*/
  }
  if (arrayProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loading></Loading>
      </div>
    );
  }
  if (ProductTabOpen)
    return (
      <div className="  ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right text-black  ">
            <thead className="text-xs text-black uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3 ">
                  Producto
                </th>
                <th scope="col" className="px-6 py-3  ">
                  Descripción
                </th>
                <th scope="col" className="px-6 py-3">
                  Imagen
                </th>
                <th scope="col" className="px-6 py-3 ">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Tag
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Categoría
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Precio
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Acciones
                </th>
              </tr>
            </thead>
            {/* si se quiere agregar un producto*/}
            <tbody>
              {isAddingProd && (
                <tr className="">
                  <td className="px-6 py-4  ">
                    <label className="block mb-2.5 text-sm font-medium text-heading">
                      Nombre:
                    </label>
                    <input
                      className=" border border-black rounded-sm"
                      type="text"
                      {...registerProd("title")}
                    ></input>
                  </td>
                  <td className="px-6 py-4 ">
                    <label className="block mb-2.5 text-sm font-medium text-heading">
                      Breve Descripción:
                    </label>
                    <textarea
                      className="border border-black resize-none rounded-sm"
                      rows={2}
                      cols={25}
                      {...registerProd("description")}
                    ></textarea>
                  </td>
                  <td className="px-6 py-4">
                    <label className="block mb-2.5 text-sm font-medium text-heading">
                      Cargar archivo
                    </label>{" "}
                    <input
                      className="border  border-black rounded-sm w-40"
                      type="file"
                      {...registerProd("image")}
                    ></input>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <p>ID automatico</p>
                  </td>
                  <td className="px-6 py-4 flex flex-col  ">
                    {arrayTags.map((tag: Tag) => {
                      return (
                        <div key={tag.id}>
                          <input
                            type="checkbox"
                            id={`tag_${tag.id}`}
                            value={tag.id}
                            {...registerProd("tag_ids")}
                          ></input>
                          <label htmlFor={`tag_${tag.id}`}>{tag.title}</label>
                        </div>
                      );
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <select id="categories" {...registerProd("category_id")}>
                      {arrayCategories.map((cat: Category) => {
                        return (
                          <option defaultValue={44} value={cat.id} key={cat.id}>
                            {cat.title}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td className="px-6 py-4 ">
                    <label className="block mb-2.5 text-sm font-medium text-heading">
                      Valor:
                    </label>
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
                    <tr key={product.id}>
                      <td className="px-6 py-4 ">
                        <label className="block mb-2.5 text-sm font-medium text-heading">
                          Nombre
                        </label>
                        <input
                          className=" border border-black rounded-sm"
                          type="text"
                          defaultValue={product.title}
                          {...registerProd("title")}
                        ></input>
                      </td>
                      <td className="px-6 py-4 ">
                        <label className="block mb-2.5 text-sm font-medium text-heading">
                          Breve Descripcion
                        </label>
                        <textarea
                          className="border border-black resize-none rounded-sm"
                          rows={2}
                          cols={25}
                          defaultValue={product.description}
                          {...registerProd("description")}
                        ></textarea>
                      </td>
                      <td className="px-6 py-4">
                        <label className="block mb-2.5 text-sm text-gray-400 font-medium ">
                          No es posible editar la imagen
                        </label>
                        {/* <input
                          className="cursor-pointer bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block shadow-xs placeholder:text-body w-40"
                          type="file"
                          {...registerProd("image")}
                        ></input> */}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        <input
                          className=" text-gray-400 rounded-sm"
                          type="number"
                          disabled={true}
                          defaultValue={product.id}
                          {...registerProd("id")}
                        ></input>
                      </td>
                      <td className="px-6 py-4 flex flex-col">
                        {arrayTags.map((tag: Tag) => {
                          return (
                            <div key={tag.id}>
                              <input
                                type="checkbox"
                                value={tag.id}
                                {...registerProd("tag_ids")}
                                checked={product.tags?.some(
                                  (t) => t.id === tag.id
                                )}
                                onChange={() => {}}
                              />

                              <label htmlFor={`tag_${tag.id}`}>
                                {tag.title}
                              </label>
                            </div>
                          );
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          id="categories"
                          {...registerProd("category_id")}
                          defaultValue={product.category_id}
                        >
                          {arrayCategories.map((cat: Category) => {
                            return (
                              <option value={cat.id} key={cat.id}>
                                {cat.title}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td className="px-6 py-4 ">
                        <label className="block mb-2.5 text-sm font-medium text-heading">
                          Valor:
                        </label>
                        <input
                          className="border  border-black rounded-sm"
                          type="number"
                          defaultValue={product.price}
                          {...registerProd("price")}
                        ></input>
                      </td>
                      <td className="px-6 py-4 ">
                        <button className="px-2 cursor-pointer">
                          <img
                            src="src\assets\images\upload-crud.png"
                            className="flex w-8"
                            onClick={prodHandleSubmit(onProdEditSubmit)}
                          ></img>
                        </button>
                        <button
                          className="px-2 cursor-pointer"
                          onClick={() => handleCancelEdit()}
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
                    <td className="px-6 py-4  w-12">{product.title}</td>
                    <td className="px-6 py-4  w-50">{product.description}</td>
                    <td className="px-6 py-4 w-50">
                      <img
                        src={`http://161.35.104.211:8000${product.pictures[0]}`}
                        className="object-contain rounded-lg h-28 w-28 m-auto"
                      />
                    </td>
                    <td className="px-6 py-4 w-10">{product.id}</td>
                    <td className="px-6 py-4 w-12 ">
                      {product.tags?.map((tag) => (
                        <p
                          className={`py-2 font-bold ${
                            tag.id === 25
                              ? " text-green-500"
                              : tag.id === 24
                              ? " text-orange-500"
                              : "text-blue-500"
                          }`}
                          key={tag.id}
                        >
                          {tag.title}
                        </p>
                      ))}
                    </td>
                    <td className="px-6 py-4 w-12">
                      {arrayCategories.map((cat) =>
                        cat.id === product.category_id ? (
                          <p key={cat.id}> {cat.title}</p>
                        ) : (
                          ""
                        )
                      )}
                      <p></p>
                    </td>
                    <td className="px-6 py-4 w-10 ">${product.price * 1000}</td>
                    <td className="px-6 py-4 w-12">
                      <button className="px-2 cursor-pointer">
                        <img
                          src="src/assets/images/edit-crud.png"
                          className="w-8 h-8 object-contain"
                          onClick={
                            /* () => setEditingProd(product.id) */
                            () => handleEditProd(product.id)
                          }
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
                          className="w-8 h-8 object-contain"
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
        <Pagination></Pagination>
      </div>
    );

  {
    /*si se quiere agregar una categoria*/
  }
  if (CategorieTabOpen)
    return (
      <div className="">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-black whitespace-normal">
            <thead className="text-xs text-black uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 ">
                  Categoría
                </th>
                <th scope="col" className="px-6 py-3">
                  Descripción
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
                    <label className="block mb-2.5 text-sm font-medium text-heading">
                      Nombre:
                    </label>
                    <input
                      className=" border border-black"
                      type="text"
                      {...registerCat("title")}
                    ></input>
                  </td>
                  <td className="px-6 py-4 ">
                    <label className="block mb-2.5 text-sm font-medium text-heading">
                      Breve Descripción:
                    </label>
                    <textarea
                      className="border border-black resize-none rounded-sm"
                      rows={2}
                      cols={25}
                      {...registerCat("description")}
                    ></textarea>
                  </td>
                  <td className="px-6 py-4">
                    <label className="block mb-2.5 text-sm font-medium text-heading">
                      Cargar archivo
                    </label>
                    <input
                      className="border w-40 border-black"
                      type="file"
                      {...registerCat("image")}
                    ></input>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <p>ID automatico</p>
                  </td>
                  <td className="px-6 py-4 ">
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
                    <tr key={categorie.id}>
                      <td className="px-6 py-4 ">
                        <label className="block mb-2.5 text-sm font-medium text-heading">
                          Nombre:
                        </label>{" "}
                        <input
                          className=" border border-black"
                          type="text"
                          defaultValue={categorie.title}
                          {...registerCat("title")}
                        ></input>
                      </td>
                      <td className="px-6 py-4 ">
                        <label className="block mb-2.5 text-sm font-medium text-heading">
                          Breve Descripción:
                        </label>
                        <textarea
                          className="border border-black resize-none rounded-sm"
                          rows={2}
                          cols={25}
                          defaultValue={categorie.description}
                          {...registerCat("description")}
                        ></textarea>
                      </td>
                      <td className="px-6 py-4">
                        <label className="block mb-2.5 text-sm text-gray-400 font-medium ">
                          No es posible editar la imagen
                        </label>
                        {/*  <input
                          className="border w-40  border-black"
                          type="file"
                          {...registerCat("image")}
                        ></input> */}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        <input
                          className="  text-gray-400 rounded-sm"
                          type="number"
                          disabled={true}
                          defaultValue={categorie.id}
                          {...registerCat("id")}
                        ></input>
                      </td>
                      <td className="px-6 py-4 ">
                        <button className="px-2 cursor-pointer">
                          <img
                            src="src\assets\images\upload-crud.png"
                            className="flex w-8"
                            onClick={catHandleSubmit(onCatEditSubmit)}
                          ></img>
                        </button>
                        <button
                          className="px-2 cursor-pointer"
                          onClick={() => handleCancelEdit()}
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
                    <td className="px-6 py-4 w-12">{categorie.title}</td>
                    <td className="px-6 py-4 w-30">{categorie.description}</td>
                    <td className="px-6 py-4 w-30">
                      <img
                        src={`http://161.35.104.211:8000${categorie.picture}`}
                        className="object-contain  h-28 w-28 m-auto"
                      />
                    </td>

                    <td className="px-6 py-4 w-10">{categorie.id}</td>

                    <td className="px-6 py-4 w-10">
                      <button className="px-2">
                        <img
                          src="src/assets/images/edit-crud.png"
                          className="w-8 h-8 object-contain"
                          onClick={() => handleEditCat(categorie.id)}
                        ></img>
                      </button>
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
                          className="w-8 h-8 object-contain"
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
      <div className=" md:mx-40 ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg  ">
          <table className="w-full text-sm text-left rtl:text-right text-black ">
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
                    <label className="block mb-2.5 text-sm font-medium text-heading">
                      Nombre:
                    </label>
                    <input
                      className=" border border-black"
                      type="text"
                      {...registerTag("title")}
                    ></input>
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    <p>ID automatico</p>
                  </td>
                  <td className="px-6 py-4 ">
                    <button className="px-2 cursor-pointer">
                      <img
                        src="src\assets\images\upload-crud.png"
                        className="flex w-8"
                        onClick={tagHandleSubmit(onTagCreateSubmit)}
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
                    <tr key={tag.id}>
                      <td className="px-6 py-4 ">
                        <label className="block mb-2.5 text-sm font-medium text-heading">
                          Nombre:
                        </label>
                        <input
                          className=" border border-black"
                          type="text"
                          defaultValue={tag.title}
                          {...registerTag("title")}
                        ></input>
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        <input
                          className="   text-gray-400 rounded-sm"
                          type="number"
                          disabled={true}
                          defaultValue={tag.id}
                          {...registerTag("id")}
                        ></input>
                      </td>
                      <td className="px-6 py-4 ">
                        <button className="px-2 cursor-pointer">
                          <img
                            src="src\assets\images\upload-crud.png"
                            className="flex w-8"
                            onClick={tagHandleSubmit(onTagEditSubmit)}
                          ></img>
                        </button>
                        <button
                          className="px-2 cursor-pointer"
                          onClick={() => handleCancelEdit()}
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
                    <td className="px-6 py-4 w-12 ">{tag.title}</td>

                    <td className="px-6 py-4 w-12">{tag.id}</td>

                    <td className="px-6 py-4 w-12">
                      <button className=" px-2">
                        <img
                          src="src/assets/images/edit-crud.png"
                          className="w-8 h-8 object-contain"
                          onClick={() => handleEditTag(tag.id)}
                        ></img>
                      </button>
                      <button
                        className=" px-2 cursor-pointer"
                        onClick={() =>
                          handleDeleteModal({
                            type: "tag",
                            title: tag.title,
                            id: tag.id,
                          })
                        }
                      >
                        <img
                          src="src/assets/images/delete-crud.png"
                          className="w-8 h-8 object-contain"
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
  }
}

export default Table;
