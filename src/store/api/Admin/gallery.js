import axios from 'axios';
import { API_URL_v1 } from "../../../../constant";

export const uploadImages = async ({ category, type, productCode, description, files,created_by }) => {
  try {
    const formData = new FormData();
    formData.append('category', category);
    formData.append('type', type);
    formData.append('productCode', productCode);
    formData.append('description', description);
    formData.append('created_by', created_by);
    

    for (let i = 0; i < files.length; i++) {
      const renamedFileName = `${productCode}_cn${i}.${files[i].name.split('.').pop()}`;
      formData.append('images', files[i], renamedFileName);
    }

    const response = await axios.post(`${API_URL_v1.ADD_IMAGE}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchCategories = async () => {
  try {
    // Fetch categories
    const categoriesResponse = await axios.get(`${API_URL_v1.GET_GALLERY_IMAGES}`);
    return categoriesResponse.data;

  }
  catch(error){
    console.error('Error fetching categories:', error);
  }
};
export const deleteImage = async (id)=>{
  try {
    console.log(id)
    
    const deleteImageResponse = await axios.post(`${API_URL_v1.DELETE_GALLERY_IMAGES}`,{id})
    return true;
  } catch (error) {
    console.error('Error fetching categories:', error);
    
  }
}