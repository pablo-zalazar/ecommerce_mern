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
        {user.admin && <Link to="#">Admin</Link>}

        <Link to="/Profile">Profile</Link>

        <Link to="/myPublications">Articles</Link>

        <Link onClick={() => handleLogout()} to="/">
          Logout
        </Link>
      </div>
    </div>
  ) : null;
}
