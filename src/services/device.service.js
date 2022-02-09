import { getRequest, postRequest } from "./api.service";

const url = 'device';

const handlerException = (response) => {
    if(response && response.status === 0) {
        return null;
    }
    return response;
}

export const getFirstDevice = async () => {
    const response = await getRequest(`${url}/first`);
    return handlerException(response);
}

export const createFirstDevice = async (requestBody) => {
    const response = await postRequest(`${url}/first`, requestBody);
    return handlerException(response);
}