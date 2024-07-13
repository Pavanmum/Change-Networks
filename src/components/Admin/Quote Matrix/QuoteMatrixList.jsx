import { useState, useEffect } from "react";
import { getQuoteMatrixData } from "../../../store/api/Admin/quoteMartix";
import React from "react";
import {
  setSelectedCheckBox,
  setSelectedCheckBoxData,
  setCustomerUserData,
  
} from "../../../store/slices/Admin/quoteMatrixSlice";
import { useDispatch, useSelector } from "react-redux";

const QuoteMatrixList = ({setHandleReload,handleReload}) => {
  const dispatch = useDispatch();
  const [quoteData, setQuoteData] = useState([]);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [selectedQuoteId, setSelectedQuoteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
 
  const customerUserData = useSelector(
    (state) => state.quoteMatrixSlice.customerUserData
  );
  const searchTerm = useSelector((state)=>state.dashboardSlice.searchedValue);
  useEffect(() => {
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (customerUserData.length !== 0 ) {
          dispatch(setSelectedCheckBox([]))
          setQuoteData(customerUserData);
        } else {
          const res = await getQuoteMatrixData();
          setQuoteData(res.data);
          dispatch(setCustomerUserData(res.data));
          if(res){
            dispatch(setSelectedCheckBox([]))
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [customerUserData, dispatch]);
  useEffect(() => {
    if (handleReload) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await getQuoteMatrixData();
            setQuoteData(res.data);
            setHandleReload(false);
            dispatch(setCustomerUserData(res.data));
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
      dispatch(setDeletePartner(false));
    }
  }, [dispatch,handleReload,setHandleReload]);

  const handleSort = (column) => {
    if (sortedColumn === column) {
      setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    } else {
      setSortedColumn(column);
      setSortOrder("ascending");
    }
  };

  const handleCheckboxChange = (quoteId) => {
    setSelectedQuoteId(quoteId === selectedQuoteId ? null : quoteId);
    const selectedQuote = quoteData.find((weekItem) =>
      weekItem.data.quotes.some((quote) => quote.quote_id === quoteId)
    );
    if (selectedQuote) {
      const selectedQuoteData = selectedQuote.data.quotes.filter(
        (quote) => quote.quote_id === quoteId
      );
   
      // setCheckBoxData(selectedQuoteData)
      dispatch(setSelectedCheckBoxData(selectedQuoteData));
    } else {
      console.log(`Quote with ID ${quoteId} not found in quoteData`);
    }

    // Determine if any checkbox is selected
    const anySelected = sortedQuoteData.some((weekItem) =>
      weekItem.data.quotes.some(
        (quote) =>
          quote.quote_id === quoteId && quote.quote_id === selectedQuoteId
      )
    );

    // Dispatch action based on selection state
    if (anySelected) {
      dispatch(setSelectedCheckBox(false));
    } else {
      dispatch(setSelectedCheckBox(true));
    }
  };

  const getSortedData = () => {
    const filteredData = quoteData.filter((weekItem) =>
      weekItem.data.quotes.some((quote) =>
        Object.values(quote).some((value) =>
          String(value).toLowerCase().includes(searchTerm.trim().toLowerCase())
        )
      )
    );

    const sortedData = filteredData.map((week) => ({
      ...week,
      data: {
        ...week.data,
        quotes: [...week.data.quotes]
      }
    }));

    sortedData.sort((a, b) => {
      const valueA = a.w;
      const valueB = b.w;

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "ascending"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return sortOrder === "ascending" ? valueA - valueB : valueB - valueA;
      }
    });

    if (sortedColumn) {
      sortedData.forEach((week) => {
        week.data.quotes.sort((a, b) => {
          const valueA = a[sortedColumn];
          const valueB = b[sortedColumn];

          if (typeof valueA === "string" && typeof valueB === "string") {
            return sortOrder === "ascending"
              ? valueA.localeCompare(valueB)
              : valueB.localeCompare(valueA);
          } else {
            return sortOrder === "ascending" ? valueA - valueB : valueB - valueA;
          }
        });
      });
    }

    return sortedData;
  };
  const sortedQuoteData = getSortedData();

  return (
    <div className="table-responsive datatable-custom">
      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <table
          id="datatable"
          className="w-100 table table-sm table-nowrap table-align-middle table-hover card-table quote_list_table dataTable no-footer"
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
            "isResponsive": false
          }'
          role="grid"
          aria-describedby="datatable_info"
        >
          <thead className="">
            <tr role="row">
              <th
                className="table-column-pe-0 sorting_disabled"
                style={{ width: "108.146px" }}
                rowSpan="1"
                colSpan="1"
                aria-label="#"
              >
                #
              </th>
              <th
                style={{ width: "582.247px" }}
                className={`sorting ${
                  sortedColumn === "company_name"
                    ? sortOrder === "ascending"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                onClick={() => handleSort("company_name")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Name: activate to sort column ascending"
                aria-sort={sortedColumn === "company_name" ? sortOrder : "none"}
              >
                Name
              </th>
              <th
                className={`sorting ${
                  sortedColumn === "total_price"
                    ? sortOrder === "ascending"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                style={{ width: "97.75px" }}
                onClick={() => handleSort("total_price")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Value: activate to sort column ascending"
                aria-sort={sortedColumn === "total_price" ? sortOrder : "none"}
              >
                Value
              </th>
              <th
                className={`sorting ${
                  sortedColumn === "country"
                    ? sortOrder === "ascending"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                style={{ width: "250.84px" }}
                onClick={() => handleSort("country")}
                tabIndex="0"
                aria-controls="datatable"
                rowSpan="1"
                colSpan="1"
                aria-label="Country: activate to sort column ascending"
                aria-sort={sortedColumn === "country" ? sortOrder : "none"}
              >
                Country
              </th>
              <th
                className={`sorting ${
                  sortedColumn === "user_fname"
                    ? sortOrder === "ascending"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : ""
                }`}
                style={{ width: "176.812px" }}
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
            </tr>
          </thead>
          <tbody>
            {sortedQuoteData.map((weekItem, weekIndex) => (
              <React.Fragment key={weekIndex}>
                {/* Display row with week number */}
                <tr className="odd" role="row">
                  <td style={{ backgroundColor: "#eee" }}>Week {weekItem.w}</td>
                  <td style={{ backgroundColor: "#eee" }}>
                    {weekItem.startendweak}
                  </td>
                  <td style={{ backgroundColor: "#eee" }}></td>
                  <td style={{ backgroundColor: "#eee" }}></td>

                  <td style={{ backgroundColor: "#eee" }}></td>
                </tr>
                {weekItem.data.quotes.map((quote, quoteIndex) => (
                  <tr
                    className="keyword_list1 even"
                    key={`${weekIndex}-${quoteIndex}`}
                  >
                    <td className="table-column-pe-0 py-1">
                      <div className="form-check">
                        <input
                          className="form-check-input product_select"
                          name="quote_id"
                          type="checkbox"
                          checked={quote.quote_id === selectedQuoteId}
                          onChange={() => handleCheckboxChange(quote.quote_id)}
                          id={`chk${quote.quote_id}`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`chk${quote.quote_id}`}
                        >
                          {quoteIndex + 1}
                        </label>
                      </div>
                    </td>
                    <td
                      className="py-1 pointer quote_details_btn"
                      data-id={quote.quote_id}
                    >
                      {quote.company_name}
                    </td>
                    <td className="py-1">{quote.total_price}</td>
                    <td className="py-1">{quote.country}</td>
                    <td className="py-1 text-danger1">
                      {quote.user_fname} {quote.user_lname}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QuoteMatrixList;
