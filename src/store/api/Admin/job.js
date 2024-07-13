import axios from "axios";
import { API_URL_v1 } from "../../../../constant";


export const AddJob = async (userDate) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(
                `${API_URL_v1.ADD_JOB}`, userDate
            );
            resolve(response.data);
        } catch (error) {
            console.error("Internal Server Error:", error);
            reject(error);
        }
    })
}


export const updateJob = async (data,id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.put(
                `${API_URL_v1.UPDATE_JOB}/${id}`,
                data
            );
            resolve(response.data);
        } catch (error) {
            console.error("Internal Server Error", error);
            reject(error);
        }
    })
}


export const deleteJob = async (id) => {    
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(
                `${API_URL_v1.DELETE_JOB}/${id}`
            );
            resolve(response.data);
        } catch (error) {
            console.error("Internal Server Error", error);
            reject(error);
        }
    })
}