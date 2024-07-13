import { useState, useEffect } from "react";
import "./customer.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchCustomerData,
  UpdateCustomerData,
} from "../../../store/api/Admin/customerList.js";
import { fetchUserData } from "../../../store/api/Admin/auth.js";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const EditCustomer = ({ setShowEditBox ,setAddedSuccessfully}) => {
  const selectedData = useSelector(
    (state) => state.customerListSlice.selectedBoxData
  );
  console.log(selectedData);

  const [fname, setFname] = useState(selectedData.fname || "");
  const [lname, setLname] = useState(selectedData.lname || "");
  const [selectedStatus, setSelectedStatus] = useState(selectedData.partner_type || "");
  const [status, setStatus] = useState([]);
  const [cname, setCname] = useState(selectedData.company_name || "");
  const [email, setEmail] = useState(selectedData.email1 || "");
  const [am, setAM] = useState([]);
  const [selectedAM, setSelectedAM] = useState(selectedData.am || "");
  const [mobile, setMobile] = useState(selectedData.mobile || 0);
  const [whatsapp, setWhatsapp] = useState(selectedData.whatsapp || 0);
  const [country, setCountry] = useState(selectedData.country || "");
  const [state, setState] = useState(selectedData.state || "");
  const [city, setCity] = useState(selectedData.city || "");
  const [semails, setSemails] = useState(selectedData.email2 || "");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserData();
        setUserData(response);
        if (response && Array.isArray(response.user)) {
          const uniqueNames = response.user.reduce((accumulator, currentValue) => {
            if (currentValue.dept === "Sales") {
              const fullName =
                `${currentValue.user_fname} ${currentValue.user_lname}`.trim();
              if (!accumulator.includes(fullName)) {
                accumulator.push(fullName);
              }
            }
            return accumulator;
          }, []);
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const selectedUser = userData.user.find(
        (user) =>
          (user.dept === "Sales" &&
            `${user.user_fname} ${user.user_lname}`.trim() === selectedAM) ||
          selectedData.am
      );
      if (!selectedUser) {
        throw new Error("Selected AM not found in user data");
      }

      const updatedData = {
        partner_type: selectedStatus,
        email1: email,
        company_name: cname,
        am: selectedUser?.user_id || selectedData.am,
        email2: semails,
        mobile: mobile,
        lname: lname,
        fname: fname,
        whatsapp: whatsapp,
        country: country,
        state: state,
        city: city,
      };

      // Filter out fields that have not changed
      const updatedFields = Object.keys(updatedData).filter(
        (key) => updatedData[key] !== selectedData[key]
      );

      // Prepare the updated data object with only changed fields
      const updatedDataToSend = {};
      updatedFields.forEach((key) => {
        updatedDataToSend[key] = updatedData[key];
      });
      const id = selectedData._id;
      console.log(updatedDataToSend);

      // Call the API with the updated data
      const response = await UpdateCustomerData(updatedDataToSend, id);

      if (response) {
        setAddedSuccessfully(true);
      }
      setShowEditBox(false);
      toast.success("Successfully customer updated");
      // Handle response accordingly
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  return (
    <div>
      <div
        className="modal fade show"
        id="viewCustomerModal"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        style={{ display: "block", paddingLeft: "0px" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content"
          >
            {/* Header */}
            <div className="bg-dark text-center">
              <figure className="position-absolute end-0 bottom-0 start-0">
                <svg
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 1920 100.1"
                  >
                  <path
                    fill="#fff"
                    d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
                    ></path>
                </svg>
              </figure>
                <p style={{textAlign:'start',color:'black',background:'white',fontSize:25,padding:15}}>{selectedData.company_name}</p>
              <div className="modal-close">
                <button
                  type="button"
                  className="btn-close btn-close-dark"
                  onClick={() => setShowEditBox(false)}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ></button>
              </div>
            </div>
            {/* End Header */}
            {/* Body */}
            <form
              id="custeditform"
              className="js-validate needs-validation"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="modal-body">
                <div className="row mb-6">
                  <div className="col-md-4 mb-3 mb-md-0">
                    <h3 className=""> </h3>
                    <div className="d-flex align-items-center">
                      <small className="text-cap text-secondary">Status:</small>
                      <div
                        className="tom-select-custom"
                        data-hs-validation-validate-class=""
                      >
                        <select
                          name="partner_type"
                          id="partnertype_dropdown"
                          className="text-cap text-secondary form-select border-0 p-0 tomselected   "
                          autoComplete="off"
                          required
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          data-hs-tom-select-options='{"searchInDropdown":true,"hideSearch":false}'
                          tabIndex="-1"
                        >
                          <option value={selectedData.partner_type}>
                            {selectedData.partner_type}
                          </option>
                          {status.map((status, index) => (
                            <option
                              data-selectable=""
                              data-value="VIP"
                              className="option"
                              role="option"
                              id="tomselect-1-opt-2"
                              key={index}
                              value={status}
                            >
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 offset-lg-4">
                    <small className="text-cap text-secondary mb-0">
                      Added on:
                    </small>
                    <span className="text-dark">
                      <i className="bi bi-calendar"> </i>
                      {selectedData.partner_date.split(" ")[0]}
                    </span>
                  </div>
                </div>
                {/* End Row */}
                <small className="text-cap mb-2">Details</small>
                <ul className="list-group mb-4">
                  <li className="list-group-item  mb-1 text-dark">
                    <div className="row">
                      <strong className="col-lg-3">First Name:</strong>
                      <span className="col-lg-9">
                      <input
                          type="text"
                          name="fname"
                          className="form-control border-0 p-0"
                          
                          value={fname}
                          onChange={(e) => setFname(e.target.value)}
                        />
                      </span>
                    </div>
                  </li>
                  <li className="list-group-item mb-1 text-dark">
                    <div className="row">
                      <strong className="col-lg-3">Last Name:</strong>
                      <span className="col-lg-9">
                      <input
                          type="text"
                          name="lname"
                          className="form-control border-0 p-0"
                          
                          value={lname}
                          onChange={(e) => setLname(e.target.value)}
                        />
                      </span>
                    </div>
                  </li>
                  <li className="list-group-item mb-1 text-dark">
                    <div className="row">
                      <strong className="col-lg-3">Company Name:</strong>
                      <span className="col-lg-9">
                      <input
                          type="text"
                          name="cname"
                          className="form-control border-0 p-0"
                       
                          value={cname}
                          onChange={(e) => setCname(e.target.value)}
                        />
                      </span>
                      <span className="invalid-feedback">
                        Company Name is required.
                      </span>
                    </div>
                  </li>
                  <li className="list-group-item mb-1 text-dark">
                    <div className="row">
                      <strong className="col-lg-3">Email:</strong>
                      <div className="col-lg-9">
                      <input
                          type="email"
                          name="email"
                          className="form-control border-0 p-0"
                          
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item mb-1 text-dark">
                    <div className="row">
                      <strong className="col-lg-3">AM:</strong>
                      <span className="col-lg-9">
                        <div
                          className="tom-select-custom"
                          data-hs-validation-validate-class=""
                        >
                          <select
                            name="am"
                            className="js-select-CUSTedit form-select border-0 tomselected "
                            autoComplete="off"
                            required
                            data-hs-tom-select-options='{
              "searchInDropdown": true,
              "hideSearch": false
            }'
                            onChange={(e) => setSelectedAM(e.target.value)}
                            id="tomselect-6"
                            tabIndex="-1"
                          >
                            {/* <option value={selectedData.am}>{selectedData.am}</option> */}

                            {am.map((am, index) => (
                              <option key={index} value={am}>
                                {am}
                              </option>
                            ))}
                          </select>
                          <span className="invalid-feedback">
                            AM is required.
                          </span>
                        </div>
                      </span>
                    </div>
                  </li>
                  <li className="list-group-item mb-1 text-dark">
                    <div className="row">
                      <strong className="col-lg-3">Mobile:</strong>
                      <span className="col-lg-9">
                      <input
                          type="number"
                          name="mobile"
                          className="form-control border-0 p-0"
                         
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                        />
                      </span>
                    </div>
                  </li>
                  <li className="list-group-item mb-1 text-dark">
                    <div className="row">
                      <strong className="col-lg-3">WhatsApp:</strong>
                      <span className="col-lg-9">
                      <input
                          type="number"
                          name="whatsapp"
                          className="form-control "
                      
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                        />
                      </span>
                    </div>
                  </li>
                  <li className="list-group-itemtext-dark list-group-item  mb-1">
                    <div className="row">
                      <strong className="col-lg-3">Country:</strong>
                      <span className="col-lg-9">
                        <div
                          className="tom-select-custom"
                          data-hs-validation-validate-class=""
                        >
                           <CountrySelect
                          country={country}
                          onChange={(country) => setCountry(country)}
                          className="form-control border-0 p-0"
                        />
                        </div>
                      </span>
                    </div>
                  </li>
                  <li className="list-group-item mb-1 text-dark">
                    <div className="row">
                      <strong className="col-lg-3">State:</strong>
                      <span className="col-lg-9">
                        <div
                          className="tom-select-custom"
                          data-hs-validation-validate-class=""
                        >
                          <StateSelect
                          state={state}
                          country={country}
                          onChange={(state) => setState(state)}
                          className="form-control border-0 p-0"
                        />
                        </div>
                      </span>
                    </div>
                  </li>
                  <li className="list-group-item mb-1 text-dark">
                    <div className="row">
                      <strong className="col-lg-3">City:</strong>
                      <span className="col-lg-9">
                        <div
                          className="tom-select-custom"
                          data-hs-validation-validate-class=""
                        >
                         <CitySelect
                          city={city}
                          state={state}
                          onChange={(city) => setCity(city)}
                          className="form-control border-0 p-0"
                        />
                        </div>
                      </span>
                    </div>
                  </li>
                  <li className="list-group-item mb-1 text-dark">
                    <div className="row">
                      <strong className="col-lg-3">Secondary Emails:</strong>
                      <span className="col-lg-9">
                        <div
                          className="tom-select-custom"
                          data-hs-validation-validate-class=""
                        >
                          <textarea
                            name="email2"
                            onChange={(e) => setSemails(e.target.value)}
                          ></textarea>
                        </div>
                      </span>
                    </div>
                  </li>
                </ul>

                <div className="d-flex justify-content-end gap-3">
                  <input type="hidden" name="ptid" />
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
            {/* End Body */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
