import { TAX_CHANGE , SET_TAX_CHANGE} from '../actionTypes'

export const taxAction = ( tax ) => async (dispatch) => {
  localStorage.setItem(TAX_CHANGE, tax);
  return dispatch({
    type: TAX_CHANGE,
    payload: tax
  });
}
