import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductData } from "../../../store/api/Admin/weightList.js";
import {
  setSelectedBoxData,
  setDownload,
} from "../../../store/slices/Admin/weightListSlice.js";
import * as XLSX from "xlsx";

const WeightList = ({setHandleReload,handleReload}) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const checkboxes = useSelector((state) => state.weightListSlice.checkboxes);
  const Download = useSelector((state) => state.weightListSlice.download);
  const searchTerm = useSelector((state)=>state.dashboardSlice.searchedValue);
  // State variables for filter inputs
  const [model, setModel] = useState("");
  const [weightKG, setWeightKG] = useState("");
  const [weightLBS, setWeightLBS] = useState("");
  const [dimension, setDimension] = useState("");

  useEffect(() => {
    if(handleReload){
      const fetchData = async () => {
        try {
          const response = await fetchProductData();
          setProducts(response);
          if(response){
            dispatch(setSelectedBoxData(null))
            setHandleReload(false)
            setSelectedRowIndex(null)
          }
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };
      fetchData();
    }
    }, [dispatch,setHandleReload,handleReload]);
  // Fetch product data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProductData();
        setProducts(response);
        if(response){
          dispatch(setSelectedBoxData(null))
          setSelectedRowIndex(null)
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  // Filtered products based on input values
  const filteredProducts = products.filter(
    (product) =>
      (!model || product.model_no.includes(model)) &&
      (!weightKG || product.weight_kg.toString().includes(weightKG)) &&
      (!weightLBS || product.weight_lbs.toString().includes(weightLBS)) &&
      (!dimension || product.dimension_cm.includes(dimension)) &&
      (!searchTerm || 
        Object.values(product).some((value) =>
          String(value).toLowerCase().includes(searchTerm.trim().toLowerCase())
        )
      )
    );
 

  // Sort products based on selected column and order
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

  // Handle row selection
  const handleSelectRow = (index) => {
    setSelectedRowIndex(index === selectedRowIndex ? null : index);
    dispatch(
      setSelectedBoxData(index === null ? "" : sortedFilteredProducts[index])
    );
  };

  // Handle data download
  useEffect(() => {
    if (Download) {
      const dataToExport = sortedFilteredProducts.map((product) => ({
        Model: product.model_no,
        "Weight (KG)": checkboxes.weightKG ? product.weight_kg : undefined,
        "Weight (LBS)": checkboxes.weightLBS ? product.weight_lbs : undefined,
        Dimensions: checkboxes.dimension ? product.dimension_cm : undefined,
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
      XLSX.utils.book_append_sheet(workbook, worksheet, "Weight List");

      XLSX.writeFile(workbook, "Weight_List.xlsx");
      dispatch(setDownload(false));
    }
  }, [Download, sortedFilteredProducts, checkboxes, dispatch]);

  // Handle sorting
  const handleSort = (column) => {
    if (column === sortedColumn) {
      setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    } else {
      setSortedColumn(column);
      setSortOrder("ascending");
    }
  };

  return (
    <div className="table-responsive" >
      <table
        id="datatable"
        className="w-100 table table-sm table-nowrap table-align-middle table-hover card-table"
        style={{ height: "20%" }}
      >
        <thead style={{ position: "sticky", top: "0" }}>
          <tr>
            {checkboxes.checkBox && (
              <th className="table-column-pe-0" style={{ width: "1px" }}>
                <div className="form-check">
                  <label
                    className="form-check-label"
                    htmlFor="datatableCheckAll"
                  ></label>
                </div>
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
              style={{ width: "126.25px" }}
              onClick={() => handleSort("model_no")}
              tabIndex="0"
              aria-controls="datatable"
              rowSpan="1"
              colSpan="1"
              aria-label="Model No: activate to sort column ascending"
              aria-sort={sortedColumn === "model_no" ? sortOrder : "none"}
            >
              MODEL #
            </th>
            {checkboxes.weightKG && (
              <th
                className={`sorting ${
                  sortedColumn === "weight_kg"
                    ? sortOrder === "ascending"
                      ? "sorting_desc"
                      : ""
                    : ""
                }`}
                onClick={() => handleSort("weight_kg")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Weight (KG): activate to sort column ascending"
                aria-sort={sortedColumn === "weight_kg" ? sortOrder : "none"}
                style={{ width: "175.328px" }}
              >
                WEIGHT (KG)
              </th>
            )}
            {checkboxes.weightLBS && (
              <th
                className={`sorting ${
                  sortedColumn === "weight_lbs"
                    ? sortOrder === "ascending"
                      ? "sorting_desc"
                      : ""
                    : ""
                }`}
                onClick={() => handleSort("weight_lbs")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Weight (LBS): activate to sort column ascending"
                style={{ width: "60.625px" }}
              >
                WEIGHT (LBS)
              </th>
            )}
            {checkboxes.dimension && (
              <th
                className={`sorting ${
                  sortedColumn === "dimension_cm"
                    ? sortOrder === "ascending"
                      ? "sorting_desc"
                      : ""
                    : ""
                }`}
                onClick={() => handleSort("dimension_cm")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Dimensions (CM): activate to sort column ascending"
                style={{ width: "85.969px" }}
              >
                DIMENSIONS (CM)
              </th>
            )}
          </tr>
        </thead>

        <tbody className="overflow-y-auto">
          {sortedFilteredProducts.length > 0 ? (
            sortedFilteredProducts.map((product, index) => (
              <tr key={index} onClick={() => handleSelectRow(index)}>
                {checkboxes.checkBox && (
                  <td>
                    <div className="form-check">
                      <input
                        className="form-check-input ml-1 "
                        style={{ fontSize: 16 }}
                        type="checkbox"
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
                <td>{product.model_no}</td>
                {checkboxes.weightKG && <td>{product.weight_kg}</td>}
                {checkboxes.weightLBS && <td>{product.weight_lbs}</td>}
                {checkboxes.dimension && <td>{product.dimension_cm}</td>}
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

export default WeightList;
