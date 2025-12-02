import React from "react";

/* IMÁGENES IMPORTADAS */
import logo from "../../assets/images/logo-nuevo.png";
import phoneIcon from "../../assets/images/phone-icon.png";
import emailIcon from "../../assets/images/email-icon.png";
import instagramIcon from "../../assets/images/instagram-icon.png";
import facebookIcon from "../../assets/images/facebook-icon.png";
import linkedinIcon from "../../assets/images/linkedin-icon.png";
import youtubeIcon from "../../assets/images/youtube-icon.png";

const Footer = () => {
  return (
    <footer className="bg-white">
      {/* Logo + texto superior */}
      <div className="bg-white m-0 p-0 flex flex-col items-center justify-center w-full">
        <img src={logo} className="w-40 m-0 p-0" alt="Logo" />
        <p className="text-xs text-gray-400 inline">
          2025. El Mejor Super. Todos los derechos reservados.
        </p>
      </div>

      {/* Body del Footer */}
      <div className="mt-2 border-t bg-blue-400 border-gray-100 pt-2">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-start lg:gap-8">
            <div className="mt-8 p-5 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-4 lg:gap-y-16">
              
              {/* --- CONTACTO --- */}
              <div className="col-span-2 sm:col-span-1">
                <h2 className="font-normal text-3xl text-gray-900 text-center">
                  Contactanos
                </h2>

                <div className="py-2 text-center">
                  <p className="font-bold text-sm">Whatsapp</p>
                  <h1 className="font-bold text-2xl">+54 11 3292 1100</h1>
                </div>

                <div className="py-2 flex items-center justify-center gap-2">
                  <img className="w-6" src={phoneIcon} alt="Teléfono" />
                  <h1 className="font-bold text-2xl">0800 777 0222</h1>
                </div>

                <div className="flex flex-row items-center justify-center py-2 gap-2">
                  <img className="w-6" src={emailIcon} alt="Email" />
                  <p>atencionalcliente@reactmarket.com</p>
                </div>

                <div className="flex flex-row justify-center gap-4 py-2">
                  <img className="w-6" src={instagramIcon} alt="Instagram" />
                  <img className="w-6" src={facebookIcon} alt="Facebook" />
                  <img className="w-6" src={linkedinIcon} alt="LinkedIn" />
                  <img className="w-6" src={youtubeIcon} alt="YouTube" />
                </div>
              </div>

              {/* --- COMPAÑIA --- */}
              <div className="col-span-2 sm:col-span-1 text-center">
                <h2 className="font-normal text-3xl text-gray-900">Compañía</h2>
                <ul className="mt-6 space-y-4 text-sm">
                  <li><a href="#" className="text-gray-700 hover:opacity-75">Acerca de nosotros</a></li>
                  <li><a href="#" className="text-gray-700 hover:opacity-75">Sucursales</a></li>
                  <li><a href="#" className="text-gray-700 hover:opacity-75">Trabajá con nosotros</a></li>
                  <li><a href="#" className="text-gray-700 hover:opacity-75">Reseñas</a></li>
                </ul>
              </div>

              {/* --- LEGAL --- */}
              <div className="col-span-2 sm:col-span-1 text-center">
                <h2 className="font-normal text-3xl text-gray-900">Legal</h2>
                <ul className="mt-6 space-y-4 text-sm">
                  <li><a href="#" className="text-gray-700 hover:opacity-75">Botón de Arrepentimiento</a></li>
                  <li><a href="#" className="text-gray-700 hover:opacity-75">Política de devoluciones</a></li>
                  <li><a href="#" className="text-gray-700 hover:opacity-75">Política de privacidad</a></li>
                  <li><a href="#" className="text-gray-700 hover:opacity-75">Defensa del consumidor</a></li>
                  <li><a href="#" className="text-gray-700 hover:opacity-75">Acuerdo ACYMA</a></li>
                </ul>
              </div>

              {/* --- SUSCRIPCIÓN --- */}
              <div className="col-span-2 sm:col-span-1 text-center">
                <h2 className="font-normal text-3xl text-gray-900">Suscribite al Boletín</h2>
                <p className="py-2">
                  ¡Suscribite y recibí un descuento en tu próxima compra!
                </p>

                <input
                  type="text"
                  placeholder="tuemail@mail.com"
                  className="rounded-3xl my-2 border p-2 w-56"
                />
                <button className="px-8 py-2 bg-blue-500 text-white rounded-3xl">
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

