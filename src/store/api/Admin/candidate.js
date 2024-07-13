import axios from "axios";
import { API_URL_v1 } from "../../../../constant";

export const candidateListApi = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(
                `${API_URL_v1.GET_CANDIDATE_LIST}`
            );
            console.log(response.data);
            resolve(response.data);
        } catch (error) {
            console.error("Internal Server Error", error);
            reject(error);
        }
    });
}