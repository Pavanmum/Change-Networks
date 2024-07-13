import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { userAdminAsync } from '../../../store/slices/Admin/userAdminSlice';
import '../../../assets/Admin/vendor.min.css';
import '../../../assets/Admin/theme.minc619.css';
import '../../../assets/Admin/theme.min.css';
import Modals from '../../../components/ConfirmModal/modal';
import { Modal } from 'react-bootstrap';

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAdmin);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);



  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = (id) => {
    // dispatch(DeleteJobAsync(id))
  };

  // const toggleDropdown = (id) => {
  //   setOpenDropdown(openDropdown === id ? null : id);
  // };

  const onOpenModal = (id) => () => {
    setOpen(true);
  };

  const closeEditModal = () => {
    setOpen(false);
  };


  useEffect(() => {
    dispatch(userAdminAsync());
  }, [dispatch]);


  return (
    <>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4" id="toggleView">
        {user?.user?.map((item) => (
          <div className="col mb-3 mb-lg-5" data-user-id={item.id} key={item.id}>
            <div className="card h-100">
              <div className=" d-flex justify-content-end ">
                {/* <div className="card-pinned-top-end"> */}
                <div className="btn-group">
            <button
              type="button"
              className="btn btn-icon btn-sm"
              id="statusDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                className="bi-three-dots-vertical"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Status"
              />
            </button>
            <div
              className="dropdown-menu dropdown-menu-end mt-1"
              aria-labelledby="statusDropdown"
            >
              <a
                className="dropdown-item pointer candidate-status-change"
                data-id={item._id}
                onClick={onOpenModal(item._id)}
                data-status={0}
              >
                <i className="bi-person-badge dropdown-item-icon" /> Edit
              </a>
              <a
                className="dropdown-item pointer candidate-status-change"
                data-id={item._id}
                data-status={1}
              >
                <i className="bi-clipboard-check dropdown-item-icon" /> Short
                Listed
              </a>
              <a
                className="dropdown-item pointer candidate-status-change"
                data-id={item._id}
                data-status={2}
              >
                <i className="bi-hourglass dropdown-item-icon" /> On Hold
              </a>
              <a
                className="dropdown-item pointer candidate-status-change"
                data-id={item._id}
                data-status={3}
              >
                <i className="bi-trash3 dropdown-item-icon" /> Rejected
              </a>
            </div>
          </div>
             
              </div>
              <div className="card-body text-center">
                <div className="avatar avatar-xl avatar-soft-primary avatar-circle avatar-centered mb-3">
                  <span className="avatar-initials">{item?.user_fname?.charAt(0)}</span>
                  <span className="avatar-status avatar-sm-status avatar-status-success" />
                </div>
                <h3 className="mb-1">
                  <a className="text-dark" href="#">{item.user_fname} {item.user_lname}</a>
                </h3>
                <div>
                  <i className="bi-building me-1" />
                  <span>{item.designation}</span>
                </div>
              </div>
              <div className="card-footer">
                <div className="row justify-content-between align-items-center">
                  <div className="col-auto py-1">
                    <p className="fs-6 text-body mb-0">Status</p>
                  </div>
                  <div className="col-auto py-1">
                    <div className="form-check form-check-switch">
                      <input className="form-check-input" type="checkbox" name="status" defaultValue={1} id={`status${item._id}`} defaultChecked />
                      <label className="btn btn-sm" onClick={openModal} style={{ background: 'none' }}>
                        {item.unsubscribe === "0" ? (
                          <span className="form-check-active text-success">
                            <i className="bi-check-lg me-2" /> Activated
                          </span>
                        ) : (
                          <span className="form-check-default text-danger">
                            <i className="bi-person-plus-fill me-2" /> Disabled
                          </span>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <Modals heading={"Change Status ?"} body={"Are you sure, you want to change status!"} show={isModalOpen} handleClose={closeModal} handleConfirm={handleConfirm} />
      <Modal style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      
      }} show={open} > 
        <Modal.Header closeButton onClick={closeEditModal}>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <div className="modal-body" >
    {/* Nav Scroller */}
    <div className="js-nav-scroller hs-nav-scroller-horizontal">
      <span className="hs-nav-scroller-arrow-prev" style={{ display: "none" }}>
        <a className="hs-nav-scroller-arrow-link" href="javascript:;">
          <i className="bi-chevron-left" />
        </a>
      </span>
      <span className="hs-nav-scroller-arrow-next" style={{ display: "none" }}>
        <a className="hs-nav-scroller-arrow-link" href="javascript:;">
          <i className="bi-chevron-right" />
        </a>
      </span>
      {/* Nav */}
      <ul
        className="js-tabs-to-dropdown nav nav-segment nav-fill mb-5"
        id="editUserModalTab"
        role="tablist"
      >
        <li className="nav-item">
          <a
            className="nav-link active"
            href="#profile"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            role="tab"
            aria-selected="true"
          >
            <i className="bi-person me-1" /> Profile
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="#change-password"
            id="change-password-tab"
            data-bs-toggle="tab"
            data-bs-target="#change-password"
            role="tab"
            aria-selected="false"
          >
            <i className="bi-shield-lock me-1" /> Change password
          </a>
        </li>
        {/* <li class="nav-item">
        <a class="nav-link" href="#notifications" id="notifications-tab" data-bs-toggle="tab" data-bs-target="#notifications" role="tab" aria-selected="false">
          <i class="bi-bell me-1"></i> Notifications
        </a>
      </li> */}
        {/* <li class="nav-item">
        <a class="nav-link" href="#access" id="access-tab" data-bs-toggle="tab" data-bs-target="#access" role="tab" aria-selected="false">
          <i class="bi-building me-1"></i> Access Setting
        </a>
      </li> */}
      </ul>
      {/* End Nav */}
    </div>
    {/* End Nav Scroller */}
    {/* Tab Content */}
    <div className="tab-content" id="editUserModalTabContent">
      <div
        className="tab-pane fade show active"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <form className="edit_user_form">
          <input type="hidden" name="user_id" defaultValue={30} />
          {/* Profile Cover */}
          <div className="profile-cover" style={{ height: "6rem" }}>
            <div
              className="profile-cover-img-wrapper"
              style={{ height: "7rem" }}
            >
              <img
                className="profile-cover-img"
                src="http://192.168.1.161/change_pp/assets/img/profile_banner_img1.jpg"
                alt=""
                style={{ height: "7rem" }}
              />
            </div>
          </div>
          {/* End Profile Cover */}
          {/* Avatar */}
          <label
            className="avatar avatar-xxl avatar-circle avatar-uploader profile-cover-avatar mb-5"
            htmlFor="editAvatarUploaderModal1"
          >
            <img
              id="editAvatarImgModal1"
              className="avatar-img edit_profile_pic"
              src="http://192.168.1.161/change_pp/assets/img/img1.jpg"
              alt=""
            />
            <input
              type="file"
              className="js-file-attach-edit avatar-uploader-input"
              id="editAvatarUploaderModal1"
              data-hs-file-attach-options='{
          "textTarget": ".edit_profile_pic",
          "mode": "image",
          "targetAttr": "src",
          "allowTypes": [".png", ".jpeg", ".jpg"]
       }'
            />
            <span className="avatar-uploader-trigger">
              <i className="bi-pencil-fill avatar-uploader-icon shadow-sm" />
            </span>
          </label>
          {/* End Avatar */}
          {/* Form */}
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="user_fname"
                placeholder="Your first name*"
                defaultValue="Akash"
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="user_lname"
                placeholder="Your last name*"
                // defaultValue="Ghosh"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email*"
                // defaultValue="akashg@change-networks.com"
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="wa_number"
                placeholder="WhatsApp Mobile*"
                // defaultValue={+971582838485}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control intlTelInput"
                name="mob_number"
                placeholder="Mobile*"
                // defaultValue={+971582838485}
              />
            </div>
            <div className="col">
              {/* <input type="text" class="form-control intlTelInput" name="department" placeholder="Department"> */}
              <div
                className="tom-select-custom"
                data-hs-validation-validate-class=""
              >
                <select
                  className="js-selects form-select tomselected ts-hidden-accessible"
                  name="department"
                  autoComplete="off"
                  required=""
                  data-hs-tom-select-options='{
                    "allowEmptyOption": true,
                    "searchInDropdown": false,
                    "placeholder": "Select Department",
                    "hideSearch": true
                  }'
                  id="tomselect-5"
                  tabIndex={-1}
                >
                  <option value="">Department</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Technical">Technical</option>
                  <option value="Accounts">Accounts</option>
                  <option value="HR">HR</option>
                  <option value="Others">Others</option>
                  <option value="Sales" selected="">
                    Sales
                  </option>
                </select>
                <div className="ts-wrapper js-selects form-select single plugin-change_listener plugin-hs_smart_position input-hidden required full has-items">
                  <div className="ts-control">
                    <div data-value="Sales" className="item" data-ts-item="">
                      Sales
                    </div>
                  </div>
                  <div className="tom-select-custom">
                    <div
                      className="ts-dropdown single plugin-change_listener plugin-hs_smart_position"
                      style={{
                        display: "none",
                        visibility: "visible",
                        opacity: 1
                      }}
                    >
                      <div
                        role="listbox"
                        tabIndex={-1}
                        className="ts-dropdown-content"
                        id="tomselect-5-ts-dropdown"
                      >
                        <div
                          data-selectable=""
                          data-value=""
                          className="option"
                          role="option"
                          id="tomselect-5-opt-1"
                        >
                          Department
                        </div>
                        <div
                          data-selectable=""
                          data-value="Sales"
                          className="option selected active"
                          role="option"
                          id="tomselect-5-opt-2"
                          aria-selected="true"
                        >
                          Sales
                        </div>
                        <div
                          data-selectable=""
                          data-value="Logistics"
                          className="option"
                          role="option"
                          id="tomselect-5-opt-3"
                        >
                          Logistics
                        </div>
                        <div
                          data-selectable=""
                          data-value="Marketing"
                          className="option"
                          role="option"
                          id="tomselect-5-opt-4"
                        >
                          Marketing
                        </div>
                        <div
                          data-selectable=""
                          data-value="Technical"
                          className="option"
                          role="option"
                          id="tomselect-5-opt-5"
                        >
                          Technical
                        </div>
                        <div
                          data-selectable=""
                          data-value="Accounts"
                          className="option"
                          role="option"
                          id="tomselect-5-opt-6"
                        >
                          Accounts
                        </div>
                        <div
                          data-selectable=""
                          data-value="HR"
                          className="option"
                          role="option"
                          id="tomselect-5-opt-7"
                        >
                          HR
                        </div>
                        <div
                          data-selectable=""
                          data-value="Others"
                          className="option"
                          role="option"
                          id="tomselect-5-opt-8"
                        >
                          Others
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span className="invalid-feedback">
                Please select a valid department.
              </span>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="designation"
                placeholder="Designation"
                defaultValue="Asst. Account Manager"
              />
            </div>
            <div className="col">
              {/* <input type="text" class="form-control" name="user_type" placeholder="Your user type"> */}
              <div
                className="tom-select-custom"
                data-hs-validation-validate-class=""
              >
                <select
                  className="js-selects form-select tomselected ts-hidden-accessible"
                  name="user_type"
                  autoComplete="off"
                  required=""
                  data-hs-tom-select-options='{
                    "allowEmptyOption": true,
                    "searchInDropdown": false,
                    "placeholder": "Select user type",
                    "hideSearch": true
                  }'
                  id="tomselect-6"
                  tabIndex={-1}
                >
                  <option value="">User Type</option>
                  <option value="Team Manager">Team Manager</option>
                  <option value="Team member" selected="">
                    Team member
                  </option>
                </select>
                <div className="ts-wrapper js-selects form-select single plugin-change_listener plugin-hs_smart_position input-hidden required full has-items">
                  <div className="ts-control">
                    <div
                      data-value="Team member"
                      className="item"
                      data-ts-item=""
                    >
                      Team member
                    </div>
                  </div>
                  <div className="tom-select-custom">
                    <div
                      className="ts-dropdown single plugin-change_listener plugin-hs_smart_position"
                      style={{
                        display: "none",
                        visibility: "visible",
                        opacity: 1
                      }}
                    >
                      <div
                        role="listbox"
                        tabIndex={-1}
                        className="ts-dropdown-content"
                        id="tomselect-6-ts-dropdown"
                      >
                        <div
                          data-selectable=""
                          data-value=""
                          className="option"
                          role="option"
                          id="tomselect-6-opt-1"
                        >
                          User Type
                        </div>
                        <div
                          data-selectable=""
                          data-value="Team Manager"
                          className="option"
                          role="option"
                          id="tomselect-6-opt-2"
                        >
                          Team Manager
                        </div>
                        <div
                          data-selectable=""
                          data-value="Team member"
                          className="option selected active"
                          role="option"
                          id="tomselect-6-opt-3"
                          aria-selected="true"
                        >
                          Team member
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span className="invalid-feedback">
                Please select a valid department.
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <div className="d-flex gap-3">
              <button
                type="button"
                className="btn btn-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary user_profile_update_btn"
              >
                Save changes
              </button>
            </div>
          </div>
        </form>
      </div>
      <div
        className="tab-pane fade"
        id="change-password"
        role="tabpanel"
        aria-labelledby="change-password-tab"
      >
        <form className="generate_password">
          <input type="hidden" name="user_id" defaultValue={30} />
          {/* Form */}
          <div className="row mb-4">
            <label
              htmlFor="newPass"
              className="col-sm-3 col-form-label form-label"
            >
              New password
            </label>
            <div className="col-sm-9">
              <div
                className="input-group input-group-merge"
                data-hs-validation-validate-class=""
              >
                <input
                  type="password"
                  className="js-toggle-password form-control form-control-lg"
                  name="new_password"
                  id="signupSrPassword"
                  placeholder="8+ characters required"
                  aria-label="8+ characters required"
                  required=""
                  minLength={8}
                  data-hs-toggle-password-options='{
                        "target": ".js-toggle-password-target-1",
                        "defaultClass": "bi-eye-slash",
                        "showClass": "bi-eye",
                        "classChangeTarget": ".js-toggle-password-show-icon-1"
                      }'
                />
                <a
                  className="js-toggle-password-target-1 input-group-append input-group-text"
                  href="javascript:;"
                >
                  <i className="js-toggle-password-show-icon-1 bi-eye" />
                </a>
              </div>
              <span className="invalid-feedback">
                Your password is invalid. Please try again.
              </span>
            </div>
          </div>
          {/* End Form */}
          {/* Form */}
          <div className="row mb-4">
            <label
              htmlFor="ConfirmNewPassword"
              className="col-sm-3 col-form-label form-label"
            >
              Confirm new password
            </label>
            <div className="col-sm-9">
              <div
                className="input-group input-group-merge"
                data-hs-validation-validate-class=""
              >
                <input
                  type="password"
                  className="js-toggle-password form-control form-control-lg"
                  name="confirm_password"
                  id="signupSrConfirmPassword"
                  placeholder="8+ characters required"
                  aria-label="8+ characters required"
                  required=""
                  minLength={8}
                  data-hs-toggle-password-options='{
                      "target": ".js-toggle-password-target-2",
                      "defaultClass": "bi-eye-slash",
                      "showClass": "bi-eye",
                      "classChangeTarget": ".js-toggle-password-show-icon-2"
                    }'
                />
                <a
                  className="js-toggle-password-target-2 input-group-append input-group-text"
                  href="javascript:;"
                >
                  <i className="js-toggle-password-show-icon-2 bi-eye" />
                </a>
              </div>
              <span className="invalid-feedback">
                Password does not match the confirm password.
              </span>
            </div>
          </div>
          {/* End Form */}
          {/* Form */}
          {/* <div class="row mb-4">
          <div class="col-sm-9 offset-sm-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="shpwPassCheckbox">
              <label class="form-check-label" for="shpwPassCheckbox">
                Show password
              </label>
            </div>
          </div>
        </div> */}
          {/* End Form */}
          <div className="d-flex justify-content-end">
            <div className="d-flex gap-3">
              <button
                type="button"
                className="btn btn-white "
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary change_password_btn"
              >
                Save changes
              </button>
            </div>
          </div>
        </form>
      </div>
      <div
        className="tab-pane fade"
        id="notifications"
        role="tabpanel"
        aria-labelledby="notifications-tab"
      >
        {/* Table */}
        <div className="table-responsive datatable-custom">
          <table className="table table-thead-bordered table-nowrap table-align-middle table-first-col-px-0">
            <thead className="thead-light">
              <tr>
                <th>Type</th>
                <th className="text-center">
                  <div className="mb-1">
                    <img
                      className="avatar avatar-xs"
                      src="http://192.168.1.161/change_pp/assets/svg/illustrations/oc-email-at.svg"
                      alt=""
                      data-hs-theme-appearance="default"
                    />
                  </div>
                  Email
                </th>
                <th className="text-center">
                  <div className="mb-1">
                    <img
                      className="avatar avatar-xs"
                      src="http://192.168.1.161/change_pp/assets/svg/illustrations/oc-globe.svg"
                      alt=""
                      data-hs-theme-appearance="default"
                    />
                  </div>
                  Browser
                </th>
                <th className="text-center">
                  <div className="mb-1">
                    <img
                      className="avatar avatar-xs"
                      src="http://192.168.1.161/change_pp/assets/svg/illustrations/oc-phone.svg"
                      alt=""
                      data-hs-theme-appearance="default"
                    />
                  </div>
                  App
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>New for you</td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="editUserModalAlertsCheckbox1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="editUserModalAlertsCheckbox1"
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="editUserModalAlertsCheckbox2"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="editUserModalAlertsCheckbox2"
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="editUserModalAlertsCheckbox3"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="editUserModalAlertsCheckbox3"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  Account activity{" "}
                  <i
                    className="bi-question-circle text-body ms-1"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Get important notifications about you or activity you've missed"
                  />
                </td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="editUserModalAlertsCheckbox4"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="editUserModalAlertsCheckbox4"
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="editUserModalAlertsCheckbox5"
                      defaultChecked=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="editUserModalAlertsCheckbox5"
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="editUserModalAlertsCheckbox6"
                      defaultChecked=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="editUserModalAlertsCheckbox6"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>A new browser used to sign in</td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="editUserModalAlertsCheckbox7"
                      defaultChecked=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="editUserModalAlertsCheckbox7"
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="editUserModalAlertsCheckbox8"
                      defaultChecked=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="editUserModalAlertsCheckbox8"
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="editUserModalAlertsCheckbox9"
                      defaultChecked=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="editUserModalAlertsCheckbox9"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>A new device is linked</td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="editUserModalAlertsCheckbox10"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="editUserModalAlertsCheckbox10"
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="editUserModalAlertsCheckbox11"
                      defaultChecked=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="editUserModalAlertsCheckbox11"
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="editUserModalAlertsCheckbox12"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="editUserModalAlertsCheckbox12"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  A new device connected{" "}
                  <i
                    className="bi-question-circle text-body ms-1"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Email me when a new device connected"
                  />
                </td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="editUserModalAlertsCheckbox13"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="editUserModalAlertsCheckbox13"
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="editUserModalAlertsCheckbox14"
                      defaultChecked=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="editUserModalAlertsCheckbox14"
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="editUserModalAlertsCheckbox15"
                      defaultChecked=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="editUserModalAlertsCheckbox15"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* End Table */}
        <hr />
        <div className="row">
          <div className="col-sm">
            {/* Form */}
            <div className="mb-4">
              <span className="d-block mb-2">
                When should we send notifications?
              </span>
              {/* Select */}
              <div className="tom-select-custom">
                <select
                  className="js-select form-select"
                  autoComplete="off"
                  data-hs-tom-select-options='{
                          "searchInDropdown": false,
                          "width": "15rem",
                          "hideSearch": true
                        }'
                >
                  <option value="whenToSendNotification1">Always</option>
                  <option value="whenToSendNotification2">
                    Only when I'm online
                  </option>
                </select>
              </div>
              {/* End Select */}
            </div>
            {/* End Form */}
          </div>
          <div className="col-sm">
            {/* Form */}
            <div className="mb-4">
              <span className="d-block mb-2">
                Send a daily summary ("Daily Digest") of task activity.
              </span>
              <div className="row">
                <div className="col-auto mb-2">
                  {/* Select */}
                  <div className="tom-select-custom">
                    <select
                      className="js-select form-select"
                      autoComplete="off"
                      data-hs-tom-select-options='{
                            "searchInDropdown": false,
                            "hideSearch": true
                          }'
                    >
                      <option value="EveryDay">Every day</option>
                      <option value="weekdays" selected="">
                        Weekdays
                      </option>
                      <option value="Never">Never</option>
                    </select>
                  </div>
                  {/* End Select */}
                </div>
                {/* End Col */}
                <div className="col-auto mb-2">
                  {/* Select */}
                  <div className="tom-select-custom tom-select-custom-end">
                    <select
                      className="js-select form-select"
                      autoComplete="off"
                      data-hs-tom-select-options='{
                            "searchInDropdown": false,
                            "hideSearch": true,
                            "dropdownWidth": "11rem",
                            "dropup": true
                          }'
                    >
                      <option value={0}>at 12 AM</option>
                      <option value={1}>at 1 AM</option>
                      <option value={2}>at 2 AM</option>
                      <option value={3}>at 3 AM</option>
                      <option value={4}>at 4 AM</option>
                      <option value={5}>at 5 AM</option>
                      <option value={6}>at 6 AM</option>
                      <option value={7}>at 7 AM</option>
                      <option value={8}>at 8 AM</option>
                      <option value={9} selected="">
                        at 9 AM
                      </option>
                      <option value={10}>at 10 AM</option>
                      <option value={11}>at 11 AM</option>
                      <option value={12}>at 12 PM</option>
                      <option value={13}>at 1 PM</option>
                      <option value={14}>at 2 PM</option>
                      <option value={15}>at 3 PM</option>
                      <option value={16}>at 4 PM</option>
                      <option value={17}>at 5 PM</option>
                      <option value={18}>at 6 PM</option>
                      <option value={19}>at 7 PM</option>
                      <option value={20}>at 8 PM</option>
                      <option value={21}>at 9 PM</option>
                      <option value={22}>at 10 PM</option>
                      <option value={23}>at 11 PM</option>
                    </select>
                  </div>
                  {/* End Select */}
                </div>
                {/* End Col */}
              </div>
              {/* End Row */}
            </div>
            {/* End Form */}
          </div>
          {/* End Col */}
        </div>
        {/* End Row */}
        <p>
          In order to cut back on noise, email notifications are grouped
          together and only sent when you're idle or offline.
        </p>
        <div className="d-flex justify-content-end">
          <div className="d-flex gap-3">
            <button
              type="button"
              className="btn btn-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
      <div
        className="tab-pane fade"
        id="access"
        role="tabpanel"
        aria-labelledby="access-tab"
      >
        {/* Table */}
        <div className="table-responsive datatable-custom">
          <table className="table table-thead-bordered table-nowrap table-align-middle table-first-col-px-0">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th className="text-center">Super Admin</th>
                <th className="text-center">User</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gallery</td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="galleryChk1"
                      defaultChecked=""
                      disabled=""
                    />
                    <label className="form-check-label" htmlFor="galleryChk1" />
                  </div>
                </td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="galleryChk2"
                    />
                    <label className="form-check-label" htmlFor="galleryChk2" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Promotion</td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="promotionChk1"
                      defaultChecked=""
                      disabled=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="promotionChk1"
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="promotionChk2"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="promotionChk2"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Stock List</td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="stocklistChk1"
                      defaultChecked=""
                      disabled=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="stocklistChk1"
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="stocklistChk2"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="stocklistChk2"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Customer List</td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="broadcastChk1"
                      defaultChecked=""
                      disabled=""
                    />
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="customerlistChk1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="customerlistChk1"
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="customerlistChk2"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="customerlistChk2"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Sales Matrix</td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="broadcastChk1"
                      defaultChecked=""
                      disabled=""
                    />
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="salesmatrixChk1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="salesmatrixChk1"
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="salesmatrixChk2"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="salesmatrixChk2"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Broadcast</td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="broadcastChk1"
                      defaultChecked=""
                      disabled=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="broadcastChk1"
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="form-check form-check-inline me-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="broadcastChk2"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="broadcastChk2"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end">
          <div className="d-flex gap-3">
            <button
              type="button"
              className="btn btn-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
    {/* End Tab Content */}
  </div>
  {/* End Modal Body */}
  </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default AdminUsers;
