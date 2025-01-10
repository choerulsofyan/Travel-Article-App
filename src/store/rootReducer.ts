import { combineReducers } from "@reduxjs/toolkit";
import articlesReducer from "./modules/articles/articlesSlice";
import authReducer from "./modules/auth/authSlice";
import categoriesReducer from "./modules/categories/categoriesSlice"; // Import categoriesReducer
import commentsReducer from "./modules/comments/commentsSlice"; // Import commentsReducer

const rootReducer = combineReducers({
    articles: articlesReducer,
    auth: authReducer,
    categories: categoriesReducer, // Add categoriesReducer to your root reducer
    comments: commentsReducer, // Add commentsReducer to your root reducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
