import { getRequest, postRequest } from "./api.service";

const url = 'category';

const handlerException = (response) => {
    if(response && response.status === 0) {
        return null;
    }
    return response;
}

export const getCategories = async () => {
    const response = await getRequest(url);
    return handlerException(response);
}

export const saveCategory = async (requestBody) => {
    const response = await postRequest(url, requestBody);
    return handlerException(response);
}