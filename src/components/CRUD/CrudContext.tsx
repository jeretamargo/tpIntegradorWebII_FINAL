import React, {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import DeleteWarning from "./DeleteWarning";
import type {
  CatFormFields,
  ProdFormFields,
  Product,
  SelectedItem,
  TagFormFields,
} from "../../api/interfaces/interfaces";

import { fetchProducts } from "../../api/fetch/products";
import { getCategories } from "../../api/fetch/categories";

interface CrudContextProps {
  ProductTabOpen: boolean;
  CategorieTabOpen: boolean;
  TagTabOpen: boolean;
  selectedItem: SelectedItem;
  isWarningOpen: boolean;
  isAddingProd: boolean;
  isAddingCat: boolean;
  isAddingTag: boolean;
  editingProd: number;
  editingCat: number;
  editingTag: number;
  setIsAddingProd: (state: boolean) => void;
  setIsAddingCat: (state: boolean) => void;
  setIsAddingTag: (state: boolean) => void;
  setEditingProd: (product: number) => void;
  setEditingCat: (categorie: number) => void;
  setEditingTag: (tag: number) => void;
  uploadProduct: (product: ProdFormFields) => void;
  updateProduct: (product: ProdFormFields) => void;
  deleteProduct: (id: number) => void;
  uploadCategory: (product: CatFormFields) => void;
  updateCategory: (product: CatFormFields) => void;
  deleteCategory: (id: number) => void;
  uploadTag: (tag: TagFormFields) => void;
  updateTag: (tag: TagFormFields) => void;
  deleteTag: (id: number) => void;
  handleDeleteModal: (product: SelectedItem) => void;
  setIsWarningOpen: (value: boolean) => void;
  setSelectedItem: (product: SelectedItem) => void;
  ToggleTab: (value: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CrudContext = createContext({} as CrudContextProps);

function CrudProvider({ children }: PropsWithChildren) {
  function ToggleTab(value: string) {
    switch (value) {
      case "Product":
        setProductTabOpen(true);
        setCategorieTabOpen(false);
        setTagTabOpen(false);
        break;
      case "Categorie":
        setProductTabOpen(false);
        setCategorieTabOpen(true);
        setTagTabOpen(false);
        break;
      case "Tag":
        setProductTabOpen(false);
        setCategorieTabOpen(false);
        setTagTabOpen(true);
        break;
    }
  }

  {
    /* ACCIONES HTTP PARA PRODUCTOS */
  }

  async function uploadProduct(product: ProdFormFields) {
    const data = await fetch(`https://ecommerce.fedegonzalez.com/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer jeremias01",
      },
      body: JSON.stringify({
        title: product.title,
        description: product.description,
        price: product.price,
        category_id: product.category_id,
        tag_ids: product.tag_ids,
      }),
    });
    const response = await data.json();
    console.log(response);
    console.log(product.image);

    const prods = await fetchProducts();
    const filteredProd = prods.find((p) => p.id === response.id);

    const fileData = new FormData();
    fileData.append("files", product.image[0]);

    const image_data = await fetch(
      `https://ecommerce.fedegonzalez.com/products/${filteredProd.id}/pictures`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer jeremias01",
        },
        body: fileData,
      }
    );
    const image_response = await image_data.json();
    console.log(image_response);
    window.location.reload();
  }

  async function updateProduct(product: ProdFormFields) {
    const response = await fetch(
      `https://ecommerce.fedegonzalez.com/products/${product.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer jeremias01",
        },
        body: JSON.stringify({
          title: product.title,
          description: product.description,
          price: product.price,
          category_id: product.category_id,
          tag_ids: product.tag_ids,
        }),
      }
    ).then((res) => res.json);

    /*  if (product.image) {
      const prods = await fetchProducts();
      const filteredProd = prods.find((p) => p.id === response.id);

      const fileData = new FormData();
      fileData.append("files", product.image[0]);

      await fetch(
        `https://ecommerce.fedegonzalez.com/products/${product.id}/pictures`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer jeremias01",
          },
          body: fileData,
        }
      ).then((data) => console.log(data.status));
    } */
    window.location.reload();
  }

  async function deleteProduct(id: number) {
    await fetch(`https://ecommerce.fedegonzalez.com/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer jeremias01",
      },
    }).then((data) => console.log(data.status));
    window.location.reload();
  }

  {
    /* ACCIONES HTTP PARA CATEGORIAS */
  }

  async function uploadCategory(categorie: CatFormFields) {
    const data = await fetch(`https://ecommerce.fedegonzalez.com/categories/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer jeremias01",
      },
      body: JSON.stringify({
        title: categorie.title,
        description: categorie.description,
      }),
    });
    const response = await data.json();
    console.log(response);
    console.log(categorie.image);

    const cats = await getCategories();
    const filteredCat = cats.find((c) => c.id === response.id);

    const fileData = new FormData();
    fileData.append("file", categorie.image[0]);

    const image_data = await fetch(
      `https://ecommerce.fedegonzalez.com/categories/${filteredCat.id}/picture`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer jeremias01",
        },
        body: fileData,
      }
    );
    const image_response = await image_data.json();
    console.log(image_response);
    window.location.reload();
  }

  async function updateCategory(categorie: CatFormFields) {
    const response = await fetch(
      `https://ecommerce.fedegonzalez.com/categories/${categorie.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer jeremias01",
        },
        body: JSON.stringify({
          title: categorie.title,
          description: categorie.description,
        }),
      }
    ).then((res) => res.json);

    /*  if (categorie.image) {
      const cats = await getCategories();
      const filteredCat = cats.find((p) => p.id === response.id);

      const fileData = new FormData();
    
      fileData.append("files", categorie.image[0]);
     

      await fetch(
        `https://ecommerce.fedegonzalez.com/categories/${filteredCat.id}/picture`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer jeremias01",
            "Content-Type": "multipart/form-data",
          },
          body: fileData,
        }
      ).then((data) => console.log(data.status));
    } */
    window.location.reload();
  }

  async function deleteCategory(id: number) {
    await fetch(`https://ecommerce.fedegonzalez.com/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer jeremias01",
      },
    }).then((data) => console.log(data.status));
    window.location.reload();
  }

  {
    /* ACCIONES HTTP PARA TAGS */
  }
  async function uploadTag(tag: TagFormFields) {
    const data = await fetch(`https://ecommerce.fedegonzalez.com/tags/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer jeremias01",
      },
      body: JSON.stringify({
        title: tag.title,
      }),
    });
    const response = await data.json();
    console.log(response);
    window.location.reload();
  }
  async function updateTag(tag: TagFormFields) {
    const data = await fetch(
      `https://ecommerce.fedegonzalez.com/tags/${tag.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer jeremias01",
        },
        body: JSON.stringify({
          title: tag.title,
        }),
      }
    );
    const response = await data.json();
    console.log(response);
    window.location.reload();
  }

  async function deleteTag(id: number) {
    await fetch(`https://ecommerce.fedegonzalez.com/tags/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer jeremias01",
      },
    }).then((data) => console.log(data.status));
    window.location.reload();
  }

  function handleDeleteModal(product: SelectedItem) {
    setIsWarningOpen(true);
    setSelectedItem(product);
  }

  const [ProductTabOpen, setProductTabOpen] = useState(true);
  const [CategorieTabOpen, setCategorieTabOpen] = useState(false);
  const [TagTabOpen, setTagTabOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isAddingProd, setIsAddingProd] = useState(false);
  const [isAddingCat, setIsAddingCat] = useState(false);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [editingProd, setEditingProd] = useState(0);
  const [editingCat, setEditingCat] = useState(0);
  const [editingTag, setEditingTag] = useState(0);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    type: "",
    title: "",
    id: 0,
  });

  return (
    <div>
      <CrudContext
        value={{
          selectedItem: selectedItem,
          ProductTabOpen: ProductTabOpen,
          CategorieTabOpen: CategorieTabOpen,
          TagTabOpen: TagTabOpen,
          isWarningOpen: isWarningOpen,
          isAddingProd: isAddingProd,
          isAddingCat: isAddingCat,
          isAddingTag: isAddingTag,
          editingProd: editingProd,
          editingCat: editingCat,
          editingTag: editingTag,
          setEditingProd: setEditingProd,
          setEditingCat: setEditingCat,
          setEditingTag: setEditingTag,
          setIsAddingProd: setIsAddingProd,
          setIsAddingCat: setIsAddingCat,
          setIsAddingTag: setIsAddingTag,
          setIsWarningOpen: setIsWarningOpen,
          ToggleTab: ToggleTab,
          setSelectedItem: setSelectedItem,
          handleDeleteModal: handleDeleteModal,
          deleteProduct: deleteProduct,
          uploadProduct: uploadProduct,
          updateProduct: updateProduct,
          uploadCategory: uploadCategory,
          updateCategory: updateCategory,
          deleteCategory: deleteCategory,
          uploadTag: uploadTag,
          updateTag: updateTag,
          deleteTag: deleteTag,
        }}
      >
        {children}
      </CrudContext>
    </div>
  );
}

export default CrudProvider;
