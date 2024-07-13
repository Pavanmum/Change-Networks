
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <div>
      <div className="main-container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="logo">
              <Link to="/">
                <img
                  src="https://www.change-networks.com/public/front_assets/img/logo.png"
                  alt="logo"
                  width="50"
                />
              </Link>
            </div>

            <div className="others-option">
              <div className="d-flex align-items-center">
                <div className="option-item">
                  <ul className="social-icon">
                    <li>
                      <Link to="/">
                        <i className="las la-home"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="hero">
          <center>
            <h1>Cisco Price List</h1>
            <p>Effective: Aug 27, 2023</p>
            <p>
              Most Accurate, Latest and Fastest Cisco Global Price List Search
            </p>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Nav;
