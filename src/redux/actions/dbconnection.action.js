/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import { DBCONNECTION_VALUE, GET_DBCONNECTION, SET_DBCONNECTION } from "../actionTypes";

export const setDbConnectionAction = (value) => async (dispatch) => {
    localStorage.setItem(DBCONNECTION_VALUE, value);
    return dispatch({
        type: SET_DBCONNECTION,
        payload: value
    });
}

export const getDbConnectionAction = () => async (dispatch) => {
    const result = localStorage.getItem(DBCONNECTION_VALUE) ? localStorage.getItem(DBCONNECTION_VALUE) : '';
    return dispatch({
        type: GET_DBCONNECTION,
        payload: result
    });
}