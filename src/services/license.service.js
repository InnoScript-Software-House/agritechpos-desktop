/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import { getRequest, postRequest } from "./api.service";

const url = 'license';

export const checkLicense = async () => {
    const response = await getRequest(`${url}/check`);

    if(response.status === 0) {
        return null;
    }

    return response;
}

export const activatedLicense = async (bodyRequest) => {
    const response = await postRequest(`${url}/activate`, bodyRequest);

    if(response.status === 0) {
        return null;
    }

    return response;
}

export const storeLicense = async (bodyRequest) => {
    const response = await postRequest(`${url}/save-token`, bodyRequest);

    if(response.status === 0) {
        return null;
    }

    return response; 
}