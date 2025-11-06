import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Tabs from "../components/CRUD/Tabs";
import Table from "../components/CRUD/Table";

function CRUD() {
  return (
    <div>
      <Header categories={[]}></Header>
      <Tabs></Tabs>
      <Table></Table>
      <Footer></Footer>
    </div>
  );
}

export default CRUD;
