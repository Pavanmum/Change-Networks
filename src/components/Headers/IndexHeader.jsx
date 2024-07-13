/*eslint-disable*/
import React, { useEffect } from "react";

// reactstrap components
import { Container } from "reactstrap";
import logo from '../../assets/img/changed-logo.png';

// core components

function IndexHeader() {
  let pageHeader = React.createRef();

  useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div className="page-header clear-filter" filter-color="#fff">
        <div
          className="page-header-image"
          // style={{
          //   backgroundImage: "url(" + require("assets/img/header.jpg") + ")"
          // }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="content-center brand">
            <img
              alt="..."
              className="n-logo"
              src={logo}
            ></img>
            <h1 className="h1-seo">Now UI Kit.</h1>
            <h3>CHANGE Networks is neither a partner of nor an affiliate of Cisco Systems</h3>
          </div>
          {/* <h6 className="category category-absolute">
            Designed by{" "}
            <a href="http://invisionapp.com/?ref=creativetim" target="_blank">
              <img
                alt="..."
                className="invision-logo"
                src={require("assets/img/invision-white-slim.png")}
              ></img>
            </a>
            . Coded by{" "}
            <a
              href="https://www.creative-tim.com?ref=nukr-index-header"
              target="_blank"
            >
              <img
                alt="..."
                className="creative-tim-logo"
                src={require("assets/img/creative-tim-white-slim2.png")}
              ></img>
            </a>
            .
          </h6> */}
        </Container>
      </div>
    </>
  );
}

export default IndexHeader;
