import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UpdateProductData } from "../../../store/api/Admin/weightList.js";
import { selectUserDetail } from "../../../store/slices/Admin/authSlice.js";
const EditProduct = ({ setShowEditBox ,setHandleReload}) => {
  // Get the selected product data from the Redux store
  const selectedData = useSelector(
    (state) => state.weightListSlice.selectedBoxData
  );
  // State for form fields
  const  userDetial = useSelector(selectUserDetail);
  console.log(selectedData);
  const [model, setModel] = useState(selectedData.model_no || "");
  const [weight, setWeight] = useState(selectedData.weight_kg || "");
  const [dimension, setDimension] = useState(selectedData.dimension_cm || "");

  // State for dropdown data
console.log(userDetial);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the updated data object
      const updatedData = {
        model_no: model,
        weight_kg: weight,
        dimension_cm: dimension,
      };
      
      const created_by = userDetial.data.user_id || userDetial.data.email ;
      // Filter out unchanged fields
      const updatedFields = Object.keys(updatedData).filter(
        (key) => updatedData[key] !== selectedData[key]
      );
      const updatedDataToSend = {};
      updatedFields.forEach((key) => {
        updatedDataToSend[key] = updatedData[key];
      });

      // Get the product ID
      const id = selectedData._id;

      // Call the API with the updated data
      const response = await UpdateProductData(updatedDataToSend, id,created_by);

      if (response) {
        toast.success("Product successfully updated");
        setShowEditBox(false);
        setHandleReload(true);
      }
    } catch (error) {
      toast.error("Failed to update product");
      console.error("Failed to update product:", error);
    }
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
    <div>
      <div
        className="modal fade show"
        id="editStockModal"
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newProjectModalLabel">
                Edit Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowEditBox(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="js-validate needs-validation stock_edit_form"
                onSubmit={handleSubmit}
              >
                <div className="row">
                  <div className="col-sm-4 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="model_no"
                      placeholder="Model"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-sm-3 mb-3">
                    <input
                      type="number"
                      className="form-control"
                      name="weight_kg"
                      placeholder="Weight (KG)"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-sm-5 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="dimension_cm"
                      placeholder="Dimension (WxHxD)"
                      value={dimension}
                      onChange={handleDimensionChange}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
