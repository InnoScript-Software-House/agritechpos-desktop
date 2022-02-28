import { DEVICE_TYPE, NETWORK_TYPE, SET_DEVICE_TYPE, SET_NETWORK_TYPE } from "../actionTypes";

const initialState = {
    device_type : localStorage.getItem(DEVICE_TYPE) ? localStorage.getItem(DEVICE_TYPE) : null,
    netwok_type : localStorage.getItem(NETWORK_TYPE) ? localStorage.getItem(NETWORK_TYPE) : null
}

export const configReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case SET_DEVICE_TYPE: {
            return payload;
        }

        case SET_NETWORK_TYPE: {
            return payload;
        }

        default:
            return state;
    }
}