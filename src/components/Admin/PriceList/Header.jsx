import { useEffect, useState } from "react";
import {
  fetchProductData,
  deleteProductData,
} from "../../../store/api/Admin/priceList.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setBrands as setBrandsAction,
  setCategories as setCategoriesAction,
  setConditions as setConditionsAction,
  setLocation as setLocationAction,
  setProducts,
  setSeries as setSeriesAction,
  setStocks as setStocksAction,
  toggleCheckbox,
  setDownload,
} from "../../../store/slices/Admin/priceListSlice.js";
import logo from '../../../assets/excel-icon.svg'
const Header = ({ setShowCloneBox, setShowEditBox, setShowAddStock,setHandleReload }) => {
  const dispatch = useDispatch();

  const [brands, setBrandsState] = useState([]);
  const [locations, setLocationsState] = useState([]);
  const [stocks, setStocksState] = useState([]);
  const [conditions, setConditionsState] = useState([]);
  const [categories, setCategoriesState] = useState([]);
  const [series, setSeriesState] = useState([]);
  const checkBoxData = useSelector(
    (state) => state.priceListSlice.selectedBoxData
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProductData();
        dispatch(setProducts(response));

        const uniqueValues = (key) => [
          ...new Set(response.map((item) => item[key])),
        ];

        setBrandsState(uniqueValues("brand"));
        setLocationsState(uniqueValues("ex_work"));
        setStocksState(uniqueValues("stock_status"));
        setConditionsState(uniqueValues("condition_status"));
        setCategoriesState(uniqueValues("category"));
        setSeriesState(uniqueValues("series"));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [dispatch]);
  const handleBrandChange = (event) => {
    dispatch(setBrandsAction(event.target.value));
  };

  const handleLocationChange = (event) => {
    dispatch(setLocationAction(event.target.value));
  };

  const handleStockChange = (event) => {
    dispatch(setStocksAction(event.target.value));
  };

  const handleConditionChange = (event) => {
    dispatch(setConditionsAction(event.target.value));
  };

  const handleCategoryChange = (event) => {
    dispatch(setCategoriesAction(event.target.value));
  };

  const handleSeriesChange = (event) => {
    dispatch(setSeriesAction(event.target.value));
  };
  const handleDelete = async () => {
    const ObjectId = checkBoxData._id;
    const response = await deleteProductData(ObjectId);
    if (response) {
      toast.success("Successfully product deleted");
      setHandleReload(true);
    }
  };
  const handleCheckboxToggle = (checkboxName) => {
    dispatch(toggleCheckbox(checkboxName));
  };

  return (
    <div className="card-header card-header-content-sm-between px-2 py-1 justify-content-evenly border-bottom bg-white ">
      <div className="mb-2 mb-sm-0 d-flex gx-5 justify-content-evenly">
        <div className="tom-select-custom ">
          <label className="form-check-label small">Brand</label>
          <select
            name="filter_brand"
            className="form-select"
            onChange={handleBrandChange}
          >
            <option value="">All</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="tom-select-custom ml-2">
          <label className="form-check-label small">Location</label>
          <select
            name="filter_location"
            className="form-select"
            onChange={handleLocationChange}
          >
            <option value="">All</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="tom-select-custom ml-2">
          <label className="form-check-label small">Stock</label>
          <select
            name="filter_stock_status"
            className="form-select"
            onChange={handleStockChange}
          >
            <option value="">All</option>
            {stocks.map((stock, index) => (
              <option key={index} value={stock}>
                {stock}
              </option>
            ))}
          </select>
        </div>

        <div className="tom-select-custom ml-2">
          <label className="form-check-label small">Condition</label>
          <select
            name="filter_condition"
            className="form-select"
            onChange={handleConditionChange}
          >
            <option value="">All</option>
            {conditions.map((condition, index) => (
              <option key={index} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>

        <div className="tom-select-custom ml-2">
          <label className="form-check-label small">Category</label>
          <select
            name="filter_category"
            className="form-select"
            onChange={handleCategoryChange}
          >
            <option value="">All</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="tom-select-custom ml-2">
          <label className="form-check-label small">Series</label>
          <select
            name="filter_series"
            className="form-select"
            onChange={handleSeriesChange}
          >
            <option value="">All</option>
            {series.map((s, index) => (
              <option key={index} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        {checkBoxData ? (
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-info btn-xs selected_copy_edit me-2"
              href="javascript:;"
              onClick={() => setShowCloneBox(true)}
            >
              <i className="bi bi-copy"></i>
            </button>
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
      </div>
      <div className="d-flex justify-content-evenly">
        <div className="col-md">
          <button
            type="button"
            className="btn btn-white btn-xs "
            data-bs-toggle="modal"
            data-bs-target="#addStockModal"
            onClick={() => setShowAddStock(true)}
          >
            <i className="bi-plus me-1"></i> Add Stock
          </button>
        </div>

        <div className="dropdown">
          <button
            type="button"
            className="btn btn-white btn-xs dropdown-toggle "
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
            className="dropdown-menu dropdown-menu-end  dropdown-card"
            aria-labelledby="showHideDropdown"
            style={{ width: "15rem" }}
          >
            <div className=" card-sm " style={{ opacity: 1 }}>
              <div className="card-body">
                <div className="d-grid gap-3 toggleColumn ">
                  {/* Repeated checkbox elements */}
                  <label className=" form-check form-switch" htmlFor="column0">
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
                  <label className=" form-check form-switch" htmlFor="column1">
                    <span className="col-8 col-sm-9 ms-0">
                      <span className="me-2" style={{ marginLeft: "-120px" }}>
                        Brand
                      </span>
                    </span>
                    <span className="col-4 col-sm-3 text-end">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="column1"
                        onChange={() => handleCheckboxToggle("Brand")}
                        defaultChecked
                        style={{
                          width: "35px",
                          height: "20px",
                          marginLeft: "63px",
                        }}
                      />
                    </span>
                  </label>
                  <label className=" form-check form-switch" htmlFor="column2">
                    <span className="col-8 col-sm-9 ms-0">
                      <span className="me-2" style={{ marginLeft: "-105px" }}>
                        Ex Work
                      </span>
                    </span>
                    <span className="col-4 col-sm-3 text-end">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="column2"
                        defaultChecked
                        onChange={() => handleCheckboxToggle("Location")}
                        style={{
                          width: "35px",
                          height: "20px",
                          marginLeft: "50px",
                        }}
                      />
                    </span>
                  </label>
                  <label className=" form-check form-switch" htmlFor="column3">
                    <span className="col-8 col-sm-9 ms-0">
                      <span className="me-2" style={{ marginLeft: "-120px" }}>
                        Stock
                      </span>
                    </span>
                    <span className="col-4 col-sm-3 text-end">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="column3"
                        onChange={() => handleCheckboxToggle("stock")}
                        defaultChecked
                        style={{
                          width: "35px",
                          height: "20px",
                          marginLeft: "65px",
                        }}
                      />
                    </span>
                  </label>
                  <label className=" form-check form-switch" htmlFor="column4">
                    <span className="col-8 col-sm-9 ms-0">
                      <span className="me-2" style={{ marginLeft: "-100px" }}>
                        Condition
                      </span>
                    </span>
                    <span className="col-4 col-sm-3 text-end">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="column4"
                        onChange={() => handleCheckboxToggle("condition")}
                        defaultChecked
                        style={{
                          width: "35px",
                          height: "20px",
                          marginLeft: "42px",
                        }}
                      />
                    </span>
                  </label>
                  <label className=" form-check form-switch" htmlFor="column5">
                    <span className="col-8 col-sm-9 ms-0">
                      <span className="me-2" style={{ marginLeft: "-100px" }}>
                        Category
                      </span>
                    </span>
                    <span className="col-4 col-sm-3 text-end">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="column5"
                        onChange={() => handleCheckboxToggle("category")}
                        defaultChecked
                        style={{
                          width: "35px",
                          height: "20px",
                          marginLeft: "45px",
                        }}
                      />
                    </span>
                  </label>
                  <label className=" form-check form-switch" htmlFor="column6">
                    <span className="col-8 col-sm-9 ms-0">
                      <span className="me-2" style={{ marginLeft: "-120px" }}>
                        Series
                      </span>
                    </span>
                    <span className="col-4 col-sm-3 text-end">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="column6"
                        onChange={() => handleCheckboxToggle("series")}
                        defaultChecked
                        style={{
                          width: "35px",
                          height: "20px",
                          marginLeft: "65px",
                        }}
                      />
                    </span>
                  </label>
                  <label className=" form-check form-switch" htmlFor="column7">
                    <span className="col-8 col-sm-9 ms-0">
                      <span className="me-2" style={{ marginLeft: "-135px" }}>
                        Qty
                      </span>
                    </span>
                    <span className="col-4 col-sm-3 text-end">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="column7"
                        onChange={() => handleCheckboxToggle("qty")}
                        defaultChecked
                        style={{
                          width: "35px",
                          height: "20px",
                          marginLeft: "80px",
                        }}
                      />
                    </span>
                  </label>
                  <label className=" form-check form-switch" htmlFor="column9">
                    <span className="col-8 col-sm-9 ms-0">
                      <span className="me-2" style={{ marginLeft: "-80px" }}>
                        Description
                      </span>
                    </span>
                    <span className="col-4 col-sm-3 text-end">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="column9"
                        onChange={() => handleCheckboxToggle("description")}
                        defaultChecked
                        style={{
                          width: "35px",
                          height: "20px",
                          marginLeft: "25px",
                        }}
                      />
                    </span>
                  </label>
                  <label className=" form-check form-switch" htmlFor="column15">
                    <span className="col-8 col-sm-9 ms-0">
                      <span className="me-2" style={{ marginLeft: "-110px" }}>
                        Remark
                      </span>
                    </span>
                    <span className="col-4 col-sm-3 text-end">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="column15"
                        onChange={() => handleCheckboxToggle("remark")}
                        defaultChecked
                        style={{
                          width: "35px",
                          height: "20px",
                          marginLeft: "55px",
                        }}
                      />
                    </span>
                  </label>
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
