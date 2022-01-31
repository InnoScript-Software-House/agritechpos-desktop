import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { langReducer } from "./lang.reducer";

export default combineReducers({
    auth: authReducer,
    lang: langReducer,
});
