import React from "react";
import "../styles/header.css";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar";
import { useEffect } from "react";

import {
  actionAuthenticateUser,
  actionSetShowSettings,
} from "../store/slices/user";

export default function Header({ setModalLogin, setModalRegister }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, setShowSettings } = useSelector((state) => state.users);
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
        <h3>
          Hello {user.user} <p>${user.money}</p>
        </h3>
      </div>
      <div className="rightSide">
        <Searchbar />
        <div className="buttons">
          <button className="buttonCart" onClick={() => navigate("/cart")}>
            {user.cart.length > 0 && (
              <p className="cartNumber">{user.cart.length}</p>
            )}
            <MdOutlineAddShoppingCart className="icon" />
          </button>
          <button>
            <GiHamburgerMenu
              className="icon"
              onClick={() => dispatch(actionSetShowSettings(!setShowSettings))}
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
