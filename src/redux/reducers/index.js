/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { langReducer } from "./lang.reducer";
import { serialKeyReducer } from "./serialkey.reducer";

export default combineReducers({
    auth: authReducer,
    lang: langReducer,
    serialKey: serialKeyReducer
});
