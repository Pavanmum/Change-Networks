import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../../store/api/Admin/auth.js";
import { fetchCustomerData } from "../../../store/api/Admin/customerList.js";
import {
  setSelectedBoxData,
  setDownload,
  setReload,
  setCustomer,
} from "../../../store/slices/Admin/emailMatrixSlice.js";
import * as XLSX from "xlsx";

const UserEmailList = ({ setSelectedBox }) => {
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState([]);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userCounts, setUserCounts] = useState({});
  const [userData, setUserData] = useState([]);
  const Download = useSelector((state) => state.emailMatrixSlice.download);
  const search = useSelector((state) => state.emailMatrixSlice.search);
  const reload = useSelector((state) => state.emailMatrixSlice.reload);
  const searchTerm = useSelector((state)=>state.dashboardSlice.searchedValue);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const customerResponse = await fetchCustomerData();
      dispatch(setCustomer(customerResponse));
      setCustomers(customerResponse);

      const userResponse = await fetchUserData();
      setUserData(userResponse.user);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
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
    const countCategories = () => {
      const counts = userData.reduce((acc, user) => {
        acc[user.user_id] = {
          PO: 0,
          P1: 0,
          QUOTED: 0,
          PROSPECTS: 0,
          SUBSCRIBER: 0,
          UNSUBSCRIBE: 0,
          DNC: 0,
          GUEST: 0,
          TOTAL: 0,
        };

        customers.forEach((customer) => {
          if (customer.am === user.user_id) {
            acc[user.user_id].PO += customer.partner_type === "PO" ? 1 : 0;
            acc[user.user_id].P1 += customer.partner_type === "VIP" ? 1 : 0;
            acc[user.user_id].QUOTED +=
              customer.partner_type === "Quoted" ? 1 : 0;
            acc[user.user_id].PROSPECTS +=
              customer.partner_type === "Prospects" ||
              customer.partner_type === "Prospect"
                ? 1
                : 0;
            acc[user.user_id].SUBSCRIBER +=
              customer.partner_type === "Subscribers" ? 1 : 0;
            acc[user.user_id].UNSUBSCRIBE +=
              customer.unsubscribe === "1" ? 1 : 0;
            acc[user.user_id].DNC += customer.partner_type === "DNC" ? 1 : 0;
            acc[user.user_id].GUEST +=
              customer.partner_type === "GUEST" ? 1 : 0;
              const { PO, P1, QUOTED, PROSPECTS, SUBSCRIBER, UNSUBSCRIBE, DNC, GUEST } = acc[user.user_id];
              acc[user.user_id].TOTAL = PO + P1 + QUOTED + PROSPECTS + SUBSCRIBER + UNSUBSCRIBE + DNC + GUEST;
          }
        });

        return acc;
      }, {});

      setUserCounts(counts);
    };

    if (userData.length && customers.length) {
      countCategories();
    }
  }, [userData, customers]);

  const getFilteredAndSortedCustomers = () => {
    let filteredCustomers = [...userData];

    // Apply search filter
    if (search) {
      filteredCustomers = filteredCustomers.filter((customer) =>
        Object.values(customer).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (searchTerm) {
      filteredCustomers = filteredCustomers.filter((customer) =>
        Object.values(customer).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortedColumn) {
      if (sortedColumn === "user_id" || sortedColumn === "user_fname") {
        // Sorting based on userData
        filteredCustomers.sort((a, b) => {
          const valueA = a[sortedColumn];
          const valueB = b[sortedColumn];

          // Handle undefined values
          if (valueA === undefined || valueB === undefined) {
            return 0;
          }

          // Compare values based on data type
          if (typeof valueA === "string" && typeof valueB === "string") {
            return sortOrder === "ascending"
              ? valueA.localeCompare(valueB)
              : valueB.localeCompare(valueA);
          } else {
            return sortOrder === "ascending"
              ? valueA - valueB
              : valueB - valueA;
          }
        });
      } else {
        // Sorting based on userCounts
        filteredCustomers.sort((a, b) => {
          const valueA = userCounts[a.user_id]?.[sortedColumn] || 0;
          const valueB = userCounts[b.user_id]?.[sortedColumn] || 0;

          return sortOrder === "ascending" ? valueA - valueB : valueB - valueA;
        });
      }
    }

    return filteredCustomers;
  };

  const handleSort = (column) => {
    if (column === "user_id" || column === "user_fname") {
      // Sorting based on userData
      if (column === sortedColumn) {
        // Toggle sorting order
        setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
      } else {
        // Set new sorted column and default to ascending order
        setSortedColumn(column);
        setSortOrder("ascending");
      }
    } else {
      // Sorting based on userCounts derived from customers
      if (column === sortedColumn) {
        // Toggle sorting order
        setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
      } else {
        // Set new sorted column and default to descending order
        setSortedColumn(column);
        setSortOrder("descending");
      }
    }
  };

  const handleSelectRow = (user_id) => {
    const selected = user_id === selectedRowIndex ? null : user_id;
    setSelectedRowIndex(selected);
    setSelectedBox(true);
    dispatch(setReload(false));

    // Find the selected user data
    const selectedUser = userData.find((user) => user.user_id === user_id);
    dispatch(setSelectedBoxData(selectedUser || {}));
  };

  useEffect(() => {
    if (Download === "emails_count") {
      const dataToExport = userData.map((user) => ({
        AM: `${user.user_fname || ""} ${user.user_lname || ""}`,
        P1: userCounts[user.user_id]?.P1 || 0,
        PO: userCounts[user.user_id]?.PO || 0,
        Quoted: userCounts[user.user_id]?.QUOTED || 0,
        Prospects: userCounts[user.user_id]?.PROSPECTS || 0,
        Subscribe: userCounts[user.user_id]?.SUBSCRIBER || 0,
        Unsubscribe: userCounts[user.user_id]?.UNSUBSCRIBE || 0,
        DNC: userCounts[user.user_id]?.DNC || 0,
        Guest: userCounts[user.user_id]?.GUEST || 0,
        Total: userCounts[user.user_id]?.TOTAL || 0,
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const range = XLSX.utils.decode_range(worksheet["!ref"]);
      worksheet["!autofilter"] = { ref: XLSX.utils.encode_range(range) };

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Customer List");

      XLSX.writeFile(workbook, "Customer_List.xlsx");
      dispatch(setDownload("")); // Reset the download state after processing
    } else if (Download === "all") {
      const workbook = XLSX.utils.book_new();

      userData.forEach((user) => {
        const userCustomers = customers.filter(
          (customer) => customer.am === user.user_id
        );

        const dataToExport = userCustomers.map((customer) => ({
          Status: customer.partner_type,
          "Company Name": customer.company_name,
          Email: customer.email1,
          "Secondary Emails": customer.email2,
          WhatsApp: customer.whatsapp,
          Mobile: customer.mobile,
          Name: `${customer.fname} ${customer.lname}`,
          Country: customer.country,
          Date: customer.partner_date, // Assuming `customer.date` exists and needs formatting
        }));

        const sheetName = `${user.user_fname}_${user.user_lname}`;
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);

        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      });

      XLSX.writeFile(workbook, "User_Details.xlsx");
      dispatch(setDownload("")); // Reset the download state after processing
    }
  }, [Download, userData, dispatch, userCounts, customers]);

  const displayedCustomers = getFilteredAndSortedCustomers();

  return (
    <div className="table-responsive" >
      {isLoading ? (
        <div colSpan="6" className="text-center">
          <div
            className="spinner-border text-primary"
            style={{
              marginTop: "10%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <table
          id="datatable"
          className="w-100 table table-sm table-nowrap table-align-middle table-hover card-table"
          style={{ height: "20%" }}
        >
          <thead style={{ position: "sticky", top: "0" }}>
            <tr>
              <th
                className={`sorting ${
                  sortedColumn === "user_id"
                    ? sortOrder === "ascending"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                style={{ width: "26.25px", textAlign: "center" }}
                onClick={() => handleSort("user_id")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="#: activate to sort column ascending"
                aria-sort={sortedColumn === "user_id" ? sortOrder : "none"}
              >
                #
              </th>
              <th
                className={`sorting ${
                  sortedColumn === "user_fname"
                    ? sortOrder === "ascending"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                style={{ width: "166.25px" }}
                onClick={() => handleSort("user_fname")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="AM: activate to sort column ascending"
                aria-sort={sortedColumn === "user_fname" ? sortOrder : "none"}
              >
                AM
              </th>
              <th
                className={`sorting ${
                  sortedColumn === "P1"
                    ? sortOrder === "ascending"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                style={{ width: "175.328px" }}
                onClick={() => handleSort("P1")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="P1: activate to sort column ascending"
                aria-sort={sortedColumn === "P1" ? sortOrder : "none"}
              >
                P1
              </th>
              <th
                className={`sorting ${
                  sortedColumn === "PO"
                    ? sortOrder === "ascending"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                style={{ width: "175.328px" }}
                onClick={() => handleSort("PO")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="PO: activate to sort column ascending"
                aria-sort={sortedColumn === "PO" ? sortOrder : "none"}
              >
                PO
              </th>
              <th
                className={`sorting ${
                  sortedColumn === "QUOTED"
                    ? sortOrder === "ascending"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                style={{ width: "175.328px" }}
                onClick={() => handleSort("QUOTED")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="QUOTED: activate to sort column ascending"
                aria-sort={sortedColumn === "QUOTED" ? sortOrder : "none"}
              >
                QUOTED
              </th>
              <th
                className={`sorting ${
                  sortedColumn === "PROSPECTS"
                    ? sortOrder === "ascending"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                style={{ width: "175.328px" }}
                onClick={() => handleSort("PROSPECTS")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="PROSPECTS: activate to sort column ascending"
                aria-sort={sortedColumn === "PROSPECTS" ? sortOrder : "none"}
              >
                PROSPECTS
              </th>
              <th
                className={`sorting ${
                  sortedColumn === "SUBSCRIBER"
                    ? sortOrder === "ascending"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                style={{ width: "175.328px" }}
                onClick={() => handleSort("SUBSCRIBER")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="SUBSCRIBER: activate to sort column ascending"
                aria-sort={sortedColumn === "SUBSCRIBER" ? sortOrder : "none"}
              >
                SUBSCRIBER
              </th>
              <th
                className={`sorting ${
                  sortedColumn === "UNSUBSCRIBE"
                    ? sortOrder === "ascending"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                style={{ width: "175.328px" }}
                onClick={() => handleSort("UNSUBSCRIBE")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="UNSUBSCRIBE: activate to sort column ascending"
                aria-sort={sortedColumn === "UNSUBSCRIBE" ? sortOrder : "none"}
              >
                UNSUBSCRIBE
              </th>
              <th
                className={`sorting ${
                  sortedColumn === "DNC"
                    ? sortOrder === "ascending"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                style={{ width: "175.328px" }}
                onClick={() => handleSort("DNC")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="DNC: activate to sort column ascending"
                aria-sort={sortedColumn === "DNC" ? sortOrder : "none"}
              >
                DNC
              </th>
              <th
                className={`sorting ${
                  sortedColumn === "GUEST"
                    ? sortOrder === "ascending"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                style={{ width: "175.328px" }}
                onClick={() => handleSort("GUEST")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="GUEST: activate to sort column ascending"
                aria-sort={sortedColumn === "GUEST" ? sortOrder : "none"}
              >
                GUEST
              </th>
              <th
                className={`sorting ${
                  sortedColumn === "TOTAL"
                    ? sortOrder === "ascending"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                style={{ width: "175.328px" }}
                onClick={() => handleSort("TOTAL")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="TOTAL: activate to sort column ascending"
                aria-sort={sortedColumn === "TOTAL" ? sortOrder : "none"}
              >
                TOTAL
              </th>
              <th
                className={`sorting ${
                  sortedColumn === "email1"
                    ? sortOrder === "ascending"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                style={{ width: "26.25px" }}
                onClick={() => handleSort("email1")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="ACTION: activate to sort column ascending"
                aria-sort={sortedColumn === "email1" ? sortOrder : "none"}
              >
                ACTION
              </th>
            </tr>
          </thead>

          <tbody className="overflow-y-auto">
            {displayedCustomers.length > 0 ? (
              displayedCustomers.map((user, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "left", marginLeft: "-5%" }}>
                    {user.user_id}
                  </td>
                  <td>{`${user.user_fname} ${user.user_lname}`}</td>
                  <td>{userCounts[user.user_id]?.P1}</td>
                  <td>{userCounts[user.user_id]?.PO}</td>
                  <td>{userCounts[user.user_id]?.QUOTED}</td>
                  <td>{userCounts[user.user_id]?.PROSPECTS}</td>
                  <td>{userCounts[user.user_id]?.SUBSCRIBER}</td>
                  <td>{userCounts[user.user_id]?.UNSUBSCRIBE}</td>
                  <td>{userCounts[user.user_id]?.DNC}</td>
                  <td>{userCounts[user.user_id]?.GUEST}</td>
                  <td>{userCounts[user.user_id]?.TOTAL}</td>
                  <td className="text-center">
                    <a
                      className="btn1 btn-xs1 btn-primary1 view_email_btn cursor-pointer"
                      data-id="1"
                      role="button"
                      onClick={() => {
                        handleSelectRow(user.user_id);
                      }}
                    >
                      <i className="bi-pencil text-primary"></i>
                    </a>
                  </td>
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
      )}
    </div>
  );
};

export default UserEmailList;
