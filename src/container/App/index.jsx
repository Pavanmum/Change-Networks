import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './MiniDrawer.css'; // Custom styles for transitions and layout
import { setDrawerOpen } from '../../store/slices/Admin/priceListSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/api/Admin/auth.js';
import { AdminLeftSideBarLinks } from '../../../constant.jsx';
import { setAuthenticated, verifyJwtTokenAsync } from '../../store/slices/Admin/authSlice.js';
import Cookies from 'js-cookie';
import { setMenuChanger, setSearchedValue } from '../../store/slices/Admin/dashobardSlice.js'; // Assuming corrected import

const MiniDrawer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const menu = useSelector((state) => state.dashboardSlice.menuChanger);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
    dispatch(setDrawerOpen(!isOpen));
  };

  const LogoutFunction = () => {
    logout();
    window.location.reload();
  };

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const { isAuthenticated } = useSelector((state) => state.auth);
  const value = !!Cookies.get('accessToken');

  const { userDetial } = useSelector((state) => state.auth);
  const userDetails = localStorage.getItem('data');
  console.log(userDetial)

  let dashboard = [];

  // Check if userDetial and userDetial.data.unsubscribe are defined
  if (userDetial?.data?.view_access) {
    userDetial.data.view_access.forEach((unsubscribeItem) => {
      AdminLeftSideBarLinks.forEach((link) => {
        if (link.SR === unsubscribeItem) {
          dashboard.push(link);
        }
      });
    });
  }

  useEffect(() => {
    // Parse the pathname to get the last segment (parameter) of the URL
    const pathnameSegments = location.pathname.split('/');
    const lastParam = pathnameSegments[pathnameSegments.length - 1];

    // Find the corresponding item in dashboard based on 'to' property matching lastParam
    const selectedItem = dashboard.find((item) => {
      const itemPathSegments = item.to.split('/');
      const itemLastParam = itemPathSegments[itemPathSegments.length - 1];
      return itemLastParam === lastParam;
    });

    if(!userDetails){
      // dispatch(verifyJwtTokenAsync())
    }

    // Update menuChanger state with the label of the selectedItem
    if (selectedItem) {
      dispatch(setMenuChanger(selectedItem.label));
    } 
    else if(lastParam === "Routers" || lastParam === "Switches" || lastParam === "Firewalls" || lastParam === "Wireless" || lastParam === "Ipphones" ){
      dispatch(setMenuChanger("Gallery"));
    }
    else {
      // Handle default or no match case
      dispatch(setMenuChanger("Dashboard")); // Adjust as needed
    }
  }, [location.pathname, dashboard, dispatch,userDetails]);

  useEffect(() => {
    if (value) {
      dispatch(setAuthenticated(true));
    } else {
      dispatch(setAuthenticated(false));
    }
  }, [dispatch, value, isAuthenticated]);

  const handleDrawerOpen = () => {
    setIsOpen(true);
    dispatch(setDrawerOpen(true));
  };

  return (
    <div style={{ width: "100%", top: 0, position: 'sticky', background: 'white' }}>
      {/* Sidebar */}
      <div className={`sidebar bg-white ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header d-flex align-items-center justify-content-between p-1">
          <img src="../src/assets/logo.png" alt="Logo" width={60} />
          <button className="btn btn-link" onClick={handleDrawerToggle}>
            <i className={`bi ${isOpen ? 'bi-arrow-bar-left' : 'bi-arrow-bar-right'}`} />
          </button>
        </div>
        <div className="navbar-vertical-container">
          <div className="navbar-vertical-footer-offset">
            <div className="navbar-vertical-content">
              <div id="navbarVerticalMenu" className="nav nav-pills nav-vertical card-navbar-nav">
                {dashboard.map((dashboardItem) => (
                  <div className="nav-item" key={dashboardItem.label}>
                    <Link className="nav-link" to={dashboardItem.to} onClick={() => dispatch(setMenuChanger(dashboardItem.label))}>
                      <i className={`${dashboardItem.icon} nav-icon`} />
                      <span className="nav-link-title">{dashboardItem.label}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header d-flex align-items-center justify-content-between bg-white p-2 border-bottom"
          style={{
            position: 'sticky',
            zIndex: 1000,
            background: 'white',
            top: 0,
            borderBottom: 'none !important',
          }}>
          <div className="main-content flex-grow-1">
            <div className="navbar-nav-wrap">
              <div className="navbar-nav-wrap-content-start">
                <button
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  style={{
                    color: 'inherit',
                    marginRight: '1rem',
                    display: isOpen ? 'none' : 'inline',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                  }}>
                  <i className="bi bi-arrow-bar-right" />
                </button>
                <h2 className="page-header-title mx-3 mx-lg-0 mb-0">{menu}</h2>
              </div>
              <div className="d-flex navbar-nav-wrap-content-end">
                <div className="dropdown me-2">
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
                        onChange={(e) => dispatch(setSearchedValue(e.target.value.trim()))}
                        data-hs-form-search-options='{
                          "clearIcon": "#clearSearchResultsIcon",
                          "dropMenuElement": "#searchDropdownMenu",
                          "dropMenuOffset": 0,
                          "toggleIconOnFocus": true,
                          "activeClass": "focus"
                        }'
                      />
                      <a className="input-group-append input-group-text" href="javascript:;">
                        <i id="clearSearchResultsIcon" className="bi-x-lg clear_all_icon" style={{ display: "none" }} />
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
                    }'>
                    <i className="bi-search" />
                  </button>
                </div>
                <div className="navbar-nav-wrap">
                  <div className="d-flex navbar-nav-wrap-content-end">
                    <div className="dropdown me-2" onClick={toggleDropdown}>
                      <a
                        className="navbar-dropdown-account-wrapper"
                        href="javascript:;"
                        id="accountNavbarDropdown"
                        aria-expanded={open ? "true" : "false"}
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        data-bs-auto-close="outside"
                        data-bs-dropdown-animation>
                        <div className="avatar avatar-sm avatar-circle">
                          <img className="avatar-img" src="../src/assets/logo.png" alt="" />
                          <span className="avatar-status avatar-sm-status avatar-status-success" />
                        </div>
                      </a>
                      <div
                        className={`dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-account ${open ? "show" : ""}`}
                        aria-labelledby="accountNavbarDropdown">
                        <div className="dropdown-item-text">
                          <div className="d-flex align-items-center">
                            <div className="avatar avatar-sm avatar-circle">
                              <img className="avatar-img" src="../src/assets/logo.png" alt="" />
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h5 className="mb-0">John Doe</h5>
                              <p className="card-text text-body">john@example.com</p>
                            </div>
                          </div>
                        </div>
                        <div className="dropdown-divider" />
                        <Link className="dropdown-item" to="/change/user">
                          Profile & Account
                        </Link>
                        <Link className="dropdown-item" to="/change/dashboard/settings">
                          Settings
                        </Link>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="javascript:;" onClick={LogoutFunction}>
                          Sign Out
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <Outlet />
      </div>
    </div>
  );
};

export default MiniDrawer;
