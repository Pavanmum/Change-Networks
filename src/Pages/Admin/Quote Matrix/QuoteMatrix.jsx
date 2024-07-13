import { useState } from "react"
import Header from "../../../components/Admin/Quote Matrix/Header"
import QuoteMatrixList from "../../../components/Admin/Quote Matrix/QuoteMatrixList"

const QuoteMatrix = () => {
const [handleReload,setHandleReload]=useState(false)

  return (
    <div>
        <Header setHandleReload={setHandleReload} />
        <QuoteMatrixList setHandleReload={setHandleReload} handleReload={handleReload} />
    </div>
  )
}

export default QuoteMatrix