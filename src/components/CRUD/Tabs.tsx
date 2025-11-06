import React from "react";

function Tabs() {
  return (
    <div>
      <ul className="flex flex-wrap text-sm font-medium text-center text-black border-b border-gray-400">
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
    </div>
  );
}

export default Tabs;
