// import React, { useRef } from 'react';
import '../../../assets/Admin/vendor.min.css'
import '../../../assets/Admin//theme.minc619.css'
import '../../../assets/Admin//custom.css'
import '../../../assets/Admin//theme.min.css'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { number } from 'prop-types';


const AdminProfilePage = () => {

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const [avatarPreview, setAvatarPreview] = useState("http://192.168.1.161/change_pp/assets/img/img1.jpg");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if(file){
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const onSubmit = (data) => {
    console.log(data)
  }

  const onPasswordChange = (data) => {
    console.log(data)
  }

  return (
    <>
        <main id="content" role="main" className="main">
    {/* Content */}
    <div className="content container-fluid">
                      
      <div className="row">
        <div className="col-lg-3">
          {/* Navbar */}
          <div className="navbar-expand-lg navbar-vertical mb-3 mb-lg-5">
            <div className="d-grid">
              <button type="button" className="navbar-toggler btn btn-white mb-3" data-bs-toggle="collapse" data-bs-target="#navbarVerticalNavMenu" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navbarVerticalNavMenu">
                <span className="d-flex justify-content-between align-items-center">
                  <span className="text-dark">Menu</span>
                  <span className="navbar-toggler-default">
                    <i className="bi-list" />
                  </span>
                  <span className="navbar-toggler-toggled">
                    <i className="bi-x" />
                  </span>
                </span>
              </button>
            </div>
            {/* Navbar Collapse */}
            <div id="navbarVerticalNavMenu" className="collapse navbar-collapse">
              <ul id="navbarSettings" className="js-sticky-block js-scrollspy card card-navbar-nav nav nav-tabs nav-lg nav-vertical" data-hs-sticky-block-options={`{
                "parentSelector": "#navbarVerticalNavMenu",
                "targetSelector": "#header",
                "breakpoint": "lg",
                "startPoint": "#navbarVerticalNavMenu",
                "endPoint": "#stickyBlockEndPoint",
                "stickyOffsetTop": 20
              }`}>
                <li className="nav-item">
                  <a className="nav-link active" href="#basicInfo">
                    <i className="bi-person nav-icon" /> Basic information
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#passwordSection">
                    <i className="bi-key nav-icon" /> Password
                  </a>
                </li>
                {/* <li class="nav-item">
                  <a class="nav-link" href="#notificationsSection">
                    <i class="bi-bell nav-icon"></i> Notifications
                  </a>
                </li> */}
                {/* <li class="nav-item">
                  <a class="nav-link" href="#socialAccountsSection">
                    <i class="bi-instagram nav-icon"></i> Social accounts
                  </a>
                </li> */}
              </ul>
            </div>
            {/* End Navbar Collapse */}
          </div>
          {/* End Navbar */}
        </div>
        <div className="col-lg-9">
          <div className="d-grid gap-3 gap-lg-5">
            <div className="row align-items-center">
              <div className="col-5 col-sm-4 mb-3 mb-lg-0">
              <label className="avatar avatar-xl avatar-circle avatar-uploader" htmlFor="editAvatarUploaderModal">
                <img id="editAvatarImgModal" className="avatar-img"   src={avatarPreview} alt="" />
                <input  type="file"
                className="js-file-attach avatar-uploader-input"
                id="editAvatarUploaderModal"
                data-hs-file-attach-options={`{
                  "textTarget": ".new_profile_pic",
                  "mode": "image",
                  "targetAttr": "src",
                  "allowTypes": [".png", ".jpeg", ".jpg"]
                }`}
                onChange={handleAvatarChange}
                 />
                <span className="avatar-uploader-trigger">
                  <i className="bi-pencil-fill avatar-uploader-icon shadow-sm" />
                </span>
              </label>
              </div>
              <div className="col-7 col-sm-5 offset-lg-3">
                <div className="card card-body">
                  <h5 className="d-none d-lg-block">Complete your profile</h5>
                  {/* Progress */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="progress flex-grow-1">
                      <div className="progress-bar bg-success" role="progressbar" style={{width: '82%'}} aria-valuenow={82} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    <span className="ms-4">82%</span>
                  </div>
                  {/* End Progress */}
                </div>
              </div>
            </div>
            <div className="card" id="basicInfo">
              <div className="card-header">
                <h2 className="card-title h4">Basic information</h2>
              </div>
              <div className="card-body">
                <form className="user_profile_form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="row mb-4">
                    <label htmlFor="firstNameLabel" className="col-sm-3 col-form-label form-label">Full name <span className="text-danger">*</span></label>
                    <div className="col-sm-9">
                      <div className="input-group input-group-sm-vertical">
                        <input type="text" className="form-control" name="user_fname" id="firstNameLabel" required placeholder="Your first name" aria-label="Your first name" {
                          ...register('user_fname',{
                            required:'true'
                          })
                        } />
                        <input type="text" className="form-control" name="user_lname" id="lastNameLabel" required placeholder="Your last name" aria-label="Your last name" 
                        {
                          ...register('user_lname',{
                            required:true
                          })
                        }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <label htmlFor="emailLabel" className="col-sm-3 col-form-label form-label">Email <span className="text-danger">*</span></label>
                    <div className="col-sm-9">
                      <input type="email" className="form-control" name="email" id="emailLabel" required placeholder="Email" aria-label="Email" defaultValue="sales@change-networks.com" readOnly />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <label htmlFor="phoneLabel" className="col-sm-3 col-form-label form-label">WhatsApp Mobile <span className="text-danger">*</span></label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control intlTelInput" id="phoneLabel"  {
                        ...register('wa_number',  {
                          required: "This is required.",
                          value:10,
                          pattern:number
                        })
                      } />
                      {
                        errors.wa_number && 
                        <span className='text-danger'>
                          This is required
                        </span>
                      }
                    </div>
                  </div>
                  <div className="row mb-4">
                    <label htmlFor="phoneLabel" className="col-sm-3 col-form-label form-label">Mobile <span className="form-label-secondary">(Optional)</span></label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control intlTelInput" name="mob_number" id="phoneLabel" placeholder 
                      {
                        ...register('mob_number',{
                          required:true
                        })
                      }
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <label htmlFor="departmentLabel" className="col-sm-3 col-form-label form-label">Department</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="department" id="departmentLabel" placeholder="Your department" aria-label="Your department" defaultValue="Sales" readOnly />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <label htmlFor="designationLabel" className="col-sm-3 col-form-label form-label">Designation</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="designation" id="designationLabel" placeholder="Your designation" aria-label="Your designation" defaultValue="Business Manager" readOnly />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <label htmlFor="user_type" className="col-sm-3 col-form-label form-label">User Type</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="user_type" id="user_type" placeholder="Your user type" aria-label="Your user type" defaultValue="Admin" readOnly />
                    </div>
                  </div>
                
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary user_profile_update_btn">Save changes</button>
                  </div>
                </form>
              </div>
            </div>
            {/* Card */}
            <div id="passwordSection" className="card">
              <div className="card-header">
                <h4 className="card-title">Change your password</h4>
              </div>
              <div className="card-body">
              <form id="changePasswordForm" className="change_password_form" onSubmit={handleSubmit(onPasswordChange)}>
      {/* Current Password */}
      <div className="row mb-4">
        <label htmlFor="currentPasswordLabel" className="col-sm-3 col-form-label form-label">Current password</label>
        <div className="col-sm-9">
          <input 
            type="password" 
            className={`form-control ${errors.current_password ? 'is-invalid' : ''}`} 
            name="current_password" 
            id="currentPasswordLabel" 
            placeholder="Enter current password" 
            aria-label="Enter current password" 
            {...register('current_password', { required: 'Current password is required' })}
          />
          {errors.current_password && (
            <div className='invalid-feedback'>
              {errors.current_password.message}
            </div>
          )}
        </div>
      </div>

      {/* New Password */}
      <div className="row mb-4">
        <label htmlFor="newPassword" className="col-sm-3 col-form-label form-label">New password</label>
        <div className="col-sm-9">
          <input 
            type="password" 
            className="form-control" 
            name="new_password" 
            id="newPassword" 
            placeholder="Enter new password" 
            aria-label="Enter new password" 
            {...register('new_password', { required: 'New password is required' })}
          />
          {errors.new_password && (
            <div className='invalid-feedback'>
              {errors.new_password.message}
            </div>
          )}
        </div>
      </div>

      {/* Confirm New Password */}
      <div className="row mb-4">
        <label htmlFor="confirmNewPasswordLabel" className="col-sm-3 col-form-label form-label">Confirm new password</label>
        <div className="col-sm-9">
          <input 
            type="password" 
            className="form-control" 
            name="confirm_password" 
            id="confirmNewPasswordLabel" 
            placeholder="Confirm your new password" 
            aria-label="Confirm your new password" 
            {...register('confirm_password', { 
              required: 'Please confirm your new password',
              validate: value => value === watch('new_password') || 'The passwords do not match' 
            })}
          />
          {errors.confirm_password && (
            <div className='invalid-feedback'>
              {errors.confirm_password.message}
            </div>
          )}
        </div>
      </div>

      {/* Password requirements */}
      <div className="row mb-4">
        <div className="col-sm-9 offset-sm-3">
          <h5>Password requirements:</h5>
          <p className="fs-6 mb-2">Ensure that these requirements are met:</p>
          <ul className="fs-6">
            <li>Minimum 8 characters long - the more, the better</li>
            <li>At least one lowercase character</li>
            <li>At least one uppercase character</li>
            <li>At least one number, symbol, or whitespace character</li>
          </ul>
        </div>
      </div>

      {/* Submit Button */}
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary change_password_btn">Save Changes</button>
      </div>
    </form>
              </div>
            </div>
          </div>
              <div id="stickyBlockEndPoint" />
        </div>
      </div>
     </div>
  </main>
</>


  );
};

export default AdminProfilePage;
