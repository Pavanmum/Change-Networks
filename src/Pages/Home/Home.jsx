import {useState} from 'react';
// import "../../cn_assets/css"
import '../../cn_assets/css/animate.min.css'
import '../../cn_assets/css/responsive.css'
import '../../cn_assets/css/pro.min.css'
import '../../cn_assets/css/line-awesome.min.css'
import '../../cn_assets/css/style.css'
import '../../cn_assets/css/careers_form.css'
import Navbar from '../../cn_components/Navbar';
import Footer from '../../cn_components/Footer';
import ContactUs from '../../components/ContactUs/ContactUs';
import SweetAlert from 'react-bootstrap-sweetalert';


function Home() {
    const [showSweetAlert, setShowSweetAlert] = useState(false); 
  return (
    <div>
    <div>
        {/* GPL SEARCH BAR END*/}
        <Navbar />
        <div id="home" className="products-banner-area two ptb-70">
        <div className="d-table">
            <div className="d-table-cell">
            <div className="container-fluid">
                <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="main-banner-content two">
                    <h1>COMMANDO Distributor</h1>
                    <p>CHANGE Networks is a Distributor of COMMANDO Networking products. COMMANDO is a technology company focused on research and development in leading-edge technologies in networking. It develops, manufactures and sells networking
                        hardware and services worldwide.
                    </p>
                    <div className="banner-btn">
                        <a href="https://www.commandonetworks.com/" target="_blank" className="default-btn">
                        Read More
                        <span />
                        </a>
                    </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="banner-image">
                    <img src="https://change-networks.com/public/front_assets/img/C3500.png" className="pull-right" alt="image" />
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        <section id="about" className="products-about-area ptb-70">
        <div className="container-fluid">
            <div className="row align-items-center">
            <div className="col-lg-6">
                <div className="center-img">
                <img src="https://change-networks.com/public/front_assets/img/E300.png" width={450} alt="image" />
                </div>
            </div>
            <div className="col-lg-6">
                <div className="products-about-content">
                <h3>COMMANDO Networking</h3>
                <p>COMMANDO is focused on Switching, Routing and Wireless Networking. The Product Portfolio includes:</p>
                <ul className="products-list">
                    <li>
                    <i className="las la-check" /> Network Switches
                    </li>
                    <li>
                    <i className="las la-check" /> Wireless
                    </li>
                    <li>
                    <i className="las la-check" /> Routers
                    </li>
                    <li>
                    <i className="las la-check" /> Media Converters
                    </li>
                    <li>
                    <i className="las la-check" /> PoE Injectors
                    </li>
                    <li>
                    <i className="las la-check" /> Transceiver Modules
                    </li>
                </ul>
                <div className="banner-btn mt-20">
                    <a href="https://www.commandonetworks.com/" target="_blank" className="default-btn">
                    Read More
                    <span />
                    </a>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section id="about" className="products-about-area ptb-40">
        <div className="container-fluid">
            <div className="row">
            <div className="col-lg-12 clearfix">
                <div className="products-about-content">
                <h3>Switches</h3>
                </div>
            </div>
            <div className="col-lg-6">
                <ul className="products-list listt">
                <li>
                    <a href="https://www.commandonetworks.com/Switches/Marshall-C3500" target="_blank">
                    <i className="las la-check " /> COMMANDO Marshall C3500 Series Modular Routing Switches
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/Switches/Soldier-C3000" target="_blank">
                    <i className="las la-check " /> COMMANDO Soldier C3000 Series Modular Routing Switches
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/Switches/Soldier-C2000" target="_blank">
                    <i className="las la-check " /> COMMANDO Soldier C2000 Series Managed Switches
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/Switches/Soldier-E2000" target="_blank">
                    <i className="las la-check " /> COMMANDO Soldier E2000 Series Managed Switches
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/Switches/Soldier-IE2000" target="_blank">
                    <i className="las la-check " /> COMMANDO Soldier IE2000 Series Industrial Managed Switches
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/Switches/Scout-C1000" target="_blank">
                    <i className="las la-check " /> COMMANDO Scout C1000 Series Unmanaged Switches
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/switches/Scout-E1000" target="_blank">
                    <i className="las la-check " /> COMMANDO Scout E1000 Series Unmanaged Switches
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/switches/Scout-E1000-LR" target="_blank">
                    <i className="las la-check " />COMMANDO Scout E1000-LR Series Long Range Unmanaged Switches
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/switches/Scout-IE1000" target="_blank">
                    <i className="las la-check " />COMMANDO Scout IE1000 Series Industrial Unmanaged Switches
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/switches/Scout-E300" target="_blank">
                    <i className="las la-check " /> COMMANDO Scout E300 Series Unmanaged Switches
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/switches/Scout-E100" target="_blank">
                    <i className="las la-check " /> COMMANDO Scout E100 Series Unmanaged Switches
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/switches/SFSG" target="_blank">
                    <i className="las la-check " /> COMMANDO SF/SG Unmanaged Switches
                    </a>
                </li>
                </ul>
            </div>
            <div className="col-lg-4 center-img-f">
                <div className="center-img">
                <img src="https://change-networks.com/public/front_assets/img/C3500.png" className width={450} alt="image" />
                </div>
            </div>
            <div className="col-lg-12 banner-btn mt-20">
                <a href="https://www.commandonetworks.com/switches" target="_blank" className="default-btn">
                Read More
                <span />
                </a>
            </div>
            </div>
        </div>
        </section></div>
    <section id="about" className="products-about-area ptb-70">
        <div className="container-fluid">
        <div className="row">
            <div className="col-lg-6">
            <div className="center-img">
                <img src="https://change-networks.com/public/front_assets/img/Wireless.png" width={450} alt="image" />
            </div>
            </div>
            <div className="col-lg-6">
            <div className="products-about-content clearfix">
                <h3>Wireless</h3>
                <ul className="products-list listt">
                <li>
                    <a href="https://www.commandonetworks.com/wireless/Indoor-Access-Points" target="_blank">
                    <i className="las la-check " /> Indoor Access Points
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/wireless/Outdoor-Access-Points" target="_blank">
                    <i className="las la-check " /> Outdoor Access Points
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/wireless/Wireless-Bridge" target="_blank">
                    <i className="las la-check " /> Wireless Bridge
                    </a>
                </li>
                </ul>
            </div>
            <div className="banner-btn mt-20 clearfix">
                <a href="https://www.commandonetworks.com/wireless" target="_blank" className="default-btn">
                Read More
                <span />
                </a>
            </div>
            </div>
        </div>
        </div>
    </section>
    <section id="about" className="products-about-area ptb-70">
        <div className="container-fluid">
        <div className="row">
            <div className="col-lg-6">
            <div className="products-about-content clearfix">
                <h3>Router</h3>
                <ul className="products-list listt">
                <li>
                    <a href="https://www.commandonetworks.com/routers/R100-PRO" target="_blank">
                    <i className="las la-check " /> R100-Pro
                    </a>
                </li>
                </ul>
            </div>
            <div className="banner-btn mt-20 clearfix">
                <a href="https://www.commandonetworks.com/routers" target="_blank" className="default-btn">
                Read More
                <span />
                </a>
            </div>
            </div>
            <div className="col-lg-6 center-img-f">
            <div className="center-img">
                <img src="https://change-networks.com/public/front_assets/img/router.png" width={350} alt="image" />
            </div>
            </div>
        </div>
        </div>
    </section>
    <section id="about" className="products-about-area ptb-70">
        <div className="container-fluid">
        <div className="row">
            <div className="col-lg-6 center-img-f">
            <div className="center-img">
                <img src="https://change-networks.com/public/front_assets/img/nm.png" width={350} alt="image" />
            </div>
            </div>
            <div className="col-lg-6">
            <div className="products-about-content clearfix">
                <h3>Network Modules</h3>
                <ul className="products-list listt">
                <li>
                    <a href="https://www.commandonetworks.com/network-modules/C3500" target="_blank">
                    <i className="las la-check " /> NM for MARSHALL C3500 Series
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/network-modules/C3000" target="_blank">
                    <i className="las la-check " /> NM for SOLDIER C3000 Series
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/network-modules/C3500_C3000" target="_blank">
                    <i className="las la-check " /> NM for MARSHALL C3500 and SOLDIER C3000 Series
                    </a>
                </li>
                </ul>
            </div>
            <div className="banner-btn mt-20 clearfix">
                <a href="https://www.commandonetworks.com/network-modules" target="_blank" className="default-btn">
                Read More
                <span />
                </a>
            </div>
            </div>
        </div>
        </div>
    </section>
    <section id="about" className="products-about-area ptb-70">
        <div className="container-fluid">
        <div className="row">
            <div className="col-lg-6">
            <div className="products-about-content clearfix">
                <h3>Media Converters</h3>
                <ul className="products-list listt">
                <li>
                    <a href="https://www.commandonetworks.com/converters/Gigabit" target="_blank">
                    <i className="las la-check " /> Gigabit
                    </a>
                </li>
                </ul>
            </div>
            <div className="banner-btn mt-20 clearfix">
                <a href="https://www.commandonetworks.com/media-converters" target="_blank" className="default-btn">
                Read More
                <span />
                </a>
            </div>
            </div>
            <div className="col-lg-6 center-img-f">
            <div className="center-img">
                <img src="https://change-networks.com/public/front_assets/img/MC.png" width={350} alt="image" />
            </div>
            </div>
        </div>
        </div></section>
    <section id="about" className="products-about-area ptb-70">
        <div className="container-fluid">
        <div className="row">
            <div className="col-lg-6 center-img-f">
            <div className="center-img">
                <img src="https://change-networks.com/public/front_assets/img/SFP.png" width={350} alt="image" />
            </div>
            </div>
            <div className="col-lg-6">
            <div className="products-about-content clearfix">
                <h3>Transceiver Modules</h3>
                <ul className="products-list listt">
                <li>
                    <a href="https://www.commandonetworks.com/transceiver-modules/Mini-GBIC" target="_blank">
                    <i className="las la-check " /> Mini-GBIC
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/transceiver-modules/SFP" target="_blank">
                    <i className="las la-check " /> SFP
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/transceiver-modules/Rugged-SFP" target="_blank">
                    <i className="las la-check " /> Rugged SFP
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/transceiver-modules/SFP-Plus" target="_blank">
                    <i className="las la-check " /> SFP+
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/transceiver-modules/t10G-UTP" target="_blank">
                    <i className="las la-check " /> 10G UTP
                    </a>
                </li>
                </ul>
            </div>
            <div className="banner-btn mt-20 clearfix">
                <a href="https://www.commandonetworks.com/transceiver-modules" target="_blank" className="default-btn">
                Read More
                <span />
                </a>
            </div>
            </div>
        </div>
        </div>
    </section>
    <section id="about" className="products-about-area ptb-70">
        <div className="container-fluid">
        <div className="row">
            <div className="col-lg-6">
            <div className="products-about-content clearfix">
                <h3>Networking Accessories</h3>
                <ul className="products-list listt">
                <li>
                    <a href="https://www.commandonetworks.com/injectors/PoE-Injectors-Active" target="_blank">
                    <i className="las la-check " /> PoE Injector - Active
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/injectors/PoE-Injectors-Passive-Gigabit" target="_blank">
                    <i className="las la-check " /> PoE Injector - Passive Gigabit
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/injectors/PoE-Injectors-Passive-FE" target="_blank">
                    <i className="las la-check " /> PoE Injector - Passive FE
                    </a>
                </li>
                <li>
                    <a href="https://www.commandonetworks.com/injectors/AC_DC_Adapters" target="_blank">
                    <i className="las la-check " /> AC/DC Adapters
                    </a>
                </li>
                </ul>
            </div>
            <div className="banner-btn mt-20 clearfix">
                <a href="https://www.commandonetworks.com/accessories" target="_blank" className="default-btn">
                Read More
                <span />
                </a>
            </div>
            </div>
            <div className="col-lg-6 center-img-f">
            <div className="center-img">
                <img src="https://change-networks.com/public/front_assets/img/PoE.png" width={350} alt="image" />
            </div>
            </div>
        </div>
        </div>
    </section>
    <section id="features " className="products-feature-area pt-100 pb-70">
        <div className="container-fluid">
        <div className="section-title text-center">
            <h2>Awards</h2>
            <p>Get what you deserve.</p>
        </div>
        <div className="row ">
            <div className="col-lg-4 col-md-6 ">
            <div className="single-products-feature ">
                <div className="icon ">
                <i className="las la-crown " />
                </div>
                <h3>Super Brand of The Year Award</h3>
                <p>Awarded by: IEDRA</p>
            </div>
            </div>
            <div className="col-lg-4 col-md-6 ">
            <div className="single-products-feature ">
                <div className="icon ">
                <i className="las la-crown " />
                </div>
                <h3>SME Excellence Award</h3>
                <p>Awarded by: SME Chamber of India.</p>
            </div>
            </div>
            <div className="col-lg-4 col-md-6 ">
            <div className="single-products-feature ">
                <div className="icon ">
                <i className="las la-trophy " />
                </div>
                <h3>Business Excellence Award</h3>
                <p>Awarded by: IEDRA</p>
            </div>
            </div>
            <div className="col-lg-2" />
            <div className="col-lg-4 col-md-6 ">
            <div className="single-products-feature ">
                <div className="icon ">
                <i className="las la-crown " />
                </div>
                <h3>International Achiever’s Award</h3>
                <p>Awarded by: International Achievers Summit</p>
            </div>
            </div>
            <div className="col-lg-4 col-md-6 ">
            <div className="single-products-feature ">
                <div className="icon ">
                <i className="las la-crown " />
                </div>
                <h3>Excellent IT Company of the Year</h3>
                <p>Awarded by: RK Excellence Award</p>
            </div>
            </div>
        </div>
        </div>
    </section>
    <section className="users-area ptb-70 ">
        <div className="container-fluid">
        <div className="row ">
            <div className="col-md-6 users-content ">
            <div className="p-relative ">
                <img src="https://change-networks.com/public/front_assets/img/ib-mobile.png " className="mob-img " alt="image " />
            </div>
            </div>
            <div className="col-md-6 users-content ">
            <h3>Business Demands to be Smarter</h3>
            <p>Save time and get more known and done by using COMMANDO mobile app. Find prices, product details, manage stock, set your selling prices for your team, do market analysis - see what's selling hot and what's not and a lot more - all
                on COMMANDO mobile app. Available on all major app stores. Download Now.</p>
            <div className="users-btn ">
                <a href="# " className=" ">
                <img src="https://change-networks.com/public/front_assets/img/apple-app-store.png " width={180 } alt="apple-app-store " />
                </a> &nbsp;
                <a href="# " className=" ">
                <img src="https://change-networks.com/public/front_assets/img/google-play-store.png " width={180 } alt="google-play-store " />
                </a>
            </div>
            </div>
        </div>
        </div>
    </section>
    <section className="gallery-area pt-100 pb-40 ">
        <div className="container-fluid">
        <div className="section-title text-center">
            <h2>Our products</h2>
            <p>We expertize in dealing in networking equipment from COMMANDO and Cisco brands.</p>
        </div>
        <div className="row ">
            <div className="col-lg-4 col-md-6 ">
            <div className="single-gallery-item ">
                <img src="https://change-networks.com/public/front_assets/img/1.jpg" alt="image " />
                {/* <div class="gallery-content ">
                    <span>CHANGE Networks</span>
                    <h3>Lorem ipsum</h3>
                </div> */}
            </div>
            </div>
            <div className="col-lg-4 col-md-6 ">
            <div className="single-gallery-item ">
                <img src="https://change-networks.com/public/front_assets/img/2.jpg " alt="image " />
                {/* <div class="gallery-content ">
                    <span>CHANGE Networks</span>
                    <h3>Lorem ipsum</h3>
                </div> */}
            </div>
            </div>
            <div className="col-lg-4 col-md-6 ">
            <div className="single-gallery-item ">
                <img src="https://change-networks.com/public/front_assets/img/3.jpg " alt="image " />
                {/* <div class="gallery-content ">
                    <span>CHANGE Networks</span>
                    <h3>Lorem ipsum</h3>
                </div> */}
            </div>
            </div>
            <div className="col-lg-4 col-md-6 ">
            <div className="single-gallery-item ">
                <img src="https://change-networks.com/public/front_assets/img/4.jpg " alt="image " />
                {/* <div class="gallery-content ">
                    <span>CHANGE Networks</span>
                    <h3>Lorem ipsum</h3>
                </div> */}
            </div>
            </div>
            <div className="col-lg-4 col-md-6 ">
            <div className="single-gallery-item ">
                <img src="https://change-networks.com/public/front_assets/img/5.jpg " alt="image " />
                {/* <div class="gallery-content ">
                    <span>CHANGE Networks</span>
                    <h3>Lorem ipsum</h3>
                </div> */}
            </div>
            </div>
            <div className="col-lg-4 col-md-6 ">
            <div className="single-gallery-item ">
                <img src="https://change-networks.com/public/front_assets/img/7.jpg " alt="image " />
                {/* <div class="gallery-content ">
                    <span>CHANGE Networks</span>
                    <h3>Lorem ipsum</h3>
                </div> */}
            </div>
            </div>
        </div>
        </div>
    </section>
    <section id="faq " className="faq-area ptb-100 " style={{display: 'none'}}>
        <div className="container-fluid">
        <div className="section-title text-center">
            <h2>FAQ</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="row align-items-center ">
            <div className="col-lg-6 ">
            <div className="faq-accordion ">
                <ul className="accordion ">
                <li className="accordion-item ">
                    <a className="accordion-title active " href="javascript:void(0) ">
                    <i className="las la-plus " /> What Shipping Methods are Available?
                    </a>
                    <p className="accordion-content show ">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </li>
                <li className="accordion-item ">
                    <a className="accordion-title " href="javascript:void(0) ">
                    <i className="las la-plus " /> What are shipping times and costs?
                    </a>
                    <p className="accordion-content ">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </li>
                <li className="accordion-item ">
                    <a className="accordion-title " href="javascript:void(0) ">
                    <i className="las la-plus " /> What payment methods can I use?
                    </a>
                    <p className="accordion-content ">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </li>
                <li className="accordion-item ">
                    <a className="accordion-title " href="javascript:void(0) ">
                    <i className="las la-plus " /> What Shipping Methods are Available?
                    </a>
                    <p className="accordion-content ">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </li>
                <li className="accordion-item ">
                    <a className="accordion-title " href="javascript:void(0) ">
                    <i className="las la-plus " /> What is a paid conversation?
                    </a>
                    <p className="accordion-content ">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </li>
                <li className="accordion-item ">
                    <a className="accordion-title " href="javascript:void(0) ">
                    <i className="las la-plus " /> Can I share resources between features?
                    </a>
                    <p className="accordion-content ">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </li>
                </ul>
            </div>
            </div>
            <div className="col-lg-6 ">
            <div className="faq-image ">
                <img src="https://change-networks.com/public/front_assets/img/faq.jpg " alt="image " />
            </div>
            </div>
        </div>
        </div>
    </section>
    <div className="newsletter-area bg-ffffff ptb-100 " style={{display: 'none'}}>
        <div className="container-fluid">
        <div className="row align-items-center ">
            <div className="col-lg-6 ">
            <div className="newsletter-image ">
                <img src="https://change-networks.com/public/front_assets/img/newsletter.png " alt="image " />
            </div>
            </div>
            <div className="col-lg-6 ">
            <div className="newsletter-form-content ">
                <div className="newsletter-content ">
                <h2>Subscribe To Our Newsletter</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing ipsum sLorem ipsuia dolor sit amet, consectetur adipisci velit sed quia non numquam quaerat voluptatem.uspendisse ultrices gravida.</p>
                </div>
                <form className="newsletter-form ">
                <input type="email " className="input-newsletter " placeholder="Your Email Address " name="EMAIL " required autoComplete="off " />
                <button type="submit ">
                    Subscribe Now
                </button>
                <div id="validator-newsletter " className="form-result " />
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
    
   <ContactUs setShowSweetAlert={setShowSweetAlert}/>

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


   <Footer/>
</div>

  )
}

export default Home
