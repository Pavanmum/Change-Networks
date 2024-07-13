import { Link, useNavigate } from 'react-router-dom';
import "../adminLoginPage/AdminLoginPage.css";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAsync } from '../../../store/slices/Admin/authSlice';
import LoadingSpinner from '../../../components/Loader/LoadingSpinner';
import { useEffect } from 'react';
import { toast } from 'react-toastify';


const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const { isLoading,emailData,error} = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  const onFinish = (data) => {
    dispatch(forgotPasswordAsync(data));
  };

  useEffect (() => {
    if(emailData?.success){
      navigate('/change/update_password')
    }
    if(!error?.status){
      toast.error(error?.error)
    }
  }, [dispatch,emailData,error])

  return (
    <main id="content" role="main" className="main">
    <div
      className="position-fixed top-0 end-0 start-0 bg-img-start"
      style={{
        height: "32rem",
        backgroundImage:
          "url(https://change-networks.com/change/assets/svg/components/card-6.svg)"
      }}
    >
      <div className="shape shape-bottom zi-1">
        <svg
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1921 273"
        >
          <polygon fill="#fff" points="0,273 1921,273 1921,0 " />
        </svg>
      </div>
      {/* End Shape */}
    </div>
    {/* Content */}
    <div className="container py-5 py-sm-7">
      <Link
        className="d-flex justify-content-center mb-5"
        to="/change"
      >
        <img
          className="zi-2"
          src="https://change-networks.com/change/assets/img/logo.png"
          alt=""
          style={{ width: "4rem" }}
        />
      </Link>
      <div className="mx-auto" style={{ maxWidth: "30rem" }}>
        {/* Card */}
        <div id='card' className="card card-lg mb-5">
          <div id='card' className="card-body">
            {/* Form */}
            <form
              className="js-validate needs-validation"
              noValidate=""
              onSubmit={handleSubmit(onFinish)}
            >
              <div className="text-center">
                <div className="mb-5">
                  <h1 className="display-5">Forgot password?</h1>
                  
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="form-label"
                  htmlFor="resetPasswordSrEmail"
                  tabIndex={0}
                >
                  Password recovery email
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  id="resetPasswordSrEmail"
                  tabIndex={1}
                  placeholder="Enter your email address"
                  aria-label="Enter your email address"
                />
                {errors.email && (
                    <p className="text-danger text-sm">{errors.email.message}</p>
                  )}
              </div>
              {/* End Form */}
              <div className="d-grid gap-2">
               {isLoading ? (
                <LoadingSpinner />
               ):( <button type="submit" className="btn btn-primary btn-lg">
                  Submit
                </button>)}
                <div className="text-center">
                  <Link
                    className="btn btn-link"
                    to="/change/login"
                  >
                    <i className="bi-chevron-left" /> Back to Sign in
                  </Link>
                </div>
              </div>
            </form>
            {/* End Form */}
          </div>
        </div>
        {/* End Card */}
      </div>
    </div>
    {/* End Content */}
  </main>
  
  );
};

export default ForgotPasswordPage;
