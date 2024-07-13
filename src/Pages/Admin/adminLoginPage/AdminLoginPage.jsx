import { useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./AdminLoginPage.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, selectUserDetail, setAuthenticated, verifyJwtTokenAsync } from "../../../store/slices/Admin/authSlice";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { hashData } from "../../../helper/hashDetails";

const AdminLoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, handleSubmit, formState: { errors }, } = useForm();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const {error } = useSelector((state) => state.auth);
  const data = useSelector((state) => state.auth.datas);
  console.log(data,"data")
  // const userDetial = useSelector(selectUserDetail);


  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const onFinish = async (value) => {
  const user = await dispatch(loginAsync(value));
  const values = !!Cookies.get('accessToken');
  await dispatch(verifyJwtTokenAsync(values));
  console.log(values,"1211211");
  };
  const values = Cookies.get('accessToken');      
  

  useEffect(() => {
    // if(data.success === true){
    //   console.log("afari",data)
    //   dispatch(setAuthenticated(true))
    //   dispatch(verifyJwtTokenAsync(values));
    //  toast.success("Login Successfully")

    //   navigate("/change/dashboard");
    // }
    if(error){
      toast("Invalid Email or Password")
      toast.error(error.error)
    }
    dispatch(setAuthenticated(!!values))
  }, [dispatch,data,error,values]);

  return (
    <div>
      <div
        className="position-fixed top-0 end-0 start-0 bg-img-start"
        style={{
          height: "32rem",
          backgroundImage:
            "url(https://change-networks.com/change/assets/svg/components/card-6.svg)",
          zIndex: "-1",
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
      <div
        className=" py-5 py-sm-7 d-flex flex-column align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <img
          className="zi-2"
          src="https://change-networks.com/change/assets/img/logo.png"
          alt="Logo"
          style={{ width: "4rem" }}
        />
        <div className="mx-auto" style={{ maxWidth: "30rem" }}>
          <div id="card" className="card card-lg mb-5">
            <div id="card" className="card-body">
              <form className="" onSubmit={handleSubmit(onFinish)}>
                <div className="text-center"></div>

                <div className="mb-4">
                  <label className="form-label">Your email</label>
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
                    id="email"
                    placeholder="email@address.com"
                    autoComplete="off"
                  />
                  {errors.email && (
                    <p className="text-danger text-sm">{errors.email.message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label w-100">
                    <span className="d-flex justify-content-between align-items-center">
                      <span>Password</span>
                      <Link
                        className="form-label-link mb-0"
                        to="/change/forgot"
                      >
                        Forgot Password?
                      </Link>
                    </span>
                  </label>
                  <div className="input-group input-group-merge">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className="js-toggle-password form-control form-control-lg"
                      {...register("password", { 
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        }
                      })}
                      id="signupSrPassword"
                      placeholder="8+ characters required"
                      aria-label="8+ characters required"
                      autoComplete="off"
                    />
                    <a
                      id="changePassTarget"
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
                  {errors.password && (
                    <p className="text-danger text-sm">{errors.password.message}</p>
                  )}
                </div>

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="termsCheckbox"
                    defaultChecked
                  />
                  <label className="form-check-label">Remember me</label>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
