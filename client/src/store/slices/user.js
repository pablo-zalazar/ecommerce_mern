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

export const userLogin = (user) => {
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

export const userLogout = () => {
  return function (dispatch) {
    dispatch(logout());
  };
};

export const userRegister = (user) => {
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

export const confirmUser = (token) => {
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

export const forgetPassword = (values) => {
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

export const checkToken = (token) => {
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

export const newPassword = (values) => {
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

export const AuthenticateUser = (token) => {
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
