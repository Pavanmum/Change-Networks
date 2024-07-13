import { useEffect, useState } from "react";
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { fetchCustomerData } from "../../../store/api/Admin/customerList";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  AddCustomerData,
  UpdateCustomerData,
} from "../../../store/api/Admin/customerList.js";
import { selectUserDetail } from "../../../store/slices/Admin/authSlice.js";
const EditAddCustomer = ({
  setEditCustomer,
  setAddCustomer,
  addCustomer,
  editCustomer,
}) => {
  const [customerData, setCustomerData] = useState({
    company_name: "",
    email1: "",
    partner_type: "",
    fname: "",
    lname: "",
    email2: "",
    country: "",
    whatsapp: "",
    mobile: "",
  });
  const [custData, setCustData] = useState();
  const selectedCustomer = useSelector(
    (state) => state.quoteToolSlice.selectedCustomerDetails
  );
  const  userDetial = useSelector(selectUserDetail);
  useEffect(() => {
    const fetchData = async () => {
      if (selectedCustomer) {
        try {
          const res = await fetchCustomerData(); // Assuming fetchCustomerData returns an array of customers

          const filteredCustomer = res.find(
            (item) => item.partner_id === selectedCustomer.partner_id
          );
          setCustData(filteredCustomer);
          setCustomerData(filteredCustomer);
        } catch (error) {
          console.error("Error fetching customer data:", error);
        }
      }
    };

    fetchData();
  }, [selectedCustomer]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCustomerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleCountryChange = (country) => {
    setCustomerData((prevState) => ({
      ...prevState,
      country,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editCustomer) {
      const res = await UpdateCustomerData(customerData, custData._id);
      if (res) {
        toast.success("Customer updated Successfully");
      }
      setEditCustomer(false);
    } else if (addCustomer) {
      const  am = userDetial.data.user_id;
      customerData.am = am
      const res = await AddCustomerData(customerData);
      if (res) {
        toast.success("Customer add Successfully");
      }
      setAddCustomer(false);
    }
  };

  return (
    <div
      className="modal fade show"
      id="addCustomerModal"
      tabIndex="-1"
      aria-labelledby="addStockModal"
      aria-modal="true"
      role="dialog"
      style={{ display: "block", paddingLeft: "0px" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="newProjectModalLabel">
              {editCustomer ? "Edit Customer" : "Add Customer"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                editCustomer ? setEditCustomer(false) : setAddCustomer(false);
              }}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-2">
                <label
                  htmlFor="company_name"
                  className="col-sm-4 col-form-label"
                >
                  Company Name <span className="text-danger">*</span>
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="company_name"
                    name="company_name"
                    value={customerData.company_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-2">
                <label htmlFor="email1" className="col-sm-4 col-form-label">
                  Email
                </label>
                <div className="col-sm-8">
                  <input
                    type="email"
                    className="form-control"
                    id="email1"
                    name="email1"
                    value={customerData.email1}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-2">
                <label
                  htmlFor="partner_type"
                  className="col-sm-4 col-form-label"
                >
                  Status
                </label>
                <div className="col-sm-8">
                  <select
                    name="partner_type"
                    id="partner_type"
                    className="form-select"
                    value={customerData.partner_type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Status*</option>
                    <option value="VIP">VIP</option>
                    <option value="PO">PO</option>
                    <option value="Quoted">Quoted</option>
                    <option value="Prospects">Prospects</option>
                    <option value="Subscribers">Subscribers</option>
                    <option value="Guest">Guest</option>
                    <option value="DNC">DNC</option>
                  </select>
                </div>
              </div>

              <div className="row mb-2">
                <label htmlFor="fname" className="col-sm-4 col-form-label">
                  First Name
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="fname"
                    name="fname"
                    value={customerData.fname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-2">
                <label htmlFor="lname" className="col-sm-4 col-form-label">
                  Last Name
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="lname"
                    name="lname"
                    value={customerData.lname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-2">
                <label htmlFor="email2" className="col-sm-4 col-form-label">
                  Secondary Emails
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="email2"
                    name="email2"
                    value={customerData.email2}
                    onChange={handleInputChange}
                    placeholder="comma separated"
                  />
                </div>
              </div>

              <div className="row mb-2">
                <label htmlFor="country" className="col-sm-4 col-form-label">
                  Country <span className="text-danger">*</span>
                </label>
                <div className="col-sm-8">
                  <CountrySelect
                    onChange={(value) => handleCountryChange(value.name)}
                    defaultValue={
                      customerData.country
                        ? { name: customerData.country }
                        : null
                    }
                    value={
                      customerData.country
                        ? { name: customerData.country }
                        : null
                    }
                    placeholder="Select Country"
                  />
                </div>
              </div>

              <div className="row mb-2">
                <label htmlFor="whatsapp" className="col-sm-4 col-form-label">
                  WhatsApp <span className="text-danger">*</span>
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="whatsapp"
                    name="whatsapp"
                    value={customerData.whatsapp}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-2">
                <label htmlFor="mobile" className="col-sm-4 col-form-label">
                  Mobile #
                </label>
                <div className="col-sm-8">
                  <input
                    type="number"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    value={customerData.mobile}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="d-flex align-items-center mt-2">
                <div className="ms-auto">
                  <button type="submit" className="btn btn-primary">
                    {editCustomer ? "Update" : "Add"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAddCustomer;
