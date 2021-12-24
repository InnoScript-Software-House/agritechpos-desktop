/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import axios from "axios";
import { baseUrl, env } from "../../environment";
import { showWarningDialog } from "./nativeDialog.service";
import translate from '../assets/i18n/mm.json';

axios.defaults.baseURL = baseUrl[env];

export const getRequest = async (url) => {
    try {
        const response = await axios.get(`${baseUrl[env]}/${url}`);
        console.log(response);
    } catch (error) {
        if(error.message === 'Network Error') {
            showWarningDialog(translate.networkError.title, translate.networkError.message);
        }

        return null;
    }
}

export const postRequest = async (url, body, config) => {
    try {
        const response = await axios.post(`${baseUrl[env]}/${url}`, body, config);
        return response;
    } catch (error) {
        
        if(error.message === 'Network Error') {
            showWarningDialog(translate.networkError.title, translate.networkError.message);
        }

        return null;
        
    }
}