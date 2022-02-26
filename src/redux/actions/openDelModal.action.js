import { SET_OPEN_DEL_MODAL } from "../actionTypes";

export const setOpenDelModal = (delData) => async (dispatch) => {

    return dispatch({
        type: SET_OPEN_DEL_MODAL,
        payload: delData
    });
}