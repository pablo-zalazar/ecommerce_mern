import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const publicationSlice = createSlice({
  name: "publication",
  initialState: {
    allPublications: [],
    myPublications: [],
    ssearch: "",
  },
  reducers: {
    allPublications: (state, action) => {
      state.allPublications = action.payload;
    },
    myPublications: (state, action) => {
      state.myPublications = action.payload;
    },
    addPublication: (state, action) => {
      state.myPublications = state.myPublications.push(action.payload);
    },
    logout: (state) => {
      state.myPublications = [];
    },
  },
});

export const { allPublications, myPublications, addPublication, logout } =
  publicationSlice.actions;

export default publicationSlice.reducer;

export const getAllPublications = () => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/publications`;
    try {
      const { data } = await axios.get(URL, config);
      dispatch(allPublications(data));
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};

export const getMyPublications = (token, id) => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/publications/myPublications/${id}`;
    try {
      const { data } = await axios.get(URL, config);
      dispatch(myPublications(data));
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};

export const clearMyPublications = () => {
  return async function (dispatch) {
    dispatch(logout());
  };
};

export const createPublication = (values, token, id) => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/publications`;
    try {
      const { data } = await axios.post(
        URL,
        {
          ...values,
          price: Number(values.price),
          stock: Number(values.stock),
        },
        config
      );
      dispatch(getMyPublications(token, id));
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};
