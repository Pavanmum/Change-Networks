
import Navbar from '../../cn_components/Navbar.jsx'
import Footer from '../../cn_components/Footer.jsx'

const Awards = () => {
  return (
    <div> <Navbar/>
    <section className="top-banner text-center ptb-70">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-12">
                    <h1>Awards</h1>
                    <ul>
                        <li><a href="/" className="mr-2">Home</a></li>
                        <li><a href="" className="mr-2">/</a></li>
                        <li><a href="/awards" className="">Awards</a></li>
                    </ul>
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
                <i className="la la-crown " />
                </div>
                <h3>Super Brand of The Year Award</h3>
                <p>Awarded by: IEDRA</p>
            </div>
            </div>
            <div className="col-lg-4 col-md-6 ">
            <div className="single-products-feature ">
                <div className="icon ">
                <i className="la la-crown " />
                </div>
                <h3>SME Excellence Award</h3>
                <p>Awarded by: SME Chamber of India.</p>
            </div>
            </div>
            <div className="col-lg-4 col-md-6 ">
            <div className="single-products-feature ">
                <div className="icon ">
                <i className="la la-trophy " />
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
     <Footer/>
    </div>
  )
}

export default Awards