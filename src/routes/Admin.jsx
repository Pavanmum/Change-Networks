import { Route } from "react-router-dom";
import AdminGallery from "../Pages/Admin/Gallery/Gallery.jsx";
import AdminHomePage from "../Pages/Admin/Dashboard/homepage.jsx";
import PriceList from "../Pages/Admin/PriceList/PriceList.jsx";
import UserAdmin from "./User.jsx";
import User from "../container/App/user.jsx";
import JobAdmin from "../Pages/Admin/Job List/jobAdmin.jsx";
import AddJob from "../Pages/Admin/Job/addJob.jsx";
import EditJob from "../Pages/Admin/Job/editJob.jsx";
import CandidatePage from "../Pages/Admin/Candidate/candidate.jsx";
import Promotion from "../Pages/Admin/Promotion/Promotion.jsx";
import WeightList from "../Pages/Admin/WeightList/WeightList.jsx";
import CustomerList from "../Pages/Admin/CustomerList/CustomerList.jsx";
import EmailMatrix from "../Pages/Admin/EmailMatrix/EmailMatrix.jsx";
import SalesMatrix from "../Pages/Admin/Sales Matrix/SalesMatrix.jsx";
import QuoteTool from "../Pages/Admin/Quote Tool/QuoteTool.jsx";
import QuoteMatrix from "../Pages/Admin/Quote Matrix/QuoteMatrix.jsx";
import ProtectedRoute from '../routes/routeProtected.jsx';

function AdminRoutes() {
  return (
    <>
      {/* Admin Routes */}
      <Route
        path="/change/dashboard"
        element={<ProtectedRoute element={AdminHomePage} />}
      />
      <Route
        path="/change/gallery"
        element={<ProtectedRoute element={AdminGallery} />}
      />
      <Route
        path="/change/gallery/:category"
        element={<ProtectedRoute element={AdminGallery} />}
      />
      <Route
        path="/change/price-list"
        element={<ProtectedRoute element={PriceList} />}
      />

      {/* Job List */}
      <Route
        path="/change/job-list"
        element={<ProtectedRoute element={JobAdmin} />}
      />
      <Route
        path="/change/job/candidate"
        element={<ProtectedRoute element={CandidatePage} />}
      />

      {/* User Routes */}
      <Route
        path="add_job"
        element={<ProtectedRoute element={AddJob} />}
      />
      <Route
        path="/change/add_job/:id"
        element={<ProtectedRoute element={EditJob} />}
      />
      <Route
        path="/change/email-matrix"
        element={<ProtectedRoute element={EmailMatrix} />}
      />
      <Route
        path="/change/promotion"
        element={<ProtectedRoute element={Promotion} />}
      />
      <Route
        path="/change/weight-list"
        element={<ProtectedRoute element={WeightList} />}
      />
      <Route
        path="/change/customer-list"
        element={<ProtectedRoute element={CustomerList} />}
      />
      <Route
        path="/change/sales-matrix"
        element={
          <ProtectedRoute element={SalesMatrix}/>
           
        }
      />
        <Route
        path="/change/quote-tool"
        element={
          <ProtectedRoute element={QuoteTool}/>
        }
      />
        <Route
        path="/change/quote-matrix"
        element={
          <ProtectedRoute element={QuoteMatrix}/>
        }
      />
      {/* Admin Routes
        <Route path="/change/dashboard" element={<AdminHomePage />} />
        <Route path="/change/gallery/:category" element={<AdminGallery />} />
        <Route path="/change/price-list" element={<PriceList />} />
        <Route path="/change/gallery" element={<AdminGallery />} />
        <Route path="/change/promotion" element={<Promotion/>}/>
        <Route path="/change/weight-list" element={<WeightList/>}/>
        <Route path="/change/customer-list" element={<CustomerList/>}/> */}

      <Route
        path="user"
        element={<ProtectedRoute element={User} />}
      >
        {UserAdmin()}
      </Route>
    </>
  );
}

export default AdminRoutes;
