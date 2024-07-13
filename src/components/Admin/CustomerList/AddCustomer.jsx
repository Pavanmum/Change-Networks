import { useState, useEffect } from "react";
import { AddCustomerData } from "../../../store/api/Admin/customerList.js";
import { fetchUserData } from "../../../store/api/Admin/auth.js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const AddStock = ({ setShowAddStock ,setAddedSuccessfully}) => {
  const customer = useSelector((state) => state.customerListSlice.customer);
  const [am, setAM] = useState([]);
  const [status, setStatus] = useState([]);
  const [country, setCountry] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secondaryEmails, setSecondaryEmails] = useState("");
  const [whatsapp, setWhatsapp] = useState({ number: "", country: "in" });
  const [mobile, setMobile] = useState({ number: "", country: "in" });
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedAM, setSelectedAM] = useState("");
  const [activeTab, setActiveTab] = useState("upload");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (customer.length > 0) {
      const uniqueValues = (key) => [
        ...new Set(customer.map((item) => item[key])),
      ];

      setStatus(uniqueValues("partner_type"));
      // Changed to "country"
    }
  }, [customer]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserData();
        setUserData(response);
        if (response && Array.isArray(response.user)) {
          const uniqueNames = response.user.reduce(
            (accumulator, currentValue) => {
              if (currentValue.dept === "Sales") {
                const fullName =
                  `${currentValue.user_fname} ${currentValue.user_lname}`.trim();
                if (!accumulator.includes(fullName)) {
                  accumulator.push(fullName);
                }
              }
              return accumulator;
            },
            []
          );
          setAM(uniqueNames);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Dependency array is empty assuming this should only run once
  const formatPhoneNumber = (number, countryCode) => {
    return `+${countryCode} ${number.replace(/\D/g, "")}`;
  };
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
        const sheetNameList = workbook.SheetNames;
        const json = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetNameList[0]]
        );
        resolve(json);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileSubmit = async (file) => {
    try {
      const jsonData = await excelToJson(file);
      if (jsonData && Array.isArray(jsonData)) {
        const transformedData = jsonData.map((item) => {
          const nameParts = item.Name.split(" ");
          const firstName = nameParts[0];
          const lastName = nameParts.slice(1).join(" ");

          // Find the corresponding AM's user_id
          const selectedUser = userData.user.find(
            (user) =>
              user.dept === "Sales" &&
              `${user.user_fname} ${user.user_lname}`.trim() === item.AM
          );
          const userId = selectedUser ? selectedUser.user_id : null;

          return {
            company_name: item.CompanyName,
            email1: item.Email,
            am: userId,
            partner_type: item.Status,
            fname: firstName,
            lname: lastName,
            email2: item["Secondary Emails"],
            date: item.Date,
          };
        });

        console.log("Transformed Data:", transformedData);

        // // Send data to the backend
        const response = await AddCustomerData(transformedData);
        if (response) {
          toast.success("Successfully added stock");
          setShowAddStock(false);
          setAddedSuccessfully(true);
        }
      } else {
        console.error("Unexpected data format from Excel file:", jsonData);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to upload data");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        handleFileSubmit(file);
      } else {
        toast.error("Please upload only Excel files.");
        document.getElementById("excel_file").value = "";
      }
    }
  };

  const handleUploadSubmit = () => {
    const fileInput = document.getElementById("excel_file");
    const file = fileInput.files[0];
    handleFileChange({ target: { files: [file] } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedUser = userData.user.find(
        (user) =>
          user.dept === "Sales" &&
          `${user.user_fname} ${user.user_lname}`.trim() === selectedAM
      );
      if (!selectedUser) {
        throw new Error("Selected AM not found in user data");
      }
      // Extract the user ID from the selected user object
      const userId = selectedUser.user_id;

      const newCustomer = {
        company_name: companyName,
        email1: email,
        am: userId,
        partner_type: selectedStatus,
        fname: firstName,
        lname: lastName,
        email2: secondaryEmails,
        country: country,
        whatsapp: formatPhoneNumber(whatsapp.number, whatsapp.country),
        mobile: formatPhoneNumber(mobile.number, mobile.country),
      };
      console.log(newCustomer);

      const response = await AddCustomerData(newCustomer);
      if (response) {
        toast.success("Successfully added stock");
        setShowAddStock(false);
        setAddedSuccessfully(true);
      }
    } catch (error) {
      console.error("Failed to add stock:", error);
      toast.error("Failed to add stock");
    }
  };

  return (
    <div
      className="modal fade show"
      id="addStockModal"
      tabIndex="-1"
      aria-labelledby="addStockModal"
      style={{ display: "block", paddingLeft: "0px"}}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
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
                  <div className="row">
                    <div className="col-sm">
                      <div className="mb-4">
                        <span className="d-block mb-2">
                          <a href="http://192.168.1.161/change_pp/uploads/stock_list/stock_list_import_sample.xlsx">
                            Sample.xlsx <i className="bi bi-download ms-2"></i>
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
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-4">
                        <div className="input-group input-group-sm-vertical">
                          <input
                            type="text"
                            className="form-control"
                            tabIndex="5"
                            name="company_name"
                            placeholder="Company name*"
                            onChange={(e) => setCompanyName(e.target.value)}
                            aria-label="Company name"
                            required
                          />
                        </div>
                        <span className="text-danger" id="companysrch"></span>
                        <span className="invalid-feedback">
                          Please enter a Company name.
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-4">
                        <div className="iti__flag iti__ad">
                          <input
                            type="email"
                            className="form-control"
                            name="email1"
                            id="emlchk"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email*"
                            aria-label="email"
                            required
                          />
                          <span className="text-danger" id="custemlsrch"></span>
                          <span className="invalid-feedback">
                            Please enter a valid email.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-4">
                        <div className="tom-select-custom">
                          <select
                            tabIndex="-1"
                            name="am"
                            id="mycustlist-am"
                            className="form-select tomselected "
                            autoComplete="off"
                            required
                            value={selectedAM}
                            onChange={(e) => setSelectedAM(e.target.value)}
                          >
                            <option value="">AM*</option>
                            {am.map((am, index) => (
                              <option key={index} value={am}>
                                {am}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-4">
                        <div className="tom-select-custom">
                          <select
                            name="partner_type"
                            tabIndex="-1"
                            id="mycustlist-status"
                            className="form-select tomselected "
                            autoComplete="off"
                            required
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                          >
                            <option value="">Status*</option>
                            {status.map((stock, index) => (
                              <option key={index} value={stock}>
                                {stock}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-4">
                        <div className="input-group input-group-sm-vertical">
                          <input
                            type="text"
                            className="form-control"
                            tabIndex="7"
                            name="fname"
                            placeholder="First name"
                            aria-label="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                        <span className="invalid-feedback">
                          Please enter a valid name.
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-4">
                        <div className="input-group input-group-sm-vertical">
                          <input
                            type="text"
                            className="form-control"
                            tabIndex="8"
                            name="lname"
                            placeholder="Last name"
                            onChange={(e) => setLastName(e.target.value)}
                            aria-label="Last name"
                            value={lastName}
                          />
                        </div>
                        <span className="invalid-feedback">
                          Please enter a valid name.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-4">
                        <div className="input-group input-group-sm-vertical">
                          <textarea
                            cols="5"
                            className="form-control"
                            tabIndex="6"
                            name="email2"
                            placeholder="Secondary email ids(comma separated)"
                            aria-label="email2"
                            value={secondaryEmails}
                            onChange={(e) => setSecondaryEmails(e.target.value)}
                          ></textarea>
                        </div>
                        <span className="invalid-feedback">
                          Please enter a secondary email.
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-4">
                        <div className="tom-select-custom">
                          <CountrySelect
                            onChange={(e) => {
                              setCountry(e.name);
                            }}
                            placeHolder="Select Country"
                          />
                        </div>
                      </div>
                    </div>
                    <span className="invalid-feedback">
                      Please select a valid status.
                    </span>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="iti iti--allow-dropdown iti--separate-dial-code w-100">
                        <PhoneInput
                          country="in"
                          value={whatsapp.number}
                          onChange={(phone, country) =>
                            setWhatsapp({
                              number: phone,
                              country: country.dialCode,
                            })
                          }
                        />
                      </div>
                      <span className="invalid-feedback">
                        WhatsApp cannot be blank.
                      </span>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-4">
                        <div className="iti iti--allow-dropdown iti--separate-dial-code w-100">
                          <PhoneInput
                            country="in"
                            value={mobile.number}
                            onChange={(phone, country) =>
                              setMobile({
                                number: phone,
                                country: country.dialCode,
                              })
                            }
                          />
                        </div>
                        <span className="invalid-feedback">
                          Mobile cannot be blank.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mt-2">
                    <div className="ms-auto">
                      <button
                        type="submit"
                        className="btn btn-primary stock_add_btn"
                      >
                        Submit
                      </button>
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
