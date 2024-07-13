import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { refreshTokenActionAsync, selectUserDetail, setAuthenticated, verifyJwtTokenAsync } from "../store/slices/Admin/authSlice";
import { toast } from "react-toastify";
import { logout } from "../store/api/Admin/auth";
import Cookies from 'js-cookie';  
import md5 from 'md5';
import { hashData, verifyHash } from "./hashDetails";

function Protected({ token, children }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const  userDetial = useSelector(selectUserDetail);
  console.log(userDetial);
  console.log(userDetial);
  const { error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const clearTokenAndRedirect = () => {
    Cookies.remove('accessToken');
    navigate('/change/login');
  };

  if(isAuthenticated){
    const cookie = Cookies.get('accessToken');
    if(!cookie){
      dispatch(setAuthenticated(false));
  }
}

  

  console.log(isAuthenticated)


  const checkAuth = async () => {
    try{
    
    if (!isAuthenticated) {
        await dispatch(refreshTokenActionAsync());
        await dispatch(verifyJwtTokenAsync(token)); 
    } else {
      try {
        // await dispatch(verifyJwtTokenAsync(token));
        setLoading(false);
      } catch (err) {
        toast.error(err.message || 'Token verification failed')
        // navigate('/change/login');
      }
    }
  }
  catch(err){
    console.log(err)
  }
  };

  useEffect(() => {
    checkAuth();
    // let encryptedData =   userDetial && userDetial.data ? hashData(userDetial.data) : null;
    // localStorage.setItem('data', encryptedData);
  }, [navigate,isAuthenticated, error,!isAuthenticated]);

  // if (loading) {
  //   return <div>Loading...</div>; // Add a loading state while authentication is being checked
  // }
  // const encryptedData = userDetial && userDetial.data ? hashData(userDetial.data) : null;
  // localStorage.setItem('data', encryptedData);

  // const userDetailFromLocalStorage = localStorage.getItem('data');
  // const decrypt = userDetailFromLocalStorage ? verifyHash(userDetial?.data, userDetailFromLocalStorage) : false;
  // const userDetailFromLocalStorage = localStorage.getItem('data');
  // const decrypt = userDetailFromLocalStorage ? verifyHash(userDetial?.data, userDetailFromLocalStorage) : false;

  // console.log('Decrypted:', decrypt)

  if (isAuthenticated) {
    if(userDetial.length === 0){
      dispatch(verifyJwtTokenAsync());
    }
    return children;
  } else  {
    // clearTokenAndRedirect();
    localStorage.removeItem('data');
    console.log("check kar")
    return <Navigate to="/change/login" replace />;
  }
}

export default Protected;
