import { getRequest, postRequest, putRequest } from "./api.service";

const url = 'customer';

const handlerException = (response) => {
    if(response && response.status === 0) {
        return null;
    }
    return response;
}

export const getCustomerList = async () => {
    const response = await getRequest(url);
    return handlerException(response);
}

export const createCustomer = async (requestBody) => {
    const response = await postRequest(url, requestBody);
    return handlerException(response);
}

// export const categoryDetail = async (id) => {
//     const response = await getRequest(`${url}/${id}`);
//     return handlerException(response);
// }

// export const updateCategory = async (id, requestBody) => {
//     const response = await putRequest(`${url}/${id}`, requestBody);
//     return handlerException(response);
// }