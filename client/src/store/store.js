import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import publicationsReducer from "./slices/publication";

export const store = configureStore({
  reducer: {
    users: userReducer,
    publications: publicationsReducer,
  },
});
