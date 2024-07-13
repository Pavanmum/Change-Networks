import  { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setDownload,
  setSearch,
} from "../../../store/slices/Admin/emailMatrixSlice.js";
import logo from '../../../assets/excel-icon.svg'
const Header = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(false);
  const searchBoxRef = useRef(null);

  const handleSearchClick = () => {
    setShowSearchBox(true);
  };

  const handleDownloadClick = (type) => {
    dispatch(setDownload(type));
  };

  const handleTextareaChange = (e) => {
    setSearchText(e.target.value);
    dispatch(setSearch(e.target.value));
  };

  // Close the search box when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setShowSearchBox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBoxRef]);

  return (
    <div className="card-header card-header-content-sm-between px-3 py-1 border-bottom">
      <div className="mb-2 mb-sm-0">
        {/* You can add any other elements here if needed */}
      </div>
      <div className="d-grid d-sm-flex justify-content-sm-end align-items-sm-center gap-2">
        <div className="mr-1 pos-relative" ref={searchBoxRef}>
          <div
            className="search_view_btn SubtleIconButton pointer pt-1 pr-3 p-2"
            aria-label="Ctrl + k"
            onClick={handleSearchClick}
          >
            <i className="bi-search"></i>
          </div>
          <div
            className={`search_view_box ${
              showSearchBox ? "search_view_box-open" : ""
            }`}
            style={{ display: showSearchBox ? "block" : "none" }}
          >
            <form
              className="w-100 gpl_bulksearch_form pos-relative"
              role="form"
              autoComplete="off"
              name="search"
            >
              <textarea
                className="form-control"
                name="email_list"
                id="partnum-list"
                placeholder="Search"
                required
                rows="7"
                value={searchText}
                onChange={handleTextareaChange}
              />
              <button
                type="button"
                className="email-search searchviewbox_search_btn bi-search"
                onClick={() => dispatch(setSearch(searchText))}
              >
                <div className="Icon MagnifyerIcon" />
              </button>
              <button
                type="button"
                className="email-reset-search searchviewbox_reset_btn"
                style={{ display: searchText ? "block" : "none" }}
                onClick={() => setSearchText("")}
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </form>
          </div>
        </div>

        <div className="dropdown">
          <button
            type="button"
            className="btn btn-white btn-xs dropdown-toggle w-100"
            id="usersExportDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi-download me-2"></i> Download
          </button>

          <div
            className="dropdown-menu dropdown-menu-sm-end"
            aria-labelledby="usersExportDropdown"
          >
            <span className="dropdown-header">Download options</span>
            <button
              className="dropdown-item customer-export-excel"
              onClick={() => handleDownloadClick("emails_count")}
            >
              <img
                className="avatar avatar-xss avatar-4x3 me-2"
                src={logo}
                alt=""
              />
              Emails Counts Excel
            </button>
            <button
              className="dropdown-item customer-export-excel"
              onClick={() => handleDownloadClick("all")}
            >
              <img
                className="avatar avatar-xss avatar-4x3 me-2"
                src={logo}
                alt=""
              />
              Emails Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
