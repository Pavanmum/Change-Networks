import{ useState } from 'react'
import Header from '../../../components/Admin/EmaiMatrix/Header'
import UserEmailList from '../../../components/Admin/EmaiMatrix/UserEmailList.jsx'
import EditEmailMatrix from '../../../components/Admin/EmaiMatrix/EditEmailMatrix.jsx'
const EmailMatrix = () => {
    const [selectedBox,setSelectedBox] =useState(false);
    
  return (
    <div>
        <Header />
        <UserEmailList setSelectedBox={setSelectedBox}/>
        
        {selectedBox ? <EditEmailMatrix setSelectedBox={setSelectedBox} />:""}
    </div>
  )
}

export default EmailMatrix