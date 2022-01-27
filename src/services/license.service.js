/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import { getRequest } from "./api.service";

const url = 'license';

export const checkLicense = async () => {
    const response = await getRequest(`${url}/check`);
    return response.license;
}