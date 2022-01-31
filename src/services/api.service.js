import axios from "axios";
import { apiUrl, env } from "../environment";
import { ACCESS_TOKEN, LICENSE } from "../redux/actionTypes";

axios.defaults.baseURL = apiUrl[env];

const getLicense = localStorage.getItem(LICENSE) ? localStorage.getItem(LICENSE) : null;
const getToken = localStorage.getItem(ACCESS_TOKEN) ? localStorage.getItem(ACCESS_TOKEN) : null;

if(getLicense) {
    axios.defaults.headers.common['license'] = getLicense;
}

const httpHandler = (response) => {
    
    if(response.status === 401 || response.status === 404 || response.status === 422 || response.status === 400 || response.status === 500) {
        return {
            ...response.data,
            status: response.status
        };
    }

    if(response.success === false) {
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
