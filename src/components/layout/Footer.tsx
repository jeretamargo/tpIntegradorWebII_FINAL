import React from "react";
/* import SocialIcons from './SocialIcons'; */
import logo from "../../assets/images/logo-nuevo.png"; // Asegúrate de que esta ruta sea correcta

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="bg-white  m-0 p-0 flex flex-col items-center justify-center  w-full">
        <img src={logo} className="w-40  m-0 p-0 flex" alt="Logo" />
        <p className="text-xs text-gray-400 inline">
          2025. El Mejor Super. Todos los derechos reservados.
        </p>
        <ul className="flex text-sm gap-6"></ul>
      </div>

      <div className="mt-2 border-t bg-blue-400 border-gray-100 pt-2">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-start lg:gap-8">
            <div className="mt-8 p-5 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-4 lg:gap-y-16">
              <div className="col-span-2 sm:col-span-1 ">
                <h2 className="font-normal text-3xl text-gray-900  self-center place-self-center">
                  Contactanos
                </h2>
                <div className="py-2  self-center place-self-center">
                  <p className="font-bold text-sm"> Whatsapp</p>
                  <h1 className="font-bold text-2xl">+54 11 3292 1100</h1>
                </div>
                <div className="py-2  self-center place-self-center">
                  <img
                    className="w-6"
                    src="src/assets/images/phone-icon.png"
                  ></img>
                  <h1 className="font-bold text-2xl">0800 777 0222</h1>
                </div>

                <div className="flex flex-row align-middle justify-center py-2 ">
                  <img
                    className="w-6"
                    src="src/assets/images/email-icon.png"
                  ></img>
                  <p className="px-2">atencionalcliente@reactmarket.com</p>
                </div>
                <div className="flex flex-row justify-center place-content-around py-2 ">
                  <div className="px-2">
                    <img
                      className="w-6  h-auto object-contain"
                      src="src/assets/images/instagram-icon.png"
                    ></img>
                  </div>
                  <div className="px-2">
                    <img
                      className="w-6 h-auto object-contain"
                      src="src/assets/images/facebook-icon.png"
                    ></img>
                  </div>
                  <div className="px-2">
                    <img
                      className="w-6 h-auto object-contain"
                      src="src/assets/images/linkedin-icon.png"
                    ></img>
                  </div>
                  <div className="px-2">
                    <img
                      className="w-6 h-auto object-contain"
                      src="src\assets\images\youtube-icon.png"
                    ></img>
                  </div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 ">
                <h2 className="font-normal text-3xl text-gray-900  self-center place-self-center">
                  Compañia
                </h2>
                <ul className="mt-6 space-y-4 text-sm  self-center place-self-center">
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
                      Sucursales
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Trabajá con nosotros
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

              <div className="col-span-2 sm:col-span-1  ">
                <h2 className="font-normal text-3xl text-gray-900 self-center place-self-center">
                  Legal
                </h2>
                <ul className="mt-6 space-y-4 text-sm self-center place-self-center">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Boton de Arrepentimiento
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
                      Defensa del consumidor
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Acuerdo ACYMA
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1 justify-center justify-items-center ">
                <h2 className="font-normal text-3xl text-gray-900 align-middle  flex self-center place-self-center">
                  Suscribite al Boletín
                </h2>

                <p className="py-2 text-center">
                  ¡Suscribite y recibí un decuento en tu próxima compra!
                </p>

                <input
                  type="text"
                  placeholder="tuemail@mail.com"
                  className="rounded-3xl my-2 flex justify-items-center self-center"
                  size={35}
                ></input>
                <button className="px-8 py-2 bg-blue-500 text-white rounded-3xl flex self-center">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
