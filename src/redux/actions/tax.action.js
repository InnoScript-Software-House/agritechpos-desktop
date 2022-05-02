import { TAX_CHANGE , SET_TAX_CHANGE} from '../actionTypes'

export const taxAction = ( tax ) => async (dispatch) => {
  const data = tax
  
  return dispatch({
    type: SET_TAX_CHANGE,
    payload: data
  });
}
