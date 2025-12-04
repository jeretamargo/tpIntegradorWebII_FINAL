import React, {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Products } from "../api/interfaces/interfaces";
import { useLocation } from "react-router";

interface PaginationContextProps {
  pagination: string;
  prodsQuantity: number;
  selectedPage: number;
  setPagination: (text: string) => void;
  getProdsQuantity: () => void;

  changePage: (page: number) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const PaginationContext = createContext({} as PaginationContextProps);

export function PaginationProvider({ children }: PropsWithChildren) {
  const [pagination, setPagination] = useState("?limit=12");
  const [prodsQuantity, setProdsQuantity] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    setSelectedPage(1);
    setPagination("?limit=12");
  }, [location.pathname]);

  function getProdsQuantity() {
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
      .then((products) => setProdsQuantity(products.length / 12 + 1))
      .catch((err) => console.error(err));
  }

  function changePage(page: number) {
    switch (page) {
      case 1:
        setPagination("?limit=12");
        setSelectedPage(1);
        window.scrollTo({ top: 1, behavior: "smooth" });
        break;
      case 2:
        setPagination("?limit=12&skip=12");
        setSelectedPage(2);
        window.scrollTo({ top: 1, behavior: "smooth" });
        break;
      case 3:
        setPagination("?limit=12&skip=24");
        setSelectedPage(3);
        window.scrollTo({ top: 1, behavior: "smooth" });
        break;
      case 4:
        setPagination("?limit=12&skip=36");
        setSelectedPage(4);
        window.scrollTo({ top: 1, behavior: "smooth" });
        break;
      case 5:
        setPagination("?limit=12&skip=48");
        setSelectedPage(5);
        window.scrollTo({ top: 1, behavior: "smooth" });
        break;
    }
  }

  return (
    <div>
      <PaginationContext
        value={{
          pagination,
          prodsQuantity,
          selectedPage,
          setPagination,
          getProdsQuantity,
          changePage,
        }}
      >
        {children}
      </PaginationContext>
    </div>
  );
}
