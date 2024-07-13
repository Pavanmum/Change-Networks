import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { set, useForm } from 'react-hook-form';
import '../../assets/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAdminAsync, userAdminAsync } from '../../store/slices/Admin/userAdminSlice';
import { toast } from 'react-toastify';

const User = () => {
  const [show, setShow] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("http://192.168.1.161/change_pp/assets/img/img1.jpg");
  const location = useLocation();
  const [view, setView] = useState(false);
  const handleOpen = () => {
    setView(!view);
  } 
  const dispatch = useDispatch();

  const { register, handleSubmit,reset, formState: { errors }, watch } = useForm();
  const {error,success} = useSelector((state) => state.userAdmin); // Ensure correct slice name

  // const status = useSelector((state) => state.userAdminSlice.status);
  // console.log(success, error);

  const onSubmit = data => {
    dispatch(addUserAdminAsync(data));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (success === 'success') {
      handleClose();
      reset();
      setAvatarPreview("http://192.168.1.161/change_pp/assets/img/img1.jpg");
      dispatch(userAdminAsync());
      toast.success('User added successfully');
    }

    if (success === 'failed') {
      toast.error(error.error);
    }
  }, [success, error]);

  return (
    <>
      <main id="content" role="main" className="main">
        <div className="js-nav-scroller hs-nav-scroller-horizontal mb-5 d-flex justify-content-between">
          <ul className="nav nav-tabs align-items-center">
            <li className="nav-item">
              <Link className="nav-link pt-0" to="/change/user">Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link pt-0" to="/change/user/users">Users</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link pt-0" to="/change/user/access_setting">Access Setting</Link>
            </li>
          </ul>
          {location.pathname === '/change/user/users' && (
            <div style={{ padding: "0.6rem" }}>
              <Button variant="outline-primary" onClick={handleShow}>
                Add user
              </Button>
            </div>
          )}
        </div>
        <Outlet />
      </main>

      <Modal show={show} onHide={handleClose} centered className="custom-modal-width">
        <Modal.Header closeButton>
          <Modal.Title>Add user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="new_user_form" onSubmit={handleSubmit(onSubmit)}>
            {/* Profile Cover */}
            <div className="profile-cover" style={{ height: '6rem' }}>
              <div className="profile-cover-img-wrapper" style={{ height: '7rem' }}>
                <img className="profile-cover-img" src="http://192.168.1.161/change_pp/assets/img/profile_banner_img1.jpg" alt style={{ height: '7rem' }} />
              </div>
            </div>
            {/* End Profile Cover */}
            {/* Avatar */}
            <label className="avatar avatar-xxl avatar-circle avatar-uploader profile-cover-avatar mb-5" htmlFor="editAvatarUploaderModal">
              <img id="editAvatarImgModal" className="avatar-img new_profile_pic" src={avatarPreview} alt="" />
              <input
                type="file"
                className="js-file-attach avatar-uploader-input"
                id="editAvatarUploaderModal"
                {...register('user_profile_pic', { onChange: handleAvatarChange })}
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
                  placeholder="Your first name*"
                  {...register('user_fname', { required: true })}
                />
                {errors.user_fname && <span className="text-danger">First name is required</span>}
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your last name*"
                  {...register('user_lname', { required: true })}
                />
                {errors.user_lname && <span className="text-danger">Last name is required</span>}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email*"
                  {...register('email', { required: true })}
                />
                {errors.email && <span className="text-danger">Email is required</span>}
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="WhatsApp Mobile*"
                  {...register('wa_number', { required: true })}
                />
                {errors.wa_number && <span className="text-danger">WhatsApp Mobile is required</span>}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control intlTelInput"
                  placeholder="Mobile*"
                  {...register('mob_number', { required: true })}
                />
                {errors.mob_number && <span className="text-danger">Mobile is required</span>}
              </div>
              <div className="col">
                <div className="tom-select-custom" data-hs-validation-validate-class>
                  <select
                    className="js-select form-select"
                    {...register('dept', { required: true })}
                  >
                    <option value="">Department</option>
                    <option value="Sales">Sales</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Technical">Technical</option>
                    <option value="Accounts">Accounts</option>
                    <option value="HR">HR</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                {errors.dept && <span className="text-danger">Please select a valid department.</span>}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Designation"
                  {...register('designation')}
                />
              </div>
              <div className="col">
                <div className="tom-select-custom" data-hs-validation-validate-class>
                  <select
                    className="js-select form-select"
                    {...register('user_type', { required: true })}
                  >
                    <option value="">User Type</option>
                    <option value="Team Manager">Team Manager</option>
                    <option value="Team member">Team member</option>
                  </select>
                </div>
                {errors.user_type && <span className="text-danger">Please select a valid user type.</span>}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <div className="input-group input-group-merge" data-hs-validation-validate-class>
                  <input
                    type={view ? "text" : "password"}
                    className="js-toggle-password form-control form-control-lg"
                    placeholder="8+ characters required"
                    aria-label="8+ characters required"
                    {...register('password', { required: true, minLength: 8 })}
                  />
                  <a className="js-toggle-password-target-1 input-group-append input-group-text" onClick={handleOpen}>
                    {view ? (<i className="js-toggle-password-show-icon-2 bi-eye" />) : (<i className="js-toggle-password-hide-icon-2 bi-eye-slash" />)}
                  </a>
                </div>
                {errors.password && <span className="text-danger">Password is required and must be at least 8 characters</span>}
              </div>
              <div className="col">
                <div className="input-group input-group-merge" data-hs-validation-validate-class>
                  <input
                    type={view ? "text" : "password"}
                    className="js-toggle-password form-control form-control-lg"
                    placeholder="8+ characters required"
                    aria-label="8+ characters required"
                    {...register('confirm_password', { required: true, validate: value => value === watch('password') })}
                  />
                  <a className="js-toggle-password-target-2 input-group-append input-group-text" onClick={handleOpen}>
                    {view ? (<i className="js-toggle-password-show-icon-2 bi-eye" />) : (<i className="js-toggle-password-hide-icon-2 bi-eye-slash" />)}
                  </a>
                </div>
                {errors.confirm_password && <span className="text-danger">Passwords must match</span>}
              </div>
            </div>
            {/* End Form */}
            <div className="d-flex justify-content-end">
              <div className="d-flex gap-3">
                <button type="button" className="btn btn-white" onClick={handleClose}>Cancel</button>
                <button type="submit" className="btn btn-primary user_profile_update_btn">Save changes</button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default User;
