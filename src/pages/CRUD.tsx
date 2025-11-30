import React, { useContext } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Tabs from "../components/CRUD/Tabs";
import Table from "../components/CRUD/Table";
import AddButton from "../components/CRUD/AddButton";
import DeleteWarning from "../components/CRUD/DeleteWarning";
import { CrudContext } from "../context/CrudContext";

function CRUD() {
  return (
    <div>
      <Header categories={[]}></Header>
      <Tabs></Tabs>
      <Table></Table>
      <Footer></Footer>
      <DeleteWarning></DeleteWarning>
    </div>
  );
}

export default CRUD;
