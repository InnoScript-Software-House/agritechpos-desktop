/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import { LOGIN_ACTION } from "../actionTypes";

const initialState = {
    is_error: false,
    is_loading: false,
    data: null
};

export const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case LOGIN_ACTION: {
            return {
                ...state,
                ...payload
            }
        }

        default:
            return state;
    }
}