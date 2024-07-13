import { deleteProductData } from "../../../store/api/Admin/weightList.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  toggleCheckbox,
  setDownload,
  setSelectedBoxData
} from "../../../store/slices/Admin/weightListSlice.js";
import logo from '../../../assets/excel-icon.svg'
const Header = ({ setShowAddStock, setShowEditBox ,setHandleReload}) => {
  const dispatch = useDispatch();
  const checkBoxData = useSelector(
    (state) => state.weightListSlice.selectedBoxData
  );
  const handleDelete = async () => {
    const ObjectId = checkBoxData._id;
    const response = await deleteProductData(ObjectId);
    if (response) {
      toast.success("Successfully product deleted");
      setHandleReload(true);
      dispatch(setSelectedBoxData(''))
    }
  };

  const handleCheckboxToggle = (checkboxName) => {
    dispatch(toggleCheckbox(checkboxName));
  };
  return (
    <div className="card-header card-header-content-sm-between px-2 py-1 justify-content-between border-bottom bg-white ">
      <div className="mb-2 mb-sm-0 d-flex gx-5 "></div>
      <div className="d-flex">
        {checkBoxData ? (
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-info btn-xs selected_stock_edit me-2"
              href="javascript:;"
              onClick={() => setShowEditBox(true)}
            >
              <i className="bi-pencil"></i>
            </button>
            <button
              className="btn btn-outline-danger btn-xs stock_delete_btn"
              href="javascript:;"
              onClick={handleDelete}
            >
              <i className="bi-trash"></i>
            </button>
          </div>
        ) : (
          ""
        )}

        <div className="d-flex justify-content-evenly">
          <div className="col-md">
            <button
              type="button"
              className="btn btn-white btn-xs"
              data-bs-toggle="modal"
              data-bs-target="#addStockModal"
              onClick={() => setShowAddStock(true)}
            >
              <i className="bi-plus me-1"></i> Add Weight
            </button>
          </div>

          <div className="dropdown">
            <button
              type="button"
              className="btn btn-white btn-xs dropdown-toggle"
              id="usersExportDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi-download me-2"></i> Download
            </button>

            <div
              className="dropdown-menu dropdown-menu-sm-end"
              aria-labelledby="usersExportDropdown"
              onClick={() => dispatch(setDownload(true))}
            >
              <span className="dropdown-header">Download options</span>
              <a id="export-excel" className="dropdown-item" href="#">
                <img
                  className="avatar avatar-xss avatar-4x3 me-2"
                  src={logo}
                  alt="Excel"
                />
                Excel
              </a>
            </div>
          </div>

          <div className="dropdown nav-scroller-dropdown">
            <button
              type="button"
              className="btn btn-white btn-icon btn-xs"
              id="profileDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi-table"></i>
            </button>

            <div
              className="dropdown-menu dropdown-menu-end dropdown-card"
              aria-labelledby="profileDropdown"
              style={{ width: "15rem" }}
            >
              <div className="card card-sm" style={{ opacity: 1 }}>
                <div className="card-body">
                  <div className="d-grid gap-3 toggleColumn">
                    {/* Check Box Toggle */}
                    <label className="form-check form-switch" htmlFor="column0">
                      <span className="col-8 col-sm-9 ms-0">
                        <span className="me-2" style={{ marginLeft: "-90px" }}>
                          Check Box
                        </span>
                      </span>
                      <span className="col-4 col-sm-3 text-end">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="column0"
                          defaultChecked
                          onChange={() => handleCheckboxToggle("checkBox")}
                          style={{
                            width: "35px",
                            height: "20px",
                            marginLeft: "33px",
                          }}
                        />
                      </span>
                    </label>

                    {/* Brand Toggle */}
                    <label className="form-check form-switch" htmlFor="column1">
                      <span className="col-8 col-sm-9 ms-0">
                        <span className="me-2" style={{ marginLeft: "-90px" }}>
                          Wight (KG)
                        </span>
                      </span>
                      <span className="col-4 col-sm-3 text-end">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="column1"
                          onChange={() => handleCheckboxToggle("weightKG")}
                          defaultChecked
                          style={{
                            width: "35px",
                            height: "20px",
                            marginLeft: "32px",
                          }}
                        />
                      </span>
                    </label>
                    <label className="form-check form-switch" htmlFor="column2">
                      <span className="col-8 col-sm-9 ms-0">
                        <span className="me-2" style={{ marginLeft: "-80px" }}>
                          Weight (LBS)
                        </span>
                      </span>
                      <span className="col-4 col-sm-3 text-end">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="column2"
                          defaultChecked
                          onChange={() => handleCheckboxToggle("weightLBS")}
                          style={{
                            width: "35px",
                            height: "20px",
                            marginLeft: "20px",
                          }}
                        />
                      </span>
                    </label>

                    {/* Stock Toggle */}
                    <label className="form-check form-switch" htmlFor="column3">
                      <span className="col-8 col-sm-9 ms-0">
                        <span className="me-2" style={{ marginLeft: "-90px" }}>
                          Dimension
                        </span>
                      </span>
                      <span className="col-4 col-sm-3 text-end">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="column3"
                          onChange={() => handleCheckboxToggle("dimension")}
                          defaultChecked
                          style={{
                            width: "35px",
                            height: "20px",
                            marginLeft: "33px",
                          }}
                        />
                      </span>
                    </label>

                    {/* Condition Toggle */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
