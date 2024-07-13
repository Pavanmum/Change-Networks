
import img from '../../../assets/oc-collaboration.svg'
const AdminHomePage = () => {
  return (
    <>
     <main id="content" role="main" className="main">
   <div className="content container-fluid">
  <div className="row justify-content-sm-center text-center">
    <div className="col-sm-7 col-md-5">
      <img className="img-fluid mb-5" src={img} alt data-hs-theme-appearance="default" />
      <h1>Hello, welcome to CHANGE</h1>
      {/* <p>You are now minutes away from creativity than ever before. Enjoy!</p> */}
    </div>
  </div>
  {/* End Row */}
</div>
</main>

    </>
  );
};

export default AdminHomePage;
