import { useState, useEffect } from "react";
import { AddProductData } from "../../../store/api/Admin/promotion.js";
import { toast } from "react-toastify";
import { selectUserDetail } from "../../../store/slices/Admin/authSlice.js";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";
const AddStock = ({ setShowAddStock ,setHandleReload}) => {
  const product = useSelector((state) => state.promotionSlice.products);
  const  userDetial = useSelector(selectUserDetail);
  const [brands, setBrandsState] = useState([]);
  const [locations, setLocationsState] = useState([]);
  const [type, setTypeState] = useState([]);
  const [conditions, setConditionsState] = useState([]);
  const [categories, setCategoriesState] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("COMMANDO");
  const [selectedLocations, setSelectedLocations] = useState("China");
  const [selectedType, setSelectedType] = useState("Ready");
  const [selectedCategories, setSelectedCategories] = useState("Wireless");
  const [selectedConditions, setSelectedConditions] = useState("New");
  const [selectedAvailability, setSelectedAvailability] = useState("Few");
  const [model, setModelState] = useState("");
  const [price, setPrice] = useState();
  const [availability, setAvailability] = useState("Few");

  // Define state variables for quantity, description, and remark
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState("");
  const [remark, setRemark] = useState("");
  const [activeTab, setActiveTab] = useState("upload");
  console.log(product);
  useEffect(() => {
    if (product.length > 0) {
      const uniqueValues = (key) => [
        ...new Set(product.map((item) => item[key])),
      ];
      setBrandsState(uniqueValues("brand"));
      setLocationsState(uniqueValues("ex_work"));
      setTypeState(uniqueValues("type"));
      setConditionsState(uniqueValues("condition_status"));
      setCategoriesState(uniqueValues("category"));
      setAvailability(uniqueValues("availability"));
    }
  }, [product]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const excelToJson = (file) => {
    return new Promise((resolve, reject) => {
      if (!file || !(file instanceof File)) {
        reject(new Error("Invalid file object"));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet_name_list = workbook.SheetNames;
        const json = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheet_name_list[0]]
        );
        resolve(json);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };
  const handlefileSubmit = async (file) => {
    try {
      const jsonData = await excelToJson(file);
      const data ={
        jsonData,
        created_by:userDetial.data.user_id || userDetial.data.email
      }
      const response = await AddProductData(data);
      if (response) {
        setHandleReload(true)
      }
      setShowAddStock(false);
      toast.success("Successfully product added");
      document.getElementById("excel_file").value = "";
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prevent default form submission
    try {
      const AddStock = {
        model_no: model,
        description: description,
        category: selectedCategories,
        brand: selectedBrand,
        ex_work: selectedLocations,
        price: price,
        availability: selectedAvailability,
        qty: quantity,
        type: selectedType,
        condition: selectedConditions,
        remark: remark,
        created_by:userDetial.data.user_id || userDetial.data.email
      };

      const response = await AddProductData(AddStock);

      if (response) {
        toast.success("Successfully product added");
        setShowAddStock(false);
        setHandleReload(true)
      }

      // Handle response accordingly
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        // File is an Excel file, proceed with submission
        handlefileSubmit(file);
      } else {
        // Display error message for invalid file type
        toast.error("Please upload only Excel files.");
        // Clear file input field
        document.getElementById("excel_file").value = "";
      }
    }
  };

  const handleUploadSubmit = () => {
    const fileInput = document.getElementById("excel_file");
    const file = fileInput.files[0];
    handleFileChange({ target: { files: [file] } });
  };

  return (
    <div
      className="modal fade show"
      id="addStockModal"
      tabIndex="-1"
      aria-labelledby="addStockModal"
      style={{ display: "block", paddingLeft: "0px" }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered modal-sm1">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="newProjectModalLabel">
              Add Stock
            </h5>
            <button
              type="button"
              onClick={() => setShowAddStock(false)}
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="js-nav-scroller hs-nav-scroller-horizontal">
              <ul
                className="js-tabs-to-dropdown nav nav-segment nav-fill mb-3"
                id="ModalTab"
                role="tablist"
                style={{ cursor: "pointer" }}
              >
                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${
                      activeTab === "upload" ? "active" : ""
                    }`}
                    id="uploadmodal-tab"
                    onClick={() => handleTabChange("upload")}
                  >
                    <i className="bi-person me-1"></i> Upload File
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${
                      activeTab === "htmlForm" ? "active" : ""
                    }`}
                    id="htmlFormmodal-tab"
                    onClick={() => handleTabChange("htmlForm")}
                  >
                    <i className="bi-building me-1"></i> Fill HTML Form
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content" id="editUserModalTabContent">
              <div
                className={`tab-pane fade ${
                  activeTab === "upload" ? "show active" : ""
                }`}
                id="uploadModal"
                role="tabpanel"
                aria-labelledby="uploadmodal-tab"
              >
                <form
                  className="js-validate needs-validation stock_list_htmlForm"
                  noValidate=""
                >
                  <div id="">
                    <div className="row">
                      <div className="col-sm">
                        <div className="mb-4">
                          <span className="d-block mb-2">
                            <a href="http://192.168.1.161/change_pp/uploads/stock_list/stock_list_import_sample.xlsx">
                              Sample.xlsx{" "}
                              <i className="bi bi-download ms-2"></i>
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="mb-4">
                          <input
                            type="file"
                            id="excel_file"
                            className="form-control"
                            accept=".xlsx, .xls"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-sm-12 text-center">
                        <button
                          type="button"
                          className="btn btn-primary stock_list_upload"
                          onClick={handleUploadSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "htmlForm" ? "show active" : ""
                }`}
                id="htmlFormModalTab"
                role="tabpanel"
                aria-labelledby="htmlFormmodal-tab"
              >
                <form
                  className="js-validate needs-validation stock_add_form"
                  onSubmit={handleSubmit}
                >
                  <div id="">
                    <div className="row mb-2">
                      <label
                        htmlFor="emailLabel"
                        className="col-sm-4 col-form-label form-label"
                      >
                        Brand <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-8">
                        <div className="tom-select-custom">
                          <select
                            name="filter_brand"
                            className="form-select"
                            onChange={(e) => setSelectedBrand(e.target.value)}
                          >
                            {brands.map((brand, index) => (
                              <option key={index} value={brand}>
                                {brand}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="row mb-2">
                        <label
                          htmlFor="emailLabel"
                          className="col-sm-4 col-form-label form-label"
                        >
                          Ex Work <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-8">
                          <div className="tom-select-custom">
                            <select
                              name="filter_location"
                              className="form-select"
                              onChange={(e) =>
                                setSelectedLocations(e.target.value)
                              }
                            >
                              {locations.map((location, index) => (
                                <option key={index} value={location}>
                                  {location}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-2">
                        <label
                          htmlFor="emailLabel"
                          className="col-sm-4 col-form-label form-label"
                        >
                          Type <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-8">
                          <div
                            className="tom-select-custom"
                            data-hs-validation-validate-class
                          >
                            <select
                              name="filter_stock"
                              className="form-select"
                              onChange={(e) => setSelectedType(e.target.value)}
                            >
                              {type.map((stock, index) => (
                                <option key={index} value={stock}>
                                  {stock}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-2">
                        <label
                          htmlFor="emailLabel"
                          className="col-sm-4 col-form-label form-label"
                        >
                          Condition <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-8">
                          <div
                            className="tom-select-custom"
                            data-hs-validation-validate-class
                          >
                            <select
                              name="filter_condition"
                              className="form-select"
                              onChange={(e) =>
                                setSelectedConditions(e.target.value)
                              }
                            >
                              {conditions.map(
                                (
                                  condition,
                                  index // corrected from 'conditions' to 'condition'
                                ) => (
                                  <option key={index} value={condition}>
                                    {condition}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-2">
                        <label
                          htmlFor="emailLabel"
                          className="col-sm-4 col-form-label form-label"
                        >
                          Category <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-8">
                          <div
                            className="tom-select-custom"
                            data-hs-validation-validate-class
                          >
                            <select
                              name="filter_condition"
                              className="form-select"
                              onChange={(e) =>
                                setSelectedCategories(e.target.value)
                              }
                            >
                              {categories.map(
                                (
                                  categories,
                                  index // corrected from 'conditions' to 'condition'
                                ) => (
                                  <option key={index} value={categories}>
                                    {categories}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-2">
                        <label
                          htmlFor="emailLabel"
                          className="col-sm-4 col-form-label form-label"
                        >
                          Availability <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-8">
                          <div
                            className="tom-select-custom"
                            data-hs-validation-validate-class
                          >
                            <select
                              name="filter_condition"
                              className="form-select"
                              onChange={(e) =>
                                setSelectedAvailability(e.target.value)
                              }
                            >
                              <option value="Sufficient">Sufficient</option>
                              <option value="Limited">Limited</option>
                              <option value="Few">Few</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-2">
                        <label
                          htmlFor="emailLabel"
                          className="col-sm-4 col-form-label form-label"
                        >
                          Model <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            className="form-control"
                            id="model_no"
                            name="model_no"
                            required
                            onChange={(e) => setModelState(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row mb-2">
                        <label
                          htmlFor="emailLabel"
                          className="col-sm-3 col-form-label form-label"
                        >
                          Price
                        </label>
                        <div className="col-sm-3">
                          <input
                            type="number"
                            className="form-control"
                            id="price_level_1"
                            name="price_level_1"
                            required
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>

                        <label
                          htmlFor="emailLabel"
                          className="col-sm-3 col-form-label form-label"
                        >
                          Qty <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-3">
                          <input
                            type="number"
                            className="form-control"
                            id="qty"
                            name="qty"
                            required
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12">
                          <div className="mb-2">
                            <label className="form-label" htmlFor="description">
                              Description
                            </label>
                            <textarea
                              id
                              className="form-control"
                              name="description"
                              placeholder="Description"
                              rows={2}
                              defaultValue={""}
                              required
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="mb-2">
                            <label className="form-label" htmlFor="remark">
                              Remark
                            </label>
                            <textarea
                              id
                              className="form-control"
                              name="remark"
                              placeholder="Remark"
                              rows={2}
                              defaultValue={""}
                              onChange={(e) => setRemark(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center mt-2">
                        <div className="ms-auto">
                          <button
                            type="submit"
                            className="btn btn-primary stock_add_btn"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddStock;
