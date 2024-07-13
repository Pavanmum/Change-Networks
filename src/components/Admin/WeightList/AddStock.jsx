import { useState } from "react";
import { AddProductData } from "../../../store/api/Admin/weightList.js";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { selectUserDetail } from "../../../store/slices/Admin/authSlice.js";
import { useSelector } from "react-redux";
const AddStock = ({ setShowAddStock,setHandleReload }) => {
  const product = useSelector((state) => state.priceListSlice.products);
  const  userDetial = useSelector(selectUserDetail);
  // Define state variables for quantity, description, and remark
  const [model, setModel] = useState();
  const [weight, setWeight] = useState("");
  const [dimension, setDimension] = useState("");
  const [activeTab, setActiveTab] = useState("upload");
  console.log(product);
console.log(userDetial.data);
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
      const created_by = userDetial.data.user_id || userDetial.data.email ;
      const jsonData = await excelToJson(file);
      const response = await AddProductData(jsonData,created_by);
      if (response) {
        setHandleReload(true);
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
      const weightInKG = parseFloat(weight);
      const weightInLBS = weightInKG * 2.20462;
      const dimensionParts = dimension
        .split("x")
        .map((part) => parseInt(part, 10));
      if (
        dimensionParts.length === 3 &&
        dimensionParts.every((part) => !isNaN(part))
      ) {
        const dataToSend = {
          model_no: model,
          weight_kg: weightInKG,
          weight_lbs: weightInLBS,
          dimension_cm: dimension,
        };
        const created_by = userDetial.data.user_id || userDetial.data.email ;
        const response = await AddProductData(dataToSend,created_by);

        if (response) {
          toast.success("Successfully product added");
          setShowAddStock(false);
          setHandleReload(true);
        }
      } else {
        toast.error("Invalid dimension format. Please use the format WxHxD.");
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
  const handleDimensionChange = (e) => {
    const value = e.target.value;
    const dimensionParts = value.split("x").map((part) => parseInt(part, 10));
    if (
      dimensionParts.length === 3 &&
      dimensionParts.every((part) => !isNaN(part))
    ) {
      setDimension(value);
    } else {
      console.error("Invalid dimension format. Please use the format WxHxD.");
      toast.error("Invalid dimension format. Please use the format WxHxD.");
    }
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
      <div className="modal-dialog modal-dialog-centered modal-sm">
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
                        className="col-sm-5 col-form-label form-label"
                      >
                        Model <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          className="form-control"
                          id="model_no"
                          name="model_no"
                          required
                          onChange={(e) => setModel(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <label
                        htmlFor="emailLabel"
                        className="col-sm-5 col-form-label form-label"
                      >
                        Weight KG<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          className="form-control"
                          id="price_level_1"
                          name="price_level_1"
                          required
                          onChange={(e) => setWeight(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <label
                        htmlFor="emailLabel"
                        className="col-sm-5 col-form-label form-label"
                      >
                        Dimension <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          className="form-control"
                          id="qty"
                          name="qty"
                          required
                          onChange={handleDimensionChange}
                        />
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
