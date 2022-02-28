import { DEVICE_TYPE, SET_DEVICE_TYPE, SET_NETWORK_TYPE } from "../actionTypes";

export const setDeviceTypeAction = (type) => async (dispatch) => {
    localStorage.setItem(DEVICE_TYPE, type);

    return dispatch({
        type: SET_DEVICE_TYPE,
        payload: type
    });
}

export const setNetworkTypeAction = (type) => async (dispatch) => {
    localStorage.setItem(SET_NETWORK_TYPE, type);

    return dispatch({
        type: SET_NETWORK_TYPE,
        payload: type
    });
}