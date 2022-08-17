import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: { user: {}, error: "", loading: false, transactions: [] },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {};
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    clearTransactions: (state) => {
      state.transactions = [];
    },
  },
});

export const { login, logout, setLoading, setTransactions, clearTransactions } =
  userSlice.actions;

export default userSlice.reducer;

export const actionUserLogin = (user) => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/login`;
    try {
      const { data } = await axios.post(URL, user, config);
      dispatch(login(data));
      return data;
    } catch (e) {
      throw e.response.data.msg;
    }
  };
};

export const actionUserLogout = () => {
  return function (dispatch) {
    dispatch(logout());
  };
};

export const actionUserRegister = (user) => {
  return async function () {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const URL = `${process.env.REACT_APP_BACKEND_URL}/users`;
    try {
      const { data } = await axios.post(URL, user, config);
      return data;
    } catch (e) {
      throw e.response.data.msg;
    }
  };
};

export const actionConfirmUser = (token) => {
  return async function () {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/confirm/${token}`;
    try {
      const { data } = await axios.get(URL);
      return data;
    } catch (e) {
      throw e.response.data.msg;
    }
  };
};

export const actionForgetPassword = (values) => {
  return async function () {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/forget-password`;
    try {
      const { data } = await axios.post(URL, values, config);
      return data;
    } catch (e) {
      throw e.response.data.msg;
    }
  };
};

export const actionCheckToken = (token) => {
  return async function (dispatch) {
    dispatch(setLoading(true));
    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/forget-password/${token}`;
    try {
      const { data } = await axios.get(URL);
      dispatch(setLoading(false));
      return data;
    } catch (e) {
      throw e.response.data.msg;
    }
  };
};

export const actionNewPassword = (values) => {
  const { token, password } = values;
  return async function () {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/forget-password/${token}`;
    try {
      const { data } = await axios.post(URL, password, config);
      return data;
    } catch (e) {
      throw e.response.data.msg;
    }
  };
};

export const actionAuthenticateUser = (token) => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/profile`;
    try {
      const { data } = await axios.get(URL, config);
      dispatch(login(data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const actionAddToCart = (token, id) => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/addToCart/${id}`;
    try {
      const { data } = await axios.get(URL, config);

      dispatch(actionAuthenticateUser(token));
      return { msg: "product added to cart" };
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};

export const actionRemoveFromCart = (token, id) => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/removeFromCart/${id}`;
    try {
      const { data } = await axios.get(URL, config);
      console.log(data);
      dispatch(actionAuthenticateUser(token));
      return { msg: "product romved from cart" };
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};

export const actionBuyCart = (token, total) => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/buyCart`;
    try {
      const { data } = await axios.post(URL, { total }, config);
      console.log(data);
      dispatch(actionAuthenticateUser(token));
      return { msg: "purchased products" };
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};

export const actionClearCart = (token, total) => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/clearCart`;
    try {
      const { data } = await axios.post(URL, { total }, config);
      console.log(data);
      dispatch(actionAuthenticateUser(token));
      return { msg: "empty cart" };
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};

export const actionGetTransactions = (token) => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/transactions`;
    try {
      const { data } = await axios.get(URL, config);
      dispatch(setTransactions(data));
      return { msg: "empty cart" };
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};

export const actionClearTransactions = () => {
  return async function (dispatch) {
    dispatch(clearTransactions());
  };
};
