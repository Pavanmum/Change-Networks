import { useState } from "react";
import Header from "../../../components/Admin/SalesMatrix/Header"
import SalesMatrixTable from "../../../components/Admin/SalesMatrix/SalesMatrixTable";
import AddSalesMatrix from "../../../components/Admin/SalesMatrix/AddSalesMatrix";
import EditSalesMatrix from "../../../components/Admin/SalesMatrix/EditSalesMatrix";

const SalesMatrix = () => {
  const [editSalesMatrix,setEditSalesMatrix] =useState(false);
  const [addSales,setAddSales]=useState(false);
  return (
    <div>
      <Header setEditSalesMatrix={setEditSalesMatrix} setAddSales={setAddSales}/>
      <SalesMatrixTable />
      {addSales ? <AddSalesMatrix setAddSales={setAddSales}/>:''}
      {editSalesMatrix?<EditSalesMatrix setEditSalesMatrix={setEditSalesMatrix}/>:''}
    </div>
  )
}

export default SalesMatrix;