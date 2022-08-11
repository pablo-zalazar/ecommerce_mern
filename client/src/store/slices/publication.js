import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { actionAuthenticateUser } from "./user";

export const publicationSlice = createSlice({
  name: "publication",
  initialState: {
    allPublications: [],
    filterPublications: [],
    myPublications: [],
    details: {},
    search: "",
    loading: false,
  },
  reducers: {
    allPublications: (state, action) => {
      state.allPublications = action.payload;
      state.filterPublications = action.payload;
    },
    filterPublications: (state, action) => {
      state.filterPublications = action.payload;
    },
    myPublications: (state, action) => {
      state.myPublications = action.payload;
    },
    setDetails: (state, action) => {
      state.details = action.payload;
    },
    clearDetails: (state) => {
      state.details = {};
    },
    logout: (state) => {
      state.myPublications = [];
    },
  },
});

export const {
  allPublications,
  filterPublications,
  myPublications,
  setDetails,
  clearDetails,
  logout,
} = publicationSlice.actions;

export default publicationSlice.reducer;

export const actionGetAllPublications = () => {
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

export const actionFilterPublications = (filters) => {
  console.log(filters);
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/publications`;
    try {
      const { data } = await axios.get(URL, config);
      let arrayFilter = data;
      if (filters.category !== "")
        arrayFilter = arrayFilter.filter(
          (p) => p.category === filters.category
        );
      if (filters.subCategory !== "")
        arrayFilter = arrayFilter.filter(
          (p) => p.subCategory === filters.subCategory
        );
      if (filters.state !== "")
        arrayFilter = arrayFilter.filter((p) => p.state === filters.state);
      if (filters.price.min !== "" && filters.price.max !== "")
        arrayFilter = arrayFilter.filter(
          (p) => p.price >= filters.price.min && p.price <= filters.price.max
        );
      dispatch(filterPublications(arrayFilter));
    } catch (e) {
      console.log(e);
      throw { msg: e.response.data.msg };
    }
  };
};

export const actionGetMyPublications = (token, id) => {
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

export const actionCreatePublication = (values, token, id) => {
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
      dispatch(actionGetMyPublications(token, id));
      return { msg: "Publication created" };
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};

export const actionDeletePublication = (token, user_id, product_id) => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/publications/delete/${product_id}`;
    try {
      const { data } = await axios.delete(URL, config);
      dispatch(actionGetMyPublications(token, user_id));
      return { msg: "Publication deleted" };
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};

export const actionUpdatePublication = (values, token, id) => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/publications/update/${values._id}`;
    try {
      await axios.put(URL, values, config);
      // dispatch(updatePublication(data.data));
      // console.log(data);
      dispatch(actionGetMyPublications(token, id));
      return { msg: "Publication updated" };
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};

export const actionGetDetails = (id) => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/publications/details/${id}`;
    try {
      const { data } = await axios.get(URL, config);
      dispatch(setDetails(data));
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};

export const actionClearDetails = () => {
  return async function (dispatch) {
    dispatch(clearDetails());
  };
};

export const actionClearMyPublications = () => {
  return async function (dispatch) {
    dispatch(logout());
  };
};

export const actionBuy = (token, id) => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/publications/buy/${id}`;
    try {
      await axios.get(URL, config);
      dispatch(actionGetAllPublications());
      dispatch(actionAuthenticateUser(token));
      return { msg: "purchased product" };
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};
