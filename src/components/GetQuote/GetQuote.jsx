import { useState, useEffect } from "react";
import "./GetQuote.css";
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SendGPLFormInfo, SendGPLEmailToUser } from "../../store/api/gplAPI";

const GetQuote = ({
  proc_code,
  setSelectedProcCode,
  price,
  pro_desc,
  setEmailSend,
}) => {
  const [valid, setValid] = useState(false);
  const [quantity, setQuantity] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);
  const [showSweetAlert, setShowSweetAlert] = useState(false); // State variable for SweetAlert
  const [country, setCountry] = useState("");

  useEffect(() => {
    console.log(quantity);
    // Calculate total price whenever quantity or price changes
    if (quantity && !isNaN(quantity)) {
      const total = parseInt(quantity) * parseFloat(price);
      setTotalPrice(total);
    }
  }, [quantity, price]);
  console.log(showSweetAlert);
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(totalPrice);
    console.log(valid);
    if (valid) {
      try {
        const formData = new FormData(event.target);
        const full_Name = formData.get("name");
        const email_id = formData.get("email");
        const teleNum = formData.get("phone");
        const quantity = formData.get("quantity");
        const msg = formData.get("message");

        const newQuote = {
          Full_Name: full_Name,
          Email_id: email_id,
          country: country,
          TeleNum: teleNum,
          proc_code: proc_code,
          quantity: quantity,
          msg: msg,
          totalPrice: totalPrice,
        };
        const response = await SendGPLFormInfo(newQuote);
        await SendGPLEmailToUser(
          full_Name,
          email_id,
          proc_code,
          quantity,
          teleNum,
          price,
          totalPrice,
          pro_desc
        );
        if (response) {
          console.log("Email sent successfully");
          setShowSweetAlert(true); // Show SweetAlert after email sending
          setEmailSend(true);
          setSelectedProcCode(null);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error while Sending email");
      }
    } else {
      toast.error("Please Select Captcha");
      console.log("please select captcha");
    }
  };
  return (
    <div>
      {proc_code && (
        <div
          className="modal in"
          id="login_popup"
          role="dialog"
          tabIndex="-1"
          aria-labelledby="login_popup_Label"
          aria-hidden="false"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Get Quote</h4>
                <button
                  type="button"
                  className="btn close"
                  data-dismiss="modal"
                  onClick={() => setSelectedProcCode(null)}
                >
                  ×
                </button>
              </div>

              <div className="modal-body">
                <form
                  id=""
                  method="POST"
                  className="form getquote"
                  onSubmit={submitHandler}
                >
                  <input
                    type="hidden"
                    value="/ciscogpl/gpl-detail.php?search=ws-c2960x-24ps-l"
                    name="returnUrl"
                  />
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      placeholder="Full Name*"
                      required="required"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email ID*"
                      required="required"
                    />
                  </div>
                  <div className="form-group">
                    <CountrySelect
                      onChange={(e) => {
                        setCountry(e.name);
                      }}
                      placeHolder="Select Country"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="Telephone Number*"
                      required="required"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="reference"
                      readOnly
                      name="reference"
                      value={proc_code}
                      required="required"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="quantity"
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Quantity In Number"
                      required="required"
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      placeholder="Your Message*"
                      required="required"
                    ></textarea>
                  </div>
                  <div>
                    <ReCAPTCHA
                      sitekey="6LfjVCITAAAAAHNOHIFXxjwjaLS1GTI4T7lyPG8i"
                      onChange={() => setValid(true)}
                    />
                  </div>
                  <button type="submit" className="btn default-btn">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetQuote;
