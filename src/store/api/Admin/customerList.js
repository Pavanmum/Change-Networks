import axios from 'axios';
import { API_URL_v1 } from "../../../../constant";

export const fetchCustomerData = async () => {
    try {
      // Fetch categories
      const customerResponse = await axios.get(`${API_URL_v1.GET_CUSTOMER_LIST}`);
      return customerResponse.data;
  
    }
    catch(error){
      console.error('Error fetching categories:', error);
    }
  };
  export const AddCustomerData = async(Data)=>{
    try {
  
      const response = await axios.post(`${API_URL_v1.ADD_CUSTOMER_LIST}`,Data)
      return response
    } catch (error) {
      console.error('Error fetching categories:', error);
      
    }
  }


  export const UpdateCustomerData = async(updatedDataToSend , objectId,created_by)=>{
    try {
      const data ={
        objectId:objectId,
        updatedDataToSend:updatedDataToSend,
        updated_by : created_by
      }
      console.log(data);
      const response = await axios.post(`${API_URL_v1.UPDATE_CUSTOMER_LIST}`,data)
      return response
    } catch (error) {
      console.error('Error fetching categories:', error);
      
    }
  }
