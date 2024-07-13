import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductData } from "../../../store/api/Admin/priceList.js";
import {
  setSelectedBoxData,
  setDownload,
} from "../../../store/slices/Admin/priceListSlice.js";
import * as XLSX from "xlsx";

const StockList = ({setHandleReload,handleReload}) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("ascending"); // or 'descending'
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const brands = useSelector((state) => state.priceListSlice.brands);
  const categories = useSelector((state) => state.priceListSlice.categories);
  const conditions = useSelector((state) => state.priceListSlice.conditions);
  const locations = useSelector((state) => state.priceListSlice.locations);
  const series = useSelector((state) => state.priceListSlice.series);
  const stocks = useSelector((state) => state.priceListSlice.stocks);
  const checkboxes = useSelector((state) => state.priceListSlice.checkboxes);
  const Download = useSelector((state) => state.priceListSlice.download);
  const searchTerm = useSelector((state)=>state.dashboardSlice.searchedValue);
  useEffect(() => {
    if(handleReload){
      handleSelectRow(null);
console.log(1);
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

  // Filter products based on selected filter values
  const filteredProducts = products.filter((product) =>
    (!brands || brands === product.brand) &&
    (!categories || categories === product.category) &&
    (!conditions || conditions === product.condition_status) &&
    (!locations || locations === product.ex_work) &&
    (!series || series === product.series) &&
    (!stocks || stocks === product.stock_status) &&
    (searchTerm === "" || 
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.condition_status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.ex_work.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.series.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.model_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle sorting when a table header is clicked
  const handleSort = (column) => {
    if (column === sortedColumn) {
      // Toggle sort order
      setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    } else {
      // Set new sorted column and default to ascending order
      setSortedColumn(column);
      setSortOrder("ascending");
    }
  };

  // Sort the filtered products array based on the sorting criteria
  const sortedFilteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortedColumn) {
      const aValue = a[sortedColumn];
      const bValue = b[sortedColumn];
      if (sortOrder === "ascending") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    }
    return 0;
  });
  const data = sortedFilteredProducts.length;
  const handleSelectRow = (index) => {
    setSelectedRowIndex(index === selectedRowIndex ? null : index);
    if (index === null) {
      dispatch(setSelectedBoxData(""));
    } else {
      dispatch(setSelectedBoxData(sortedFilteredProducts[index]));
    }
  };
  useEffect(() => {
    if (Download) {
      const dataToExport = sortedFilteredProducts.map((product) => ({
        Brand: checkboxes.Brand ? product.brand : undefined,
        Location: checkboxes.Location ? product.ex_work : undefined,
        Stock: checkboxes.stock ? product.stock_status : undefined,
        Condition: checkboxes.condition ? product.condition_status : undefined,
        Category: checkboxes.category ? product.category : undefined,
        Series: checkboxes.series ? product.series : undefined,
        Qty: checkboxes.qty ? product.qty : undefined,
        Model_No: product.model_no,
        Description: checkboxes.description ? product.description : undefined,
        "1+": product.price_level_1,
        "10+": product.price_level_2,
        "25+": product.price_level_3,
        "50+": product.price_level_4,
        "100+": product.price_level_5,
        "Take All": product.price_level_6,
        Remark: checkboxes.remark ? product.remark : undefined,
      }));

      const filteredDataToExport = dataToExport.map((item) => {
        return Object.fromEntries(
          Object.entries(item).filter(([_, v]) => v !== undefined)
        );
      });

      const worksheet = XLSX.utils.json_to_sheet(filteredDataToExport);

      // Enable filtering on Excel columns
      const range = XLSX.utils.decode_range(worksheet["!ref"]);
      worksheet["!autofilter"] = { ref: XLSX.utils.encode_range(range)};

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Stock List");

      XLSX.writeFile(workbook, "stock_list.xlsx");
      dispatch(setDownload(false));
    }
  }, [Download, sortedFilteredProducts, checkboxes, dispatch]);

  return (
    <div
      className="table-responsive "
      style={{ height: '80vh'  }}
    >
      <table
        id="datatable"
        className="w-100  table table-sm table-nowrap table-align-middle table-hover card-table stock_list_table  " style={{height:'20%'}}
      >
        <thead style={{ position: "sticky", 
            top: "0" }}> 
          <tr>
            {checkboxes.checkBox && (
              <th className="table-column-pe-0">
                <div className="form-check ">
                  <label
                  style={{width:25}}
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
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                onClick={() => handleSort("brand")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Brand: activate to sort column ascending"
                style={{ width: "78.7188px" }}
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
                      ? "sorting_asc"
                      : "sorting_desc"
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
            {checkboxes.stock && (
              <th
                className={`sorting ${
                  sortedColumn === "stock"
                    ? sortOrder === "ascending"
                      ? "sorting_desc"
                      : ""
                    : ""
                }`}
                onClick={() => handleSort("stock_status")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Stock: activate to sort column ascending"
                style={{ width: "60.625px" }}
              >
                Stock
              </th>
            )}
            {checkboxes.condition && (
              <th
                className={`sorting ${
                  sortedColumn === "condition"
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
                style={{ width: "85.969px" }}
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
                style={{ width: "93.938px" }}
              >
                Category
              </th>
            )}
            {checkboxes.series && (
              <th
                className={`sorting ${
                  sortedColumn === "series"
                    ? sortOrder === "ascending"
                      ? "sorting_desc"
                      : ""
                    : ""
                }`}
                onClick={() => handleSort("series")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Series: activate to sort column ascending"
                style={{ width: "70.0938px" }}
              >
                Series
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
                style={{ width: "43.6562px" }}
              >
                Qty
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
              style={{ width: "176.25px" }}
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
                style={{ width: "691.797px" }}
              >
                Description
              </th>
            )}
            <th
              className={`sorting ${
                sortedColumn === "price_level_1"
                  ? sortOrder === "ascending"
                    ? "sorting_desc"
                    : ""
                  : ""
              }`}
              onClick={() => handleSort("price_level_1")}
              tabIndex="0"
              aria-controls="datatable"
              rowSpan="1"
              colSpan="1"
              aria-label="1+: activate to sort column ascending"
              style={{ width: "39.7656px" }}
            >
              1+
            </th>
            <th
              className={`sorting ${
                sortedColumn === "price_level_2"
                  ? sortOrder === "ascending"
                    ? "sorting_desc"
                    : ""
                  : ""
              }`}
              onClick={() => handleSort("price_level_2")}
              tabIndex="0"
              aria-controls="datatable"
              rowSpan="1"
              colSpan="1"
              aria-label="10+: activate to sort column ascending"
              style={{ width: "39.7656px" }}
            >
              10+
            </th>
            <th
              className={`sorting ${
                sortedColumn === "price_level_3"
                  ? sortOrder === "ascending"
                    ? "sorting_desc"
                    : ""
                  : ""
              }`}
              onClick={() => handleSort("price_level_3")}
              tabIndex="0"
              aria-controls="datatable"
              rowSpan="1"
              colSpan="1"
              aria-label="25+: activate to sort column ascending"
              style={{ width: "39.375px" }}
            >
              25+
            </th>
            <th
              className={`sorting ${
                sortedColumn === "price_level_4"
                  ? sortOrder === "ascending"
                    ? "sorting_desc"
                    : ""
                  : ""
              }`}
              onClick={() => handleSort("price_level_4")}
              tabIndex="0"
              aria-controls="datatable"
              rowSpan="1"
              colSpan="1"
              aria-label="50+: activate to sort column ascending"
              style={{ width: "39.375px" }}
            >
              50+
            </th>
            <th
              className={`sorting ${
                sortedColumn === "price_level_5"
                  ? sortOrder === "ascending"
                    ? "sorting_desc"
                    : ""
                  : ""
              }`}
              onClick={() => handleSort("price_level_5")}
              tabIndex="0"
              aria-controls="datatable"
              rowSpan="1"
              colSpan="1"
              aria-label="100+: activate to sort column ascending"
              style={{ width: "46px" }}
            >
              100+
            </th>
            <th
              className={`sorting ${
                sortedColumn === "take_all"
                  ? sortOrder === "ascending"
                    ? "sorting_desc"
                    : ""
                  : ""
              }`}
              onClick={() => handleSort("price_level_6")}
              tabIndex="0"
              aria-controls="datatable"
              rowSpan="1"
              colSpan="1"
              aria-label="Take All: activate to sort column ascending"
              style={{ width: "76.7031px" }}
            >
              Take All
            </th>
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
                style={{ width: "98.047px" }}
              >
                Remark
              </th>
            )}
            
          </tr>
        </thead>

        <tbody className="" style={{overflowY: "auto"}}>
          {data > 0 ? (
            sortedFilteredProducts.map((product, index) => (
              <tr key={index} >
                {checkboxes.checkBox && (
                  <td >
                    <div className="form-check">
                      <input
                        className="form-check-input "
                        type="checkbox"
                        onClick={() => handleSelectRow(index)}
                        value=""
                        style={{fontSize:16,marginLeft:0.1}}
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
                {checkboxes.stock && <td>{product.stock_status}</td>}
                {checkboxes.condition && <td>{product.condition_status}</td>}
                {checkboxes.category && <td>{product.category}</td>}
                {checkboxes.series && <td>{product.series}</td>}
                {checkboxes.qty && <td>{product.qty}</td>}
                <td>{product.model_no}</td>
                {checkboxes.description && <td>{product.description}</td>}

                <td>
                  {product.price_level_1 ? (
                    <div>${product.price_level_1}</div>
                  ) : (
                    ""
                  )}
                </td>

                {/* Add more price levels if needed */}
                <td>
                  {product.price_level_2 ? (
                    <div>${product.price_level_2}</div>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {product.price_level_3 ? (
                    <div>${product.price_level_3}</div>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {product.price_level_4 ? (
                    <div>${product.price_level_4}</div>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {product.price_level_5 ? (
                    <div>${product.price_level_5}</div>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {product.price_level_6 ? (
                    <div>${product.price_level_6}</div>
                  ) : (
                    ""
                  )}
                </td>
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
