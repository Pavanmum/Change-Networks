import  { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { setCategory } from "../../../store/slices/Admin/gallerySlice.js";
import {
  fetchCategories,
  deleteImage,
} from "../../../store/api/Admin/gallery.js";
import { Domain } from "../../../../constant.jsx";
import { toast } from "react-toastify";
import './Gallery.css'
const Category = ({handleReload,setHandleReload}) => {
  const dispatch = useDispatch();
  const [selectedImageIndex, setSelectedImageIndex] = useState([]); // State to manage selected image index
  const [categoryData, setCategoryData] = useState({});
useEffect(()=>{
  if(handleReload){
    console.log(2);
    const fetchCategoriesData = async () => {
      try {
        const categoriesResponse = await fetchCategories(); // Fetch categories
        const updatedCategoryData = {};
  
        // Group categories by type dynamically
        categoriesResponse.forEach(data => {
          if (!updatedCategoryData[data.category]) {
            updatedCategoryData[data.category] = [];
          }
          updatedCategoryData[data.category].push(data);
        });
        setHandleReload(false)
        setCategoryData(updatedCategoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategoriesData();
  }
},[handleReload,setHandleReload])
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesResponse = await fetchCategories(); // Fetch categories
        const updatedCategoryData = {};
  
        // Group categories by type dynamically
        categoriesResponse.forEach(data => {
          if (!updatedCategoryData[data.category]) {
            updatedCategoryData[data.category] = [];
          }
          updatedCategoryData[data.category].push(data);
        });
  
        setCategoryData(updatedCategoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategoriesData();
  }, []);
  const handleCopy = (slug) => {
    navigator.clipboard.writeText(slug);
    toast.success("Copied to clipboard!");
  };

  const handleDownload = async (imageUrl, slug) => {
    try {
      const response = await fetch(`${Domain}${imageUrl}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = slug; // Use slug as filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoking the URL to release memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteImage(id);

      if (response) {
        toast.success("Image Deleted Successfully!");
        setHandleReload(true) // Refresh page after deletion
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleViewAllClick = (category) => {
    dispatch(setCategory(category));
  };

  const handleImageClick = (category, index) => {
    setSelectedImageIndex([category, index]); // Set the selected image index to state
  };

  const handleCloseLightbox = () => {
    setSelectedImageIndex(null); // Clear the selected image index
  };
  
  const handleNextImage = () => {
    if (!selectedImageIndex) return;
    const [category, currentIndex] = selectedImageIndex;
    const images = categoryData[category];
    if (!images) return;
    const nextIndex = (currentIndex + 1) % images.length;
    const newIndex = nextIndex > 3 ? 0 : nextIndex; // Reset to 0 if more than 3 (since array is 0-indexed)
    setSelectedImageIndex([category, newIndex]);
  };  
  const handlePrevImage = () => {
    if (!selectedImageIndex) return;
    const [category, currentIndex] = selectedImageIndex;
    const images = categoryData[category];
    if (!images) return;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    const newIndex = prevIndex > 3 ? 0 : prevIndex;
    setSelectedImageIndex([category, newIndex]);
  };
  const renderCategorySlugs = () => {
    const categorySlugs = [];
  
    Object.keys(categoryData).forEach(category => {
      const slugs = categoryData[category];
  
      categorySlugs.push(
        <div key={category} className="cat-box border-bottom pb-3 h6 sm mb-3">
          <div className="card-header-content-between py-0">
            <h4 className="card-header-title">{category}</h4>
            {/* Use Link component to navigate with category param */}
            <Link
              to={`/change/gallery/${category}`}
              className="btn btn-ghost-secondary text-dark btn-sm view-all"
              onClick={() => handleViewAllClick(category)}
            >
              <i className="bi-arrow-right me-1"></i> View all
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 js-fancybox fancyboxGallery">
            {slugs.slice(0, 4).map(({ _id, slug, img }, index) => (
              <div key={slug} className="col-lg-3 mb-3 mb-lg-3 img-580">
                <div className="card h-100">
                  <img
                    className="ls-is-cached lazyloaded"
                    src={`https://change-networks.com/${img}`}
                    alt=""
                    onClick={() => handleImageClick(category, index)} // Updated handleImageClick to pass category and index
                    style={{ cursor: "pointer" }}
                  />
                  <div className="">
                    <div className="row align-items-center mb-2">
                      <div className="col-9">
                        <h5
                          className="card-title text-dark"
                          style={{ fontSize: "13px" }}
                        >
                          {slug}
                        </h5>
                      </div>
                      <div className="col-3 text-end">
                        <div className="dropdown">
                          <button
                            type="button"
                            className="btn btn-ghost-secondary btn-icon btn-sm rounded-circle"
                            id={`teamsDropdown${slug}`}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i
                              className="las la-ellipsis-v"
                              style={{ fontSize: "20px", color: "black" }}
                            ></i>
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-sm dropdown-menu-end"
                            aria-labelledby={`teamsDropdown${slug}`}
                          >
                            <a
                              className="dropdown-item copy_pc js-clipboard"
                              href="#;"
                              data-toggle="tooltip"
                              title="Copy to clipboard!"
                              data-hs-clipboard-options='{"type":"tooltip","successtext":"copied!","contenttarget":".card-title"}'
                              onClick={() => handleCopy(slug)}
                            >
                              Copy
                            </a>
                            <a
                              className="dropdown-item downloadable"
                              data-name={slug}
                              onClick={() => handleDownload(img, slug)}
                            >
                              Download
                            </a>
                            <div className="dropdown-divider"></div>
                            <a
                              className="dropdown-item text-danger img-delete"
                              data-id="839"
                              data-img={img}
                              onClick={() => handleDelete(_id)}
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="card-text"></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    });
  
    return categorySlugs;
  };
  

  const renderLightbox = () => {
    if (!selectedImageIndex) return null;

    const [category, index] = selectedImageIndex;
    const images = categoryData[category];
  
    if (!images || index < 0 || index >= images.length) return null;
  
    // Limit the images to display to 4
    const slicedImages = images.slice(0, 4);
    const selectedImage = slicedImages[index];

    return (
      <div className="fslightbox-container fslightbox-full-dimension fslightbox-fade-in-strong">
      <div
        className="fslightbox-absoluted fslightbox-full-dimension"
        onClick={handleCloseLightbox}
        style={{
          zIndex: 1021,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <div className="fslightbox-nav">
          <div className="fslightbox-toolbar">
            <div
              className="fslightbox-toolbar-button fslightbox-flex-centered"
              title="Close"
              onClick={handleCloseLightbox}
            >
              <svg width="20px" height="20px" viewBox="0 0 24 24">
                <path
                  className="fslightbox-svg-path"
                  d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="fslightbox-slide-number-container">
            <div className="fslightbox-flex-centered">
              <span>{index + 1}</span>
              <span className="fslightbox-slash"></span>
              <div>{slicedImages.length}</div>
            </div>
          </div>
        </div>
        <div
          className="fslightbox-absoluted fslightbox-full-dimension fslightbox-flex-centered"
          style={{ transform: "translateX(0px)" }}
        >
          <div className="fslightbox-fade-in-strong ">
            <img
              className="fslightbox-source fslightbox-opacity-1"
              src={`http://192.168.1.161/change_pp_v2/${selectedImage.img}`}
              alt=""
              width={"700vw"}
            />
          </div>
        </div>
        <div
          className="fslightbox-slide-btn-container fslightbox-slide-btn-container-previous"
          title="Previous slide"
          onClick={(e) => {
            e.stopPropagation();
            handlePrevImage();
          }}
        >
          <div className="fslightbox-slide-btn fslightbox-flex-centered">
            <svg width="20px" height="20px" viewBox="0 0 20 20">
              <path
                className="fslightbox-svg-path"
                d="M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788S18.707,9.212,18.271,9.212z"
              ></path>
            </svg>
          </div>
        </div>
        <div
          className="fslightbox-slide-btn-container fslightbox-slide-btn-container-next"
          title="Next slide"
          onClick={(e) => {
            e.stopPropagation();
            handleNextImage();
          }}
        >
          <div className="fslightbox-slide-btn fslightbox-flex-centered">
            <svg width="20px" height="20px" viewBox="0 0 20 20">
              <path
                className="fslightbox-svg-path"
                d="M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
    );
  };
  

  return (
    <>
      {renderCategorySlugs()}
      {renderLightbox()}
    </>
  );
};

export default Category;
