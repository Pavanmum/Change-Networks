import axios from 'axios';
import { API_URL_v1 } from "../../../../constant";

export const getQuoteMatrixData = async()=>{
    try {
      const res = await axios.get(`${API_URL_v1.GET_QUOTE_MATRIX_DATA}`);
      return res.data
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }
export const deleteQuoteData = async(data)=>{
  try {
    data={
      quote_id : `${data}`
    }
    const res = await axios.post(`${API_URL_v1.DELETE_QUOTE_MATRIX_DATA}`,data);
    return res.data
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}