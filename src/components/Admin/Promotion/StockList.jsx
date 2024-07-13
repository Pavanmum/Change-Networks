import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductData } from "../../../store/api/Admin/promotion.js";
import {
  setSelectedBoxData,
  setDownload,
} from "../../../store/slices/Admin/promotionSlice.js";
import * as XLSX from "xlsx";

const StockList = ({setHandleReload,handleReload}) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const locations = useSelector((state) => state.promotionSlice.locations);
  const checkboxes = useSelector((state) => state.promotionSlice.checkboxes);
  const Download = useSelector((state) => state.promotionSlice.download);
  const searchTerm = useSelector((state)=>state.dashboardSlice.searchedValue);
  // Moved state management outside of filtering
useEffect(() => {
  if(handleReload){
    handleSelectRow(null);
    const fetchData = async () => {
      try {
        const response = await fetchProductData();
        setProducts(response);
        if(response){
          dispatch(setSelectedBoxData(null))
          setHandleReload(false)
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    
    fetchData();
  }
}, [dispatch,setHandleReload,handleReload]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProductData();
        setProducts(response);
        if(response){
          dispatch(setSelectedBoxData(null))
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Filtering products
  const filteredProducts = products.filter((product) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const matchesSearchTerm = (field) =>
      field && field.toLowerCase().includes(lowerCaseSearchTerm);

    return (
      (!locations || locations === product.ex_work) &&
      (matchesSearchTerm(product.brand) ||
        matchesSearchTerm(product.ex_work) ||
        matchesSearchTerm(product.type) ||
        matchesSearchTerm(product.condition_status) ||
        matchesSearchTerm(product.category) ||
        matchesSearchTerm(product.model_no) ||
        matchesSearchTerm(product.description) ||
        matchesSearchTerm(product.availability) ||
        matchesSearchTerm(product.remark))
    );
  });

  const handleSort = (column) => {
    if (column === sortedColumn) {
      setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    } else {
      setSortedColumn(column);
      setSortOrder("ascending");
    }
  };

  const sortedFilteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortedColumn) {
      const aValue = a[sortedColumn];
      const bValue = b[sortedColumn];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "ascending"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === "ascending" ? aValue - bValue : bValue - aValue;
      }
    }
    return 0;
  });

  const handleSelectRow = (index) => {
    setSelectedRowIndex(index === selectedRowIndex ? null : index);
    if (index === null) {
      dispatch(setSelectedBoxData(""));
    } else {
      dispatch(setSelectedBoxData(sortedFilteredProducts[index]));
    }
  };

  // Optimized useEffect for handling data download
  useEffect(() => {
    if (Download) {
      const dataToExport = sortedFilteredProducts.map((product) => ({
        Brand: checkboxes.Brand ? product.brand : undefined,
        Location: checkboxes.Location ? product.ex_work : undefined,
        Type: !checkboxes.Type ? product.type : undefined,
        Condition: checkboxes.condition ? product.condition_status : undefined,
        Category: checkboxes.category ? product.category : undefined,
        Model_No: product.model_no,
        Description: checkboxes.description ? product.description : undefined,
        Price: !checkboxes.price ? product.price : undefined,
        Availability: !checkboxes.availability
          ? product.availability
          : undefined,
        Remark: checkboxes.remark ? product.remark : undefined,
        Qty: checkboxes.qty ? product.qty : undefined,
      }));

      const filteredDataToExport = dataToExport.map((item) => {
        return Object.fromEntries(
          Object.entries(item).filter(([_, v]) => v !== undefined)
        );
      });

      const worksheet = XLSX.utils.json_to_sheet(filteredDataToExport);
      const range = XLSX.utils.decode_range(worksheet["!ref"]);
      worksheet["!autofilter"] = { ref: XLSX.utils.encode_range(range) };

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet,"Promotion List");

      XLSX.writeFile(workbook, "Promotion_list.xlsx");
      dispatch(setDownload(false));
    }
  }, [Download, sortedFilteredProducts, checkboxes, dispatch]);

  const availabilityColors = {
    Few: "bg-warning",
    Sufficient: "bg-success",
    Limited: "bg-danger",
  };

  return (
    <div className="table-responsive " >
      <table
        id="datatable"
        className="w-100  table table-sm table-nowrap table-align-middle table-hover card-table stock_list_table  "
        style={{ height: "20%" }}
      >
        <thead style={{ position: "sticky", top: "10" }}>
          <tr>
            {checkboxes.checkBox && (
              <th className="table-column-pe-0">
                <div className="form-check">
                  <label
                    className="form-check-label"
                    htmlFor="datatableCheckAll"
                  ></label>
                </div>
              </th>
            )}
            {checkboxes.Brand && (
              <th
                className={`sorting ${
                  sortedColumn === "brand"
                    ? sortOrder === "ascending"
                      ? "sorting_desc"
                      : ""
                    : ""
                }`}
                onClick={() => handleSort("brand")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Brand: activate to sort column ascending"
                aria-sort={sortedColumn === "brand" ? sortOrder : "none"}
              >
                Brand
              </th>
            )}
            {checkboxes.Location && (
              <th
                className={`sorting ${
                  sortedColumn === "ex_work"
                    ? sortOrder === "ascending"
                      ? "sorting_desc"
                      : ""
                    : ""
                }`}
                onClick={() => handleSort("ex_work")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Location: activate to sort column ascending"
                aria-sort={sortedColumn === "ex_work" ? sortOrder : "none"}
              >
                Location
              </th>
            )}
            <th
              className={`sorting ${
                sortedColumn === "type"
                  ? sortOrder === "ascending"
                    ? "sorting_desc"
                    : ""
                  : ""
              }`}
              onClick={() => handleSort("type")}
              tabIndex="0"
              aria-controls="datatable"
              rowSpan="1"
              colSpan="1"
              aria-label="Type: activate to sort column ascending"
              aria-sort={sortedColumn === "type" ? sortOrder : "none"}
            >
              Type
            </th>
            {checkboxes.condition && (
              <th
                className={`sorting ${
                  sortedColumn === "condition_status"
                    ? sortOrder === "ascending"
                      ? "sorting_desc"
                      : ""
                    : ""
                }`}
                onClick={() => handleSort("condition_status")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Condition: activate to sort column ascending"
                aria-sort={
                  sortedColumn === "condition_status" ? sortOrder : "none"
                }
              >
                Condition
              </th>
            )}
            {checkboxes.category && (
              <th
                className={`sorting ${
                  sortedColumn === "category"
                    ? sortOrder === "ascending"
                      ? "sorting_desc"
                      : ""
                    : ""
                }`}
                onClick={() => handleSort("category")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Category: activate to sort column ascending"
                aria-sort={sortedColumn === "category" ? sortOrder : "none"}
              >
                Category
              </th>
            )}
            <th
              className={`sorting ${
                sortedColumn === "model_no"
                  ? sortOrder === "ascending"
                    ? "sorting_desc"
                    : ""
                  : ""
              }`}
              onClick={() => handleSort("model_no")}
              tabIndex="0"
              aria-controls="datatable"
              rowSpan="1"
              colSpan="1"
              aria-label="Model #: activate to sort column ascending"
              aria-sort={sortedColumn === "model_no" ? sortOrder : "none"}
            >
              Model #
            </th>
            {checkboxes.description && (
              <th
                className={`sorting ${
                  sortedColumn === "description"
                    ? sortOrder === "ascending"
                      ? "sorting_desc"
                      : ""
                    : ""
                }`}
                onClick={() => handleSort("description")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Description: activate to sort column ascending"
                aria-sort={sortedColumn === "description" ? sortOrder : "none"}
              >
                Description
              </th>
            )}
            {checkboxes.stock && (
              <th
                className={`sorting ${
                  sortedColumn === "price"
                    ? sortOrder === "ascending"
                      ? "sorting_desc"
                      : ""
                    : ""
                }`}
                onClick={() => handleSort("price")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Price: activate to sort column ascending"
                aria-sort={sortedColumn === "price" ? sortOrder : "none"}
              >
                Price
              </th>
            )}
            {!checkboxes.availability && (
              <th
                className={`sorting ${
                  sortedColumn === "availability"
                    ? sortOrder === "ascending"
                      ? "sorting_desc"
                      : ""
                    : ""
                }`}
                onClick={() => handleSort("availability")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Availability: activate to sort column ascending"
                aria-sort={sortedColumn === "availability" ? sortOrder : "none"}
              >
                Availability
              </th>
            )}
            {checkboxes.qty && (
              <th
                className={`sorting ${
                  sortedColumn === "qty"
                    ? sortOrder === "ascending"
                      ? "sorting_desc"
                      : ""
                    : ""
                }`}
                onClick={() => handleSort("qty")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Qty: activate to sort column ascending"
                aria-sort={sortedColumn === "qty" ? sortOrder : "none"}
              >
                Qty
              </th>
            )}
            {checkboxes.remark && (
              <th
                className={`sorting ${
                  sortedColumn === "remark"
                    ? sortOrder === "ascending"
                      ? "sorting_desc"
                      : ""
                    : ""
                }`}
                onClick={() => handleSort("remark")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Remark: activate to sort column ascending"
                aria-sort={sortedColumn === "remark" ? sortOrder : "none"}
              >
                Remark
              </th>
            )}
          </tr>
        </thead>

        <tbody className="" style={{ overflowY: "auto" }}>
          {sortedFilteredProducts.length > 0 ? (
            sortedFilteredProducts.map((product, index) => (
              <tr key={index}>
                {checkboxes.checkBox && (
                  <td >
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        onClick={() => handleSelectRow(index)}
                        value=""
                        id={`datatableCheck-${index}`}
                        checked={selectedRowIndex === index}
                        onChange={(event) => {
                          if (event.target.checked) {
                            handleSelectRow(index);
                          } else {
                            handleSelectRow(null);
                          }
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`datatableCheck-${index}`}
                      ></label>
                    </div>
                  </td>
                )}
                {checkboxes.Brand && <td>{product.brand}</td>}
                {checkboxes.Location && <td>{product.ex_work}</td>}
                <td>{product.type}</td>
                {checkboxes.condition && <td>{product.condition_status}</td>}
                {checkboxes.category && <td>{product.category}</td>}
                <td>{product.model_no}</td>
                {checkboxes.description && <td>{product.description}</td>}
                {checkboxes.stock && <td>${product.price}</td>}
                {!checkboxes.availability && (
                  <td>
                    <span
                      className={`legend-indicator ${
                        availabilityColors[product.availability]
                      }`}
                    ></span>{" "}
                    {product.availability}
                  </td>
                )}
                {checkboxes.qty && <td>{product.qty}</td>}
                {checkboxes.remark && <td>{product.remark}</td>}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="100%">
                <div className="no-data-container">
                  <img
                    className="mb-3"
                    src="http://192.168.1.161/change_pp/assets/svg/illustrations/oc-error.svg"
                    alt=""
                    style={{ width: "10rem" }}
                    data-hs-theme-appearance="default"
                  />
                  <p className="mb-0">No data to show</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
