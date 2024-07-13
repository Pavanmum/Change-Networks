import { useState } from "react";
import MainContainer from "./MainContiner";
import Nav from "./Nav";
import "../../cn_assets/css/animate.min.css";
import "../../cn_assets/css/responsive.css";
import "../../cn_assets/css/pro.min.css";
import "../../cn_assets/css/line-awesome.min.css";
import "../../cn_assets/css/style.css";
import "../../cn_assets/css/careers_form.css";
import "../../Pages/Careeers/Career.css";
import Footer from "../../cn_components/Footer";
import "./CiscoGPL.css";
import BulkSearch from "../../components/BulkSearch/BulkSearch";

const CiscoGPL = () => {
  const [showBulk, setShowBulk] = useState(false);

  // Use useEffect to navigate to MainContainer when showBulk becomes false
  //
  console.log("showBulk:", showBulk);

  return (
    <>
      <Nav />
      {showBulk ? (
        <BulkSearch />
      ) : (
        <>
          {/* Render MainContainer when showBulk is false */}

          <MainContainer setShowBulk={setShowBulk} />
        </>
      )}
      <Footer />
    </>
  );
};

export default CiscoGPL;
