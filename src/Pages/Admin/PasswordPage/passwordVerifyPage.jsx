import React, { useEffect, useRef, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { verifyAndChangePasswordAsync } from '../../../store/slices/Admin/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const PasswordVerifyPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const inputRefs = useRef([]);

  const {error,verifyPassword} = useSelector(state => state.authSlice);
    console.log(error,verifyPassword); 

  const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    };


  const handleInput = (event, index) => {
    const input = event.target;
    if (input.value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const isNumberKey = (evt) => {
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      evt.preventDefault();
    }
  };

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const otp = inputRefs.current.reduce((acc, input) => {
      return acc + input.value;
    }, "");
    const otpVerify ={
        password: data.new_password,
        otp: otp
    }
   
    dispatch(verifyAndChangePasswordAsync(otpVerify));
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!error?.success) {
      toast.error(error?.error);
    }

    if(verifyPassword?.success){
      toast.success(verifyPassword?.message);
      setTimeout(() => {
        navigate('/change/login');
    }, 1000);
    }

  },[dispatch,error,verifyPassword])

  return (
    <main id="content" role="main" className="main">
      <div
        className="position-fixed top-0 end-0 start-0 bg-img-start"
        style={{
          height: "32rem",
          backgroundImage: "url(https://change-networks.com/change/assets/svg/components/card-6.svg)"
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
      </div>
      <div className="container py-5 py-sm-7">
        <a
          className="d-flex justify-content-center mb-5"
          href="https://change-networks.com/change/"
        >
          <img
            className="zi-2"
            src="https://change-networks.com/change/assets/img/logo.png"
            alt=""
            style={{ width: "4rem" }}
          />
        </a>
        <div className="mx-auto" style={{ maxWidth: "30rem" }}>
          <div className="card card-lg mb-5">
            <div className="card-body">
              <form className="js-validate needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
                <div className="text-center">
                  <div className="mb-4">
                    <img
                      className="avatar avatar-xxl avatar-4x3"
                      src="https://change-networks.com/change/assets/svg/illustrations/oc-unlock.svg"
                      alt=""
                    />
                  </div>
                  <div className="mb-5">
                    <h1 className="display-5">OTP</h1>
                  </div>
                </div>
                <div className="row gx-2 gx-sm-3">
                  {Array.from({ length: 6 }, (_, index) => (
                    <div className="col" key={index}>
                      <div className="mb-4">
                        <input
                          type="text"
                          className="form-control form-control-single-number p-0"
                          name={`code${index + 1}`}
                          id={`twoStepVerificationSrCodeInput${index + 1}`}
                          maxLength={1}
                          autoComplete="off"
                          autoCapitalize="off"
                          spellCheck="false"
                          autoFocus={index === 0}
                          ref={(el) => (inputRefs.current[index] = el)}
                          onInput={(e) => handleInput(e, index)}
                          onKeyPress={isNumberKey}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <div className="input-group input-group-merge">
                    <input
                      type={
                        passwordVisible ? 'text' : 'password'
                      }
                      className="js-toggle-password form-control form-control-lg"
                      name="new_password"
                      placeholder="New Password"
                      {...register('new_password', { required: 'New password is required' })}
                    />
                    <a
                      id="oldPassTarget"
                      className="input-group-append input-group-text"
                        onClick={togglePasswordVisibility}
                    >
                       {passwordVisible ? (
                        <EyeTwoTone />
                      ) : (
                        <EyeInvisibleOutlined />
                      )}
                    </a>
                  </div>
                  {errors.new_password && (
                    <span className="invalid-feedback d-block">{errors.new_password.message}</span>
                  )}
                </div>
                <div className="mb-4">
                  <div className="input-group input-group-merge">
                    <input
                      type={
                        passwordVisible ? 'text' : 'password'
                      }
                      className="js-toggle-password form-control form-control-lg"
                      name="confirm_password"
                      placeholder="Confirm Password"
                      {...register('confirm_password', {
                        required: 'Confirm password is required',
                        validate: value =>
                          value === watch('new_password') || 'Passwords do not match'
                      })}
                    />
                    <a
                      id="newPassTarget"
                      className="input-group-append input-group-text"
                      onClick={togglePasswordVisibility}
                    >
                     {passwordVisible ? (
                        <EyeTwoTone />
                      ) : (
                        <EyeInvisibleOutlined />
                      )}
                    </a>
                  </div>
                  {errors.confirm_password && (
                    <span className="invalid-feedback d-block">{errors.confirm_password.message}</span>
                  )}
                </div>
                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Submit
                  </button>
                </div>
                <div className="text-center">
                  {/* <p>Haven't received it? <a href="#" id="resendOtp">Resend new OTP.</a></p> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PasswordVerifyPage;
