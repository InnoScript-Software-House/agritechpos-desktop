import { ACCESS_TOKEN, SET_ACCEASS_TOEKN } from "../actionTypes";

const initialState = localStorage.getItem(ACCESS_TOKEN) ? localStorage.getItem(ACCESS_TOKEN) : null;

export const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case SET_ACCEASS_TOEKN: {
            return {
                ...state,
                ...payload
            }
        }

        default:
            return state;
    }
}