import { SET_INVOICE } from "../actionTypes";

export const setInvoiceAction = (invoiceData) => async (dispatch) => {
    const data = invoiceData;

    return dispatch({
        type: SET_INVOICE,
        payload: data
    });
    
}