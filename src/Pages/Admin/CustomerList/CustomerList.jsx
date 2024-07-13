import { useState } from "react";
import Header from '../../../components/Admin/CustomerList/Header'
import CustomerListData from '../../../components/Admin/CustomerList/CustomerList'
import EditCustomer from "../../../components/Admin/CustomerList/EditCustomer.jsx";
import AddCustomer from '../../../components/Admin/CustomerList/AddCustomer.jsx'
const CustomerList = () => {
  const [showEditBox, setShowEditBox] = useState(false);
  const [showAddStock, setShowAddStock] = useState(false);
  const [addedSuccessfully,setAddedSuccessfully]=useState(false)
  return (
    <div>
        <Header
          setShowEditBox={setShowEditBox}
          setShowAddStock={setShowAddStock}/>
        <CustomerListData setAddedSuccessfully={setAddedSuccessfully} addedSuccessfully={addedSuccessfully} />
        {showEditBox ? <EditCustomer setShowEditBox={setShowEditBox}  /> : ""}
        {showAddStock ? <AddCustomer setShowAddStock={setShowAddStock} setAddedSuccessfully={setAddedSuccessfully} /> : ""}
    </div>
  )
}

export default CustomerList;