import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

import { actionAuthenticateUser } from "../store/slices/user";

export default function VerifyUser() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      return;
    }

    dispatch(actionAuthenticateUser(token));
  }, []);

  // if (!token) "Loading";

  return <>{token ? <Outlet /> : <Navigate to="/" />}</>;
}
