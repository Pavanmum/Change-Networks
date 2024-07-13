import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectUserDetail } from "../../../store/slices/Admin/authSlice.js";
import {
  fetchProductData,
  UpdateProductData,
} from "../../../store/api/Admin/promotion.js";

const EditProduct = ({ setShowEditBox ,setHandleReload}) => {
  const selectedData = useSelector(
    (state) => state.promotionSlice.selectedBoxData
  );
  const  userDetial = useSelector(selectUserDetail);
  const [brands, setBrandsState] = useState([]);
  const [locations, setLocationsState] = useState([]);
  const [stocks, setStocksState] = useState([]);
  const [conditions, setConditionsState] = useState([]);
  const [type, setTypeState] = useState([]);
  const [category, setCategoryState] = useState([]);
  console.log(selectedData);
  const [selectedBrand, setSelectedBrand] = useState(selectedData.brand || "");
  const [selectedCategory, setSelectedCategory] = useState(
    selectedData.type || ""
  );
  const [selectedCondition, setSelectedCondition] = useState(
    selectedData.condition_status || ""
  );
  const [selectedLocation, setSelectedLocation] = useState(
    selectedData.ex_work || ""
  );
  const [selectedSeries, setSelectedSeries] = useState(
    selectedData.category || ""
  );
  const [selectedavailability, setSelectedavailability] = useState(
    selectedData.availability || ""
  );
  const [selectedModel, setSelectedModel] = useState(
    selectedData.model_no || ""
  );
  const [price, setPrice] = useState(selectedData.price || "");

  // Define state variables for quantity, description, and remark
  const [quantity, setQuantity] = useState(selectedData.qty || "");
  const [description, setDescription] = useState(
    selectedData.description || ""
  );
  const [remark, setRemark] = useState(selectedData.remark || "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProductData();
        console.log(response);
        const uniqueValues = (key) => [
          ...new Set(response.map((item) => item[key])),
        ];

        setBrandsState(uniqueValues("brand"));
        setLocationsState(uniqueValues("ex_work"));
        setStocksState(uniqueValues("availability"));
        setConditionsState(uniqueValues("condition_status"));
        setTypeState(uniqueValues("type"));
        setCategoryState(uniqueValues("category"));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleConditionChange = (event) => {
    setSelectedCondition(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleSeriesChange = (event) => {
    setSelectedSeries(event.target.value);
  };

  const handleStockChange = (event) => {
    setSelectedavailability(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const updatedData = {
        type: selectedCategory,
        category: selectedSeries,
        brand: selectedBrand,
        ex_work: selectedLocation,
        availability: selectedavailability,
        condition_status: selectedCondition,
        model_no: selectedModel,
        price: price,
        qty: quantity,
        description: description,
        remark: remark,
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
const updated_by = userDetial.data.user_id || userDetial.data.email;
      // Call the API with the updated data
      const response = await UpdateProductData(updatedDataToSend, id,updated_by);

      if (response) {
        setHandleReload(true)
      }
      setShowEditBox(false);
      toast.success("Successfully product updated");
      // Handle response accordingly
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <div>
      <div
        className="modal fade show"
        id="editStockModal"
        aria-labelledby="editStockModal"
        style={{ display: "block", paddingLeft: "0px" }}
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
                method="post"
                action="#"
                onSubmit={handleSubmit}
              >
                <div id="">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="mb-3">
                        <div
                          className="tom-select-custom"
                          data-hs-validation-validate-className=""
                        >
                          <select
                            name="filter_brand"
                            className="form-select"
                            onChange={handleBrandChange}
                            value={selectedBrand}
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
                    <div className="col-sm-4">
                      <div className="mb-3">
                        <div
                          className="tom-select-custom"
                          data-hs-validation-validate-className=""
                        >
                          <select
                            name="filter_location"
                            className="form-select"
                            onChange={handleLocationChange}
                            value={selectedLocation}
                          >
                            <option value="">All</option>
                            {locations.map((location, index) => (
                              <option key={index} value={location}>
                                {location}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="mb-3">
                        <div
                          className="tom-select-custom"
                          data-hs-validation-validate-className=""
                        >
                          <select
                            name="filter_category"
                            className="form-select"
                            onChange={handleCategoryChange}
                            value={selectedCategory}
                          >
                            {type.map((type, index) => (
                              <option key={index} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-4">
                      <div className="mb-3">
                        <div
                          className="tom-select-custom"
                          data-hs-validation-validate-className=""
                        >
                          <select
                            name="filter_condition"
                            className="form-select"
                            onChange={handleConditionChange}
                            value={selectedCondition}
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
                    <div className="col-sm-4">
                      <div className="mb-3">
                        <div
                          className="tom-select-custom"
                          data-hs-validation-validate-className=""
                        >
                          <select
                            name="filter_series"
                            className="form-select"
                            onChange={handleSeriesChange}
                            value={selectedSeries}
                          >
                            {category.map((category, index) => (
                              <option key={index} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="mb-3">
                        <div
                          className="tom-select-custom"
                          data-hs-validation-validate-className=""
                        >
                          <select
                            name="filter_stock"
                            className="form-select"
                            onChange={handleStockChange}
                            value={selectedavailability}
                          >
                            {stocks.map((stock, index) => (
                              <option key={index} value={stock}>
                                {stock}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            name="model_no"
                            id=""
                            placeholder="Model"
                            aria-label="Model"
                            required=""
                            value={selectedModel}
                            onChange={(e) => setSelectedModel(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="input-group mb-3">
                          <span className="input-group-text">$</span>
                          <input
                            type="number"
                            className="form-control"
                            name="price_level_4"
                            placeholder="Price*"
                            aria-label="Price"
                            required=""
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                          <span className="invalid-feedback">
                            Field cannot be empty.
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-2">
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control hightlight_qty"
                            name="qty"
                            id=""
                            placeholder="Qty*"
                            aria-label="Qty"
                            required=""
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                          <span className="invalid-feedback">
                            Field cannot be empty.
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="mb-3">
                            <textarea
                              id=""
                              className="form-control"
                              name="description"
                              placeholder="Description"
                              rows="4"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                            <span className="invalid-feedback">
                              Field cannot be empty.
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="mb-4">
                            <textarea
                              id=""
                              className="form-control"
                              name="remark"
                              placeholder="Remark"
                              rows="4"
                              value={remark}
                              onChange={(e) => setRemark(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary stock_copy_btn"
                    name="copy_btn"
                    value="copy"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
