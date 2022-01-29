/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import axios from "axios";
import { apiUrl, env } from "../environment";

axios.defaults.baseURL = apiUrl[env];

const getLicense = localStorage.getItem('LICENSE');

if(getLicense) {
    axios.defaults.headers = {
        license: getLicense
    }
}

const httpHandler = (response) => {
    
    if(response.status === 404 || response.status === 422) {
        return {
            ...response.data,
            status: response.status
        };
    }

    if(response.success === false) {
        // Show Error Dialog Box
        return response.response;
    }

    if(response.status === 0) {
        return response;
    }

    return response.data.data;
}

export const getRequest = async (url) => {
    const response = await axios.get(url).then((result) => {
        return result;
    }, (error) => {

        if(error && error.response) {
            return error.response;
        }

        return {
            message: "Network Error",
            status: 0
        }
    });
    return httpHandler(response);
}

export const postRequest = async (url, body) => {
    const response = await axios.post(url, body).then((result) => {
        return result;
    }, (error) => {

        if(error && error.response) {
            return error.response;
        }

        return {
            message: "Network Error",
            status: 0
        }
    });
    return httpHandler(response);
}
