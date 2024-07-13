import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerData } from "../../../store/api/Admin/customerList.js";
import { fetchUserData } from "../../../store/api/Admin/auth.js";
import {
  setSelectedBoxData,
  setDownload,
  setCustomer,
} from "../../../store/slices/Admin/customerListSlice.js";
import * as XLSX from "xlsx";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const CustomerList = ({setAddedSuccessfully,addedSuccessfully}) => {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const [originalRowData, setOriginalRowData] = useState([]); // Keep a copy of the original data
  const [isLoading, setIsLoading] = useState(true);
  const Download = useSelector((state) => state.customerListSlice.download);
  const Status = useSelector((state) => state.customerListSlice.selectedStatus);
  const [userData, setUserData] = useState([]);
  const search = useSelector((state) => state.customerListSlice.search);

  useEffect(() => {
    if(addedSuccessfully){
console.log(2);
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await fetchCustomerData();
          dispatch(setCustomer(response));
          setRowData(response);
          setOriginalRowData(response); // Store the original data
          setIsLoading(false);
          if(response){
            dispatch(setSelectedBoxData(null))
            setAddedSuccessfully(false)
          }
        } catch (error) {
          console.error("Failed to fetch customer data:", error);
          setIsLoading(false);
      }
    };
    fetchData();
  }
  }, [dispatch,addedSuccessfully,setAddedSuccessfully]);
  // Fetch customer data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchCustomerData();
        dispatch(setCustomer(response));
        setRowData(response);
        setOriginalRowData(response); // Store the original data
        setIsLoading(false);
        if(response){
          dispatch(setSelectedBoxData(null))
        }
      } catch (error) {
        console.error("Failed to fetch customer data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchUserData();
        setUserData(response.user);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter rowData based on Status
  useEffect(() => {
    if (Status) {
      const filteredData = originalRowData.filter(
        (item) => item.partner_type === Status
      );

      if (filteredData.length > 0) {
        setRowData(filteredData);
      } else {
        setRowData(originalRowData); // Reset to original if no matches
      }
    } else {
      setRowData(originalRowData); // Reset to original if Status is not defined
    }
  }, [Status, originalRowData]);
  useEffect(() => {
    if (search) {
      const lowerCaseSearch = search.toLowerCase();
      const filteredData = originalRowData.filter((item) =>
        Object.values(item).some((value) =>
          value ? value.toString().toLowerCase().includes(lowerCaseSearch) : false
        )
      );
      setRowData(filteredData);
    } else {
      setRowData(originalRowData); // Reset to original if search is empty
    }
  }, [search, originalRowData]);

  // Export to Excel functionality
  useEffect(() => {
    if (Download) {
      const handleExportData = () => {
        const dataToExport = rowData.map((customer) => ({
          Email: customer.email1,
          "Company Name": customer.company_name,
          Status: customer.partner_type,
          AM:
            Array.isArray(userData) &&
            userData.find((user) => user.user_id === customer.am)
              ? `${userData.find((user) => user.user_id === customer.am).user_fname} ${
                  userData.find((user) => user.user_id === customer.am).user_lname
                }`
              : "AM not found",
          Name: `${customer.fname} ${customer.lname}`,
          "Secondary Emails": customer.email2,
          Date: formatDate(customer.partner_date),
        }));

        const filteredDataToExport = dataToExport.map((item) =>
          Object.fromEntries(Object.entries(item).filter(([_, v]) => v !== undefined))
        );

        const worksheet = XLSX.utils.json_to_sheet(filteredDataToExport);
        const range = XLSX.utils.decode_range(worksheet["!ref"]);
        worksheet["!autofilter"] = { ref: XLSX.utils.encode_range(range) };

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Customer List");

        XLSX.writeFile(workbook, "Customer_List.xlsx");
        dispatch(setDownload(false));
      };
      handleExportData();
    }
  }, [Download, dispatch, rowData, userData]);

  // Date formatter function
  const formatDate = (datetime) => {
    return datetime.split(" ")[0];
  };

  // Handle row selection
  const handleSelectRow = (event) => {
    const selectedRows = event.api.getSelectedRows();
    const selectedRow = selectedRows.length > 0 ? selectedRows[0] : null;
    dispatch(setSelectedBoxData(selectedRow));
  };

  // Define default column definitions
  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  // Define column definitions for the grid
  const columnDefs = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      field: "",
      sortable: false,
      filter: false,
    },
    { headerName: "Email", field: "email1", sortable: true, filter: false, headerClass: "custom-header" },
    {
      headerName: "Company Name",
      field: "company_name",
      sortable: true,
      filter: false,
    },
    {
      headerName: "Status",
      field: "partner_type",
      sortable: true,
      filter: false,
    },
    {
      headerName: "AM",
      field: "am",
      valueGetter: (params) => {
        const customer = params.data;
        return (
          Array.isArray(userData) &&
          userData.find((user) => user.user_id === customer.am)
            ? `${userData.find((user) => user.user_id === customer.am).user_fname} ${
                userData.find((user) => user.user_id === customer.am).user_lname
              }`
            : "AM not found"
        );
      },
      sortable: true,
      filter: false,
    },
    {
      headerName: "Name",
      valueGetter: (params) => `${params.data.fname} ${params.data.lname}`,
      sortable: true,
      filter: false,
      accentedSort : true
    },
    {
      headerName: "Date",
      field: "partner_date",
      valueFormatter: (params) => formatDate(params.value),
      sortable: false,
      filter: false,
    },
  ];

  // Handle grid ready event
  const handleGridReady = (params) => {
    params.api.setFilterModel({});
    if (Status) {
      const statusFilterModel = {
        partner_type: {
          type: "set",
          values: [Status],
        },
      };
      params.api.setFilterModel(statusFilterModel);
    }
    if (search) {
      const searchFilterModel = {
        OR: [
          { Email: { type: "contains", filter: search } },
          { "Company Name": { type: "contains", filter: search } },
          { Name: { type: "contains", filter: search } },
          { "Secondary Emails": { type: "contains", filter: search } },
        ],
      };
      params.api.setFilterModel(searchFilterModel);
    }
  };

  // Define grid options
  const gridOptions = {
    rowSelection: "single",
    onSelectionChanged: handleSelectRow,
    onGridReady: handleGridReady,
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 600 }}>
      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          gridOptions={gridOptions}
        />
      )}
    </div>
  );
};

export default CustomerList;
