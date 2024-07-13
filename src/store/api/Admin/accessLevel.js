import axios from "axios";
import { API_URL_v1 } from "../../../../constant";

export function accessLevel(editAccess, viewAccess) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.put(`${API_URL_v1.EDIT_ACCESS_LEVEL}`, {
                editAccess: editAccess,
                viewAccess: viewAccess
            });
            resolve(response.data);
        } catch (error) {
            console.error("Internal Server Error", error);
            reject(error);
        }
    });
}
