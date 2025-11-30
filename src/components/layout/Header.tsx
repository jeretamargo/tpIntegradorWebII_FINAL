import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-nuevo.png";
import cartIcon from "../../assets/images/carro.png";
import type { Category } from "../../api/interfaces/interfaces";
import CategoriesList from "../CategoriesList";
import { CartContext } from "../../context/CartContext";
import { SearchContext } from "../../context/SearchContext";

interface Props {
  categories: Category[];
}

function Header({ categories }: Props) {
  const { totalQuantity, toggleCart } = useContext(CartContext);
  const [showCategories, setShowCategories] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
   const { searchText, setSearchText } = useContext(SearchContext);

  return (
    <header className="bg-gray-200 sticky top-0 z-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex-1 md:flex md:items-center md:gap-12 max-h-20 items-center">
            <Link to="/">
              <span className="sr-only">Home</span>
              <img src={logo} className="max-h-20 max-w-48" alt="Logo" />
            </Link>
          </div>
          {/* Barra de búsqueda desktop */}
<div className="hidden md:block md:flex-1 md:mx-4">
  <input
    type="text"
    placeholder="Buscar productos..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
  />
</div>
          {/* Menú + Carrito */}
          <div className="flex items-center gap-4">
           
           {/* Categorías (desktop) */}
<div className="hidden md:relative md:block">
  <button
    type="button"
    className="overflow-hidden px-3 py-2 text-sm font-medium text-gray-900 transition-colors cursor-pointer focus:relative"
    onClick={() => setShowCategories(!showCategories)}
  >
    <span className="sr-only">Toggle dashboard menu</span>
    Categorías
  </button>

  {showCategories && (
    <div
      className="absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
      role="menu"
    >
      <div className="p-2">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/list?cat=${cat.id}`}
            onClick={() => setShowCategories(false)} // cierra el menú al hacer click
            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            {cat.title}
          </Link>
        ))}
      </div>
    </div>
  )}
</div>

            {/* Botón hamburguesa (mobile) */}
            <div className="block md:hidden">
              <button
                className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Carrito */}
            <button className="relative cursor-pointer" onClick={toggleCart}>
              <img src={cartIcon} alt="Cart" className="w-8 cursor-pointer" />
              <span className="text-center absolute bottom-0 right-0 z-10 bg-red-600/90 rounded-full h-5 w-5 text-white text-xs flex items-center justify-center">
                {totalQuantity}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Menú mobile desplegable */}
{showMobileMenu && (
  <div className="absolute left-0 right-0 top-16 z-20 bg-gray-200 border-t border-gray-200 shadow-md">
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
       <header>
        <h2 className="text-xl text-center py-4 font-bold text-gray-900 sm:text-2xl">
          Buscá por categorías!
        </h2>
      </header>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center">
        {categories.map((cat) => (
          <li key={cat.id} className="w-full flex justify-center">
            <Link
              to={`/list?cat=${cat.id}`}
              onClick={() => setShowMobileMenu(false)} // cierra el menú
              className="inline-block w-full text-center rounded-sm bg-[#2892d7] px-4 py-2 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
            >
              {cat.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}
    </header>
  );
}

export default Header;