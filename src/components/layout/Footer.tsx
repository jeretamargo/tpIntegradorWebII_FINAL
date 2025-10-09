import React from "react";
/* import SocialIcons from './SocialIcons'; */
import logo from "../../assets/images/logo.png"; // Asegúrate de que esta ruta sea correcta

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="bg-gray-500 h-20 px-6 py-2 flex items-center justify-center gap-6 text-teal-600 w-full">
        <img src={logo} className="w-40 pt-4" alt="Logo" />
        <ul className="flex text-sm gap-6"></ul>
      </div>

      <div className="mt-2 border-t border-gray-100 pt-2">
        <div className="sm:flex sm:justify-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; 2025. El Mejor Super. Todos los derechos reservados.
          </p>
          <ul className="mt-8 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end">
            <li>
              <a href="#" className="text-gray-500 transition hover:opacity-75">
                Términos & Condiciones
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-500 transition hover:opacity-75">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-500 transition hover:opacity-75">
                Cookies
              </a>
            </li>
          </ul>
        </div>

        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-start lg:gap-8">
            <div className="mt-8 p-5 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
              <div className="col-span-2">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    ¡Suscribite y recibí un decuento en tu próxima compra!
                  </h2>
                </div>
              </div>

              <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
                <form className="w-full">
                  <label htmlFor="UserEmail" className="sr-only">
                    Email
                  </label>
                  <div className="border border-gray-100 p-2 focus-within:ring-3 sm:flex sm:items-center sm:gap-4">
                    <input
                      type="email"
                      id="UserEmail"
                      placeholder="tuemail@gmail.com"
                      className="w-full border-none focus:border-transparent focus:ring-transparent sm:text-sm"
                    />
                    <button className="mt-1 w-full bg-blue-800 px-6 py-3 text-sm font-bold tracking-wide text-white uppercase transition-none hover:bg-teal-600 sm:mt-0 sm:w-auto sm:shrink-0">
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="font-medium text-gray-900">Podría interesarte</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Sucursales
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Hot Sale 2026
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Préstamos
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Tarjeta Super
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="font-medium text-gray-900">La Empresa</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Acerca de nosotros
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Conocé al equipo
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Reseñas
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="font-medium text-gray-900">Links de ayuda</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Contacto
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Preguntas frecuentes
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Chat
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="font-medium text-gray-900">Legal</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Boton de arrepentimiento
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Política de devoluciones
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Política de privacidad
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Defensa de los consumidores
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="font-medium text-gray-900">Downloads</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Marketing Calendar
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      SEO Infographics
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
