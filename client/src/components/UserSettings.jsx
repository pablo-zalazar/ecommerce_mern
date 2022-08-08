import React from "react";
import "../styles/userSettings.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { actionUserLogout } from "../store/slices/user";
import { actionClearMyPublications } from "../store/slices/publication";

export default function UserSettings({ showSettings, setShowSettings }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(actionUserLogout());
    dispatch(actionClearMyPublications());
    setShowSettings(!showSettings);
  };

  const { user } = useSelector((state) => state.users);
  return Object.keys(user).length > 0 ? (
    <div className={showSettings ? "show" : "hidden"}>
      <div className="userSettings">
        <div>
          <Link to="#">Profile</Link>
        </div>
        <div>
          <Link to="/myPublications">Articles</Link>
        </div>
        <div onClick={() => handleLogout()}>
          <Link to="/">Logout</Link>
        </div>
      </div>
    </div>
  ) : null;
}
