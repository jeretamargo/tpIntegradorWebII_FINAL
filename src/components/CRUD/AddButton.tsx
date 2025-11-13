import React, { useContext } from "react";
import { CrudContext } from "../CRUD/CrudContext";

function AddButton() {
  const {
    setIsAddingProd,
    setIsAddingCat,
    setIsAddingTag,
    ProductTabOpen,
    CategorieTabOpen,
    TagTabOpen,
  } = useContext(CrudContext);
  return (
    <div
      className=" mx-2 flex z-100 hover:scale-110 transition-all rounded-2xl "
      onClick={
        ProductTabOpen
          ? () => setIsAddingProd(true)
          : CategorieTabOpen
          ? () => setIsAddingCat(true)
          : TagTabOpen
          ? () => setIsAddingTag(true)
          : () => {}
      }
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
