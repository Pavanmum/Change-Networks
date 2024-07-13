import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";
import logo from '../../assets/img/changed-logo.png';



const  IndexNavbar = () =>   {
  const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  

  useEffect (() => {
    const updateNavbarColor = () => {
      if (window.pageYOffset > 399) {
        setNavbarColor("");
        setScrolling(true);
      } else {
        setNavbarColor("navbar-transparent");
        setScrolling(false);
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand href="/" target="self" id="navbar-brand">
            {scrolling ? (
                <img
                  alt="..."
                  className="n-logo"
                  style={{ width: "50px", height: "50px" }}
                  src={logo}
                />
              ) : (
                "CHANGED NETWORK"
              )}
            </NavbarBrand>
            <UncontrolledTooltip to="/" target="#navbar-brand">
              CHANGED NEWTWORK
            </UncontrolledTooltip>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  href="#pablo"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  {/* <i className="now-ui-icons design_app mr-1"></i> */}
                  <p>COMMANDO</p>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem to="/index" tag={Link}>
                    <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                    Switches
                  </DropdownItem>
                  <DropdownItem
                    href="https://demos.creative-tim.com/now-ui-kit-react/#/documentation/introduction?ref=nukr-index-navbar"
                    target="_blank"
                  >
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                    Wireless
                  </DropdownItem>
                  <DropdownItem
                    href="https://demos.creative-tim.com/now-ui-kit-react/#/documentation/introduction?ref=nukr-index-navbar"
                    target="_blank"
                  >
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                    Routers
                  </DropdownItem>
                  <DropdownItem
                    href="https://demos.creative-tim.com/now-ui-kit-react/#/documentation/introduction?ref=nukr-index-navbar"
                    target="_blank"
                  >
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                    Networks Modules
                  </DropdownItem>
                  <DropdownItem
                    href="https://demos.creative-tim.com/now-ui-kit-react/#/documentation/introduction?ref=nukr-index-navbar"
                    target="_blank"
                  >
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                    Media Converters
                  </DropdownItem>
                  <DropdownItem
                    href="https://demos.creative-tim.com/now-ui-kit-react/#/documentation/introduction?ref=nukr-index-navbar"
                    target="_blank"
                  >
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                   Transceiver Modules
                  </DropdownItem>
                  <DropdownItem
                    href="https://demos.creative-tim.com/now-ui-kit-react/#/documentation/introduction?ref=nukr-index-navbar"
                    target="_blank"
                  >
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                   Networking Accessories
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                
                <NavLink
                  href="/index"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   document
                  //     .getElementById("download-section")
                  //     .scrollIntoView();
                  // }}
                >
                  {/* <i className="now-ui-icons arrows-1_cloud-download-93"></i> */}
                  <p>CISCO GPL</p>
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  href="#pablo"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="now-ui-icons design_app mr-1"></i>
                  <p>Company</p>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem to="/index" tag={Link}>
                    <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                    Awards
                  </DropdownItem>
                  <DropdownItem
                    href="https://demos.creative-tim.com/now-ui-kit-react/#/documentation/introduction?ref=nukr-index-navbar"
                    target="_blank"
                  >
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                    About
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink
                  to="/gallery"
                  tag={Link}
                >
                  {/* <i className="now-ui-icons arrows-1_cloud-download-93"></i> */}
                  <p>Gallery</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="/index"
                >
                  {/* <i className="now-ui-icons arrows-1_cloud-download-93"></i> */}
                  <p>we are hiring</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="/index"
                >
                  {/* <i className="now-ui-icons arrows-1_cloud-download-93"></i> */}
                  <p>Schedule meeting</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="/login-page" // Add the desired link here
                >
                  {/* <i className="now-ui-icons arrows-1_cloud-download-93"></i> */}
                  <p >  View Login Page</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
                  target="_blank"
                  id="instagram-tooltip"
                >
                <img
                    alt="..."
                    className="n-logo"
                    style={{ width: "80px", height: "50px" }}
                    src="https://change-networks.com/assets/img/stripe-logo.png"
                    />
                </NavLink>
                
                <UncontrolledTooltip target="#instagram-tooltip">
                <img
                    alt="..."
                    className="n-logo"
                    style={{ width: "100px", height: "100px" }}
                    src="https://change-networks.com/assets/img/stripe-logo.png"
                    />
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
