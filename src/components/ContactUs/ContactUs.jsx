import { useState } from "react";
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
// import 'react-sdxSS/dist/ReactToastify.css';
import {
  SubmitContactUs,
  sendEmailerToUser,
} from "../../store/api/ContactUsAPI";

const ContactUs = ({ setShowSweetAlert }) => {
  const [valid, setValid] = useState(false);
  const [country, setCountry] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    if (valid) {
      try {
        const formData = new FormData(event.target);
        const contact_name = formData.get("name");
        const email_id = formData.get("email");
        const mob_num = formData.get("phone");
        const company_name = formData.get("cname");
        const msg = formData.get("comment");

        const newContact = {
          Contact_Name: contact_name,
          Email_id: email_id,
          country: country,
          Mob_Num: mob_num,
          Company_Name: company_name,
          msg: msg,
        };
        console.log(newContact);
        const response = await SubmitContactUs(newContact);
        let Contact = await response;
        console.log(Contact);
        await sendEmailerToUser(
          company_name,
          email_id,
          mob_num,
          country,
          company_name,
          msg
        );
        if (Contact) {
          console.log("Email sent successfully");
          setShowSweetAlert(true); // Show SweetAlert after email sending
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
    <section id="contact " className="contact-area ptb-100 ">
      <div className="container-fluid">
        <div className="section-title text-center">
          <h2>Get In Touch With Us</h2>
          <p>
            We will be pleased to contact you to add value to your business.
          </p>
        </div>
        <div className="row align-items-center ">
          <div className="col-lg-6 ">
            <div className="contact-image ">
              <img
                src="https://change-networks.com/public/front_assets/img/book-contact.png "
                alt="image "
              />
            </div>
          </div>
          <div className="col-lg-6 ">
            <div className="contact-form ">
              <form
                id="contactform"
                onSubmit={submitHandler}
                method="post"
                name="form"
              >
                <div className="row ">
                  <div className="col-lg-12 col-md-12 ">
                    <div className="form-group ">
                      <textarea
                        id="cf_message"
                        name="comment"
                        cols={30}
                        rows={4}
                        className="form-control"
                        required
                        placeholder="Message *"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 ">
                    <div className="form-group ">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        required
                        placeholder="Conatct Name *"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 ">
                    <div className="form-group ">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        required
                        placeholder="Work E-mail *"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 ">
                    <div className="form-group ">
                      <CountrySelect
                        onChange={(e) => {
                          setCountry(e.name);
                        }}
                        placeHolder="Select Country"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 ">
                    <div className="form-group">
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="form-control"
                        required
                        placeholder="Mobile with Country code *"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 ">
                    <div className="form-group">
                      <input
                        type="text"
                        id="cname"
                        name="cname"
                        className="form-control"
                        required
                        placeholder="Company Name *"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div>
                      <ReCAPTCHA
                        sitekey="6LfjVCITAAAAAHNOHIFXxjwjaLS1GTI4T7lyPG8i"
                        onChange={() => setValid(true)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="send-btn ">
                      <button type="Submit" className="default-btn">
                        Send <span />
                      </button>
                      <ToastContainer />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
