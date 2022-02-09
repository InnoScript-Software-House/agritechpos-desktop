import { combineReducers } from "redux";
import { accountReducer } from "./account.reducer";
import { authReducer } from "./auth.reducer";
import { langReducer } from "./lang.reducer";

export default combineReducers({
    auth: authReducer,
    lang: langReducer,
    account: accountReducer
});
