import axios from 'axios';
import { API_URL_v1 } from "../../../../constant";

export const fetchProductData = async () => {
    try {
      // Fetch categories
      const categoriesResponse = await axios.get(`${API_URL_v1.GET_PROMOTION_LIST}`);
      return categoriesResponse.data;
  
    }
    catch(error){
      console.error('Error fetching categories:', error);
    }
  };
  export const UpdateProductData = async(updatedDataToSend , objectId,updated_by)=>{
    try {
      const data ={
        objectId:objectId,
        updatedDataToSend:updatedDataToSend,
        updated_by:updated_by
      }
    
      const response = await axios.post(`${API_URL_v1.UPDATE_PROMOTION_LIST}`,data)
      return response
    } catch (error) {
      console.error('Error fetching categories:', error);
      
    }
  }
  export const deleteProductData = async(objectId)=>{
    try {
      const data ={
        objectId:objectId,
      }
      console.log(data);
      const response = await axios.post(`${API_URL_v1.DELETE_PROMOTION_LIST}`,data)
      return response
    } catch (error) {
      console.error('Error fetching categories:', error);
      
    }
  }
  export const AddProductData = async(Data)=>{
    try {
  
      const response = await axios.post(`${API_URL_v1.ADD_PROMOTION_LIST}`,Data)
      return response
    } catch (error) {
      console.error('Error fetching categories:', error);
      
    }
  }
  