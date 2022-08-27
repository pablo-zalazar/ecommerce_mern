import React from "react";
import "../../styles/confirmUser.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Alert from "../Alert";
import { actionConfirmUser } from "../../store/slices/user";

export default function ConfirmUser() {
  const params = useParams();
  const dispatch = useDispatch();
  const { token } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const data = await dispatch(actionConfirmUser(token));
        Alert("success", data.msg);
      } catch (e) {
        Alert("error", e);
      }
    };
    confirmarCuenta();
  }, []);

  return (
    <>
      <div className="confirmUser">
        <h2>User confirmed</h2>
        <Link to="/">Return</Link>
      </div>
    </>
  );
}
