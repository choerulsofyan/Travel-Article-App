import { combineReducers } from "@reduxjs/toolkit";
import articlesReducer from "./modules/articles/articlesSlice";
import authReducer from "./modules/auth/authSlice";
import categoriesReducer from "./modules/categories/categoriesSlice";
import commentsReducer from "./modules/comments/commentsSlice";

const rootReducer = combineReducers({
    articles: articlesReducer,
    auth: authReducer,
    categories: categoriesReducer,
    comments: commentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
