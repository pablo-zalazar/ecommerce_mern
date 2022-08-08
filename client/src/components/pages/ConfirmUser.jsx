import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Alert from "../Alert";
import { confirmUser } from "../../store/slices/user";

export default function ConfirmUser() {
  const params = useParams();
  const dispatch = useDispatch();
  const { token } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const data = await dispatch(confirmUser(token));
        Alert("success", data.msg);
      } catch (e) {
        Alert("error", e);
      }
    };
    confirmarCuenta();
  }, []);

  return (
    <>
      <Link to="/">Return</Link>
      <ToastContainer />
    </>
  );
}
