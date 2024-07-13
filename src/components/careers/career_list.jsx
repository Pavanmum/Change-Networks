import React from "react";
import "../../cn_assets/css/animate.min.css";
import "../../cn_assets/css/responsive.css";
import "../../cn_assets/css/pro.min.css";
import "../../cn_assets/css/line-awesome.min.css";
import "../../cn_assets/css/style.css";
import "../../cn_assets/css/careers_form.css";
import "../../Pages/Careeers/Career.css";
import CareerLeftSideCard from "./CareerLeftSideCard";
import CareerRightSide from "./CareerRightSide";
import CareerFilter from "./CareerFilter";

const career_list = () => {
  return (
    <div>
      <section className="careers pb-0" style={{ paddingTop: "0px" }}>
        <CareerFilter/>
        <div className="container-fluid">
          <div className="srpContent">
            <CareerLeftSideCard />
            {/* right side */}
            <CareerRightSide />
          </div>
        </div>
      </section>
    </div>
  );
};

export default career_list;
