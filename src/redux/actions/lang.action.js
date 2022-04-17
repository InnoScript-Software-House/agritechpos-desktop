import i18next from 'i18next';
import { menus } from '../../utilities/native.utility';
import { LANG_SET, LANG_VALUE } from "../actionTypes";

export const setLangAction = (lang) => async (dispatch) => {
    const { nativeApi } = window;

    localStorage.setItem(LANG_VALUE, lang);

    i18next.changeLanguage(lang, () => {
        let getMenus = []
        menus.map((value) => {
            getMenus.push({
                label:  i18next.t(value.label),
                url : value.url
            })
        });


        nativeApi.app.changeLang(getMenus);
    });

    return dispatch({
        type: LANG_SET,
        payload: lang
    });
}
