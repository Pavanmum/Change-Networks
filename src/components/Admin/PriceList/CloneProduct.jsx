import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchProductData,
  cloneProductData,
} from "../../../store/api/Admin/priceList.js";
import { selectUserDetail } from "../../../store/slices/Admin/authSlice.js";

const CloneProduct = ({ setShowCloneBox,setHandleReload}) => {
  const selectedData = useSelector(
    (state) => state.priceListSlice.selectedBoxData
  );
  const  userDetial = useSelector(selectUserDetail);
  const [brands, setBrandsState] = useState([]);
  const [locations, setLocationsState] = useState([]);
  const [stocks, setStocksState] = useState([]);
  const [conditions, setConditionsState] = useState([]);
  const [categories, setCategoriesState] = useState([]);
  const [series, setSeriesState] = useState([]);
 
  const [selectedBrand, setSelectedBrand] = useState(selectedData.brand || "");
  const [selectedCategory, setSelectedCategory] = useState(
    selectedData.category || ""
  );
  const [selectedCondition, setSelectedCondition] = useState(
    selectedData.condition_status || ""
  );
  const [selectedLocation, setSelectedLocation] = useState(
    selectedData.ex_work || ""
  );
  const [selectedSeries, setSelectedSeries] = useState(
    selectedData.series || ""
  );
  const [selectedStock, setSelectedStock] = useState(
    selectedData.stock_status || ""
  );
  const [selectedModel, setSelectedModel] = useState(
    selectedData.model_no || ""
  );
  const [priceLevel1, setPriceLevel1] = useState(
    selectedData.price_level_1 || ""
  );
  const [priceLevel2, setPriceLevel2] = useState(
    selectedData.price_level_2 || ""
  );
  const [priceLevel3, setPriceLevel3] = useState(
    selectedData.price_level_3 || ""
  );
  const [priceLevel4, setPriceLevel4] = useState(
    selectedData.price_level_4 || ""
  );
  const [priceLevel5, setPriceLevel5] = useState(
    selectedData.price_level_5 || ""
  );
  const [priceLevel6, setPriceLevel6] = useState(
    selectedData.price_level_6 || ""
  );

  // Define state variables for quantity, description, and remark
  const [quantity, setQuantity] = useState(selectedData.qty || "");
  const [description, setDescription] = useState(
    selectedData.description || ""
  );
  const [remark, setRemark] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProductData();

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
    setSelectedStock(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
const created_by=userDetial.data.user_id || userDetial.data.email
    try {
      const response = await cloneProductData(
        selectedModel,
        description,
        selectedCategory,
        selectedSeries,
        selectedBrand,
        selectedLocation,
        priceLevel1,
        priceLevel2,
        priceLevel3,
        priceLevel4,
        priceLevel5,
        priceLevel6,
        quantity,
        selectedStock,
        selectedCondition,
        remark,
        created_by

      );
      if (response) {
        setHandleReload(true)
      }
      setShowCloneBox(false);
      toast.success("Successfully product Clone");
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
                Clone Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowCloneBox(false)}
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
                            name="filter_category"
                            className="form-select"
                            onChange={handleCategoryChange}
                            value={selectedCategory}
                          >
                            {categories.map((category, index) => (
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
                  </div>
                  <div className="row">
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
                            name="filter_series"
                            className="form-select"
                            onChange={handleSeriesChange}
                            value={selectedSeries}
                          >
                            <option value="">All</option>
                            {series.map((serie, index) => (
                              <option key={index} value={serie}>
                                {serie}
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
                            value={selectedStock}
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
                            value={priceLevel1}
                            onChange={(e) => setPriceLevel1(e.target.value)}
                          />
                          <span className="invalid-feedback">
                            Field cannot be empty.
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="input-group mb-3">
                          <span className="input-group-text">$</span>
                          <input
                            type="number"
                            className="form-control"
                            name="price_level_4"
                            placeholder="10+ Price*"
                            aria-label="Price"
                            required=""
                            value={priceLevel2}
                            onChange={(e) => setPriceLevel2(e.target.value)}
                          />
                          <span className="invalid-feedback">
                            Field cannot be empty.
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="input-group mb-3">
                          <span className="input-group-text">$</span>
                          <input
                            type="number"
                            className="form-control"
                            name="price_level_4"
                            placeholder="25+ Price*"
                            aria-label="Price"
                            required=""
                            value={priceLevel3}
                            onChange={(e) => setPriceLevel3(e.target.value)}
                          />
                          <span className="invalid-feedback">
                            Field cannot be empty.
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="input-group mb-3">
                          <span className="input-group-text">$</span>
                          <input
                            type="number"
                            className="form-control"
                            name="price_level_4"
                            placeholder="50+ Price*"
                            aria-label="Price"
                            required=""
                            value={priceLevel4}
                            onChange={(e) => setPriceLevel4(e.target.value)}
                          />
                          <span className="invalid-feedback">
                            Field cannot be empty.
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="input-group mb-3">
                          <span className="input-group-text">$</span>
                          <input
                            type="number"
                            className="form-control"
                            name="price_level_5"
                            placeholder="100+ Price*"
                            aria-label="Price"
                            required=""
                            value={priceLevel5}
                            onChange={(e) => setPriceLevel5(e.target.value)}
                          />
                          <span className="invalid-feedback">
                            Field cannot be empty.
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="input-group mb-3">
                          <span className="input-group-text">$</span>
                          <input
                            type="number"
                            className="form-control"
                            name="price_level_6"
                            placeholder="Take All*"
                            aria-label="Price"
                            required=""
                            value={priceLevel6}
                            onChange={(e) => setPriceLevel6(e.target.value)}
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
                    Clone
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

export default CloneProduct;
