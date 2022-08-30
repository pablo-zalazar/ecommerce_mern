import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import io from "socket.io-client";
let socket;
socket = io(process.env.REACT_APP_BACKEND_URL);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    error: "",
    loading: true,
    transactions: [],
    showSettings: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {};
    },
    updateUset: (state, action) => {
      state.user = action.payload;
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
    setShowSettings: (state, action) => {
      state.showSettings = action.payload;
    },
  },
});

export const {
  login,
  logout,
  setLoading,
  setTransactions,
  clearTransactions,
  setShowSettings,
  updateUset,
} = userSlice.actions;

export default userSlice.reducer;

export const actionUserLogin = (user) => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/users/login`;
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

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/users`;
    try {
      const { data } = await axios.post(URL, user, config);
      return data;
    } catch (e) {
      throw e.response.data.msg;
    }
  };
};

export const actionUserEdit = (token, user) => {
  return async function (dispatch) {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/users/profile/${user._id}`;
    try {
      const { data } = await axios.put(URL, user, config);
      dispatch(updateUset(data));
      dispatch(actionAuthenticateUser(token));
      return "User Updated";
    } catch (e) {
      throw e.response.data.msg;
    }
  };
};

export const actionConfirmUser = (token) => {
  return async function () {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/users/confirm/${token}`;
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
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/users/forget-password`;
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
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/users/forget-password/${token}`;
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
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/users/forget-password/${token}`;
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
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/users/profile`;
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
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/users/addToCart/${id}`;
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
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/users/removeFromCart/${id}`;
    try {
      const { data } = await axios.get(URL, config);

      dispatch(actionAuthenticateUser(token));
      return { msg: "product romved from your cart" };
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
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/users/buyCart`;
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
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/users/clearCart`;
    try {
      const { data } = await axios.post(URL, { total }, config);

      dispatch(actionAuthenticateUser(token));
      return { msg: "empty cart" };
    } catch (e) {
      throw { msg: e.response.data.msg };
    }
  };
};

export const actionGetTransactions = (token) => {
  return async function (dispatch) {
    dispatch(setLoading(true));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/users/transactions`;
    try {
      const { data } = await axios.get(URL, config);
      dispatch(setTransactions(data));
      dispatch(setLoading(false));
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

export const actionSetShowSettings = (value) => {
  return async function (dispatch) {
    dispatch(setShowSettings(value));
  };
};

export const actionBuyCash = (token, value) => {
  return async function () {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/process-payment`;
      const { data } = await axios.post(url, { value }, config);
      socket.emit("Redirect", data);
    } catch (e) {
      console.log(e);
    }
  };
};

export const actionSetCoins = (token, value) => {
  return async function (dispatch) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/process-payment/setcoins`;
      const { data } = await axios.put(url, { value }, config);
      dispatch(actionAuthenticateUser(token));
      return data.msg;
      // socket.emit("Redirect", json.data);
      return;
    } catch (e) {
      console.log(e);
    }
  };
};
