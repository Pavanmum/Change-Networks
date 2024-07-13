import axios from 'axios';
import { API_URL_v1 } from "../../../../constant";

export const getSalesData = async () => {
    try {
      // Fetch categories
      const SalesDataResponse = await axios.get(`${API_URL_v1.GET_SALES_DATA}`);
      return SalesDataResponse.data;
  
    }
    catch(error){
      console.error('Error fetching categories:', error);
    }
  };
  
export const addSalesData = async (data) => {
  try {
    // Fetch categories
    const SalesDataResponse = await axios.post(`${API_URL_v1.ADD_SALES_DATA}`,data);
    return SalesDataResponse.data;

  }
  catch(error){
    console.error('Error fetching categories:', error);
  }
};
export const handleDeleteSales = async(objectId)=>{
  try {
    const data =
    {ids:objectId} 
    const response = await axios.post(`${API_URL_v1.DELETE_SALES_DATA}`,data)
    return response
  } catch (error) {
    console.error('Error fetching categories:', error);
    
  }
}
export const updateSalesData = async (formData,created_by) => {
  try {
    const data = {
      formData,
      created_by
    }
    // Fetch categories
    const SalesDataResponse = await axios.post(`${API_URL_v1.UPDATE_SALES_DATA}`,data);
    return SalesDataResponse.data;

  }
  catch(error){
    console.error('Error fetching categories:', error);
  }
};