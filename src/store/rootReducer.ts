import { combineReducers } from "@reduxjs/toolkit";
import articlesReducer from "./modules/articles/articlesSlice";
import authReducer from "./modules/auth/authSlice";

const rootReducer = combineReducers({
    articles: articlesReducer,
    auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
