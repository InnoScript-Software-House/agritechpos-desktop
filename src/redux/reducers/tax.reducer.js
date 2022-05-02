import { SET_TAX_CHANGE } from '../actionTypes'

const initialState = '1';

export const taxReducer = (state = initialState , action) => {
    const { type , payload } = action

    switch(type) {
        case SET_TAX_CHANGE : {
            return payload
        }
        default :
            return state;
    }
}
