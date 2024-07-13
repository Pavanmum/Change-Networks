import Navbar from "../../cn_components/Navbar.jsx";
import Footer from "../../cn_components/Footer.jsx";
const About = () => {
  return (
    <div>
      <Navbar />
      <section className="top-banner text-center ptb-70">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <h1>About Us</h1>
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
                  <a href="/about" className="">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="products-about-area ptb-70">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 order-lg-first order-2">
              <div className="products-about-content text-justify">
                <p>
                  CHANGE Networks is a multinational IT company with expertise
                  in networking and software development. The company is an
                  authorized Global Distributor of COMMANDO networking equipment
                  and a leading independent reseller of new, pre-owned and
                  refurbished networking equipment. It develops software for its
                  inhouse and joint venture requirements.
                </p>

                <p className="pt-3">
                  CHANGE Networks has established strategic partnership with
                  COMMANDO Networks Inc., USA – that offers networking equipment
                  with expertise on Switches, Routers, Wireless, Media
                  Converters, SFP Modules and more. The company is powerhouse of
                  sourcing COMMANDO networking equipment at cost that’s
                  unmatched worldwide.
                </p>

                <p className="pt-3">
                  The company offers new, pre-owned and refurbished networking
                  equipment – with expertise in Cisco. The products are
                  dependable and affordable, genuine, high quality and mostly
                  mint condition – assured by one year replacement warranty. The
                  lead time is shorter, support is prompt, and the response time
                  is faster. The company makes sharper portfolio choices with
                  focus on offerings with market differentiation and where it
                  has strong and clear advantage. The company products and
                  services offer higher ROI and lower TCO. It offers the highest
                  level of value, technical expertise, service, and product
                  availability without breaking the budget.
                </p>

                <p className="pt-3">
                  The company offers flexibility in doing business with its
                  presence in strategic geographies such as Dubai, India, China,
                  Hong Kong, and USA. It adds value and market differentiation
                  in your business offerings. The company has been deep in the
                  networking business since 2010.
                </p>

                <p className="pt-3">
                  COMMANDO and Cisco are its core strength. If you’re into
                  networking, you must explore doing business with CHANGE.
                </p>
              </div>
            </div>
            <div className="col-sm-6 order-lg-last order-1">
              <img
                src="https://www.change-networks.com/public/front_assets/img/11.jpg"
                className="rounded img-fluid ml-0 ml-lg-3 mb-3 mb-lg-2"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
