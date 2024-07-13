import { useState, useEffect } from "react";
import "./CiscoGPL.css";
import { useParams, useNavigate } from "react-router-dom";
import GetQuote from "../../components/GetQuote/GetQuote";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  getHandleSearch,
  getSelectedSearch,
  getTopSearchFrequency,
  getURLSearch,
} from "../../store/api/gplAPI";

const MainContainer = ({ setShowBulk }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [gplsearch, setGPLSearch] = useState(true);
  const [product, setProduct] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedProcCode, setSelectedProcCode] = useState(null);
  const [emailSend, setEmailSend] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const params = useParams();
  const navigate = useNavigate();

  const handleBulkSearch = () => {
    navigate("/ciscogpl/bulk-search");
    setShowBulk(true);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get("search");

    const fetchData = async () => {
      if (searchValue) {
        setLoading(true); // Start loading
        try {
          const response = await getURLSearch(searchValue);
          let SearchValue = await response.data;
          setSearchResult(SearchValue);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false); // Stop loading
        }
      }
    };

    fetchData();
  }, [location]);

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    try {
      let response;
      if (gplsearch) {
        response = await getHandleSearch(searchValue);
        console.log(response);
        navigate(`/ciscogpl/gpl-details?search=${searchValue}`);
        let SearchValue = await response.data;
        setSearchResult(SearchValue);
      } else if (product) {
        response = await getHandleSearch(searchValue);
        navigate(`/ciscogpl/gpl-details?search=${searchValue}`);
        let SearchValue = await response.data;
        setSearchResult(SearchValue);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const selectedSearch = async (selectedValue) => {
    setLoading(true); // Start loading
    try {
      const response = await getSelectedSearch(selectedValue);
      let SelectedSearch = await response.data;
      console.log(SelectedSearch);
      setSearchResult(SelectedSearch);
      navigate(`/ciscogpl/gpl-details?search=${selectedValue}`);
      setSearchValue(selectedValue);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const topSearch = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await getTopSearchFrequency();
      let TopSearch = await response.data;
      setSearchResult(TopSearch);
      navigate("/ciscogpl/gpl-details");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleGetQuote = (procCode, price, proDesc) => {
    setSelectedProcCode({ procCode, price, proDesc });
  };

  return (
    <div className="container">
     

          <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="products-details-tab">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <ul className="tabss">
                  <li className="">
                    <button
                      onClick={() => {
                        setGPLSearch(true);
                        setProduct(false);
                      }}
                      className={"dot" + (gplsearch ? " red-dot" : "")}
                      style={
                        gplsearch
                          ? { backgroundColor: "red", color: "white" }
                          : {}
                      }
                    >
                      <div>GPL Search</div>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setProduct(true);
                        setGPLSearch(false);
                      }}
                      className={"dot" + (product ? " red-dot" : "")}
                      style={
                        product
                          ? { backgroundColor: "red", color: "white" }
                          : {}
                      }
                      >
                      <div className="dot"></div>
                      Product Search
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(event) => {
                        topSearch(event);
                        setSearchValue("");
                        setProduct(false);
                        setGPLSearch(false);
                      }}
                      className={
                        "dot" + (!gplsearch && !product ? " red-dot" : "")
                      }
                      style={
                        !gplsearch && !product
                          ? { backgroundColor: "red", color: "white" }
                          : {}
                      }
                    >
                      <div className="dot"></div>
                      Top Search
                    </button>
                  </li>
                </ul>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="tab_content">
                  <div className="tabs_item widget-area">
                    <div className="widget widget_search">
                      <form
                        className="search-form search-top"
                        name="search"
                        method="GET"
                        >
                        <label>
                          <span className="screen-reader-text">
                            Search for:
                          </span>
                          <input
                            id="prosearch"
                            type="text"
                            name="search"
                            placeholder="GPL Search"
                            autoComplete="off"
                            className="search-field mt-2"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                          />
                        </label>
                        <button
                          id="submit"
                          type="submit"
                          name="submit"
                          value="GPL Search"
                          onClick={handleSearch}
                          style={{ marginTop: "8px" }}
                        >
                          {gplsearch ? (
                            <span>GPL Search</span>
                          ) : product ? (
                            <span>Product Search</span>
                          ) : (
                            <span> Search</span>
                          )}
                        </button>
                        <button
                          className="btn btn-bulk-search "
                          onClick={handleBulkSearch}
                          target="_blank"
                          style={{ marginTop: "6px" }}
                          >
                          Bulk Search
                        </button>
                      </form>
                      <div className="gpl-desc col-md-offset-2 col-md-8">
                        <div id="display"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
          <div className="mtb-30">
            {searchResult ? (
              searchValue ? (
                searchResult.length > 0 && (
                  <table className="table table-hover table-striped responsive nowrap">
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
                      {searchResult.map((item, index) => (
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
                                  item.price,
                                  item.pro_desc
                                )
                              }
                              style={{
                                background: "#fdd",
                                border: "0px",
                                borderRadius: "3px",
                                padding: "1px 1px",
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
                )
              ) : (
                searchResult.length > 0 && (
                  <table className="table table-hover table-striped responsive nowrap">
                    <thead>
                      <tr>
                        <th>RANK</th>
                        <th>PRODUCT CODE</th>
                        <th>SEARCH FREQUENCY</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResult.map((item, index) => (
                        <tr
                          key={index}
                          onClick={() => {
                            selectedSearch(item.proc_code);
                          }}
                        >
                          <td>{index + 1}</td>
                          <td>{item.proc_code}</td>
                          <td>{item.search_frequency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              )
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
            )}
          </div>
          )} {/* Render loader when loading */}
          {selectedProcCode && (
            <GetQuote
            proc_code={selectedProcCode.procCode}
              price={selectedProcCode.price}
              pro_desc={selectedProcCode.proDesc}
              setSelectedProcCode={setSelectedProcCode}
              setEmailSend={setEmailSend}
              />
          )}
        </div>
      </div>
      <SweetAlert
      success
        show={emailSend}
        title="Message Sent Successfully"
        text="Your message has been sent"
        onConfirm={() => setEmailSend(false)}
        confirmBtnText="Close"
        buttonsStyling={false}
        confirmBtnCssClass="custom-close-button"
        customClass={{ confirmButton: "custom-close-button" }}
      />
    </div>
  );
};

export default MainContainer;
