import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import publicationsReducer from "./slices/publication";
import categoriesReducer from "./slices/category";

export const store = configureStore({
  reducer: {
    users: userReducer,
    publications: publicationsReducer,
    category: categoriesReducer,
  },
});
