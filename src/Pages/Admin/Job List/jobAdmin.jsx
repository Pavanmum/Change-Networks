import { useEffect } from "react";
import "../../../assets/Admin/custom.css";
import "../../../assets/Admin/theme.min.css";
import "../../../assets/Admin/theme.minc619.css";
import "../../../assets/Admin/vendor.min.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobDescriptionAsync } from "../../../store/slices/careerSlice";
import JobTable from "./column";
import { Link } from "react-router-dom";







const JobAdmin = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.careerSlice)
  console.log(data.data)
  useEffect(() => {
    dispatch(fetchAllJobDescriptionAsync())
  }, [dispatch])
  return (
    <div >
<div className>

  <div className="card-header card-header-content-sm-between px-3 py-1 border-bottom">
    <div className="mb-2 mb-sm-0">
  
    </div>
    <div className="d-grid d-sm-flex justify-content-sm-end align-items-sm-center gap-2">
      <div id="datatableCounterInfo" style={{display: 'none'}}>
        <div className="d-flex align-items-center">
          <span className="fs-6 me-3">
            <span id="datatableCounter">0</span>
            Selected
          </span>
          <a className="btn btn-outline-danger btn-xs" href="javascript:;">
            <i className="tio-delete-outlined" /> Delete
          </a>
        </div>
      </div>
      <div className="col-md">
        <Link to='/change/add_job' className="btn btn-white btn-xs w-100" style={{
          
        }} id>
          <i className="bi-plus me-1" /> Add Job
        </Link>
      </div>
      <div className="dropdown">
        <button type="button" className="btn btn-white btn-xs dropdown-toggle w-100" id="usersExportDropdown" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="bi-download me-2" /> Export
        </button>
        <div className="dropdown-menu dropdown-menu-sm-end" aria-labelledby="usersExportDropdown">
          <span className="dropdown-header">Options</span>
          <a id="export-copy" className="dropdown-item" href="javascript:;">
            <img className="avatar avatar-xss avatar-4x3 me-2" src="assets/svg/illustrations/copy-icon.svg" alt />
            Copy
          </a>
          <a id="export-print" className="dropdown-item" href="javascript:;">
            <img className="avatar avatar-xss avatar-4x3 me-2" src="assets/svg/illustrations/print-icon.svg" alt />
            Print
          </a>
          <div className="dropdown-divider" />
          <span className="dropdown-header">Download options</span>
          <a id="export-excel" className="dropdown-item" href="javascript:;">
            <img className="avatar avatar-xss avatar-4x3 me-2" src="assets/svg/brands/excel-icon.svg" alt />
            Excel
          </a>
          <a id="export-csv" className="dropdown-item" href="javascript:;">
            <img className="avatar avatar-xss avatar-4x3 me-2" src="assets/svg/components/placeholder-csv-format.svg" alt />
            .CSV
          </a>
          <a id="export-pdf" className="dropdown-item" href="javascript:;">
            <img className="avatar avatar-xss avatar-4x3 me-2" src="assets/svg/brands/pdf-icon.svg" alt />
            PDF
          </a>
        </div>
      </div>
    </div>
  </div>
  <JobTable jobs={data?.data?.job} />
  {/* End Table */}
</div>

    </div>
  )
}

export default JobAdmin