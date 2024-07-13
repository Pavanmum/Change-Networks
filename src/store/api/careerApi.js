import axios from "axios";
import { API_URL_v1 } from "../../../constant";


export function jobDescription() {
    return new Promise(async (resolve, reject) => { 
        try {
            const response = await axios.post(
                `${API_URL_v1.GET_JOB_DESCRIPTION}`
            );
            resolve(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            reject(error);
        }
    });
}


export function jobDescriptionById(id) {
    return new Promise(async (resolve, reject) => { 
        try {
            const response = await axios.post(
                `${API_URL_v1.GET_JOB_DESCRIPTION_BY_ID}?id=${id}`
            );+
            resolve(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            reject(error);
        }
    });
}

export function sendOtp(email) {
    return new Promise(async (resolve, reject) => { 
        try {
            const response = await axios.post(
                `${API_URL_v1.SEND_OTP}`,
                { email }
            );
            console.log(response)
            resolve(response.data);
        } catch (error) {
            console.error("Error fetching", error);
            reject(new Error(error.message));
        }
    });
}

export function verifyOtp(otp) {
    return new Promise(async (resolve, reject) => { 
        try {
            const response = await axios.post(
                `${API_URL_v1.OTP_VERIFY}`,
                { otpvaldiation:otp }
            );
            const setCookies = response.headers['set-cookie'];
            console.log(setCookies)
            if(setCookies){
                setCookies.forEach(cookie => {
                    document.cookie = cookie;
                });
            }
            console.log(response,"1")
            resolve(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            console.log(error)
            reject(error);
        }
    });
}

export function careerSubmission(formData) {
    return new Promise(async (resolve, reject) => { 
        try {
            const response = await axios.post(
                `${API_URL_v1.CARRER_SUBMISSION_API}`,
                formData ,{
                    headers: {
                        "Content-Type": "multipart/form-data",
                      },
                }
            );
            resolve(response.data);
        } catch (error) {
            console.error("Internal Server Error", error);
            reject(error);
        }
    });
}

