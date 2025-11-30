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
      className=" mx-2 flex z-10 hover:scale-110 transition-all rounded-2xl "
      onClick={() => handleClickAdd()}
    >
      <button className=" cursor-pointer ">
        <img
          src="src/assets/images/add-crud.png "
          className="flex w-15 place-self-end  self-end cursor-pointer  "
        ></img>
      </button>
    </div>
  );
}

export default AddButton;
