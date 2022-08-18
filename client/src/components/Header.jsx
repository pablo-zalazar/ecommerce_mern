import React from "react";
import "../styles/header.css";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu, GiShoppingCart } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar";
import { useEffect } from "react";

import { actionAuthenticateUser } from "../store/slices/user";

export default function Header({
  setModalLogin,
  setModalRegister,
  showSettings,
  setShowSettings,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.users);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const func = async () => {
      if (token) dispatch(actionAuthenticateUser(token));
    };
    func();
  }, []);

  return Object.keys(user).length > 0 ? (
    <header>
      <div className="leftSide">
        <Link to="/">
          <img src="/img/logo.png" alt="logo" />
        </Link>
        <h2>
          Hello {user.user} <p>${user.money}</p>
        </h2>
      </div>
      <div className="rightSide">
        <Searchbar />
        <div className="buttons">
          <button>
            <GiShoppingCart
              className="icon"
              onClick={() => navigate("/cart")}
            />
          </button>
          <button>
            <GiHamburgerMenu
              className="icon"
              onClick={() => setShowSettings(!showSettings)}
            />
          </button>
        </div>
      </div>
    </header>
  ) : (
    <header>
      <div className="leftSide">
        <Link to="/">
          <img src="/img/logo.png" alt="logo" />
        </Link>
      </div>
      <div className="rightSide">
        <Searchbar />
        <div className="buttons">
          <button onClick={() => setModalLogin(true)}>Log in</button>
          <button onClick={() => setModalRegister(true)}>Register</button>
        </div>
      </div>
    </header>
  );
}
