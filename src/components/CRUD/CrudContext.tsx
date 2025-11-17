import React, {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import DeleteWarning from "./DeleteWarning";
import type {
  ProdFormFields,
  Product,
  SelectedProduct,
} from "../../api/interfaces/interfaces";

import { fetchProducts } from "../../api/fetch/products";

interface CrudContextProps {
  ProductTabOpen: boolean;
  CategorieTabOpen: boolean;
  TagTabOpen: boolean;
  selectedProduct: SelectedProduct;
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
  deleteProduct: (id: number) => void;
  handleDeleteModal: (product: SelectedProduct) => void;
  setIsWarningOpen: (value: boolean) => void;
  setSelectedProduct: (product: SelectedProduct) => void;
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
    await fetch(`https://ecommerce.fedegonzalez.com/products/`, {
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
    }).then((data) => console.log(data.status));
    console.log(
      JSON.stringify({
        title: product.title,
        description: product.description,
        price: product.price,
        category_id: product.category_id,
        tag_ids: product.tag_ids,
      })
    );
    const prods = await fetchProducts();
    const filteredProd = prods.find((p) => p.title === product.title);

    const fileData = new FormData();
    fileData.append("files", product.image[0]);

    await fetch(
      `https://ecommerce.fedegonzalez.com/products/${filteredProd.id}/pictures`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer jeremias01",
        },
        body: fileData,
      }
    ).then((data) => console.log(data.status));
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

  function handleDeleteModal(product: SelectedProduct) {
    setIsWarningOpen(true);
    setSelectedProduct(product);
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
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct>({
    title: "",
    id: 0,
  });

  return (
    <div>
      <CrudContext
        value={{
          selectedProduct: selectedProduct,
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
          setSelectedProduct: setSelectedProduct,
          handleDeleteModal: handleDeleteModal,
          deleteProduct: deleteProduct,
          uploadProduct: uploadProduct,
        }}
      >
        {children}
      </CrudContext>
    </div>
  );
}

export default CrudProvider;
