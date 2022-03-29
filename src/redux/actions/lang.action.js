/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import i18next from 'i18next';
import { LANG_SET, LANG_VALUE } from "../actionTypes";

export const setLangAction = (lang) => async (dispatch) => {
    localStorage.setItem(LANG_VALUE, lang);
    i18next.changeLanguage(lang);
    return dispatch({
        type: LANG_SET,
        payload: lang
    });
}
