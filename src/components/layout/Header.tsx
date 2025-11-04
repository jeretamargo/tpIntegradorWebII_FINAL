import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import cartIcon from "../../assets/images/carro.png";
import type { Category } from "../../api/interfaces/interfaces";
interface Props {
  categories: Category[];
}

function Header({ categories }: Props) {
  const [showCategories, setShowCategories] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div>
      <header className="bg-gradient-to-t from-blue-800 via-blue-700 to-blue-50 sticky top-0 z-50">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex-1 md:flex md:items-center md:gap-12 max-h-20 items-center">
              <a href="/">
                <span className="sr-only">Home</span>
                <img src={logo} className="max-h-20 max-w-48" alt="Logo" />
              </a>
            </div>

            {/* Menú + Carrito */}
            <div className="flex items-center gap-4">
              {/* Categorías (desktop) */}
              <div className="hidden md:relative md:block">
                <button
                  type="button"
                  className="overflow-hidden px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 hover:text-gray-700 focus:relative divide-gray-300 rounded border border-gray-300 bg-white shadow-sm"
                  onClick={() => setShowCategories(!showCategories)}
                >
                  <span className="sr-only">Toggle dashboard menu</span>
                  Categorias
                </button>

                {showCategories && (
                  <div
                    className="absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                    role="menu"
                  >
                    <div className="p-2">
                      {categories.map((cat) => (
                        <a
                          key={cat.id}
                          href={`/list?cat=${cat.id}`}
                          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                          role="menuitem"
                        >
                          {cat.title}
                        </a>
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
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>

              {/* Carrito Button (triggers modal) */}
              <button
                className="relative cursor-pointer" /* onClick={onOpenCart} */
              >
                <img src={cartIcon} alt="Cart" className="w-8 cursor-pointer" />
                <span className="text-center absolute bottom-0 right-0 z-10 bg-red-600/90 rounded-full h-5 w-5 text-white text-xs flex items-center justify-center">
                  {/* {cartCount} */}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Menú mobile desplegable */}
        {showMobileMenu && (
          <div className="absolute left-0 right-0 top-16 z-20 bg-white border-t border-gray-200 shadow-md">
            <nav className="flex flex-col p-4 space-y-2">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`/listado.html?cat=${cat.id}`}
                  className="block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {cat.title}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
