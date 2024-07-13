import { useState } from "react"
import Quotetool from "../../../components/Admin/Quote Tool/QuoteTool"
import EditAddCustomer from "../../../components/Admin/Quote Tool/EditAddCustomer";
const QuoteTool = () => {
  const [editCustomer,setEditCustomer]=useState(false);
  const [addCustomer,setAddCustomer]=useState(false)
  return (
    <div>
        <Quotetool setAddCustomer={setAddCustomer} setEditCustomer={setEditCustomer}/>
        {editCustomer ? <EditAddCustomer editCustomer={editCustomer} setEditCustomer={setEditCustomer}/>:''}
        {addCustomer ? <EditAddCustomer addCustomer={addCustomer} setAddCustomer={setAddCustomer} />:''}
    </div>
  )
}

export default QuoteTool