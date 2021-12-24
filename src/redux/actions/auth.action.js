/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import { postRequest } from "../../services/api.service";
import { LOGIN_ACTION } from "../actionTypes";

const url = 'auth';

export const loginAction = (credential) => async (dispatch) => {
    const response = await postRequest(`${url}/login`, credential);
    return dispatch({
        type: LOGIN_ACTION,
        payload: response
    });
}