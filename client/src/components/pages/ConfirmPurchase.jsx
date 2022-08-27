import React, { useEffect } from "react";
import "../../styles/confirmUser.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { actionSetCoins } from "../../store/slices/user";
import Alert from "../Alert";

export default function ConfirmarCompra() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const amount = localStorage.getItem("value");
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    console.log("1");
    const func = async () => {
      try {
        const msg = await dispatch(actionSetCoins(token, amount));
        console.log(msg);
        Alert("success", msg);
      } catch (e) {
        console.log(e);
      }
      localStorage.removeItem("value");
      return () => {
        navigate("/");
      };
    };
    func();
  }, []);

  return (
    <div className="confirmUser">
      <h2>Your cash is updated</h2>
      <Link to="/">home</Link>
    </div>
  );
}
