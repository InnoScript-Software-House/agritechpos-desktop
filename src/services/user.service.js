import { getRequest, postRequest } from "./api.service";

const url = 'auth';

const handlerException = (response) => {
    if(response && response.status === 0) {
        return null;
    }
    return response;
}

export const checkFirstUser = async () => {
    const response = await getRequest(`${url}/check`);
    return handlerException(response);
}

export const createAccount = async (requestBody) => {
    const response = await postRequest(`${url}/register`, requestBody);
    return handlerException(response);
}

export const getProfile = async () => {
    const response = await getRequest(`${url}/profile`);
    return handlerException(response);
}