import {useState} from 'react'
import Header from '../../../components/Admin/Promotion/Header'
import EditProduct from '../../../components/Admin/Promotion/EditProduct'
import AddStock from '../../../components/Admin/Promotion/AddStock.jsx'
import StockList from '../../../components/Admin/Promotion/StockList'
import './promotion.css'
const Promotion = () => {
  const [showEditBox, setShowEditBox] = useState(false);
  const [showAddStock, setShowAddStock] = useState(false);
  const [handleReload,setHandleReload]=useState(false)
  return (
    <div className="">
      
        <Header
       setShowEditBox={setShowEditBox}
       setShowAddStock={setShowAddStock}
       setHandleReload={setHandleReload}
        />
   
        <StockList setHandleReload={setHandleReload} handleReload={handleReload} />
      
      {showEditBox ? <EditProduct setShowEditBox={setShowEditBox} setHandleReload={setHandleReload} /> : ""}
      {showAddStock ? <AddStock setShowAddStock={setShowAddStock} setHandleReload={setHandleReload} /> : ""}
    </div>
  )
}

export default Promotion