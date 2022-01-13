/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import { GET_SERIAL_KEY, SERIAL_KEY_VALUE, SET_SERIAL_KEY } from "../actionTypes";

const initialState = localStorage.getItem(SERIAL_KEY_VALUE) ? localStorage.getItem(SERIAL_KEY_VALUE) : null;

export const serialKeyReducer = (state = initialState, action) => {
    const { type, payload } = action;
    
    switch(type) {
        case GET_SERIAL_KEY: {
            return {
                ...state,
                ...payload
            }
        }
        case SET_SERIAL_KEY: {
            return payload
        }

        default:
            return state;
    }
}