import { Navigate, Route, Routes } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";

import LandingPage from '../src/views/examples/LandingPage';
import ProfilePage from '../src/views/examples/ProfilePage';
import LoginPage from '../src/views/examples/LoginPage';
import Gallery from '../src/Pages/GalleryPage/Gallery';
import SinglePageGallery from '../src/Pages/GalleryPage/SinglePageGallery';
import Home from './Pages/Home/Home';
import Career from './Pages/Careeers/Career';
import FormComponent from './components/careerForm/FormComponent';
import CiscoGPL from './Pages/CiscoGPL/CiscoGPL';
import About from './Pages/About/About';
import Awards from './Pages/Awards/Awards';
import Contact from './Pages/contact/Contact';
import AdminLoginPage from './Pages/Admin/adminLoginPage/AdminLoginPage';
import AdminForgotPage from './Pages/Admin/adminForgotPage/AdminForgotPage.jsx';


function App() {


  return (
    <>
      <Routes>
      {/* <Route path="/" element={<Index />} /> */}
      <Route path="/" element={<Home />} />
      

      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/profile-page" element={<ProfilePage />} /> 
      <Route path="/login-page" element={<LoginPage />} />
      <Route path="/career" element={<Career />} />
      <Route path="/gallery" element={<Gallery />} />
      {/* <Route path="/gallery/:id" element={<Gallery />} /> */}
      <Route path="/gallery/:query" element={<SinglePageGallery />} />
      <Route path='/profile' element={<FormComponent />} />
      <Route path="/ciscogpl" element={<CiscoGPL />} />
        <Route path="/ciscogpl/gpl-details" element={<CiscoGPL />} />
        <Route path="/ciscogpl/gpl-details/:proc_code" element={<CiscoGPL />} />
        <Route path="/ciscoGPL/bulk-search" element={<CiscoGPL />} />
        <Route path="/ciscoGPL/bulk-search/:proc_code" element={<CiscoGPL />} />  
        <Route path="/about" element={<About />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/contact" element={<Contact />} />

          
      

        {/* <Route path="/change/login" element={<AdminLoginPage />} />
        <Route path="/change/forgot" element={<AdminForgotPage />} /> */}



      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes> 
    </>
  )
}

export default App

