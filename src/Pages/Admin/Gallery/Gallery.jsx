import AddImage from "../../../components/Admin/Gallery/AddImage";
import { useState ,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';

import SweetAlert from "react-bootstrap-sweetalert";
import Category from "../../../components/Admin/Gallery/Category";
import AdminViewAllCategory from '../../../components/Admin/Gallery/ViewAll.jsx';
import { setCategory } from '../../../store/slices/Admin/gallerySlice.js';

const Gallery = () => {
  const dispatch = useDispatch();
  const [showAddImage, setShowAddImage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // State for upload progress
  const [handleReload ,setHandleReload]=useState(false)
  const { category } = useSelector(state => state.imageUpload);
  const handleAddImageClick = () => {
    setShowAddImage(true);
    setSuccessMessage(false); // Reset success message
  };
  console.log(handleReload);
  useEffect(() => {
    // Parse the URL to get the category
    const urlParts = window.location.pathname.split("/");
    const categoryIndex = urlParts.indexOf("gallery") + 1;
    const urlCategory = categoryIndex < urlParts.length ? urlParts[categoryIndex] : null;
  
    if (urlCategory) {
      dispatch(setCategory(urlCategory));
    }
    else{
      dispatch(setCategory(null))
    }
  }, [dispatch]);
  return (
    <div >
     <div className="d-flex justify-content-between align-items-center">
  <div> 
    <h3 className="mb-0 d-inline me-4">Real Images</h3>
    <ul className="nav nav-segment">
      <li className="nav-item">
        <a className="nav-link active" href="#">
          <i className="bi-hdd nav-icon"></i> CISCO
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="https://www.commandonetworks.com/gallery" target="_blank">
          <i className="bi-globe nav-icon"></i> COMMANDO
        </a>
      </li>
    </ul>
  </div>
  <div>
    <button type="button" className="btn text-dark btn-white me-2" data-bs-toggle="modal" onClick={handleAddImageClick} data-bs-target="#addGalleryModal">
      <i className="bi-plus me-1"></i> Add Images
    </button>
  </div>
</div>


      {showAddImage && (
        <AddImage
          setSuccessMessage={setSuccessMessage}
          successMessage={successMessage}
          setShowAddImage={setShowAddImage}
          setUploadProgress={setUploadProgress}
          uploadProgress={uploadProgress}
          setHandleReload={setHandleReload}
        />
      )}
     
     
      {category ? <AdminViewAllCategory /> : <Category setHandleReload={setHandleReload} handleReload={handleReload} />}

      {
        <SweetAlert
          success
          show={successMessage}
          title="Image Saved Successfully"
          text="Your message has been sent"
          onConfirm={() => setSuccessMessage(false)} // Hide SweetAlert on confirm
          confirmBtnText="Close" // Customize the text for the close button
          buttonsStyling={false} // Disable default styling of the buttons
          confirmBtnCssClass="custom-close-button" // Apply a custom CSS class to the close button
        />
      
      }
    </div>
  );
};

export default Gallery;
