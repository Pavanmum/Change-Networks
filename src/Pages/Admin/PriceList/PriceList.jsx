import { useState } from "react";
import Header from "../../../components/Admin/PriceList/Header.jsx";
import StockList from "../../../components/Admin/PriceList/StockList.jsx";
import "./PriceList.css"; // Ensure you import the CSS file
import CloneProduct from "../../../components/Admin/PriceList/CloneProduct.jsx";
import EditProduct from "../../../components/Admin/PriceList/EditProduct.jsx";
import AddStock from "../../../components/Admin/PriceList/AddStock.jsx";
const PriceList = () => {
  const [showCloneBox, setShowCloneBox] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
  const [showAddStock, setShowAddStock] = useState(false);
  const [handleReload,setHandleReload]=useState(false)

  return (
    <div className="" >
      <Header
        setShowCloneBox={setShowCloneBox}
        setShowEditBox={setShowEditBox}
        setShowAddStock={setShowAddStock}
        setHandleReload={setHandleReload}
      />
      
      <StockList setShowEditBox={setShowEditBox} setHandleReload={setHandleReload} handleReload={handleReload} />
      
      {showCloneBox ? <CloneProduct setShowCloneBox={setShowCloneBox} setHandleReload={setHandleReload} /> : ""}
      {showEditBox ? <EditProduct setShowEditBox={setShowEditBox} setHandleReload={setHandleReload}/> : ""}
      {showAddStock ? <AddStock setShowAddStock={setShowAddStock} setHandleReload={setHandleReload} /> : ""}
    </div>
  );
};

export default PriceList;
