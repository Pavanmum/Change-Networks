import {useState} from 'react'
import Header from '../../../components/Admin/WeightList/Header'
import WeightListStock from '../../../components/Admin/WeightList/WeightListStock'
import EditProduct from '../../../components/Admin/WeightList/EditProduct'
import AddStock from '../../../components/Admin/WeightList/AddStock'
const WeightList = () => {
  const [showEditBox, setShowEditBox] = useState(false);
  const [showAddStock, setShowAddStock] = useState(false);
  const [handleReload,setHandleReload]=useState(false)
  return (
    <div>
          
          <Header
       setShowEditBox={setShowEditBox}
       setShowAddStock={setShowAddStock}
       setHandleReload={setHandleReload}
        />
   
        <WeightListStock setHandleReload={setHandleReload} handleReload={handleReload}  />
      
      {showEditBox ? <EditProduct setShowEditBox={setShowEditBox} setHandleReload={setHandleReload} /> : ""}
      {showAddStock ? <AddStock setShowAddStock={setShowAddStock} setHandleReload={setHandleReload} /> : ""}
    </div>
  )
}

export default WeightList