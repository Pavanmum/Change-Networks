import axios from "axios"
import { API_URL_v1 } from "../../../../constant"

export function  userAdmin(type,dept)  {
    return new  Promise (async (resolve, reject) => {
        try {
            const response = await axios.get(
                `${API_URL_v1.GET_USER_ADMIN}?userType=${type}&dept=${dept}`,
            )
            console.log(response.data)
            resolve(response.data)     
        } catch (error) {
            console.error("Internal Server Error", error)
            reject(error)    
        }
       
    }
)}


export function addUserAdmin(data)  {
    return new  Promise (async (resolve, reject) => {
        try {
            const response = await axios.post(
                `${API_URL_v1.ADD_USER_ADMIN}`, data
            )
            console.log(response.data)
            resolve(response)     
        } catch (error) {
            console.error("Internal Server Error", error)
            reject(error)    
        }
       
    }
)}

export function getAdminTypes() {
    return new  Promise (async (resolve, reject) => {
        try {
            const response = await axios.get(
                `${API_URL_v1.GET_ADMIN_TYPES}`,
            )
            console.log(response.data)
            resolve(response.data)     
        } catch (error) {
            console.error("Internal Server Error", error)
            reject(error)    
        }
       
    }
)
}