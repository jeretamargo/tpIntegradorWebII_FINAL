import React, {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { CartContext } from "../../context/CartContext";

interface CrudContextProps {
  ProductTabOpen: boolean;
  CategorieTabOpen: boolean;
  TagTabOpen: boolean;
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

  const [ProductTabOpen, setProductTabOpen] = useState(true);
  const [CategorieTabOpen, setCategorieTabOpen] = useState(false);
  const [TagTabOpen, setTagTabOpen] = useState(false);

  return (
    <div>
      <CrudContext
        value={{
          ProductTabOpen: ProductTabOpen,
          CategorieTabOpen: CategorieTabOpen,
          TagTabOpen: TagTabOpen,
          ToggleTab: ToggleTab,
        }}
      >
        {children}
      </CrudContext>
    </div>
  );
}

export default CrudProvider;
