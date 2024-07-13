import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedStatus,
  setDownload,
  setYear,
  setSelectedBoxData,
  setReload,
} from "../../../store/slices/Admin/salesMatrixSlice";
import {
  getSalesData,
  handleDeleteSales,
} from "../../../store/api/Admin/salesMatrix.js";
import { toast } from "react-toastify";
import logo from '../../../assets/excel-icon.svg'
const Header = ({ setAddSales, setEditSalesMatrix }) => {
  const dispatch = useDispatch();
  const selectedStatus = useSelector(
    (state) => state.salesMatrixSlice.selectedStatus
  );
  const selectedBoxData = useSelector(
    (state) => state.salesMatrixSlice.selectedBoxData
  );
  const reload = useSelector((state) => state.salesMatrixSlice.reload);
  const [uniqueYears, setUniqueYears] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getSalesData();
      const years = [...new Set(res.map((item) => item.year))];
      setUniqueYears(years);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };
  useEffect(()=>{
    if(reload){
      fetchData();
    }
  })
  useEffect(() => {
    fetchData();
  }, []); // Only run once on mount
  // Empty array means this useEffect runs only once when the component mounts

  const handleYearChange = (event) => {
    dispatch(setYear(event.target.value));
  };
  const handleCheckboxChange = (statusKey) => {
    let updatedStatus;
    if (statusKey === "All") {
      const newValue = !selectedStatus.All;
      updatedStatus = {
        ...selectedStatus,
        All: newValue,
        Q1: newValue,
        Q2: newValue,
        Q3: newValue,
        Q4: newValue,
      };
    } else {
      updatedStatus = {
        ...selectedStatus,
        [statusKey]: !selectedStatus[statusKey],
      };
      const allChecked =
        updatedStatus.Q1 &&
        updatedStatus.Q2 &&
        updatedStatus.Q3 &&
        updatedStatus.Q4;
      updatedStatus.All = allChecked;
    }

    if (JSON.stringify(selectedStatus) !== JSON.stringify(updatedStatus)) {
      dispatch(setSelectedStatus(updatedStatus));
    }
  };
  const handleDelete = async () => {
    if (!selectedBoxData || selectedBoxData.length === 0) {
      toast.error("Please select a checkbox");
      return;
    }

    try {
      // Extract the _id from each object in selectedBoxData
      const ids = selectedBoxData.map((item) => item._id);

      // Assuming handleDeleteSales takes an array of ids or a single id
      const res = await handleDeleteSales(ids);

      if (res) {
        toast.success("Data deleted successfully");
        fetchData();
        dispatch(setSelectedBoxData([]))
        setTimeout(() => {
          dispatch(setReload(true)); // Reload the page after 1 second
        }, 100);
        // Handle additional success logic if needed
      } else {
        toast.error("Failed to delete data");
      }

      return res;
    } catch (error) {
      // Handle error scenario
      console.error("Error deleting data:", error);
      toast.error("An error occurred while deleting data");
    }
  };
  // Automatically update "All" checkbox based on Q1, Q2, Q3, Q4 statuses
  useEffect(() => {
    const allChecked =
      selectedStatus.Q1 &&
      selectedStatus.Q2 &&
      selectedStatus.Q3 &&
      selectedStatus.Q4;
    if (selectedStatus.All !== allChecked) {
      dispatch(setSelectedStatus({ ...selectedStatus, All: allChecked }));
    }
  }, [
    selectedStatus.Q1,
    selectedStatus.Q2,
    selectedStatus.Q3,
    selectedStatus,
    selectedStatus.Q4,
    selectedStatus.All,
    dispatch,
  ]);

  return (
    <div className="card-header card-header-content-sm-between px-3 py-1 border-bottom">
      <div className="mb-2 mb-sm-0 d-flex">
        <div className="form-check form-check-inline me-1 conditionChk">
          <input
            type="checkbox"
            id="qAll"
            className="form-check-input"
            value="all"
            checked={selectedStatus.All}
            onChange={() => handleCheckboxChange("All")}
            style={{ marginTop: 5 }}
          />
          <label className="form-check-label" htmlFor="qAll">
            All
          </label>
        </div>
        <div className="form-check form-check-inline me-1 conditionChk">
          <input
            type="checkbox"
            name="cond-check"
            id="q1"
            className="form-check-input"
            value="q1"
            checked={selectedStatus.Q1}
            onChange={() => handleCheckboxChange("Q1")}
            style={{ marginTop: 5 }}
          />
          <label className="form-check-label" htmlFor="q1">
            Q1
          </label>
        </div>
        <div className="form-check form-check-inline me-1 conditionChk">
          <input
            type="checkbox"
            name="cond-check"
            id="q2"
            className="form-check-input"
            value="q2"
            checked={selectedStatus.Q2}
            onChange={() => handleCheckboxChange("Q2")}
            style={{ marginTop: 5 }}
          />
          <label className="form-check-label" htmlFor="q2">
            Q2
          </label>
        </div>
        <div className="form-check form-check-inline me-1 conditionChk">
          <input
            type="checkbox"
            name="cond-check"
            id="q3"
            className="form-check-input"
            value="q3"
            checked={selectedStatus.Q3}
            onChange={() => handleCheckboxChange("Q3")}
            style={{ marginTop: 5 }}
          />
          <label className="form-check-label" htmlFor="q3">
            Q3
          </label>
        </div>
        <div className="form-check form-check-inline me-1 conditionChk">
          <input
            type="checkbox"
            name="cond-check"
            id="q4"
            className="form-check-input"
            value="q4"
            checked={selectedStatus.Q4}
            onChange={() => handleCheckboxChange("Q4")}
            style={{ marginTop: 5 }}
          />
          <label className="form-check-label" htmlFor="q4">
            Q4
          </label>
        </div>
        <div className="tom-select-custom ">
          <select
            name="filter_brand"
            className="form-select"
            onChange={handleYearChange}
            style={{ marginTop: -5 }}
          >
            <option value="">Year</option>
            {uniqueYears.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="d-grid d-sm-flex justify-content-sm-end align-items-sm-center gap-2">
        {selectedBoxData.length > 0 && (
          <div id="datatableCounterInfo">
            <div className="d-flex align-items-center">
              <a
                className="btn btn-outline-primary btn-xs me-2 sales_matrix_edit_btn"
                href="javascript:;"
                data-bs-toggle="modal"
                data-bs-target="#editSalesMatrixModal"
                onClick={() => setEditSalesMatrix(true)}
              >
                <i className="bi bi-pencil"></i>
              </a>
              <a
                className="btn btn-outline-danger btn-xs sales_delete_btn"
                href="javascript:;"
                onClick={() => handleDelete()}
              >
                <i className="bi bi-trash3"></i>
              </a>
            </div>
          </div>
        )}

        <div className="col-md">
          <button
            type="button"
            className="btn btn-white btn-xs w-100"
            id=""
            data-bs-toggle="modal"
            data-bs-target="#addSalesMatrixModal"
            onClick={() => setAddSales(true)}
          >
            <i className="bi-plus me-1"></i> Add Sales
          </button>
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
            <a
              id="export-excel"
              className="dropdown-item"
              href="javascript:;"
              onClick={() => dispatch(setDownload(true))}
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
      </div>
    </div>
  );
};

export default Header;
