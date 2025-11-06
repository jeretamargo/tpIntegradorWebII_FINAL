import React from "react";

function Tabs() {
  return (
    <div className=" flex justify-between">
      <ul className=" flex  text-sm font-medium text-center text-black  border-gray-400 mx-30">
        <li className="me-2">
          <button
            aria-current="page"
            className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active"
          >
            Prodcutos
          </button>
        </li>
        <li className="me-2">
          <button className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-400 text-black">
            Categorias
          </button>
        </li>
        <li className="me-2">
          <button className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-400 text-black">
            Tags
          </button>
        </li>
      </ul>
      <button className="  p-4 mx-30  hover:scale-110 transition-all shadow-2xl">
        <img src="src/assets/images/add-crud.png" className="flex w-10  "></img>
      </button>
    </div>
  );
}

export default Tabs;
