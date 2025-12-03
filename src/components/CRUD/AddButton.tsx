import React, { useContext } from "react";
import { CrudContext } from "../../context/CrudContext";

function AddButton() {
  const {
    setIsAddingProd,
    setIsAddingCat,
    setIsAddingTag,
    ProductTabOpen,
    CategorieTabOpen,
    TagTabOpen,
    editingCat,
    editingProd,
    editingTag,
  } = useContext(CrudContext);

  function handleClickAdd() {
    if (editingCat || editingProd || editingTag) return;
    if (ProductTabOpen) {
      setIsAddingProd(true);
    } else if (CategorieTabOpen) {
      setIsAddingCat(true);
    } else if (TagTabOpen) {
      setIsAddingTag(true);
    }
  }
  return (
    <div
      className=" fixed bottom-8 right-8 bg-white text-white p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110  "
      onClick={() => handleClickAdd()}
    >
      <button className=" cursor-pointer ">
        <img
          src="src/assets/images/add-crud.png "
          className=" h-auto  max-h-10 overflow-x-auto "
        ></img>
      </button>
    </div>
  );
}

export default AddButton;
