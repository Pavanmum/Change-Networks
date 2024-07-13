import axios from "axios";
import Cookies from 'js-cookie';
import { API_URL_v1 } from "../../../../constant";
import { Navigate } from "react-router-dom";


export function adminLogin(userDate) {
  return new Promise(async (resolve, reject) => { 
      try {
          console.log(userDate);
          const response = await axios.post(
              `${API_URL_v1.ADMIN_LOGIN}`,
              userDate,
              {
                  withCredentials: true, // Important to include credentials
                  headers: {
                      'Content-Type': 'application/json',
                  }
              }
          );
          resolve(response.data);
      } catch (error) {
          console.error("Internal Server Error", error);
          reject(error);
      }
  });
}


export function forgotPassword(email) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(
                `${API_URL_v1.FORGOT_PASSWORD}`,
                 email ,
                {
                    withCredentials: true,
                }
            );
            resolve(response.data);
        } catch (error) {
            console.error("Internal Server Error", error);
            reject(error);
        }
    });
}


export function verifyAndChangePassword(data ) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(
                `${API_URL_v1.VERIFY_AND_UPDATE_PASSWORD}`,
                data
            );
            resolve(response.data);
        } catch (error) {
            console.error("Internal Server Error", error);
            reject(error);
        }
    });
}
export function logout() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(`${API_URL_v1.LOGOUT}`, {}, {
          withCredentials: true,
        });
  
        // Set a cookie (e.g., 'loggedOut' with value 'true' for 1 day)
        // Cookies.remove('refreshToken')
        // Cookies.remove('accessToken')

  
        resolve(response.data);
      } catch (error) {
        console.error('Internal Server Error', error);
        reject(error);
      }
    });
  }


export function refreshToken() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(`${API_URL_v1.REFRESH_TOKEN}`, {}, {
          withCredentials: true,
        });
  
        resolve(response.data);
      } catch (error) {
        console.error('Internal Server Error', error.response.data);
        reject(error.response.data);
        Navigate('/change/login')
      }
    });
  }
  export const fetchUserData = async () => {
    try {
      // Fetch categories
      const response = await axios.get(`${API_URL_v1.GET_USER_DATA}`);
      return response.data;
  
    }
    catch(error){
      console.error('Error fetching categories:', error);
    }
  };


  export const verifyToken = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${API_URL_v1.VERIFY_USER_ADMIN}`,
          {},
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(response.data);
        resolve(response.data);
      } catch (error) {
        console.error("Internal Server Error", error);
        reject(error);
      }
    });
  };

  