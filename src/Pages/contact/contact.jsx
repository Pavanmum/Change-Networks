import { useState } from "react";
import Navbar from "../../cn_components/Navbar.jsx";
import Footer from "../../cn_components/Footer.jsx";
import ContactUs from "../../components/ContactUs/ContactUs.jsx";
import SweetAlert from "react-bootstrap-sweetalert";

const Contact = () => {
  const [showSweetAlert, setShowSweetAlert] = useState(false);

  return (
    <div>
      <Navbar />
      <section className="top-banner text-center  ptb-70">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <h1>Contact Us</h1>
              <ul>
                <li>
                  <a href="/" className="mr-2">
                    Home
                  </a>
                </li>
                <li>
                  <a href="" className="mr-2">
                    /
                  </a>
                </li>
                <li>
                  <a href="/contact" className="">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="section-block-grey">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 col-sm-6 col-12">
              <div className="contact-box">
                <i className="las la-phone"></i>
                <h4>Talk to us</h4>
                <span>
                  Give us a call on{" "}
                  <a href="tel:+97143523344" style={{ color: "black" }}>
                    +971 4352 3344
                  </a>
                </span>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-12">
              <div className="contact-box">
                <i className="las la-map"></i>
                <h4>CHANGE Networks LLC</h4>
                <span>
                  Al Sabkha Road, Unit No. 6, Al Sabkha Hotel Building, PO Box #
                  242361
                  <br />
                  Deira, Dubai, UAE
                </span>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-12">
              <div className="contact-box">
                <i className="las la-envelope"></i>
                <h4>Send an Email</h4>
                <span>
                  Directly contact our support team to get quick response
                  <br></br>
                  <a
                    href="mailto:info@change-networks.com"
                    style={{ color: "black" }}
                  >
                    Send Mail
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactUs setShowSweetAlert={setShowSweetAlert} />
      <SweetAlert
        success
        show={showSweetAlert}
        title="Message Sent Successfully"
        text="Your message has been sent"
        onConfirm={() => setShowSweetAlert(false)} // Hide SweetAlert on confirm
        confirmBtnText="Close" // Customize the text for the close button
        buttonsStyling={false} // Disable default styling of the buttons
        confirmBtnCssClass="custom-close-button" // Apply a custom CSS class to the close button
      />

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.9858782881424!2d55.30021291501105!3d25.271060483861877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE2JzE1LjgiTiA1NcKwMTgnMDguNyJF!5e0!3m2!1sen!2sin!4v1564583271589!5m2!1sen!2sin"
        width="100%"
        height="350"
        frameBorder="0"
        style={{ border: "0px" }}
        allowFullScreen=""
        title="Google Map"
      ></iframe>
      <Footer />
    </div>
  );
};

export default Contact;
