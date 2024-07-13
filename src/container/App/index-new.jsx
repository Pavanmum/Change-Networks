import * as React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setDrawerOpen } from '../../store/slices/Admin/priceListSlice.js';
import { logout, refreshToken } from "../../store/api/Admin/auth.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const drawerWidth = 200;

const MiniDrawer = () => {
  const [open, setOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
    dispatch(setDrawerOpen(true));
  };

  const handleDrawerClose = () => {
    setOpen(false);
    dispatch(setDrawerOpen(false));
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const LogoutFunction = () => {
    logout();
    window.location.reload();
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <>
      {/* Top Bar */}
      <header
        id="header"
        className="navbar navbar-expand-lg navbar-fixed navbar-height navbar-container navbar-bordered bg-white border-0"
        style={{ height: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s', width: open ? `calc(100% - ${drawerWidth}px)` : '100%' }}
      >
        <div className="navbar-nav-wrap ">
          <button
            className="btn btn-outline-secondary me-3"
            onClick={handleDrawerOpen}
            style={{ display: open ? 'none' : 'inline-block' ,marginLeft:'5%' }}
          >
            <i className="bi  bi-arrow-bar-right" />
          </button>
          <div className="navbar-nav-wrap-content-start">

          <h2 className="page-header-title "  style={{marginLeft : open ? '160%' : '0%'}}>Settings</h2>
          </div>
        </div>
        <div className="d-flex navbar-nav-wrap-content-end">
          <div className="dropdown me-3">
            <input className="btn btn-light" />
              <i className="bi bi-search"></i>
      
          </div>
          <div className="dropdown">
            <a onClick={toggleDropdown} style={{ cursor: "pointer" }} className="d-flex align-items-center">
              <img
                className="rounded-circle"
                src="http://192.168.1.161/change_pp/assets/img/logo.png"
                alt="User"
                width="40"
                height="40"
              />
              <span className="ms-2">Business Manager</span>
            </a>
            <div className={`dropdown-menu dropdown-menu-end ${isOpen ? "show" : ""}`} style={{ display: isOpen ? 'block' : 'none' }}>
              <div className="dropdown-item-text">
                <div className="d-flex align-items-center">
                  <img
                    className="rounded-circle"
                    src="http://192.168.1.161/change_pp/assets/img/logo.png"
                    alt="User"
                    width="40"
                    height="40"
                  />
                  <div className="ms-2">
                    <h5 className="mb-0">Business Manager</h5>
                    <p className="mb-0">sales@change-networks.com</p>
                  </div>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" to="/change/user">Profile Setting</Link>
              <a className="dropdown-item" href="http://192.168.1.161/change_pp/user/access_setting">Access Settings</a>
              <a className="dropdown-item" href="http://192.168.1.161/change_pp/user/users">Manage Users</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" onClick={LogoutFunction} style={{ cursor: "pointer" }}>Sign out</a>
            </div>
          </div>
        </div>
      </header>

      {/* Left Sidebar */}
      <aside
        className={`navbar navbar-vertical-aside navbar-vertical   navbar-expand-xl navbar-bordered bg-white`}
        style={{ transition: "width 0.3s", height: "100vh", position: "fixed", top: 0, zIndex: 999 , width: open ? '200px' : '75px'}}
      >
        <div className="d-flex align-items-center justify-content-between p-3 ">
          <img src="http://192.168.1.161/change_pp/assets/img/logo.png" alt="Logo" width={60} />
          <button className="btn btn-outline-secondary" onClick={handleDrawerClose} style={{ display: !open ? 'none' : 'inline-block' }}>
            <i className="bi bi-arrow-bar-left" />
          </button>
        </div>
        <nav className="nav flex-column p-3  " >
          <Link className="nav-link d-flex align-items-center" to="/change/dashboard">
            <i className="bi bi-house-door me-2 text-dark" />
            {open ?
            <span className="d-none d-md-inline text-dark" >Home</span>
            :<div className="pb-4"></div>}
          </Link>
          <Link className="nav-link d-flex align-items-center" to="/change/price-list">
            <i className="bi bi-basket me-2 text-dark" />
            {open ?
            <span className="d-none d-md-inline text-dark">Price List</span>
            :<div className="pb-4"></div>}
          </Link>

          <Link className="nav-link d-flex align-items-center" to="/change/promotion">
            <i className="bi bi-basket me-2 text-dark" />
          {open ? 
            <span className="d-none d-md-inline text-dark">Promotion</span>
          :<div className="pb-4"></div>}
          </Link>
          <Link  className="nav-link d-flex align-items-center" to="/change/gallery">
            <i className="bi bi-kanban me-2 text-dark" />
            {open ?
            <span className="d-none d-md-inline text-dark">Gallery</span>
            :<div className="pb-4"></div>}
          </Link>
          <Link className="nav-link d-flex align-items-center" to="/change/customerlist">
            <i className="bi bi-basket me-2 text-dark" />
            {
              open ?
            <span className="d-none d-md-inline text-dark">Customer List</span>
            :<div className="pb-4"></div>}
          </Link>
          <Link className="nav-link d-flex align-items-center" to="/change/emailmatrix">
            <i className="bi bi-basket me-2 text-dark" />
            {open ?
            <span className="d-none d-md-inline text-dark">Email Matrix</span>
            :<div className="pb-4"></div>}
          </Link>
          <Link className="nav-link d-flex align-items-center" to="/change/salesmatrix">
            <i className="bi bi-basket me-2 text-dark" />
            {open ? <span className="d-none d-md-inline text-dark">Sales Matrix</span>:<div className="pb-4"></div>}
          </Link>
          <Link className="nav-link d-flex align-items-center" to="/change/weightlist">
            <i className="bi bi-basket me-2 text-dark" />
            {open ?  <span className="d-none d-md-inline text-dark">Weight List</span>:<div className="pb-4"></div>}
          </Link>
          <Link className="nav-link d-flex align-items-center" to="/change/broadcast">
            <i className="bi bi-basket me-2 text-dark" />
            {open ?   <span className="d-none d-md-inline text-dark">Broadcast</span>:<div className="pb-4"></div>}
          </Link>
          <Link className="nav-link d-flex align-items-center" to="/change/media">
            <i className="bi bi-basket me-2 text-dark" />
            {open ?   <span className="d-none d-md-inline text-dark">Media</span>:<div className="pb-4"></div>}
          </Link>
          <Link className="nav-link d-flex align-items-center" to="/change/transaction">
            <i className="bi bi-basket me-2 text-dark" />
            {open ?  <span className="d-none d-md-inline text-dark">Transaction</span>:<div className="pb-4"></div>}
          </Link>
        </nav>
      </aside>

      {/* Main Page Component */}
      <div style={{ paddingLeft: open ? '200px' : '75px', transition: "padding-left 0.3s", flexGrow: 1 }}>
        <Outlet />
      </div>
    </>
  );
};

export default MiniDrawer;