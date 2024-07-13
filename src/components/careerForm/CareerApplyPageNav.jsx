

const CareerApplyPageNav = () => {
  return (
    <div><nav className="navbar navbar-expand-lg navbar-light bg-light p-0">
    <div className="container">
      <div className="logo">
        <a className="navbar-brand" href="https://change-networks.com/">
          <img
            src="https://change-networks.com/public/front_assets/img/logo.png"
            alt="CHANGE Networks"
            width={50}
          />
        </a>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Jobs <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </li>
        </ul>

        <div className="navbar-nav nI-gNb-search-bar">
          <div className="nI-gNb-sb__main">
            <span className="nI-gNb-sb__placeholder">Search jobs here</span>
            <button className="nI-gNb-sb__icon-wrapper" tabIndex={0}>
              <span className="ni-gnb-icn ni-gnb-icn-search" />
            </button>
          </div>
        </div>
        <div className="nI-gNb-drawer dropdown">
          <div
            className="nI-gNb-drawer__icon dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div className="nI-gNb-drawer__bars">
              <div className="nI-gNb-bar1" />
              <div className="nI-gNb-bar2" />
              <div className="nI-gNb-bar3" />
            </div>
            <div className="nI-gNb-drawer__icon-img-wrapper">
              <img
                className="nI-gNb-icon-img"
                src="https://lh3.googleusercontent.com/a/ACg8ocK6L4MWw5RIVNdkkJuIQQAFvfOj0PT_knaY2Lz_-BeZMpkuCA=s96-c"
              />
            </div>
          </div>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a
              className="dropdown-item"
              href="https://change-networks.com/career/my_profile"
            >
              <i className="fal fa-user-cog" /> My Profile
            </a>
            <a
              className="dropdown-item"
              href="https://change-networks.com/career"
            >
              <i className="fal fa-user-md" /> Careers
            </a>
            <a
              className="dropdown-item"
              href="JavaScript:void(0)"
              data-tab="tab-my-jobs"
            >
              <i className="fal fa-heart" /> Applied Jobs
            </a>
            <a
              className="dropdown-item"
              href="https://change-networks.com/career/logout"
            >
              <i className="fal fa-sign-out" /> Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav></div>
  )
}

export default CareerApplyPageNav