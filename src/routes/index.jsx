import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "../Pages/Home/Home.jsx";
import Career from "../Pages/Careeers/Career.jsx";
import Gallery from "../Pages/GalleryPage/Gallery.jsx";
import SinglePageGallery from "../Pages/GalleryPage/SinglePageGallery.jsx";
import FormComponent from "../components/careerForm/FormComponent.jsx";
import CiscoGPL from "../Pages/CiscoGPL/CiscoGPL.jsx";
import About from "../Pages/About/About.jsx";
import Awards from "../Pages/Awards/Awards.jsx";
import Contact from "../Pages/contact/contact.jsx";
import AdminLoginPage from "../Pages/Admin/adminLoginPage/AdminLoginPage.jsx";
import AdminForgotPage from '../Pages/Admin/adminForgotPage/AdminForgotPage.jsx';
import PasswordVerifyPage from "../Pages/Admin/PasswordPage/passwordVerifyPage.jsx";
// import Protected from "../routes/routeProtected.jsx";
import App from "../container/App/index.jsx";
import AdminRoutes from "./Admin.jsx";
import { useEffect } from "react";
import { checkAuthStatus } from "../store/slices/Admin/authSlice.js";
import ProtectedRoute from "../routes/routeProtected.jsx";

function AppRoute() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log(isAuthenticated)

  const dispatch = useDispatch()

  useEffect(() => {
    console.log(isAuthenticated)
    // dispatch(checkAuthStatus())
  },[dispatch])

  return (
    <Routes>
      <Route path="*" element={<h1>404 Not Found</h1>} />
      <Route path="/" element={<Home />} />
      <Route path="/career" element={<Career />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/gallery/:query" element={<SinglePageGallery />} />
      <Route path="/profile" element={<FormComponent />} />
      <Route path="/ciscogpl" element={<CiscoGPL />} />
      <Route path="/ciscogpl/gpl-details" element={<CiscoGPL />} />
      <Route path="/ciscogpl/gpl-details/:proc_code" element={<CiscoGPL />} />
      <Route path="/ciscoGPL/bulk-search" element={<CiscoGPL />} />
      <Route path="/ciscoGPL/bulk-search/:proc_code" element={<CiscoGPL />} />
      <Route path="/about" element={<About />} />
      <Route path="/awards" element={<Awards />} />
      <Route path="/contact" element={<Contact />} />

      {/* Admin */}
      <Route path="/change/login" element={
       isAuthenticated ? <Navigate to="/change/dashboard" replace="true" /> :
        <AdminLoginPage />} 
      />
      <Route path="/change/forgot" element={
        <AdminForgotPage />} 
      />
      <Route path="/change/update_password" element={
        <PasswordVerifyPage />} 
      />

      {/* Protected Admin Routes */}
      <Route
        path="/change"
        element={
        <App />
        }
      >
        {AdminRoutes()}
      </Route>
    </Routes>
  );
}

export default AppRoute;
