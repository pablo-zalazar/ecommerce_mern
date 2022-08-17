import React from "react";
import "../styles/userSettings.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { actionUserLogout } from "../store/slices/user";
import { actionClearMyPublications } from "../store/slices/publication";

export default function UserSettings({ showSettings, setShowSettings }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(actionUserLogout());
    dispatch(actionClearMyPublications());
    setShowSettings(!showSettings);
    navigate("/");
  };

  const { user } = useSelector((state) => state.users);
  return Object.keys(user).length > 0 ? (
    <div className={showSettings ? "show" : "hidden"}>
      <div className="userSettings">
        {user.admin && (
          <div>
            <Link to="#">Admin</Link>
          </div>
        )}
        <div>
          <Link to="#">Profile</Link>
        </div>
        <div>
          <Link to="/myPublications">Articles</Link>
        </div>
        <div>
          <Link to="/transactions">Transactions</Link>
        </div>
        <div onClick={() => handleLogout()}>
          <Link to="/">Logout</Link>
        </div>
      </div>
    </div>
  ) : null;
}
