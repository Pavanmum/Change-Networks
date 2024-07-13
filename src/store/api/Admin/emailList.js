import axios from 'axios';
import { API_URL_v1 } from "../../../../constant";

export const getEmailList = async ()=>{
    try {
        // Fetch categories
        const emailListResponse = await axios.get(`${API_URL_v1.GET_EMAIL_LIST}`);
        return emailListResponse.data;
    
      }
      catch(error){
        console.error('Error fetching categories:', error);
      }
}
export const updateEmailList = async(Data)=>{
  try{
    const response = await axios.post(`${API_URL_v1.UPDATE_EMAIL_LIST}`,Data)
    return response;
    
  }
  catch(error){
    console.error('Error fetching categories:', error);
  }
}
export const deleteEmailList = async(id)=>{
  
  try{
    const response = await axios.post(`${API_URL_v1.DELETE_EMAIL_LIST}`,{id:id})
    return response;
    
  }
  catch(error){
    console.error('Error fetching categories:', error);
  }
}