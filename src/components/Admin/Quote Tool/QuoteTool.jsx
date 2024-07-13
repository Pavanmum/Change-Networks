import { useEffect, useState, useRef } from "react";
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { fetchCustomerUserData } from "../../../store/api/Admin/quoteTool";
import { setSelectedCustomerDetails } from "../../../store/slices/Admin/quoteToolSlice";
import SlimSelect from "slim-select";
import jsPDF from "jspdf";
import { addQuoteData } from "../../../store/api/Admin/quoteTool";
import ExcelJS from "exceljs";
import { getBulkSearch } from "../../../store/api/gplAPI.js";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import PdfDownload from "./PdfDownload";
import { selectUserDetail } from "../../../store/slices/Admin/authSlice.js";

const QuoteTool = ({ setEditCustomer, setAddCustomer }) => {
  const dispatch = useDispatch();
  const checkBoxData = useSelector(
    (state) => state.quoteMatrixSlice.selectedCheckBoxData
  );
  const selectedbox = useSelector(
    (state) => state.quoteMatrixSlice.selectEditBox
  );
  const  userDetial = useSelector(selectUserDetail);
  const reportTemplateRef = useRef(null);
  const [basic, setBasic] = useState(true);
  const [exwork, setExwork] = useState("");
  const [currency, setCurrency] = useState("$");
  const [country, setCountry] = useState("");
  const [customerUserData, setCustomerUserData] = useState([]);
  const [searchedValueProduct, setSearchedValueProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [customerData, setCustomerData] = useState();
  const [searchData, setSearchData] = useState([]);
  const [checkboxSearchData, setCheckBoxSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectRef = useRef(null); // Ref for Slim Select instance
  const [quoteNo, setQuoteNo] = useState("");
  const [checkboxCustomerData, setCheckBoxCustomerData] = useState([]);
  const typingTimeoutRef = useRef(null);
  useEffect(() => {
    
    if (selectedbox) {
      setCountry(checkBoxData[0].country);

      const data = [];
      checkBoxData[0].products.map((item) => {
        data.push(`${item.product_code} ${item.qty}`);
      });
      const customerData = checkBoxData.map((item) => ({
        company_name: item.company_name,
        country: item.country,
        user_fname: item.user_fname,
      }));
      setCheckBoxCustomerData(customerData);
      setProducts(checkBoxData[0].products);
      setSearchData(data);
      setCheckBoxSearchData(data);
      setQuoteNo(checkBoxData[0].quote_id);
      if (checkBoxData[0].quote_type === "basic") {
        setBasic(true);
      } else {
        setBasic(false);
      }
      setExwork(`${checkBoxData[0].exwork}`);
      if (checkBoxData[0].currency === "USD") {
        setCurrency("$");
      } else if (checkBoxData[0].currency === "AED") {
        setCurrency(null);
      } else if (checkBoxData[0].currency === "RMB") {
        setCurrency("¥");
      }
    }
  }, [setCountry, checkBoxData]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await fetchCustomerUserData();
      setCustomerUserData(user);
    };
    fetchData();
  }, []);
  const renderCustomOption = (customer) => {
    const user =
      customer.users && customer.users.length > 0
        ? customer.users[0]
        : { user_fname: "Unknown", user_lname: "" };
    return `
      <div>
        <div class="text-start pl-2">
          <span class="d-block fw-semibold" style="font-size: 14px;">${
            customer.company_name
          }</span>
          <span class="tom-select-custom" style="font-size: 12.25px;">
            (${customer.country || "null"} | ${user.user_fname})
          </span>
        </div>
      </div>
    `;
  };

  useEffect(() => {
    if (customerUserData.length > 0 && selectRef.current) {
      if (selectRef.current.slim) {
        selectRef.current.slim.destroy();
      }

      const selectElement = document.getElementById("customerSelect");
      selectElement.innerHTML = "";

      // Add the default "Select a customer" option
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Select a customer";
      defaultOption.disabled = true;
      defaultOption.selected = true;
      selectElement.appendChild(defaultOption);

      // Add the customer options
      customerUserData.forEach((customer) => {
        const optionElement = document.createElement("option");
        optionElement.value = customer.partner_id;
        optionElement.dataset.html = renderCustomOption(customer);
        optionElement.dataset.country = customer.country || "null";
        optionElement.textContent = customer.company_name;
        selectElement.appendChild(optionElement);
      });
      selectRef.current.slim = new SlimSelect({
        select: "#customerSelect",
        placeholder: "Select a customer",
        events: {
          beforeChange: () => {},
          afterChange: (info) => {
            if (info) {
              const selectedOption = selectElement.querySelector(
                `option[value="${info[0].value}"]`
              );

              if (selectedOption) {
                const country = selectedOption.dataset.country;

                setCountry(country);
              }
            } else {
              toast.error("Please select a customer");
            }
          },
        },
        content: (option) => {
          // Avoid custom rendering for the default option
          if (option.value === "") {
            return `<span>${option.textContent}</span>`;
          }
          return option.dataset.html;
        },
      });
      if (selectedbox) {
        
        const selectedCustomerIds = checkboxCustomerData
          .map((item) => {
            const foundCustomer = customerUserData.find(
              (customer) =>
                customer.company_name === item.company_name &&
                customer.users &&
                customer.users[0].user_fname === item.user_fname
            );
            return foundCustomer ? foundCustomer.partner_id : null;
          })
          .filter((id) => id !== null);
        selectRef.current.slim.setSelected(selectedCustomerIds);
      }
    }
  }, [customerUserData, checkboxCustomerData]);

  const handleSearch = (e) => {
    const data = String(e.target.value); // Ensure value is always a string
    setCheckBoxSearchData(data);
    const value = String(e.target.value).trim();
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    // Set a new timeout
    typingTimeoutRef.current = setTimeout(() => {
      updateSearchData(value);
    }, 1000); // 3 seconds delay
   
  };
  
  useEffect(() => {
    if (searchData) {
      updateSearchData(String(searchData));
    }
  }, [searchData]);
const updateSearchData = async (value) => {
  if (!value) return;

  const updatedData = [];
  const entries = value.split(/,|\n/).filter(Boolean);

  for (let entry of entries) {
    const [procCode, qty] = entry.trim().split(/\s+/);
    if (procCode && !isNaN(qty)) {
      updatedData.push({ procCode, qty });
    } else {
      toast.error("Please enter a valid quantity.");
      return; // Exit if any entry is invalid
    }
  }

  // Initialize data for bulk search
  const data = updatedData.map(item => item.procCode);
  
  try {
    setIsLoading(true);
    const res = await getBulkSearch(data);

    if (!res || res.data.length === 0) {
      toast.error("Product not found");
      setSearchedValueProduct([]);
      return;
    }

    const updatedProducts = updatedData.map(item => {
      const productMatch = res.data.find(p => p.proc_code === item.procCode);
      if (productMatch) {
        return { ...productMatch, qty: Number(item.qty) };
      }
      return null;
    });

    const filteredProducts = updatedProducts.filter(product => product !== null);

    if (selectedbox) {
      if (filteredProducts.length > 0) {
        const updatedList = checkBoxData[0].products.map(item => {
          const data = filteredProducts.find(pro => item.product_code === pro.proc_code);
          const newUnitPrice = parseFloat(item.unit_price);
          const listPrice = parseFloat(item.list_price);

          if (data) {
            if (newUnitPrice <= listPrice) {
              const calculatedDiscount = (((listPrice - newUnitPrice) / listPrice) * 100).toFixed(2);
              return { ...item, unit_price: newUnitPrice, discount: calculatedDiscount };
            } else {
              return { ...item, unit_price: newUnitPrice, discount: 0 };
            }
          } else {
            return item; // Return original item if no match found in filteredProducts
          }
        });

        setSearchedValueProduct(updatedList);
      } else {
        setSearchedValueProduct([]);
      }
    } else {
      setSearchedValueProduct(filteredProducts);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    toast.error("Error fetching product data. Please try again later.");
  } finally {
    setIsLoading(false);
  }
};

  const handleExworkChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    // Split the current exwork string into an array
    const exworkArray = exwork.split(",").map((item) => item.trim());

    if (isChecked && !exworkArray.includes(value)) {
      // Add value to exwork array if checked and not already present
      setExwork(exwork + (exwork ? "," : "") + value);
    } else if (!isChecked && exworkArray.includes(value)) {
      // Remove value from exwork array if unchecked and present
      const updatedExwork = exworkArray
        .filter((item) => item !== value)
        .join(", ");
      setExwork(updatedExwork);
    }
  };

  const handleEditbutton = () => {
    if (selectRef.current && selectRef.current.slim) {
      const selectedValues = selectRef.current.slim.getSelected();

      const selectedCustomer = customerUserData.find(
        (customer) => customer.partner_id === selectedValues[0]
      );
      dispatch(setSelectedCustomerDetails(selectedCustomer));
      setEditCustomer(true);
    }
  };

  const handleUnitPriceChange = (e, index) => {
    const newUnitPrice = parseFloat(e);
    const item = searchedValueProduct[index];
    const listPrice = parseFloat(item.price);

    // Calculate discount only if unit price is less than or equal to list price
    if (newUnitPrice <= listPrice) {
      const calculatedDiscount = (
        ((listPrice - newUnitPrice) / listPrice) *
        100
      ).toFixed(2);
      const updatedItem = {
        ...item,
        unit_price: newUnitPrice,
        discount: calculatedDiscount,
      };
      const updatedList = [...searchedValueProduct];
      updatedList[index] = updatedItem;
      setSearchedValueProduct(updatedList);
    } else {
      // If unit price exceeds list price, set discount to 0
      const updatedItem = {
        ...item,
        unit_price: newUnitPrice,
        discount: 0,
      };
      const updatedList = [...searchedValueProduct];
      updatedList[index] = updatedItem;
      setSearchedValueProduct(updatedList);
    }
  };

  const handleDiscountChange = (e, index) => {
    let newDiscount = e.target.value.trim();
    if (newDiscount === "" || newDiscount.length <= 2) {
      // Update the item in the searchedValueProduct array
      const item = searchedValueProduct[index];
      const updatedItem = {
        ...item,
        discount: newDiscount,
      };
      const updatedList = [...searchedValueProduct];
      updatedList[index] = updatedItem;
      setSearchedValueProduct(updatedList);
    }
  };
  const handleExcelDownload = async () => {
    try {
      if (!selectRef.current || !selectRef.current.slim) {
        return;
      }

      const selectedValues = selectRef.current.slim.getSelected();
      const selectedCustomer = customerUserData.find(
        (customer) => customer.partner_id === selectedValues[0]
      );

      if (!selectedCustomer) {
        toast.error("Please select a customer");
        return;
      }

      if (exwork.length === 0) {
        toast.error("Please select an ex work");
        return;
      }

      const totalPrice = searchedValueProduct.reduce(
        (total, item) => total + item.unit_price * item.qty,
        0
      );
      if (!searchedValueProduct.length) {
        toast.error("Please enter a product");
        return;
      }

      let quote = {
        products: [],
        quote_type: basic ? "basic" : "standard",
        exwork: exwork,
        currency:
          currency === "$"
            ? "USD"
            : currency === null
            ? "AED"
            : currency === "¥"
            ? "RMB"
            : "",
        country: country,
        customer_id: selectedCustomer.partner_id,
        customer_type: "", // Add actual customer type if needed
        total_price: totalPrice, // Will be updated later
        created_by:userDetial.data.user_id || userDetial.data.email
      };

      searchedValueProduct.forEach((item) => {
        const unitPrice = parseFloat(item.unit_price) || 0;
        const quantity = parseFloat(item.qty) || 0;
        const discount = parseFloat(item.discount) || 0;
        const linePrice = (unitPrice * quantity * (1 - discount / 100)).toFixed(
          2
        );

        const productDetails = {
          product_code: item.proc_code || item.product_code,
          description: item.pro_desc || item.description,
          qty: quantity,
          list_price: parseFloat(item.price) || 0,
          unit_price: unitPrice,
          discount: discount,
          line_price: parseFloat(linePrice),
        };

        quote.products.push(productDetails);
      });

      if (selectedCustomer && searchedValueProduct.length) {
        const res = await addQuoteData(quote);
        const quoteNo = res.data;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Quotation Details");
        const getFormattedDate = (date = new Date()) => {
          const options = {
            weekday: "short",
            year: "numeric",
            month: "long",
            day: "numeric",
          };
          return date.toLocaleDateString("en-US", options);
        };

        let formattedDate = getFormattedDate();

        // Function to set box border for a range of cells
        const setBoxBorder = (startRow, endRow, startColumn, endColumn) => {
          for (let row = startRow; row <= endRow; row++) {
            for (let col = startColumn; col <= endColumn; col++) {
              const cell = worksheet.getCell(row, col);
              (cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
              }),
                (cell.fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "FFF2F2F2" },
                });
            }
          }
        };
        if (!basic) {
          // Header 1: Quotation
          worksheet.mergeCells("A1:H1");
          const header1Row = worksheet.getRow(1);
          header1Row.getCell(1).value = "Quotation";
          header1Row.font = { bold: true, size: 14 };
          header1Row.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFF2F2F2" },
          };

          // Customer Details
          worksheet.mergeCells("A3:C3");
          const header2Row = worksheet.getRow(3);
          header2Row.getCell(1).value = "Customer Details";
          header2Row.font = { bold: true, size: 12 };

          // Company Name and Quote #
          worksheet.mergeCells("A4:B4");
          worksheet.mergeCells("C4:D4");
          worksheet.mergeCells("F4:G4");
          worksheet.getCell("A4").value = "Company Name:";
          worksheet.getCell("C4").value = selectedCustomer.company_name;
          worksheet.getCell("E4").value = "Quote #:";
          worksheet.getCell("F4").value = quoteNo;

          // Contact Name and Date
          worksheet.mergeCells("A5:B5");
          worksheet.mergeCells("C5:D5");
          worksheet.mergeCells("F5:G5");
          worksheet.getCell("A5").value = "Contact Name:";
          worksheet.getCell(
            "C5"
          ).value = `${selectedCustomer.fname} ${selectedCustomer.lname}`;
          worksheet.getCell("E5").value = "Date:";
          worksheet.getCell("F5").value = formattedDate;

          // Email and Currency
          worksheet.mergeCells("A6:B6");
          worksheet.mergeCells("C6:D6");
          worksheet.mergeCells("F6:G6");
          worksheet.getCell("A6").value = "Email:";
          worksheet.getCell("C6").value = selectedCustomer.email1;
          worksheet.getCell("E6").value = "Currency:";
          worksheet.getCell("F6").value =
            currency === "$"
              ? "USD"
              : currency === null
              ? "AED"
              : currency === "¥"
              ? "RMB"
              : "";

          // Whatsapp and AM/BM
          worksheet.mergeCells("A7:B7");
          worksheet.mergeCells("C7:D7");
          worksheet.mergeCells("F7:G7");
          worksheet.getCell("A7").value = "Whatsapp:";
          worksheet.getCell("C7").value = selectedCustomer.whatsapp;
          worksheet.getCell("E7").value = "AM:";
          worksheet.getCell("F7").value = "BM";

          // Country and Ex Works
          worksheet.mergeCells("A8:B8");
          worksheet.mergeCells("C8:D8");
          worksheet.mergeCells("F8:G8");
          worksheet.getCell("A8").value = "Country:";
          worksheet.getCell("C8").value = country;
          worksheet.getCell("E8").value = "Ex Works:";
          worksheet.getCell("F8").value = exwork;
        }
        // Header 3: Product Headers
        const header3Row = worksheet.getRow(basic ? 2 : 11);
        const header_1 = [
          "#",
          "Qty",
          "Model #",
          "Description",
          "List Price",
          "Unit Price",
          "Discount %",
          "Line Total",
        ];
        header_1.forEach((header, index) => {
          header3Row.getCell(index + 1).value = header;
          header3Row.getCell(index + 1).font = { bold: true, size: 10 };
        });

        // Apply box border to header row
        setBoxBorder(basic ? 2 : 11, basic ? 2 : 11, 1, 8);

        // Add product data
        searchedValueProduct.forEach((item, index) => {
          const rowData = [
            index + 1,
            item.qty,
            item.proc_code || item.product_code,
            item.pro_desc || item.description,
            item.price || item.list_price,
            item.unit_price,
            item.discount,
            item.unit_price * item.qty,
          ];
          worksheet.addRow(rowData);
        });

        // Calculate total quantity and total price
        const totalQty = searchedValueProduct.reduce(
          (qty, item) => qty + parseInt(item.qty),
          0
        );

        // Total row
        const totalRow = worksheet.addRow([
          "Total",
          totalQty,
          "",
          "",
          "",
          "",
          "",
          totalPrice.toFixed(2),
        ]);
        totalRow.font = { bold: true };
        // Set fill and border for totalRow
        totalRow.eachCell({ includeEmpty: true }, (cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFF2F2F2" },
          };
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });

        // Set column widths
        worksheet.getColumn("D").width = 40;
        worksheet.getColumn("E").width = 20;
        worksheet.getColumn("F").width = 15;
        worksheet.getColumn("G").width = 15;
        worksheet.getColumn("C").width = 15;
        worksheet.getColumn("H").width = 15; // Increase width of column D

        // Generate Excel file and initiate download
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const fileName = `${quoteNo}.xlsx`;
        saveAs(blob, fileName);
      }
    } catch (error) {
      console.error("Error generating Excel file:", error);
      // Handle or notify the user about the error as needed
      // alert('Failed to generate Excel file. Please try again later.');
    }
  };

  const Pdfview = () => {
    return (
      <div ref={reportTemplateRef}>
        {customerData ? (
          <PdfDownload
            customerData={customerData}
            country={country}
            basic={basic}
            quoteNo={quoteNo}
            exwork={exwork}
            currency={currency}
            searchedValueProduct={searchedValueProduct}
          />
        ) : (
          <p>Error: customerData is not available</p>
        )}
      </div>
    );
  };
  // Create a workbook with a single sheet

  const handlePdfDownload = async () => {
    if (selectRef.current && selectRef.current.slim) {
      const selectedValues = selectRef.current.slim.getSelected();
      const selectedCustomer = customerUserData.find(
        (customer) => customer.partner_id === selectedValues[0]
      );
      setCustomerData(selectedCustomer);
    }
    if(!customerData){
      toast.error("please Select a customer")
    }
    else if(!exwork){
      toast.error("Please select ex-work")
    }
    else if(!searchedValueProduct.length){
      toast.error("please add a product with qty")
    }
   else{

     let quote = {
       products: [],
      quote_type: basic ? "basic" : "standard",
      exwork: exwork,
      currency:
      currency === "$"
      ? "USD"
          : currency === null
          ? "AED"
          : currency === "¥"
          ? "RMB"
          : "",
      country: country,
      customer_id: customerData.partner_id,
      customer_type: "", // Add actual customer type if needed
      total_price: 0, // Will be updated later
      created_by:userDetial.data.user_id || userDetial.data.email
    };

    searchedValueProduct.forEach((item) => {
      const unitPrice = parseFloat(item.unit_price) || 0;
      const quantity = parseFloat(item.qty) || 0;
      const discount = parseFloat(item.discount) || 0;
      const linePrice = (unitPrice * quantity * (1 - discount / 100)).toFixed(
        2
      );
      const totalPrice = searchedValueProduct
      .reduce(
        (total, item) =>
          total +
        (item.unit_price || 0) *
        item.qty *
        (1 - (item.discount || 0) / 100),
        0
      )
      .toFixed(2);
      
      const productDetails = {
        product_code: item.proc_code || item.product_code,
        description: item.pro_desc || item.description, // Assuming `pro_desc` contains the product description
        qty: quantity,
        list_price: parseFloat(item.price) || 0,
        unit_price: unitPrice,
        discount: discount,
        line_price: parseFloat(linePrice),
        totalPrice: totalPrice,
      };
      
      quote.products.push(productDetails);
    });
    
    const res = await addQuoteData(quote);
    setQuoteNo(res.data);
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
      orientation: "p",
    });
    
    doc.setFont("Arial");
    
    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save(`${res.data}.pdf`);
      },
      margin: 5,
      x: 5,
      y: 5,
      width: 425,
      windowWidth: 800,
    });
  }
  };
  
  return (
    <main
      id="content"
      role="main"
      className="main"
      style={{ padding: 0, margin: 0 }}
    >
      <div className="content container-fluid pt-2">
        <div className="card">
          <div className="card-body">
            <form
              action="#"
              name=""
              id="product_cal"
              className="js-validate needs-validation"
              autoComplete="off"
              noValidate="novalidate"
              encType="multipart/form-data"
              method="post"
            >
              <div className="row text-start">
                <div className="col-sm-7">
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label form-label">
                      Quote Type
                    </label>
                    <div className="col-sm-9">
                      <div className="input-group input-group-sm-vertical">
                        <label className="form-control py-1" htmlFor="basic">
                          <span className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              checked={basic === true}
                              name="quote_type"
                              id="basic"
                              value="basic"
                              onClick={() => setBasic(true)}
                            />
                            <span className="form-check-label">Basic</span>
                          </span>
                        </label>
                        <label className="form-control py-1" htmlFor="standard">
                          <span className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="quote_type"
                              checked={basic !== true}
                              id="standard"
                              onClick={() => setBasic(false)}
                              value="standard"
                            />
                            <span className="form-check-label">Standard</span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label form-label">
                      Ex Works: <span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-9">
                      <div className="input-group input-group-sm-vertical">
                        <label
                          className="form-control py-1"
                          htmlFor="exwork_dubai"
                        >
                          <span className="form-check form-check-danger">
                            <input
                              type="checkbox"
                              className="form-check-input chk_exwork_opt"
                              name="exwork_country[]"
                              id="exwork_dubai"
                              value="Dubai"
                              onChange={(e) => handleExworkChange(e)}
                              checked={
                                checkBoxData
                                  ? (exwork &&
                                      exwork.split(",").includes("Dubai")) ||
                                    exwork === "Dubai"
                                  : false
                              }
                            />

                            <span className="form-check-label">Dubai</span>
                          </span>
                        </label>
                        <label
                          className="form-control py-1"
                          htmlFor="exwork_china"
                        >
                          <span className="form-check form-check-danger">
                            <input
                              type="checkbox"
                              className="form-check-input chk_exwork_opt"
                              name="exwork_country[]"
                              id="exwork_china"
                              value="China"
                              onChange={(e) => handleExworkChange(e)}
                              checked={
                                checkBoxData
                                  ? (exwork &&
                                      exwork.split(",").includes("China")) ||
                                    exwork === "China"
                                  : false
                              }
                            />

                            <span className="form-check-label">China</span>
                          </span>
                        </label>
                        <label
                          className="form-control py-1"
                          htmlFor="exworks_any"
                        >
                          <span className="form-check form-check-danger">
                            <input
                              type="checkbox"
                              className="form-check-input chk_exwork_opt"
                              name="exwork_country[]"
                              id="exworks_any"
                              value="exworks_any"
                              onChange={(e) => handleExworkChange(e)}
                              checked={
                                checkBoxData
                                  ? (exwork &&
                                      exwork
                                        .split(",")
                                        .includes("exworks_any")) ||
                                    exwork === "exworks_any"
                                  : false
                              }
                            />
                            <span className="form-check-label">Any</span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label form-label">
                      Currency
                    </label>
                    <div className="col-sm-9">
                      <div className="input-group input-group-sm-vertical">
                        <label className="form-control py-1" htmlFor="usd">
                          <span className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              checked={currency === "$"}
                              name="currency"
                              id="usd"
                              value="USD"
                              onClick={() => setCurrency("$")}
                            />
                            <span className="form-check-label">$</span>
                          </span>
                        </label>
                        <label className="form-control py-1" htmlFor="aed">
                          <span className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              checked={currency === null}
                              name="currency"
                              id="aed"
                              value="AED"
                              onClick={() => setCurrency(null)}
                            />
                            <span className="form-check-label">AED</span>
                          </span>
                        </label>
                        <label className="form-control py-1" htmlFor="rmb">
                          <span className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="currency"
                              id="rmb"
                              onClick={() => setCurrency("¥")}
                              value="RMB"
                              checked={currency === "¥"}
                            />
                            <span className="form-check-label">¥</span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-2 d-flex align-items-center">
                    <label
                      htmlFor="languageLabel"
                      className="col-sm-3 col-form-label form-label"
                    >
                      Customer Details
                    </label>
                    <div className="col-sm-7 mb-2 mb-lg-0">
                      {/* Using Slim Select for the dropdown */}
                      <select
                        id="customerSelect"
                        ref={selectRef}
                      ></select>
                    </div>

                    <div className="col-sm-2 d-flex">
                      <button
                        className="btn btn-xs btn-soft-danger poAddCustomerBtn"
                        data-value="edit"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#addCustomerModal"
                        onClick={handleEditbutton}
                      >
                        <span className="d-none d-sm-block">
                          <i className="bi-pencil"></i>
                        </span>
                      </button>
                      <button
                        className="btn btn-xs btn-soft-primary poAddCustomerBtn"
                        data-value="add"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#addCustomerModal"
                        onClick={() => setAddCustomer(true)}
                      >
                        <span className="d-none d-sm-block">+</span>
                      </button>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-9 offset-lg-3">
                      <div className="tom-select-custom">
                        <CountrySelect
                          defaultValue={
                            country
                              ? { name: country }
                              : country === "null"
                              ? "select Country "
                              : null
                          }
                          onChange={(e) => {
                            setCountry(e.name);
                          }}
                          placeHolder="Select Country"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-sm-9 offset-lg-3">
                      {/* Buttons to generate quotes */}
                      <button
                        type="button"
                        className="btn btn-sm btn-primary download_quote"
                        data-type="excel"
                        onClick={handleExcelDownload}
                      >
                        Generate Quote (xl)
                      </button>

                      <button
                        type="button"
                        className="btn btn-sm btn-primary download_quote"
                        data-type="pdf"
                        onClick={handlePdfDownload}
                      >
                        Generate Quote (pdf)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-sm-5">
                  {/* Textarea for bulk products */}
                  <textarea
                    id="bulk_products"
                    name="bulk_products"
                    className="form-control"
                    rows="8"
                    value={checkboxSearchData}
                    placeholder="Enter Bulk Products"
                    onChange={handleSearch}
                  ></textarea>

                  <small>
                    Enter Model # and Qty in the same row with space in between.
                    For bulk quote, use new line or comma.
                  </small>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 border-top mt-2 pt-2">
                  <div className="table-responsive datatable-custom">
                    {/* // Table for quote details */}
                    {isLoading ? (
                      <div className="text-center py-5">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <table
                        id="datatable"
                        className="w-100 table table-sm table-nowrap table-align-middle table-hover card-table1 quote_table"
                      >
                        <thead>
                          <tr>
                            <th
                              className="table-column-pe-0 text-center"
                              style={{ width: "2%" }}
                            >
                              #
                            </th>
                            <th className="text-center" style={{ width: "5%" }}>
                              Qty
                            </th>
                            <th className="text-left" style={{ width: "15%" }}>
                              Model #
                            </th>
                            <th className="text-left" style={{ width: "40%" }}>
                              Description
                            </th>
                            <th className="text-left" style={{ width: "8%" }}>
                              List Price
                            </th>
                            <th className="text-left" style={{ width: "12%" }}>
                              Unit Price
                            </th>
                            <th className="text-center" style={{ width: "8%" }}>
                              Discount %
                            </th>
                            <th className="text-right" style={{ width: "11%" }}>
                              Line Total
                            </th>
                          </tr>
                        </thead>
                        <tbody id="productTbody">
                          {searchedValueProduct.map((item, index) => {
                            const product = products.find(
                              (pro) => pro.product_code === item.proc_code
                            );
                           return (
                              <tr key={index}>
                                <td className="table-column-pe-0 text-center">
                                  {index + 1}
                                </td>
                                <td className="text-center">{item.qty}</td>
                                <td className="text-left">
                                  {item.proc_code || item.product_code}
                                </td>
                                <td className="text-left">
                                  {item.pro_desc || item.description}
                                </td>
                                <td className="text-left">
                                  {currency}
                                  {item.price || item.list_price}
                                </td>
                                <td className="text-left">
                                  {/* Input for Unit Price */}
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      item.unit_price !== undefined ||
                                      item.unit_price === 0
                                        ? String(item.unit_price)
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleUnitPriceChange(
                                        e.target.value || product.unit_price,
                                        index
                                      )
                                    }
                                  />
                                </td>
                                <td className="text-center">
                                  {/* Input for Discount Percentage */}
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      item.discount !== undefined ||
                                      item.discount === 0
                                        ? String(item.discount)
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleDiscountChange(e, index)
                                    }
                                    maxLength={2} // Limit input to 2 characters
                                  />
                                </td>
                                <td className="text-right">
                                  {currency}
                                  {item.unit_price && item.qty
                                    ? (item.unit_price * item.qty).toFixed(2)
                                    : ""}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot id="productTfooter">
                          <tr>
                            <td colSpan="1" className="text-right">
                              Total:
                            </td>
                            <td>
                              {" "}
                              {searchedValueProduct
                                ? searchedValueProduct.reduce(
                                    (qty, item) => qty + parseInt(item.qty),
                                    0
                                  )
                                : "0"}
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="text-right">
                              {currency}
                              {
                                searchedValueProduct &&
                                searchedValueProduct.length > 0

                                  ? searchedValueProduct
                                      .reduce(
                                        (total, item) =>
                                          total +
                                          (parseFloat(item.unit_price) || 0) * // Ensure unit_price is parsed as float
                                            item.qty, // Ensure discount is parsed as float
                                        0
                                      )
                                      .toFixed(2) // Optionally, round to two decimal places for currency display
                                  : "0.00" // Default value if searchedValueProduct is empty or not yet loaded
                              }
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* End Card */}
      </div>

      <div style={{ display: "none" }}>{Pdfview()}</div>
    </main>
  );
};

export default QuoteTool;
