import React, { useEffect } from "react";

// reactstrap components
// import {
// } from "reactstrap";

// core components
import IndexNavbar from "../components/Navbars/IndexNavbar.jsx";
import IndexHeader from "../components/Headers/IndexHeader.jsx";
import DarkFooter from "../components/Footers/DarkFooter.jsx";

// sections for this page
import Images from "./index-sections/Images.jsx";
import BasicElements from "./index-sections/BasicElements.jsx";
import Navbars from "./index-sections/Navbars.jsx";
import Tabs from "./index-sections/Tabs.jsx";
import Pagination from "./index-sections/Pagination.jsx";
import Notifications from "./index-sections/Notifications.jsx";
import Typography from "./index-sections/Typography.jsx";
import Javascript from "./index-sections/Javascript.jsx";
import Carousel from "./index-sections/Carousel.jsx";
import NucleoIcons from "./index-sections/NucleoIcons.jsx";
import CompleteExamples from "./index-sections/CompleteExamples.jsx";
import SignUp from "./index-sections/SignUp.jsx";
import Examples from "./index-sections/Examples.jsx";
import Download from "./index-sections/Download.jsx";
import Products from "./index-sections/Products.jsx";
import FeedBackForm from "./index-sections/FeedBackForm.jsx";

const Home = () => {
  useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
  
      <IndexNavbar />
      <div className="wrapper">
        <IndexHeader />
        <div className="main">
          {/* <Images /> */}
          {/* <Images />
          <BasicElements />
          <Navbars />
          <Tabs />
          {/* <Pagination /> */}
          {/* <Notifications />
          <Typography />
          <Javascript />
          <Carousel />  */}
          <NucleoIcons />
          <CompleteExamples />
          <Products />
          <FeedBackForm />
          <Examples />
          {/* <Download /> */}
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default Home;



