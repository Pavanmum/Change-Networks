import axios from "axios";
import { Beta_URL, Domain } from "../../../constant";

export const fetchAllImages = async ({product,category}) => {
  try {
    const response = await axios.post(
      `${Domain[Beta_URL]}/api_v1/gallery/get-image`,{
        product: product,
        category: category,
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error; 
  }
};




export const fetchAllByCategory = async () => {
  try {
    const response = await axios.post(
      `${Domain[Beta_URL]}/api_v1/gallery/get-categories`,
);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error; 
  }
}