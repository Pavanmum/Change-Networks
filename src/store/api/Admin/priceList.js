import axios from 'axios';
import { API_URL_v1 } from "../../../../constant";


export const fetchProductData = async () => {
    try {
      // Fetch categories
      const categoriesResponse = await axios.get(`${API_URL_v1.GET_PRODUCT_DATA}`);
      return categoriesResponse.data;
  
    }
    catch(error){
      console.error('Error fetching categories:', error);
    }
  };
export const cloneProductData = async(model_no, description, category, series, brand, ex_work, price_level_1, price_level_2, price_level_3, price_level_4, price_level_5, price_level_6, qty, stock_status, condition_status, remark,created_by)=>{
  const Data ={
    model_no,
    description,
    category,
    series,
    brand,
    ex_work,
    price_level_1,
    price_level_2,
    price_level_3,
    price_level_4,
    price_level_5,
    price_level_6,
    qty,
    stock_status,
    condition_status,
    remark,
    created_by
  }
  try {

    const response = await axios.post(`${API_URL_v1.CLONE_PRODUCT_DATA}`,Data)
    return response
  } catch (error) {
    console.error('Error fetching categories:', error);
    
  }
}
export const UpdateProductData = async(updatedDataToSend , objectId,updated_by)=>{
  try {
    const data ={
      objectId:objectId,
      updatedDataToSend:updatedDataToSend,
      updated_by:updated_by
    }
    console.log(data);
    const response = await axios.post(`${API_URL_v1.UPDATE_PRODUCT_DATA}`,data)
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
    const response = await axios.post(`${API_URL_v1.DELETE_PRODUCT_DATA}`,data)
    return response
  } catch (error) {
    console.error('Error fetching categories:', error);
    
  }
}
export const AddProductData = async(Data)=>{
  try {

    const response = await axios.post(`${API_URL_v1.ADD_PRODUCT_DATA}`,Data)
    return response
  } catch (error) {
    console.error('Error fetching categories:', error);
    
  }
}
