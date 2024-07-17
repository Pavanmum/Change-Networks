import { Link } from "react-router-dom";
import {
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
} from "reactstrap";
const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light nav-down"
      style={{ transition: "top 0.2s ease-in-out" }}
    >
      <div className="container-fluid">
        <div className="logo">
          <Link to="/">
            <img
              src="https://change-networks.com/public/front_assets/img/logo.png"
              alt="logo"
              width={50}
            />
          </Link>
        </div>
        <div
          className="gallery-search header__search"
          style={{ display: "none" }}
        >
          <form className="search-form">
            <div className="pos-relative">
              <input
                type="text"
                placeholder="Search"
                id="gallerySearch"
                className="ui-autocomplete-input ui-autocomplete-loading"
                autoComplete="off"
              />
              <span
                className="search_clear js-clearSearchBox"
                style={{ display: "none" }}
              >
                ×
              </span>
            </div>
            <button>
              <i className="fal fa-search" />
            </button>
          </form>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          style={{ background: "rgb(248, 249, 250)" }}
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarcmd"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                COMMANDO
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarcmd">
                <a
                  className="dropdown-item"
                  href="https://www.commandonetworks.com/switches"
                  target="_blank"
                >
                  Switches
                </a>
                <a
                  className="dropdown-item"
                  href="https://www.commandonetworks.com/wireless"
                  target="_blank"
                >
                  Wireless
                </a>
                <a
                  className="dropdown-item"
                  href="https://www.commandonetworks.com/routers"
                  target="_blank"
                >
                  Routers
                </a>
                <a
                  className="dropdown-item"
                  href="https://www.commandonetworks.com/network-modules"
                  target="_blank"
                >
                  Network Modules
                </a>
                <a
                  className="dropdown-item"
                  href="https://www.commandonetworks.com/media-converters"
                  target="_blank"
                >
                  Media Converters
                </a>
                <a
                  className="dropdown-item"
                  href="https://www.commandonetworks.com/transceiver-modules"
                  target="_blank"
                >
                  Transceiver Modules
                </a>
                <a
                  className="dropdown-item"
                  href="https://www.commandonetworks.com/accessories"
                  target="_blank"
                >
                  Networking Accessories
                </a>
              </div>
            </li>

            <li className="nav-item">
              <Link to="/ciscoGPL" className="nav-link">
                CISCO GPL
              </Link>
            </li>
            <li className="nav-item">
              <UncontrolledDropdown className="button-dropdown">
                <DropdownToggle
                  caret
                  data-toggle="dropdown"
                  href="#pablo"
                  id="navbarDropdown"
                  tag="a"
                  onClick={(e) => e.preventDefault()}
                  
                >
                  Company
                </DropdownToggle>
                <DropdownMenu
                  aria-labelledby="navbarDropdown"
                  style={{
                    border: "1px solid grey",
                    borderRadius: "3px",
                    marginTop: "10px",
                    display:"flex",
                    padding:'10px'
                  }}
                >
                  <Link to="/about " >About</Link>
                  <Link to="/awards" style={{paddingTop:'10px'}}>Awards</Link>
                  <Link to="/career" style={{paddingTop:'10px'}}>Career</Link>
                  <Link to="/contact" style={{paddingTop:'10px'}}>
                  Contact
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
            </li>
            <li className="nav-item">
              <Link to="/gallery" className="nav-link">
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/gallery" className="nav-link">
                <i className="la la-user" /> Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/career" className="nav-link">
                We're Hiring!
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/gallery" className="nav-link">
                Schedule Meeting
              </Link>
            </li>
          </ul>
        </div>
        <div className="others-option">
          <div className="d-flex align-items-center">
            <div className="option-item">
              <ul className="social-icon">
                <li>
                  <a
                    href="https://change-networks.com/stripe-payment"
                    target="_blank"
                  >
                    <img
                      src="https://change-networks.com/assets/img/stripe-logo.png"
                      style={{ height: 56, width: 108, marginLeft: "-14px" }}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
