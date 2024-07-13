import { useState, useEffect } from "react";
import { getSalesData } from "../../../store/api/Admin/salesMatrix.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedBoxData,
  setDownload,
  setReload,
} from "../../../store/slices/Admin/salesMatrixSlice.js";
import { fetchUserData } from "../../../store/api/Admin/auth.js";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
const SalesMatrixTable = () => {
  const dispatch = useDispatch();
  const [salesData, setSalesData] = useState([]);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [userData, setUserData] = useState([]);
  const reload = useSelector((state) => state.salesMatrixSlice.reload);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const year = useSelector((state) => state.salesMatrixSlice.year);
  const selectedStatus = useSelector(
    (state) => state.salesMatrixSlice.selectedStatus
  );
  const download = useSelector((state) => state.salesMatrixSlice.download);

  const fetchData = async () => {
    try {
      const res = await getSalesData();
      const userResponse = await fetchUserData();
      setUserData(userResponse.user);
      setSalesData(res); // Assuming your API response is structured with a 'data' property
      if(res){
        dispatch(setSelectedBoxData([]))
      }
    } catch (error) {
      toast.error("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (reload) {
      fetchData();
      dispatch(setReload(false));
    }
  }, [reload, dispatch]);
  useEffect(() => {
    if (selectedRowIds.length === salesData.length && salesData.length > 0) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
  }, [selectedRowIds, salesData]);
  const handleSelectRow = (user_id, isChecked) => {
    let updatedSelectedRowIds;

    if (isChecked) {
      // Add user_id if checked
      updatedSelectedRowIds = [...selectedRowIds, user_id];
    } else {
      // Remove user_id if unchecked
      updatedSelectedRowIds = selectedRowIds.filter((id) => id !== user_id);
    }

    setSelectedRowIds(updatedSelectedRowIds);

    // Find the selected user data
    const selectedUsers = sortedSalesData().filter((user) =>
      updatedSelectedRowIds.includes(user._id)
    );

    dispatch(setSelectedBoxData(selectedUsers));
  };

  const handleSort = (column) => {
    if (column === sortedColumn) {
      // Toggle sorting order
      setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    } else {
      // Set new sorted column and default to ascending order
      setSortedColumn(column);
      setSortOrder("ascending");
    }
  };

  // Function to sort salesData based on sortedColumn and sortOrder
  const sortedSalesData = () => {
    let data = [...salesData];
    
    if (year) {
      // Convert year to number if it's stored as a string or vice versa
      const filterYear = parseInt(year); // Assuming year is a string or number
      data = data.filter((item) => {
        return item.year === filterYear;
      });
    }

    if (sortedColumn) {
      data.sort((a, b) => {
        const valueA = a[sortedColumn];
        const valueB = b[sortedColumn];

        if (valueA === undefined || valueB === undefined) {
          return 0;
        }

        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortOrder === "ascending"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else {
          return sortOrder === "ascending" ? valueA - valueB : valueB - valueA;
        }
      });
    }

    return data;
  };

  const handleSelectAllRows = (isChecked) => {
    if (isChecked) {
      // Select all rows
      const allRowIds = salesData.map((item) => item._id);
      setSelectedRowIds(allRowIds);
      dispatch(setSelectedBoxData(salesData));
    } else {
      // Deselect all rows
      setSelectedRowIds([]);
      dispatch(setSelectedBoxData([]));
    }
  };

  // const foundUser = userData.find(user => parseInt(user.user_id, 10) === parseInt(item.am, 10));
  useEffect(() => {
    if (download && salesData.length > 0 && userData.length > 0) {
      // Group salesData by year
      const groupedByYear = salesData.reduce((acc, item) => {
        const year = item.year; // Use the actual year from the salesData
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(item);
        return acc;
      }, {});

      // Create a workbook
      const workbook = XLSX.utils.book_new();

      // Process each year
      Object.entries(groupedByYear).forEach(([year, dataForYear]) => {
        // Map data for the year to the required format
        const dataToExport = dataForYear
          .map((item) => {
            const foundUser = userData.find(
              (user) => parseInt(user.user_id, 10) === parseInt(item.am, 10)
            );

            if (foundUser) {
              return {
                AM: `${foundUser.user_fname} ${foundUser.user_lname}`,
                Q1: {
                  Target: item.q1_target || 0,
                  Sales: item.q1_sales || 0,
                  "Sales %": item.q1_sales_percentage || 0,
                },
                Q2: {
                  Target: item.q2_target || 0,
                  Sales: item.q2_sales || 0,
                  "Sales %": item.q2_sales_percentage || 0,
                },
                Q3: {
                  Target: item.q3_target || 0,
                  Sales: item.q3_sales || 0,
                  "Sales %": item.q3_sales_percentage || 0,
                },
                Q4: {
                  Target: item.q4_target || 0,
                  Sales: item.q4_sales || 0,
                  "Sales %": item.q4_sales_percentage || 0,
                },
                Total: {
                  Target: item.total_target || 0,
                  Sales: item.total_sales || 0,
                  "Sales %": item.total_sales_percentage || 0,
                },
              };
            } else {
              return null; // Handle case where user is not found
            }
          })
          .filter((item) => item !== null); // Filter out null entries

        // Create a worksheet
        const worksheet = XLSX.utils.aoa_to_sheet([]);

        // Set column widths for better visibility
        worksheet["!cols"] = [
          { width: 20 }, // Column for "AM"
          { width: 15 }, // Columns for each Q1, Q2, Q3, Q4, Total
          { width: 15 },
          { width: 15 },
          { width: 15 },
          { width: 15 },
          { width: 15 },
          { width: 15 },
          { width: 15 },
          { width: 15 },
          { width: 15 },
          { width: 15 },
          { width: 15 },
          { width: 15 },
          { width: 15 },
          { width: 15 },
        ];

        // Headers for the first row with merged cells
        const headers_1 = [
          year, // Year in A1
          "Q1",
          "",
          "", // Q1 merge B1:D1
          "Q2",
          "",
          "", // Q2 merge E1:G1
          "Q3",
          "",
          "", // Q3 merge H1:J1
          "Q4",
          "",
          "", // Q4 merge K1:M1
          "Total",
          "",
          "", // Total merge N1:P1
        ];

        // Add headers to the worksheet
        XLSX.utils.sheet_add_aoa(worksheet, [headers_1], { origin: "A1" });

        // Apply merges for headers
        worksheet["!merges"] = [
          { s: { r: 0, c: 1 }, e: { r: 0, c: 3 } }, // Q1 - B1:D1
          { s: { r: 0, c: 4 }, e: { r: 0, c: 6 } }, // Q2 - E1:G1
          { s: { r: 0, c: 7 }, e: { r: 0, c: 9 } }, // Q3 - H1:J1
          { s: { r: 0, c: 10 }, e: { r: 0, c: 12 } }, // Q4 - K1:M1
          { s: { r: 0, c: 13 }, e: { r: 0, c: 15 } }, // Total - N1:P1
        ];

        // Headers for the second row (A2 to P2)
        const headers_2 = [
          "AM",
          "Q1 Target",
          "Q1 Sales",
          "Q1 Sales %",
          "Q2 Target",
          "Q2 Sales",
          "Q2 Sales %",
          "Q3 Target",
          "Q3 Sales",
          "Q3 Sales %",
          "Q4 Target",
          "Q4 Sales",
          "Q4 Sales %",
          "Total Target",
          "Total Sales",
          "Total Sales %",
        ];

        // Add headers for the second row
        XLSX.utils.sheet_add_aoa(worksheet, [headers_2], { origin: "A2" });

        // Populate data starting from A3
        const dataRows = dataToExport.map((item) => [
          item.AM,
          item.Q1.Target,
          item.Q1.Sales,
          item.Q1["Sales %"],
          item.Q2.Target,
          item.Q2.Sales,
          item.Q2["Sales %"],
          item.Q3.Target,
          item.Q3.Sales,
          item.Q3["Sales %"],
          item.Q4.Target,
          item.Q4.Sales,
          item.Q4["Sales %"],
          item.Total.Target,
          item.Total.Sales,
          item.Total["Sales %"],
        ]);
        XLSX.utils.sheet_add_aoa(worksheet, dataRows, { origin: "A3" });

        // Append the worksheet to the workbook with a name for each year
        XLSX.utils.book_append_sheet(workbook, worksheet, `EPR Table ${year}`);
      });

      // Write the workbook to a file
      XLSX.writeFile(workbook, "EPR_Table.xlsx");

      // Reset the download state after exporting
      dispatch(setDownload(""));
    }
  }, [download, salesData, userData, dispatch]);

  return (
    <div className="table-responsive datatable-custom datatable-custom-centered sales_matrix_table">
      <div id="datatable_wrapper" className="dataTables_wrapper">
        {/* Table length and search controls */}
        <div className="dataTables_length" id="datatable_length">
          <label>
            Show{" "}
            <select
              name="datatable_length"
              aria-controls="datatable"
              className=""
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>{" "}
            entries
          </label>
        </div>
        <div id="datatable_filter" className="dataTables_filter">
          <label>
            Search:
            <input
              type="search"
              className=""
              placeholder=""
              aria-controls="datatable"
            />
          </label>
        </div>

        {/* Table itself */}
        <table
          id="datatable"
          className="w-100 table table-sm table-nowrap table-align-middle table-hover card-table dataTable"
          data-hs-datatables-options='{
            "columnDefs": [{
              "targets": [0],
              "orderable": false
            }],
            "order": [],
            "info": {
              "totalQty": "#datatableWithPaginationInfoTotalQty"
            },
            "search": ".js-form-search",
            "entries": "#datatableEntries",
            "pageLength": -1,
            "isResponsive": true,
            "isShowPaging": false,
            "pagination": "datatablePagination"
          }'
          role="grid"
          aria-describedby="datatable_info"
          style={{ width: "1349px" }}
        >
          <thead className="">
            <tr role="row">
              {/* Table headers */}
              <th
                rowSpan="2"
                className="table-column-pe-0 sorting_disabled"
                colSpan="1"
                aria-label=""
              >
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="datatableCheckAll"
                    checked={isAllSelected}
                    onChange={(e) => handleSelectAllRows(e.target.checked)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="datatableCheckAll"
                  ></label>
                </div>
              </th>
              <th
                className={`sorting ${
                  sortedColumn === "am"
                    ? sortOrder === "ascending"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                onClick={() => handleSort("am")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="2"
                colSpan="1"
                aria-label="AM: activate to sort column ascending"
                aria-sort={sortedColumn === "am" ? sortOrder : "none"}
              >
                {" "}
                AM
              </th>
              {/* Quarter headers */}
              {selectedStatus.Q1 && (
                <th colSpan="3" className="text-center qcon q1" rowSpan="1">
                  Q1
                </th>
              )}
              {selectedStatus.Q2 && (
                <th colSpan="3" className="text-center qcon q2" rowSpan="1">
                  Q2
                </th>
              )}
              {selectedStatus.Q3 && (
                <th colSpan="3" className="text-center qcon q3" rowSpan="1">
                  Q3
                </th>
              )}
              {selectedStatus.Q4 && (
                <th colSpan="3" className="text-center qcon q4" rowSpan="1">
                  Q4
                </th>
              )}
              <th colSpan="3" className="text-center" rowSpan="1">
                Total
              </th>
            </tr>
            <tr role="row">
              {/* Quarter column headers */}
              {selectedStatus.Q1 && (
                <>
                  <th
                    className={`sorting ${
                      sortedColumn === "q1_target"
                        ? sortOrder === "ascending"
                          ? "sorting_asc"
                          : "sorting_desc"
                        : ""
                    }`}
                    onClick={() => handleSort("q1_target")}
                    tabIndex="0"
                    aria-controls="datatable"
                    rowSpan="1"
                    colSpan="1"
                    aria-label="Q1 Target: activate to sort column ascending"
                    aria-sort={
                      sortedColumn === "q1_target" ? sortOrder : "none"
                    }
                  >
                    {" "}
                    Target
                  </th>
                  <th
                    className={`sorting ${
                      sortedColumn === "q1_sales"
                        ? sortOrder === "ascending"
                          ? "sorting_asc"
                          : "sorting_desc"
                        : ""
                    }`}
                    onClick={() => handleSort("q1_sales")}
                    tabIndex="0"
                    aria-controls="datatable"
                    rowSpan="1"
                    colSpan="1"
                    aria-label="Q1 Target: activate to sort column ascending"
                    aria-sort={sortedColumn === "q1_sales" ? sortOrder : "none"}
                  >
                    {" "}
                    Sales
                  </th>
                  <th
                    className={`sorting ${
                      sortedColumn === "q1_sales_percentage"
                        ? sortOrder === "ascending"
                          ? "sorting_asc"
                          : "sorting_desc"
                        : ""
                    }`}
                    onClick={() => handleSort("q1_sales_percentage")}
                    tabIndex="0"
                    aria-controls="datatable"
                    rowSpan="1"
                    colSpan="1"
                    aria-label="Q1 Target: activate to sort column ascending"
                    aria-sort={
                      sortedColumn === "q1_sales_percentage"
                        ? sortOrder
                        : "none"
                    }
                  >
                    {" "}
                    Sales%
                  </th>
                </>
              )}
              {selectedStatus.Q2 && (
                <>
                  <th
                    className={`sorting ${
                      sortedColumn === "q2_target"
                        ? sortOrder === "ascending"
                          ? "sorting_asc"
                          : "sorting_desc"
                        : ""
                    }`}
                    onClick={() => handleSort("q2_target")}
                    tabIndex="0"
                    aria-controls="datatable"
                    rowSpan="1"
                    colSpan="1"
                    aria-label="Q1 Target: activate to sort column ascending"
                    aria-sort={
                      sortedColumn === "q2_target" ? sortOrder : "none"
                    }
                  >
                    {" "}
                    Target
                  </th>
                  <th
                    className={`sorting ${
                      sortedColumn === "q2_sales"
                        ? sortOrder === "ascending"
                          ? "sorting_asc"
                          : "sorting_desc"
                        : ""
                    }`}
                    onClick={() => handleSort("q2_sales")}
                    tabIndex="0"
                    aria-controls="datatable"
                    rowSpan="1"
                    colSpan="1"
                    aria-label="Q1 Target: activate to sort column ascending"
                    aria-sort={sortedColumn === "q2_sales" ? sortOrder : "none"}
                  >
                    {" "}
                    Sales
                  </th>
                  <th
                    className={`sorting ${
                      sortedColumn === "q2_sales_percentage"
                        ? sortOrder === "ascending"
                          ? "sorting_asc"
                          : "sorting_desc"
                        : ""
                    }`}
                    onClick={() => handleSort("q2_sales_percentage")}
                    tabIndex="0"
                    aria-controls="datatable"
                    rowSpan="1"
                    colSpan="1"
                    aria-label="Q1 Target: activate to sort column ascending"
                    aria-sort={
                      sortedColumn === "q2_sales_percentage"
                        ? sortOrder
                        : "none"
                    }
                  >
                    {" "}
                    Sales%
                  </th>
                </>
              )}
              {selectedStatus.Q3 && (
                <>
                  <th
                    className={`sorting ${
                      sortedColumn === "q3_target"
                        ? sortOrder === "ascending"
                          ? "sorting_asc"
                          : "sorting_desc"
                        : ""
                    }`}
                    onClick={() => handleSort("q3_target")}
                    tabIndex="0"
                    aria-controls="datatable"
                    rowSpan="1"
                    colSpan="1"
                    aria-label="Q1 Target: activate to sort column ascending"
                    aria-sort={
                      sortedColumn === "q3_target" ? sortOrder : "none"
                    }
                  >
                    {" "}
                    Target
                  </th>
                  <th
                    className={`sorting ${
                      sortedColumn === "q3_sales"
                        ? sortOrder === "ascending"
                          ? "sorting_asc"
                          : "sorting_desc"
                        : ""
                    }`}
                    onClick={() => handleSort("q3_sales")}
                    tabIndex="0"
                    aria-controls="datatable"
                    rowSpan="1"
                    colSpan="1"
                    aria-label="Q1 Target: activate to sort column ascending"
                    aria-sort={sortedColumn === "q3_sales" ? sortOrder : "none"}
                  >
                    {" "}
                    Sales
                  </th>
                  <th
                    className={`sorting ${
                      sortedColumn === "q3_sales_percentage"
                        ? sortOrder === "ascending"
                          ? "sorting_asc"
                          : "sorting_desc"
                        : ""
                    }`}
                    onClick={() => handleSort("q3_sales_percentage")}
                    tabIndex="0"
                    aria-controls="datatable"
                    rowSpan="1"
                    colSpan="1"
                    aria-label="Q1 Target: activate to sort column ascending"
                    aria-sort={
                      sortedColumn === "q3_sales_percentage"
                        ? sortOrder
                        : "none"
                    }
                  >
                    {" "}
                    Sales%
                  </th>
                </>
              )}
              {selectedStatus.Q4 && (
                <>
                  <th
                    className={`sorting ${
                      sortedColumn === "q4_target"
                        ? sortOrder === "ascending"
                          ? "sorting_asc"
                          : "sorting_desc"
                        : ""
                    }`}
                    onClick={() => handleSort("q4_target")}
                    tabIndex="0"
                    aria-controls="datatable"
                    rowSpan="1"
                    colSpan="1"
                    aria-label="Q1 Target: activate to sort column ascending"
                    aria-sort={
                      sortedColumn === "q4_target" ? sortOrder : "none"
                    }
                  >
                    {" "}
                    Target
                  </th>
                  <th
                    className={`sorting ${
                      sortedColumn === "q4_sales"
                        ? sortOrder === "ascending"
                          ? "sorting_asc"
                          : "sorting_desc"
                        : ""
                    }`}
                    onClick={() => handleSort("q4_sales")}
                    tabIndex="0"
                    aria-controls="datatable"
                    rowSpan="1"
                    colSpan="1"
                    aria-label="Q1 Target: activate to sort column ascending"
                    aria-sort={sortedColumn === "q4_sales" ? sortOrder : "none"}
                  >
                    {" "}
                    Sales
                  </th>
                  <th
                    className={`sorting ${
                      sortedColumn === "q4_sales_percentage"
                        ? sortOrder === "ascending"
                          ? "sorting_asc"
                          : "sorting_desc"
                        : ""
                    }`}
                    onClick={() => handleSort("q4_sales_percentage")}
                    tabIndex="0"
                    aria-controls="datatable"
                    rowSpan="1"
                    colSpan="1"
                    aria-label="Q1 Target: activate to sort column ascending"
                    aria-sort={
                      sortedColumn === "q4_sales_percentage"
                        ? sortOrder
                        : "none"
                    }
                  >
                    {" "}
                    Sales%
                  </th>
                </>
              )}
              <th
                className={`sorting ${
                  sortedColumn === "total_target"
                    ? sortOrder === "ascending"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                onClick={() => handleSort("total_target")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Q1 Target: activate to sort column ascending"
                aria-sort={sortedColumn === "total_target" ? sortOrder : "none"}
              >
                {" "}
                Target
              </th>
              <th
                className={`sorting ${
                  sortedColumn === "total_sales"
                    ? sortOrder === "ascending"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                onClick={() => handleSort("total_sales")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Q1 Target: activate to sort column ascending"
                aria-sort={sortedColumn === "total_sales" ? sortOrder : "none"}
              >
                {" "}
                Sales
              </th>
              <th
                className={`sorting ${
                  sortedColumn === "total_sales_percentage"
                    ? sortOrder === "ascending"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                onClick={() => handleSort("total_sales_percentage")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Q1 Target: activate to sort column ascending"
                aria-sort={
                  sortedColumn === "total_sales_percentage" ? sortOrder : "none"
                }
              >
                {" "}
                Sales%
              </th>
            </tr>
          </thead>
          <tbody className="main-body">
            {salesData.length > 0 &&
              sortedSalesData().map((item) => {
                const amId = parseInt(item.am, 10);
                let user = null;
                if (amId === 0) {
                  user = { user_fname: "AM" }; // Placeholder for 'AM' case
                } else {
                  user = userData.find(
                    (user) => parseInt(user.user_id, 10) === amId
                  );
                }

                return (
                  <tr key={item._id}>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id={`datatableCheck${item.sales_matrix_id}`}
                          checked={selectedRowIds.includes(item._id)}
                          onChange={(e) =>
                            handleSelectRow(item._id, e.target.checked)
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`datatableCheck${item.sales_matrix_id}`}
                        ></label>
                      </div>
                    </td>
                    <td>
                      {user
                        ? `${user.user_fname} ${user.user_lname}`
                        : "User not found"}
                    </td>
                    {selectedStatus.Q1 && (
                      <>
                        <td className="qcon q1">${item.q1_target}</td>
                        <td className="qcon q1">${item.q1_sales}</td>
                        <td className="qcon q1">{item.q1_sales_percentage}%</td>
                      </>
                    )}
                    {selectedStatus.Q2 && (
                      <>
                        <td className="qcon q2">${item.q2_target}</td>
                        <td className="qcon q2">${item.q2_sales}</td>
                        <td className="qcon q2">{item.q2_sales_percentage}%</td>
                      </>
                    )}
                    {selectedStatus.Q3 && (
                      <>
                        <td className="qcon q3">${item.q3_target}</td>
                        <td className="qcon q3">${item.q3_sales}</td>
                        <td className="qcon q3">{item.q3_sales_percentage}%</td>
                      </>
                    )}
                    {selectedStatus.Q4 && (
                      <>
                        <td className="qcon q4">${item.q4_target}</td>
                        <td className="qcon q4">
                          ${item.q4_sales ? item.q4_sales : ""}
                        </td>
                        <td className="qcon q4">
                          {item.q4_sales_percentage
                            ? item.q4_sales_percentage + "%"
                            : ""}
                        </td>
                      </>
                    )}
                    <td className="qcon q5">${item.total_target}</td>
                    <td className="qcon q5">
                      ${item.total_sales ? item.total_sales : ""}
                    </td>
                    <td className="qcon q5">
                      {item.total_sales_percentage
                        ? item.total_sales_percentage + "%"
                        : ""}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesMatrixTable;
