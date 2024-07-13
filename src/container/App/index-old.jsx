import * as React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MuiDrawer from "@mui/material/Drawer";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {useDispatch} from 'react-redux'
import {setDrawerOpen} from '../../store/slices/Admin/priceListSlice.js';
import { logout, refreshToken } from "../../store/api/Admin/auth.js";
import { useEffect } from "react";
// import { useHistory } from "react-router-do  

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Header = styled("header")(({ theme, open }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "64px",
  background: "white",
  borderBottom: "1px solid #e0e0e0",
  padding: theme.spacing(0, 2),
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
  }),
  ...(!open && {
    width: `calc(100% - ${theme.spacing(7)} - 1px)`,
    marginLeft: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${theme.spacing(8)} - 1px)`,
      marginLeft: `calc(${theme.spacing(8)} + 1px)`,
    },
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MiniDrawer = () => {
  const [open, setOpen] = React.useState(false);
  // const [anchorElUser, setAnchorElUser] =useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const handleDrawerOpen = () => {
    setOpen(true);
    dispatch(setDrawerOpen(true));
  };

  // const history = useHistory();

  const handleDrawerClose = () => {
    setOpen(false);
    dispatch(setDrawerOpen(false));
  };

  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  const navigate = useNavigate();
  const LogoutFunction = () => {
    logout()
    window.location.reload();
    
  }

  useEffect(() => {
    refreshToken()
  }, [ refreshToken()]);

  return (
    <>
      {/* Top Bar */}
      <Header
        id="header"
        className="navbar navbar-expand-lg navbar-fixed navbar-height navbar-container navbar-bordered bg-white border-0"
        open={open}
      >
        <div className="navbar-nav-wrap">
          <div className="navbar-nav-wrap-content-start">
            {/* Navbar Vertical Toggle */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 1,
                ...(open && { display: "none" }),
              }}
            >
              <i className="bi-arrow-bar-left"></i>
            </IconButton>

            <h2 className="page-header-title mx-3 mx-lg-0 mb-0">Settings</h2>
          </div>

          <div className="d-flex navbar-nav-wrap-content-end">
            {/* Search */}
            <div className="dropdown me-2">
              {/* Input Group */}
              <div className="d-none d-lg-block">
                <div className="input-group input-group-merge input-group-borderless input-group-hover-light navbar-input-group">
                  <div className="input-group-prepend input-group-text">
                    <i className="bi-search" />
                  </div>
                  <input
                    type="search"
                    className="js-form-search form-control py-2"
                    placeholder="Search"
                    aria-label="Search"
                    data-hs-form-search-options='{
                      "clearIcon": "#clearSearchResultsIcon",
                      "dropMenuElement": "#searchDropdownMenu",
                      "dropMenuOffset": 0,
                      "toggleIconOnFocus": true,
                      "activeClass": "focus"
                    }'
                  />
                  <a
                    className="input-group-append input-group-text"
                    href="javascript:;"
                  >
                    <i
                      id="clearSearchResultsIcon"
                      className="bi-x-lg clear_all_icon"
                      style={{ display: "none" }}
                    />
                  </a>
                </div>
              </div>
              <button
                className="js-form-search1 js-form-search-mobile-toggle btn btn-ghost-secondary btn-icon rounded-circle d-lg-none"
                type="button"
                data-hs-form-search-options='{
                  "clearIcon": "#clearSearchResultsIcon",
                  "dropMenuElement": "#searchDropdownMenu",
                  "dropMenuOffset": 0,
                  "toggleIconOnFocus": true,
                  "activeClass": "focus"
                }'
              >
                <i className="bi-search" />
              </button>
            </div>
            <div className="navbar-nav-wrap">
              <div className="d-flex navbar-nav-wrap-content-end">
                {/* Dropdown */}
                <div className="dropdown me-2" onClick={toggleDropdown}>
                  <a
                    className="navbar-dropdown-account-wrapper"
                    href="javascript:;"
                    id="accountNavbarDropdown"
                    aria-expanded={isOpen ? "true" : "false"}
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    // aria-expanded="false"
                    data-bs-auto-close="outside"
                    data-bs-dropdown-animation
                  >
                    <div className="avatar avatar-sm avatar-circle">
                      <img
                        className="avatar-img"
                        src="http://192.168.1.161/change_pp/assets/img/logo.png"
                        alt=""
                      />
                      <span className="avatar-status avatar-sm-status avatar-status-success"></span>
                    </div>
                  </a>

                  {/* Dropdown Content */}
                  <div
                    className={`dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-menu-borderless navbar-dropdown-account ${
                      isOpen ? "show" : ""
                    }`}
                    aria-labelledby="accountNavbarDropdown"
                    style={{ width: "16rem" }}
                  >
                    {/* Dropdown Items */}
                    <div className="dropdown-item-text">
                      {/* Profile Info */}
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-sm avatar-circle">
                          <img
                            className="avatar-img"
                            src="http://192.168.1.161/change_pp/assets/img/logo.png"
                            alt=""
                          />
                        </div>
                        <div className="flex-grow-1 ms-3 overflow-hidden">
                          <h5 className="mb-0">Business Manager </h5>
                          <p className="card-text text-body">
                            sales@change-networks.com
                          </p>
                        </div>
                      </div>
                      {/* End Profile Info */}

                      <div className="dropdown-divider"></div>

                      {/* Dropdown Menu */}
                      {/* Add your dropdown menu items here */}
                      <Link  className="dropdown-item" to="/change/user">Profile Setting</Link>
                      <a
                        className="dropdown-item"
                        href="http://192.168.1.161/change_pp/user/access_setting"
                      >
                        Access Settings
                      </a>
                      <a
                        className="dropdown-item"
                        href="http://192.168.1.161/change_pp/user/users"
                      >
                        Manage Users
                      </a>
                      <div className="dropdown-divider"></div>
                      <a
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={LogoutFunction}
                      >
                        Sign out
                      </a>
                    </div>
                    {/* End Dropdown Items */}
                  </div>
                  {/* End Dropdown Content */}
                </div>
                {/* End Dropdown */}
              </div>
            </div>
            {/* End Navbar */}
          </div>
        </div>
      </Header>
      {/* Left Sidebar */}
      <Drawer
        sx={{
          height: "100vh",
        }}
        variant="permanent"
        open={open}
      >
        <DrawerHeader
          sx={{
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
            position: "sticky",
            top: 0,
            zIndex: 999,
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "space-between",
              background: "white",
            }}
          >
            <a
              className="navbar-brand"
              href="http://192.168.1.161/change_pp//login/partnerlogin/process"
              aria-label="CHANGE Networks"
            >
              <img
                src="http://192.168.1.161/change_pp/assets/img/logo.png"
                alt="Logo"
                data-hs-theme-appearance="default"
                width={60}
              />
            </a>

            <IconButton
              onClick={handleDrawerClose}
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{
                marginLeft: 2,
                ...(!open && { display: "none" }),
              }}
            >
              <i className="bi bi-arrow-bar-right" />
            </IconButton>
          </div>
        </DrawerHeader>
        <div className="navbar-vertical-container">
          <div className="navbar-vertical-footer-offset">
            <div className="navbar-vertical-content">
              <div
                id="navbarVerticalMenu"
                className="nav nav-pills nav-vertical card-navbar-nav"
              >
                <div className="nav-item">
                  <Link
                    className="nav-link active"
                    to="/change/dashboard"
                  >
                    <i className="bi-house-door nav-icon" />
                    <span className="nav-link-title">Home</span>
                  </Link>
                </div>
                <div className="nav-item">
                  <a
                    className="nav-link active"
                    href="http://192.168.1.161/change_pp/stock-list"
                  >
                    <i className="bi-basket nav-icon" />
                    <span className="nav-link-title">Price List</span>
                  </a>
                </div>
                <div className="nav-item">
                  <a
                    className="nav-link active"
                    href="http://192.168.1.161/change_pp/promotion"
                  >
                    <i className="bi-basket nav-icon" />
                    <span className="nav-link-title">Promotion</span>
                  </a>
                </div>
                <div className="nav-item">
                  <a
                    className="nav-link active"
                    href="http://192.168.1.161/change_pp/gallery"
                  >
                    <i className="bi-kanban nav-icon" />
                    <span className="nav-link-title">Gallery</span>
                  </a>
                </div>
                <div className="nav-item">
                  <a
                    className="nav-link active"
                    href="http://192.168.1.161/change_pp/customerlist"
                  >
                    <i className="bi-basket nav-icon" />
                    <span className="nav-link-title">Customer List</span>
                  </a>
                </div>
                <div className="nav-item">
                  <a
                    className="nav-link active"
                    href="http://192.168.1.161/change_pp/email-list"
                  >
                    <i className="bi-basket nav-icon" />
                    <span className="nav-link-title">Email Matrix</span>
                  </a>
                </div>
                <div className="nav-item">
                  <a
                    className="nav-link active"
                    href="http://192.168.1.161/change_pp/sales-matrix"
                  >
                    <i className="bi-basket nav-icon" />
                    <span className="nav-link-title">Sales Matrix</span>
                  </a>
                </div>
                <div className="nav-item">
                  <a
                    className="nav-link active"
                    href="http://192.168.1.161/change_pp/weight"
                  >
                    <i className="bi-basket nav-icon" />
                    <span className="nav-link-title">Weight List</span>
                  </a>
                </div>
                <div className="nav-item">
                  <a
                    className="nav-link active"
                    href="http://192.168.1.161/change_pp/broadcast"
                  >
                    <i className="bi-basket nav-icon" />
                    <span className="nav-link-title">Broadcast</span>
                  </a>
                </div>
                <div className="nav-item">
                  <a
                    className="nav-link active"
                    href="http://192.168.1.161/change_pp/media"
                  >
                    <i className="bi-basket nav-icon" />
                    <span className="nav-link-title">Media</span>
                  </a>
                </div>
                <div className="nav-item">
                  <a
                    className="nav-link active"
                    href="http://192.168.1.161/change_pp/all_transaction"
                  >
                    <i className="bi-basket nav-icon" />
                    <span className="nav-link-title">Transaction</span>
                  </a>
                </div>
              </div>
            </div>
            {/* End Content */}
          </div>
        </div>
      </Drawer>

      {/* Main Page Component */}
      <div component="div" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <Outlet />
      </div>

    </>
  );
};

export default MiniDrawer;
