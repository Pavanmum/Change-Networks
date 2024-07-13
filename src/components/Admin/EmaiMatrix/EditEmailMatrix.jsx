import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCustomerData } from "../../../store/api/Admin/customerList.js";
import { fetchUserData } from "../../../store/api/Admin/auth.js";
import { toast } from "react-toastify";
import {
  updateEmailList,
  deleteEmailList,
} from "../../../store/api/Admin/emailList.js";
import { setReload } from "../../../store/slices/Admin/emailMatrixSlice.js";
import * as XLSX from "xlsx";

const EditEmailMatrix = ({ setSelectedBox }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState([]);
  const [selectedEmailIds, setSelectedEmailIds] = useState([]); // State to store selected email IDs
  const [selectedAM, setSelectedAM] = useState(""); // State to store selected AM
  const [filteredData, setFilteredData] = useState([]);
  const [partnerTypeCounts, setPartnerTypeCounts] = useState({});
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [selectAll, setSelectAll] = useState(false); // New state for "Select All" checkbox
  const selectedItem = useSelector(
    (state) => state.emailMatrixSlice.selectedBoxData
  );

  const partnerTypes = [
    "VIP",
    "PO",
    "Quoted",
    "Prospects",
    "Subscribers",
    "Guest",
    "DNC",
  ];

  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("ascending");

  const [editIndex, setEditIndex] = useState(-1);
  const [editValues, setEditValues] = useState({
    partner_type: "",
    email1: "",
    email2: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userResponse = await fetchCustomerData();
        setUserData(userResponse);
        const response = await fetchUserData();
        setUser(response.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const userResponse = await fetchCustomerData();
      setUserData(userResponse);
      const response = await fetchUserData();
      setUser(response.user);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const allPartnerTypes = [
      "All",
      "VIP",
      "PO",
      "Quoted",
      "Prospects",
      "Subscribers",
      "Guest",
      "DNC",
      "Unsubscribe",
    ];

    const matchingData = userData.filter(
      (item) => item.am === selectedItem.user_id
    );

    const initialCounts = allPartnerTypes.reduce((acc, type) => {
      acc[type] = 0;
      return acc;
    }, {});

    const calculatedCounts = matchingData.reduce((acc, user) => {
      if (user.partner_type in acc) {
        acc[user.partner_type] += 1;
      }
      return acc;
    }, initialCounts);

    calculatedCounts["All"] = matchingData.length;
    setPartnerTypeCounts(calculatedCounts);

    let sortedData = [...matchingData];
    if (sortKey) {
      sortedData.sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];
        if (aValue < bValue) return sortDirection === "ascending" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "ascending" ? 1 : -1;
        return 0;
      });
    }

    let filtered = sortedData;
    if (selectedFilter !== "All") {
      filtered = filtered.filter(
        (item) => item.partner_type === selectedFilter
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          (item.company_name?.toLowerCase() || "").includes(
            searchTerm.toLowerCase()
          ) ||
          (item.email1?.toLowerCase() || "").includes(
            searchTerm.toLowerCase()
          ) ||
          (item.email2?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [
    userData,
    selectedItem,
    selectedFilter,
    searchTerm,
    sortKey,
    sortDirection,
  ]);

  const handleCloseEditBox = () => {
    setSelectedBox(false);
    dispatch(setReload(true));
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleHeaderClick = (key) => {
    if (key === sortKey) {
      setSortDirection(
        sortDirection === "ascending" ? "descending" : "ascending"
      );
    } else {
      setSortKey(key);
      setSortDirection("ascending");
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    const { partner_type, email1, email2 } = filteredData[index];
    setEditValues({ partner_type, email1, email2 });
  };
  const handleCloseEdit = () => {
    setEditIndex("");
    setEditValues("");
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditValues({
      ...editValues,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event, id) => {
    const { checked } = event.target;
    setSelectedEmailIds((prevSelected) =>
      checked ? [...prevSelected, id] : prevSelected.filter((e) => e !== id)
    );
    setSelectedEmailId(checked ? id : null);
  };

  const handleSelectAllChange = (event) => {
    const { checked } = event.target;
    setSelectAll(checked);
    if (checked) {
      setSelectedEmailIds(filteredData.map((item) => item._id));
    } else {
      setSelectedEmailIds([]);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      const updatePayload = {
        id: selectedEmailId ? selectedEmailId : filteredData[editIndex]._id,
        partner_type: editValues.partner_type,
        email1: editValues.email1,
        email2: editValues.email2,
      };
      const res = await updateEmailList(updatePayload);

      const updatedData = [...filteredData];
      updatedData[editIndex] = {
        ...updatedData[editIndex],
        partner_type: editValues.partner_type,
        email1: editValues.email1,
        email2: editValues.email2,
      };
      setFilteredData(updatedData);

      setEditIndex(-1);
      setEditValues({
        partner_type: "",
        email1: "",
        email2: "",
      });
      if (res) {
        toast.success("Successfully customer updated");
        setTimeout(() => {
          fetchData(); // Reload the page after 1 second
        }, 1000);
      }
      return res;
    } catch (error) {
      console.error("Error updating email record:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // console.log(id);
      const res = await deleteEmailList(id);

      const updatedData = filteredData.filter((item) => item._id !== id);
      setFilteredData(updatedData);
      if (res) {
        toast.success("Successfully deleted customer");
        setTimeout(() => {
          fetchData(); // Reload the page after 1 second
        }, 1000);
      }
      return res;
    } catch (error) {
      console.error("Error deleting email record:", error);
    }
  };

  const handleDeleteClick = (id) => {
    // console.log(id);
    handleDelete(id);
  };

  const handleReassignAM = async () => {
    try {
      let payload = [];

      // Validate selected AM
      if (!selectedAM) {
        toast.error("Please select am");
      }

      // Prepare payload based on selectedEmailIds or filteredData when selectAll is true
      if (selectedEmailIds.length > 0) {
        payload = selectedEmailIds.map((id) => ({
          id,
          am: selectedAM,
        }));
      } else if (selectAll) {
        payload = filteredData.map((item) => ({
          id: item._id,
          am: selectedAM,
        }));
      } else {
        toast.error("Please select a check box");
        throw new Error("No emails selected for reassignment.");
      }

      // Call updateEmailList for each item in the payload array
      const res = await updateEmailList(payload);
      if (res) {
        toast.success("Successfully customer updated");
        setTimeout(() => {
          fetchData(); // Reload the page after 1 second
        }, 1000);
      }
      console.log("Email reassignment successful");

      // Clear selections
      setSelectedEmailIds([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Error reassigning email:", error);
    }
  };

  const downloadExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws1 = XLSX.utils.json_to_sheet(
      filteredData.map((item) => ({
        Status: item.partner_type,
        "Company Name": item.company_name,
        Email: item.email1,
        "Secondary Emails": item.email2,
        WhatsApp: "",
        Mobile: "",
        Name: `${item.fname} ${item.lname}`,
        Country: "",
        Date: "",
      }))
    );
    XLSX.utils.book_append_sheet(wb, ws1, "Email Matrix");

    const allEmails = filteredData.reduce(
      (emails, item) => {
        emails.push([item.email1]);
        if (item.email2) {
          emails.push([item.email2]);
        }
        return emails;
      },
      [["Emails"]]
    );

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}${month}${day}`;
    };

    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    const ws2 = XLSX.utils.aoa_to_sheet(allEmails);
    XLSX.utils.book_append_sheet(wb, ws2, "Email List");

    XLSX.writeFile(
      wb,
      `${selectedItem.user_fname} ${selectedItem.user_lname} email_list_${formattedDate}.xlsx`
    );
  };
  return (
    <div
      className="modal fade show"
      id="emailViewModal"
      tabIndex="-1"
      aria-labelledby="emailViewModal"
      style={{ display: "block", paddingLeft: "0px" }}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ width: "1200px", "--bs-modal-width": "1200px" }}
      >
        <div className="modal-content w-100" style={{ margin: 0, padding: 0 }}>
          <div className="modal-header" style={{ borderBottom: "none" }}>
            <h5 className="modal-title" id="newProjectModalLabel">
              {selectedItem.user_fname} {selectedItem.user_lname} - Customer
              Email List
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseEditBox}
            ></button>
          </div>
          <div className="modal-body">
            <div className="table-responsive datatable-custom">
              <div style={{ textAlign: "justify" }}>
                <div className="row filter_row justify-content-between">
                  <div className="col-sm-8  align-items-center justify-content-between text-dark">
                    <label className="flex-shrink-0">Resign AM</label>
                    <div className="d-flex  ">
                      <select
                        className="px-3 py-2 border text-dark rounded mr-2"
                        value={selectedAM}
                        style={{ height: "10%" }}
                        onChange={(e) => setSelectedAM(e.target.value)}
                      >
                        <option value="">Select AM</option>
                        {user.map((u) => (
                          <option key={u.user_id} value={u.user_id}>
                            {u.user_fname} {u.user_lname}
                          </option>
                        ))}
                      </select>
                      <button
                        className="  btn-primary px-3  rounded"
                        onClick={handleReassignAM}
                      >
                        Reassign AM
                      </button>
                    </div>
                  </div>

                  <div className="col-sm-2 float-end">
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-white btn-xs dropdown-toggle w-100"
                        id="usersExportDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi-download me-2"></i> Download
                      </button>
                      <div
                        className="dropdown-menu dropdown-menu-sm-end"
                        aria-labelledby="usersExportDropdown"
                      >
                        <span className="dropdown-header">
                          Download options
                        </span>
                        <a
                          id="email-export-excel"
                          className="dropdown-item"
                          onClick={downloadExcel}
                        >
                          <img
                            className="avatar avatar-xss avatar-4x3 me-2"
                            src="http://192.168.1.161/change_pp/assets/svg/brands/excel-icon.svg"
                            alt=""
                          />
                          Excel
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row filter_row">
                  <div className="col-sm-9">
                    {Object.keys(partnerTypeCounts).map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={`btn btn-xs rounded-pill filter_type ${
                          selectedFilter === type
                            ? "btn-primary"
                            : "btn-secondary1 bg-soft-secondary"
                        }`}
                        onClick={() => handleFilterChange(type)}
                      >
                        {type}{" "}
                        <span className="badge1 bg-light1 text-dark1 ms-1">
                          {partnerTypeCounts[type]}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="col-sm-3">
                    <div className="input-group input-group-merge input-group-flush">
                      <div className="input-group-prepend input-group-text">
                        <i className="bi-search"></i>
                      </div>
                      <input
                        id="datatablecustlistSearch"
                        type="search"
                        className="form-control js-form-search-email"
                        placeholder="Search users"
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-sm-12">
                  <table
                    className="table tableContainer am_customer_email_list dataTable no-footer"
                    id="DataTables_Table_0"
                    role="grid"
                    style={{ padding: 0, margin: 0 }}
                    aria-describedby="DataTables_Table_0_info"
                  >
                    <thead>
                      <tr role="row" style={{ textAlign: "left" }}>
                        <th
                          className=""
                          tabIndex="0"
                          aria-controls="DataTables_Table_0"
                          rowSpan="1"
                          colSpan="1"
                          style={{ width: 0 }}
                        >
                          <input
                            type="checkbox"
                            id="ckbCheckAll"
                            className="mr-3"
                            onChange={() =>
                              setSelectAll(selectAll === true ? false : true)
                            }
                          />
                        </th>
                        <th
                          className={`sorting ${
                            sortKey === "partner_type"
                              ? sortDirection === "ascending"
                                ? "sorting_asc"
                                : "sorting_desc"
                              : ""
                          }`}
                          tabIndex="0"
                          aria-controls="DataTables_Table_0"
                          rowSpan="1"
                          colSpan="1"
                          style={{ width: "30px", cursor: "pointer" }}
                          onClick={() => handleHeaderClick("partner_type")}
                        >
                          TYPE
                        </th>
                        <th
                          className={`sorting ${
                            sortKey === "company_name"
                              ? sortDirection === "ascending"
                                ? "sorting_asc"
                                : "sorting_desc"
                              : ""
                          }`}
                          tabIndex="0"
                          aria-controls="DataTables_Table_0"
                          rowSpan="1"
                          colSpan="1"
                          style={{ width: "23px", cursor: "pointer" }}
                          onClick={() => handleHeaderClick("company_name")}
                        >
                          COMPANY
                        </th>
                        <th
                          className={`sorting ${
                            sortKey === "email1"
                              ? sortDirection === "ascending"
                                ? "sorting_asc"
                                : "sorting_desc"
                              : ""
                          }`}
                          tabIndex="0"
                          aria-controls="DataTables_Table_0"
                          rowSpan="1"
                          colSpan="1"
                          style={{ width: "23px", cursor: "pointer" }}
                          onClick={() => handleHeaderClick("email1")}
                        >
                          PRIMARY EMAIL
                        </th>
                        <th
                          className={`sorting ${
                            sortKey === "email2"
                              ? sortDirection === "ascending"
                                ? "sorting_asc"
                                : "sorting_desc"
                              : ""
                          }`}
                          tabIndex="0"
                          aria-controls="DataTables_Table_0"
                          rowSpan="1"
                          colSpan="1"
                          style={{ width: "20px", cursor: "pointer" }}
                          onClick={() => handleHeaderClick("email2")}
                        >
                          SECONDARY EMAIL
                        </th>
                        <th
                          className="sorting1"
                          tabIndex="0"
                          aria-controls="DataTables_Table_0"
                          rowSpan="1"
                          colSpan="1"
                          style={{ width: "52px" }}
                        >
                          ACTION
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredData.map((item, index) => (
                          <tr
                            key={item._id}
                            className={
                              item.unsubscribe !== 0 ? "bg_red even" : ""
                            }
                            style={{ textAlign: "left" }}
                          >
                            <td className="sorting_1 ml-5">
                              <label
                                className="tabledit-span d-flex tabledit-identifier"
                                style={{ justifyContent: "none" }}
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    selectAll ||
                                    selectedEmailIds.includes(item._id)
                                  }
                                  onChange={(event) => {
                                    handleCheckboxChange(event, item._id),
                                      { handleSelectAllChange };
                                  }}
                                />

                                <div className="ml-1">{index + 1}</div>
                              </label>
                            </td>
                            <td>
                              {editIndex === index ? (
                                <select
                                  className="form-control form-control-sm"
                                  name="partner_type"
                                  value={editValues.partner_type}
                                  onChange={handleInputChange}
                                >
                                  {partnerTypes.map((type, idx) => (
                                    <option key={idx} value={type}>
                                      {type}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                item.partner_type
                              )}
                            </td>
                            <td>{item.company_name}</td>
                            <td>
                              {editIndex === index ? (
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  name="email1"
                                  value={editValues.email1}
                                  onChange={handleInputChange}
                                />
                              ) : (
                                item.email1
                              )}
                            </td>
                            <td>
                              {editIndex === index ? (
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  name="email2"
                                  value={editValues.email2}
                                  onChange={handleInputChange}
                                />
                              ) : (
                                item.email2
                              )}
                            </td>
                            <td
                              className="flex"
                              style={{ whiteSpace: "nowrap", width: "1%" }}
                            >
                              {editIndex === index ? (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-success"
                                    onClick={handleSubmitEdit}
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-secondary ms-1"
                                    onClick={handleCloseEdit}
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    className="tabledit-edit-button  btn-xs btn btn-primary"
                                    style={{ float: "none" }}
                                    onClick={() => handleEditClick(index)}
                                  >
                                    <i className="bi bi-pencil font-18"></i>
                                  </button>
                                  {/* Conditional delete button */}
                                  {item.partner_type !== "VIP" &&
                                  item.partner_type !== "PO" &&
                                  item.unsubscribe !== 0 ? (
                                    <button
                                      type="button"
                                      className="tabledit-delete-button btn btn-xs btn-danger"
                                      style={{ float: "none" }}
                                    >
                                      <i
                                        className="bi-trash font-18"
                                        onClick={() =>
                                          handleDeleteClick(item._id)
                                        }
                                      ></i>
                                    </button>
                                  ) : null}
                                </>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmailMatrix;
