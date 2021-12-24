/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";

export default combineReducers({
    authReducer: authReducer
});
