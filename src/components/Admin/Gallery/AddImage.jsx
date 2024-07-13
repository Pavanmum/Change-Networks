import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedImages,
  removeSelectedImage,
  uploadImages,
  resetState,
} from "../../../store/slices/Admin/gallerySlice.js";
import assets from "../../../assets/oc-browse.svg";
import "./Gallery.css";
import { selectUserDetail } from "../../../store/slices/Admin/authSlice.js";
const AddImage = ({ setShowAddImage, setSuccessMessage ,setHandleReload}) => {
  const dispatch = useDispatch();
  const  userDetial = useSelector(selectUserDetail);
  const {
    selectedImages,
    uploadProgress,
    successMessage,
    loading,
    errorMessage,
  } = useSelector((state) => state.imageUpload);
  const fileInputRef = useRef(null);
  console.log(selectedImages);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const imagesArray = [...selectedImages];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageURL = URL.createObjectURL(file);
      imagesArray.push({ file, imageURL });
    }
    dispatch(setSelectedImages(imagesArray));
  };

  const removeImage = (index, e) => {
    e.stopPropagation();
    dispatch(removeSelectedImage(index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const category = document.querySelector('[name="category"]').value;
    const type = document.querySelector('[name="type"]').value;
    const productCode = document.querySelector('[name="product_code"]').value;
    const description = document.querySelector('[name="description"]').value;
    const files = fileInputRef.current.files;
const created_by = userDetial.data.user_id || userDetial.data.email
    dispatch(uploadImages({ category, type, productCode, description, files, created_by }));
    setHandleReload(true)
  };

  useEffect(() => {
    if (uploadProgress === 100) {
      setSuccessMessage(true);
      setTimeout(() => {
        setShowAddImage(false);
        dispatch(resetState());
      }, 2000); // Wait for 2 seconds before closing the modal and showing the success message
    }
  }, [uploadProgress, setShowAddImage, setSuccessMessage, dispatch]);

  return (
    <div>
      <div
        className={`modal fade  show ${successMessage ? "d-none" : ""}`}
        id="addGalleryModal"
        tabIndex="-1"
        aria-labelledby="newProjectModalLabel"
        style={{ display: "block", paddingLeft: "0px", overflow: "scroll" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog add-image modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark" id="newProjectModalLabel">
                Add Images
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowAddImage(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="js-validate needs-validation gallery-upload-form"
                id=""
                noValidate
                onSubmit={handleSubmit}
              >
                <div id="createProjectStepFormContent">
                  <div id="createProjectStepDetails">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="mb-4">
                          <div
                            className="tom-select-custom"
                            data-hs-validation-validate-className=""
                          >
                            <select
                              className="js-select form-select tomselected "
                              name="category"
                              autoComplete="off"
                              required
                              data-hs-tom-select-options='{"searchInDropdown":false,"placeholder":"Select Category","hideSearch":true}'
                              id="tomselect-1"
                              tabIndex="-1"
                            >
                              <option value="Switches">Switches</option>
                              <option value="Wireless">Wireless</option>
                              <option value="Routers">Routers</option>
                              <option value="Transceivers">Transceivers</option>
                            </select>
                            <div className="tom-select-custom">
                              <div
                                className="ts-dropdown single plugin-change_listener plugin-hs_smart_position"
                                style={{ display: "none" }}
                              >
                                <div
                                  role="listbox"
                                  tabIndex="-1"
                                  className="ts-dropdown-content"
                                  id="tomselect-1-ts-dropdown"
                                ></div>
                              </div>
                            </div>
                          </div>
                          <span className="invalid-feedback">
                            Please select a valid category.
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-4">
                          <div
                            className="tom-select-custom"
                            data-hs-validation-validate-className=""
                          >
                            <select
                              className="js-select form-select tomselected "
                              name="type"
                              autoComplete="off"
                              required
                              data-hs-tom-select-options='{"placeholder":"Select Type","searchInDropdown":false,"hideSearch":true}'
                              id="tomselect-2"
                              tabIndex="-1"
                            >
                              <option value="RealImages">Real Images</option>
                              <option value="ChatApps">Chat Apps</option>
                              <option value="Emailer">Emailer</option>
                            </select>
                            <div className="tom-select-custom">
                              <div
                                className="ts-dropdown single plugin-change_listener plugin-hs_smart_position"
                                style={{ display: "none" }}
                              >
                                <div
                                  role="listbox"
                                  tabIndex="-1"
                                  className="ts-dropdown-content"
                                  id="tomselect-2-ts-dropdown"
                                ></div>
                              </div>
                            </div>
                          </div>
                          <span className="invalid-feedback">
                            Please select a valid type.
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="mb-4">
                          <input
                            type="text"
                            className="form-control"
                            name="product_code"
                            id=""
                            placeholder="Product Code*"
                            aria-label="Product Code"
                            required
                          />
                          <span className="invalid-feedback">
                            Partcode cannot be blank.
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <textarea
                        className="form-control"
                        name="description"
                        id=""
                        placeholder="Description*"
                        aria-label="Description"
                        rows="4"
                      ></textarea>
                    </div>
                    <div
                      className="mb-4"
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                    >
                      <label className="form-label">Attach files</label>
                      <div
                        id="gallery_img_file"
                        className="js-dropzone dz-dropzone dz-dropzone-card dz-clickable"
                      >
                        <div className="dz-message">
                          <img
                            className="avatar avatar-xl avatar-4x3 mb-3"
                            src={assets}
                            alt=""
                            data-hs-theme-appearance="default"
                          />
                          <h5>Drag and drop your file here</h5>
                          <p className="mb-2">or</p>
                          <span className="btn btn-white btn-sm">
                            Browse files
                          </span>
                        </div>
                        {selectedImages.map((imageObj, index) => (
                          <div
                            key={index}
                            className="col h-100 mb-4 dz-image-preview"
                          >
                            <div className="dz-preview dz-file-preview">
                              <div className="d-flex justify-content-end dz-close-icon border-0">
                              <div className="dz-close-icon">
                                <button
                                  type="button"
                                  className="remove-image border-0 bg-light"
                                  onClick={(e) => removeImage(index, e)}
                                >
                                  <i className="las la-times"></i>
                                </button>
                              </div>
                              </div>
                              <div className="dz-details d-flex">
                                <div className="dz-img flex-shrink-0">
                                  
                                  <img
                                    className="img-fluid dz-img-inner"
                                    data-dz-thumbnail=""
                                    alt={`Selected Image ${index + 1}`}
                                    src={imageObj.imageURL}
                                  />
                                </div>
                                <div className="dz-file-wrapper flex-grow-1">
                                  <h6 className="dz-filename">
                                    <span className="dz-title" data-dz-name="">
                                      {imageObj.file.name}
                                    </span>
                                  </h6>
                                  <div className="dz-size" data-dz-size="">
                                    <strong>
                                      {(imageObj.file.size / 1024).toFixed(2)}
                                    </strong>{" "}
                                    KB
                                  </div>
                                </div>
                              </div>
                             
                              <div className="dz-progress progress">
                                <div
                                  className="dz-upload progress-bar bg-success"
                                  role="progressbar"
                                  style={{ width: `${uploadProgress}%` }}
                                  aria-valuenow={uploadProgress}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                  data-dz-uploadprogress=""
                                >
                                  {uploadProgress}%
                                </div>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="dz-success-mark">
                                  <span className="bi-check-lg"></span>
                                </div>
                                <div className="dz-error-mark">
                                  <span className="bi-x-lg"></span>
                                </div>
                                <div className="dz-error-message">
                                  <small data-dz-errormessage=""></small>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <input
                        type="file"
                        name="images"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        multiple
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="d-flex align-items-center mt-5">
                      <div className="ms-auto">
                        <button
                          type="button"
                          className="btn btn-primary upload-gallery-btn"
                          onClick={handleSubmit}
                          disabled={loading}
                        >
                          {loading ? "Submitting..." : "Submit"}{" "}
                          <i className="bi-chevron-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="createProjectStepSuccessMessage"
                  style={{ display: "none" }}
                >
                  <div className="text-center">
                    <img
                      className="img-fluid mb-3"
                      src="assets/svg/illustrations/oc-hi-five.svg"
                      alt=""
                      data-hs-theme-appearance="default"
                      style={{ maxWidth: "15rem" }}
                    />
                    <div className="mb-4">
                      <h2>Successful!</h2>
                      <p>Photos have been successfully added.</p>
                    </div>
                    <div className="d-flex justify-content-center gap-3">
                      <a
                        className="btn btn-primary"
                        href="javascript:;"
                        data-bs-toggle="modal"
                        data-bs-target="#addGalleryModal"
                      >
                        <i className="bi-images"></i> Add new Photos
                      </a>
                    </div>
                  </div>
                </div>
                {errorMessage && (
                  <div className="alert alert-danger mt-3">{errorMessage}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddImage;
