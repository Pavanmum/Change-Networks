import { useEffect, useState } from "react";
import { fetchCustomerData } from "../../../store/api/Admin/customerList.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedStatus,
  setDownload,
  setSearch,
} from "../../../store/slices/Admin/customerListSlice.js";
import logo from '../../../assets/excel-icon.svg'
const Header = ({ setShowAddStock, setShowEditBox }) => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState([]);
  const Status = useSelector((state) => state.customerListSlice.selectedStatus);
  const selectedBoxData = useSelector(
    (state) => state.customerListSlice.selectedBoxData
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCustomerData();

        const uniqueValues = (key) => [
          ...new Set(response.map((item) => item[key])),
        ];
        setStatus(uniqueValues("partner_type"));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleStatusChange = (event) => {
   
    dispatch(setSelectedStatus(event));
  };
  const handleDownload = () => {
    dispatch(setDownload(true));
  };

  return (
    <div>
      <div className="card-header card-header-content-sm-between">
        <div className="mb-2 mb-md-0">
          <form>
            <div className="input-group input-group-merge input-group-flush">
              <div className="input-group-prepend input-group-text">
                <i className="bi-search"></i>
              </div>
              <input
                id="datatablecustlistSearch"
                type="search"
                className="form-control"
                placeholder="Search users"
                onChange={(e) => dispatch(setSearch(e.target.value))}
              />
            </div>
          </form>
        </div>

        <div className="d-grid d-sm-flex justify-content-md-end align-items-sm-center gap-2">
          <div>
            {selectedBoxData ? (
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-info btn-xs selected_stock_edit me-2"
                  href="javascript:;"
                  onClick={() => setShowEditBox(true)}
                >
                  <i className="bi-pencil"></i>
                </button>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="d-grid d-sm-flex justify-content-md-end align-items-sm-center gap-2">
            <div className="row align-items-center gx-0">
              <div className="col">
                <span className="text-secondary me-2">Status:</span>
              </div>

              <div className="col-auto">
                <div className="">
                  <div className="tom-select-custom  ">
                    <div className="dropdown">
                      <button
                        className=" btn btn-white btn-sm dropdown-toggle w-100 "
                        type="button"
                        id="statusDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {Status ? Status : "All"}
                      </button>
                      <ul
                        role="listbox"
                        className="ts-dropdown-content dropdown-menu"
                        aria-labelledby="statusDropdown"
                        id="tomselect-1-ts-dropdown"
                      >
                        <li
                          data-selectable=""
                          data-value="VIP"
                          className="option"
                          role="option"
                          id="tomselect-1-opt-2"
                          onClick={() => handleStatusChange(null)}
                        >
                          All{" "}
                        </li>
                        {status.map((stock, index) => (
                          <li
                            data-selectable=""
                            data-value="VIP"
                            className="option"
                            role="option"
                            id="tomselect-1-opt-2"
                            onClick={() => handleStatusChange(stock)}
                            key={index}
                            value={stock}
                          >
                            {stock}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dropdown">
            <button
              type="button"
              className="btn btn-white btn-sm dropdown-toggle w-100"
              id="usersExportDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi-download me-2"></i> Export
            </button>

            <div
              className="dropdown-menu dropdown-menu-sm-end"
              aria-labelledby="usersExportDropdown"
            >
              <span className="dropdown-header">Download options</span>
              <a
                id="export-excel"
                className="dropdown-item"
                onClick={handleDownload}
              >
                <img
                  className="avatar avatar-xss avatar-4x3 me-2"
                  src={logo}
                  alt=""
                />
                Excel
              </a>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-white btn-sm"
            id=""
            data-bs-toggle="modal"
            data-bs-target="#addCustomerModal"
            onClick={() => setShowAddStock(true)}
          >
            <i className="bi-plus me-1"></i> Add List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
