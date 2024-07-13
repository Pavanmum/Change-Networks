import axios from "axios";
import { API_URL_v1 } from "../../../constant";


export function getCountryNames() {
    return new Promise(async (resolve, reject) => { 
        try {
            const response = await axios.get(
                `${API_URL_v1.COUNTRY_LIST}`
            );
            resolve(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            reject(error);
        }
    });
}


export function SubmitContactUs(newContact) {
    return new Promise(async (resolve, reject) => { 
        try {
            const response = await axios.post(
                `${API_URL_v1.CONTACT_US}`,newContact
            );+
            resolve(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            reject(error);
        }
    });
}

export function sendEmailerToUser(Contact_Name, email_id, Mob_Num ,country,Company_name,msg){
    return new Promise (async (resolve,reject)=>{
        try {
            const response = await axios.post(`${API_URL_v1.CONTACT_US_SEND_EMAIL}`,{ Contact_Name, email_id, Mob_Num ,country,Company_name,msg })
            resolve(response)
        } catch (error) {
            console.error("Error fetching blogs:", error);
            reject(error);
            
        }
    })
}