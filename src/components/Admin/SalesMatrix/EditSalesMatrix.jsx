import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUserData } from "../../../store/api/Admin/auth.js";
import { updateSalesData } from "../../../store/api/Admin/salesMatrix.js";
import { toast } from "react-toastify";
import { setReload } from "../../../store/slices/Admin/salesMatrixSlice.js";
import { selectUserDetail } from "../../../store/slices/Admin/authSlice.js";

import { useDispatch } from "react-redux";
const EditSalesMatrix = ({ setEditSalesMatrix }) => {
  const  userDetial = useSelector(selectUserDetail);
  const dispatch = useDispatch();
  const selectedBoxData = useSelector(
    (state) => state.salesMatrixSlice.selectedBoxData
  );
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchUserData();
        setUserData(res.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updatedFormData = calculateUpdatedData(selectedBoxData);
    setFormData(updatedFormData);
  }, [selectedBoxData]);

  const calculateUpdatedData = (data) => {
    return data.map((item) => {
      let totalTarget = 0;
      let totalSales = 0;

      const updatedData = { ...item };

      ["q1", "q2", "q3", "q4"].forEach((quarter) => {
        const target = parseFloat(updatedData[`${quarter}_target`]) || 0;
        const sales = parseFloat(updatedData[`${quarter}_sales`]) || 0;
        const salesPercentage = target
          ? ((sales / target) * 100).toFixed(2)
          : 0;

        updatedData[`${quarter}_sales_percentage`] = salesPercentage;

        totalTarget += target;
        totalSales += sales;
      });

      updatedData.total_target = totalTarget;
      updatedData.total_sales = totalSales;
      updatedData.total_sales_percentage = totalTarget
        ? ((totalSales / totalTarget) * 100).toFixed(2)
        : 0;

      return updatedData;
    });
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...formData];
    updatedData[index][field] = value;
    // Recalculate sales percentages and totals
    const recalculatedData = calculateUpdatedData(updatedData);
    setFormData(recalculatedData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const  created_by = userDetial.data.user_id || userDetial.data.email
      const res = await updateSalesData(formData,created_by);
      if (res) {
        toast.success("Sales Data Updated Successfully");
        setTimeout(() => {
          dispatch(setReload(true)); // Reload the page after 1 second
          setEditSalesMatrix(false);
        }, 500);
      } else {
        alert("Failed to update sales data");
        console.error("Update failed:", res);
      }
    } catch (error) {
      console.error("Error updating sales data:", error);
      alert("An error occurred while updating sales data.");
    }
  };

  const getUserFullName = (amId) => {
    if (amId === 0) return "AM";
    const user = userData.find((user) => parseInt(user.user_id, 10) === amId);
    return user ? `${user.user_fname} ${user.user_lname}` : "User not found";
  };

  return (
    <div
      className="modal fade show"
      id="editSalesMatrixModal"
      tabIndex="-1"
      aria-labelledby="editSalesMatrixModal"
      style={{ display: "block", paddingLeft: "0px" }}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Edit Sales</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setEditSalesMatrix(false)}
            ></button>
          </div>
          <div className="modal-body">
            <form
              className="js-validate needs-validation sales_matrix_edit_form"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="table-responsive datatable-custom datatable-custom-centered">
                <table
                  id="datatable_edit"
                  className="table table-sm table-thead-bordered table-nowrap table-align-middle card-table mb-0"
                >
                  <thead className="thead-light">
                    <tr>
                      <th>AM</th>
                      {["Q1", "Q2", "Q3", "Q4", "Total"].map(
                        (quarter, index) => (
                          <th key={index} className="text-center">
                            {quarter}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <thead className="thead-light">
                    <tr>
                      <th></th>
                      {["Q1", "Q2", "Q3", "Q4", "Total"].map(
                        (quarter, index) => (
                          <th key={index} className="text-center py-0">
                            <table className="table table-sm table-borderless table-nowrap table-align-middle mb-0">
                              <tbody>
                                <tr>
                                  <td>Target</td>
                                  <td>Sales</td>
                                  <td>Sales%</td>
                                </tr>
                              </tbody>
                            </table>
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {formData.map((data, index) => (
                      <tr key={data.sales_matrix_id}>
                        <td className="bg-white py-0">
                          <input
                            type="hidden"
                            name="sales_matrix_id[]"
                            value={data.sales_matrix_id}
                          />
                          {getUserFullName(parseInt(data.am, 10))}
                        </td>
                        {["q1", "q2", "q3", "q4"].map((quarter) => (
                          <td key={quarter} className="text-center py-0">
                            <table className="table table-sm table-borderless table-nowrap table-align-middle mb-0">
                              <tbody>
                                <tr>
                                  <td>
                                    <input
                                      type="number"
                                      name={`${quarter}_target[]`}
                                      value={data[`${quarter}_target`]}
                                      onChange={(e) =>
                                        handleInputChange(
                                          index,
                                          `${quarter}_target`,
                                          e.target.value
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      name={`${quarter}_sales[]`}
                                      value={data[`${quarter}_sales`]}
                                      onChange={(e) =>
                                        handleInputChange(
                                          index,
                                          `${quarter}_sales`,
                                          e.target.value
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      name={`${quarter}_sales_percentage[]`}
                                      value={
                                        data[`${quarter}_sales_percentage`]
                                      }
                                      readOnly
                                      style={{ textAlign: "center" }}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        ))}
                        <td className="text-center py-0">
                          <table className="table table-sm table-borderless table-nowrap table-align-middle mb-0">
                            <tbody>
                              <tr>
                                <td>
                                  <input
                                    type="number"
                                    name="total_target[]"
                                    value={data.total_target}
                                    readOnly
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="total_sales[]"
                                    value={data.total_sales}
                                    readOnly
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="total_sales_percentage[]"
                                    value={data.total_sales_percentage}
                                    readOnly
                                    style={{ textAlign: "center" }}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="align-items-sm-center justify-content-end mt-3 mx-n2 row">
                <div className="col-sm-auto">
                  <div className="d-flex gap-3">
                    <button
                      type="button"
                      className="btn btn-white"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary sales_matrix_update_btn"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSalesMatrix;
