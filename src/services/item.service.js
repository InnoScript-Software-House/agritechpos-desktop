import { getRequest, postRequest } from "./api.service";

const url = 'items';

const handlerException = (response) => {
    if(response && response.status === 0) {
        return null;
    }
    return response;
}

export const getItems = async () => {
    const response = await getRequest(url);
    return handlerException(response);
}

export const saveItem = async (requestBody) => {
    const response = await postRequest(url, requestBody);
    return handlerException(response);
}