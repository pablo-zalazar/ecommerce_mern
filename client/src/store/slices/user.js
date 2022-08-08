import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: { user: {}, error: "" },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {};
    },
  },
});

export const { login, logout } = userSlice.actions;

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
  return async function () {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/forget-password/${token}`;
    try {
      const { data } = await axios.get(URL);
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
