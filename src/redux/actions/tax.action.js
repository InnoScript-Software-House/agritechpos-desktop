import { TAX_CHANGE , SET_TAX_CHANGE} from '../actionTypes'

export const taxAction = ( tax ) => async (dispatch) => {
  localStorage.setItem(TAX_CHANGE, tax);
  const data = tax;

  return dispatch({
    type: SET_TAX_CHANGE,
    payload: data,
  });
}
