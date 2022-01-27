/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import axios from "axios";
import { apiUrl, env } from "../environment";

axios.defaults.baseURL = apiUrl[env];

const httpHandler = (response) => {
    if(response.success === false) {
        // Show Error Dialog Box
        return response;
    }

    return response.data.data;
}

export const getRequest = async(url) => {
    const response = await axios.get(url);
    return httpHandler(response);
}
