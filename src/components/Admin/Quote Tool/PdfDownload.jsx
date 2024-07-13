import PropTypes from 'prop-types';

const YourComponent = ({
  customerData,
  currency,
  searchedValueProduct,
  basic,
  country,
  quoteNo,
  exwork,
}) => {
  
  const totalQty = `${ searchedValueProduct
    ? searchedValueProduct.reduce((qty, item) => qty + parseInt(item.qty), 0)
    : "0"
}`;

const totalPrice = `${ searchedValueProduct
    ? searchedValueProduct.reduce(
        (total, item) =>
          total +
          item.unit_price *
            item.qty *
            (1 - (item.discount || 0) / 100),
        0
      )
      .toFixed(2)
    : "0"
}`;
function getFormattedDate() {
  const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
}


 
const formattedDate = getFormattedDate();
  // If all required props are present and searchedValueProduct is not empty, proceed to render
  return (
    
    <div className='d-none1' style={{ padding: 10, margin: 10, fontSize: 9 ,}}>
      {/* Quotation table */}
      <hr style={{ width: "100%", color: "grey" }} />
      {!basic  ?  (
        <table
          cellPadding="1"
          style={{
            border: "1px solid #fff",
            width: "auto",
            backgroundColor: "white",
            
          }}
        >
          <tbody>
            {/* Quotation header */}
            <tr>
              <td
                colSpan="1"
                style={{
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "12px",
                  fontWeight: 650,
                }}
              >
                <b>Quotation</b>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* Customer details */}
            <tr>
              <td
                colSpan="4"
                style={{
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                Customer Details:
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td
                style={{
                  width: "12%",
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                {" "}
                <div>Company Name :</div>
              </td>
              <td
                style={{
                  width: "35%",
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                {customerData.company_name || ""}
              </td>
              <td
                style={{
                  width: "12%",
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                Quote #:
              </td>
              <td
                style={{
                  width: "38%",
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                {quoteNo}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                Contact Name :
              </td>
              <td
                style={{
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                {customerData.fname || ""} {customerData.lname || ""}
              </td>
              <td
                style={{
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                Date :
              </td>
              <td
                style={{
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                   {formattedDate}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                Email :
              </td>
              <td
                style={{
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                {customerData.email1 || ""}
              </td>
              <td
                style={{
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                Currency :
              </td>
              <td
                style={{
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                {currency === "$"
                  ? "USD"
                  : currency === null
                  ? "AED"
                  : currency === "¥"
                  ? "RMB"
                  : ""}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                WhatsApp :
              </td>
              <td
                style={{
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                {customerData.whatsapp || ""}
              </td>
              <td
                style={{
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                AM :
              </td>
              <td
                style={{
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                Business Manager
              </td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                Country :
              </td>
              <td
                style={{
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                {country || ""}
              </td>
              <td
                style={{
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                Ex Works :
              </td>
              <td
                style={{
                  fontFamily: "Arial",
                  textAlign: "left",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                {exwork || ""}
              </td>
            </tr>
            <tr>
              <td colSpan="4">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      ) : (
        ""
      )}

      {/* Product table */}
      <table
        className="primary"
        cellPadding="7"
        cellSpacing="0"
        style={{ width: "100%"}}
      >
        <thead>
          <tr style={{ backgroundColor: "#F2F2F2" }}>
            <th
              style={{
                width: "2%",
                fontWeight: 650,
                border: "1px solid grey",
                textAlign: "center",
                fontSize: "9px",
                fontFamily: "Arial",
              }}
            >
              #
            </th>
            <th
              style={{
                width: "5%",
                fontWeight: 650,
                border: "1px solid grey",
                textAlign: "center",
                fontSize: "9px",
                fontFamily: "Arial",
              }}
            >
              Qty
            </th>
            <th
              style={{
                width: "10%",
                fontWeight: 650,
                border: "1px solid grey",
                textAlign: "left",
                fontSize: "9px",
                fontFamily: "Arial",
              }}
            >
              Model #
            </th>
            <th
              style={{
                width: "25%",
                fontWeight: 650,
                border: "1px solid grey",
                textAlign: "left",
                fontSize: "9px",
                fontFamily: "Arial",
              }}
            >
              Description
            </th>
            <th
              style={{
                width: "6%",
                fontWeight: 650,
                border: "1px solid grey",
                textAlign: "left",
                fontSize: "9px",
                fontFamily: "Arial",
              }}
            >
              List Price
            </th>
            <th
              style={{
                width: "6%",
                fontWeight: 650,
                border: "1px solid grey",
                textAlign: "left",
                fontSize: "9px",
                fontFamily: "Arial",
              }}
            >
              Unit Price
            </th>
            <th
              style={{
                width: "7%",
                fontWeight: 650,
                border: "1px solid grey",
                textAlign: "left",
                fontSize: "9px",
                fontFamily: "Arial",
              }}
            >
              Discount %
            </th>
            <th
              style={{
                width: "9%",
                fontWeight: 650,
                border: "1px solid grey",
                textAlign: "left",
                fontSize: "9px",
                fontFamily: "Arial",
              }}
            >
              Line Total
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Render each product row */}
       
          {searchedValueProduct.map((item, index) => (
            <tr key={index}>
              <td
                style={{
                  textAlign: "center",
                  fontSize: "9px",
                  fontFamily: "Arial",
                  borderTop: "1px solid #000",
                }}
              >
                {index + 1}
              </td>
              <td
                style={{
                  textAlign: "center",
                  fontSize: "9px",
                  fontFamily: "Arial",
                  borderTop: "1px solid #000",
                }}
              >
                {item.qty}
              </td>
              <td
                style={{
                  textAlign: "left",
                  fontSize: "9px",
                  fontFamily: "Arial",
                  borderTop: "1px solid #000",
                }}
              >
                {item.proc_code || item.product_code}
              </td>
              <td
                style={{
                  textAlign: "left",
                  fontSize: "9px",
                  fontFamily: "Arial",
                  borderTop: "1px solid #000",
                }}
              >
                {item.pro_desc || item.description}
              </td>
              <td
                style={{
                  textAlign: "left",
                  fontSize: "9px",
                  fontFamily: "Arial",
                  borderTop: "1px solid #000",
                }}
              >{`${currency}${item.price}`}</td>
              <td
                style={{
                  textAlign: "left",
                  fontSize: "9px",
                  fontFamily: "Arial",
                  borderTop: "1px solid #000",
                }}
              >{`${currency}${item.unit_price}`}</td>
              <td
                style={{
                  textAlign: "center",
                  fontSize: "9px",
                  fontFamily: "Arial",
                  borderTop: "1px solid #000",
                }}
              >
                {item.discount}
              </td>
              <td
                style={{
                  textAlign: "right",
                  fontSize: "9px",
                  fontFamily: "Arial",
                  borderTop: "1px solid #000",
                }}
              >{`${currency}${(
                item.unit_price *
                item.qty *
                (1 - (item.discount || 0) / 100)
              ).toFixed(2)}`}</td>
            </tr>
          ))}
        </tbody>
        {/* Footer for the product table */}
        <tfoot>
          <tr className="p-1" style={{ background: "#eee" }}>
            <td
              style={{
                width: "5%",
                borderTop: "1px solid #000",
                borderBottom: "1px solid #000",
                textAlign: "center",
                fontSize: "9px",
                fontFamily: "Arial",
              }}
            >
              Total
            </td>
            <td
              style={{
                width: "7%",
                borderTop: "1px solid #000",
                borderBottom: "1px solid #000",
                textAlign: "center",
                fontSize: "9px",
                fontFamily: "Arial",
              }}
            >{totalQty}</td>
            <td
              style={{
                width: "15%",
                borderTop: "1px solid #000",
                borderBottom: "1px solid #000",
                textAlign: "left",
                fontSize: "9px",
                fontFamily: "Arial",
              }}
            ></td>
            <td
              style={{
                width: "35%",
                borderTop: "1px solid #000",
                borderBottom: "1px solid #000",
                textAlign: "left",
                fontSize: "9px",
                fontFamily: "Arial",
              }}
            ></td>
            <td
              style={{
                width: "9%",
                borderTop: "1px solid #000",
                borderBottom: "1px solid #000",
                textAlign: "left",
                fontSize: "9px",
                fontFamily: "Arial",
              }}
            ></td>
            <td
              style={{
                width: "9%",
                borderTop: "1px solid #000",
                borderBottom: "1px solid #000",
                textAlign: "left",
                fontSize: "9px",
                fontFamily: "Arial",
              }}
            ></td>
            <td
              style={{
                width: "8%",
                borderTop: "1px solid #000",
                borderBottom: "1px solid #000",
                textAlign: "center",
                fontSize: "9px",
                fontFamily: "Arial",
              }}
            ></td>
            <td
              style={{
                width: "15%",
                borderTop: "1px solid #000",
                borderBottom: "1px solid #000",
                textAlign: "left",
                fontSize: "9px",
                fontFamily: "Arial",
              }}
            >{`${currency}${totalPrice
            }`}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );

  YourComponent.propTypes = {
    searchedValueProduct: PropTypes.array, // Define PropTypes for array
  };
};

export default YourComponent;
