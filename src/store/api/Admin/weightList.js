import axios from 'axios';
import { API_URL_v1 } from "../../../../constant";

export const fetchProductData = async () => {
    try {
      // Fetch categories
      const weightListResponse = await axios.get(`${API_URL_v1.GET_WEIGHT_LIST}`);
      return weightListResponse.data;
  
    }
    catch(error){
      console.error('Error fetching categories:', error);
    }
  };
  export const UpdateProductData = async(updatedDataToSend , objectId,created_by)=>{
    try {
      const data ={
        objectId:objectId,
        updated_by:created_by,
        updatedDataToSend:updatedDataToSend
      }
      console.log(data);
      const response = await axios.post(`${API_URL_v1.UPDATE_WEIGHT_LIST}`,data)
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
      const response = await axios.post(`${API_URL_v1.DELETE_WEIGHT_LIST}`,data)
      return response
    } catch (error) {
      console.error('Error fetching categories:', error);
      
    }
  }
  export const AddProductData = async(Data,created_by)=>{
    try {
      const data = {
        data : Data,
        created_by:created_by
      }
      const response = await axios.post(`${API_URL_v1.ADD_WEIGHT_LIST}`,data)
      return response
    } catch (error) {
      console.error('Error fetching categories:', error);
      
    }
  }
  