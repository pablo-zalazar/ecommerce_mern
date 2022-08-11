import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const categorySlice = createSlice({
  name: "category",
  initialState: { categories: {} },
  reducers: {
    allCategories: (state, action) => {
      state.categories = action.payload;
    },
    logout: (state) => {
      state.user = {};
    },
  },
});

export const { allCategories } = categorySlice.actions;

export default categorySlice.reducer;

export const actionGetcategories = () => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/categories`;
    try {
      const { data } = await axios.get(URL, config);
      dispatch(allCategories(data));
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};
