import { useState } from "react";
import GetQuote from "../../components/GetQuote/GetQuote";
import { getBulkSearch } from "../../store/api/gplAPI";


const BulkSearch = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedProcCode, setSelectedProcCode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [loading, setLoading] = useState(false); // Loading state

  const handleGetQuote = (procCode, proDesc, price) => {
    const totalPrice =
      price * inputValue.split(/[,\s\n]+/).filter(Boolean).length;
    setSelectedProcCode({ procCode, proDesc, totalPrice });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const productList = inputValue.split(/[,\s\n]+/).filter(Boolean); // Split input by commas, spaces, or new lines

    setLoading(true); // Start loading
    try {
      const response = await getBulkSearch(productList);
      console.log("res" + response);
      let SearchData = await response.data;
      console.log("ser" + SearchData);
      setSearchResult(SearchData);
      setCurrentPage(1); // Reset to first page after new search
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Logic to get current items to display based on pagination
  const indexOfLastItem = searchResult
    ? Math.min(currentPage * itemsPerPage, searchResult.length)
    : 0;
  const indexOfFirstItem = searchResult
    ? Math.min(indexOfLastItem - itemsPerPage, searchResult.length)
    : 0;
  const currentItems = searchResult
    ? searchResult.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  // Logic to paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Logic to calculate the page numbers to display in pagination
  const maxPagesToShow = 1; // Define the maximum number of pages to show
  const totalPages = Math.ceil(searchResult.length / itemsPerPage);
  let startPage, endPage;

  if (totalPages <= maxPagesToShow) {
    // Less than or equal to max pages to show, display all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // More than max pages to show, adjust start and end pages based on current page
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);
    if (currentPage <= halfPagesToShow) {
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage + halfPagesToShow >= totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfPagesToShow;
      endPage = currentPage + halfPagesToShow;
    }
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <div>
     
      <form
        className="gpl_bulksearch_form search-form search-top"
        onSubmit={handleSubmit}
        style={{
          marginBottom: "8%",
          border: "1px solid #eee",
          marginLeft: "11%",
          marginTop: "5%",
          marginRight: "11%",
        }}
      >
        <textarea
          id="partnum-list"
          name="list"
          className="search-field"
          rows="7"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search Here..."
          style={{
            width: "91%",
            height: "200px",
            padding: "10px",
            margin: "4%",
            border: `1px solid ${isHovered ? "red" : "#eee"}`,
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
        ></textarea>
        <div className="clearfix"></div>
        <br />
        <button
          className="btn btn-bulk-search"
          type="submit"
          style={{
            backgroundColor: "red",
            color: "white",
            borderRadius: "0px",
            marginLeft: "5%",
            marginTop: "-5%",
            transition: "background-color 0.4s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "black")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "red")}
        >
          Search GPL
        </button>
      </form>
      {loading ?<div colSpan="6" className="text-center">
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
        :(
      searchResult !== undefined ? (
        searchResult && searchResult.length > 0 ? (
          <div>
            <table
              className="table table-hover table-striped responsive nowrap dataTable no-footer"
              style={{ width: "90%", marginLeft: "5%" }}
            >
              <thead>
                <tr>
                  <th>PRODUCT CODE</th>
                  <th>Description</th>
                  <th>GPL ($)</th>
                  <th>EOS</th>
                  <th>GET QUOTE</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.proc_code}</td>
                    <td>{item.pro_desc}</td>
                    <td>{item.price}</td>
                    <td>{item.eos}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleGetQuote(
                            item.proc_code,
                            item.pro_desc,
                            item.price
                          )
                        }
                        style={{
                          background: "#fdd",
                          border: "0px",
                          borderRadius: "3px",
                          padding: "3px 10px",
                          fontWeight: "500",
                        }}
                      >
                        Get Quote
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="pagination " style={{ marginLeft: "80%" }}>
              <li className={currentPage === 1 ? "disabled" : ""}>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  style={{
                    cursor: "default",
                    color: "#666 ",
                    border: "1px solid transparent",
                    background: "transparent",
                    boxShadow: "none",
                  }}
                >
                  Previous
                </button>
              </li>
              {pages.map((page, index) => (
                <li
                  key={index}
                  className={currentPage === page ? "active" : ""}
                >
                  <button
                    onClick={() => paginate(page)}
                    style={{
                      color: "#333 !important",
                      border: "1px solid #26b8dd",
                      backgroundColor: "#00c8fa",
                    }}
                  >
                    {page}
                  </button>
                </li>
              ))}
              <li className={currentPage === totalPages ? "disabled" : ""}>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  style={{
                    cursor: "default",
                    color: "#666",
                    border: "1px solid transparent",
                    background: "transparent",
                    boxShadow: "none",
                  }}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <table
              className="table table-hover table-striped responsive nowrap dataTable no-footer"
              style={{ width: "90%", marginLeft: "5%" }}
            >
              <thead>
                <tr>
                  <th>PRODUCT CODE</th>
                  <th>Description</th>
                  <th>GPL ($)</th>
                  <th>EOS</th>
                  <th>GET QUOTE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Product not found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div>Loading...</div> // or any other placeholder while data is being fetched
      ))}
      {selectedProcCode && (
        <GetQuote
          proc_code={selectedProcCode.procCode}
          price={selectedProcCode.totalPrice}
          pro_desc={selectedProcCode.proDesc}
          setSelectedProcCode={setSelectedProcCode}
        />
      )}
    </div>
  );
};

export default BulkSearch;
