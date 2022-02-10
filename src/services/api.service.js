import axios from "axios";
import { apiUrl, env } from "../environment";
import { ACCESS_TOKEN, DEVICE_VALUE, LICENSE } from "../redux/actionTypes";
import history from "../utilities/histroy";

axios.defaults.baseURL = apiUrl[env];

const getLicense = localStorage.getItem(LICENSE) ? localStorage.getItem(LICENSE) : null;
const getToken = localStorage.getItem(ACCESS_TOKEN) ? localStorage.getItem(ACCESS_TOKEN) : null;
const getDevice = localStorage.getItem(DEVICE_VALUE) ? localStorage.getItem(DEVICE_VALUE) : null;

if(getLicense) {
    axios.defaults.headers.common['license'] = getLicense;
}

if(getToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${getToken}`;
}

if(getDevice) {
    const device = JSON.parse(getDevice);
    axios.defaults.headers.common['ip'] = device.address;
    axios.defaults.headers.common['mac'] = device.mac;
}

const httpHandler = (response) => {

    if(response.status === 401) {
        history.push('/logout');
        window.location.reload();
    }

    if(response.status === 404 || response.status === 422 || response.status === 400 || response.status === 500) {
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

export const putRequest = async (url, body) => {
    const response = await axios.put(url, body).then((result) => {
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
