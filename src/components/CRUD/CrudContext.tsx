import React, {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import DeleteWarning from "./DeleteWarning";
import type { SelectedProduct } from "../../api/interfaces/interfaces";
import { useNavigate } from "react-router";

interface CrudContextProps {
  ProductTabOpen: boolean;
  CategorieTabOpen: boolean;
  TagTabOpen: boolean;
  selectedProduct: SelectedProduct;
  isWarningOpen: boolean;
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

  async function deleteProduct(id: number) {
    await fetch(`http://161.35.104.211:8000/products/${id}`, {
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
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct>({
    title: "",
    id: 0,
  });
  const navigate = useNavigate();

  return (
    <div>
      <CrudContext
        value={{
          selectedProduct: selectedProduct,
          ProductTabOpen: ProductTabOpen,
          CategorieTabOpen: CategorieTabOpen,
          TagTabOpen: TagTabOpen,
          isWarningOpen: isWarningOpen,
          setIsWarningOpen: setIsWarningOpen,
          ToggleTab: ToggleTab,
          setSelectedProduct: setSelectedProduct,
          handleDeleteModal: handleDeleteModal,
          deleteProduct: deleteProduct,
        }}
      >
        {children}
      </CrudContext>
    </div>
  );
}

export default CrudProvider;
