import React, { useContext, useEffect } from "react";
import { PaginationContext } from "../context/PaginationContext";

function Pagination() {
  const { changePage, prodsQuantity, getProdsQuantity, selectedPage } =
    useContext(PaginationContext);

  useEffect(() => {
    const page = location.pathname;

    getProdsQuantity();
  });
  return (
    <ul className="flex justify-center gap-1 text-gray-900 mt-2">
      {Array.from({ length: prodsQuantity }).map((_, index) => (
        <li>
          <button
            key={index}
            className={`block size-8 rounded border border-gray-200 text-center text-sm/8 font-medium transition-colors hover:bg-gray-50 cursor-pointer ${
              selectedPage === index + 1 ? "bg-blue-400" : ""
            }`}
            onClick={() => changePage(index + 1)}
          >
            {index + 1}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
