import React from "react";
import "flowbite";
import item1 from "../assets/images/item1-carousel.png";
import item2 from "../assets/images/item2-carousel.png";
import item3 from "../assets/images/item3-carousel.png";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";

function Carousel() {
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <div
      id="default-carousel"
      className="relative w-full"
      data-carousel="slide"
    >
      <div className="relative h-56 overflow-hidden rounded-base md:h-96">
        {/* Item 1 */}
        <div className="duration-700 ease-in-out" data-carousel-item="active">
          <img
            src={item1}
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          />
        </div>

        {/* Item 2 */}
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <img
            src={item2}
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          />
        </div>

        {/* Item 3 */}
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <img
            src={item3}
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          />
        </div>
      </div>

      {/* Indicadores */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        <button
          type="button"
          className="w-3 h-3 rounded-base"
          data-carousel-slide-to="0"
        ></button>
        <button
          type="button"
          className="w-3 h-3 rounded-base"
          data-carousel-slide-to="1"
        ></button>
        <button
          type="button"
          className="w-3 h-3 rounded-base"
          data-carousel-slide-to="2"
        ></button>
      </div>

      {/* Controles */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center h-full px-4 cursor-pointer"
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" d="m15 19-7-7 7-7" />
          </svg>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center h-full px-4 cursor-pointer"
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" d="m9 5 7 7-7 7" />
          </svg>
        </span>
      </button>
    </div>
  );
}

export default Carousel;
