import axios from "axios";
import { API_URL_v1 } from "../../../constant";

export function getTopSearchFrequency() {
    return new Promise(async (resolve, reject) => { 
        try {
            const response = await axios.get(
                `${API_URL_v1.GET_TOP_SEARCH_FREQUENCY}`
            );+
            resolve(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            reject(error);
        }
    });
}

export function getSelectedSearch(selectedValue){
    return new Promise(async(resolve,reject)=>{
        try {
            let response = await axios.get(
                `${API_URL_v1.SEARCH_BY_PROC_CODE}?proc_code=${selectedValue}`
              );
              resolve(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            reject(error)
            
        }
    })
}

export function getHandleSearch(searchValue){
    return new Promise(async(resolve,reject)=>{
        try {
            let response = await axios.get(
                `${API_URL_v1.SEARCH_BY_PROC_CODE}?proc_code=${searchValue}`
              );
              resolve(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            reject(error)
        }
    }) 
}

export function getURLSearch(searchValue){
    return new Promise(async(resolve,reject)=>{
        try {
            let response = await axios
            .get(
              `${API_URL_v1.SEARCH_BY_PROC_CODE}?proc_code=${encodeURIComponent(
                searchValue
              )}`)
              resolve(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            reject(error)
        }
    }) 
}

export function getBulkSearch(productList){
    return new Promise(async(resolve,reject)=>{
        try {
            const response = await axios.post('http://localhost:5000/api_v1/product/bulk', { proc_codes: productList });
              resolve(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            reject(error)
        }
    }) 
}


export function SendGPLFormInfo(newQuote){
    return new Promise(async(resolve,reject)=>{
        try {
            const response = await axios.post(`${API_URL_v1.GPL_QUOTE_FORM}`,newQuote );
              resolve(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            reject(error)
        }
    }) 
}
export function SendGPLEmailToUser(name, email, proc_code, quantity, teleNum, price, totalPrice, pro_desc) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(API_URL_v1.GPL_QUOTE_FORM_EMAIL_SEND, { name, email, proc_code, quantity, teleNum, price, totalPrice, pro_desc });
            resolve(response.data);
        } catch (error) {
            console.error("Error sending email:", error);
            reject(error);
        }
    });
}