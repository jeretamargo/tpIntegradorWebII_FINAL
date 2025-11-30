import React, {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { CartItem } from "../api/interfaces/interfaces";

interface CartContextProps {
  isOpen: boolean;
  productos: CartItem[];
  totalQuantity: number;
  totalVal: number;
  toggleCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
   openCart: () => void;
  emptyCart: () => void;
}
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext({} as CartContextProps);

export function CartProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [totalVal, setTotalVal] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [productos, setProductos] = useState<CartItem[]>([]);

  useEffect(() => {
    calcTotalVal();
  }, [productos]);

  useEffect(() => {
    setProductos(
      JSON.parse(localStorage.getItem("carrito") || "[]") as CartItem[]
    );
    const cantidad = localStorage.getItem("cant_total");
    setTotalQuantity(cantidad ? parseInt(cantidad) : 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(productos));
    localStorage.setItem("cant_total", totalQuantity.toString());
  }, [productos, totalQuantity]);

  function toggleCart() {
    setIsOpen(!isOpen);
  }
  function openCart() {
  setIsOpen(true);
}
  function addItem(item: CartItem) {
    const existing = productos.find((i) => i.id === item.id);
    if (existing) {
      setProductos(
        productos.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
      setTotalQuantity(totalQuantity + 1);
    } else {
      setProductos([...productos, { ...item, quantity: 1 }]);
      setTotalQuantity(totalQuantity + 1);
    }
    /*  localStorage.setItem("carrito", JSON.stringify(productos));
    localStorage.setItem("cant_total", totalQuantity.toString()); */
  }
  function removeItem(item: CartItem) {
    setProductos(
      productos
        .map((p) => (p.id === item.id ? { ...p, quantity: p.quantity - 1 } : p))
        .filter((p) => p.quantity > 0)
    );

    setTotalQuantity(productos.reduce((acc, i) => acc + i.quantity, 0));

    /*  localStorage.setItem("carrito", JSON.stringify(productos));
    localStorage.setItem("cant_total", totalQuantity.toString()); */
  }
  function emptyCart() {
    setProductos([]);
    setTotalQuantity(0);
    /* localStorage.setItem("carrito", JSON.stringify([]));
    localStorage.setItem("cant_total", "0"); */
  }
  function calcTotalVal() {
    let auxValorTotal: number = 0;
    productos.forEach(
      (p) => (auxValorTotal = auxValorTotal + p.price * p.quantity)
    );
    setTotalVal(auxValorTotal);
  }

  return (
    <CartContext
      value={{
        isOpen: isOpen,
        productos: productos,
        totalQuantity: totalQuantity,
        addItem: addItem,
        removeItem: removeItem,
        emptyCart: emptyCart,
        toggleCart: toggleCart,
        totalVal: totalVal,
         openCart: () => setIsOpen(true),
      }}
    >
      {children}
    </CartContext>
  );
}
