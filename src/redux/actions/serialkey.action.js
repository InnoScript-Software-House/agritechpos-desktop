/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import { GET_SERIAL_KEY, SERIAL_KEY_VALUE, SET_SERIAL_KEY } from "../actionTypes";


export const setSerialKeyAction = (value) => async (dispatch) => {
    localStorage.setItem(SERIAL_KEY_VALUE, value);
    return dispatch({
        type: SET_SERIAL_KEY,
        payload: value
    });
}

export const getSerialKeyAction = () => async (dispatch) => {
    const result = localStorage.getItem(SERIAL_KEY_VALUE) ? localStorage.getItem(SERIAL_KEY_VALUE) : '';
    return dispatch({
        type: GET_SERIAL_KEY,
        payload: result
    });
}