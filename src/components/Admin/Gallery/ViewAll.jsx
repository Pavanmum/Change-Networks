import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../../store/slices/Admin/gallerySlice";
import {
  fetchCategories,
  deleteImage,
} from "../../../store/api/Admin/gallery.js";
import { Domain } from "../../../../constant.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Gallery.css'
const ViewAll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useSelector((state) => state.imageUpload);
  const [categories, setCategories] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesResponse = await fetchCategories();
        setCategories(categoriesResponse);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoriesData();
  }, []);

  useEffect(() => {
    // Parse the URL to get the category
    const urlParts = window.location.pathname.split("/");
    const categoryIndex = urlParts.indexOf("gallery") + 1;
    const urlCategory =
      categoryIndex < urlParts.length ? urlParts[categoryIndex] : null;

    if (urlCategory) {
      dispatch(setCategory(urlCategory));
    }
  }, [dispatch]);

  const handleBackClick = () => {
    dispatch(setCategory(null));
    navigate("/change/gallery");
  };

  const handleCopy = (slug) => {
    navigator.clipboard.writeText(slug);
  };

  const handleDownload = async (imageUrl, slug) => {
    try {
      const response = await fetch(`${Domain}${imageUrl}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${slug}`; // You can set the desired filename here
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
        dispatch(setCategory(null));
        toast.success("Image Delete Successfully !");
        navigate("/change/gallery");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setSelectedImageIndex(null);
    setLightboxOpen(false);
  };

  const handleNextImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex + 1) % filteredCategories.length
    );
  };

  const handlePrevImage = () => {
    setSelectedImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredCategories.length) % filteredCategories.length
    );
  };

  const filteredCategories = category
    ? categories.filter((cat) => cat.category === category)
    : categories;

  return (
    <>
      <div>
        <div className=" card-header-content-between py-0">
          <h4 className="card-header-title" style={{ fontSize: "20px" }}>
            {category}
          </h4>
          <button
            className="btn btn-ghost-secondary btn-sm view-all-cat"
            onClick={handleBackClick}
          >
            <i className="bi-arrow-left me-1"></i> Back
          </button>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 block js-fancybox fancyboxGallery">
        {/* Render selected category */}
        {filteredCategories.map((cat, index) => (
          <div className="col-lg-3 mb-3 mb-lg-3 img-580" key={index}>
            <div className="card h-100 border border-top-0 rounded-top rounded-3">
              <img
                className=" pb-4 rounded-top rounded-5"
                src={`https://change-networks.com/${cat.img}`}
                alt=""
                onClick={() => handleImageClick(index)} // Set image index on click
                style={{ cursor: "pointer" }}
              />

              <div className="">
                <div className="row align-items-center mb-2">
                  <div className="col-9">
                    <h5
                      className=" text-dark ml-3 mt-3 "
                      style={{
                        fontSize: "12px",
                        fontWeight: "800",
                        width: "150px",
                      }}
                    >
                      {cat.slug}
                    </h5>
                  </div>
                  <div className="col-3 text-end">
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-ghost-secondary btn-icon btn-sm rounded-circle "
                        id={`teamsDropdown${cat.slug}`}
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
                        aria-labelledby={`teamsDropdown${cat.slug}`}
                      >
                        <button
                          className="dropdown-item copy_pc js-clipboard"
                          href="javascript:;"
                          data-toggle="tooltip"
                          title="Copy to clipboard!"
                          data-hs-clipboard-options='{"type":"tooltip","successtext":"copied!","contenttarget":".card-title"}'
                          onClick={() => handleCopy(cat.slug)}
                        >
                          Copy
                        </button>
                        <button
                          className="dropdown-item downloadable"
                          data-name={cat.slug}
                          onClick={() => handleDownload(cat.img, cat.slug)}
                        >
                          Download
                        </button>
                        <div className="dropdown-divider"></div>
                        <button
                          className="dropdown-item text-danger img-delete"
                          data-id="839"
                          data-img={cat.img}
                          onClick={() => handleDelete(cat._id)}
                        >
                          Delete
                        </button>
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

      {/* Lightbox Component */}
      {lightboxOpen && selectedImageIndex !== null && (
        <div
          className="fslightbox-container fslightbox-full-dimension fslightbox-fade-in-strong"
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
                <span>{selectedImageIndex + 1}</span>
                <span className="fslightbox-slash"></span>
                <div>{filteredCategories.length}</div>
              </div>
            </div>
          </div>
          <div
            className="fslightbox-absoluted fslightbox-full-dimension fslightbox-flex-centered"
            style={{ transform: "translateX(0px)" }}
          >
            <div className="fslightbox-fade-in-strong ">
              <img
                className="fslightbox-img"
                src={`https://change-networks.com/${filteredCategories[selectedImageIndex].img}`}
                width={"700vw"}
                alt=""
              />
            </div>
            <div className="fslightbox-loader"></div>
          </div>
          <div
            className="fslightbox-absoluted fslightbox-full-dimension fslightbox-absoluted"
            style={{ zIndex: -1 }}
          >
            <div
              className="fslightbox-slide-caption"
              style={{
                opacity: 0,
                transform: "translate3d(0px, 0px, 0px) scale(1)",
              }}
            >
              <div>{filteredCategories[selectedImageIndex].slug}</div>
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
      )}
    </>
  );
};

export default ViewAll;
