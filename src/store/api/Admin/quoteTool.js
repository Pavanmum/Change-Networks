import axios from 'axios';
import { API_URL_v1 } from "../../../../constant";

export const fetchCustomerUserData = async () => {
    try {
      // Fetch categories
      const Response = await axios.get(`${API_URL_v1.GET_CUSTOMER_USER_DETAILS}`);
      return Response.data;
  
    }
    catch(error){
      console.error('Error fetching categories:', error);
    }
  };
export const getAllProductData = async()=>{
  try {
    const res = await axios.get(`${API_URL_v1.GET_ALL_PRODUCT_DATA}`);
    return res.data
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}
export const addQuoteData = async(data)=>{
  try {
    const res = await axios.post(`${API_URL_v1.ADD_QUOTE_DETAILS}`,data);
    return res.data
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}