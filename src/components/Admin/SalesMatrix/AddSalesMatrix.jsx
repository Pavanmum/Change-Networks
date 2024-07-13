import { useEffect, useState } from "react";
import { fetchUserData } from "../../../store/api/Admin/auth.js";
import { addSalesData } from "../../../store/api/Admin/salesMatrix.js";
import { toast } from "react-toastify";
import { setReload } from "../../../store/slices/Admin/salesMatrixSlice.js";
import { selectUserDetail } from "../../../store/slices/Admin/authSlice.js";
import { useDispatch,useSelector } from "react-redux";
const AddSalesMatrix = ({ setAddSales }) => {
  const  userDetial = useSelector(selectUserDetail);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetchUserData();
        setUserData(userResponse.user);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extract form data
    const formData = new FormData(event.target);
    const am = formData.get("am");
    const q1_target = formData.get("q1_target");
    const q2_target = formData.get("q2_target");
    const q3_target = formData.get("q3_target");
    const q4_target = formData.get("q4_target");
    const selectedAM = userData.find((user) => user.user_fname === am);
    if (!selectedAM) {
      console.error("Selected AM not found in userData");
      return;
    }

    const { user_id } = selectedAM;
    const data = {
      am: user_id,
      q1_target: q1_target,
      q2_target: q2_target,
      q3_target: q3_target,
      q4_target: q4_target,
      created_by : userDetial.data.user_id || userDetial.data.email
    };
    try {
      // Call addSalesData with extracted data
      const res = await addSalesData(data);
      if (res) {
        toast.success("Successfully Target Added");
        dispatch(setReload(true)); // Reload the page after 1 second
        setTimeout(() => {
          setAddSales(false);
        }, 500);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div
      className="modal fade show"
      id="addSalesMatrixModal"
      tabIndex="-1"
      aria-labelledby="addSalesMatrixModal"
      data-bs-backdrop="static"
      aria-modal="true"
      role="dialog"
      style={{ display: "block", paddingLeft: "0px" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Sales Matrix</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() => setAddSales(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form
              className="js-validate needs-validation sales_matrix_add_form"
              noValidate
              onSubmit={handleSubmit}
            >
              <div id="">
                <div className="row mb-2">
                  <label
                    htmlFor="am"
                    className="col-sm-4 col-form-label form-label"
                  >
                    AM <span className="text-danger">*</span>
                  </label>
                  <div className="col-sm-8">
                    <select className="form-select" id="am" name="am" required>
                      <option value="">Select AM</option>
                      {userData.map((user, index) => (
                        <option key={index} value={user.user_fname}>
                          {user.user_fname} {user.user_lname}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row mb-2">
                  <label
                    htmlFor="q1_target"
                    className="col-sm-4 col-form-label form-label"
                  >
                    Q1 <span className="text-danger">*</span>
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control"
                      id="q1_target"
                      name="q1_target"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <label
                    htmlFor="q2_target"
                    className="col-sm-4 col-form-label form-label"
                  >
                    Q2 <span className="text-danger">*</span>
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control"
                      id="q2_target"
                      name="q2_target"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <label
                    htmlFor="q3_target"
                    className="col-sm-4 col-form-label form-label"
                  >
                    Q3 <span className="text-danger">*</span>
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control"
                      id="q3_target"
                      name="q3_target"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-2">
                  <label
                    htmlFor="q4_target"
                    className="col-sm-4 col-form-label form-label"
                  >
                    Q4 <span className="text-danger">*</span>
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control"
                      id="q4_target"
                      name="q4_target"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-primary sales_am_btn">
                  Add
                </button>
              </div>
              {/* End Footer */}
            </form>

            {/* Add Dynamic Input Field */}
            <div id="addAnotherOptionFieldTemplate" style={{ display: "none" }}>
              <div className="row mb-2">
                {/* Dynamic input field template here */}
              </div>
            </div>
            {/* End Add Dynamic Input Field */}

            {/* Success Message Body */}
            <div
              id="createProjectStepSuccessMessage"
              style={{ display: "none" }}
            >
              <div className="text-center">
                <img
                  className="img-fluid mb-3"
                  src="http://192.168.1.161/change_pp/assets/svg/illustrations/oc-hi-five.svg"
                  alt=""
                  data-hs-theme-appearance="default"
                  style={{ maxWidth: "15rem" }}
                />
                <div className="mb-4">
                  <h2>Successful!</h2>
                  <p>Sales data has been successfully added.</p>
                </div>
              </div>
            </div>
            {/* End Success Message Body */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSalesMatrix;
