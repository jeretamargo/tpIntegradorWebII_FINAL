import React, { useContext } from "react";
import AddButton from "./AddButton";
import { CrudContext } from "./CrudContext";

function Tabs() {
  const { ToggleTab, ProductTabOpen, CategorieTabOpen, TagTabOpen } =
    useContext(CrudContext);
  return (
    <div className=" flex justify-between">
      <ul className=" flex  text-sm font-medium text-center text-black  border-gray-400 mx-30">
        <li className="me-2">
          <button
            className={`inline-block p-4 rounded-t-lg active cursor-pointer ${
              ProductTabOpen
                ? " text-blue-600 bg-gray-100"
                : "hover:text-gray-600 hover:bg-gray-400"
            }`}
            onClick={() => ToggleTab("Product")}
          >
            Productos
          </button>
        </li>
        <li className="me-2">
          <button
            className={`inline-block p-4 rounded-t-lg  text-black  cursor-pointer ${
              CategorieTabOpen
                ? " text-blue-600 bg-gray-100"
                : "hover:text-gray-600 hover:bg-gray-400"
            } `}
            onClick={() => ToggleTab("Categorie")}
          >
            Categorias
          </button>
        </li>
        <li className="me-2">
          <button
            className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-400 text-black  cursor-pointer  ${
              TagTabOpen
                ? " text-blue-600 bg-gray-100"
                : "hover:text-gray-600 hover:bg-gray-400"
            } `}
            onClick={() => ToggleTab("Tag")}
          >
            Tags
          </button>
        </li>
        <AddButton></AddButton>
      </ul>
    </div>
  );
}

export default Tabs;
