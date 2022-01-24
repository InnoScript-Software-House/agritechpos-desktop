/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import { DBCONNECTION_VALUE, GET_DBCONNECTION, SET_DBCONNECTION } from "../actionTypes";

const initialState = localStorage.getItem(DBCONNECTION_VALUE) ? localStorage.getItem(DBCONNECTION_VALUE) : null;

export const dbConnectionReducer = (state = initialState, action) => {
    const { type, payload } = action;
    
    switch(type) {
        case GET_DBCONNECTION: {
            return {
                ...state,
                ...payload
            }
        }
        case SET_DBCONNECTION: {
            return payload
        }

        default:
            return state;
    }
}