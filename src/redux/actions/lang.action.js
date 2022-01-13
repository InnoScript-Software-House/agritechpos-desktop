/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import { LANG_GET, LANG_SET, LANG_VALUE } from "../actionTypes";


export const setLangAction = (lang) => async (dispatch) => {
    localStorage.setItem(LANG_VALUE, lang);
    return dispatch({
        type: LANG_SET,
        payload: lang
    });
}

export const getLangAction = (lang) => async (dispatch) => {
    const result = localStorage.getItem(LANG_VALUE) ? localStorage.getItem(LANG_VALUE) : 'unicode';
    return dispatch({
        type: LANG_GET,
        payload: result
    });
}